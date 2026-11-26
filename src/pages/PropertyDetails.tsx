import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiCheckCircle,
  FiCopy,
  FiHome,
  FiMapPin,
  FiMail,
  FiMessageCircle,
  FiPhone,
  FiSend,
  FiShare2,
  FiUser,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
  FiHeart,
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyMap from "../components/PropertyMap";

import { useProperties } from "../context/PropertyContext";
import { supabase } from "../lib/supabase";

const DITI_HOMES_PHONE = "+2348142676421";

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties } = useProperties();

  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showFullGallery, setShowFullGallery] = useState(false);

  // Favourite states
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [favoriteMessage, setFavoriteMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const property = properties.find((item) => item.id === Number(id));

  const galleryImages = property?.images?.length
    ? property.images
    : property
      ? [property.image]
      : [];

  const safeImageIndex =
    galleryImages.length > 0
      ? Math.min(activeImageIndex, galleryImages.length - 1)
      : 0;

  const activeImage = galleryImages[safeImageIndex] ?? "";

  useEffect(() => {
    setActiveImageIndex(0);
    setShowFullGallery(false);
    setShowShareOptions(false);
  }, [id]);

  // Load the current user's favourite status
  useEffect(() => {
    let isMounted = true;

    async function loadFavoriteStatus() {
      setIsFavorite(false);
      setFavoriteMessage("");
      setCurrentUserId(null);

      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (!isMounted) return;

      if (authError || !user) {
        return;
      }

      setCurrentUserId(user.id);

      const { data, error } = await supabase
        .from("property_favorites")
        .select("id")
        .eq("user_id", user.id)
        .eq("property_id", Number(id))
        .maybeSingle();

      if (!isMounted) return;

      if (error) {
        console.error("Unable to load favorite status:", error);
        return;
      }

      setIsFavorite(Boolean(data));
    }

    void loadFavoriteStatus();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Save or remove a favourite
  async function handleToggleFavorite() {
    if (favoriteLoading || !property) return;

    if (!currentUserId) {
      navigate("/login");
      return;
    }

    setFavoriteLoading(true);
    setFavoriteMessage("");

    try {
      if (isFavorite) {
        const { error } = await supabase
          .from("property_favorites")
          .delete()
          .eq("user_id", currentUserId)
          .eq("property_id", property.id);

        if (error) throw error;

        setIsFavorite(false);
        setFavoriteMessage("Property removed from your saved properties.");
      } else {
        const { error } = await supabase.from("property_favorites").insert({
          user_id: currentUserId,
          property_id: property.id,
        });

        if (error) throw error;

        setIsFavorite(true);
        setFavoriteMessage("Property saved successfully.");
      }
    } catch (error) {
      console.error("Unable to update favorite:", error);
      setFavoriteMessage(
        "Unable to update your saved properties. Please try again.",
      );
    } finally {
      setFavoriteLoading(false);
    }
  }

  useEffect(() => {
    if (!showFullGallery) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setShowFullGallery(false);
      }

      if (event.key === "ArrowRight" && galleryImages.length > 1) {
        setActiveImageIndex((index) =>
          index >= galleryImages.length - 1 ? 0 : index + 1,
        );
      }

      if (event.key === "ArrowLeft" && galleryImages.length > 1) {
        setActiveImageIndex((index) =>
          index <= 0 ? galleryImages.length - 1 : index - 1,
        );
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [showFullGallery, galleryImages.length]);

  if (!property) {
    return (
      <div className="dh-page min-h-screen">
        <Navbar />

        <section className="flex min-h-screen items-center justify-center px-5 pt-20">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-(--dh-gold)/20 bg-(--dh-gold)/10 text-(--dh-gold)">
              <FiHome size={32} />
            </div>

            <h1 className="mt-6 text-3xl font-bold text-(--dh-white)">
              Property not found
            </h1>

            <p className="mt-3 max-w-md leading-7 text-(--dh-muted)">
              The property you are looking for does not exist or may have been
              removed.
            </p>

            <Link
              to="/properties"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-(--dh-gold) px-6 py-3 font-semibold text-[#111315] transition hover:bg-(--dh-gold-light)"
            >
              <FiArrowLeft size={18} />
              Back to Properties
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  const currentProperty = property;
  const propertyUrl = window.location.href;

  // Round coordinates to show an approximate area, not the exact address.
  const approximateMapProperty = {
    ...currentProperty,
    latitude:
      typeof currentProperty.latitude === "number"
        ? Number(currentProperty.latitude.toFixed(2))
        : null,
    longitude:
      typeof currentProperty.longitude === "number"
        ? Number(currentProperty.longitude.toFixed(2))
        : null,
    location: "Approximate property area",
  };

  const whatsappMessage = encodeURIComponent(
    `Hello DitiHomes, I'm interested in the ${currentProperty.title} in ${currentProperty.location} listed at ${currentProperty.price}. Please I'd like to get more information.\n\nProperty link: ${propertyUrl}`,
  );

  const whatsappUrl = `https://wa.me/${DITI_HOMES_PHONE.replace(/\D/g, "")}?text=${whatsappMessage}`;

  const cardClass =
    "rounded-2xl border border-(--dh-border) bg-(--dh-surface) shadow-lg transition-colors duration-300 sm:rounded-3xl";

  const detailBoxClass =
    "min-w-0 rounded-xl border border-(--dh-border) bg-(--dh-bg-secondary) p-3 sm:rounded-2xl sm:p-4";

  const secondaryText = "text-(--dh-muted)";
  const mainText = "text-(--dh-white)";

  function showPreviousImage() {
    setActiveImageIndex((index) =>
      index <= 0 ? galleryImages.length - 1 : index - 1,
    );
  }

  function showNextImage() {
    setActiveImageIndex((index) =>
      index >= galleryImages.length - 1 ? 0 : index + 1,
    );
  }

  async function handleNativeShare() {
    if (!navigator.share) {
      setShowShareOptions(true);
      return;
    }

    try {
      await navigator.share({
        title: currentProperty.title,
        text: `Check out this property on DitiHomes: ${currentProperty.title} - ${currentProperty.location}`,
        url: propertyUrl,
      });
    } catch (error) {
      if ((error as DOMException).name !== "AbortError") {
        setShowShareOptions(true);
      }
    }
  }

  async function copyPropertyLink() {
    try {
      await navigator.clipboard.writeText(propertyUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      alert("Unable to copy the property link.");
    }
  }

  function openShareLink(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="dh-page min-h-screen">
      <Navbar />

      {/* Property Header */}
      <section className="relative overflow-hidden border-b border-(--dh-border) bg-(--dh-bg-secondary) pt-32 transition-colors duration-300">
        <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-(--dh-gold)/6 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-5 pb-12 md:px-8 lg:px-10">
          <Link
            to="/properties"
            className={`inline-flex items-center gap-2 text-sm font-semibold ${secondaryText} transition hover:text-(--dh-gold)`}
          >
            <FiArrowLeft size={18} />
            Back to Properties
          </Link>

          <div className="mt-8 max-w-3xl sm:mt-10">
            <span className="inline-block rounded-full border border-(--dh-gold)/30 bg-(--dh-gold)/10 px-4 py-2 text-xs font-bold text-(--dh-gold)">
              {currentProperty.purpose}
            </span>

            <h1
              className={`mt-5 text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl ${mainText}`}
            >
              {currentProperty.title}
            </h1>

            <div className={`mt-5 flex items-start gap-2 ${secondaryText}`}>
              <FiMapPin
                className="mt-0.5 shrink-0 text-(--dh-gold)"
                size={19}
              />
              <span>{currentProperty.location}</span>
            </div>

            <p className="mt-5 text-2xl font-bold text-(--dh-gold) sm:text-3xl">
              {currentProperty.price}
            </p>
          </div>
        </div>
      </section>

      {/* Main Property Content */}
      <section className="overflow-hidden bg-(--dh-bg) px-4 py-8 transition-colors duration-300 sm:px-6 sm:py-12 md:px-8 lg:px-10 lg:py-16">
        <div className="mx-auto grid w-full max-w-7xl min-w-0 grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_380px] xl:gap-10">
          {/* Gallery and Property Information */}
          <div className="min-w-0">
            {/* Property Gallery */}
            <div className={`w-full min-w-0 overflow-hidden ${cardClass}`}>
              <div className="relative w-full overflow-hidden bg-(--dh-bg-secondary)">
                {activeImage ? (
                  <img
                    src={activeImage}
                    alt={`${currentProperty.title} - Photo ${safeImageIndex + 1}`}
                    className="aspect-4/3 w-full object-cover sm:aspect-16/10 lg:aspect-4/3 xl:aspect-16/10"
                  />
                ) : (
                  <div className="flex aspect-4/3 w-full items-center justify-center text-(--dh-muted)">
                    <FiHome size={48} />
                  </div>
                )}

                {galleryImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPreviousImage}
                      aria-label="Previous property image"
                      className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/80 text-white shadow-lg transition hover:bg-(--dh-gold) hover:text-[#111315] sm:left-4 sm:h-11 sm:w-11"
                    >
                      <FiChevronLeft size={22} />
                    </button>

                    <button
                      type="button"
                      onClick={showNextImage}
                      aria-label="Next property image"
                      className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/80 text-white shadow-lg transition hover:bg-(--dh-gold) hover:text-[#111315] sm:right-4 sm:h-11 sm:w-11"
                    >
                      <FiChevronRight size={22} />
                    </button>
                  </>
                )}

                <span className="absolute bottom-3 left-3 rounded-full bg-black/75 px-3 py-1.5 text-xs font-semibold text-white sm:bottom-4 sm:left-4 sm:px-4 sm:py-2 sm:text-sm">
                  {safeImageIndex + 1} / {galleryImages.length} photos
                </span>

                <button
                  type="button"
                  onClick={() => setShowFullGallery(true)}
                  className="absolute bottom-3 right-3 flex items-center gap-2 rounded-lg bg-(--dh-gold) px-3 py-2 text-xs font-semibold text-[#111315] shadow-lg transition hover:bg-(--dh-gold-light) sm:bottom-4 sm:right-4 sm:rounded-xl sm:px-4 sm:text-sm"
                >
                  <FiMaximize2 size={15} />
                  View all photos
                </button>
              </div>

              {/* Thumbnails */}
              {galleryImages.length > 1 && (
                <div className="flex min-w-0 gap-2 overflow-x-auto overscroll-x-contain p-3 sm:gap-3 sm:p-4">
                  {galleryImages.map((imageUrl, index) => (
                    <button
                      key={`${index}-${imageUrl.slice(-20)}`}
                      type="button"
                      onClick={() => setActiveImageIndex(index)}
                      aria-label={`View property photo ${index + 1}`}
                      aria-pressed={safeImageIndex === index}
                      className={`h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-20 sm:w-28 sm:rounded-xl ${
                        safeImageIndex === index
                          ? "border-(--dh-gold) ring-2 ring-(--dh-gold)/20"
                          : "border-transparent opacity-75 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={imageUrl}
                        alt={`Property thumbnail ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Overview */}
            <div className={`mt-6 p-5 sm:mt-8 sm:p-8 ${cardClass}`}>
              <h2 className={`text-xl font-bold sm:text-2xl ${mainText}`}>
                Property Overview
              </h2>

              <p className={`mt-4 wrap-break-words leading-7 ${secondaryText}`}>
                {currentProperty.description}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-2 xl:grid-cols-4">
                <div className={detailBoxClass}>
                  <p className={`text-xs ${secondaryText}`}>Type</p>
                  <p className={`mt-1 wrap-break-words font-bold ${mainText}`}>
                    {currentProperty.type}
                  </p>
                </div>

                <div className={detailBoxClass}>
                  <p className={`text-xs ${secondaryText}`}>Bedrooms</p>
                  <p className={`mt-1 font-bold ${mainText}`}>
                    {currentProperty.bedrooms || "N/A"}
                  </p>
                </div>

                <div className={detailBoxClass}>
                  <p className={`text-xs ${secondaryText}`}>Bathrooms</p>
                  <p className={`mt-1 font-bold ${mainText}`}>
                    {currentProperty.bathrooms || "N/A"}
                  </p>
                </div>

                <div className={detailBoxClass}>
                  <p className={`text-xs ${secondaryText}`}>Area</p>
                  <p className={`mt-1 wrap-break-words font-bold ${mainText}`}>
                    {currentProperty.area || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Property Features */}
            <div className={`mt-6 p-5 sm:mt-8 sm:p-8 ${cardClass}`}>
              <h2 className={`text-xl font-bold sm:text-2xl ${mainText}`}>
                Property Features
              </h2>

              <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">
                {currentProperty.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex min-w-0 items-start gap-3 rounded-xl border border-(--dh-border) bg-(--dh-bg-secondary) p-3 sm:p-4"
                  >
                    <FiCheckCircle
                      className="mt-0.5 shrink-0 text-(--dh-gold)"
                      size={20}
                    />

                    <span
                      className={`wrap-break-words text-sm font-medium ${secondaryText}`}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Property Location */}
            <div className={`mt-6 p-5 sm:mt-8 sm:p-8 ${cardClass}`}>
              <div className="mb-5">
                <h2 className={`text-xl font-bold sm:text-2xl ${mainText}`}>
                  Property Location
                </h2>

                <p className={`mt-2 text-sm leading-6 ${secondaryText}`}>
                  Explore the approximate area of this property on the map. The
                  exact location is shared during property verification.
                </p>
              </div>

              {approximateMapProperty.latitude !== null &&
              approximateMapProperty.longitude !== null ? (
                <PropertyMap
                  properties={[approximateMapProperty]}
                  height="320px"
                />
              ) : (
                <div className="flex min-h-64 items-center justify-center rounded-2xl border border-(--dh-border) bg-(--dh-bg-secondary) p-6 text-center">
                  <div>
                    <FiMapPin size={30} className="mx-auto text-(--dh-gold)" />

                    <p className={`mt-3 font-semibold ${mainText}`}>
                      Location map unavailable
                    </p>

                    <p className={`mt-2 text-sm ${secondaryText}`}>
                      Location coordinates have not been provided for this
                      property.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Panel */}
          <aside className="min-w-0 w-full lg:sticky lg:top-24 lg:w-auto">
            <div className={`w-full min-w-0 p-5 sm:p-7 xl:p-8 ${cardClass}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-(--dh-gold) sm:text-sm sm:tracking-[0.15em]">
                Interested in this property?
              </p>

              <h2 className={`mt-3 text-xl font-bold sm:text-2xl ${mainText}`}>
                Let's help you get it.
              </h2>

              <p
                className={`mt-3 wrap-break-words text-sm leading-6 sm:mt-4 ${secondaryText}`}
              >
                Speak with DitiHomes to get more information, schedule a viewing
                or discuss this property.
              </p>

              {/* Actual Listing Agent */}
              <div className="mt-5 rounded-xl border border-(--dh-border) bg-(--dh-bg-secondary) p-4 sm:mt-7 sm:rounded-2xl sm:p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-(--dh-gold)/15 text-(--dh-gold)">
                    <FiUser size={23} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className={`font-bold ${mainText}`}>
                      {currentProperty.agent?.full_name || "DitiHomes"}
                    </p>

                    <p className={`text-sm ${secondaryText}`}>
                      {currentProperty.agent?.agency_name ||
                        "Property Consultant"}
                    </p>
                  </div>

                  {currentProperty.agent?.is_verified && (
                    <div
                      className="flex shrink-0 items-center gap-1 rounded-full bg-(--dh-success)/10 px-2 py-1 text-xs font-semibold text-(--dh-success)"
                      title="Verified agent"
                    >
                      <FiCheckCircle size={14} />
                      Verified
                    </div>
                  )}
                </div>

                {currentProperty.agent?.phone && (
                  <a
                    href={`tel:${currentProperty.agent.phone}`}
                    className="mt-4 flex items-center gap-2 text-sm font-semibold text-(--dh-gold) hover:underline"
                  >
                    <FiPhone size={16} />
                    {currentProperty.agent.phone}
                  </a>
                )}

                {currentProperty.agent?.email && (
                  <a
                    href={`mailto:${currentProperty.agent.email}`}
                    className={`mt-2 flex items-center gap-2 text-sm ${secondaryText} hover:text-(--dh-gold)`}
                  >
                    <FiMail size={16} />
                    {currentProperty.agent.email}
                  </a>
                )}

                {!currentProperty.agent && (
                  <p className={`mt-3 text-xs leading-5 ${secondaryText}`}>
                    Contact DitiHomes for assistance with this property.
                  </p>
                )}
              </div>

              {/* Save / Unsave Property */}
              <button
                type="button"
                onClick={handleToggleFavorite}
                disabled={favoriteLoading}
                aria-pressed={isFavorite}
                className={`mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 sm:text-base ${
                  isFavorite
                    ? "border-(--dh-danger)/40 bg-(--dh-danger)/10 text-(--dh-danger)"
                    : "border-(--dh-border) text-(--dh-white) hover:border-(--dh-gold) hover:bg-(--dh-gold)/10 hover:text-(--dh-gold)"
                }`}
              >
                <FiHeart
                  size={19}
                  fill={isFavorite ? "currentColor" : "none"}
                />

                {favoriteLoading
                  ? "Updating..."
                  : isFavorite
                    ? "Saved to Favourites"
                    : "Save to Favourites"}
              </button>

              {favoriteMessage && (
                <p
                  role="status"
                  className="mt-2 text-center text-xs text-(--dh-muted)"
                >
                  {favoriteMessage}
                </p>
              )}

              {/* Call */}
              <a
                href={`tel:${DITI_HOMES_PHONE}`}
                className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-(--dh-gold) px-4 py-3 text-center text-sm font-semibold text-[#111315] transition hover:bg-(--dh-gold-light) sm:mt-6 sm:text-base"
              >
                <FiPhone size={18} className="shrink-0" />
                Call DitiHomes
              </a>

              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-(--dh-success)/40 bg-(--dh-success)/10 px-4 py-3 text-center text-sm font-semibold text-(--dh-success) transition hover:bg-(--dh-success) hover:text-white sm:text-base"
              >
                <FiMessageCircle size={18} className="shrink-0" />
                WhatsApp DitiHomes
              </a>

              {/* Share */}
              <button
                type="button"
                onClick={() => setShowShareOptions(true)}
                className={`mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-(--dh-border) px-4 py-3 text-center text-sm font-semibold ${mainText} transition hover:border-(--dh-gold) hover:bg-(--dh-gold)/10 hover:text-(--dh-gold) sm:text-base`}
              >
                <FiShare2 size={18} className="shrink-0" />
                Share Property
              </button>

              {/* Verification Note */}
              <div className="mt-6 border-t border-(--dh-border) pt-5 sm:mt-7 sm:pt-6">
                <div className="flex items-start gap-3">
                  <FiCheckCircle
                    className="mt-0.5 shrink-0 text-(--dh-success)"
                    size={18}
                  />

                  <p className={`text-sm leading-6 ${secondaryText}`}>
                    Property information should be verified with DitiHomes
                    before making any payment or commitment.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Full-Screen Gallery */}
      {showFullGallery && (
        <div
          className="fixed inset-0 z-100 flex h-dvh flex-col overflow-hidden bg-[#090A0B]/98"
          role="dialog"
          aria-modal="true"
          aria-label="Property photo gallery"
        >
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3 text-white sm:px-8 sm:py-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold sm:text-base">
                {currentProperty.title}
              </p>

              <p className="mt-1 text-xs text-white/65 sm:text-sm">
                Photo {safeImageIndex + 1} of {galleryImages.length}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowFullGallery(false)}
              aria-label="Close full-screen gallery"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 transition hover:bg-(--dh-gold) hover:text-[#111315] sm:h-11 sm:w-11"
            >
              <FiX size={24} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-3 sm:px-16">
            {activeImage && (
              <img
                src={activeImage}
                alt={`${currentProperty.title} - Photo ${safeImageIndex + 1}`}
                className="max-h-full max-w-full object-contain"
              />
            )}

            {galleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPreviousImage}
                  aria-label="Previous photo"
                  className="absolute left-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-(--dh-gold) hover:text-[#111315] sm:left-6 sm:h-14 sm:w-14"
                >
                  <FiChevronLeft size={26} />
                </button>

                <button
                  type="button"
                  onClick={showNextImage}
                  aria-label="Next photo"
                  className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-(--dh-gold) hover:text-[#111315] sm:right-6 sm:h-14 sm:w-14"
                >
                  <FiChevronRight size={26} />
                </button>
              </>
            )}
          </div>

          {galleryImages.length > 1 && (
            <div className="flex shrink-0 justify-start gap-2 overflow-x-auto overscroll-x-contain border-t border-white/10 px-4 py-3 sm:justify-center sm:px-6 sm:py-5">
              {galleryImages.map((imageUrl, index) => (
                <button
                  key={`${index}-${imageUrl.slice(-20)}`}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`View photo ${index + 1}`}
                  aria-pressed={safeImageIndex === index}
                  className={`h-12 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-16 sm:w-20 ${
                    safeImageIndex === index
                      ? "border-(--dh-gold)"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={imageUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Share Options */}
      {showShareOptions && (
        <div className="fixed inset-0 z-110 flex items-end justify-center overflow-y-auto bg-black/70 p-3 backdrop-blur-sm sm:items-center sm:p-4">
          <div className="my-auto w-full max-w-md rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5 shadow-2xl transition-colors duration-300 sm:rounded-3xl sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className={`text-xl font-bold ${mainText}`}>
                  Share Property
                </h2>

                <p className={`mt-1 text-sm ${secondaryText}`}>
                  Share this property with someone.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowShareOptions(false)}
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-(--dh-bg-secondary) ${secondaryText} transition hover:text-(--dh-gold)`}
                aria-label="Close share options"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {typeof navigator !== "undefined" && "share" in navigator && (
                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="flex w-full items-center gap-3 rounded-xl bg-(--dh-gold) px-4 py-3.5 text-left font-semibold text-[#111315] transition hover:bg-(--dh-gold-light)"
                >
                  <FiShare2 size={20} />
                  More sharing options
                </button>
              )}

              <button
                type="button"
                onClick={() => openShareLink(whatsappUrl)}
                className="flex w-full items-center gap-3 rounded-xl border border-(--dh-success)/30 bg-(--dh-success)/10 px-4 py-3.5 text-left font-semibold text-(--dh-success) transition hover:bg-(--dh-success) hover:text-white"
              >
                <FiMessageCircle size={20} />
                Share on WhatsApp
              </button>

              <button
                type="button"
                onClick={() =>
                  openShareLink(
                    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(propertyUrl)}`,
                  )
                }
                className={`flex w-full items-center gap-3 rounded-xl border border-(--dh-border) px-4 py-3.5 text-left font-semibold ${mainText} transition hover:border-(--dh-gold) hover:bg-(--dh-bg-secondary)`}
              >
                <FiShare2 size={20} />
                Share on Facebook
              </button>

              <button
                type="button"
                onClick={() =>
                  openShareLink(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      `${currentProperty.title} - ${currentProperty.location}`,
                    )}&url=${encodeURIComponent(propertyUrl)}`,
                  )
                }
                className={`flex w-full items-center gap-3 rounded-xl border border-(--dh-border) px-4 py-3.5 text-left font-semibold ${mainText} transition hover:border-(--dh-gold) hover:bg-(--dh-bg-secondary)`}
              >
                <FiSend size={20} />
                Share on X
              </button>

              <button
                type="button"
                onClick={() =>
                  openShareLink(
                    `https://t.me/share/url?url=${encodeURIComponent(propertyUrl)}&text=${encodeURIComponent(
                      `${currentProperty.title} - ${currentProperty.location}`,
                    )}`,
                  )
                }
                className={`flex w-full items-center gap-3 rounded-xl border border-(--dh-border) px-4 py-3.5 text-left font-semibold ${mainText} transition hover:border-(--dh-gold) hover:bg-(--dh-bg-secondary)`}
              >
                <FiSend size={20} />
                Share on Telegram
              </button>

              <a
                href={`mailto:?subject=${encodeURIComponent(
                  currentProperty.title,
                )}&body=${encodeURIComponent(
                  `Check out this property on DitiHomes:\n\n${currentProperty.title}\n${currentProperty.location}\n${currentProperty.price}\n\n${propertyUrl}`,
                )}`}
                className={`flex w-full items-center gap-3 rounded-xl border border-(--dh-border) px-4 py-3.5 text-left font-semibold ${mainText} transition hover:border-(--dh-gold) hover:bg-(--dh-bg-secondary)`}
              >
                <FiMail size={20} />
                Share by Email
              </a>

              <button
                type="button"
                onClick={copyPropertyLink}
                className={`flex w-full items-center gap-3 rounded-xl border border-(--dh-border) px-4 py-3.5 text-left font-semibold ${mainText} transition hover:border-(--dh-gold) hover:bg-(--dh-bg-secondary)`}
              >
                {copied ? (
                  <FiCheckCircle size={20} className="text-(--dh-success)" />
                ) : (
                  <FiCopy size={20} />
                )}

                {copied ? "Link Copied!" : "Copy Property Link"}
              </button>
            </div>

            <p className="mt-4 text-center text-xs leading-5 text-(--dh-muted)">
              On supported devices, the system sharing menu lets you choose
              compatible apps installed on your device.
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default PropertyDetails;
