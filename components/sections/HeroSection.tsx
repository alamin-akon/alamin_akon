"use client";

import Link from "next/link";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown } from "lucide-react";
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
    <section ref={root} className="relative isolate min-h-[820px] overflow-hidden bg-[#f0f0ee] pt-32 text-[#111] sm:min-h-[900px] sm:pt-40">
      <Image src="/images/editorial-rocks-hero.png" alt="Black rocks rising from calm water" fill priority sizes="100vw" className="-z-20 object-cover object-center"/>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(255,255,255,.14)_0%,rgba(255,255,255,0)_58%,rgba(0,0,0,.12)_100%)]"/>
      <Container className="relative flex min-h-[calc(820px-8rem)] flex-col items-center justify-between pb-10 sm:min-h-[calc(900px-10rem)] sm:pb-14">
        <div className="w-full text-center">
          <p data-hero-eyebrow className="text-[10px] font-bold uppercase tracking-[.38em] text-black/55 sm:text-xs">Digital design &amp; development</p>
          <h1 data-hero-title className="editorial-display mt-8 select-none text-[clamp(4.8rem,13vw,13.5rem)] font-medium leading-[.68] tracking-[-.09em] text-[#080808]" aria-label="Alamin Akon"><span className="block">ALAMIN</span><span className="block">AKON</span></h1>
          <p data-hero-subtitle className="mx-auto mt-10 max-w-md text-xs font-semibold uppercase tracking-[.2em] text-black/65 sm:text-sm">Web designer · Shopify specialist · Front-end developer</p>
        </div>
        <div data-hero-actions className="flex flex-wrap items-center justify-center gap-4"><HeroFlipButton href="/projects" label="VIEW" hoverLabel="WORK" ariaLabel="View my work"/><HeroFlipButton href="/contact" label="LET'S" hoverLabel="TALK!" ariaLabel="Let's work together"/><a href="/resume.pdf" className="hero-arrow-cta"><span>Download Resume</span><svg width="15" height="10" viewBox="0 0 13 10" aria-hidden="true"><path d="M1,5 L11,5"/><polyline points="8 1 12 5 8 9"/></svg></a></div>
        <Link href="#about" aria-label="Scroll to about section" className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 text-black/60 transition hover:text-black lg:block"><ArrowDown className="size-5 animate-bounce" /></Link>
      </Container>
    </section>
  );
}

function HeroFlipButton({ href, label, hoverLabel, ariaLabel }: { href: string; label: string; hoverLabel: string; ariaLabel: string }) {
  return <Link className="hero-flip-button" href={href} aria-label={ariaLabel}>
    {label.split("").map((letter, index) => <span key={`${letter}-${index}`} data-hover={hoverLabel[index] ?? ""} className="hero-flip-button-box">{letter}</span>)}
  </Link>;
}
