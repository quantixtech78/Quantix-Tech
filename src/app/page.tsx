import type { Metadata } from "next";
import { HomeView } from "./home-view";
import { JsonLd } from "@/components/json-ld";
import { metadataFor, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = metadataFor("home");

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }])} />
      <HomeView />
    </>
  );
}
