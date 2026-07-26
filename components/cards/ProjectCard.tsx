import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { ProjectPreview } from "@/components/cards/ProjectPreview";

export function ProjectCard({ project }: { project: Project }) { return <article className="group"><Link href={`/projects/${project.slug}`} aria-label={`View ${project.title} project details`}><ProjectPreview title={project.title} industry={project.industry} accent={project.accent}/></Link><div className="px-1 pt-5"><div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-accent">{project.platform}</p><h3 className="mt-2 text-xl font-bold tracking-tight text-white transition group-hover:text-accent">{project.title}</h3></div><a href={project.website} target="_blank" rel="noreferrer" aria-label={`Visit ${project.title} website`} className="grid size-9 shrink-0 place-items-center rounded-full border border-white/10 text-text-secondary transition hover:border-accent hover:text-accent"><ArrowUpRight className="size-4" /></a></div><p className="mt-3 line-clamp-2 text-sm leading-6 text-text-secondary">{project.description}</p><div className="mt-4 flex flex-wrap gap-2">{project.categories.slice(0, 2).map((category) => <Badge key={category}>{category}</Badge>)}</div></div></article>; }
