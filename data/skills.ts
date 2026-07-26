import type { ProcessStep, SkillCategory } from "@/types";

export const skillCategories: SkillCategory[] = [
  { title: "Web Design & Development", description: "Clear visual systems built for practical business goals.", skills: ["Modern website design", "Responsive web design", "Landing pages", "Business websites", "E-commerce design", "Website customisation"] },
  { title: "UI/UX Design", description: "Interfaces that make every journey easier to understand.", skills: ["User interface design", "Wireframes", "Visual hierarchy", "Typography & spacing", "User-friendly navigation", "Figma workflows"] },
  { title: "Shopify", description: "Storefront experiences that present products with clarity.", skills: ["Store design", "Theme customisation", "Shopify Liquid", "Product pages", "Collection pages", "Custom sections"] },
  { title: "Front-End", description: "Responsive, maintainable implementations that feel polished.", skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { title: "Design Systems", description: "Reusable foundations that make digital products consistent.", skills: ["Responsive design systems", "UI components", "Typography systems", "Spacing systems", "Layout planning"] },
];

export const processSteps: ProcessStep[] = [
  { number: "01", title: "Discovery", description: "I start by understanding the project, business, audience, requirements and desired outcome." },
  { number: "02", title: "Planning", description: "I organise the website structure, key sections, user journey and technical approach." },
  { number: "03", title: "Design", description: "I create clear, modern and responsive interface concepts with a focus on usability and visual consistency." },
  { number: "04", title: "Development", description: "I turn the approved design direction into a functional, responsive and maintainable website." },
  { number: "05", title: "Testing", description: "I review the website across different devices, browsers and screen sizes to identify and fix issues." },
  { number: "06", title: "Launch & Improvement", description: "After final review, the website is prepared for launch and future improvements." },
];

export const values = [
  ["User-Focused", "Every design decision should make the experience easier and more useful for the user."],
  ["Responsive", "Websites should provide a consistent experience across desktop, tablet and mobile devices."],
  ["Professional", "Visual presentation, spacing, typography and functionality should communicate trust and quality."],
  ["Continuous Improvement", "Modern digital work requires learning, testing and improving continuously."],
] as const;
