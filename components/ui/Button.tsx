import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps { href: string; children: ReactNode; variant?: "primary" | "secondary" | "ghost"; className?: string; external?: boolean; }

export function Button({ href, children, variant = "primary", className, external }: ButtonProps) {
  const styles = {
    primary: "bg-primary text-white shadow-[0_10px_32px_rgba(79,124,255,.28)] hover:bg-primary/90",
    secondary: "border border-white/12 bg-white/[.04] text-white hover:border-accent/40 hover:bg-white/[.08]",
    ghost: "text-white hover:text-accent",
  };
  const content = <>{children}{external && <ArrowUpRight aria-hidden="true" className="size-4" />}</>;
  const classes = cn("inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background", styles[variant], className);
  if (external) return <a href={href} target="_blank" rel="noreferrer" className={classes}>{content}</a>;
  return <Link href={href} className={classes}>{content}</Link>;
}
