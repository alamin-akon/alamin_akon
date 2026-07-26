import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, description, align = "left" }: { eyebrow: string; title: string; description?: string; align?: "left" | "center" }) {
  return <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
    <p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-accent">{eyebrow}</p>
    <h2 className="text-3xl font-bold tracking-[-.045em] text-white sm:text-4xl lg:text-5xl">{title}</h2>
    {description && <p className="mt-5 text-base leading-7 text-text-secondary sm:text-lg">{description}</p>}
  </div>;
}
