import type { Metadata } from "next";
import { projects } from "@/data/projects";
import { PageHero } from "@/components/sections/PageHero";
import { ProjectExplorer } from "@/components/sections/ProjectExplorer";
import { Container } from "@/components/ui/Container";
import { CTASection } from "@/components/sections/CTASection";
export const metadata: Metadata = { title: "Projects", description: "Explore selected Shopify, web design, UI/UX and front-end projects by Alamin Akon.", alternates: { canonical: "/projects" } };
export default function ProjectsPage() { return <><PageHero eyebrow="Selected projects" title="Modern interfaces made for real-world use." description="Explore a selection of Shopify, e-commerce, business website and digital experience work."/><section className="section-space"><Container><ProjectExplorer projects={projects}/></Container></section><CTASection title="Ready to create your next digital experience?" description="Let’s turn the goals for your website or store into something clear, capable and professional."/></>; }
