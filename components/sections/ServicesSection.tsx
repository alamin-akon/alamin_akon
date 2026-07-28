"use client";

import { useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const servicePanels = [
  { title: "Web Design", eyebrow: "Clear visual direction", description: "Websites that feel distinctive, clear and built around your brand.", image: "/images/hero-workspace.png", position: "center" },
  { title: "Development", eyebrow: "Built to perform", description: "Fast, responsive websites with clean front-end development.", image: "/images/editorial-rocks-hero.png", position: "58% center" },
  { title: "UI/UX Design", eyebrow: "Made for people", description: "Intuitive interfaces that guide visitors naturally to action.", image: "/images/editorial-rocks-hero-v2.png", position: "50% center" },
  { title: "Shopify", eyebrow: "Commerce with care", description: "Thoughtful storefronts designed for easier product discovery and sales.", image: "/images/alamin-hero-cutout.png", position: "58% top" },
] as const;

export function ServicesSection({ limit }: { limit?: number }) {
  const animationRoot = useRef<HTMLDivElement>(null);
  const displayedPanels = servicePanels.slice(0, limit ?? servicePanels.length);

  useGSAP(() => {
    const root = animationRoot.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 701px)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: Array<() => void> = [];

    const panels = gsap.utils.toArray<HTMLElement>("[data-service-panel]");
    const images = gsap.utils.toArray<HTMLElement>("[data-service-image]");
    const details = gsap.utils.toArray<HTMLElement>("[data-service-detail]");
    if (!panels.length || reducedMotion) return;

    const cursor = root.querySelector<HTMLElement>("[data-service-cursor]");
    if (cursor && finePointer) {
        const cursorX = gsap.quickTo(cursor, "x", { duration: .28, ease: "power3.out" });
        const cursorY = gsap.quickTo(cursor, "y", { duration: .28, ease: "power3.out" });
        const moveCursor = (event: PointerEvent) => {
          const bounds = root.getBoundingClientRect();
          cursorX(event.clientX - bounds.left);
          cursorY(event.clientY - bounds.top);
        };
        const showCursor = (event: PointerEvent) => {
          moveCursor(event);
          gsap.to(cursor, { autoAlpha: 1, scale: 1, duration: .2, ease: "power2.out" });
        };
        const hideCursor = () => gsap.to(cursor, { autoAlpha: 0, scale: .6, duration: .2, ease: "power2.out" });
        gsap.set(cursor, { autoAlpha: 0, scale: .6 });
        root.addEventListener("pointermove", moveCursor);
        root.addEventListener("pointerenter", showCursor);
        root.addEventListener("pointerleave", hideCursor);
      cleanups.push(() => {
        root.removeEventListener("pointermove", moveCursor);
        root.removeEventListener("pointerenter", showCursor);
        root.removeEventListener("pointerleave", hideCursor);
      });
    }

    const enter = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top 80%", once: true, invalidateOnRefresh: true },
    });

    enter
      .fromTo(root, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: .75, ease: "power3.out" })
      .fromTo(panels, { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: .65, stagger: .1, ease: "power3.out" }, .08);

    if (!desktop) return;

    gsap.set(images, { autoAlpha: .16, scale: 1.1, clipPath: "inset(35% 0 35% 0)" });
    gsap.set(details, { autoAlpha: 0, y: 14 });

    const revealPanel = (index: number, duration = .7) => gsap.timeline()
      .to(panels, { flexGrow: 1, duration, ease: "power3.inOut" })
      .to(panels[index], { flexGrow: 2.45, duration, ease: "power3.inOut" }, "<")
      .to(images, { autoAlpha: .12, scale: 1.1, clipPath: "inset(35% 0 35% 0)", duration: duration * .8, ease: "power2.out" }, "<")
      .to(images[index], { autoAlpha: .76, scale: 1.02, clipPath: "inset(0% 0 0% 0)", duration, ease: "power3.out" }, "<")
      .to(details, { autoAlpha: 0, y: 14, duration: .2, overwrite: true }, "<")
      .to(details[index], { autoAlpha: 1, y: 0, duration: .45, ease: "power3.out" }, "<.2");

    const cycle = gsap.timeline({ paused: true, repeat: -1, repeatDelay: .45 });
    panels.forEach((_, index) => {
      cycle.add(revealPanel(index)).to({}, { duration: 2.1 });
    });

    if (finePointer) {
      panels.forEach((panel, index) => {
        const previewPanel = () => {
          cycle.pause();
          if (cursor) gsap.to(cursor, { rotate: index % 2 ? 45 : -25, scale: 1.22, duration: .3, ease: "power3.out" });
          revealPanel(index, .5);
        };
        const resumeCycle = () => {
          if (cursor) gsap.to(cursor, { rotate: 0, scale: 1, duration: .35, ease: "power3.out" });
          cycle.play();
        };
        panel.addEventListener("pointerenter", previewPanel);
        panel.addEventListener("pointerleave", resumeCycle);
        cleanups.push(() => {
          panel.removeEventListener("pointerenter", previewPanel);
          panel.removeEventListener("pointerleave", resumeCycle);
        });
      });
    }

    enter.call(() => cycle.play(), [], ">-.1");

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, { scope: animationRoot, dependencies: [displayedPanels.length] });

  return (
    <section className="section-space">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Services"
              title="Design, develop and improve your digital presence."
              description="Flexible design and development support, tailored to what your website or store needs."
            />
          </Reveal>
          {limit && <Button href="/services" variant="ghost">All services <ArrowRight className="size-4" /></Button>}
        </div>

        <Reveal className="mt-12">
          <div ref={animationRoot} className="services-reference-frame">
            <span className="services-reference-brand">Alamin Akon</span>
            <span className="services-reference-note">Digital design and development</span>
            <span data-service-cursor className="services-reference-cursor" aria-hidden="true">✱</span>
            <div className="services-reference-grid">
              {displayedPanels.map((panel, index) => (
                <article
                  data-service-panel
                  className={`services-reference-panel services-reference-panel--${index + 1}`}
                  key={panel.title}
                >
                  <span data-service-image className="services-reference-image" aria-hidden="true">
                    <Image src={panel.image} alt="" fill sizes="(max-width: 700px) 100vw, 25vw" style={{ objectFit: "cover", objectPosition: panel.position }} />
                  </span>
                  <span data-service-detail className="services-reference-detail">
                    <span>{panel.eyebrow}</span>
                    <span>{panel.description}</span>
                    <span>Explore service <ArrowUpRight className="size-4" /></span>
                  </span>
                  <h3>{panel.title}</h3>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
