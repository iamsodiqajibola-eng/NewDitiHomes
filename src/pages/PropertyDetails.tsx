import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
} from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Environment from "../components/Environment";
import SunsetHomeVideo from "../assets/sunset-home.mp4";
import { useProperties } from "../context/PropertyContext";
const DITI_HOMES_PHONE = "+2348142676421";
function PropertyDetails() {
  const { id } = useParams();
  const { properties } = useProperties();
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showFullGallery, setShowFullGallery] = useState(false);
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
  useEffect(() => {
    if (!showFullGallery) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setShowFullGallery(false);
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
      <>
        <Navbar />
        <section className="flex min-h-screen items-center justify-center bg-sky-50 px-5 pt-20">
          <div className="text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-[#071A3D] shadow-lg">
              <FiHome size={32} />
            </div>
            <h1 className="mt-6 text-3xl font-bold text-[#071A3D]">
              Property not found
            </h1>
            <p className="mt-3 text-gray-500">
              The property you are looking for does not exist or may have been
              removed.
            </p>
            <Link
              to="/properties"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#071A3D] px-6 py-3 font-semibold text-white transition hover:bg-[#123D78]"
            >
              <FiArrowLeft size={18} />
              Back to Properties
            </Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }
  const currentProperty = property;
  const propertyUrl = window.location.href;
  const whatsappMessage = encodeURIComponent(
    `Hello DitiHomes, I'm interested in the ${currentProperty.title} in ${currentProperty.location} listed at ${currentProperty.price}. Please I'd like to get more information.\n\nProperty link: ${propertyUrl}`,
  );
  const whatsappUrl = `https://wa.me/${DITI_HOMES_PHONE.replace(/\D/g, "")}?text=${whatsappMessage}`;
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
    <>
      <Navbar />
      <Environment
        video={SunsetHomeVideo}
        overlay="bg-[#041126]/55"
        className="pt-32"
      >
        <div className="mx-auto max-w-7xl px-5 pb-16 md:px-8 lg:px-10">
          <Link
            to="/properties"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[#F5C542]"
          >
            <FiArrowLeft size={18} />
            Back to Properties
          </Link>
          <div className="mt-8 max-w-3xl sm:mt-10">
            <span className="inline-block rounded-full bg-[#D4AF37] px-4 py-2 text-xs font-bold text-[#071A3D]">
              {currentProperty.purpose}
            </span>
            <h1 className="mt-5 text-3xl font-bold leading-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
              {currentProperty.title}
            </h1>
            <div className="mt-5 flex items-start gap-2 text-white/90">
              <FiMapPin className="mt-0.5 shrink-0" size={19} />
              <span>{currentProperty.location}</span>
            </div>
            <p className="mt-5 text-2xl font-bold text-[#F5C542] sm:text-3xl">
              {currentProperty.price}
            </p>
          </div>
        </div>
      </Environment>
      <section className="overflow-hidden bg-sky-50 px-4 py-8 sm:px-6 sm:py-12 md:px-8 lg:px-10 lg:py-16">
        <div className="mx-auto grid w-full max-w-7xl min-w-0 grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_380px] xl:gap-10">
          {/* Gallery and property information */}
          <div className="min-w-0">
            <div className="w-full min-w-0 overflow-hidden rounded-2xl bg-white shadow-xl sm:rounded-3xl">
              <div className="relative w-full overflow-hidden bg-gray-100">
                <img
                  src={activeImage}
                  alt={`${currentProperty.title} - Photo ${safeImageIndex + 1}`}
                  className="aspect-4/3 w-full object-cover sm:aspect-16/10 lg:aspect-4/3 xl:aspect-16/10"
                />
                {galleryImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={showPreviousImage}
                      aria-label="Previous property image"
                      className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#071A3D] shadow-lg transition hover:bg-white sm:left-4 sm:h-11 sm:w-11"
                    >
                      <FiChevronLeft size={22} />
                    </button>
                    <button
                      type="button"
                      onClick={showNextImage}
                      aria-label="Next property image"
                      className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#071A3D] shadow-lg transition hover:bg-white sm:right-4 sm:h-11 sm:w-11"
                    >
                      <FiChevronRight size={22} />
                    </button>
                  </>
                )}
                <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold text-white sm:bottom-4 sm:left-4 sm:px-4 sm:py-2 sm:text-sm">
                  {safeImageIndex + 1} / {galleryImages.length} photos
                </span>
                <button
                  type="button"
                  onClick={() => setShowFullGallery(true)}
                  className="absolute bottom-3 right-3 flex items-center gap-2 rounded-lg bg-white/95 px-3 py-2 text-xs font-semibold text-[#071A3D] shadow-lg transition hover:bg-white sm:bottom-4 sm:right-4 sm:rounded-xl sm:px-4 sm:text-sm"
                >
                  <FiMaximize2 size={15} />
                  View all photos
                </button>
              </div>
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
                          ? "border-[#D4AF37] ring-2 ring-[#D4AF37]/20"
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
            <div className="mt-6 rounded-2xl bg-white p-5 shadow-lg sm:mt-8 sm:rounded-3xl sm:p-8">
              <h2 className="text-xl font-bold text-[#071A3D] sm:text-2xl">
                Property Overview
              </h2>
              <p className="mt-4 wrap-break-words leading-7 text-gray-600">
                {currentProperty.description}
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4 lg:grid-cols-2 xl:grid-cols-4">
                <div className="min-w-0 rounded-xl bg-sky-50 p-3 sm:rounded-2xl sm:p-4">
                  <p className="text-xs text-gray-500">Type</p>
                  <p className="mt-1 wrap-break-words font-bold text-[#071A3D]">
                    {currentProperty.type}
                  </p>
                </div>
                <div className="min-w-0 rounded-xl bg-sky-50 p-3 sm:rounded-2xl sm:p-4">
                  <p className="text-xs text-gray-500">Bedrooms</p>
                  <p className="mt-1 font-bold text-[#071A3D]">
                    {currentProperty.bedrooms || "N/A"}
                  </p>
                </div>
                <div className="min-w-0 rounded-xl bg-sky-50 p-3 sm:rounded-2xl sm:p-4">
                  <p className="text-xs text-gray-500">Bathrooms</p>
                  <p className="mt-1 font-bold text-[#071A3D]">
                    {currentProperty.bathrooms || "N/A"}
                  </p>
                </div>
                <div className="min-w-0 rounded-xl bg-sky-50 p-3 sm:rounded-2xl sm:p-4">
                  <p className="text-xs text-gray-500">Area</p>
                  <p className="mt-1 wrap-break-words font-bold text-[#071A3D]">
                    {currentProperty.area || "N/A"}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 rounded-2xl bg-white p-5 shadow-lg sm:mt-8 sm:rounded-3xl sm:p-8">
              <h2 className="text-xl font-bold text-[#071A3D] sm:text-2xl">
                Property Features
              </h2>
              <div className="mt-5 grid gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">
                {currentProperty.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex min-w-0 items-start gap-3 rounded-xl bg-sky-50 p-3 sm:p-4"
                  >
                    <FiCheckCircle
                      className="mt-0.5 shrink-0 text-[#D4AF37]"
                      size={20}
                    />
                    <span className="wrap-break-words text-sm font-medium text-gray-700">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Contact panel: fixed-width column on desktop */}
          <aside className="min-w-0 w-full lg:sticky lg:top-24 lg:w-auto">
            <div className="w-full min-w-0 rounded-2xl bg-white p-5 shadow-xl sm:rounded-3xl sm:p-7 xl:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#B18C16] sm:text-sm sm:tracking-[0.15em]">
                Interested in this property?
              </p>
              <h2 className="mt-3 text-xl font-bold text-[#071A3D] sm:text-2xl">
                Let's help you get it.
              </h2>
              <p className="mt-3 wrap-break-words text-sm leading-6 text-gray-500 sm:mt-4">
                Speak with DitiHomes to get more information, schedule a viewing
                or discuss this property.
              </p>
              <div className="mt-5 flex min-w-0 items-center gap-3 rounded-xl bg-sky-50 p-3 sm:mt-7 sm:gap-4 sm:rounded-2xl sm:p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#071A3D] text-white sm:h-12 sm:w-12">
                  <FiUser size={22} />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-[#071A3D]">DitiHomes</p>
                  <p className="text-sm text-gray-500">Property Consultant</p>
                  <a
                    href={`tel:${DITI_HOMES_PHONE}`}
                    className="mt-1 block wrap-break-words text-sm font-semibold text-[#071A3D] hover:underline"
                  >
                    +234 814 267 6421
                  </a>
                </div>
              </div>
              <a
                href={`tel:${DITI_HOMES_PHONE}`}
                className="mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-4 py-3 text-center text-sm font-semibold text-[#071A3D] transition hover:bg-[#c29f2f] sm:mt-6 sm:text-base"
              >
                <FiPhone size={18} className="shrink-0" />
                Call DitiHomes
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-green-600 sm:text-base"
              >
                <FiMessageCircle size={18} className="shrink-0" />
                WhatsApp DitiHomes
              </a>
              <button
                type="button"
                onClick={() => setShowShareOptions(true)}
                className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#071A3D] px-4 py-3 text-center text-sm font-semibold text-[#071A3D] transition hover:bg-[#071A3D] hover:text-white sm:text-base"
              >
                <FiShare2 size={18} className="shrink-0" />
                Share Property
              </button>
              <div className="mt-6 border-t border-gray-100 pt-5 sm:mt-7 sm:pt-6">
                <div className="flex items-start gap-3">
                  <FiCheckCircle
                    className="mt-0.5 shrink-0 text-green-500"
                    size={18}
                  />
                  <p className="text-sm leading-6 text-gray-500">
                    Property information should be verified with DitiHomes
                    before making any payment or commitment.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
      {/* Full-screen gallery */}
      {showFullGallery && (
        <div
          className="fixed inset-0 z-100 flex h-dvh flex-col overflow-hidden bg-black/95"
          role="dialog"
          aria-modal="true"
          aria-label="Property photo gallery"
        >
          <div className="flex shrink-0 items-center justify-between gap-3 px-4 py-3 text-white sm:px-8 sm:py-4">
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
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 sm:h-11 sm:w-11"
            >
              <FiX size={24} />
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-3 sm:px-16">
            <img
              src={activeImage}
              alt={`${currentProperty.title} - Photo ${safeImageIndex + 1}`}
              className="max-h-full max-w-full object-contain"
            />
            {galleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={showPreviousImage}
                  aria-label="Previous photo"
                  className="absolute left-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:left-6 sm:h-14 sm:w-14"
                >
                  <FiChevronLeft size={26} />
                </button>
                <button
                  type="button"
                  onClick={showNextImage}
                  aria-label="Next photo"
                  className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:right-6 sm:h-14 sm:w-14"
                >
                  <FiChevronRight size={26} />
                </button>
              </>
            )}
          </div>
          {galleryImages.length > 1 && (
            <div className="flex shrink-0 justify-start gap-2 overflow-x-auto overscroll-x-contain px-4 py-3 sm:justify-center sm:px-6 sm:py-5">
              {galleryImages.map((imageUrl, index) => (
                <button
                  key={`${index}-${imageUrl.slice(-20)}`}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  aria-label={`View photo ${index + 1}`}
                  aria-pressed={safeImageIndex === index}
                  className={`h-12 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition sm:h-16 sm:w-20 ${
                    safeImageIndex === index
                      ? "border-[#D4AF37]"
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
      {/* Share options */}
      {showShareOptions && (
        <div className="fixed inset-0 z-110 flex items-end justify-center overflow-y-auto bg-black/50 p-3 sm:items-center sm:p-4">
          <div className="my-auto w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-[#071A3D]">
                  Share Property
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Share this property with someone.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowShareOptions(false)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
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
                  className="flex w-full items-center gap-3 rounded-xl bg-[#071A3D] px-4 py-3.5 text-left font-semibold text-white transition hover:bg-[#123D78]"
                >
                  <FiShare2 size={20} />
                  More sharing options
                </button>
              )}
              <button
                type="button"
                onClick={() => openShareLink(whatsappUrl)}
                className="flex w-full items-center gap-3 rounded-xl bg-green-500 px-4 py-3.5 text-left font-semibold text-white transition hover:bg-green-600"
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
                className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3.5 text-left font-semibold text-[#071A3D] transition hover:bg-gray-50"
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
                className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3.5 text-left font-semibold text-[#071A3D] transition hover:bg-gray-50"
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
                className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3.5 text-left font-semibold text-[#071A3D] transition hover:bg-gray-50"
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
                className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3.5 text-left font-semibold text-[#071A3D] transition hover:bg-gray-50"
              >
                <FiMail size={20} />
                Share by Email
              </a>
              <button
                type="button"
                onClick={copyPropertyLink}
                className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3.5 text-left font-semibold text-[#071A3D] transition hover:bg-gray-50"
              >
                <FiCopy size={20} />
                {copied ? "Link Copied!" : "Copy Property Link"}
              </button>
            </div>
            <p className="mt-4 text-center text-xs leading-5 text-gray-400">
              On supported devices, the system sharing menu lets you choose
              compatible apps installed on your device.
            </p>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
export default PropertyDetails;
