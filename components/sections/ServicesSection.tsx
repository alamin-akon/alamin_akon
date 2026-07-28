"use client";

import type { CSSProperties } from "react";
import { useLayoutEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const servicePanels = [
  { title: "Web Design", eyebrow: "Clear visual direction", description: "Websites that feel distinctive, clear and built around your brand.", image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1400&q=85" },
  { title: "Development", eyebrow: "Built to perform", description: "Fast, responsive websites with clean front-end development.", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85" },
  { title: "UI/UX Design", eyebrow: "Made for people", description: "Intuitive interfaces that guide visitors naturally to action.", image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1400&q=85" },
  { title: "Shopify", eyebrow: "Commerce with care", description: "Thoughtful storefronts designed for easier product discovery and sales.", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=85" },
] as const;

export function ServicesSection({ limit }: { limit?: number }) {
  const animationRoot = useRef<HTMLDivElement>(null);
  const displayedPanels = servicePanels.slice(0, limit ?? servicePanels.length);

  useLayoutEffect(() => {
    const root = animationRoot.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 701px)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: Array<() => void> = [];

    const context = gsap.context(() => {
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

      gsap.set(images, { autoAlpha: .18, scale: 1.08 });
      gsap.set(details, { autoAlpha: 0, y: 14 });

      const cycle = gsap.timeline({ paused: true, repeat: -1, repeatDelay: .45 });
      panels.forEach((panel, index) => {
        cycle
          .to(panels, { flexGrow: 1, duration: .7, ease: "power3.inOut" })
          .to(panel, { flexGrow: 2.45, duration: .7, ease: "power3.inOut" }, "<")
          .to(images, { autoAlpha: .14, scale: 1.08, duration: .55, ease: "power2.out" }, "<")
          .to(images[index], { autoAlpha: .72, scale: 1, duration: .7, ease: "power3.out" }, "<")
          .to(details, { autoAlpha: 0, y: 14, duration: .2, overwrite: true }, "<")
          .to(details[index], { autoAlpha: 1, y: 0, duration: .45, ease: "power3.out" }, "<.22")
          .to(panel, { duration: 2.1 });
      });

      enter.call(() => cycle.play(), [], ">-.1");
    }, root);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, []);

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
                  style={{ "--service-image": `url(${panel.image})` } as CSSProperties}
                >
                  <span data-service-image className="services-reference-image" aria-hidden="true" />
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
