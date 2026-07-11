import type { Metadata } from "next";
import { ServicesView } from "./services-view";
import { JsonLd } from "@/components/json-ld";
import {
  metadataFor,
  breadcrumbSchema,
  serviceCatalogSchema,
} from "@/lib/seo";

export const metadata: Metadata = metadataFor("services");

const SERVICES = [
  {
    name: "Web Development",
    description:
      "Scalable, SEO-ready, high-performance web applications built for growth.",
  },
  {
    name: "Mobile Development",
    description:
      "Native-quality iOS and Android apps with offline support and real-time features.",
  },
  {
    name: "Cloud Solutions",
    description:
      "Cloud migration, auto-scaling infrastructure, and managed cloud services.",
  },
  {
    name: "Integration & Portals",
    description:
      "Secure system integration, API connectivity, and centralized enterprise portals.",
  },
  {
    name: "Managed Services",
    description:
      "Ongoing operations, monitoring, and expert support with predictable SLAs.",
  },
  {
    name: "Digital Transformation",
    description:
      "Modernizing processes and systems with automation and AI-driven tooling.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          serviceCatalogSchema(SERVICES),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />
      <ServicesView />
    </>
  );
}
