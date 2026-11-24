import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiImage,
  FiSave,
  FiUpload,
  FiX,
  FiStar,
  FiCheckCircle,
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

  const inputClass =
    "mt-2 w-full rounded-xl border border-[#303238] bg-[#111315] px-4 py-3 text-[#F5F5F3] outline-none transition placeholder:text-[#777B82] focus:border-[#D6AD55] focus:ring-2 focus:ring-[#D6AD55]/10";

  const labelClass = "text-sm font-semibold text-[#F5F5F3]";

  const sectionClass =
    "rounded-2xl border border-[#303238] bg-[#1B1D20] p-6 shadow-xl shadow-black/10 sm:p-8";

  return (
    <div className="min-h-screen bg-[#111315] text-[#F5F5F3]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[#303238] bg-[#111315]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-5 md:px-8">
          <Link
            to="/admin"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#303238] bg-[#242629] text-[#D6AD55] transition hover:border-[#D6AD55] hover:bg-[#2C2F33]"
            aria-label="Back to dashboard"
          >
            <FiArrowLeft size={20} />
          </Link>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D6AD55]">
              Property Management
            </p>
            <h1 className="mt-1 text-xl font-bold text-[#F5F5F3] sm:text-2xl">
              Add Property
            </h1>
            <p className="mt-1 hidden text-sm text-[#A6A8AD] sm:block">
              Add a new property listing to DitiHomes.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10 md:px-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <section className={sectionClass}>
            <div className="border-b border-[#303238] pb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D6AD55]">
                Step 01
              </p>
              <h2 className="mt-2 text-xl font-bold text-[#F5F5F3]">
                Basic Information
              </h2>
              <p className="mt-1 text-sm text-[#A6A8AD]">
                Enter the main information about the property.
              </p>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label htmlFor="title" className={labelClass}>
                  Property Title *
                </label>
                <input
                  id="title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Modern 4 Bedroom Duplex"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="location" className={labelClass}>
                  Location *
                </label>
                <input
                  id="location"
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Lekki Phase 1, Lagos"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="price" className={labelClass}>
                  Price *
                </label>
                <input
                  id="price"
                  type="text"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. ₦85,000,000"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="type" className={labelClass}>
                  Property Type
                </label>
                <p className="mt-1 text-xs text-[#777B82]">
                  What type of property are you uploading?
                </p>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className={inputClass}
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
                <label htmlFor="purpose" className={labelClass}>
                  Listing Purpose
                </label>
                <p className="mt-1 text-xs text-[#777B82]">
                  Where should this property appear on DitiHomes?
                </p>
                <select
                  id="purpose"
                  required
                  value={purpose}
                  onChange={(e) =>
                    setPurpose(
                      e.target.value as "For Sale" | "For Rent" | "Shortlet",
                    )
                  }
                  className={inputClass}
                >
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                  <option value="Shortlet">Shortlet</option>
                </select>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-[#D6AD55]/20 bg-[#D6AD55]/6 p-4">
              <p className="text-sm font-semibold text-[#D6AD55]">
                Listing destination
              </p>
              <p className="mt-1 text-sm leading-6 text-[#A6A8AD]">
                This property will automatically appear under{" "}
                <span className="font-semibold text-[#E5C477]">{purpose}</span>{" "}
                when customers browse DitiHomes.
              </p>
            </div>
          </section>

          {/* Property Details */}
          <section className={sectionClass}>
            <div className="border-b border-[#303238] pb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D6AD55]">
                Step 02
              </p>
              <h2 className="mt-2 text-xl font-bold text-[#F5F5F3]">
                Property Details
              </h2>
              <p className="mt-1 text-sm text-[#A6A8AD]">
                Add the size and accommodation details.
              </p>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              <div>
                <label htmlFor="bedrooms" className={labelClass}>
                  Bedrooms
                </label>
                <input
                  id="bedrooms"
                  type="number"
                  min="0"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  placeholder="4"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="bathrooms" className={labelClass}>
                  Bathrooms
                </label>
                <input
                  id="bathrooms"
                  type="number"
                  min="0"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  placeholder="4"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="area" className={labelClass}>
                  Area
                </label>
                <input
                  id="area"
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="450 sqm"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Description */}
          <section className={sectionClass}>
            <div className="border-b border-[#303238] pb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D6AD55]">
                Step 03
              </p>
              <h2 className="mt-2 text-xl font-bold text-[#F5F5F3]">
                Property Description
              </h2>
              <p className="mt-1 text-sm text-[#A6A8AD]">
                Give customers a clear picture of what the property offers.
              </p>
            </div>

            <textarea
              required
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the property..."
              className={`${inputClass} mt-6 resize-none`}
            />
          </section>

          {/* Features */}
          <section className={sectionClass}>
            <div className="flex flex-col gap-3 border-b border-[#303238] pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D6AD55]">
                  Step 04
                </p>
                <h2 className="mt-2 text-xl font-bold text-[#F5F5F3]">
                  Property Features
                </h2>
                <p className="mt-1 text-sm text-[#A6A8AD]">
                  Add the features customers should know about.
                </p>
              </div>

              <button
                type="button"
                onClick={addFeature}
                className="w-fit rounded-xl border border-[#D6AD55]/30 bg-[#D6AD55]/10 px-4 py-2.5 text-sm font-semibold text-[#D6AD55] transition hover:bg-[#D6AD55]/20"
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
                    className={`${inputClass} mt-0 min-w-0 flex-1`}
                  />

                  {features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="flex h-12 shrink-0 items-center gap-2 rounded-xl border border-red-500/20 px-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
                    >
                      <FiX size={17} />
                      <span className="hidden sm:inline">Remove</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Property Images */}
          <section className={sectionClass}>
            <div className="border-b border-[#303238] pb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D6AD55]">
                Step 05
              </p>
              <h2 className="mt-2 text-xl font-bold text-[#F5F5F3]">
                Property Images
              </h2>
              <p className="mt-1 text-sm leading-6 text-[#A6A8AD]">
                Upload the exterior, living room, bedrooms, kitchen, bathrooms
                and other parts of the property.
              </p>
            </div>

            <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#D6AD55]/30 bg-[#111315] px-6 py-10 text-center transition hover:border-[#D6AD55] hover:bg-[#242629]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D6AD55]/20 bg-[#D6AD55]/10 text-[#D6AD55]">
                <FiUpload size={25} />
              </div>

              <p className="mt-5 font-semibold text-[#F5F5F3]">
                {isUploading ? "Uploading images..." : "Select property images"}
              </p>

              <p className="mt-2 text-sm text-[#A6A8AD]">
                Choose multiple PNG, JPG or WebP images
              </p>

              <p className="mt-2 text-xs text-[#777B82]">
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
              <div className="mt-5 rounded-xl border border-[#D6AD55]/20 bg-[#D6AD55]/6 p-4">
                <p className="text-sm font-medium text-[#E5C477]">
                  Uploading your images to Supabase Storage. Please wait...
                </p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#303238]">
                  <div className="h-full w-1/2 animate-pulse rounded-full bg-[#D6AD55]" />
                </div>
              </div>
            )}

            {images.length > 0 ? (
              <div className="mt-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-bold text-[#F5F5F3]">
                      Uploaded Images ({images.length})
                    </h3>
                    <p className="mt-1 text-sm text-[#A6A8AD]">
                      Select an image to make it the main cover photo.
                    </p>
                  </div>

                  <span className="w-fit rounded-full border border-[#D6AD55]/20 bg-[#D6AD55]/10 px-3 py-1 text-xs font-semibold text-[#D6AD55]">
                    {images.length} {images.length === 1 ? "photo" : "photos"}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {images.map((imageUrl, index) => (
                    <div
                      key={imageUrl}
                      className={`overflow-hidden rounded-2xl border-2 bg-[#111315] transition ${
                        coverImageIndex === index
                          ? "border-[#D6AD55] shadow-lg shadow-[#D6AD55]/10"
                          : "border-[#303238]"
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
                          <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-1 bg-[#D6AD55] px-2 py-2 text-xs font-bold text-[#111315]">
                            <FiStar size={14} />
                            Main Cover Photo
                          </span>
                        ) : (
                          <span className="absolute bottom-2 left-2 rounded-lg bg-black/75 px-2 py-1 text-xs font-medium text-white">
                            Photo {index + 1}
                          </span>
                        )}
                      </button>

                      <div className="flex items-center justify-between gap-2 p-3">
                        <span className="truncate text-xs text-[#A6A8AD]">
                          Image {index + 1}
                        </span>

                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-red-400 transition hover:bg-red-500/10"
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
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/6 p-4">
                <FiImage className="mt-0.5 shrink-0 text-[#D6AD55]" size={20} />
                <p className="text-sm leading-6 text-[#A6A8AD]">
                  At least one image is required. Your first uploaded image will
                  be the cover photo unless you select another.
                </p>
              </div>
            )}
          </section>

          {/* Form Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-[#303238] pt-6 sm:flex-row sm:justify-end">
            <Link
              to="/admin"
              className="rounded-xl border border-[#303238] bg-[#242629] px-6 py-3.5 text-center font-semibold text-[#F5F5F3] transition hover:border-[#D6AD55] hover:text-[#D6AD55]"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isUploading || isSaving}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#D6AD55] px-6 py-3.5 font-bold text-[#111315] transition hover:bg-[#E5C477] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? <FiCheckCircle size={18} /> : <FiSave size={18} />}

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
