import { useState } from "react";
import {
  FiGrid,
  FiUsers,
  FiHome,
  FiClipboard,
  FiMessageSquare,
  FiLifeBuoy,
  FiSettings,
  FiSearch,
  FiEye,
  FiCheck,
  FiX,
  FiUser,
  FiShield,
  FiCalendar,
  FiAlertCircle,
} from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type UserRole = "Customer" | "Agent" | "Admin";
type UserStatus = "Active" | "Pending" | "Suspended";

type UserAccount = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  joined: string;
  location: string;
  activity: string;
};

const initialUsers: UserAccount[] = [
  {
    id: 1,
    name: "Michael Johnson",
    email: "michael@example.com",
    phone: "+234 801 234 5678",
    role: "Customer",
    status: "Active",
    joined: "12 Nov 2026",
    location: "Lekki, Lagos",
    activity: "Recently viewed properties",
  },
  {
    id: 2,
    name: "Emmanuel Adewale",
    email: "emmanuel@example.com",
    phone: "+234 802 345 6789",
    role: "Agent",
    status: "Active",
    joined: "10 Nov 2026",
    location: "Lekki, Lagos",
    activity: "Listed 4 properties",
  },
  {
    id: 3,
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "+234 803 456 7890",
    role: "Customer",
    status: "Active",
    joined: "08 Nov 2026",
    location: "Ikeja, Lagos",
    activity: "Requested an inspection",
  },
  {
    id: 4,
    name: "Blessing Okoro",
    email: "blessing@example.com",
    phone: "+234 804 567 8901",
    role: "Agent",
    status: "Pending",
    joined: "18 Nov 2026",
    location: "Ikeja, Lagos",
    activity: "Awaiting account verification",
  },
  {
    id: 5,
    name: "David Okafor",
    email: "david@example.com",
    phone: "+234 805 678 9012",
    role: "Customer",
    status: "Suspended",
    joined: "02 Nov 2026",
    location: "Yaba, Lagos",
    activity: "Account temporarily suspended",
  },
  {
    id: 6,
    name: "Grace Adeyemi",
    email: "grace@example.com",
    phone: "+234 806 789 0123",
    role: "Agent",
    status: "Active",
    joined: "15 Nov 2026",
    location: "Victoria Island, Lagos",
    activity: "Managed 6 property listings",
  },
  {
    id: 7,
    name: "Daniel Smith",
    email: "daniel@example.com",
    phone: "+234 807 890 1234",
    role: "Customer",
    status: "Pending",
    joined: "20 Nov 2026",
    location: "Surulere, Lagos",
    activity: "Recently registered",
  },
  {
    id: 8,
    name: "Samuel Ibrahim",
    email: "samuel@example.com",
    phone: "+234 808 901 2345",
    role: "Agent",
    status: "Active",
    joined: "05 Nov 2026",
    location: "Banana Island, Lagos",
    activity: "Listed 3 properties",
  },
];

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

function AdminUsers() {
  const location = useLocation();

  const [users, setUsers] = useState<UserAccount[]>(initialUsers);
  const [activeFilter, setActiveFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserAccount | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const activeCount = users.filter((user) => user.status === "Active").length;

  const pendingCount = users.filter((user) => user.status === "Pending").length;

  const suspendedCount = users.filter(
    (user) => user.status === "Suspended",
  ).length;

  const customerCount = users.filter((user) => user.role === "Customer").length;

  const agentCount = users.filter((user) => user.role === "Agent").length;

  const filteredUsers = users.filter((user) => {
    const matchesStatus =
      activeFilter === "All" || user.status === activeFilter;

    const matchesRole = roleFilter === "All" || user.role === roleFilter;

    const searchText = search.toLowerCase();

    const matchesSearch =
      user.name.toLowerCase().includes(searchText) ||
      user.email.toLowerCase().includes(searchText) ||
      user.phone.toLowerCase().includes(searchText) ||
      user.location.toLowerCase().includes(searchText);

    return matchesStatus && matchesRole && matchesSearch;
  });

  const updateUserStatus = (id: number, status: UserStatus) => {
    setUsers((current) =>
      current.map((user) => (user.id === id ? { ...user, status } : user)),
    );

    setSelectedUser(null);

    setNotice(
      status === "Suspended"
        ? "User account suspended."
        : status === "Active"
          ? "User account activated."
          : "User account status updated.",
    );
  };

  const statusStyle = (status: UserStatus) => {
    if (status === "Active") {
      return "bg-(--dh-success)/10 text-(--dh-success)";
    }

    if (status === "Suspended") {
      return "bg-(--dh-danger)/10 text-(--dh-danger)";
    }

    return "bg-(--dh-gold)/10 text-(--dh-gold)";
  };

  const roleStyle = (role: UserRole) => {
    if (role === "Admin") {
      return "bg-purple-500/10 text-purple-400";
    }

    if (role === "Agent") {
      return "bg-blue-500/10 text-blue-400";
    }

    return "bg-(--dh-bg-secondary) text-(--dh-muted)";
  };

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
              <p className="text-sm font-semibold">Account Management</p>
              <p className="mt-1 text-xs leading-5 text-(--dh-muted)">
                Monitor platform accounts and manage user access responsibly.
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
                  <FiUsers size={20} />
                </button>

                <div>
                  <p className="text-sm text-(--dh-muted)">
                    Administration / Users
                  </p>
                  <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
                    User Management
                  </h1>
                  <p className="mt-2 text-sm text-(--dh-muted)">
                    Manage customer accounts, agent accounts and platform
                    access.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-(--dh-border) bg-(--dh-surface) px-4 py-3">
                <FiShield className="text-(--dh-gold)" />
                <span className="text-xs font-semibold">
                  Account Control Centre
                </span>
              </div>
            </div>

            {/* Notice */}
            {notice && (
              <div className="mb-6 flex items-center justify-between rounded-xl border border-(--dh-success)/30 bg-(--dh-success)/10 px-4 py-3 text-sm text-(--dh-success)">
                {notice}
                <button
                  type="button"
                  onClick={() => setNotice("")}
                  aria-label="Dismiss notification"
                >
                  <FiX size={18} />
                </button>
              </div>
            )}

            {/* Statistics */}
            <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  title: "Total Users",
                  value: users.length,
                  icon: FiUsers,
                  color: "text-(--dh-gold)",
                },
                {
                  title: "Active Accounts",
                  value: activeCount,
                  icon: FiCheck,
                  color: "text-(--dh-success)",
                },
                {
                  title: "Pending Accounts",
                  value: pendingCount,
                  icon: FiAlertCircle,
                  color: "text-(--dh-gold)",
                },
                {
                  title: "Suspended Accounts",
                  value: suspendedCount,
                  icon: FiX,
                  color: "text-(--dh-danger)",
                },
              ].map((stat) => {
                const Icon = stat.icon;

                return (
                  <div
                    key={stat.title}
                    className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-(--dh-muted)">{stat.title}</p>
                      <Icon size={20} className={stat.color} />
                    </div>
                    <h2 className="mt-5 text-3xl font-bold">{stat.value}</h2>
                  </div>
                );
              })}
            </div>

            {/* Account breakdown */}
            <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
                    <FiUser size={21} />
                  </div>
                  <div>
                    <p className="text-sm text-(--dh-muted)">
                      Customer Accounts
                    </p>
                    <h3 className="mt-1 text-2xl font-bold">{customerCount}</h3>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-(--dh-gold)/10 p-3 text-(--dh-gold)">
                    <FiHome size={21} />
                  </div>
                  <div>
                    <p className="text-sm text-(--dh-muted)">Agent Accounts</p>
                    <h3 className="mt-1 text-2xl font-bold">{agentCount}</h3>
                  </div>
                </div>
              </div>
            </div>

            {/* User table */}
            <section className="overflow-hidden rounded-2xl border border-(--dh-border) bg-(--dh-surface)">
              <div className="border-b border-(--dh-border) p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="font-bold">Platform Accounts</h2>
                    <p className="mt-1 text-xs text-(--dh-muted)">
                      Search and review registered platform users.
                    </p>
                  </div>

                  <div className="relative w-full sm:w-72">
                    <FiSearch
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-(--dh-muted)"
                      size={17}
                    />
                    <input
                      type="text"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search users..."
                      className="w-full rounded-xl border border-(--dh-border) bg-(--dh-bg-secondary) py-3 pl-10 pr-4 text-sm outline-none transition focus:border-(--dh-gold)"
                    />
                  </div>
                </div>

                {/* Role filters */}
                <div className="mt-6">
                  <p className="mb-2 text-xs font-semibold text-(--dh-muted)">
                    ACCOUNT TYPE
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["All", "Customer", "Agent", "Admin"].map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setRoleFilter(role)}
                        className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                          roleFilter === role
                            ? "bg-(--dh-gold) text-black"
                            : "border border-(--dh-border) text-(--dh-muted) hover:text-(--dh-white)"
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Status filters */}
                <div className="mt-5">
                  <p className="mb-2 text-xs font-semibold text-(--dh-muted)">
                    ACCOUNT STATUS
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["All", "Active", "Pending", "Suspended"].map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setActiveFilter(status)}
                        className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                          activeFilter === status
                            ? "bg-(--dh-gold) text-black"
                            : "border border-(--dh-border) text-(--dh-muted) hover:text-(--dh-white)"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-225 text-left text-sm">
                  <thead className="bg-(--dh-bg-secondary) text-xs text-(--dh-muted)">
                    <tr>
                      <th className="px-6 py-4 font-medium">User</th>
                      <th className="px-6 py-4 font-medium">Account Type</th>
                      <th className="px-6 py-4 font-medium">Location</th>
                      <th className="px-6 py-4 font-medium">Joined</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="border-t border-(--dh-border)"
                      >
                        <td className="px-6 py-5">
                          <p className="font-semibold">{user.name}</p>
                          <p className="mt-1 text-xs text-(--dh-muted)">
                            {user.email}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`rounded-lg px-3 py-1 text-xs font-semibold ${roleStyle(user.role)}`}
                          >
                            {user.role}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-sm">{user.location}</td>

                        <td className="px-6 py-5 whitespace-nowrap text-sm">
                          {user.joined}
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(user.status)}`}
                          >
                            {user.status}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <button
                            type="button"
                            onClick={() => setSelectedUser(user)}
                            className="flex items-center gap-2 rounded-lg border border-(--dh-border) px-3 py-2 text-xs font-semibold transition hover:border-(--dh-gold) hover:text-(--dh-gold)"
                          >
                            <FiEye size={15} />
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredUsers.length === 0 && (
                  <div className="px-6 py-16 text-center">
                    <FiUsers size={28} className="mx-auto text-(--dh-muted)" />
                    <p className="mt-4 font-semibold">No users found</p>
                    <p className="mt-1 text-sm text-(--dh-muted)">
                      Try another search or account filter.
                    </p>
                  </div>
                )}
              </div>
            </section>

            {/* Account policy */}
            <div className="mt-6 rounded-xl border border-(--dh-gold)/20 bg-(--dh-gold)/5 p-4">
              <div className="flex items-start gap-3">
                <FiShield className="mt-1 shrink-0 text-(--dh-gold)" />
                <div>
                  <p className="text-sm font-semibold">
                    User account management policy
                  </p>
                  <p className="mt-1 text-xs leading-6 text-(--dh-muted)">
                    Account suspension should only be used after reviewing
                    relevant activity and following the platform's moderation
                    process. Agent account access and permission to list
                    properties must also depend on the agent verification
                    process.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer stays within the main content area */}
          <Footer />
        </main>
      </div>

      {/* User details modal */}
      {selectedUser && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/70 p-4"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="my-auto w-full max-w-2xl rounded-2xl border border-(--dh-border) bg-(--dh-bg-secondary) p-6 sm:p-8"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-(--dh-gold)">
                  Account review
                </p>
                <h2 className="mt-2 text-xl font-bold">{selectedUser.name}</h2>
                <p className="mt-1 text-sm text-(--dh-muted)">
                  {selectedUser.role} account
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="rounded-lg border border-(--dh-border) p-2"
                aria-label="Close review"
              >
                <FiX size={19} />
              </button>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                ["Full name", selectedUser.name],
                ["Email address", selectedUser.email],
                ["Phone number", selectedUser.phone],
                ["Account type", selectedUser.role],
                ["Location", selectedUser.location],
                ["Registration date", selectedUser.joined],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-xl border border-(--dh-border) bg-(--dh-surface) p-4"
                >
                  <p className="text-xs text-(--dh-muted)">{label}</p>
                  <p className="mt-2 wrap-break-words text-sm font-semibold">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-(--dh-border) bg-(--dh-surface) p-4">
              <div className="flex items-center gap-2">
                <FiCalendar className="text-(--dh-gold)" />
                <h3 className="text-sm font-semibold">
                  Recent account activity
                </h3>
              </div>
              <p className="mt-2 text-sm leading-6 text-(--dh-muted)">
                {selectedUser.activity}
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between gap-3">
              <span className="text-xs text-(--dh-muted)">
                Current account status
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(selectedUser.status)}`}
              >
                {selectedUser.status}
              </span>
            </div>

            <div className="mt-8 flex flex-wrap justify-end gap-3">
              {selectedUser.status !== "Suspended" ? (
                <button
                  type="button"
                  onClick={() => updateUserStatus(selectedUser.id, "Suspended")}
                  className="flex items-center gap-2 rounded-xl border border-(--dh-danger)/40 px-5 py-3 text-sm font-semibold text-(--dh-danger) transition hover:bg-(--dh-danger)/10"
                >
                  <FiX size={17} />
                  Suspend Account
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => updateUserStatus(selectedUser.id, "Active")}
                  className="flex items-center gap-2 rounded-xl bg-(--dh-success) px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  <FiCheck size={17} />
                  Reactivate Account
                </button>
              )}
            </div>

            <p className="mt-5 text-xs leading-5 text-(--dh-muted)">
              Account status changes currently affect demo data only. Actual
              account permissions and suspension controls will be connected to
              the backend later.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;
