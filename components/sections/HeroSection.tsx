"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ArrowDown, ArrowRight, Braces, PenTool, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const highlights = ["Modern Web Design", "Shopify Customisation", "Responsive Development", "UI/UX Focused"];

export function HeroSection() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const context = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo("[data-hero-reveal]", { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: .75, stagger: .12, ease: "power3.out", delay: .1 });
      gsap.to("[data-orbit]", { rotate: 360, duration: 28, repeat: -1, ease: "none" });
      gsap.to("[data-float]", { y: -12, duration: 2.6, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: .35 });
    }, root);
    return () => context.revert();
  }, []);
  return <section ref={root} className="relative isolate overflow-hidden pt-28 sm:pt-36">
    <div className="hero-grid absolute inset-0 -z-20 opacity-50"/><div className="absolute -right-24 top-20 -z-10 size-[35rem] rounded-full bg-primary/20 blur-[120px]"/><div className="absolute -left-32 top-72 -z-10 size-[27rem] rounded-full bg-secondary/20 blur-[120px]"/>
    <Container className="pb-16 pt-14 sm:pb-24 lg:pb-32"><div className="grid items-center gap-14 lg:grid-cols-[1.08fr_.92fr] lg:gap-8"><div>
      <div data-hero-reveal className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-cyan-100"><span className="size-1.5 rounded-full bg-accent shadow-[0_0_12px_#22d3ee]"/>Hello, I&apos;m Alamin Akon</div>
      <h1 data-hero-reveal className="mt-6 max-w-4xl text-5xl font-extrabold leading-[.97] tracking-[-.065em] text-white sm:text-6xl lg:text-7xl">Web Designer, <span className="text-gradient">Shopify Specialist</span> and Front-End Developer.</h1>
      <p data-hero-reveal className="mt-6 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">I create responsive websites, Shopify stores and user-focused interfaces that combine professional design, practical functionality and smooth user experiences.</p>
      <div data-hero-reveal className="mt-8 flex flex-wrap gap-3"><Button href="/projects">View My Work <ArrowRight className="size-4"/></Button><Button href="/contact" variant="secondary">Let&apos;s Work Together</Button><a href="/resume.pdf" className="inline-flex items-center gap-2 px-3 text-sm font-semibold text-slate-300 transition hover:text-accent">Download Resume <ArrowDown className="size-4"/></a></div>
    </div><div data-hero-reveal className="relative mx-auto w-full max-w-[520px]"><div data-orbit className="absolute -inset-5 rounded-full border border-dashed border-primary/30"/><div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#111e43] via-[#10182b] to-[#25144d] p-4 shadow-2xl shadow-primary/15"><div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(34,211,238,.18),transparent_26%),radial-gradient(circle_at_20%_85%,rgba(139,92,246,.28),transparent_34%)]"/><div className="relative h-full rounded-2xl border border-white/10 bg-[#0a1121]/75 p-4 backdrop-blur-sm"><div className="flex items-center justify-between border-b border-white/10 pb-3"><div className="flex gap-1.5"><i className="size-2 rounded-full bg-rose-400"/><i className="size-2 rounded-full bg-amber-300"/><i className="size-2 rounded-full bg-emerald-400"/></div><span className="font-mono text-[10px] text-slate-500">alaminakon.dev</span></div><div className="pt-10"><p className="font-mono text-xs text-accent">&lt;creative-developer /&gt;</p><p className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">Ideas, made tangible.</p><div className="mt-7 grid grid-cols-2 gap-3"><MiniCard icon={<PenTool/>} label="UI / UX"/><MiniCard icon={<ShoppingBag/>} label="Shopify"/><MiniCard icon={<Braces/>} label="Next.js"/><MiniCard icon={<Sparkles/>} label="Creative"/></div></div></div></div><div data-float className="absolute -bottom-4 -left-5 rounded-2xl border border-white/15 bg-surface/90 p-3 shadow-xl backdrop-blur"><p className="text-xs font-semibold text-white">Responsive by design</p><p className="mt-1 text-[10px] text-text-secondary">Every screen, considered.</p></div><div data-float className="absolute -right-4 top-14 rounded-2xl border border-white/15 bg-surface/90 p-3 shadow-xl backdrop-blur"><p className="text-xs font-semibold text-accent">Shopify</p><p className="mt-1 text-[10px] text-text-secondary">Storefront specialist</p></div></div></div></div>
    <div data-hero-reveal className="mt-14 grid grid-cols-2 border-t border-white/10 pt-6 sm:grid-cols-4">{highlights.map((item) => <div key={item} className="border-l border-white/10 px-4 py-2 first:border-l-0"><span className="block text-sm font-semibold text-white">{item}</span><span className="mt-1 block text-xs text-text-secondary">Built with purpose</span></div>)}</div><Link href="#about" aria-label="Scroll to about section" className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-text-secondary transition hover:text-accent lg:block"><ArrowDown className="size-5 animate-bounce"/></Link>
    </Container>
  </section>;
}
function MiniCard({ icon, label }: { icon: ReactNode; label: string }) { return <div className="rounded-xl border border-white/10 bg-white/[.04] p-3 text-slate-200"><div className="size-4 text-accent">{icon}</div><p className="mt-5 text-xs font-semibold">{label}</p></div>; }
