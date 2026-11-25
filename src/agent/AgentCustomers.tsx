import { useMemo, useState } from "react";
import {
  FiSearch,
  FiUsers,
  FiUser,
  FiMail,
  FiPhone,
  FiMessageSquare,
  FiX,
  FiArrowRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type Customer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  enquiries: number;
  lastContact: string;
  status: "Active" | "Inactive";
  property: string;
  message: string;
};

const initialCustomers: Customer[] = [
  {
    id: 1,
    name: "Adebayo Johnson",
    email: "adebayo@example.com",
    phone: "+234 803 123 4567",
    location: "Lagos, Nigeria",
    enquiries: 2,
    lastContact: "Today",
    status: "Active",
    property: "Luxury 4 Bedroom Duplex",
    message: "Interested in availability and price negotiation.",
  },
  {
    id: 2,
    name: "Maryam Ibrahim",
    email: "maryam@example.com",
    phone: "+234 806 234 5678",
    location: "Ikeja, Lagos",
    enquiries: 1,
    lastContact: "Today",
    status: "Active",
    property: "Modern 3 Bedroom Apartment",
    message: "Would like to schedule a property inspection.",
  },
  {
    id: 3,
    name: "Tunde Bakare",
    email: "tunde@example.com",
    phone: "+234 809 345 6789",
    location: "Lekki, Lagos",
    enquiries: 3,
    lastContact: "Yesterday",
    status: "Active",
    property: "Serviced 2 Bedroom Flat",
    message: "Interested in a five-day shortlet booking.",
  },
  {
    id: 4,
    name: "Chioma Okafor",
    email: "chioma@example.com",
    phone: "+234 812 456 7890",
    location: "Surulere, Lagos",
    enquiries: 1,
    lastContact: "Nov 22, 2026",
    status: "Inactive",
    property: "5 Bedroom Detached House",
    message: "Requested information about property documentation.",
  },
];

export default function AgentCustomers() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const query = search.toLowerCase();

      const matchesSearch =
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phone.toLowerCase().includes(query);

      const matchesFilter = filter === "All" || customer.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [customers, search, filter]);

  const activeCount = customers.filter(
    (customer) => customer.status === "Active",
  ).length;

  const totalEnquiries = customers.reduce(
    (total, customer) => total + customer.enquiries,
    0,
  );

  const updateCustomerStatus = (id: number, status: Customer["status"]) => {
    setCustomers((previous) =>
      previous.map((customer) =>
        customer.id === id ? { ...customer, status } : customer,
      ),
    );

    setSelectedCustomer((previous) =>
      previous?.id === id ? { ...previous, status } : previous,
    );
  };

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
                  item.label === "Customers"
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
              Agent workspace / Customers
            </p>
            <h1 className="text-2xl font-bold sm:text-3xl">My Customers</h1>
            <p className="mt-2 text-sm text-(--dh-muted)">
              Keep track of customers who have shown interest in your
              properties.
            </p>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                label: "Total Customers",
                value: customers.length,
                icon: <FiUsers />,
              },
              {
                label: "Active Customers",
                value: activeCount,
                icon: <FiUser />,
              },
              {
                label: "Total Enquiries",
                value: totalEnquiries,
                icon: <FiMessageSquare />,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-(--dh-muted)">
                    {stat.label}
                  </span>
                  <span className="text-xl text-(--dh-gold)">{stat.icon}</span>
                </div>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          <section className="overflow-hidden rounded-2xl border border-(--dh-border) bg-(--dh-surface)">
            <div className="flex flex-col gap-4 border-b border-(--dh-border) p-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="font-semibold">Customer Directory</h2>
                <p className="mt-1 text-xs text-(--dh-muted)">
                  View customer profiles and their enquiry activity.
                </p>
              </div>

              <div className="relative w-full lg:max-w-sm">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-(--dh-muted)" />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search customers..."
                  className="w-full rounded-xl border border-(--dh-border) bg-(--dh-bg) py-3 pl-11 pr-4 text-sm outline-none focus:border-(--dh-gold)"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 border-b border-(--dh-border) px-5 py-4">
              {["All", "Active", "Inactive"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`rounded-lg px-4 py-2 text-sm transition ${
                    filter === item
                      ? "bg-(--dh-gold) font-semibold text-black"
                      : "bg-(--dh-bg) text-(--dh-muted) hover:text-(--dh-white)"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="divide-y divide-(--dh-border)">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className="flex flex-col gap-4 p-5 transition hover:bg-(--dh-surface-hover)/50 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="flex min-w-0 gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-(--dh-gold)/10 text-(--dh-gold)">
                        <FiUser size={20} />
                      </div>

                      <div className="min-w-0">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <h3 className="font-semibold">{customer.name}</h3>
                          <span
                            className={`rounded-full px-3 py-1 text-xs ${
                              customer.status === "Active"
                                ? "bg-green-500/10 text-green-500"
                                : "bg-gray-500/10 text-gray-500"
                            }`}
                          >
                            {customer.status}
                          </span>
                        </div>

                        <p className="truncate text-sm text-(--dh-muted)">
                          {customer.email}
                        </p>

                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-(--dh-muted)">
                          <span>{customer.location}</span>
                          <span>{customer.enquiries} enquiries</span>
                          <span>Last contact: {customer.lastContact}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedCustomer(customer)}
                      className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-(--dh-border) px-4 py-3 text-sm transition hover:border-(--dh-gold) hover:text-(--dh-gold)"
                    >
                      View Customer <FiArrowRight />
                    </button>
                  </div>
                ))
              ) : (
                <div className="px-5 py-16 text-center">
                  <FiUsers className="mx-auto mb-4 text-3xl text-(--dh-muted)" />
                  <h3 className="font-semibold">No customers found</h3>
                  <p className="mt-2 text-sm text-(--dh-muted)">
                    Try another search or filter.
                  </p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>

      {selectedCustomer && (
        <div className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/70 p-4">
          <div className="my-auto w-full max-w-xl rounded-2xl border border-(--dh-border) bg-(--dh-surface) shadow-2xl">
            <div className="flex items-center justify-between border-b border-(--dh-border) p-5">
              <div>
                <h2 className="text-lg font-bold">Customer Profile</h2>
                <p className="mt-1 text-xs text-(--dh-muted)">
                  Customer contact and activity details
                </p>
              </div>

              <button
                onClick={() => setSelectedCustomer(null)}
                aria-label="Close customer profile"
                className="rounded-lg p-2 text-(--dh-muted) hover:bg-(--dh-surface-hover)"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="space-y-6 p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-(--dh-gold)/10 text-(--dh-gold)">
                  <FiUser size={24} />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedCustomer.name}</h3>
                  <p className="mt-1 text-sm text-(--dh-muted)">
                    {selectedCustomer.location}
                  </p>
                </div>
              </div>

              <div className="space-y-3 rounded-xl border border-(--dh-border) bg-(--dh-bg) p-4 text-sm">
                <p className="flex items-center gap-3 text-(--dh-muted)">
                  <FiMail className="text-(--dh-gold)" />
                  {selectedCustomer.email}
                </p>
                <p className="flex items-center gap-3 text-(--dh-muted)">
                  <FiPhone className="text-(--dh-gold)" />
                  {selectedCustomer.phone}
                </p>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold">Enquiry Activity</h4>
                <div className="rounded-xl border border-(--dh-border) p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm text-(--dh-muted)">
                      Total enquiries
                    </span>
                    <span className="font-semibold">
                      {selectedCustomer.enquiries}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <span className="text-sm text-(--dh-muted)">
                      Last contact
                    </span>
                    <span className="text-sm font-medium">
                      {selectedCustomer.lastContact}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-semibold">
                  Interested Property
                </h4>
                <div className="rounded-xl bg-(--dh-bg) p-4">
                  <p className="font-medium">{selectedCustomer.property}</p>
                  <p className="mt-2 text-sm leading-6 text-(--dh-muted)">
                    {selectedCustomer.message}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-(--dh-border) pt-5">
                <button
                  onClick={() =>
                    updateCustomerStatus(
                      selectedCustomer.id,
                      selectedCustomer.status === "Active"
                        ? "Inactive"
                        : "Active",
                    )
                  }
                  className="rounded-xl border border-(--dh-border) px-4 py-3 text-sm text-(--dh-muted) hover:text-(--dh-white)"
                >
                  {selectedCustomer.status === "Active"
                    ? "Mark Inactive"
                    : "Mark Active"}
                </button>

                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="rounded-xl bg-(--dh-gold) px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
                >
                  Close Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
