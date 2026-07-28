"use client";

import { useRef, useState } from "react";
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
  const [activePanel, setActivePanel] = useState<number | null>(null);
  const displayedPanels = servicePanels.slice(0, limit ?? servicePanels.length);

  useGSAP(() => {
    const root = animationRoot.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const panels = gsap.utils.toArray<HTMLElement>("[data-service-panel]");
    if (!panels.length || reducedMotion) return;

    const enter = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top 80%", once: true, invalidateOnRefresh: true },
    });
    enter
      .fromTo(root, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: .75, ease: "power3.out" })
      .fromTo(panels, { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: .65, stagger: .1, ease: "power3.out" }, .08);

    const cursor = root.querySelector<HTMLElement>("[data-service-cursor]");
    if (!cursor || !finePointer) return;

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
    return () => {
      root.removeEventListener("pointermove", moveCursor);
      root.removeEventListener("pointerenter", showCursor);
      root.removeEventListener("pointerleave", hideCursor);
    };
  }, { scope: animationRoot });

  useGSAP(() => {
    const root = animationRoot.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(min-width: 701px)").matches) return;

    const panels = gsap.utils.toArray<HTMLElement>("[data-service-panel]");
    const details = gsap.utils.toArray<HTMLElement>("[data-service-detail]");
    const images = gsap.utils.toArray<HTMLElement>("[data-service-image]");
    if (activePanel === null) {
      gsap.to(panels, { flexGrow: 1, duration: .7, ease: "power3.inOut", overwrite: true });
      gsap.to(images, { scale: 1.05, duration: .55, ease: "power2.out", overwrite: true });
      gsap.to(details, { autoAlpha: 0, y: 14, duration: .25, ease: "power2.out", overwrite: true });
      return;
    }

    gsap.to(panels, { flexGrow: .62, duration: .7, ease: "power3.inOut", overwrite: true });
    gsap.to(panels[activePanel], { flexGrow: 3.15, duration: .7, ease: "power3.inOut", overwrite: true });
    gsap.to(images, { scale: 1.05, duration: .55, ease: "power2.out", overwrite: true });
    gsap.to(images[activePanel], { scale: 1, duration: .7, ease: "power3.out", overwrite: true });
    gsap.to(details, { autoAlpha: 0, y: 14, duration: .2, ease: "power2.out", overwrite: true });
    gsap.to(details[activePanel], { autoAlpha: 1, y: 0, duration: .45, delay: .18, ease: "power3.out", overwrite: true });
  }, { scope: animationRoot, dependencies: [activePanel] });

  const togglePanel = (index: number) => setActivePanel((current) => current === index ? null : index);

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
              {displayedPanels.map((panel, index) => {
                const isActive = activePanel === index;
                return (
                  <article
                    data-service-panel
                    className={`services-reference-panel ${isActive ? "is-active" : ""}`}
                    key={panel.title}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isActive}
                    onClick={() => togglePanel(index)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        togglePanel(index);
                      }
                    }}
                  >
                    <span data-service-image className="services-reference-image" aria-hidden="true">
                      <Image src={panel.image} alt="" fill sizes="(max-width: 700px) 100vw, 25vw" style={{ objectFit: "cover", objectPosition: panel.position }} />
                    </span>
                    <span className="services-reference-shutter" aria-hidden="true" />
                    <span data-service-detail className="services-reference-detail">
                      <span>{panel.eyebrow}</span>
                      <span>{panel.description}</span>
                      <span>Explore service <ArrowUpRight className="size-4" /></span>
                    </span>
                    <h3>{panel.title}</h3>
                  </article>
                );
              })}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
