import { cn } from "@/lib/utils";

export function ProjectPreview({ title, industry, accent, className }: { title: string; industry: string; accent: string; className?: string }) {
  return <div className={cn("group relative aspect-[1.23/1] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br p-3", accent, className)}>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,.26),transparent_33%)]" />
    <div className="relative h-full overflow-hidden rounded-xl border border-slate-900/15 bg-[#f7f9ff] p-2 shadow-2xl transition duration-500 group-hover:scale-[1.025]">
      <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2"><span className="size-1.5 rounded-full bg-rose-400"/><span className="size-1.5 rounded-full bg-amber-400"/><span className="size-1.5 rounded-full bg-emerald-400"/><span className="ml-2 h-2 w-24 rounded-full bg-slate-200"/></div>
      <div className="grid h-[calc(100%-25px)] grid-cols-[.8fr_1.2fr] gap-2 pt-3"><div className="space-y-2"><div className="h-2 w-3/4 rounded bg-slate-200"/><div className="h-2 w-full rounded bg-slate-100"/><div className="h-2 w-4/5 rounded bg-slate-100"/><div className="mt-5 h-7 w-4/5 rounded-md bg-slate-800"/></div><div className="relative overflow-hidden rounded-lg bg-slate-200"><div className="absolute -right-4 -top-5 size-24 rounded-full bg-white/45"/><div className="absolute bottom-4 left-4 right-4 rounded-md bg-white/85 p-2 shadow-lg"><div className="h-2 w-2/3 rounded bg-slate-700"/><div className="mt-1.5 h-1.5 w-full rounded bg-slate-200"/><div className="mt-2 h-4 w-12 rounded bg-slate-800"/></div></div></div>
    </div>
    <div className="absolute bottom-7 left-7 z-10"><p className="text-lg font-bold tracking-tight text-slate-950">{title}</p><p className="mt-1 text-[10px] font-bold uppercase tracking-[.16em] text-slate-700">{industry}</p></div>
  </div>;
}
