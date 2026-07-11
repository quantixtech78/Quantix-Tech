import type { Metadata } from "next";
import { AboutView } from "./about-view";
import { JsonLd } from "@/components/json-ld";
import { metadataFor, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = metadataFor("about");

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <AboutView />
    </>
  );
}
