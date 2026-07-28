import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServicesNavigationGrid } from "@/components/sections/services/ServicesNavigationGrid";
import { servicePanels } from "@/components/sections/services/servicePanels";

export function ServicesSection({ limit }: { limit?: number }) {
  const displayedPanels = servicePanels.slice(0, limit ?? servicePanels.length);

  return (
    <section className="section-space">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Services"
              title="Design, develop and improve your digital presence."
              description="Flexible design and development support, tailored to what your website or store needs."
            />
          </Reveal>
          {limit && <Button href="/services" variant="ghost">All services <ArrowRight className="size-4" /></Button>}
        </div>
        <Reveal className="mt-12"><ServicesNavigationGrid panels={displayedPanels} /></Reveal>
      </Container>
    </section>
  );
}
