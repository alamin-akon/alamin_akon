import { Quote } from "lucide-react";
import { profile } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
export function BrandStatement() { return <section className="section-space"><Container><Reveal><div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#182a62] via-[#15152e] to-[#3a1768] px-7 py-12 sm:px-14 sm:py-20"><div className="absolute -right-20 -top-20 size-80 rounded-full bg-accent/20 blur-3xl"/><Quote className="relative size-11 text-accent/80 sm:size-14"/><blockquote className="relative mt-7 max-w-4xl text-3xl font-bold leading-tight tracking-[-.05em] text-white sm:text-5xl">“{profile.statement}”</blockquote><div className="relative mt-9"><p className="font-semibold text-white">Alamin Akon</p><p className="mt-1 text-sm text-cyan-100/75">{profile.tagline}</p></div></div></Reveal></Container></section>; }
