import { useState } from "react";
import {
  FiUser,
  FiBriefcase,
  FiBell,
  FiShield,
  FiSave,
  FiCamera,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCheckCircle,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type SettingsTab = "Profile" | "Business" | "Notifications" | "Security";

export default function AgentSettings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("Profile");
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "Sodiq Ajibola",
    email: "agent@example.com",
    phone: "+234 803 123 4567",
    location: "Lagos, Nigeria",
    bio: "Professional real estate agent helping clients find the right properties.",
  });

  const [business, setBusiness] = useState({
    businessName: "DitiHomes",
    licenseNumber: "",
    officeAddress: "",
    experience: "1–3 years",
  });

  const [notifications, setNotifications] = useState({
    newEnquiries: true,
    inspectionRequests: true,
    propertyUpdates: true,
    accountUpdates: true,
    marketingEmails: false,
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const tabs: {
    label: SettingsTab;
    icon: React.ReactNode;
  }[] = [
    { label: "Profile", icon: <FiUser /> },
    { label: "Business", icon: <FiBriefcase /> },
    { label: "Notifications", icon: <FiBell /> },
    { label: "Security", icon: <FiShield /> },
  ];

  const handleSave = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 3000);
  };

  const updateProfile = (field: keyof typeof profile, value: string) => {
    setProfile((previous) => ({ ...previous, [field]: value }));
  };

  const updateBusiness = (field: keyof typeof business, value: string) => {
    setBusiness((previous) => ({ ...previous, [field]: value }));
  };

  const updateNotification = (
    field: keyof typeof notifications,
    checked: boolean,
  ) => {
    setNotifications((previous) => ({ ...previous, [field]: checked }));
  };

  const inputClass =
    "w-full rounded-xl border border-(--dh-border) bg-(--dh-bg) px-4 py-3 text-sm text-(--dh-white) outline-none transition focus:border-(--dh-gold)";

  const labelClass = "mb-2 block text-sm font-medium text-(--dh-white)";

  return (
    <div className="min-h-screen bg-(--dh-bg) text-(--dh-white)">
      <Navbar />

      <div className="mx-auto flex max-w-[1600px] pt-24">
        <aside className="hidden w-64 shrink-0 border-r border-(--dh-border) px-5 py-8 lg:block">
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-(--dh-muted)">
            Agent workspace
          </p>

          <nav className="space-y-2">
            {[
              { label: "Overview", path: "/agent" },
              { label: "My Properties", path: "/agent/properties" },
              { label: "Add Property", path: "/agent/properties/add" },
              { label: "Inspections", path: "/agent/inspections" },
              { label: "Enquiries", path: "/agent/enquiries" },
              { label: "Customers", path: "/agent/customers" },
              { label: "Settings", path: "/agent/settings" },
              { label: "Support", path: "/agent/support" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`block rounded-xl px-4 py-3 text-sm transition ${
                  item.label === "Settings"
                    ? "bg-(--dh-gold)/10 font-semibold text-(--dh-gold)"
                    : "text-(--dh-muted) hover:bg-(--dh-surface-hover) hover:text-(--dh-white)"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:px-10">
          <div className="mb-8">
            <p className="mb-2 text-sm text-(--dh-muted)">
              Agent workspace / Settings
            </p>
            <h1 className="text-2xl font-bold sm:text-3xl">Account Settings</h1>
            <p className="mt-2 text-sm text-(--dh-muted)">
              Manage your profile, business information and account preferences.
            </p>
          </div>

          <div className="grid items-start gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
            <div className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-3">
              <div className="mb-4 border-b border-(--dh-border) px-3 py-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-(--dh-gold)/10 text-(--dh-gold)">
                  <FiUser size={25} />
                </div>
                <h3 className="mt-3 font-semibold">{profile.fullName}</h3>
                <p className="mt-1 text-xs text-(--dh-muted)">Agent Account</p>
              </div>

              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.label}
                    onClick={() => setActiveTab(tab.label)}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${
                      activeTab === tab.label
                        ? "bg-(--dh-gold)/10 font-semibold text-(--dh-gold)"
                        : "text-(--dh-muted) hover:bg-(--dh-surface-hover) hover:text-(--dh-white)"
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <section className="min-w-0 rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5 sm:p-7">
              {activeTab === "Profile" && (
                <div>
                  <div className="mb-7">
                    <h2 className="text-lg font-semibold">
                      Personal Information
                    </h2>
                    <p className="mt-1 text-sm text-(--dh-muted)">
                      Update the personal details associated with your account.
                    </p>
                  </div>

                  <div className="mb-7 flex flex-wrap items-center gap-4">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-(--dh-gold)/10 text-(--dh-gold)">
                      <FiUser size={30} />
                    </div>
                    <div>
                      <button
                        type="button"
                        className="flex items-center gap-2 rounded-lg border border-(--dh-border) px-4 py-2 text-sm hover:border-(--dh-gold)"
                      >
                        <FiCamera /> Change Photo
                      </button>
                      <p className="mt-2 text-xs text-(--dh-muted)">
                        Profile photo upload will be enabled later.
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className={labelClass}>Full Name</label>
                      <input
                        className={inputClass}
                        value={profile.fullName}
                        onChange={(e) =>
                          updateProfile("fullName", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Email Address</label>
                      <div className="relative">
                        <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-(--dh-muted)" />
                        <input
                          type="email"
                          className={`${inputClass} pl-11`}
                          value={profile.email}
                          onChange={(e) =>
                            updateProfile("email", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Phone Number</label>
                      <div className="relative">
                        <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-(--dh-muted)" />
                        <input
                          className={`${inputClass} pl-11`}
                          value={profile.phone}
                          onChange={(e) =>
                            updateProfile("phone", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>Location</label>
                      <div className="relative">
                        <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-(--dh-muted)" />
                        <input
                          className={`${inputClass} pl-11`}
                          value={profile.location}
                          onChange={(e) =>
                            updateProfile("location", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <label className={labelClass}>About Me</label>
                    <textarea
                      rows={4}
                      className={`${inputClass} resize-none`}
                      value={profile.bio}
                      onChange={(e) => updateProfile("bio", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {activeTab === "Business" && (
                <div>
                  <div className="mb-7">
                    <h2 className="text-lg font-semibold">
                      Business Information
                    </h2>
                    <p className="mt-1 text-sm text-(--dh-muted)">
                      Provide the details of your real estate business.
                    </p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className={labelClass}>
                        Business / Agency Name
                      </label>
                      <input
                        className={inputClass}
                        value={business.businessName}
                        onChange={(e) =>
                          updateBusiness("businessName", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label className={labelClass}>
                        Professional Registration / Licence Number
                      </label>
                      <input
                        className={inputClass}
                        placeholder="Enter registration number, if applicable"
                        value={business.licenseNumber}
                        onChange={(e) =>
                          updateBusiness("licenseNumber", e.target.value)
                        }
                      />
                      <p className="mt-2 text-xs text-(--dh-muted)">
                        Submitted credentials may require separate admin
                        verification.
                      </p>
                    </div>

                    <div>
                      <label className={labelClass}>Office Address</label>
                      <input
                        className={inputClass}
                        placeholder="Enter your business address"
                        value={business.officeAddress}
                        onChange={(e) =>
                          updateBusiness("officeAddress", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Experience</label>
                      <select
                        className={inputClass}
                        value={business.experience}
                        onChange={(e) =>
                          updateBusiness("experience", e.target.value)
                        }
                      >
                        <option>Less than 1 year</option>
                        <option>1–3 years</option>
                        <option>3–5 years</option>
                        <option>5–10 years</option>
                        <option>10+ years</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "Notifications" && (
                <div>
                  <div className="mb-7">
                    <h2 className="text-lg font-semibold">
                      Notification Preferences
                    </h2>
                    <p className="mt-1 text-sm text-(--dh-muted)">
                      Choose the updates you want to receive.
                    </p>
                  </div>

                  <div className="divide-y divide-(--dh-border)">
                    {[
                      {
                        key: "newEnquiries" as const,
                        title: "New Customer Enquiries",
                        description:
                          "Get notified when customers enquire about your properties.",
                      },
                      {
                        key: "inspectionRequests" as const,
                        title: "Inspection Requests",
                        description:
                          "Receive updates when customers request inspections.",
                      },
                      {
                        key: "propertyUpdates" as const,
                        title: "Property Updates",
                        description:
                          "Receive updates about your submitted listings.",
                      },
                      {
                        key: "accountUpdates" as const,
                        title: "Account and Verification Updates",
                        description:
                          "Get important account and verification notifications.",
                      },
                      {
                        key: "marketingEmails" as const,
                        title: "News and Promotions",
                        description:
                          "Receive occasional product news and promotional emails.",
                      },
                    ].map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center justify-between gap-4 py-5"
                      >
                        <div>
                          <h3 className="text-sm font-medium">{item.title}</h3>
                          <p className="mt-1 text-xs leading-5 text-(--dh-muted)">
                            {item.description}
                          </p>
                        </div>

                        <button
                          type="button"
                          role="switch"
                          aria-checked={notifications[item.key]}
                          onClick={() =>
                            updateNotification(
                              item.key,
                              !notifications[item.key],
                            )
                          }
                          className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                            notifications[item.key]
                              ? "bg-(--dh-gold)"
                              : "bg-(--dh-border)"
                          }`}
                        >
                          <span
                            className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                              notifications[item.key] ? "left-6" : "left-1"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "Security" && (
                <div>
                  <div className="mb-7">
                    <h2 className="text-lg font-semibold">Account Security</h2>
                    <p className="mt-1 text-sm text-(--dh-muted)">
                      Manage your password and account protection.
                    </p>
                  </div>

                  <div className="mb-6 rounded-xl border border-(--dh-border) bg-(--dh-bg) p-4">
                    <div className="flex items-start gap-3">
                      <FiShield className="mt-1 text-xl text-(--dh-gold)" />
                      <div>
                        <h3 className="text-sm font-semibold">
                          Protect your account
                        </h3>
                        <p className="mt-1 text-xs leading-5 text-(--dh-muted)">
                          Use a strong, unique password and never share your
                          login details.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className={labelClass}>Current Password</label>
                      <input
                        type="password"
                        className={inputClass}
                        value={security.currentPassword}
                        onChange={(e) =>
                          setSecurity((p) => ({
                            ...p,
                            currentPassword: e.target.value,
                          }))
                        }
                        placeholder="Enter current password"
                      />
                    </div>

                    <div>
                      <label className={labelClass}>New Password</label>
                      <input
                        type="password"
                        className={inputClass}
                        value={security.newPassword}
                        onChange={(e) =>
                          setSecurity((p) => ({
                            ...p,
                            newPassword: e.target.value,
                          }))
                        }
                        placeholder="Enter new password"
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Confirm New Password</label>
                      <input
                        type="password"
                        className={inputClass}
                        value={security.confirmPassword}
                        onChange={(e) =>
                          setSecurity((p) => ({
                            ...p,
                            confirmPassword: e.target.value,
                          }))
                        }
                        placeholder="Confirm new password"
                      />
                    </div>

                    <p className="text-xs text-(--dh-muted)">
                      Password changes will be connected to account
                      authentication later.
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-(--dh-border) pt-6">
                {saved && (
                  <span className="flex items-center gap-2 text-sm text-(--dh-success)">
                    <FiCheckCircle /> Changes saved in this demo.
                  </span>
                )}

                <button
                  onClick={handleSave}
                  className="ml-auto flex items-center gap-2 rounded-xl bg-(--dh-gold) px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  <FiSave /> Save Changes
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
