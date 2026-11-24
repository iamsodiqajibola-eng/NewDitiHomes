import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiImage,
  FiSave,
  FiUpload,
  FiX,
  FiStar,
  FiPlus,
  FiHome,
  FiMapPin,
  FiDollarSign,
  FiInfo,
  FiCheckCircle,
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

      // Replace local preview URLs with permanent Storage URLs.
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

  const inputClass =
    "mt-2 w-full rounded-xl border border-[#383A40] bg-[#242629] px-4 py-3 text-sm text-[#F5F5F3] outline-none transition placeholder:text-[#777A80] focus:border-[#D6AD55] focus:ring-1 focus:ring-[#D6AD55]/30";

  const labelClass = "text-sm font-semibold text-[#D0D1D2]";

  const sectionClass =
    "rounded-2xl border border-[#303238] bg-[#1B1D20] p-5 sm:p-8";

  if (!property) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#111315] px-5">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#303238] bg-[#1B1D20] text-[#D6AD55]">
            <FiHome size={30} />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-[#F5F5F3]">
            Property not found
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#A6A8AD]">
            This property may have been removed or is still loading.
          </p>

          <Link
            to="/admin"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#D6AD55] px-5 py-3 text-sm font-bold text-[#111315] transition hover:bg-[#E5C477]"
          >
            <FiArrowLeft />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111315] text-[#F5F5F3]">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[#303238] bg-[#111315]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-5 py-5 md:px-8">
          <Link
            to="/admin"
            aria-label="Back to dashboard"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#383A40] bg-[#1B1D20] text-[#D6AD55] transition hover:border-[#D6AD55] hover:bg-[#242629]"
          >
            <FiArrowLeft size={20} />
          </Link>

          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D6AD55]">
              Property Management
            </p>

            <h1 className="mt-1 text-xl font-bold text-[#F5F5F3] sm:text-2xl">
              Edit Property
            </h1>

            <p className="mt-1 text-xs text-[#A6A8AD] sm:text-sm">
              Update this listing and manage its photos.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8 md:px-8 md:py-10">
        {/* Page Introduction */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#858890]">
            <Link to="/admin" className="transition hover:text-[#D6AD55]">
              Dashboard
            </Link>
            <span>/</span>
            <span className="text-[#D6AD55]">Edit Property</span>
          </div>

          <h2 className="mt-4 text-2xl font-bold text-[#F5F5F3] sm:text-3xl">
            Update your listing
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#A6A8AD]">
            Make changes to your property information, features and gallery.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <section className={sectionClass}>
            <div className="flex items-center gap-3 border-b border-[#303238] pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D6AD55]/20 bg-[#D6AD55]/10 text-[#D6AD55]">
                <FiHome size={20} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#F5F5F3]">
                  Basic Information
                </h2>
                <p className="mt-1 text-xs text-[#858890]">
                  Main details about this property.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className={labelClass}>Property Title</label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={inputClass}
                  placeholder="Enter property title"
                />
              </div>

              <div>
                <label className={labelClass}>Location</label>
                <div className="relative">
                  <FiMapPin className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#858890]" />
                  <input
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={`${inputClass} pl-11`}
                    placeholder="e.g. Lekki Phase 1, Lagos"
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Price</label>
                <div className="relative">
                  <FiDollarSign className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#858890]" />
                  <input
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. ₦85,000,000"
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Property Type</label>
                <select
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
                <label className={labelClass}>Listing Purpose</label>
                <select
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
          </section>

          {/* Property Details */}
          <section className={sectionClass}>
            <div className="flex items-center gap-3 border-b border-[#303238] pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D6AD55]/20 bg-[#D6AD55]/10 text-[#D6AD55]">
                <FiInfo size={20} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#F5F5F3]">
                  Property Details
                </h2>
                <p className="mt-1 text-xs text-[#858890]">
                  Specify the property's size and accommodation details.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              <div>
                <label className={labelClass}>Bedrooms</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Bathrooms</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Area</label>
                <input
                  required
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. 450 sqm"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Description */}
          <section className={sectionClass}>
            <div className="flex items-center gap-3 border-b border-[#303238] pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D6AD55]/20 bg-[#D6AD55]/10 text-[#D6AD55]">
                <FiInfo size={20} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#F5F5F3]">
                  Property Description
                </h2>
                <p className="mt-1 text-xs text-[#858890]">
                  Give visitors a clear picture of this property.
                </p>
              </div>
            </div>

            <textarea
              required
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${inputClass} mt-6 resize-y leading-7`}
              placeholder="Describe the property..."
            />
          </section>

          {/* Features */}
          <section className={sectionClass}>
            <div className="flex flex-col gap-4 border-b border-[#303238] pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D6AD55]/20 bg-[#D6AD55]/10 text-[#D6AD55]">
                  <FiCheckCircle size={20} />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-[#F5F5F3]">
                    Property Features
                  </h2>
                  <p className="mt-1 text-xs text-[#858890]">
                    Add or remove property features.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={addFeature}
                className="flex w-fit items-center gap-2 rounded-xl border border-[#D6AD55]/30 bg-[#D6AD55]/10 px-4 py-2.5 text-sm font-semibold text-[#D6AD55] transition hover:bg-[#D6AD55]/20"
              >
                <FiPlus size={17} />
                Add Feature
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder="e.g. 24/7 Security"
                    className={`${inputClass} mt-0 min-w-0 flex-1`}
                  />

                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    aria-label={`Remove feature ${index + 1}`}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-red-500/20 text-red-400 transition hover:bg-red-500/10"
                  >
                    <FiX size={19} />
                  </button>
                </div>
              ))}

              {features.length === 0 && (
                <p className="rounded-xl border border-dashed border-[#383A40] px-4 py-6 text-center text-sm text-[#858890]">
                  No features added yet.
                </p>
              )}
            </div>
          </section>

          {/* Property Images */}
          <section className={sectionClass}>
            <div className="flex items-center gap-3 border-b border-[#303238] pb-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#D6AD55]/20 bg-[#D6AD55]/10 text-[#D6AD55]">
                <FiImage size={20} />
              </div>

              <div>
                <h2 className="text-lg font-bold text-[#F5F5F3]">
                  Property Images
                </h2>
                <p className="mt-1 text-xs text-[#858890]">
                  Manage your property gallery.
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-6 text-[#A6A8AD]">
              Keep existing photos, add more, remove photos, or select a new
              cover image. The first photo is used as the main listing image.
            </p>

            {/* Upload Area */}
            <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#D6AD55]/30 bg-[#242629] px-5 py-9 text-center transition hover:border-[#D6AD55] hover:bg-[#292B2F] sm:py-11">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D6AD55]/20 bg-[#D6AD55]/10 text-[#D6AD55]">
                <FiUpload size={24} />
              </span>

              <span className="mt-4 font-bold text-[#F5F5F3]">
                Add more property photos
              </span>

              <span className="mt-2 text-sm text-[#858890]">
                Select multiple image files at once.
              </span>

              <span className="mt-1 text-xs text-[#666970]">
                Maximum 10 MB per image
              </span>

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            {/* Image Gallery */}
            {images.length > 0 ? (
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                {images.map((image, index) => (
                  <div
                    key={`${index}-${image.slice(-30)}`}
                    className="min-w-0 overflow-hidden rounded-xl border border-[#383A40] bg-[#242629]"
                  >
                    <div className="relative">
                      <img
                        src={image}
                        alt={`Property photo ${index + 1}`}
                        className="aspect-square w-full object-cover"
                      />

                      {index === 0 && (
                        <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-[#D6AD55] px-2.5 py-1.5 text-xs font-bold text-[#111315]">
                          <FiStar size={12} />
                          Cover
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        aria-label={`Remove photo ${index + 1}`}
                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/75 text-white transition hover:bg-red-600"
                      >
                        <FiX size={17} />
                      </button>
                    </div>

                    {index !== 0 && (
                      <button
                        type="button"
                        onClick={() => makeCoverImage(index)}
                        className="flex min-h-11 w-full items-center justify-center gap-1.5 px-2 py-2 text-xs font-semibold text-[#D6AD55] transition hover:bg-[#D6AD55]/10"
                      >
                        <FiImage size={14} />
                        Make cover
                      </button>
                    )}

                    {index === 0 && (
                      <div className="flex min-h-11 items-center justify-center gap-1.5 px-2 py-2 text-xs font-semibold text-[#D6AD55]">
                        <FiCheckCircle size={14} />
                        Main image
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 px-5 py-8 text-center">
                <FiImage className="mx-auto text-amber-400" size={28} />

                <p className="mt-3 text-sm font-semibold text-amber-300">
                  No photos selected
                </p>

                <p className="mt-1 text-xs text-[#A6A8AD]">
                  Add at least one image before saving.
                </p>
              </div>
            )}

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#303238] pt-5">
              <p className="text-sm text-[#A6A8AD]">
                <span className="font-bold text-[#F5F5F3]">
                  {images.length}
                </span>{" "}
                {images.length === 1 ? "photo" : "photos"} in this listing
              </p>

              <p className="text-xs text-[#858890]">
                First image = Cover image
              </p>
            </div>
          </section>

          {/* Form Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-[#303238] pt-6 sm:flex-row sm:justify-end">
            <Link
              to="/admin"
              className="rounded-xl border border-[#383A40] bg-[#1B1D20] px-6 py-3.5 text-center text-sm font-semibold text-[#D0D1D2] transition hover:border-[#D6AD55]/50 hover:bg-[#242629]"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#D6AD55] px-7 py-3.5 text-sm font-bold text-[#111315] transition hover:bg-[#E5C477] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FiSave size={18} />
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default EditProperty;
