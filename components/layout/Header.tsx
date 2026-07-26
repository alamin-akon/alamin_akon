"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { navigation } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname(); const [open, setOpen] = useState(false); const [scrolled, setScrolled] = useState(false); const reduced = useReducedMotion();
  useEffect(() => { const update = () => setScrolled(window.scrollY > 12); update(); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update); }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  return <header className={cn("fixed inset-x-0 top-0 z-50 transition duration-300", scrolled ? "border-b border-white/8 bg-background/85 shadow-2xl shadow-black/10 backdrop-blur-xl" : "bg-transparent")}>
    <Container className="flex h-[76px] items-center justify-between">
      <Link href="/" className="group flex items-center gap-2 font-bold tracking-[-.045em] text-white" aria-label="Alamin Akon home"><Image src="/brand-mark.svg" alt="" width={36} height={36} priority className="size-9 shadow-lg shadow-primary/25"/><span>Alamin Akon</span></Link>
      <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">{navigation.map((item) => <Link key={item.href} href={item.href} className={cn("rounded-full px-3 py-2 text-sm transition hover:text-accent", pathname === item.href ? "text-white" : "text-text-secondary")}>{item.label}</Link>)}<Button href="/contact" className="ml-3" variant="primary">Let&apos;s Work Together</Button></nav>
      <button type="button" onClick={() => setOpen(!open)} className="grid size-11 place-items-center rounded-xl border border-white/10 text-white lg:hidden" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"}>{open ? <X /> : <Menu />}</button>
    </Container>
    <AnimatePresence>{open && <motion.div id="mobile-navigation" initial={reduced ? false : { opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} className="border-t border-white/8 bg-surface lg:hidden"><Container className="flex min-h-[calc(100vh-76px)] flex-col py-10"><nav className="flex flex-col gap-3" aria-label="Mobile navigation">{navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={cn("rounded-2xl px-4 py-4 text-2xl font-bold tracking-tight", pathname === item.href ? "bg-white/[.07] text-accent" : "text-white")}>{item.label}</Link>)}</nav><Button href="/contact" className="mt-8 w-full">Let&apos;s Work Together</Button></Container></motion.div>}</AnimatePresence>
  </header>;
}
