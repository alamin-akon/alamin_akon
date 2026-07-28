"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { ServicePanelData } from "./types";
import { ServicesPanel } from "./ServicesPanel";
import styles from "./ServicesNavigationGrid.module.css";

interface ServicesNavigationGridProps {
  panels: ServicePanelData[];
}

export function ServicesNavigationGrid({ panels: servicePanels }: ServicesNavigationGridProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState<number | null>(null);

  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const panelElements = gsap.utils.toArray<HTMLElement>("[data-service-panel]");
    if (!panelElements.length || reducedMotion) return;

    gsap.timeline({ scrollTrigger: { trigger: root, start: "top 80%", once: true, invalidateOnRefresh: true } })
      .fromTo(root, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: .75, ease: "power3.out" })
      .fromTo(panelElements, { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: .65, stagger: .1, ease: "power3.out" }, .08);

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
  }, { scope: rootRef });

  useGSAP(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(min-width: 701px)").matches) return;

    const panelElements = gsap.utils.toArray<HTMLElement>("[data-service-panel]");
    const details = gsap.utils.toArray<HTMLElement>("[data-service-detail]");
    const images = gsap.utils.toArray<HTMLElement>("[data-service-image]");
    if (activePanel === null) {
      gsap.to(panelElements, { flexGrow: 1, duration: .7, ease: "power3.inOut", overwrite: true });
      gsap.to(images, { scale: 1.05, duration: .55, ease: "power2.out", overwrite: true });
      gsap.to(details, { autoAlpha: 0, y: 14, duration: .25, ease: "power2.out", overwrite: true });
      return;
    }

    gsap.to(panelElements, { flexGrow: .62, duration: .7, ease: "power3.inOut", overwrite: true });
    gsap.to(panelElements[activePanel], { flexGrow: 3.15, duration: .7, ease: "power3.inOut", overwrite: true });
    gsap.to(images, { scale: 1.05, duration: .55, ease: "power2.out", overwrite: true });
    gsap.to(images[activePanel], { scale: 1, duration: .7, ease: "power3.out", overwrite: true });
    gsap.to(details, { autoAlpha: 0, y: 14, duration: .2, ease: "power2.out", overwrite: true });
    gsap.to(details[activePanel], { autoAlpha: 1, y: 0, duration: .45, delay: .18, ease: "power3.out", overwrite: true });
  }, { scope: rootRef, dependencies: [activePanel] });

  return (
    <div ref={rootRef} className={styles.frame}>
      <span className={styles.brand}>Alamin Akon</span>
      <span className={styles.note}>Digital design and development</span>
      <span data-service-cursor className={styles.cursor} aria-hidden="true">✱</span>
      <div className={styles.grid}>
        {servicePanels.map((panel, index) => <ServicesPanel key={panel.title} panel={panel} isActive={activePanel === index} onToggle={() => setActivePanel((current) => current === index ? null : index)} />)}
      </div>
    </div>
  );
}
