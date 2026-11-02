"use client";

import { useRef, type KeyboardEvent } from "react";
import type { SelectedWorkProject } from "@/data/selectedWork";
import { ProjectNavigationItem } from "./ProjectNavigationItem";

const navigationKeys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];

interface ProjectNavigationProps {
  projects: SelectedWorkProject[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function ProjectNavigation({ projects, activeIndex, onSelect }: ProjectNavigationProps) {
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!navigationKeys.includes(event.key)) return;
    event.preventDefault();

    const last = projects.length - 1;
    const forward = event.key === "ArrowDown" || event.key === "ArrowRight";
    const next = event.key === "Home" ? 0
      : event.key === "End" ? last
      : forward ? (index + 1) % projects.length
      : (index - 1 + projects.length) % projects.length;

    onSelect(next);
    buttons.current[next]?.focus();
  };

  return <ul className="selected-work-list" aria-label="Selected projects">
    {projects.map((project, index) => <ProjectNavigationItem
      key={project.slug}
      project={project}
      isActive={activeIndex === index}
      buttonRef={(element) => { buttons.current[index] = element; }}
      onSelect={() => onSelect(index)}
      onKeyDown={(event) => handleKeyDown(event, index)}
    />)}
  </ul>;
}
