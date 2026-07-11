import type { Metadata } from "next";
import { ContactView } from "./contact-view";
import { JsonLd } from "@/components/json-ld";
import { metadataFor, breadcrumbSchema, contactPageSchema } from "@/lib/seo";

export const metadata: Metadata = metadataFor("contact");

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          contactPageSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />
      <ContactView />
    </>
  );
}
