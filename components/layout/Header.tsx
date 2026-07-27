"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, House, Menu, PhoneCall, Snowflake, UserRound, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { navigation } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const menuAppearance = {
  "/": { icon: House, label: "Home", from: "#a955ff", to: "#ea51ff" },
  "/about": { icon: UserRound, label: "About", from: "#56CCF2", to: "#2F80ed" },
  "/services": { icon: BriefcaseBusiness, label: "Service", from: "#FF9966", to: "#FF5E62" },
  "/projects": { icon: Snowflake, label: "Blog", from: "#80FF72", to: "#7EE8FA" },
  "/contact": { icon: PhoneCall, label: "Contact", from: "#ffa9c6", to: "#f434e2" },
} as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 12);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return <header style={{ padding: "25px 0" }} className={cn("fixed inset-x-0 top-0 z-50 transition duration-300", scrolled ? "border-b border-white/8 bg-background/85 shadow-2xl shadow-black/10 backdrop-blur-xl" : "bg-transparent")}>
    <Container className="grid h-[76px] grid-cols-[1fr_auto_1fr] items-center">
      <Link href="/" className="group justify-self-start" aria-label="Alamin Akon home">
        <span className="relative block h-16 w-52 overflow-hidden rounded-xl">
          <Image src="/images/alamin-akon-wordmark.png" alt="" fill priority sizes="208px" className="object-cover object-center brightness-[2.2] contrast-[1.12] saturate-150"/>
        </span>
      </Link>

      <nav className="hidden items-center justify-self-center gap-[25px] lg:flex" aria-label="Main navigation">
        {navigation.map((item) => <CreativeMenuItem key={item.href} href={item.href} active={pathname === item.href}/>) }
      </nav>

      <div className="hidden justify-self-end lg:block"><HeaderActionButton/></div>
      <button type="button" onClick={() => setOpen(!open)} className="grid size-11 justify-self-end place-items-center rounded-xl border border-white/10 text-white lg:hidden" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation" : "Open navigation"}>{open ? <X /> : <Menu />}</button>
    </Container>

    <AnimatePresence>{open && <motion.div id="mobile-navigation" initial={reduced ? false : { opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} className="border-t border-white/8 bg-surface lg:hidden">
      <Container className="flex min-h-[calc(100vh-76px)] flex-col items-center py-10">
        <nav className="grid w-full max-w-sm grid-cols-2 justify-items-center gap-x-4 gap-y-6" aria-label="Mobile navigation">
          {navigation.map((item) => <CreativeMenuItem key={item.href} href={item.href} active={pathname === item.href} mobile onClick={() => setOpen(false)}/>) }
        </nav>
        <Button href="/contact" className="mt-10 w-full max-w-sm" variant="primary">Let&apos;s Work Together</Button>
      </Container>
    </motion.div>}</AnimatePresence>
  </header>;
}

function CreativeMenuItem({ href, active, mobile = false, onClick }: { href: string; active: boolean; mobile?: boolean; onClick?: () => void }) {
  const { icon: Icon, label, from, to } = menuAppearance[href as keyof typeof menuAppearance];
  const style = { "--menu-from": from, "--menu-to": to } as CSSProperties;
  return <Link href={href} onClick={onClick} aria-current={active ? "page" : undefined} style={style} className={cn("creative-menu-item", mobile && "creative-menu-item-mobile", active && "creative-menu-item-active")}>
    <Icon className="creative-menu-icon size-7" aria-hidden="true"/>
    <span className="creative-menu-text">{label}</span>
  </Link>;
}

function HeaderActionButton() {
  return <Link href="/contact" className="creative-header-button creative-header-button-type-c">
    <span className="creative-header-button-line"/>
    <span className="creative-header-button-line"/>
    <span className="creative-header-button-text">Contact us</span>
    <span className="creative-header-button-draw-one"/>
    <span className="creative-header-button-draw-two"/>
  </Link>;
}
