import type { StaticImageData } from "next/image";
import healthNookImage from "@/public/projects/health-nook.png";
import cycologyGearImage from "@/public/projects/cycology-gear.png";
import queBonitoImage from "@/public/projects/que-bonito.png";
import avenueSocietyImage from "@/public/projects/avenue-society.png";

export type SelectedWorkProject = {
  id: number;
  name: string;
  slug: string;
  category: string;
  platform: string;
  description: string;
  image: StaticImageData;
  url: string;
  tags: string[];
  accent: string;
};

export const selectedWorkProjects: SelectedWorkProject[] = [
  {
    id: 1,
    name: "Health Nook",
    slug: "health-nook",
    category: "Health & Wellness",
    platform: "Shopify / Web Platform",
    description: "A health-focused online platform designed to present wellness-related products and information through a clean, accessible and professional digital experience.",
    image: healthNookImage,
    url: "https://healthnook.com.au/",
    tags: ["Shopify", "Web Design"],
    accent: "#22d3ee",
  },
  {
    id: 2,
    name: "Cycology Gear",
    slug: "cycology-gear",
    category: "Cycling & Lifestyle E-commerce",
    platform: "Shopify",
    description: "An e-commerce experience for a cycling and lifestyle brand, focused on product presentation, responsive layouts and a smooth customer journey.",
    image: cycologyGearImage,
    url: "https://www.cycologygear.com/",
    tags: ["Shopify", "Front-End"],
    accent: "#60a5fa",
  },
  {
    id: 3,
    name: "Que Bonito TN",
    slug: "que-bonito-tn",
    category: "Fashion & E-commerce",
    platform: "Shopify",
    description: "A brand-focused online store designed to showcase fashion products through a visually engaging and user-friendly shopping experience.",
    image: queBonitoImage,
    url: "https://quebonitotn.com/",
    tags: ["Shopify", "Web Design"],
    accent: "#f472b6",
  },
  {
    id: 4,
    name: "Avenue Society",
    slug: "avenue-society",
    category: "Modern Web Platform",
    platform: "Next.js",
    description: "A premium website built with Next.js, focused on refined visuals, responsive interaction, performance and a polished user experience.",
    image: avenueSocietyImage,
    url: "https://avenue-society.netlify.app/",
    tags: ["Next.js", "Web Design"],
    accent: "#a78bfa",
  },
];
