import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { KeyboardEvent } from "react";
import type { ServicePanelData } from "./types";
import styles from "./ServicesNavigationGrid.module.css";

interface ServicesPanelProps {
  panel: ServicePanelData;
  isActive: boolean;
  onToggle: () => void;
}

export function ServicesPanel({ panel, isActive, onToggle }: ServicesPanelProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle();
    }
  };

  return (
    <article
      data-service-panel
      className={`${styles.panel} ${isActive ? styles.active : ""}`}
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
    >
      <span data-service-image className={styles.image} aria-hidden="true">
        <Image src={panel.image} alt="" fill sizes="(max-width: 700px) 100vw, 25vw" style={{ objectFit: "cover", objectPosition: panel.position }} />
      </span>
      <span className={styles.shutter} aria-hidden="true" />
      <span data-service-detail className={styles.details}>
        <span>{panel.eyebrow}</span>
        <span>{panel.description}</span>
        <span>Explore service <ArrowUpRight className="size-4" /></span>
      </span>
      <h3>{panel.title}</h3>
    </article>
  );
}
