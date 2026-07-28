"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useState, type CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const servicePanels = [
  {
    title: "Web Design",
    eyebrow: "Clarity through design",
    description: "Purposeful pages that make your brand feel clear, credible and memorable.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Development",
    eyebrow: "Built to perform",
    description: "Fast, responsive websites built with clean code and thoughtful interaction.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "UI/UX Design",
    eyebrow: "Made for people",
    description: "Intuitive interfaces that guide people naturally from first click to action.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Shopify",
    eyebrow: "Commerce with care",
    description: "Storefront experiences that make discovering and buying products feel easy.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1400&q=85",
  },
] as const;

export function ServicesSection({ limit }: { limit?: number }) {
  const [activePanel, setActivePanel] = useState(0);
  const displayedPanels = servicePanels.slice(0, limit ?? servicePanels.length);

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
          <div className="services-showcase" onMouseLeave={() => setActivePanel(0)}>
            <span className="services-showcase-brand" aria-hidden="true">Alamin Akon</span>
            <p className="services-showcase-note" aria-hidden="true">Designing useful digital experiences</p>
            {displayedPanels.map((panel, index) => {
              const isActive = activePanel === index;
              return (
                <button
                  type="button"
                  key={panel.title}
                  className={`services-showcase-panel ${isActive ? "is-active" : ""}`}
                  style={{ "--service-image": `url(${panel.image})` } as CSSProperties}
                  onMouseEnter={() => setActivePanel(index)}
                  onFocus={() => setActivePanel(index)}
                  onClick={() => setActivePanel(index)}
                  aria-pressed={isActive}
                >
                  <span className="services-showcase-image" aria-hidden="true" />
                  <span className="services-showcase-copy">
                    <span className="services-showcase-eyebrow">{panel.eyebrow}</span>
                    <span className="services-showcase-description">{panel.description}</span>
                    <span className="services-showcase-action">Explore service <ArrowUpRight className="size-4" /></span>
                  </span>
                  <span className="services-showcase-title">{panel.title}</span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
