import type { Metadata } from "next";

/**
 * Single source of truth for site-wide SEO.
 * Change the domain, brand strings, or social links here and every page,
 * the sitemap, robots, and JSON-LD update together.
 */

export const SITE = {
  name: "Quantix Tech",
  // No trailing slash. Used for metadataBase, canonicals, sitemap, JSON-LD.
  url: "https://quantix-tech.com",
  email: "sales@quantix-tech.com",
  // Fill these in as the client's profiles go live — they power the
  // Organization `sameAs` (helps Google connect the brand to its socials).
  social: {
    linkedin: "",
    github: "",
    clutch: "",
  },
  // Regions the business serves, as ISO country codes (schema.org areaServed).
  areaServed: ["SA", "JO", "US"] as const,
  defaultOgImage: "/og-image.png",
} as const;

/**
 * Supported locales. `en` is live today; `ar` is scaffolded for the
 * bilingual migration. `hreflang` alternates are only emitted for locales
 * whose content actually exists, so we don't ship duplicate-content pages.
 */
export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
// Locales with real, published content. Add "ar" here once translated.
export const LIVE_LOCALES: Locale[] = ["en"];

const absolute = (path: string) => new URL(path, SITE.url).toString();

/** A trimmed, still-useful keyword set. Meta keywords carry ~no ranking
 * weight, but a focused set is harmless; the 50-item dump was noise. */
const BASE_KEYWORDS = [
  "IT company Jordan",
  "web development Saudi Arabia",
  "mobile app development",
  "custom software development",
  "cloud solutions",
  "AI integration",
  "digital transformation",
  "UI/UX design",
];

type RouteSeo = {
  path: string;
  title: string;
  description: string;
  keywords?: string[];
  /** Sitemap hints */
  changeFrequency?: "yearly" | "monthly" | "weekly";
  priority?: number;
};

/**
 * Per-route SEO copy. Titles here are the *page-specific* part; the root
 * layout's title template appends " | Quantix Tech" automatically, except
 * the home route which supplies its own absolute title.
 */
export const ROUTES: Record<string, RouteSeo> = {
  home: {
    path: "/",
    title: "Quantix Tech — Web, Mobile, Cloud & AI Development",
    description:
      "Quantix Tech builds web, mobile, cloud, and AI solutions for businesses across Saudi Arabia, Jordan, and beyond. We turn ideas into powerful digital products.",
    keywords: BASE_KEYWORDS,
    changeFrequency: "monthly",
    priority: 1,
  },
  services: {
    path: "/services",
    title: "Services",
    description:
      "End-to-end software services: web and mobile development, cloud and DevOps, system integration, and AI solutions — engineered for scale and reliability.",
    keywords: [
      "web development services",
      "mobile app development",
      "cloud migration",
      "DevOps consulting",
      "API integration",
      "AI solutions",
    ],
    changeFrequency: "monthly",
    priority: 0.9,
  },
  about: {
    path: "/about",
    title: "About Us",
    description:
      "Meet Quantix Tech — an engineering team turning ambitious ideas into dependable software. Our mission, values, and the people behind the work.",
    changeFrequency: "yearly",
    priority: 0.6,
  },
  contact: {
    path: "/contact",
    title: "Contact",
    description:
      "Start a project with Quantix Tech. Tell us what you're building and we'll get back to you with a clear, practical plan.",
    changeFrequency: "yearly",
    priority: 0.7,
  },
  "privacy-policies": {
    path: "/privacy-policies",
    title: "Privacy Policy",
    description:
      "How Quantix Tech collects, uses, and protects your information.",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  "terms-and-conditions": {
    path: "/terms-and-conditions",
    title: "Terms & Conditions",
    description:
      "The terms that govern the use of Quantix Tech's website and services.",
    changeFrequency: "yearly",
    priority: 0.3,
  },
};

/**
 * Build a complete Metadata object for a route from its SEO entry.
 * Handles canonical, OpenGraph, Twitter, and hreflang alternates.
 */
export function metadataFor(key: keyof typeof ROUTES): Metadata {
  const r = ROUTES[key];
  const isHome = r.path === "/";

  // hreflang: one entry per live locale, plus x-default → primary locale.
  const languages: Record<string, string> = {};
  for (const loc of LIVE_LOCALES) {
    languages[loc] = loc === DEFAULT_LOCALE ? r.path : `/${loc}${r.path === "/" ? "" : r.path}`;
  }
  languages["x-default"] = r.path;

  return {
    title: isHome ? { absolute: r.title } : r.title,
    description: r.description,
    ...(r.keywords ? { keywords: r.keywords } : {}),
    alternates: {
      canonical: r.path,
      languages,
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: "en_US",
      url: r.path,
      title: r.title,
      description: r.description,
      images: [
        {
          url: SITE.defaultOgImage,
          width: 1200,
          height: 630,
          alt: SITE.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: r.title,
      description: r.description,
      images: [SITE.defaultOgImage],
    },
  };
}

/* ------------------------------------------------------------------ */
/* JSON-LD builders — return plain objects; render via <JsonLd />.     */
/* ------------------------------------------------------------------ */

export function organizationSchema() {
  const sameAs = Object.values(SITE.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: absolute("/Quantix-Tech-Icon.png"),
    image: absolute(SITE.defaultOgImage),
    email: SITE.email,
    description:
      "Quantix Tech is a software company specializing in web development, mobile apps, cloud solutions, and AI integration.",
    areaServed: SITE.areaServed.map((c) => ({ "@type": "Country", name: c })),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    publisher: { "@type": "Organization", name: SITE.name },
  };
}

export function breadcrumbSchema(
  trail: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

export function serviceCatalogSchema(
  services: { name: string; description: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Quantix Tech Services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.description,
        provider: { "@type": "Organization", name: SITE.name },
      },
    })),
  };
}

export function contactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Quantix Tech",
    url: absolute("/contact"),
    mainEntity: {
      "@type": "Organization",
      name: SITE.name,
      email: SITE.email,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE.email,
        areaServed: SITE.areaServed,
        availableLanguage: ["en", "ar"],
      },
    },
  };
}
