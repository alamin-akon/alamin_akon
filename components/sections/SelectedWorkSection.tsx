"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { selectedWorkProjects } from "@/data/selectedWork";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/sections/selected-work/SectionHeading";
import { ProjectNavigation } from "@/components/sections/selected-work/ProjectNavigation";
import { ProjectShowcase } from "@/components/sections/selected-work/ProjectShowcase";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const finePointerQuery = "(hover: hover) and (pointer: fine)";
const rotationDelay = 6000;
const maxTilt = 2;

const headingLines = ["Thoughtful experiences", <>for ambitious <em>brands.</em></>];
const headingDescription = "A selection of website, Shopify and interface work focused on clarity, responsiveness and a polished customer journey.";

export function SelectedWorkSection() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);
  const swap = useRef<HTMLDivElement>(null);
  const panels = useRef<HTMLDivElement>(null);
  const details = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const didMount = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = selectedWorkProjects[activeIndex];

  const selectProject = useCallback((index: number) => {
    setActiveIndex((current) => (current === index ? current : index));
  }, []);

  /* Section entrance — runs once when the section scrolls into view. */
  useGSAP(() => {
    const section = root.current;
    if (!section || window.matchMedia(reducedMotionQuery).matches) return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.timeline({ scrollTrigger: { trigger: section, start: "top 76%", once: true, invalidateOnRefresh: true } })
      .fromTo("[data-work-eyebrow]", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: .45, ease: "power3.out" })
      .fromTo("[data-work-heading-line]", { autoAlpha: 0, yPercent: 110 }, { autoAlpha: 1, yPercent: 0, duration: .74, stagger: .12, ease: "power3.out" }, .08)
      .fromTo("[data-work-description]", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: .55, ease: "power3.out" }, .42)
      .fromTo("[data-work-cta]", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: .5, ease: "power3.out" }, .55)
      .fromTo("[data-work-row]", { autoAlpha: 0, x: -24 }, { autoAlpha: 1, x: 0, duration: .5, stagger: .1, ease: "power3.out" }, .55)
      .fromTo("[data-work-mockup]", { autoAlpha: 0, x: 56, rotateY: 4, scale: .97 }, { autoAlpha: 1, x: 0, rotateY: 0, scale: 1, duration: .85, ease: "power3.out" }, .4)
      .fromTo("[data-work-details]", { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: .55, ease: "power3.out" }, .78)
      .fromTo("[data-work-dots]", { autoAlpha: 0, scale: .7 }, { autoAlpha: .85, scale: 1, duration: .6, ease: "power2.out" }, .8);
  }, { scope: root });

  /* Mockup + detail transition whenever the active project changes. */
  useGSAP(() => {
    const mockup = swap.current;
    const detailBlock = details.current;
    if (!mockup || !detailBlock) return;

    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    if (window.matchMedia(reducedMotionQuery).matches) {
      gsap.set([mockup, detailBlock], { clearProps: "transform,opacity" });
      return;
    }

    gsap.fromTo(mockup, { autoAlpha: 0, x: 40, scale: .96, rotateY: 3 }, { autoAlpha: 1, x: 0, scale: 1, rotateY: 0, duration: .65, ease: "power3.out", overwrite: "auto" });
    gsap.fromTo(detailBlock, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: .5, ease: "power3.out", overwrite: "auto" });
  }, { dependencies: [activeIndex], scope: root });

  /* Pointer-driven tilt and cursor glow — fine pointers only. */
  useGSAP(() => {
    const area = stage.current;
    const card = tilt.current;
    const stack = panels.current;
    if (!area || !card || !stack) return;
    if (!window.matchMedia(finePointerQuery).matches || window.matchMedia(reducedMotionQuery).matches) return;

    const settings = { duration: .4, ease: "power3.out" };
    const rotateX = gsap.quickTo(card, "rotateX", settings);
    const rotateY = gsap.quickTo(card, "rotateY", settings);
    const panelX = gsap.quickTo(stack, "x", settings);
    const panelY = gsap.quickTo(stack, "y", settings);
    const glowX = gsap.quickTo(card, "--selected-work-glow-x", { duration: .3, ease: "power3.out", unit: "px" });
    const glowY = gsap.quickTo(card, "--selected-work-glow-y", { duration: .3, ease: "power3.out", unit: "px" });

    const handleMove = (event: PointerEvent) => {
      const bounds = area.getBoundingClientRect();
      const offsetX = (event.clientX - bounds.left) / bounds.width - .5;
      const offsetY = (event.clientY - bounds.top) / bounds.height - .5;
      rotateX(offsetY * -maxTilt);
      rotateY(offsetX * maxTilt);
      panelX(offsetX * -14);
      panelY(offsetY * -10);
      glowX(event.clientX - bounds.left);
      glowY(event.clientY - bounds.top);
    };

    const handleLeave = () => {
      rotateX(0);
      rotateY(0);
      panelX(0);
      panelY(0);
    };

    area.addEventListener("pointermove", handleMove);
    area.addEventListener("pointerleave", handleLeave);
    return () => {
      area.removeEventListener("pointermove", handleMove);
      area.removeEventListener("pointerleave", handleLeave);
    };
  }, { scope: root });

  /* Auto-rotation: desktop only, paused on hover, focus and hidden tabs. */
  useEffect(() => {
    if (window.matchMedia(reducedMotionQuery).matches || !window.matchMedia(finePointerQuery).matches) return;

    let timer = 0;
    const advance = () => {
      if (isPaused.current || document.hidden) {
        schedule();
        return;
      }
      setActiveIndex((current) => (current + 1) % selectedWorkProjects.length);
    };
    function schedule() {
      timer = window.setTimeout(advance, rotationDelay);
    }

    schedule();
    return () => window.clearTimeout(timer);
  }, [activeIndex]);

  const pause = () => { isPaused.current = true; };
  const resume = () => { isPaused.current = false; };

  return <section
    ref={root}
    className="selected-work-section section-space overflow-hidden"
    aria-labelledby="selected-work-title"
    onMouseEnter={pause}
    onMouseLeave={resume}
    onFocusCapture={pause}
    onBlurCapture={resume}
  >
    <Container>
      <div className="selected-work-shell">
        <div className="selected-work-copy">
          <SectionHeading id="selected-work-title" eyebrow="Selected work" lines={headingLines} description={headingDescription} />
          <ProjectNavigation projects={selectedWorkProjects} activeIndex={activeIndex} onSelect={selectProject} />
        </div>

        <ProjectShowcase
          project={activeProject}
          stageRef={stage}
          tiltRef={tilt}
          swapRef={swap}
          panelsRef={panels}
          detailsRef={details}
        />

        <Link data-work-cta href="/projects" className="selected-work-cta">
          View all projects
          <ArrowUpRight className="size-5" aria-hidden="true" />
        </Link>
      </div>
    </Container>
  </section>;
}
