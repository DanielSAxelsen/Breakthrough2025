import Hero from "@/components/hero";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import ProgramTimeline from "@/components/program-timeline";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function PracticalInfo() {
  const t = useTranslations("RsvpForm");

  return (
    <main>
      <Hero
        title="Practical Information"
        media="/location_hero.webp"
        mediaType="image"
        className="h-[500px]"
        button={{ href: "/rsvp", label: t("rsvp") }}
      />

      <MaxWidthWrapper className="py-16">
        <h1 className="text-4xl font-bold text-center mb-12">
          Program
        </h1>

        <div className="max-w-3xl mx-auto">
          <ProgramTimeline />
        </div>

        <div className="flex justify-center mt-16">
          <Button size="lg" asChild className="text-2xl px-12 py-10 shadow-xl hover:scale-105 transition-transform">
            <Link href="/rsvp">
              {t("rsvp")}
            </Link>
          </Button>
        </div>
      </MaxWidthWrapper>
    </main>
  );
}

