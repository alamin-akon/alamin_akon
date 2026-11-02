import type { ReactNode } from "react";

interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  lines: ReactNode[];
  description: string;
}

export function SectionHeading({ id, eyebrow, lines, description }: SectionHeadingProps) {
  return <>
    <p data-work-eyebrow className="selected-work-eyebrow">{eyebrow}</p>
    <h2 id={id} className="selected-work-title">
      {lines.map((line, index) => <span key={index} className="selected-work-title-mask"><span data-work-heading-line>{line}</span></span>)}
    </h2>
    <p data-work-description className="selected-work-description">{description}</p>
  </>;
}
