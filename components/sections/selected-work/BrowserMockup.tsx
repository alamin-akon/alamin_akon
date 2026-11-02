"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { ExternalLink } from "lucide-react";
import type { SelectedWorkProject } from "@/data/selectedWork";

function readableHost(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function FallbackPreview({ project }: { project: SelectedWorkProject }) {
  return <div className="selected-work-fallback" style={{ "--fallback-accent": project.accent } as CSSProperties} role="img" aria-label={`${project.name} preview placeholder`}>
    <div className="selected-work-fallback-orb" aria-hidden="true" />
    <div className="selected-work-fallback-copy">
      <p>{project.platform}</p>
      <h4>{project.name}</h4>
      <span aria-hidden="true" />
    </div>
    <div className="selected-work-fallback-layout" aria-hidden="true"><i /><i /><i /><i /></div>
  </div>;
}

interface BrowserMockupProps {
  project: SelectedWorkProject;
}

export function BrowserMockup({ project }: BrowserMockupProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return <div className="selected-work-browser">
    <div className="selected-work-browser-top">
      <span className="selected-work-browser-dots" aria-hidden="true"><i /><i /><i /></span>
      <span className="selected-work-browser-url">{readableHost(project.url)}</span>
      <a href={project.url} target="_blank" rel="noreferrer noopener" aria-label={`Open the ${project.name} website in a new tab`}>
        <ExternalLink className="size-4" aria-hidden="true" />
      </a>
    </div>
    <div className="selected-work-image-area">
      {imageFailed ? <FallbackPreview project={project} /> : <Image
        src={project.image}
        alt={`${project.name} — ${project.category} website designed and built for ${project.platform}`}
        fill
        sizes="(max-width: 1023px) 92vw, 55vw"
        className="object-cover object-top"
        onError={() => setImageFailed(true)}
      />}
    </div>
  </div>;
}
