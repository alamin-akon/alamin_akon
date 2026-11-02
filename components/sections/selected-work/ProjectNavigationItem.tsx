import type { KeyboardEvent, Ref } from "react";
import { ArrowUpRight } from "lucide-react";
import type { SelectedWorkProject } from "@/data/selectedWork";

interface ProjectNavigationItemProps {
  project: SelectedWorkProject;
  isActive: boolean;
  buttonRef: Ref<HTMLButtonElement>;
  onSelect: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
}

export function ProjectNavigationItem({ project, isActive, buttonRef, onSelect, onKeyDown }: ProjectNavigationItemProps) {
  return <li>
    <button
      ref={buttonRef}
      data-work-row
      type="button"
      aria-pressed={isActive}
      className={`selected-work-row ${isActive ? "selected-work-row-active" : ""}`}
      onClick={onSelect}
      onFocus={onSelect}
      onKeyDown={onKeyDown}
    >
      <span className="selected-work-indicator" aria-hidden="true"><span /></span>
      <span className="selected-work-number" aria-hidden="true">{String(project.id).padStart(2, "0")}</span>
      <span className="selected-work-row-copy">
        <strong>{project.name}</strong>
        <small>{project.category}</small>
      </span>
      <ArrowUpRight className="selected-work-row-arrow size-6" aria-hidden="true" />
    </button>
  </li>;
}
