import { useState } from "react";
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
} from "react-icons/fi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

const Profile = () => {
  const [profile, setProfile] = useState<ProfileDetails>(initialProfile);
  const [formData, setFormData] = useState<ProfileDetails>(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"saved" | "enquiries" | "recent">(
    "saved",
  );

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

  const initials = profile.fullName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#111315] text-[#F5F5F3]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Page Heading */}
          <div className="mb-8">
            <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-[#D6AD55]">
              My Account
            </p>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              My Profile
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#A6A8AD] sm:text-base">
              Manage your personal information, keep track of your favourite
              properties and manage your DitiHomes account.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[320px_1fr]">
            {/* Sidebar */}
            <aside className="space-y-5">
              {/* Profile Card */}
              <div className="rounded-2xl border border-[#303238] bg-[#1B1D20] p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4 flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#D6AD55] bg-[#242629] text-3xl font-semibold text-[#D6AD55]">
                    {initials || <FiUser />}

                    <button
                      type="button"
                      aria-label="Change profile photo"
                      title="Change profile photo"
                      className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#1B1D20] bg-[#D6AD55] text-[#111315] transition hover:bg-[#E5C477]"
                    >
                      <FiCamera size={14} />
                    </button>
                  </div>

                  <h2 className="text-xl font-semibold">{profile.fullName}</h2>

                  <p className="mt-1 text-sm text-[#A6A8AD]">{profile.email}</p>

                  <span className="mt-4 rounded-full border border-[#D6AD55]/30 bg-[#D6AD55]/10 px-4 py-1.5 text-xs font-medium text-[#E5C477]">
                    Customer Account
                  </span>
                </div>

                <div className="my-6 border-t border-[#303238]" />

                <div className="space-y-4 text-sm">
                  <div className="flex items-center gap-3 text-[#A6A8AD]">
                    <FiMail className="shrink-0 text-[#D6AD55]" />
                    <span className="truncate">{profile.email}</span>
                  </div>

                  <div className="flex items-center gap-3 text-[#A6A8AD]">
                    <FiPhone className="shrink-0 text-[#D6AD55]" />
                    <span>{profile.phone || "Phone not added"}</span>
                  </div>

                  <div className="flex items-center gap-3 text-[#A6A8AD]">
                    <FiMapPin className="shrink-0 text-[#D6AD55]" />
                    <span>{profile.location || "Location not added"}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleEdit}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-[#D6AD55] px-4 py-3 text-sm font-medium text-[#D6AD55] transition hover:bg-[#D6AD55] hover:text-[#111315]"
                >
                  <FiEdit2 size={16} />
                  Edit Profile
                </button>
              </div>

              {/* Account Navigation */}
              <div className="rounded-2xl border border-[#303238] bg-[#1B1D20] p-3">
                <p className="px-3 pb-3 pt-2 text-xs font-semibold uppercase tracking-wider text-[#777B82]">
                  Account
                </p>

                <button
                  type="button"
                  onClick={() => setActiveTab("saved")}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                    activeTab === "saved"
                      ? "bg-[#D6AD55]/10 text-[#E5C477]"
                      : "text-[#A6A8AD] hover:bg-[#242629] hover:text-white"
                  }`}
                >
                  <FiHeart size={17} />
                  Saved Properties
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("enquiries")}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                    activeTab === "enquiries"
                      ? "bg-[#D6AD55]/10 text-[#E5C477]"
                      : "text-[#A6A8AD] hover:bg-[#242629] hover:text-white"
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
                      ? "bg-[#D6AD55]/10 text-[#E5C477]"
                      : "text-[#A6A8AD] hover:bg-[#242629] hover:text-white"
                  }`}
                >
                  <FiClock size={17} />
                  Recently Viewed
                </button>

                <div className="my-3 border-t border-[#303238]" />

                <button
                  type="button"
                  onClick={handleEdit}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-[#A6A8AD] transition hover:bg-[#242629] hover:text-white"
                >
                  <FiSettings size={17} />
                  Account Settings
                </button>

                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-red-400 transition hover:bg-red-500/10"
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
                <div className="rounded-2xl border border-[#303238] bg-[#1B1D20] p-5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#D6AD55]/10 text-[#D6AD55]">
                    <FiHeart size={20} />
                  </div>

                  <p className="text-2xl font-semibold">0</p>
                  <p className="mt-1 text-sm text-[#A6A8AD]">
                    Saved Properties
                  </p>
                </div>

                <div className="rounded-2xl border border-[#303238] bg-[#1B1D20] p-5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#D6AD55]/10 text-[#D6AD55]">
                    <FiMessageSquare size={20} />
                  </div>

                  <p className="text-2xl font-semibold">0</p>
                  <p className="mt-1 text-sm text-[#A6A8AD]">My Enquiries</p>
                </div>

                <div className="rounded-2xl border border-[#303238] bg-[#1B1D20] p-5">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#D6AD55]/10 text-[#D6AD55]">
                    <FiClock size={20} />
                  </div>

                  <p className="text-2xl font-semibold">0</p>
                  <p className="mt-1 text-sm text-[#A6A8AD]">Recently Viewed</p>
                </div>
              </div>

              {/* Edit Profile Form */}
              {isEditing && (
                <div className="rounded-2xl border border-[#D6AD55]/30 bg-[#1B1D20] p-6">
                  <div className="mb-6 flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold">
                        Edit Personal Information
                      </h2>
                      <p className="mt-1 text-sm text-[#A6A8AD]">
                        Update your account details.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleCancel}
                      aria-label="Close edit form"
                      className="rounded-lg p-2 text-[#A6A8AD] transition hover:bg-[#303238] hover:text-white"
                    >
                      <FiX size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm text-[#A6A8AD]">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(event) =>
                          handleInputChange("fullName", event.target.value)
                        }
                        placeholder="Enter your full name"
                        className="w-full rounded-xl border border-[#303238] bg-[#242629] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#777B82] focus:border-[#D6AD55]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-[#A6A8AD]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(event) =>
                          handleInputChange("email", event.target.value)
                        }
                        placeholder="Enter your email"
                        className="w-full rounded-xl border border-[#303238] bg-[#242629] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#777B82] focus:border-[#D6AD55]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-[#A6A8AD]">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(event) =>
                          handleInputChange("phone", event.target.value)
                        }
                        placeholder="Enter your phone number"
                        className="w-full rounded-xl border border-[#303238] bg-[#242629] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#777B82] focus:border-[#D6AD55]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm text-[#A6A8AD]">
                        Location
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(event) =>
                          handleInputChange("location", event.target.value)
                        }
                        placeholder="e.g. Ikeja, Lagos"
                        className="w-full rounded-xl border border-[#303238] bg-[#242629] px-4 py-3 text-sm text-white outline-none transition placeholder:text-[#777B82] focus:border-[#D6AD55]"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="rounded-xl border border-[#303238] px-5 py-3 text-sm font-medium text-[#A6A8AD] transition hover:bg-[#242629] hover:text-white"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handleSave}
                      className="flex items-center gap-2 rounded-xl bg-[#D6AD55] px-5 py-3 text-sm font-semibold text-[#111315] transition hover:bg-[#E5C477]"
                    >
                      <FiSave size={16} />
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* Activity Section */}
              <div className="overflow-hidden rounded-2xl border border-[#303238] bg-[#1B1D20]">
                <div className="border-b border-[#303238] p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold">
                        {activeTab === "saved"
                          ? "My Saved Properties"
                          : activeTab === "enquiries"
                            ? "My Enquiries"
                            : "Recently Viewed"}
                      </h2>

                      <p className="mt-1 text-sm text-[#A6A8AD]">
                        {activeTab === "saved"
                          ? "Properties you've saved for later."
                          : activeTab === "enquiries"
                            ? "Keep track of your property enquiries."
                            : "Properties you've recently explored."}
                      </p>
                    </div>

                    {activeTab === "saved" && (
                      <span className="rounded-full border border-[#303238] px-3 py-1 text-xs text-[#A6A8AD]">
                        0 saved
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex min-h-82.5 flex-col items-center justify-center px-5 py-12 text-center">
                  <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-[#D6AD55]/20 bg-[#D6AD55]/10 text-[#D6AD55]">
                    {activeTab === "saved" ? (
                      <FiHeart size={32} />
                    ) : activeTab === "enquiries" ? (
                      <FiMessageSquare size={32} />
                    ) : (
                      <FiClock size={32} />
                    )}
                  </div>

                  <h3 className="text-lg font-semibold">
                    {activeTab === "saved"
                      ? "No saved properties yet"
                      : activeTab === "enquiries"
                        ? "No enquiries yet"
                        : "Nothing viewed yet"}
                  </h3>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-[#A6A8AD]">
                    {activeTab === "saved"
                      ? "When you find a property you love, tap the heart icon to save it here and easily find it later."
                      : activeTab === "enquiries"
                        ? "When you enquire about a property, your enquiries will appear here."
                        : "Properties you explore will appear here so you can easily find them again."}
                  </p>

                  <Link
                    to="/properties"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#D6AD55] px-5 py-3 text-sm font-semibold text-[#111315] transition hover:bg-[#E5C477]"
                  >
                    <FiHome size={16} />
                    Explore Properties
                    <FiArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Security Section */}
              <div className="rounded-2xl border border-[#303238] bg-[#1B1D20] p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D6AD55]/10 text-[#D6AD55]">
                    <FiLock size={20} />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold">Account Security</h3>
                    <p className="mt-1 text-sm leading-6 text-[#A6A8AD]">
                      Keep your account information secure. Password management
                      and security options will be available here.
                    </p>

                    <button
                      type="button"
                      disabled
                      className="mt-4 cursor-not-allowed rounded-lg border border-[#303238] px-4 py-2 text-sm text-[#777B82]"
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
