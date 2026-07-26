import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://alaminakon.com"),
  title: { default: "Alamin Akon | Web Designer, Shopify Specialist & Front-End Developer", template: "%s | Alamin Akon" },
  description: "Alamin Akon is a Web Designer and Developer specialising in Shopify customisation, UI/UX design, front-end development, responsive websites and modern e-commerce experiences.",
  keywords: ["Alamin Akon", "Web Designer Bangladesh", "Web Developer Bangladesh", "Shopify Developer", "Shopify Specialist", "Shopify Designer", "Front-End Developer", "UI/UX Designer", "Responsive Website Designer", "E-commerce Designer", "Next.js Developer", "Freelance Web Designer"],
  openGraph: { type: "website", locale: "en_US", url: "/", siteName: "Alamin Akon", title: "Alamin Akon | Web Designer, Shopify Specialist & Front-End Developer", description: "Modern web design, Shopify customisation, UI/UX and front-end development." },
  twitter: { card: "summary_large_image", title: "Alamin Akon | Web Designer & Developer", description: "Modern web design, Shopify customisation, UI/UX and front-end development." },
  alternates: { canonical: "/" },
};
export const viewport: Viewport = { themeColor: "#070b14", colorScheme: "dark" };
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://alaminakon.com";
const structuredData = [
  { "@context": "https://schema.org", "@type": "Person", name: profile.name, url: siteUrl, jobTitle: profile.title, address: { "@type": "PostalAddress", addressCountry: "Bangladesh" }, sameAs: socials.map((social) => social.href) },
  { "@context": "https://schema.org", "@type": "ProfessionalService", name: "Alamin Akon", url: siteUrl, description: "Web design, Shopify customisation, UI/UX design and front-end development services.", areaServed: "Worldwide", provider: { "@type": "Person", name: profile.name } },
  { "@context": "https://schema.org", "@type": "WebSite", name: "Alamin Akon", url: siteUrl },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-text-primary antialiased"><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}/><a href="#main-content" className="skip-link">Skip to content</a><Header /><main id="main-content">{children}</main><Footer /></body>
    </html>
  );
}
