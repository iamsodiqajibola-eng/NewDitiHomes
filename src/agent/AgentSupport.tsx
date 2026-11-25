import { useState } from "react";
import {
  FiHelpCircle,
  FiMessageCircle,
  FiMail,
  FiPhone,
  FiChevronDown,
  FiChevronUp,
  FiSend,
  FiCheckCircle,
  FiFileText,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const faqs = [
  {
    question: "How do I add a new property?",
    answer:
      "Open My Properties from your agent workspace and select Add Property. Complete the property information and submit it for review. Your listing will need admin approval before it becomes publicly available.",
  },
  {
    question: "Why is my property listing not visible?",
    answer:
      "New property listings are subject to administrative review. A listing may remain unpublished while it is pending verification or if additional information is required.",
  },
  {
    question: "How do I manage inspection requests?",
    answer:
      "Open the Inspections section of your dashboard. You can review incoming requests and manage their status. The complete inspection confirmation and check-in process will be introduced in a later platform update.",
  },
  {
    question: "How do I respond to customer enquiries?",
    answer:
      "Visit the Enquiries section, select a customer message and review the enquiry details. The current interface is a frontend demonstration; actual message delivery will be enabled when messaging is connected to the backend.",
  },
  {
    question: "How can I update my agent profile?",
    answer:
      "Open Account Settings and select the Profile or Business tab. You can review and edit your information in the current prototype. Persistent updates will be enabled after backend integration.",
  },
  {
    question: "How do I become a verified agent?",
    answer:
      "Complete the agent onboarding process and submit the requested identity and professional information. Your application and submitted documents must be reviewed and approved by the DitiHomes administration team.",
  },
];

export default function AgentSupport() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Account & Verification");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!subject.trim() || !message.trim()) return;

    setSubmitted(true);
    setSubject("");
    setMessage("");
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
                  item.label === "Support"
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
              Agent workspace / Support
            </p>
            <h1 className="text-2xl font-bold sm:text-3xl">
              Support & Help Centre
            </h1>
            <p className="mt-2 text-sm text-(--dh-muted)">
              Find answers, get assistance and let us know when you need help.
            </p>
          </div>

          <section className="mb-8 rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-6 sm:p-8">
            <div className="max-w-2xl">
              <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-(--dh-gold)/10 text-(--dh-gold)">
                <FiHelpCircle size={24} />
              </span>
              <h2 className="text-xl font-bold sm:text-2xl">
                How can we help you?
              </h2>
              <p className="mt-2 text-sm leading-6 text-(--dh-muted)">
                Whether you have a question about your account, property
                listings, inspections or customers, we're here to help.
              </p>
            </div>
          </section>

          <div className="mb-8 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: <FiMessageCircle size={22} />,
                title: "General Support",
                description: "Get help with your agent account and dashboard.",
              },
              {
                icon: <FiFileText size={22} />,
                title: "Property Assistance",
                description:
                  "Questions about listings, verification and approvals.",
              },
              {
                icon: <FiMail size={22} />,
                title: "Contact Support",
                description: "Send a message to the support team.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5"
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-(--dh-gold)/10 text-(--dh-gold)">
                  {item.icon}
                </span>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-(--dh-muted)">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
            <section className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5 sm:p-7">
              <div className="mb-6">
                <h2 className="text-lg font-bold">
                  Frequently Asked Questions
                </h2>
                <p className="mt-1 text-sm text-(--dh-muted)">
                  Quick answers to common agent questions.
                </p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div
                    key={faq.question}
                    className="overflow-hidden rounded-xl border border-(--dh-border)"
                  >
                    <button
                      onClick={() =>
                        setOpenFaq(openFaq === index ? null : index)
                      }
                      className="flex w-full items-center justify-between gap-4 p-4 text-left"
                    >
                      <span className="text-sm font-medium">
                        {faq.question}
                      </span>
                      <span className="shrink-0 text-(--dh-gold)">
                        {openFaq === index ? (
                          <FiChevronUp />
                        ) : (
                          <FiChevronDown />
                        )}
                      </span>
                    </button>

                    {openFaq === index && (
                      <div className="border-t border-(--dh-border) px-4 py-4">
                        <p className="text-sm leading-7 text-(--dh-muted)">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <div className="space-y-6">
              <section className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5">
                <h2 className="text-lg font-bold">Submit a Support Ticket</h2>
                <p className="mt-2 text-sm leading-6 text-(--dh-muted)">
                  Describe your issue and our support team can review your
                  request.
                </p>

                {submitted ? (
                  <div className="mt-6 rounded-xl border border-(--dh-success)/30 bg-(--dh-success)/10 p-5">
                    <FiCheckCircle className="mb-3 text-2xl text-(--dh-success)" />
                    <h3 className="font-semibold">Request prepared</h3>
                    <p className="mt-2 text-sm leading-6 text-(--dh-muted)">
                      Your form was accepted in this demo. No support ticket has
                      been sent or stored yet.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 text-sm font-semibold text-(--dh-gold)"
                    >
                      Submit another request
                    </button>
                  </div>
                ) : (
                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Issue Category
                      </label>
                      <select
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        className="w-full rounded-xl border border-(--dh-border) bg-(--dh-bg) px-4 py-3 text-sm outline-none focus:border-(--dh-gold)"
                      >
                        <option>Account & Verification</option>
                        <option>Property Listings</option>
                        <option>Inspections</option>
                        <option>Customer Enquiries</option>
                        <option>Payments & Commission</option>
                        <option>Technical Issue</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Subject
                      </label>
                      <input
                        value={subject}
                        onChange={(event) => setSubject(event.target.value)}
                        placeholder="Briefly describe your issue"
                        className="w-full rounded-xl border border-(--dh-border) bg-(--dh-bg) px-4 py-3 text-sm outline-none focus:border-(--dh-gold)"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Message
                      </label>
                      <textarea
                        rows={5}
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        placeholder="Explain what happened and how we can help..."
                        className="w-full resize-none rounded-xl border border-(--dh-border) bg-(--dh-bg) px-4 py-3 text-sm leading-6 outline-none focus:border-(--dh-gold)"
                      />
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={!subject.trim() || !message.trim()}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-(--dh-gold) px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <FiSend /> Submit Request
                    </button>
                  </div>
                )}
              </section>

              <section className="rounded-2xl border border-(--dh-border) bg-(--dh-surface) p-5">
                <h2 className="font-semibold">Need direct assistance?</h2>
                <p className="mt-2 text-sm leading-6 text-(--dh-muted)">
                  Contact details will be published here when the official
                  DitiHomes support channels are configured.
                </p>
                <div className="mt-5 space-y-3 text-sm text-(--dh-muted)">
                  <p className="flex items-center gap-3">
                    <FiMail className="text-(--dh-gold)" />
                    Official support email: To be configured
                  </p>
                  <p className="flex items-center gap-3">
                    <FiPhone className="text-(--dh-gold)" />
                    Support phone: To be configured
                  </p>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
