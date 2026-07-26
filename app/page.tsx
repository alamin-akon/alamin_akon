import type { Metadata } from "next";
import { AboutSection } from "@/components/sections/AboutSection";
import { BrandStatement } from "@/components/sections/BrandStatement";
import { CTASection } from "@/components/sections/CTASection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ProfessionalSummary } from "@/components/sections/ProfessionalSummary";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { WhyChooseMeSection } from "@/components/sections/WhyChooseMeSection";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() { return <><HeroSection/><AboutSection/><SkillsSection/><ServicesSection limit={4}/><ProjectsSection/><ProcessSection/><WhyChooseMeSection/><ProfessionalSummary/><BrandStatement/><CTASection title="Have a Project in Mind?" description="Whether you need a new website, a Shopify store, a website redesign or a responsive front-end interface, let’s discuss how I can help bring your idea to life." secondary={false}/></>; }
