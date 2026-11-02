interface ProjectTagsProps {
  tags: string[];
  label: string;
}

export function ProjectTags({ tags, label }: ProjectTagsProps) {
  return <ul className="selected-work-tags" aria-label={label}>
    {tags.map((tag) => <li key={tag}>{tag}</li>)}
  </ul>;
}
