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
            {/* LEGO-style button with 3D effect from Option 2 (without the circles) */}
            <Link href="/practical-info" className="relative inline-block px-10 py-5 bg-yellow-400 rounded-lg text-xl font-bold text-gray-800 transform transition-all duration-300 ease-in-out hover:shadow-[0_8px_0_0_rgba(0,0,0,0.2)] active:shadow-[0_0px_0_0_rgba(0,0,0,0.2)] active:translate-y-2 shadow-lg">
              <div className="absolute -top-2 -left-2 -right-2 h-2 bg-yellow-500 rounded-t-lg"></div>
              <div className="absolute -bottom-2 -left-2 -right-2 h-2 bg-yellow-300 rounded-b-lg"></div>
              <div className="absolute -left-2 -top-2 -bottom-2 w-2 bg-yellow-500 rounded-l-lg"></div>
              <div className="absolute -right-2 -top-2 -bottom-2 w-2 bg-yellow-300 rounded-r-lg"></div>

              <div className="flex items-center space-x-2">
                <span>View Program</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 animate-bounce-subtle"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </div>
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>

      <div className="h-24 w-full" />

      <MaxWidthWrapper>
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 relative inline-block">
            What is Breakthrough?
            <span className="absolute -bottom-3 left-0 right-0 mx-auto w-2/3 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></span>
          </h2>
        </div>
      </MaxWidthWrapper>

      <MaxWidthWrapper
        className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-6 scroll-m-24"
        id="story"
      >
        <GridItem
          description={t("stories.melike.story")}
          picture={{ alt: "Melike's story", src: "/stories_melike_story.png" }}
          title={t("stories.melike.title")}
          isFirst={true}
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

