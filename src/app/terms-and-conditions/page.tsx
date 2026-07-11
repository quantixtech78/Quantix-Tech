import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { metadataFor, breadcrumbSchema } from "@/lib/seo";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing or using Quantix Tech services, website, or deliverables, you agree to these Terms & Conditions. If you do not agree, you must discontinue use of our services.",
  },
  {
    title: "2. Scope of Services",
    body: "Quantix Tech provides software engineering, consulting, integration, and managed technology services as agreed in project proposals, statements of work, or contracts.",
  },
  {
    title: "3. Client Responsibilities",
    body: "Clients are responsible for timely approvals, providing accurate requirements, legal rights to shared data/content, and payment according to agreed milestones.",
  },
  {
    title: "4. Fees and Payments",
    body: "Fees, billing schedules, taxes, and payment methods are defined in the applicable agreement. Delayed payments may result in service suspension where legally permitted.",
  },
  {
    title: "5. Intellectual Property",
    body: "Unless otherwise specified in writing, pre-existing Quantix Tech tools, frameworks, and know-how remain Quantix Tech property. Project-specific deliverables transfer per the signed agreement.",
  },
  {
    title: "6. Confidentiality",
    body: "Both parties agree to protect confidential information and use it solely for project execution, subject to legal disclosure requirements.",
  },
  {
    title: "7. Warranties and Disclaimers",
    body: "Services are provided with commercially reasonable care and skill. Except where required by law, all implied warranties are disclaimed.",
  },
  {
    title: "8. Limitation of Liability",
    body: "To the maximum extent permitted by law, neither party is liable for indirect, incidental, special, or consequential damages arising from service use.",
  },
  {
    title: "9. Termination",
    body: "Either party may terminate according to the governing agreement. Upon termination, outstanding payment obligations and confidentiality commitments remain in effect.",
  },
  {
    title: "10. Governing Law",
    body: "These terms are governed by applicable law as set out in the controlling service agreement between Quantix Tech and the client.",
  },
  {
    title: "11. Contact",
    body: "For legal or contractual inquiries, contact: info@quantix-tech.com",
  },
];


export const metadata: Metadata = metadataFor("terms-and-conditions");

export default function TermsAndConditionsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Terms & Conditions", path: "/terms-and-conditions" },
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
              Legal Information
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-[#0f172a] mb-4 tracking-tight">
              Terms & Conditions
            </h1>
            <p className="text-slate-600 text-base md:text-lg max-w-2xl">
              Clear terms that govern how we deliver our services and protect
              both parties.
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
                    Applies To
                  </p>
                  <p className="text-[#0f172a] dark:text-white font-semibold">
                    All Quantix Tech Services
                  </p>
                </div>
                <div className="rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-[#38bdf8]/30 p-4">
                  <p className="text-slate-500 dark:text-slate-300 mb-1">
                    Contact
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
