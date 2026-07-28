"use client";

import { useLayoutEffect, useRef } from "react";
import { Code2, MoveUpRight, Orbit, PanelsTopLeft, UserRound } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
    const section = root.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canUsePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let active = true;
    const cleanups: Array<() => void> = [];

    const context = gsap.context(() => {
      if (reducedMotion) return;

      const timeline = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 80%", once: true, invalidateOnRefresh: true },
      });

      timeline
        .fromTo(section, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 1, ease: "power3.out" })
        .fromTo("[data-about-panel]", { autoAlpha: 0, x: -80, rotateY: -5, scale: .97, transformPerspective: 900 }, { autoAlpha: 1, x: 0, rotateY: 0, scale: 1, duration: 1, ease: "power3.out" }, .08)
        .fromTo("[data-about-top-line], [data-about-bottom-line]", { scaleX: 0 }, { scaleX: 1, duration: .6, stagger: .1, ease: "power2.out" }, .42)
        .fromTo("[data-about-badge]", { autoAlpha: 0, y: 14, scale: .9 }, { autoAlpha: 1, y: 0, scale: 1, duration: .5, ease: "power3.out" }, .58)
        .fromTo("[data-about-heading-line]", { autoAlpha: 0, y: 60 }, { autoAlpha: 1, y: 0, duration: .65, stagger: .15, ease: "power3.out" }, .73)
        .fromTo("[data-about-purpose]", { textShadow: "0 0 0 rgba(12, 226, 255, 0)" }, { textShadow: "0 0 22px rgba(12, 226, 255, .55)", duration: .65, ease: "power2.out" }, 1.35)
        .fromTo("[data-about-dot]", { autoAlpha: 0, scale: .35 }, { autoAlpha: 1, scale: 1, duration: .25, stagger: .1, ease: "back.out(2)" }, 1.08)
        .fromTo("[data-about-intro-line]", { scaleY: 0 }, { scaleY: 1, duration: .5, ease: "power2.out" }, .68)
        .fromTo("[data-about-paragraph]", { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: .6, stagger: .15, ease: "power3.out" }, .85)
        .fromTo("[data-about-card]", { autoAlpha: 0, y: 35, scale: .96 }, { autoAlpha: 1, y: 0, scale: 1, duration: .55, stagger: .12, ease: "power3.out" }, 1.15)
        .fromTo("[data-about-cta]", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: .55, ease: "power3.out" }, 1.62);

      gsap.to("[data-about-badge-dot], [data-about-active-dot]", { boxShadow: "0 0 16px rgba(11, 232, 255, .9)", duration: 1.8, repeat: -1, yoyo: true, ease: "sine.inOut" });

      if (canUsePointer) {
        const panel = section.querySelector<HTMLElement>("[data-about-panel]");
        if (panel) {
          const panelX = gsap.quickTo(panel, "--panel-x", { duration: .45, ease: "power3.out" });
          const panelY = gsap.quickTo(panel, "--panel-y", { duration: .45, ease: "power3.out" });
          const handlePanelMove = (event: PointerEvent) => {
            const bounds = panel.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - .5;
            const y = (event.clientY - bounds.top) / bounds.height - .5;
            panelX(`${x * 12}px`);
            panelY(`${y * 9}px`);
            gsap.to(panel, { rotateY: x * 2, rotateX: y * -1.5, duration: .45, ease: "power3.out", overwrite: true });
          };
          const resetPanel = () => {
            panelX("0px");
            panelY("0px");
            gsap.to(panel, { rotateY: 0, rotateX: 0, duration: .6, ease: "power3.out", overwrite: true });
          };
          panel.addEventListener("pointermove", handlePanelMove);
          panel.addEventListener("pointerleave", resetPanel);
          cleanups.push(() => { panel.removeEventListener("pointermove", handlePanelMove); panel.removeEventListener("pointerleave", resetPanel); });
        }

        section.querySelectorAll<HTMLElement>("[data-about-card]").forEach((card) => {
          const glowX = gsap.quickTo(card, "--mouse-x", { duration: .22, ease: "power3.out" });
          const glowY = gsap.quickTo(card, "--mouse-y", { duration: .22, ease: "power3.out" });
          const handleCardMove = (event: PointerEvent) => {
            const bounds = card.getBoundingClientRect();
            glowX(`${event.clientX - bounds.left}px`);
            glowY(`${event.clientY - bounds.top}px`);
          };
          card.addEventListener("pointermove", handleCardMove);
          cleanups.push(() => card.removeEventListener("pointermove", handleCardMove));
        });
      }
    }, section);

    const fonts = document.fonts;
    if (fonts) void fonts.ready.then(() => { if (active) ScrollTrigger.refresh(); });

    return () => {
      active = false;
      cleanups.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, []);

  return <section ref={root} id="about" className="about-section section-space overflow-hidden"><Container><div className="grid items-center gap-10 xl:grid-cols-[.92fr_1.08fr] xl:gap-16"><div data-about-panel className="about-visual"><span data-about-top-line className="about-visual-top-line" aria-hidden="true"/><div className="about-visual-rail" aria-hidden="true"><span data-about-dot/><span data-about-dot data-about-active-dot/><span data-about-dot/><span data-about-dot/></div><div className="about-visual-content"><p data-about-badge className="about-kicker"><span data-about-badge-dot/>About me</p><h2><span className="about-heading-mask"><span data-about-heading-line>Designing Digital</span></span><span className="about-heading-mask"><span data-about-heading-line>Experiences</span></span><span className="about-heading-mask"><span data-about-heading-line>With <em data-about-purpose>Purpose</em></span></span></h2><span data-about-bottom-line className="about-visual-line" aria-hidden="true"/><span className="about-visual-arrow" aria-hidden="true"><MoveUpRight className="size-7"/></span></div></div><div className="relative" data-about-copy><div className="about-intro-wrap"><span data-about-intro-line aria-hidden="true"/><p data-about-paragraph className="about-intro">As a Web Designer and Developer, I work at the intersection of design, technology and user experience. My approach starts with understanding the purpose of a website and the needs of its users.</p></div><p data-about-paragraph className="mt-7 max-w-3xl text-base leading-7 text-text-secondary sm:text-lg">From there, I create a clear visual structure, intuitive navigation, responsive layouts and a consistent design system. I enjoy transforming ideas into modern websites and e-commerce experiences that are visually professional, user-friendly and aligned with business goals.</p><div className="mt-9 grid gap-5 sm:grid-cols-2">{points.map(([Icon, point]) => <article data-about-card key={point} className="about-feature-card"><span className="about-feature-icon"><Icon className="size-6"/></span><div><h3>{point}</h3><span className="about-feature-line"/></div></article>)}</div><div className="mt-9" data-about-cta><Button href="/about" className="about-cta">More About Me <MoveUpRight className="size-5"/></Button></div></div></div></Container></section>;
}
