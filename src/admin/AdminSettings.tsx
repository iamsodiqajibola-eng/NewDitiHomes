import { useState } from "react";
import {
  FiGrid,
  FiUsers,
  FiHome,
  FiClipboard,
  FiMessageSquare,
  FiLifeBuoy,
  FiSettings,
  FiShield,
  FiBell,
  FiGlobe,
  FiClock,
  FiSave,
  FiCheckCircle,
  FiMenu,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const navigation = [
  { name: "Overview", path: "/admin", icon: FiGrid },
  { name: "Agent Applications", path: "/admin/agents", icon: FiUsers },
  { name: "Properties", path: "/admin/properties", icon: FiHome },
  { name: "Inspections", path: "/admin/inspections", icon: FiClipboard },
  { name: "Users", path: "/admin/users", icon: FiUsers },
  { name: "Enquiries", path: "/admin/enquiries", icon: FiMessageSquare },
  { name: "Support Tickets", path: "/admin/support", icon: FiLifeBuoy },
  { name: "Settings", path: "/admin/settings", icon: FiSettings },
];

function AdminSettings() {
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("General");
  const [notice, setNotice] = useState("");

  const [generalSettings, setGeneralSettings] = useState({
    platformName: "DitiHomes",
    supportEmail: "support@ditihomes.com",
    contactPhone: "+234 800 000 0000",
    defaultLocation: "Lagos, Nigeria",
    currency: "NGN",
    maintenanceMode: false,
  });

  const [listingSettings, setListingSettings] = useState({
    requireApproval: true,
    requireAgentVerification: true,
    requirePropertyDocuments: true,
    allowShortlets: true,
    allowRentals: true,
    allowSales: true,
    allowLeases: true,
  });

  const [inspectionSettings, setInspectionSettings] = useState({
    requireConfirmation: true,
    allowAgentCancellation: true,
    allowCustomerCancellation: true,
    minimumNotice: "24",
    cancellationWindow: "12",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    newAgentApplication: true,
    newPropertySubmission: true,
    newUserRegistration: false,
    newEnquiry: true,
    newSupportTicket: true,
    inspectionBooking: true,
    securityAlerts: true,
  });

  const tabs = [
    { name: "General", icon: FiGlobe },
    { name: "Listings & Verification", icon: FiShield },
    { name: "Inspections", icon: FiClock },
    { name: "Notifications", icon: FiBell },
  ];

  const saveSettings = () => {
    setNotice(
      "Settings updated in this demo session. Database integration is still pending.",
    );

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleStyle =
    "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors";

  const Toggle = ({
    enabled,
    onChange,
  }: {
    enabled: boolean;
    onChange: (value: boolean) => void;
  }) => (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`${toggleStyle} ${
        enabled ? "bg-(--dh-gold)" : "bg-(--dh-border)"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  const SettingRow = ({
    title,
    description,
    enabled,
    onChange,
  }: {
    title: string;
    description: string;
    enabled: boolean;
    onChange: (value: boolean) => void;
  }) => (
    <div className="flex items-center justify-between gap-5 border-b border-(--dh-border) py-5 last:border-0">
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-1 max-w-xl text-xs leading-5 text-(--dh-muted)">
          {description}
        </p>
      </div>
      <Toggle enabled={enabled} onChange={onChange} />
    </div>
  );

  const inputClass =
    "mt-2 w-full rounded-xl border border-(--dh-border) bg-(--dh-bg-secondary) px-4 py-3 text-sm text-(--dh-white) outline-none transition focus:border-(--dh-gold)";

  const labelClass = "text-sm font-medium";

  return (
    <div className="min-h-screen bg-(--dh-bg) text-(--dh-white)">
      <Navbar />

      <div className="flex min-h-screen pt-20">
        {/* Sidebar */}
        <aside
          className={`fixed bottom-0 left-0 top-20 z-40 w-72 border-r border-(--dh-border) bg-(--dh-bg-secondary) transition-transform duration-300 lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-full flex-col px-5 py-7">
            <div className="mb-8 px-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--dh-muted)">
                Administration
              </p>
              <h2 className="mt-2 text-xl font-bold">Control Centre</h2>
            </div>

            <nav className="flex-1 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;

                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      active
                        ? "bg-(--dh-gold) text-black"
                        : "text-(--dh-muted) hover:bg-(--dh-surface-hover) hover:text-(--dh-white)"
                    }`}
                  >
                    <Icon size={18} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            <div className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-4">
              <p className="text-sm font-semibold">Platform Configuration</p>
              <p className="mt-1 text-xs leading-5 text-(--dh-muted)">
                Manage your marketplace preferences and operational policies.
              </p>
            </div>
          </div>
        </aside>

        {sidebarOpen && (
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 top-20 z-30 bg-black/50 lg:hidden"
          />
        )}

        {/* Main content */}
        <main className="min-w-0 flex-1 lg:ml-72">
          <div className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 lg:px-10">
            {/* Header */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="rounded-lg border border-(--dh-border) p-2 lg:hidden"
                  aria-label="Toggle sidebar"
                >
                  <FiMenu size={20} />
                </button>

                <div>
                  <p className="text-sm text-(--dh-muted)">
                    Administration / Settings
                  </p>
                  <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                    Platform Settings
                  </h1>
                  <p className="mt-2 text-sm text-(--dh-muted)">
                    Configure how your DitiHomes marketplace operates.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={saveSettings}
                className="flex items-center gap-2 rounded-xl bg-(--dh-gold) px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
              >
                <FiSave size={17} />
                Save Changes
              </button>
            </div>

            {/* Notification */}
            {notice && (
              <div className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-(--dh-success)/30 bg-(--dh-success)/10 px-4 py-3 text-sm text-(--dh-success)">
                <div className="flex items-center gap-2">
                  <FiCheckCircle size={17} />
                  {notice}
                </div>
                <button
                  type="button"
                  onClick={() => setNotice("")}
                  aria-label="Dismiss notification"
                >
                  ×
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
              {/* Settings navigation */}
              <aside className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-3">
                <p className="px-3 py-3 text-xs font-semibold uppercase tracking-wider text-(--dh-muted)">
                  Settings Menu
                </p>

                <div className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;

                    return (
                      <button
                        key={tab.name}
                        type="button"
                        onClick={() => setActiveTab(tab.name)}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                          activeTab === tab.name
                            ? "bg-(--dh-gold) text-black"
                            : "text-(--dh-muted) hover:bg-(--dh-surface-hover) hover:text-(--dh-white)"
                        }`}
                      >
                        <Icon size={17} />
                        {tab.name}
                      </button>
                    );
                  })}
                </div>
              </aside>

              {/* Settings content */}
              <div className="min-w-0 space-y-6">
                {activeTab === "General" && (
                  <>
                    <section className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5 sm:p-7">
                      <div className="mb-6">
                        <h2 className="text-lg font-bold">
                          General Information
                        </h2>
                        <p className="mt-1 text-sm text-(--dh-muted)">
                          Basic information about your real estate platform.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                          <label className={labelClass}>Platform Name</label>
                          <input
                            value={generalSettings.platformName}
                            onChange={(event) =>
                              setGeneralSettings({
                                ...generalSettings,
                                platformName: event.target.value,
                              })
                            }
                            className={inputClass}
                          />
                        </div>

                        <div>
                          <label className={labelClass}>Support Email</label>
                          <input
                            type="email"
                            value={generalSettings.supportEmail}
                            onChange={(event) =>
                              setGeneralSettings({
                                ...generalSettings,
                                supportEmail: event.target.value,
                              })
                            }
                            className={inputClass}
                          />
                        </div>

                        <div>
                          <label className={labelClass}>Contact Phone</label>
                          <input
                            value={generalSettings.contactPhone}
                            onChange={(event) =>
                              setGeneralSettings({
                                ...generalSettings,
                                contactPhone: event.target.value,
                              })
                            }
                            className={inputClass}
                          />
                        </div>

                        <div>
                          <label className={labelClass}>Default Location</label>
                          <input
                            value={generalSettings.defaultLocation}
                            onChange={(event) =>
                              setGeneralSettings({
                                ...generalSettings,
                                defaultLocation: event.target.value,
                              })
                            }
                            className={inputClass}
                          />
                        </div>

                        <div>
                          <label className={labelClass}>Currency</label>
                          <select
                            value={generalSettings.currency}
                            onChange={(event) =>
                              setGeneralSettings({
                                ...generalSettings,
                                currency: event.target.value,
                              })
                            }
                            className={inputClass}
                          >
                            <option value="NGN">Nigerian Naira (₦)</option>
                            <option value="USD">US Dollar ($)</option>
                            <option value="GBP">British Pound (£)</option>
                          </select>
                        </div>
                      </div>
                    </section>

                    <section className="rounded-2xl border border-red-500/20 bg-(--dh-surface) p-5 sm:p-7">
                      <div className="mb-5">
                        <h2 className="text-lg font-bold text-red-400">
                          Platform Availability
                        </h2>
                        <p className="mt-1 text-sm text-(--dh-muted)">
                          Control whether the marketplace is available to
                          visitors.
                        </p>
                      </div>

                      <SettingRow
                        title="Maintenance Mode"
                        description="When enabled, the public platform would display a maintenance notice. This is a frontend setting only at present."
                        enabled={generalSettings.maintenanceMode}
                        onChange={(value) =>
                          setGeneralSettings({
                            ...generalSettings,
                            maintenanceMode: value,
                          })
                        }
                      />

                      {generalSettings.maintenanceMode && (
                        <p className="mt-4 rounded-xl bg-red-500/10 p-4 text-xs leading-5 text-red-400">
                          Maintenance mode is selected in this demo. It does not
                          actually disable public access yet.
                        </p>
                      )}
                    </section>
                  </>
                )}

                {activeTab === "Listings & Verification" && (
                  <section className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5 sm:p-7">
                    <div className="mb-6">
                      <h2 className="text-lg font-bold">
                        Listings & Verification
                      </h2>
                      <p className="mt-1 text-sm text-(--dh-muted)">
                        Define the requirements for agents and property
                        listings.
                      </p>
                    </div>

                    <SettingRow
                      title="Require Property Approval"
                      description="Every submitted property must be reviewed by an administrator before it becomes publicly visible."
                      enabled={listingSettings.requireApproval}
                      onChange={(value) =>
                        setListingSettings({
                          ...listingSettings,
                          requireApproval: value,
                        })
                      }
                    />

                    <SettingRow
                      title="Require Agent Verification"
                      description="Agents must complete the verification process and receive approval before operating on the platform."
                      enabled={listingSettings.requireAgentVerification}
                      onChange={(value) =>
                        setListingSettings({
                          ...listingSettings,
                          requireAgentVerification: value,
                        })
                      }
                    />

                    <SettingRow
                      title="Require Property Documents"
                      description="Agents must provide the required ownership or authorisation documents for listing review."
                      enabled={listingSettings.requirePropertyDocuments}
                      onChange={(value) =>
                        setListingSettings({
                          ...listingSettings,
                          requirePropertyDocuments: value,
                        })
                      }
                    />

                    <div className="mt-8 border-t border-(--dh-border) pt-6">
                      <h3 className="font-semibold">Property Categories</h3>
                      <p className="mt-1 text-xs text-(--dh-muted)">
                        Choose which property transaction categories are
                        available.
                      </p>

                      <div className="mt-4 space-y-1">
                        <SettingRow
                          title="Property Sales"
                          description="Allow agents to submit properties for sale."
                          enabled={listingSettings.allowSales}
                          onChange={(value) =>
                            setListingSettings({
                              ...listingSettings,
                              allowSales: value,
                            })
                          }
                        />

                        <SettingRow
                          title="Property Rentals"
                          description="Allow residential and commercial rental listings."
                          enabled={listingSettings.allowRentals}
                          onChange={(value) =>
                            setListingSettings({
                              ...listingSettings,
                              allowRentals: value,
                            })
                          }
                        />

                        <SettingRow
                          title="Shortlet Properties"
                          description="Allow temporary accommodation and short-stay listings."
                          enabled={listingSettings.allowShortlets}
                          onChange={(value) =>
                            setListingSettings({
                              ...listingSettings,
                              allowShortlets: value,
                            })
                          }
                        />

                        <SettingRow
                          title="Property Leasing"
                          description="Allow properties offered under lease agreements."
                          enabled={listingSettings.allowLeases}
                          onChange={(value) =>
                            setListingSettings({
                              ...listingSettings,
                              allowLeases: value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </section>
                )}

                {activeTab === "Inspections" && (
                  <section className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5 sm:p-7">
                    <div className="mb-6">
                      <h2 className="text-lg font-bold">
                        Inspection Preferences
                      </h2>
                      <p className="mt-1 text-sm text-(--dh-muted)">
                        Configure default rules for property inspection
                        bookings.
                      </p>
                    </div>

                    <SettingRow
                      title="Require Booking Confirmation"
                      description="Inspection requests must be confirmed before they are treated as scheduled appointments."
                      enabled={inspectionSettings.requireConfirmation}
                      onChange={(value) =>
                        setInspectionSettings({
                          ...inspectionSettings,
                          requireConfirmation: value,
                        })
                      }
                    />

                    <SettingRow
                      title="Allow Agent Cancellation"
                      description="Allow agents to request cancellation of scheduled inspections."
                      enabled={inspectionSettings.allowAgentCancellation}
                      onChange={(value) =>
                        setInspectionSettings({
                          ...inspectionSettings,
                          allowAgentCancellation: value,
                        })
                      }
                    />

                    <SettingRow
                      title="Allow Customer Cancellation"
                      description="Allow customers to cancel their inspection bookings."
                      enabled={inspectionSettings.allowCustomerCancellation}
                      onChange={(value) =>
                        setInspectionSettings({
                          ...inspectionSettings,
                          allowCustomerCancellation: value,
                        })
                      }
                    />

                    <div className="mt-7 grid grid-cols-1 gap-5 border-t border-(--dh-border) pt-6 sm:grid-cols-2">
                      <div>
                        <label className={labelClass}>
                          Minimum Booking Notice
                        </label>
                        <p className="mt-1 text-xs text-(--dh-muted)">
                          Hours required before an inspection.
                        </p>
                        <select
                          value={inspectionSettings.minimumNotice}
                          onChange={(event) =>
                            setInspectionSettings({
                              ...inspectionSettings,
                              minimumNotice: event.target.value,
                            })
                          }
                          className={inputClass}
                        >
                          <option value="6">6 hours</option>
                          <option value="12">12 hours</option>
                          <option value="24">24 hours</option>
                          <option value="48">48 hours</option>
                          <option value="72">72 hours</option>
                        </select>
                      </div>

                      <div>
                        <label className={labelClass}>
                          Cancellation Window
                        </label>
                        <p className="mt-1 text-xs text-(--dh-muted)">
                          Minimum hours before the appointment.
                        </p>
                        <select
                          value={inspectionSettings.cancellationWindow}
                          onChange={(event) =>
                            setInspectionSettings({
                              ...inspectionSettings,
                              cancellationWindow: event.target.value,
                            })
                          }
                          className={inputClass}
                        >
                          <option value="2">2 hours</option>
                          <option value="6">6 hours</option>
                          <option value="12">12 hours</option>
                          <option value="24">24 hours</option>
                          <option value="48">48 hours</option>
                        </select>
                      </div>
                    </div>
                  </section>
                )}

                {activeTab === "Notifications" && (
                  <section className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5 sm:p-7">
                    <div className="mb-6">
                      <h2 className="text-lg font-bold">
                        Notification Preferences
                      </h2>
                      <p className="mt-1 text-sm text-(--dh-muted)">
                        Select the platform events administrators should be
                        notified about.
                      </p>
                    </div>

                    <SettingRow
                      title="New Agent Applications"
                      description="Notify administrators when a new agent submits an application."
                      enabled={notificationSettings.newAgentApplication}
                      onChange={(value) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          newAgentApplication: value,
                        })
                      }
                    />

                    <SettingRow
                      title="New Property Submissions"
                      description="Notify administrators when an agent submits a property for review."
                      enabled={notificationSettings.newPropertySubmission}
                      onChange={(value) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          newPropertySubmission: value,
                        })
                      }
                    />

                    <SettingRow
                      title="New User Registrations"
                      description="Notify administrators when a new customer registers."
                      enabled={notificationSettings.newUserRegistration}
                      onChange={(value) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          newUserRegistration: value,
                        })
                      }
                    />

                    <SettingRow
                      title="New Enquiries"
                      description="Notify administrators when a customer sends a property enquiry."
                      enabled={notificationSettings.newEnquiry}
                      onChange={(value) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          newEnquiry: value,
                        })
                      }
                    />

                    <SettingRow
                      title="New Support Tickets"
                      description="Notify administrators when a user submits a support request."
                      enabled={notificationSettings.newSupportTicket}
                      onChange={(value) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          newSupportTicket: value,
                        })
                      }
                    />

                    <SettingRow
                      title="Inspection Bookings"
                      description="Notify administrators when customers request property inspections."
                      enabled={notificationSettings.inspectionBooking}
                      onChange={(value) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          inspectionBooking: value,
                        })
                      }
                    />

                    <SettingRow
                      title="Security Alerts"
                      description="Notify administrators about important security-related events."
                      enabled={notificationSettings.securityAlerts}
                      onChange={(value) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          securityAlerts: value,
                        })
                      }
                    />
                  </section>
                )}

                {/* Save button */}
                <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5">
                  <div>
                    <p className="text-sm font-semibold">Save your settings</p>
                    <p className="mt-1 text-xs text-(--dh-muted)">
                      Remember to save after making changes.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={saveSettings}
                    className="flex items-center gap-2 rounded-xl bg-(--dh-gold) px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                  >
                    <FiSave size={16} />
                    Save Changes
                  </button>
                </div>

                <p className="text-xs leading-5 text-(--dh-muted)">
                  These settings currently update local page state only. They
                  are not persisted, and notification delivery, verification
                  enforcement and maintenance mode will require backend
                  integration.
                </p>
              </div>
            </div>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}

export default AdminSettings;
