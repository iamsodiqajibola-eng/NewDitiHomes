import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiHeart,
  FiMessageSquare,
  FiClock,
  FiEdit2,
  FiSave,
  FiX,
  FiArrowRight,
  FiHome,
  FiSettings,
  FiLock,
  FiLogOut,
  FiCamera,
  FiTrash2,
  FiExternalLink,
  FiRefreshCw,
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import type { Property } from "../data/properties";
import { supabase } from "../lib/supabase";

type ProfileDetails = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
};

const initialProfile: ProfileDetails = {
  fullName: "Your Name",
  email: "your@email.com",
  phone: "",
  location: "",
};

const MAX_PHOTO_SIZE = 5 * 1024 * 1024;

type SavedProperty = Property & {
  favorite_id: number;
};

const Profile = () => {
  const [profile, setProfile] = useState<ProfileDetails>(initialProfile);
  const [formData, setFormData] = useState<ProfileDetails>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);

  const [activeTab, setActiveTab] = useState<"saved" | "enquiries" | "recent">(
    "saved",
  );

  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState("");

  const [savedProperties, setSavedProperties] = useState<SavedProperty[]>([]);
  const [savedLoading, setSavedLoading] = useState(true);
  const [savedError, setSavedError] = useState("");
  const [removingFavorite, setRemovingFavorite] = useState<number | null>(null);

  const photoInputRef = useRef<HTMLInputElement>(null);

  // Load customer profile and saved properties
  const loadSavedProperties = async () => {
    setSavedLoading(true);
    setSavedError("");

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;

      if (!user) {
        setSavedProperties([]);
        setSavedError("Please log in to view your saved properties.");
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("full_name, email")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) throw profileError;

      setProfile((previous) => ({
        ...previous,
        fullName:
          profileData?.full_name ||
          user.user_metadata?.full_name ||
          "Your Name",
        email: profileData?.email || user.email || "your@email.com",
      }));

      const { data: favorites, error: favoritesError } = await supabase
        .from("property_favorites")
        .select("id, property_id")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (favoritesError) throw favoritesError;

      const favoriteRows = favorites ?? [];

      if (favoriteRows.length === 0) {
        setSavedProperties([]);
        return;
      }

      const propertyIds = favoriteRows.map((favorite) => favorite.property_id);

      const { data: properties, error: propertiesError } = await supabase
        .from("properties")
        .select("*")
        .in("id", propertyIds)
        .eq("is_deleted", false);

      if (propertiesError) throw propertiesError;

      const favoriteMap = new Map(
        favoriteRows.map((favorite) => [
          Number(favorite.property_id),
          Number(favorite.id),
        ]),
      );

      const saved = (properties ?? []).map((property) => ({
        ...property,
        favorite_id: favoriteMap.get(Number(property.id)) ?? 0,
      })) as SavedProperty[];

      setSavedProperties(saved);
    } catch (error) {
      console.error("Unable to load customer profile:", error);
      setSavedError(
        "We couldn't load your saved properties. Please try again.",
      );
    } finally {
      setSavedLoading(false);
    }
  };

  useEffect(() => {
    void loadSavedProperties();
  }, []);

  useEffect(() => {
    if (!profilePhoto) return;

    return () => {
      URL.revokeObjectURL(profilePhoto);
    };
  }, [profilePhoto]);

  const handlePhotoButtonClick = () => {
    setPhotoError("");
    photoInputRef.current?.click();
  };

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setPhotoError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_PHOTO_SIZE) {
      setPhotoError("Your image must be 5 MB or smaller.");
      event.target.value = "";
      return;
    }

    const imageUrl = URL.createObjectURL(file);

    setProfilePhoto(imageUrl);
    setPhotoError("");
    event.target.value = "";
  };

  const handleRemovePhoto = () => {
    setProfilePhoto(null);
    setPhotoError("");

    if (photoInputRef.current) {
      photoInputRef.current.value = "";
    }
  };

  const handleEdit = () => {
    setFormData(profile);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof ProfileDetails, value: string) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleRemoveFavorite = async (propertyId: number) => {
    setRemovingFavorite(propertyId);
    setSavedError("");

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) throw authError;
      if (!user) throw new Error("Please log in again.");

      const { error } = await supabase
        .from("property_favorites")
        .delete()
        .eq("user_id", user.id)
        .eq("property_id", propertyId);

      if (error) throw error;

      setSavedProperties((current) =>
        current.filter((property) => property.id !== propertyId),
      );
    } catch (error) {
      console.error("Unable to remove saved property:", error);
      setSavedError("Unable to remove this property. Please try again.");
    } finally {
      setRemovingFavorite(null);
    }
  };

  const initials = profile.fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  const inputClass =
    "w-full rounded-xl border border-(--dh-border) bg-(--dh-bg-secondary) px-4 py-3 text-sm text-(--dh-white) outline-none transition placeholder:text-(--dh-muted) focus:border-(--dh-gold)";

  const cardClass =
    "rounded-2xl border border-(--dh-border) bg-(--dh-surface) transition-colors duration-300";

  const secondaryText = "text-(--dh-muted)";
  const goldText = "text-(--dh-gold)";

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-(--dh-bg) text-(--dh-white) transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Page Heading */}
          <div className="mb-8">
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-(--dh-gold)">
              My Account
            </p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              My Profile
            </h1>

            <p
              className={`mt-2 max-w-2xl text-sm leading-6 sm:text-base ${secondaryText}`}
            >
              Manage your personal information, keep track of your favourite
              properties and manage your DitiHomes account.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[320px_1fr]">
            {/* Sidebar */}
            <aside className="space-y-5">
              {/* Profile Card */}
              <div className={`${cardClass} p-6`}>
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4 flex h-24 w-24 items-center justify-center overflow-visible rounded-full border-2 border-(--dh-gold) bg-(--dh-bg-secondary) text-3xl font-semibold text-(--dh-gold)">
                    {profilePhoto ? (
                      <img
                        src={profilePhoto}
                        alt="Your profile"
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      initials || <FiUser />
                    )}

                    <button
                      type="button"
                      onClick={handlePhotoButtonClick}
                      aria-label="Change profile photo"
                      title="Change profile photo"
                      className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-(--dh-surface) bg-(--dh-gold) text-(--dh-bg) transition hover:bg-(--dh-gold-light)"
                    >
                      <FiCamera size={14} />
                    </button>

                    <input
                      ref={photoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                      aria-label="Choose a profile photo"
                    />
                  </div>

                  <h2 className="text-xl font-semibold">{profile.fullName}</h2>

                  <p className={`mt-1 text-sm ${secondaryText}`}>
                    {profile.email}
                  </p>

                  {profilePhoto && (
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="mt-3 inline-flex items-center gap-2 text-xs font-medium text-(--dh-danger) transition hover:opacity-75"
                    >
                      <FiTrash2 size={13} />
                      Remove photo
                    </button>
                  )}

                  {photoError && (
                    <p
                      role="alert"
                      className="mt-3 max-w-full text-xs text-(--dh-danger)"
                    >
                      {photoError}
                    </p>
                  )}

                  <span className="mt-4 rounded-full border border-(--dh-gold)/30 bg-(--dh-gold)/10 px-4 py-1.5 text-xs font-medium text-(--dh-gold)">
                    Customer Account
                  </span>
                </div>

                <div className="my-6 border-t border-(--dh-border)" />

                <div className={`space-y-4 text-sm ${secondaryText}`}>
                  <div className="flex items-center gap-3">
                    <FiMail className={`shrink-0 ${goldText}`} />
                    <span className="truncate">{profile.email}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <FiPhone className={`shrink-0 ${goldText}`} />
                    <span>{profile.phone || "Phone not added"}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <FiMapPin className={`shrink-0 ${goldText}`} />
                    <span>{profile.location || "Location not added"}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleEdit}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-(--dh-gold) px-4 py-3 text-sm font-medium text-(--dh-gold) transition hover:bg-(--dh-gold) hover:text-(--dh-bg)"
                >
                  <FiEdit2 size={16} />
                  Edit Profile
                </button>
              </div>

              {/* Account Navigation */}
              <div className={`${cardClass} p-3`}>
                <p
                  className={`px-3 pb-3 pt-2 text-xs font-semibold uppercase tracking-wider ${secondaryText}`}
                >
                  Account
                </p>

                <button
                  type="button"
                  onClick={() => setActiveTab("saved")}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                    activeTab === "saved"
                      ? "bg-(--dh-gold)/10 text-(--dh-gold)"
                      : `${secondaryText} hover:bg-(--dh-surface-hover) hover:text-(--dh-white)`
                  }`}
                >
                  <FiHeart size={17} />
                  Saved Properties
                  <span className="ml-auto text-xs">
                    {savedProperties.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("enquiries")}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                    activeTab === "enquiries"
                      ? "bg-(--dh-gold)/10 text-(--dh-gold)"
                      : `${secondaryText} hover:bg-(--dh-surface-hover) hover:text-(--dh-white)`
                  }`}
                >
                  <FiMessageSquare size={17} />
                  My Enquiries
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("recent")}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                    activeTab === "recent"
                      ? "bg-(--dh-gold)/10 text-(--dh-gold)"
                      : `${secondaryText} hover:bg-(--dh-surface-hover) hover:text-(--dh-white)`
                  }`}
                >
                  <FiClock size={17} />
                  Recently Viewed
                </button>

                <div className="my-3 border-t border-(--dh-border)" />

                <button
                  type="button"
                  onClick={handleEdit}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition hover:bg-(--dh-surface-hover) ${secondaryText} hover:text-(--dh-white)`}
                >
                  <FiSettings size={17} />
                  Account Settings
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    await supabase.auth.signOut();
                    window.location.href = "/login";
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-(--dh-danger) transition hover:bg-(--dh-danger)/10"
                >
                  <FiLogOut size={17} />
                  Logout
                </button>
              </div>
            </aside>

            {/* Main Content */}
            <section className="min-w-0 space-y-7">
              {/* Overview Cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className={`${cardClass} p-5`}>
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-(--dh-gold)/10 text-(--dh-gold)">
                    <FiHeart size={20} />
                  </div>

                  <p className="text-2xl font-semibold tabular-nums">
                    {savedLoading ? "..." : savedProperties.length}
                  </p>
                  <p className={`mt-1 text-sm ${secondaryText}`}>
                    Saved Properties
                  </p>
                </div>

                <div className={`${cardClass} p-5`}>
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-(--dh-gold)/10 text-(--dh-gold)">
                    <FiMessageSquare size={20} />
                  </div>

                  <p className="text-2xl font-semibold">0</p>
                  <p className={`mt-1 text-sm ${secondaryText}`}>
                    My Enquiries
                  </p>
                </div>

                <div className={`${cardClass} p-5`}>
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-(--dh-gold)/10 text-(--dh-gold)">
                    <FiClock size={20} />
                  </div>

                  <p className="text-2xl font-semibold">0</p>
                  <p className={`mt-1 text-sm ${secondaryText}`}>
                    Recently Viewed
                  </p>
                </div>
              </div>

              {/* Edit Profile Form */}
              {isEditing && (
                <div className={`${cardClass} border-(--dh-gold)/30 p-6`}>
                  <div className="mb-6 flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold">
                        Edit Personal Information
                      </h2>
                      <p className={`mt-1 text-sm ${secondaryText}`}>
                        Update your account details.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleCancel}
                      aria-label="Close edit form"
                      className={`rounded-lg p-2 transition hover:bg-(--dh-surface-hover) ${secondaryText} hover:text-(--dh-white)`}
                    >
                      <FiX size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className={`mb-2 block text-sm ${secondaryText}`}>
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(event) =>
                          handleInputChange("fullName", event.target.value)
                        }
                        placeholder="Enter your full name"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={`mb-2 block text-sm ${secondaryText}`}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(event) =>
                          handleInputChange("email", event.target.value)
                        }
                        placeholder="Enter your email"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={`mb-2 block text-sm ${secondaryText}`}>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(event) =>
                          handleInputChange("phone", event.target.value)
                        }
                        placeholder="Enter your phone number"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={`mb-2 block text-sm ${secondaryText}`}>
                        Location
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(event) =>
                          handleInputChange("location", event.target.value)
                        }
                        placeholder="e.g. Ikeja, Lagos"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className={`rounded-xl border border-(--dh-border) px-5 py-3 text-sm font-medium transition hover:bg-(--dh-surface-hover) ${secondaryText}`}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handleSave}
                      className="flex items-center gap-2 rounded-xl bg-(--dh-gold) px-5 py-3 text-sm font-semibold text-(--dh-bg) transition hover:bg-(--dh-gold-light)"
                    >
                      <FiSave size={16} />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* Activity Section */}
              <div className={`${cardClass} overflow-hidden`}>
                <div className="border-b border-(--dh-border) p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {activeTab === "saved"
                          ? "My Saved Properties"
                          : activeTab === "enquiries"
                            ? "My Enquiries"
                            : "Recently Viewed"}
                      </h2>

                      <p className={`mt-1 text-sm ${secondaryText}`}>
                        {activeTab === "saved"
                          ? "Properties you've saved for later."
                          : activeTab === "enquiries"
                            ? "Keep track of your property enquiries."
                            : "Properties you've recently explored."}
                      </p>
                    </div>

                    {activeTab === "saved" && (
                      <span
                        className={`rounded-full border border-(--dh-border) px-3 py-1 text-xs ${secondaryText}`}
                      >
                        {savedProperties.length} saved
                      </span>
                    )}

                    {activeTab === "saved" && (
                      <button
                        type="button"
                        onClick={() => void loadSavedProperties()}
                        disabled={savedLoading}
                        aria-label="Refresh saved properties"
                        className={`rounded-lg p-2 transition hover:bg-(--dh-bg-secondary) ${secondaryText} hover:text-(--dh-gold)`}
                      >
                        <FiRefreshCw
                          size={17}
                          className={savedLoading ? "animate-spin" : ""}
                        />
                      </button>
                    )}
                  </div>
                </div>

                {activeTab === "saved" ? (
                  <div className="p-5 sm:p-6">
                    {savedLoading ? (
                      <div className="flex min-h-64 items-center justify-center">
                        <div className="text-center">
                          <FiRefreshCw
                            size={28}
                            className="mx-auto animate-spin text-(--dh-gold)"
                          />
                          <p className={`mt-4 text-sm ${secondaryText}`}>
                            Loading your saved properties...
                          </p>
                        </div>
                      </div>
                    ) : savedError ? (
                      <div className="flex min-h-64 flex-col items-center justify-center text-center">
                        <p className="text-sm text-(--dh-danger)">
                          {savedError}
                        </p>
                        <button
                          type="button"
                          onClick={() => void loadSavedProperties()}
                          className="mt-4 rounded-xl bg-(--dh-gold) px-5 py-3 text-sm font-semibold text-(--dh-bg)"
                        >
                          Try Again
                        </button>
                      </div>
                    ) : savedProperties.length === 0 ? (
                      <div className="flex min-h-64 flex-col items-center justify-center px-5 py-12 text-center">
                        <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-(--dh-gold)/20 bg-(--dh-gold)/10 text-(--dh-gold)">
                          <FiHeart size={32} />
                        </div>

                        <h3 className="text-lg font-semibold">
                          No saved properties yet
                        </h3>

                        <p
                          className={`mt-2 max-w-sm text-sm leading-6 ${secondaryText}`}
                        >
                          When you find a property you love, tap the heart icon
                          to save it here and easily find it later.
                        </p>

                        <Link
                          to="/properties"
                          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-(--dh-gold) px-5 py-3 text-sm font-semibold text-(--dh-bg) transition hover:bg-(--dh-gold-light)"
                        >
                          <FiHome size={16} />
                          Explore Properties
                          <FiArrowRight size={16} />
                        </Link>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {savedProperties.map((property) => (
                          <article
                            key={property.id}
                            className="overflow-hidden rounded-2xl border border-(--dh-border) bg-(--dh-bg-secondary)"
                          >
                            <Link
                              to={`/properties/${property.id}`}
                              className="group relative block aspect-16/10 overflow-hidden"
                            >
                              <img
                                src={property.image}
                                alt={property.title}
                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                              />

                              <span className="absolute left-3 top-3 rounded-full bg-black/75 px-3 py-1.5 text-xs font-semibold text-white">
                                {property.purpose}
                              </span>
                            </Link>

                            <div className="p-4">
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <Link
                                    to={`/properties/${property.id}`}
                                    className="font-semibold transition hover:text-(--dh-gold)"
                                  >
                                    {property.title}
                                  </Link>

                                  <p
                                    className={`mt-2 flex items-center gap-1.5 text-xs ${secondaryText}`}
                                  >
                                    <FiMapPin size={14} className="shrink-0" />
                                    <span className="truncate">
                                      {property.location}
                                    </span>
                                  </p>
                                </div>

                                <button
                                  type="button"
                                  onClick={() =>
                                    void handleRemoveFavorite(property.id)
                                  }
                                  disabled={removingFavorite === property.id}
                                  aria-label={`Remove ${property.title} from saved properties`}
                                  title="Remove from saved properties"
                                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-(--dh-danger)/30 bg-(--dh-danger)/10 text-(--dh-danger) transition hover:bg-(--dh-danger) hover:text-white disabled:opacity-50"
                                >
                                  {removingFavorite === property.id ? (
                                    <FiRefreshCw
                                      size={16}
                                      className="animate-spin"
                                    />
                                  ) : (
                                    <FiHeart size={17} fill="currentColor" />
                                  )}
                                </button>
                              </div>

                              <p className="mt-4 text-lg font-bold text-(--dh-gold)">
                                {property.price}
                              </p>

                              <div className="mt-4 flex items-center justify-between gap-3 border-t border-(--dh-border) pt-4">
                                <span className={`text-xs ${secondaryText}`}>
                                  {property.bedrooms > 0
                                    ? `${property.bedrooms} Bedrooms`
                                    : property.type}
                                </span>

                                <Link
                                  to={`/properties/${property.id}`}
                                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-(--dh-gold) transition hover:opacity-75"
                                >
                                  View Property
                                  <FiExternalLink size={14} />
                                </Link>
                              </div>
                            </div>
                          </article>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex min-h-82.5 flex-col items-center justify-center px-5 py-12 text-center">
                    <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-(--dh-gold)/20 bg-(--dh-gold)/10 text-(--dh-gold)">
                      {activeTab === "enquiries" ? (
                        <FiMessageSquare size={32} />
                      ) : (
                        <FiClock size={32} />
                      )}
                    </div>

                    <h3 className="text-lg font-semibold">
                      {activeTab === "enquiries"
                        ? "No enquiries yet"
                        : "Nothing viewed yet"}
                    </h3>

                    <p
                      className={`mt-2 max-w-sm text-sm leading-6 ${secondaryText}`}
                    >
                      {activeTab === "enquiries"
                        ? "When you enquire about a property, your enquiries will appear here."
                        : "Properties you explore will appear here so you can easily find them again."}
                    </p>

                    <Link
                      to="/properties"
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-(--dh-gold) px-5 py-3 text-sm font-semibold text-(--dh-bg) transition hover:bg-(--dh-gold-light)"
                    >
                      <FiHome size={16} />
                      Explore Properties
                      <FiArrowRight size={16} />
                    </Link>
                  </div>
                )}
              </div>

              {/* Security Section */}
              <div className={`${cardClass} p-5 sm:p-6`}>
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--dh-gold)/10 text-(--dh-gold)">
                    <FiLock size={20} />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold">Account Security</h3>
                    <p className={`mt-1 text-sm leading-6 ${secondaryText}`}>
                      Keep your account information secure. Password management
                      and security options will be available here.
                    </p>

                    <button
                      type="button"
                      disabled
                      className={`mt-4 cursor-not-allowed rounded-lg border border-(--dh-border) px-4 py-2 text-sm ${secondaryText}`}
                      title="Coming soon"
                    >
                      Change Password · Coming Soon
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Profile;
