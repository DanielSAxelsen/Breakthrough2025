import Hero from "@/components/hero";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import ProgramTimeline from "@/components/program-timeline";
export default function PracticalInfo() {

  return (
    <main>
      <Hero
        title="Practical Information"
        media="/location_hero.webp"
        mediaType="image"
        className="h-[500px]"
      />

      <MaxWidthWrapper className="py-16">
        <h1 className="text-4xl font-bold text-center mb-12">
          Program
        </h1>

        <div className="max-w-3xl mx-auto">
          <ProgramTimeline />
        </div>
      </MaxWidthWrapper>
    </main>
  );
}

