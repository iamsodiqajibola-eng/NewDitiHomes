import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiUploadCloud,
  FiMapPin,
  FiHome,
  FiCheckCircle,
  FiInfo,
  FiX,
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyLocationPicker from "../components/PropertyLocationPicker";
import { supabase } from "../lib/supabase";

function AgentAddProperty() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    listingType: "",
    propertyType: "",
    state: "Lagos",
    city: "",
    area: "",
    address: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    toilets: "",
    size: "",
    furnishing: "",
    parking: "",
  });

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const [images, setImages] = useState<File[]>([]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);

    setImages((previous) => [...previous, ...selectedFiles].slice(0, 10));

    event.target.value = "";
  };

  const removeImage = (index: number) => {
    setImages((previous) => previous.filter((_, i) => i !== index));
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return;

    setMessage("");

    if (latitude === null || longitude === null) {
      setMessage("Please select the property's exact location on the map.");
      return;
    }

    if (images.length > 10) {
      setMessage("You can upload a maximum of 10 images.");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (images.some((file) => !allowedTypes.includes(file.type))) {
      setMessage("Only JPG, PNG and WEBP images are allowed.");
      return;
    }

    if (images.some((file) => file.size > 5 * 1024 * 1024)) {
      setMessage("Each image must be 5MB or smaller.");
      return;
    }

    if (!form.price || Number(form.price) <= 0) {
      setMessage("Please enter a valid property price.");
      return;
    }

    setIsSubmitting(true);

    const uploadedPaths: string[] = [];
    let createdPropertyId: number | null = null;

    try {
      // 1. Get the authenticated user.
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("Your session has expired. Please log in again.");
      }

      // 2. Verify that the logged-in user is an agent.
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError || profile?.role !== "agent") {
        throw new Error("Only registered agents can submit properties.");
      }

      // 3. Upload property images.
      const imageUrls: string[] = [];

      for (const file of images) {
        const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");

        const filePath = `${user.id}/${crypto.randomUUID()}-${safeFileName}`;

        const { error: uploadError } = await supabase.storage
          .from("property-images")
          .upload(filePath, file, {
            contentType: file.type,
            upsert: false,
          });

        if (uploadError) {
          throw new Error(`Image upload failed: ${uploadError.message}`);
        }

        uploadedPaths.push(filePath);

        const { data: publicUrlData } = supabase.storage
          .from("property-images")
          .getPublicUrl(filePath);

        imageUrls.push(publicUrlData.publicUrl);
      }

      // 4. Prepare property information.
      const location = `${form.area.trim()}, ${form.city.trim()}, ${form.state.trim()}`;

      const purpose =
        form.listingType === "Sale"
          ? "For Sale"
          : form.listingType === "Shortlet"
            ? "Shortlet"
            : "For Rent";

      const features = [
        form.toilets ? `${form.toilets} Toilets` : "",
        form.parking ? `${form.parking} Parking Spaces` : "",
        form.furnishing || "",
      ].filter(Boolean);

      // 5. Save the property and attach the agent.
      const { data: property, error: propertyError } = await supabase
        .from("properties")
        .insert({
          agent_id: user.id,
          title: form.title.trim(),
          description: form.description.trim(),
          location,
          price: `₦${Number(form.price).toLocaleString("en-NG")}`,
          type: form.propertyType,
          purpose,
          bedrooms: Number(form.bedrooms) || 0,
          bathrooms: Number(form.bathrooms) || 0,
          area: form.size.trim(),
          image: imageUrls[0] || "",
          images: imageUrls,
          features,
          latitude,
          longitude,
          status: "pending",
          is_deleted: false,
        })
        .select("id")
        .single();

      if (propertyError || !property) {
        throw new Error(
          propertyError?.message || "Unable to save the property.",
        );
      }

      createdPropertyId = property.id;

      // 6. Save the exact property address privately.
      const { error: addressError } = await supabase
        .from("property_private_details")
        .insert({
          property_id: property.id,
          agent_id: user.id,
          full_address: form.address.trim(),
        });

      if (addressError) {
        throw new Error(
          `Your property was saved, but its private address could not be saved: ${addressError.message}. Please contact DitiHomes support before trying again.`,
        );
      }

      setMessage(
        "Property submitted successfully! It is now awaiting DitiHomes admin verification.",
      );

      // Clear the form after successful submission.
      setForm({
        title: "",
        description: "",
        listingType: "",
        propertyType: "",
        state: "Lagos",
        city: "",
        area: "",
        address: "",
        price: "",
        bedrooms: "",
        bathrooms: "",
        toilets: "",
        size: "",
        furnishing: "",
        parking: "",
      });

      setLatitude(null);
      setLongitude(null);
      setImages([]);
    } catch (error) {
      console.error("Property submission error:", error);

      // If the property itself was not created, remove uploaded images.
      if (!createdPropertyId && uploadedPaths.length > 0) {
        const { error: cleanupError } = await supabase.storage
          .from("property-images")
          .remove(uploadedPaths);

        if (cleanupError) {
          console.error("Image cleanup error:", cleanupError);
        }
      }

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting your property.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-(--dh-border) bg-(--dh-bg) px-4 py-3 text-sm text-(--dh-white) outline-none transition placeholder:text-(--dh-muted) focus:border-(--dh-gold)";

  const labelClass = "text-sm font-medium text-(--dh-white)";

  return (
    <div className="min-h-screen bg-(--dh-bg) text-(--dh-white)">
      <Navbar />

      <main className="min-h-screen px-5 pb-16 pt-28 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/agent/properties"
            className="mb-6 inline-flex items-center gap-2 text-sm text-(--dh-muted) transition hover:text-(--dh-gold)"
          >
            <FiArrowLeft size={16} />
            Back to My Properties
          </Link>

          <div className="mb-8">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-(--dh-gold)/10 text-(--dh-gold)">
              <FiHome size={23} />
            </div>

            <h1 className="text-2xl font-bold sm:text-3xl">Add New Property</h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-(--dh-muted)">
              Provide accurate information about the property. Our team will
              review your submission before it appears publicly on DitiHomes.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Basic information */}
            <section className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5 sm:p-7">
              <div className="mb-6">
                <h2 className="text-lg font-semibold">Basic Information</h2>
                <p className="mt-1 text-xs text-(--dh-muted)">
                  Start with the essential details of the property.
                </p>
              </div>

              <div className="space-y-5">
                <div>
                  <label className={labelClass} htmlFor="title">
                    Property title *
                  </label>
                  <input
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={updateField}
                    required
                    placeholder="e.g. Luxury 4 Bedroom Duplex"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="description">
                    Property description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={updateField}
                    required
                    rows={5}
                    placeholder="Describe the property, its condition, features and what makes it special..."
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="listingType">
                      Listing category *
                    </label>
                    <select
                      id="listingType"
                      name="listingType"
                      value={form.listingType}
                      onChange={updateField}
                      required
                      className={inputClass}
                    >
                      <option value="">Select category</option>
                      <option value="Sale">For Sale</option>
                      <option value="Rent">For Rent</option>
                      <option value="Lease">For Lease</option>
                      <option value="Shortlet">Shortlet</option>
                    </select>
                  </div>

                  <div>
                    <label className={labelClass} htmlFor="propertyType">
                      Property type *
                    </label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      value={form.propertyType}
                      onChange={updateField}
                      required
                      className={inputClass}
                    >
                      <option value="">Select property type</option>
                      <option value="Detached Duplex">Detached Duplex</option>
                      <option value="Semi-Detached Duplex">
                        Semi-Detached Duplex
                      </option>
                      <option value="Terraced House">Terraced House</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Penthouse">Penthouse</option>
                      <option value="Bungalow">Bungalow</option>
                      <option value="Land">Land</option>
                      <option value="Commercial Property">
                        Commercial Property
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* Location */}
            <section className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5 sm:p-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-(--dh-gold)/10 text-(--dh-gold)">
                  <FiMapPin size={19} />
                </div>

                <div>
                  <h2 className="text-lg font-semibold">Property Location</h2>
                  <p className="mt-1 text-xs text-(--dh-muted)">
                    Where is this property located?
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="state">
                    State *
                  </label>
                  <input
                    id="state"
                    name="state"
                    value={form.state}
                    onChange={updateField}
                    required
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="city">
                    City / LGA *
                  </label>
                  <input
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={updateField}
                    required
                    placeholder="e.g. Eti-Osa"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="area">
                    Neighbourhood / Area *
                  </label>
                  <input
                    id="area"
                    name="area"
                    value={form.area}
                    onChange={updateField}
                    required
                    placeholder="e.g. Lekki Phase 1"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="address">
                    Property address *
                  </label>
                  <input
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={updateField}
                    required
                    placeholder="Enter the full property address"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Interactive property map */}
              <div className="mt-7">
                <div className="mb-4">
                  <h3 className="text-sm font-semibold">
                    Pinpoint Property Location *
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-(--dh-muted)">
                    Find the property on the map and click its exact position to
                    place a marker.
                  </p>
                </div>

                <PropertyLocationPicker
                  value={
                    latitude !== null && longitude !== null
                      ? { latitude, longitude }
                      : null
                  }
                  onChange={({ latitude, longitude }) =>
                    handleLocationSelect(latitude, longitude)
                  }
                />
              </div>

              <div className="mt-5 flex gap-3 rounded-xl border border-(--dh-gold)/20 bg-(--dh-gold)/5 p-4">
                <FiInfo
                  className="mt-0.5 shrink-0 text-(--dh-gold)"
                  size={17}
                />

                <p className="text-xs leading-5 text-(--dh-muted)">
                  The full address and exact coordinates are for DitiHomes
                  verification. Public listings should display an approximate
                  location to protect property owners and occupants.
                </p>
              </div>
            </section>

            {/* Pricing */}
            <section className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5 sm:p-7">
              <div className="mb-6">
                <h2 className="text-lg font-semibold">Pricing & Features</h2>
                <p className="mt-1 text-xs text-(--dh-muted)">
                  Enter the asking price and property specifications.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="price">
                    Asking price (₦) *
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    min="1"
                    value={form.price}
                    onChange={updateField}
                    required
                    placeholder="e.g. 180000000"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="size">
                    Property size
                  </label>
                  <input
                    id="size"
                    name="size"
                    value={form.size}
                    onChange={updateField}
                    placeholder="e.g. 450 sqm"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="bedrooms">
                    Bedrooms
                  </label>
                  <input
                    id="bedrooms"
                    name="bedrooms"
                    type="number"
                    min="0"
                    value={form.bedrooms}
                    onChange={updateField}
                    placeholder="Number of bedrooms"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="bathrooms">
                    Bathrooms
                  </label>
                  <input
                    id="bathrooms"
                    name="bathrooms"
                    type="number"
                    min="0"
                    value={form.bathrooms}
                    onChange={updateField}
                    placeholder="Number of bathrooms"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="toilets">
                    Toilets
                  </label>
                  <input
                    id="toilets"
                    name="toilets"
                    type="number"
                    min="0"
                    value={form.toilets}
                    onChange={updateField}
                    placeholder="Number of toilets"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="parking">
                    Parking spaces
                  </label>
                  <input
                    id="parking"
                    name="parking"
                    type="number"
                    min="0"
                    value={form.parking}
                    onChange={updateField}
                    placeholder="Number of parking spaces"
                    className={inputClass}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className={labelClass} htmlFor="furnishing">
                    Furnishing status
                  </label>
                  <select
                    id="furnishing"
                    name="furnishing"
                    value={form.furnishing}
                    onChange={updateField}
                    className={inputClass}
                  >
                    <option value="">Select furnishing status</option>
                    <option value="Furnished">Furnished</option>
                    <option value="Semi-furnished">Semi-furnished</option>
                    <option value="Unfurnished">Unfurnished</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Images */}
            <section className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5 sm:p-7">
              <div className="mb-6">
                <h2 className="text-lg font-semibold">Property Images</h2>
                <p className="mt-1 text-xs text-(--dh-muted)">
                  Upload clear, genuine photographs of the property. Maximum 10
                  images.
                </p>
              </div>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-(--dh-border) bg-(--dh-bg) px-5 py-10 text-center transition hover:border-(--dh-gold)/60">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-(--dh-gold)/10 text-(--dh-gold)">
                  <FiUploadCloud size={27} />
                </div>

                <span className="text-sm font-semibold">
                  Click to upload property images
                </span>
                <span className="mt-2 text-xs text-(--dh-muted)">
                  JPG, PNG or WEBP · Up to 10 images · 5MB each
                </span>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleImages}
                  disabled={images.length >= 10}
                  className="hidden"
                />
              </label>

              {images.length > 0 && (
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                  {images.map((file, index) => (
                    <div
                      key={`${file.name}-${index}`}
                      className="relative aspect-square overflow-hidden rounded-xl border border-(--dh-border)"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Property preview ${index + 1}`}
                        className="h-full w-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        aria-label="Remove image"
                        className="absolute right-2 top-2 rounded-full bg-black/75 p-2 text-white hover:bg-red-600"
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <p className="mt-3 text-xs text-(--dh-muted)">
                {images.length} of 10 images selected
              </p>
            </section>

            {/* Review notice */}
            <div className="flex gap-3 rounded-2xl border border-(--dh-gold)/20 bg-(--dh-gold)/5 p-5">
              <FiCheckCircle
                className="mt-0.5 shrink-0 text-(--dh-gold)"
                size={20}
              />

              <div>
                <h3 className="text-sm font-semibold">
                  Admin verification required
                </h3>

                <p className="mt-1 text-xs leading-5 text-(--dh-muted)">
                  Every property submitted to DitiHomes goes through a review
                  process. Your listing will remain unpublished until it has
                  been reviewed and approved by an administrator.
                </p>
              </div>
            </div>

            {message && (
              <div
                role="status"
                aria-live="polite"
                className="rounded-xl border border-(--dh-success)/30 bg-(--dh-success)/10 p-4 text-sm text-(--dh-success)"
              >
                {message}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col-reverse justify-end gap-3 border-t border-(--dh-border) pt-6 sm:flex-row">
              <Link
                to="/agent/properties"
                className="rounded-xl border border-(--dh-border) px-6 py-3 text-center text-sm font-semibold text-(--dh-muted) transition hover:bg-(--dh-surface-hover)"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-(--dh-gold) px-7 py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Submitting Property..." : "Submit for Review"}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AgentAddProperty;
