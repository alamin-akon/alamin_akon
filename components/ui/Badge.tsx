import { cn } from "@/lib/utils";
export function Badge({ children, className }: { children: React.ReactNode; className?: string }) { return <span className={cn("inline-flex rounded-full border border-white/10 bg-white/[.04] px-3 py-1 text-xs font-medium text-slate-300", className)}>{children}</span>; }
