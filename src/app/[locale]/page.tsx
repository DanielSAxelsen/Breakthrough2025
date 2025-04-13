import GridItem from "@/components/grid-item";
import Hero from "@/components/hero";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import TimeLine from "@/components/timeline";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Home() {
  const t = useTranslations("HomePage");

  const timelineData = [
    {
      title: t("program.timeline.pre_wedding.title"),
      description: t.raw("program.timeline.pre_wedding.description"),
      subtitle: t.raw("program.timeline.pre_wedding.subtitle"),
      image: {
        alt: "Pre-wedding event",
        src: "/our_program_1_Poster.png",
      },
    },
    {
      title: t("program.timeline.post_wedding.title"),
      description: t.raw("program.timeline.post_wedding.description"),
      image: {
        alt: "Post-wedding events",
        src: "/our_program_2.png",
      },
    },
    {
      title: t("program.timeline.post_post_wedding.title"),
      description: t.raw("program.timeline.post_post_wedding.description"),
      image: {
        alt: "Post-wedding events",
        src: "/our_program_3.jpg",
      },
    },
  ];

  return (
    <main>
      <Hero
        media="/hero_bg_main.mp4"
        mediaType="video"
        toptitle={t("wedding_toptitle")}
        subtitle={t("wedding_subtitle")}
        title={t("wedding_title")}
        button={{ href: "/rsvp", label: t("rsvp") }}
        className="h-[600px]" // Adjust this value as needed
      />

      <MaxWidthWrapper className="mt-16 mb-24 relative">
        <img
          src="/Event 2025.png"
          alt="Event 2025"
          className="w-full h-auto rounded-lg shadow-lg"
        />
        <div className="absolute bottom-[-100px] left-0 right-0 flex justify-center">
          <div className="relative animate-pulse-subtle">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/40 via-primary/60 to-primary/40 rounded-lg blur-[2px] opacity-70 group-hover:opacity-90 transition duration-500 group-hover:duration-200 animate-gradient-xy"></div>
            <Button size="lg" asChild className="relative text-sm sm:text-lg md:text-xl lg:text-2xl px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 md:py-6 lg:py-8 shadow-xl hover:scale-105 transition-transform bg-primary hover:bg-primary/90 group">
              <Link href="/practical-info" className="flex items-center gap-2">
                View Program
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 transition-transform group-hover:translate-x-1 animate-bounce-subtle"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </Link>
            </Button>
          </div>
        </div>
      </MaxWidthWrapper>

      <div className="h-16 w-full" />

      <MaxWidthWrapper
        className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-6 scroll-m-24"
        id="story"
      >
        <GridItem
          description={t("stories.melike.story")}
          picture={{ alt: "Melike's story", src: "/stories_melike_story.png" }}
          title={t("stories.melike.title")}
        />
        <GridItem
          description={t("stories.jonas.story")}
          picture={{ alt: "Jonas's story", src: "/stories_jonas_story.png" }}
          title={t("stories.jonas.title")}
        />
        <GridItem
          description={t("stories.our_story.story")}
          picture={{ alt: "Our story", src: "/stories_our_story.png" }}
          title={t("stories.our_story.title")}
        />
      </MaxWidthWrapper>

      <div className="h-32 w-full" />

      <h2 className="text-center text-4xl mb-8">{t("program.title")}</h2>
      <MaxWidthWrapper>
        <TimeLine
          timeline={timelineData}
          className="max-w-6xl mx-4 lg:mx-auto"
        />
      </MaxWidthWrapper>

      <div className="h-16 w-full" />

      <div className="flex justify-center">
        <Button size="lg" asChild className="text-2xl px-12 py-10">
          <Link href="/practical-info">
            {t("program.practical_info_button")}
          </Link>
        </Button>
      </div>

      <div className="h-16 w-full" />

      {/* Sponsor Section */}
      <MaxWidthWrapper className="mt-0 mb-16 relative">
        <div className="flex flex-col items-center">
          <div className="relative max-w-3xl mx-auto">
            <img
              src="/Sponsor.png"
              alt="Sponsor"
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <div className="absolute right-4 bottom-4 md:right-8 md:bottom-8">
              <Button asChild size="lg" className="px-6 py-3 text-base shadow-xl hover:scale-105 transition-transform">
                <a href="mailto:Danielsaxelsen@gmail.com?subject=Breakthrough%202025%20Sponsorship%20Inquiry">
                  Contact Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </main>
  );
}

