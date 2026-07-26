import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/cards/ServiceCard";
export function ServicesSection({ limit }: { limit?: number }) { const displayed = limit ? services.slice(0, limit) : services; return <section className="section-space"><Container><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><Reveal><SectionHeading eyebrow="Services" title="Design, develop and improve your digital presence." description="Flexible design and development support, tailored to what your website or store needs." /></Reveal>{limit && <Button href="/services" variant="ghost">All services <ArrowRight className="size-4"/></Button>}</div><div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{displayed.map((service, index) => <Reveal key={service.slug} delay={index * .05}><ServiceCard service={service} featured={index === 0}/></Reveal>)}</div></Container></section>; }
