"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type MutableRefObject, type RefObject } from "react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { selectedWorkProjects, type SelectedWorkProject } from "@/data/selectedWork";
import { Container } from "@/components/ui/Container";

const motionQuery = "(prefers-reduced-motion: reduce)";
const desktopPointerQuery = "(hover: hover) and (pointer: fine)";

export function SelectedWorkSection() {
  const root = useRef<HTMLElement>(null);
  const mockup = useRef<HTMLDivElement>(null);
  const navigationButtons = useRef<Array<HTMLButtonElement | null>>([]);
  const pauseRotation = useRef(false);
  const didMount = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProject = selectedWorkProjects[activeIndex];

  const selectProject = (index: number) => setActiveIndex((current) => current === index ? current : index);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia(motionQuery).matches;
    const context = gsap.context(() => {
      if (reducedMotion) return;

      const timeline = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top 76%", once: true },
      });

      timeline
        .fromTo("[data-work-eyebrow]", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: .45, ease: "power3.out" })
        .fromTo("[data-work-heading-line]", { autoAlpha: 0, yPercent: 110 }, { autoAlpha: 1, yPercent: 0, duration: .74, stagger: .12, ease: "power3.out" }, .08)
        .fromTo("[data-work-description]", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: .55, ease: "power3.out" }, .42)
        .fromTo("[data-work-cta]", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: .5, ease: "power3.out" }, .55)
        .fromTo("[data-work-row]", { autoAlpha: 0, x: -24 }, { autoAlpha: 1, x: 0, duration: .5, stagger: .1, ease: "power3.out" }, .55)
        .fromTo("[data-work-mockup]", { autoAlpha: 0, x: 56, rotateY: 4, scale: .97 }, { autoAlpha: 1, x: 0, rotateY: 0, scale: 1, duration: .85, ease: "power3.out" }, .4)
        .fromTo("[data-work-dots]", { autoAlpha: 0, scale: .7 }, { autoAlpha: .85, scale: 1, duration: .6, ease: "power2.out" }, .8);
    }, section);

    return () => context.revert();
  }, []);

  useLayoutEffect(() => {
    const element = mockup.current;
    if (!element) return;
    const reducedMotion = window.matchMedia(motionQuery).matches;

    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    gsap.killTweensOf(element);
    if (reducedMotion) {
      gsap.set(element, { clearProps: "transform,opacity" });
      return;
    }

    gsap.fromTo(element, { autoAlpha: 0, x: 40, scale: .96, rotateY: 3 }, { autoAlpha: 1, x: 0, scale: 1, rotateY: 0, duration: .65, ease: "power3.out" });
  }, [activeIndex]);

  useEffect(() => {
    const section = root.current;
    if (!section || window.matchMedia(motionQuery).matches || !window.matchMedia(desktopPointerQuery).matches) return;

    const onVisibilityChange = () => { pauseRotation.current = document.hidden; };
    document.addEventListener("visibilitychange", onVisibilityChange);
    const rotation = window.setInterval(() => {
      if (!pauseRotation.current && !document.hidden) setActiveIndex((current) => (current + 1) % selectedWorkProjects.length);
    }, 6000);

    return () => {
      window.clearInterval(rotation);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const element = mockup.current;
    if (!element || !window.matchMedia(desktopPointerQuery).matches || window.matchMedia(motionQuery).matches) return;

    const rotateX = gsap.quickTo(element, "rotateX", { duration: .4, ease: "power3.out" });
    const rotateY = gsap.quickTo(element, "rotateY", { duration: .4, ease: "power3.out" });
    const glowX = gsap.quickTo(element, "--selected-work-glow-x", { duration: .3, ease: "power3.out", unit: "px" });
    const glowY = gsap.quickTo(element, "--selected-work-glow-y", { duration: .3, ease: "power3.out", unit: "px" });
    const onMove = (event: PointerEvent) => {
      const bounds = element.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      rotateX(y * -2);
      rotateY(x * 2);
      glowX(event.clientX - bounds.left);
      glowY(event.clientY - bounds.top);
    };
    const onLeave = () => {
      rotateX(0);
      rotateY(0);
      glowX(50);
      glowY(50);
    };

    element.addEventListener("pointermove", onMove);
    element.addEventListener("pointerleave", onLeave);
    return () => {
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const last = selectedWorkProjects.length - 1;
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? last : event.key === 'ArrowDown' || event.key === 'ArrowRight' ? (index + 1) % selectedWorkProjects.length : (index - 1 + selectedWorkProjects.length) % selectedWorkProjects.length;
    selectProject(next);
    navigationButtons.current[next]?.focus();
  };

  return <section ref={root} className="selected-work-section section-space overflow-hidden" aria-labelledby="selected-work-title" onMouseEnter={() => { pauseRotation.current = true; }} onMouseLeave={() => { pauseRotation.current = false; }} onFocusCapture={() => { pauseRotation.current = true; }} onBlurCapture={() => { pauseRotation.current = false; }}>
    <Container>
      <div className="selected-work-shell">
        <div className="selected-work-copy">
          <p data-work-eyebrow className="selected-work-eyebrow">Selected work</p>
          <h2 id="selected-work-title" className="selected-work-title">
            <span className="selected-work-title-mask"><span data-work-heading-line>Thoughtful experiences</span></span>
            <span className="selected-work-title-mask"><span data-work-heading-line>for ambitious <em>brands.</em></span></span>
          </h2>
          <p data-work-description className="selected-work-description">A selection of website, Shopify and interface work focused on clarity, responsiveness and a polished customer journey.</p>
          <ProjectNavigation activeIndex={activeIndex} buttons={navigationButtons} onKeyDown={handleKeyDown} onSelect={selectProject} />
        </div>
        <ProjectShowcase project={activeProject} mockup={mockup} />
        <Link data-work-cta href="/projects" className="selected-work-cta">View all projects <ArrowUpRight className="size-5" aria-hidden="true" /></Link>
      </div>
    </Container>
  </section>;
}

function ProjectNavigation({ activeIndex, buttons, onKeyDown, onSelect }: { activeIndex: number; buttons: MutableRefObject<Array<HTMLButtonElement | null>>; onKeyDown: (event: KeyboardEvent<HTMLButtonElement>, index: number) => void; onSelect: (index: number) => void }) {
  return <div className="selected-work-list" aria-label="Selected projects">
    {selectedWorkProjects.map((project, index) => <button key={project.slug} ref={(element) => { buttons.current[index] = element; }} data-work-row type="button" aria-pressed={activeIndex === index} className={`selected-work-row ${activeIndex === index ? "selected-work-row-active" : ""}`} onClick={() => onSelect(index)} onFocus={() => onSelect(index)} onKeyDown={(event) => onKeyDown(event, index)}>
      <span className="selected-work-indicator" aria-hidden="true"><span /></span>
      <span className="selected-work-number">{String(project.id).padStart(2, "0")}</span>
      <span className="selected-work-row-copy"><strong>{project.name}</strong><small>{project.category}</small></span>
      <ArrowUpRight className="selected-work-row-arrow size-6" aria-hidden="true" />
    </button>)}
  </div>;
}

function ProjectShowcase({ project, mockup }: { project: SelectedWorkProject; mockup: RefObject<HTMLDivElement | null> }) {
  return <div className="selected-work-stage" data-work-mockup>
    <div data-work-dots className="selected-work-dots" aria-hidden="true" />
    <div className="selected-work-panel selected-work-panel-back" aria-hidden="true" />
    <div className="selected-work-panel selected-work-panel-middle" aria-hidden="true" />
    <div ref={mockup} className="selected-work-mockup" style={{ "--selected-work-accent": project.accent } as CSSProperties}>
      <BrowserMockup key={project.slug} project={project} />
    </div>
    <div className="selected-work-details" aria-live="polite">
      <div><p>{project.platform}</p><h3>{project.name}</h3></div>
      <ProjectTags tags={project.tags} />
    </div>
  </div>;
}

function BrowserMockup({ project }: { project: SelectedWorkProject }) {
  const [imageFailed, setImageFailed] = useState(false);

  return <div className="selected-work-browser">
    <div className="selected-work-browser-top"><span className="selected-work-browser-dots" aria-hidden="true"><i /><i /><i /></span><span className="selected-work-browser-url">{project.platform}</span><a href={project.url} target="_blank" rel="noreferrer" aria-label={`Visit ${project.name} website`}><ExternalLink className="size-4" /></a></div>
    <div className="selected-work-image-area">{imageFailed ? <FallbackPreview project={project} /> : <Image src={project.image} alt={`${project.name} website design preview`} fill sizes="(max-width: 767px) 92vw, (max-width: 1200px) 54vw, 47vw" className="object-cover" onError={() => setImageFailed(true)} priority={project.id === 1} />}</div>
    <div className="selected-work-overlay"><span>{project.category}</span><p>{project.description}</p></div>
  </div>;
}

function FallbackPreview({ project }: { project: SelectedWorkProject }) {
  return <div className="selected-work-fallback" style={{ "--fallback-accent": project.accent } as CSSProperties}><div className="selected-work-fallback-orb" /><div className="selected-work-fallback-copy"><p>{project.platform}</p><h4>{project.name}</h4><span /></div><div className="selected-work-fallback-layout"><i /><i /><i /><i /></div></div>;
}

function ProjectTags({ tags }: { tags: string[] }) { return <div className="selected-work-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>; }
