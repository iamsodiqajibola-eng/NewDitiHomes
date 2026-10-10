import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiImage,
  FiSave,
  FiUpload,
  FiX,
  FiStar,
} from "react-icons/fi";

import { useProperties } from "../context/PropertyContext";
import { supabase } from "../lib/supabase";
import type { Property } from "../data/properties";

function EditProperty() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { properties, updateProperty } = useProperties();

  const property = properties.find((item) => item.id === Number(id));

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("Apartment");
  const [purpose, setPurpose] = useState<"For Sale" | "For Rent" | "Shortlet">(
    "For Sale",
  );
  const [bedrooms, setBedrooms] = useState("0");
  const [bathrooms, setBathrooms] = useState("0");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!property) return;

    setTitle(property.title);
    setLocation(property.location);
    setPrice(property.price);
    setType(property.type);
    setPurpose(property.purpose);
    setBedrooms(String(property.bedrooms));
    setBathrooms(String(property.bathrooms));
    setArea(property.area);
    setDescription(property.description);
    setFeatures(property.features.length > 0 ? [...property.features] : [""]);

    const existingImages = property.images?.length
      ? property.images
      : [property.image];

    setImages(existingImages.filter(Boolean));
    setNewImageFiles([]);
  }, [property]);

  function handleFeatureChange(index: number, value: string) {
    setFeatures((current) =>
      current.map((feature, i) => (i === index ? value : feature)),
    );
  }

  function addFeature() {
    setFeatures((current) => [...current, ""]);
  }

  function removeFeature(index: number) {
    setFeatures((current) => current.filter((_, i) => i !== index));
  }

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);

    if (files.length === 0) return;

    const invalidFile = files.find((file) => !file.type.startsWith("image/"));

    if (invalidFile) {
      alert("Please select image files only.");
      event.target.value = "";
      return;
    }

    const oversizedFile = files.find((file) => file.size > 10 * 1024 * 1024);

    if (oversizedFile) {
      alert("Each image must be 10 MB or smaller.");
      event.target.value = "";
      return;
    }

    const previews = files.map((file) => URL.createObjectURL(file));

    setImages((current) => [...current, ...previews]);
    setNewImageFiles((current) => [...current, ...files]);

    event.target.value = "";
  }

  function removeImage(index: number) {
    const removedImage = images[index];

    if (removedImage?.startsWith("blob:")) {
      URL.revokeObjectURL(removedImage);
    }

    setImages((current) => current.filter((_, i) => i !== index));

    if (removedImage?.startsWith("blob:")) {
      setNewImageFiles((current) => {
        let fileIndex = -1;

        for (let i = 0; i < index; i += 1) {
          if (images[i]?.startsWith("blob:")) {
            fileIndex += 1;
          }
        }

        return current.filter((_, i) => i !== fileIndex);
      });
    }
  }

  function makeCoverImage(index: number) {
    setImages((current) => {
      const selectedImage = current[index];

      return [selectedImage, ...current.filter((_, i) => i !== index)];
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!property) {
      alert("Property not found. Please return to the dashboard.");
      return;
    }

    if (images.length === 0) {
      alert("Please keep or upload at least one property image.");
      return;
    }

    if (!title.trim() || !location.trim() || !price.trim()) {
      alert("Please complete the required property information.");
      return;
    }

    setSaving(true);

    try {
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) {
        throw new Error(sessionError.message);
      }

      if (!sessionData.session) {
        throw new Error("Please log in before editing a property.");
      }

      const uploadedUrls: string[] = [];

      // Upload newly selected images to Supabase Storage.
      for (const file of newImageFiles) {
        const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const filePath = `properties/${crypto.randomUUID()}.${extension}`;

        const { error: uploadError } = await supabase.storage
          .from("property-images")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type,
          });

        if (uploadError) {
          throw new Error(
            `Could not upload ${file.name}: ${uploadError.message}`,
          );
        }

        const { data: publicUrlData } = supabase.storage
          .from("property-images")
          .getPublicUrl(filePath);

        uploadedUrls.push(publicUrlData.publicUrl);
      }

      // Replace local preview URLs with the permanent Storage URLs.
      let uploadedIndex = 0;

      const permanentImages = images.map((image) => {
        if (image.startsWith("blob:")) {
          const url = uploadedUrls[uploadedIndex];
          uploadedIndex += 1;
          return url;
        }

        return image;
      });

      if (
        permanentImages.some((image) => !image || image.startsWith("blob:"))
      ) {
        throw new Error(
          "Some image URLs could not be prepared. Please try again.",
        );
      }

      const updatedProperty: Property = {
        ...property,
        title: title.trim(),
        location: location.trim(),
        price: price.trim(),
        type,
        purpose,
        bedrooms: Number(bedrooms),
        bathrooms: Number(bathrooms),
        area: area.trim(),
        description: description.trim(),
        features: features.map((feature) => feature.trim()).filter(Boolean),
        image: permanentImages[0],
        images: permanentImages,
      };

      await Promise.resolve(updateProperty(updatedProperty));

      alert("Property updated successfully!");
      navigate("/admin");
    } catch (error) {
      console.error("Error updating property:", error);

      const message =
        error instanceof Error
          ? error.message
          : "Unable to update this property. Please try again.";

      alert(message);
    } finally {
      setSaving(false);
    }
  }

  if (!property) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-sky-50 px-5">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#071A3D]">
            Property not found
          </h1>
          <p className="mt-2 text-gray-500">
            This property may have been removed or is still loading.
          </p>
          <Link
            to="/admin"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#071A3D] px-5 py-3 font-semibold text-white"
          >
            <FiArrowLeft />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50">
      <header className="border-b border-sky-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-5 md:px-8">
          <Link
            to="/admin"
            aria-label="Back to dashboard"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-[#071A3D] transition hover:bg-sky-200"
          >
            <FiArrowLeft size={20} />
          </Link>

          <div>
            <h1 className="text-2xl font-bold text-[#071A3D]">Edit Property</h1>
            <p className="mt-1 text-sm text-gray-500">
              Update this listing and manage its photos.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10 md:px-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-[#071A3D]">
              Basic Information
            </h2>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-[#071A3D]">
                  Property Title
                </label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#071A3D]">
                  Location
                </label>
                <input
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#071A3D]">
                  Price
                </label>
                <input
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g. ₦85,000,000"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#071A3D]">
                  Property Type
                </label>
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
                <select
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
          </section>

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
                  required
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
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
                  required
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#071A3D]">
                  Area
                </label>
                <input
                  required
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. 450 sqm"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-[#071A3D]">Description</h2>
            <textarea
              required
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-6 w-full resize-y rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#D4AF37]"
              placeholder="Describe the property..."
            />
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#071A3D]">Features</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Add or remove property features.
                </p>
              </div>

              <button
                type="button"
                onClick={addFeature}
                className="w-fit rounded-xl bg-sky-100 px-4 py-2 text-sm font-semibold text-[#071A3D] hover:bg-sky-200"
              >
                + Add Feature
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder="e.g. 24/7 Security"
                    className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    aria-label={`Remove feature ${index + 1}`}
                    className="rounded-xl px-3 text-sm font-semibold text-red-500 hover:bg-red-50"
                  >
                    <FiX size={20} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-[#071A3D]">
              Property Images
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              Keep existing photos, add more, remove photos, or select a new
              cover image. The first photo is used as the main listing image.
            </p>

            <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-sky-200 bg-sky-50 px-5 py-8 text-center transition hover:border-sky-400 hover:bg-sky-100 sm:py-10">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#071A3D] shadow-sm">
                <FiUpload size={23} />
              </span>
              <span className="mt-3 font-semibold text-[#071A3D]">
                Add more property photos
              </span>
              <span className="mt-1 text-sm text-gray-500">
                Select multiple image files at once. Maximum 10 MB per image.
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {images.length > 0 ? (
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {images.map((image, index) => (
                  <div
                    key={`${index}-${image.slice(-30)}`}
                    className="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white"
                  >
                    <div className="relative">
                      <img
                        src={image}
                        alt={`Property photo ${index + 1}`}
                        className="aspect-square w-full object-cover"
                      />

                      {index === 0 && (
                        <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-[#D4AF37] px-2 py-1 text-xs font-bold text-[#071A3D]">
                          <FiStar size={12} />
                          Cover
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        aria-label={`Remove photo ${index + 1}`}
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white hover:bg-red-600"
                      >
                        <FiX size={17} />
                      </button>
                    </div>

                    {index !== 0 && (
                      <button
                        type="button"
                        onClick={() => makeCoverImage(index)}
                        className="flex min-h-10 w-full items-center justify-center gap-1 px-2 py-2 text-xs font-semibold text-[#071A3D] hover:bg-sky-50"
                      >
                        <FiImage size={14} />
                        Make cover
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-sm text-amber-700">
                No photos selected. Add at least one image before saving.
              </p>
            )}

            <p className="mt-4 text-sm text-gray-500">
              {images.length} {images.length === 1 ? "photo" : "photos"} in this
              listing
            </p>
          </section>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Link
              to="/admin"
              className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-center font-semibold text-[#071A3D] transition hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#071A3D] px-6 py-3 font-semibold text-white transition hover:bg-[#123D78] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiSave size={18} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default EditProperty;
