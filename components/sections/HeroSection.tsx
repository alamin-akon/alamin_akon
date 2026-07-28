"use client";

import Link from "next/link";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown, ArrowUpRight, FolderOpen } from "lucide-react";
import { Container } from "@/components/ui/Container";

export function HeroSection() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo("[data-hero-eyebrow]", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: .7, ease: "power3.out", delay: .15 });
      gsap.fromTo("[data-hero-title]", { autoAlpha: 0, y: 45, scale: .97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.15, ease: "power4.out", delay: .25 });
      gsap.fromTo("[data-hero-subtitle], [data-hero-actions]", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: .7, stagger: .14, ease: "power3.out", delay: .8 });
    }, root);
    return () => context.revert();
  }, []);

  return (
    <section ref={root} className="relative isolate min-h-[760px] overflow-hidden bg-[#05060a] pt-28 text-white sm:min-h-screen sm:pt-36">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_69%_42%,rgba(39,73,220,.27),transparent_27%),radial-gradient(circle_at_88%_84%,rgba(113,43,255,.16),transparent_24%)]"/>
      <div className="absolute bottom-0 left-[28%] right-0 top-28 z-0 sm:left-[34%] sm:right-[12%] sm:top-16 lg:left-[20%] lg:right-[17%]"><Image src="/images/alamin-hero-cutout.png" alt="Portrait of Alamin Akon" fill priority sizes="(max-width: 640px) 82vw, (max-width: 1024px) 58vw, 46vw" className="object-contain object-bottom"/></div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,#05060a_0%,rgba(5,6,10,.96)_27%,rgba(5,6,10,.32)_62%,rgba(5,6,10,.1)_100%)]"/>
      <div className="absolute inset-x-0 bottom-0 h-2/5 -z-10 bg-gradient-to-t from-[#05060a] via-[#05060a]/65 to-transparent"/>
      <p aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[46%] -z-10 w-max -translate-x-1/2 -translate-y-1/2 select-none text-[19vw] font-black leading-none tracking-[-.1em] text-white/[.045]">PORTFOLIO</p>

      <Container className="relative flex min-h-[calc(760px-7rem)] flex-col justify-center pb-24 sm:min-h-[calc(100vh-9rem)] sm:pb-28">
        <div className="max-w-xl pt-8 sm:pt-0">
          <p data-hero-eyebrow className="text-xs font-semibold uppercase tracking-[.28em] text-cyan-200/75">Web &amp; Shopify design · Development</p>
          <h1 data-hero-title className="mt-5 text-5xl font-black leading-[.92] tracking-[-.075em] text-white sm:text-7xl lg:text-8xl">Hi, I&apos;m <span className="block bg-gradient-to-r from-[#2f73ff] via-[#5687ff] to-[#8266ff] bg-clip-text text-transparent">Alamin Akon.</span></h1>
          <p data-hero-subtitle className="mt-7 max-w-md text-base leading-7 text-slate-300 sm:text-lg">I create polished, responsive websites and Shopify experiences that turn ambitious ideas into clear digital products.</p>
          <div data-hero-actions className="mt-9 flex flex-wrap gap-3"><Link href="/projects" className="hero-cta"><FolderOpen className="size-4"/><span>View Projects</span></Link><Link href="/contact" className="hero-cta"><span>Let&apos;s Work Together</span><ArrowUpRight className="size-4"/></Link></div>
        </div>
        <div className="absolute bottom-8 right-5 text-right sm:bottom-12 sm:right-8 lg:right-10"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#8a6bff] sm:text-lg">Shopify Specialist</p><p className="mt-1 text-3xl font-black uppercase leading-[.85] tracking-[-.07em] text-white sm:text-5xl">Web<br/>Developer</p></div>
        <Link href="#about" aria-label="Scroll to about section" className="absolute bottom-8 left-1/2 inline-flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-slate-400 transition hover:text-white sm:bottom-10"><span className="grid size-8 place-items-center rounded-full border border-white/25"><ArrowDown className="size-4 animate-bounce"/></span><span className="hidden sm:block">Scroll down</span></Link>
      </Container>
    </section>
  );
}
