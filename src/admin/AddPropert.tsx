import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiImage,
  FiSave,
  FiUpload,
  FiX,
  FiStar,
} from "react-icons/fi";
import { useProperties } from "../context/PropertyContext";
import type { Property } from "../data/properties";
import { supabase } from "../lib/supabase";

function AddProperty() {
  const navigate = useNavigate();
  const { addProperty } = useProperties();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("Apartment");
  const [purpose, setPurpose] = useState<"For Sale" | "For Rent" | "Shortlet">(
    "For Sale",
  );
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [coverImageIndex, setCoverImageIndex] = useState(0);
  const [features, setFeatures] = useState<string[]>([""]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  function handleFeatureChange(index: number, value: string) {
    setFeatures((currentFeatures) =>
      currentFeatures.map((feature, featureIndex) =>
        featureIndex === index ? value : feature,
      ),
    );
  }

  function addFeature() {
    setFeatures((currentFeatures) => [...currentFeatures, ""]);
  }

  function removeFeature(index: number) {
    setFeatures((currentFeatures) =>
      currentFeatures.filter((_, featureIndex) => featureIndex !== index),
    );
  }

  async function uploadImage(file: File): Promise<string> {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      throw new Error(
        `Could not verify your Supabase session: ${sessionError.message}`,
      );
    }

    if (!session) {
      throw new Error(
        "You are not signed in to Supabase. Please log in again.",
      );
    }

    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filePath = `properties/${crypto.randomUUID()}.${fileExtension}`;

    const { error } = await supabase.storage
      .from("property-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      throw new Error(`Could not upload ${file.name}: ${error.message}`);
    }

    const { data } = supabase.storage
      .from("property-images")
      .getPublicUrl(filePath);

    if (!data.publicUrl) {
      throw new Error(`Could not get a public URL for ${file.name}.`);
    }

    return data.publicUrl;
  }

  async function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const input = e.currentTarget;
    const selectedFiles = Array.from(input.files ?? []);
    input.value = "";

    if (selectedFiles.length === 0) return;

    const invalidFile = selectedFiles.find(
      (file) => !file.type.startsWith("image/"),
    );

    if (invalidFile) {
      alert("Please select image files only.");
      return;
    }

    const oversizedFile = selectedFiles.find(
      (file) => file.size > 10 * 1024 * 1024,
    );

    if (oversizedFile) {
      alert(
        `Each image must be 10 MB or smaller. "${oversizedFile.name}" is too large.`,
      );
      return;
    }

    setIsUploading(true);

    try {
      const uploadedImages = await Promise.all(selectedFiles.map(uploadImage));

      setImages((currentImages) => [...currentImages, ...uploadedImages]);
    } catch (error) {
      console.error("Supabase image upload error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "The images could not be uploaded. Please try again.",
      );
    } finally {
      setIsUploading(false);
    }
  }

  function removeImage(index: number) {
    setImages((currentImages) =>
      currentImages.filter((_, imageIndex) => imageIndex !== index),
    );

    setCoverImageIndex((currentIndex) => {
      if (images.length <= 1) return 0;

      if (currentIndex === index) {
        return index === images.length - 1 ? index - 1 : index;
      }

      if (currentIndex > index) return currentIndex - 1;

      return currentIndex;
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isUploading || isSaving) {
      alert("Please wait for the current operation to finish.");
      return;
    }

    if (images.length === 0) {
      alert("Please upload at least one property image.");
      return;
    }

    if (!title.trim() || !location.trim() || !price.trim()) {
      alert("Please complete the required property information.");
      return;
    }

    setIsSaving(true);

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        throw new Error(
          `Could not verify your Supabase session: ${sessionError.message}`,
        );
      }

      if (!session) {
        throw new Error(
          "Your session has expired. Please log in again before saving.",
        );
      }

      const coverImage = images[coverImageIndex] ?? images[0];

      const propertyData = {
        title: title.trim(),
        location: location.trim(),
        price: price.trim(),
        type,
        purpose,
        bedrooms: Number(bedrooms) || 0,
        bathrooms: Number(bathrooms) || 0,
        area: area.trim(),
        image: coverImage,
        images: [...images],
        description: description.trim(),
        features: features
          .map((feature) => feature.trim())
          .filter((feature) => feature !== ""),
      };

      // Save the property to Supabase.
      // The database generates the property ID automatically.
      const { data: savedProperty, error: saveError } = await supabase
        .from("properties")
        .insert(propertyData)
        .select()
        .single();

      if (saveError) {
        console.error("Supabase property insert error:", saveError);

        throw new Error(
          `Could not save property to the database: ${saveError.message}`,
        );
      }

      if (!savedProperty) {
        throw new Error(
          "Supabase did not return the saved property. Please check the database.",
        );
      }

      // Update the existing client-side context so the dashboard
      // can reflect the new listing without waiting for a refresh.
      addProperty(savedProperty as Property);

      alert("Property added successfully!");
      navigate("/admin");
    } catch (error) {
      console.error("Error saving property:", error);

      alert(
        error instanceof Error
          ? error.message
          : "The property could not be saved. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-sky-50">
      <header className="border-b border-sky-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-5 md:px-8">
          <Link
            to="/admin"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-[#071A3D] transition hover:bg-sky-200"
            aria-label="Back to dashboard"
          >
            <FiArrowLeft size={20} />
          </Link>

          <div>
            <h1 className="text-2xl font-bold text-[#071A3D]">Add Property</h1>
            <p className="mt-1 text-sm text-gray-500">
              Add a new property to DitiHomes.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10 md:px-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-[#071A3D]">
              Basic Information
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Enter the main information about the property.
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-[#071A3D]">
                  Property Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Modern 4 Bedroom Duplex"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#071A3D]">
                  Location
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Lekki Phase 1, Lagos"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#071A3D]">
                  Price
                </label>
                <input
                  type="text"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. ₦85,000,000"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#071A3D]">
                  Property Type
                </label>
                <p className="mt-1 text-xs text-gray-500">
                  What type of property are you uploading?
                </p>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#D4AF37]"
                >
                  <option>Apartment</option>
                  <option>House</option>
                  <option>Duplex</option>
                  <option>Land</option>
                  <option>Office</option>
                  <option>Shop</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-[#071A3D]">
                  Listing Purpose
                </label>
                <p className="mt-1 text-xs text-gray-500">
                  Where should this property appear on DitiHomes?
                </p>
                <select
                  required
                  value={purpose}
                  onChange={(e) =>
                    setPurpose(
                      e.target.value as "For Sale" | "For Rent" | "Shortlet",
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#D4AF37]"
                >
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                  <option value="Shortlet">Shortlet</option>
                </select>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-sky-50 p-4">
              <p className="text-sm font-semibold text-[#071A3D]">
                Listing destination
              </p>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This property will automatically appear under{" "}
                <span className="font-semibold text-[#071A3D]">{purpose}</span>{" "}
                when customers browse DitiHomes.
              </p>
            </div>
          </section>

          {/* Property Details */}
          <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-[#071A3D]">
              Property Details
            </h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              <div>
                <label className="text-sm font-semibold text-[#071A3D]">
                  Bedrooms
                </label>
                <input
                  type="number"
                  min="0"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  placeholder="4"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#071A3D]">
                  Bathrooms
                </label>
                <input
                  type="number"
                  min="0"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  placeholder="4"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#071A3D]">
                  Area
                </label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="450 sqm"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </section>

          {/* Description */}
          <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-[#071A3D]">Description</h2>
            <textarea
              required
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the property..."
              className="mt-6 w-full resize-none rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D4AF37]"
            />
          </section>

          {/* Features */}
          <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#071A3D]">Features</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Add the features customers should know about.
                </p>
              </div>

              <button
                type="button"
                onClick={addFeature}
                className="w-fit rounded-xl bg-sky-100 px-4 py-2 text-sm font-semibold text-[#071A3D] transition hover:bg-sky-200"
              >
                + Add Feature
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder="e.g. 24/7 Security"
                    className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#D4AF37]"
                  />

                  {features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="rounded-xl px-4 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Multiple Property Images */}
          <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-[#071A3D]">
              Property Images
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              Upload the exterior, living room, bedrooms, kitchen, bathrooms and
              other parts of the property. Select multiple images at once and
              add more later.
            </p>

            <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-sky-200 bg-sky-50 px-6 py-10 text-center transition hover:border-[#60A5FA] hover:bg-sky-100">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#071A3D] shadow-sm">
                <FiUpload size={24} />
              </div>

              <p className="mt-4 font-semibold text-[#071A3D]">
                {isUploading ? "Uploading images..." : "Select property images"}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Choose multiple PNG, JPG or WebP images
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Maximum 10 MB per image. Select this area again to add more
                photos.
              </p>

              <input
                type="file"
                accept="image/*"
                multiple
                disabled={isUploading || isSaving}
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {isUploading && (
              <p className="mt-4 text-sm font-medium text-[#071A3D]">
                Uploading your images to Supabase Storage. Please wait...
              </p>
            )}

            {images.length > 0 ? (
              <div className="mt-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-bold text-[#071A3D]">
                      Uploaded Images ({images.length})
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Select an image to make it the main cover photo.
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-[#071A3D]">
                    {images.length} {images.length === 1 ? "photo" : "photos"}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {images.map((imageUrl, index) => (
                    <div
                      key={imageUrl}
                      className={`overflow-hidden rounded-2xl border-2 bg-white transition ${
                        coverImageIndex === index
                          ? "border-[#D4AF37] shadow-lg"
                          : "border-gray-100"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setCoverImageIndex(index)}
                        className="relative block w-full text-left"
                        aria-label={`Set image ${index + 1} as cover photo`}
                        aria-pressed={coverImageIndex === index}
                      >
                        <img
                          src={imageUrl}
                          alt={`Property photo ${index + 1}`}
                          className="h-36 w-full object-cover sm:h-40"
                        />

                        {coverImageIndex === index ? (
                          <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 bg-[#D4AF37] px-2 py-2 text-xs font-bold text-[#071A3D]">
                            <FiStar size={14} />
                            Main Cover Photo
                          </span>
                        ) : (
                          <span className="absolute bottom-2 left-2 rounded-lg bg-black/70 px-2 py-1 text-xs font-medium text-white">
                            Photo {index + 1}
                          </span>
                        )}
                      </button>

                      <div className="flex items-center justify-between gap-2 p-3">
                        <span className="truncate text-xs text-gray-500">
                          Image {index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50"
                          aria-label={`Remove image ${index + 1}`}
                        >
                          <FiX size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-5 flex items-start gap-3 rounded-xl bg-amber-50 p-4">
                <FiImage className="mt-0.5 shrink-0 text-amber-600" size={20} />
                <p className="text-sm leading-6 text-amber-800">
                  At least one image is required. Your first uploaded image will
                  be the cover photo unless you select another.
                </p>
              </div>
            )}
          </section>

          {/* Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Link
              to="/admin"
              className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-center font-semibold text-[#071A3D] transition hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isUploading || isSaving}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#071A3D] px-6 py-3 font-semibold text-white transition hover:bg-[#123D78] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiSave size={18} />
              {isUploading
                ? "Uploading Images..."
                : isSaving
                  ? "Saving Property..."
                  : "Save Property"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default AddProperty;
