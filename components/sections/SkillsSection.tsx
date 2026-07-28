import { FaCode, FaCss3Alt, FaHtml5, FaJs, FaNodeJs, FaReact } from "react-icons/fa6";
import { SiFigma, SiNextdotjs, SiShadcnui, SiShopify, SiTailwindcss } from "react-icons/si";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const skillCards = [
  { theme: "mint", title: "Core Web", description: "Semantic structure, responsive styling and interactive browser experiences.", icon: FaCode, tools: [[FaHtml5, "HTML5"], [FaCss3Alt, "CSS3"], [FaJs, "JavaScript"]] },
  { theme: "violet", title: "React Stack", description: "Component-driven interfaces and scalable full-stack web applications.", icon: FaReact, tools: [[FaReact, "React"], [SiNextdotjs, "Next.js"], [FaNodeJs, "Node.js"]] },
  { theme: "solar", title: "UI System", description: "Fast, reusable interfaces with utility-first styling and polished components.", icon: SiTailwindcss, tools: [[FaCss3Alt, "CSS3"], [SiTailwindcss, "Tailwind CSS"], [SiShadcnui, "shadcn/ui"]] },
  { theme: "ocean", title: "Design & Commerce", description: "Design direction and capable storefront experiences for modern brands.", icon: SiShopify, tools: [[SiFigma, "Figma"], [SiShopify, "Shopify"], [FaCode, "Liquid"]] },
] as const;

export function SkillsSection() {
  return <section className="skills-section section-space"><Container><Reveal><SectionHeading eyebrow="Skills & technologies" title="A considered mix of design and development." description="The tools I use to design, build and refine responsive digital experiences." /></Reveal><div className="skills-demo-grid mt-12">{skillCards.map((card, index) => { const MainIcon = card.icon; return <Reveal key={card.title} delay={index * .08} className="skills-demo-reveal"><div className={`skills-demo-parent skills-demo-parent--${card.theme}`}><article className="skills-demo-card"><div className="skills-demo-logo" aria-hidden="true"><span/><span/><span/><span/><span><MainIcon/></span></div><div className="skills-demo-glass"/><div className="skills-demo-content"><h3>{card.title}</h3><p>{card.description}</p></div><div className="skills-demo-bottom"><div className="skills-demo-tools">{card.tools.map(([Icon, name]) => <span key={name} title={name} aria-label={name}><Icon/></span>)}</div><span className="skills-demo-more">Explore <b>↗</b></span></div></article></div></Reveal>; })}</div></Container></section>;
}
