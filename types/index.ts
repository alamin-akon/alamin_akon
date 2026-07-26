export type ProjectCategory = "Shopify" | "Web Design" | "UI/UX" | "Front-End" | "E-commerce";

export interface NavigationItem { label: string; href: string; }
export interface SocialLink { label: string; href: string; }
export interface Service { title: string; slug: string; description: string; features: string[]; icon: string; }
export interface SkillCategory { title: string; description: string; skills: string[]; }
export interface ProcessStep { number: string; title: string; description: string; }
export interface Project {
  slug: string; title: string; industry: string; platform: string; description: string;
  services: string[]; technologies: string[]; website: string; categories: ProjectCategory[];
  goal: string; workCompleted: string[]; responsiveNote: string; accent: string;
}
