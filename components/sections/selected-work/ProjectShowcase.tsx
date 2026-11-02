"use client";

import type { CSSProperties, RefObject } from "react";
import type { SelectedWorkProject } from "@/data/selectedWork";
import { BrowserMockup } from "./BrowserMockup";
import { ProjectTags } from "./ProjectTags";

interface ProjectShowcaseProps {
  project: SelectedWorkProject;
  stageRef: RefObject<HTMLDivElement | null>;
  tiltRef: RefObject<HTMLDivElement | null>;
  swapRef: RefObject<HTMLDivElement | null>;
  panelsRef: RefObject<HTMLDivElement | null>;
  detailsRef: RefObject<HTMLDivElement | null>;
}

export function ProjectShowcase({ project, stageRef, tiltRef, swapRef, panelsRef, detailsRef }: ProjectShowcaseProps) {
  return <div className="selected-work-visual">
    <div ref={stageRef} data-work-mockup className="selected-work-stage" style={{ "--selected-work-accent": project.accent } as CSSProperties}>
      <div data-work-dots className="selected-work-dots" aria-hidden="true" />
      <div ref={panelsRef} className="selected-work-panels" aria-hidden="true">
        <div className="selected-work-panel selected-work-panel-far" />
        <div className="selected-work-panel selected-work-panel-back">
          <span className="selected-work-panel-dots"><i /><i /><i /></span>
          <span className="selected-work-panel-menu"><i /><i /><i /></span>
        </div>
      </div>
      <div ref={tiltRef} className="selected-work-mockup">
        <div ref={swapRef} className="selected-work-swap">
          <BrowserMockup key={project.slug} project={project} />
        </div>
      </div>
    </div>

    <div ref={detailsRef} data-work-details className="selected-work-details">
      <div className="selected-work-details-meta">
        <strong>{project.name}</strong>
        <span>{project.category}</span>
        <span>{project.platform}</span>
      </div>
      <p>{project.description}</p>
      <ProjectTags tags={project.tags} label={`Technologies used for ${project.name}`} />
    </div>

    <p className="sr-only" aria-live="polite">Now showing {project.name}, {project.category}.</p>
  </div>;
}
