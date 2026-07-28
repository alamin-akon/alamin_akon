"use client";

import { useLayoutEffect, useRef } from "react";
import { Code2, MoveUpRight, Orbit, PanelsTopLeft, UserRound } from "lucide-react";
import gsap from "gsap";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const points = [
  [Orbit, "Clean Design"],
  [PanelsTopLeft, "Responsive Layouts"],
  [UserRound, "User-Focused Experience"],
  [Code2, "Practical Development"],
] as const;

export function AboutSection() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo("[data-about-panel]", { autoAlpha: 0, x: -42, y: 20 }, { autoAlpha: 1, x: 0, y: 0, duration: .9, ease: "power3.out" });
      gsap.fromTo("[data-about-copy]", { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: .7, ease: "power3.out", delay: .16 });
      gsap.fromTo("[data-about-card]", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: .55, stagger: .1, ease: "power3.out", delay: .32 });
      gsap.fromTo("[data-about-cta]", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: .55, ease: "power3.out", delay: .7 });
    }, root);
    return () => context.revert();
  }, []);

  return <section ref={root} id="about" className="about-section section-space overflow-hidden"><Container><div className="grid items-center gap-10 xl:grid-cols-[.92fr_1.08fr] xl:gap-16"><div data-about-panel className="about-visual"><div className="about-visual-rail" aria-hidden="true"><span/><span/><span/><span/></div><div className="about-visual-content"><p className="about-kicker"><span/>About me</p><h2>Designing Digital<br/>Experiences<br/>With <em>Purpose</em></h2><span className="about-visual-line" aria-hidden="true"/><span className="about-visual-arrow" aria-hidden="true"><MoveUpRight className="size-7"/></span></div></div><div className="relative" data-about-copy><p className="about-intro">As a Web Designer and Developer, I work at the intersection of design, technology and user experience. My approach starts with understanding the purpose of a website and the needs of its users.</p><p className="mt-7 max-w-3xl text-base leading-7 text-text-secondary sm:text-lg">From there, I create a clear visual structure, intuitive navigation, responsive layouts and a consistent design system. I enjoy transforming ideas into modern websites and e-commerce experiences that are visually professional, user-friendly and aligned with business goals.</p><div className="mt-9 grid gap-5 sm:grid-cols-2">{points.map(([Icon, point]) => <article data-about-card key={point} className="about-feature-card"><span className="about-feature-icon"><Icon className="size-6"/></span><div><h3>{point}</h3><span className="about-feature-line"/></div></article>)}</div><div className="mt-9" data-about-cta><Button href="/about" className="about-cta">More About Me <MoveUpRight className="size-5"/></Button></div></div></div></Container></section>;
}
