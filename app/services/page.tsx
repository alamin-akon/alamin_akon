import type { Metadata } from "next";
import { services } from "@/data/services";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { ServiceCard } from "@/components/cards/ServiceCard";
import { CTASection } from "@/components/sections/CTASection";
export const metadata: Metadata = { title: "Services", description: "Website design, front-end development, UI/UX, Shopify store design and customisation services from Alamin Akon.", alternates: { canonical: "/services" } };
export default function ServicesPage() { return <><PageHero eyebrow="Services" title="Digital support built around your next move." description="From first visual direction to a functional, responsive storefront, choose focused support for the parts of your digital experience that matter most."/><section className="section-space"><Container><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{services.map((service, index) => <ServiceCard key={service.slug} service={service} featured={index === 0}/>)}</div></Container></section><CTASection title="Need help improving your website?" description="I can help redesign, customise or optimise your existing website to create a cleaner and more professional user experience." secondary={false}/></>; }
