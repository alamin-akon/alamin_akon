import { Braces, PenTool, LayoutTemplate, Store } from "lucide-react";
import { professionalSummary } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
const items = [[LayoutTemplate, "Web design"], [Braces, "Front-end"], [PenTool, "UI / UX"], [Store, "Shopify"]] as const;
export function ProfessionalSummary() { return <section className="section-space border-y border-white/8 bg-surface/25"><Container><div className="grid gap-10 lg:grid-cols-[.83fr_1.17fr]"><Reveal><p className="text-xs font-bold uppercase tracking-[.2em] text-accent">Professional summary</p><h2 className="mt-4 text-3xl font-bold tracking-[-.05em] text-white sm:text-4xl">Crafting a strong, useful online presence.</h2><div className="mt-8 grid grid-cols-2 gap-3">{items.map(([Icon, label]) => <div key={label} className="rounded-2xl border border-white/8 bg-white/[.03] p-4"><Icon className="size-5 text-accent"/><p className="mt-5 text-sm font-semibold text-white">{label}</p></div>)}</div></Reveal><Reveal delay={.1}><p className="text-lg leading-8 text-slate-300">{professionalSummary}</p></Reveal></div></Container></section>; }
