import { Layers3 } from "lucide-react";
import { skillCategories } from "@/data/skills";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
export function SkillsSection() { return <section className="section-space border-y border-white/8 bg-surface/35"><Container><Reveal><SectionHeading eyebrow="Skills & technologies" title="A considered mix of design and development." description="The tools and skills I use to create clear, responsive and useful digital products." /></Reveal><div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{skillCategories.map((category, index) => <Reveal key={category.title} delay={index * .05}><article className="h-full rounded-3xl border border-white/8 bg-background/40 p-6"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-primary/15 text-accent"><Layers3 className="size-5"/></span><div><h3 className="font-bold text-white">{category.title}</h3><p className="mt-1 text-xs leading-5 text-text-secondary">{category.description}</p></div></div><div className="mt-6 flex flex-wrap gap-2">{category.skills.map((skill) => <Badge key={skill}>{skill}</Badge>)}</div></article></Reveal>)}</div></Container></section>; }
