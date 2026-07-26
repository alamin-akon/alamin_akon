import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/cards/ProjectCard";
export function ProjectsSection({ limit = 3 }: { limit?: number }) { return <section className="section-space border-y border-white/8 bg-surface/25"><Container><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><Reveal><SectionHeading eyebrow="Selected work" title="Thoughtful experiences for ambitious brands." description="A selection of website, Shopify and interface work focused on clarity, responsiveness and a polished customer journey." /></Reveal><Button href="/projects" variant="ghost">View all projects <ArrowRight className="size-4"/></Button></div><div className="mt-12 grid gap-x-5 gap-y-10 md:grid-cols-2 lg:grid-cols-3">{projects.slice(0, limit).map((project, index) => <Reveal key={project.slug} delay={index * .08}><ProjectCard project={project}/></Reveal>)}</div></Container></section>; }
