import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { metadataFor, breadcrumbSchema } from "@/lib/seo";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const sections = [
  {
    title: "1. Information We Collect",
    body: "We may collect contact details, business information, communications, and technical data needed to provide and improve our services.",
  },
  {
    title: "2. How We Use Information",
    body: "We use information to respond to inquiries, deliver services, manage projects, maintain security, and comply with legal obligations.",
  },
  {
    title: "3. Legal Bases",
    body: "Where applicable, processing is based on contract performance, legitimate interests, consent, or legal compliance requirements.",
  },
  {
    title: "4. Data Sharing",
    body: "We may share data with trusted service providers or partners under confidentiality obligations, and only as necessary for service delivery.",
  },
  {
    title: "5. Data Retention",
    body: "We retain personal data only as long as needed for the purposes described, contractual requirements, and applicable law.",
  },
  {
    title: "6. Security",
    body: "We apply technical and organizational safeguards designed to protect personal data from unauthorized access, loss, or misuse.",
  },
  {
    title: "7. International Transfers",
    body: "When data is transferred across regions, we use appropriate safeguards required by applicable data protection regulations.",
  },
  {
    title: "8. Your Rights",
    body: "Depending on jurisdiction, you may request access, correction, deletion, restriction, or portability of your personal data.",
  },
  {
    title: "9. Cookies and Analytics",
    body: "We may use cookies and analytics technologies to understand website usage and improve user experience.",
  },
  {
    title: "10. Policy Updates",
    body: "We may update this Privacy Policy periodically. Material changes are reflected by updating the effective date on this page.",
  },
  {
    title: "11. Contact",
    body: "For privacy-related requests, contact: info@quantix-tech.com",
  },
];


export const metadata: Metadata = metadataFor("privacy-policies");

export default function PrivacyPoliciesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policies" },
        ])}
      />
      <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 pt-20 md:pt-24">
        <section className="relative overflow-hidden py-20 bg-gradient-to-br from-white via-slate-50 to-sky-50">
          <div className="absolute top-0 right-0 w-[360px] h-[360px] bg-[#38bdf8]/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -left-10 w-[280px] h-[280px] bg-[#1e3a5f]/10 rounded-full blur-3xl" />
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="inline-flex items-center rounded-full border border-[#38bdf8]/30 bg-white/70 backdrop-blur-sm px-3 py-1 text-xs font-medium text-[#1e3a5f] mb-5">
              Data & Privacy
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-[#0f172a] mb-4 tracking-tight">
              Privacy Policies
            </h1>
            <p className="text-slate-600 text-base md:text-lg max-w-2xl">
              How Quantix Tech handles, protects, and uses personal and business
              data.
            </p>
            <p className="text-slate-500 mt-3">Effective date: July 3, 2026</p>

            <div className="mt-8 rounded-2xl border border-white/70 bg-white/70 dark:bg-[#0f172a]/70 dark:border-[#38bdf8]/30 backdrop-blur-md shadow-xl p-5 md:p-6">
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="rounded-xl bg-[#38bdf8]/10 dark:bg-[#38bdf8]/20 border border-[#38bdf8]/20 dark:border-[#38bdf8]/35 p-4">
                  <p className="text-slate-500 dark:text-slate-300 mb-1">
                    Last Updated
                  </p>
                  <p className="text-[#0f172a] dark:text-white font-semibold">
                    July 3, 2026
                  </p>
                </div>
                <div className="rounded-xl bg-[#1e3a5f]/10 dark:bg-[#1e3a5f]/30 border border-[#1e3a5f]/20 dark:border-[#38bdf8]/35 p-4">
                  <p className="text-slate-500 dark:text-slate-300 mb-1">
                    Coverage
                  </p>
                  <p className="text-[#0f172a] dark:text-white font-semibold">
                    Website + Service Data
                  </p>
                </div>
                <div className="rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-[#38bdf8]/30 p-4">
                  <p className="text-slate-500 dark:text-slate-300 mb-1">
                    Privacy Contact
                  </p>
                  <p className="text-[#0f172a] dark:text-[#38bdf8] font-semibold">
                    info@quantix-tech.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
            {sections.map((section) => (
              <article
                key={section.title}
                className="group border border-slate-200/80 rounded-2xl p-6 md:p-7 bg-white shadow-sm hover:shadow-md hover:border-[#38bdf8]/40 transition-all duration-300"
              >
                <h2 className="text-lg md:text-xl font-semibold text-[#0f172a] mb-3 group-hover:text-[#1e3a5f] transition-colors">
                  {section.title}
                </h2>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  {section.body}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  </>
  );
}
