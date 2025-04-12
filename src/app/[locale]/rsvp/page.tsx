import Hero from "@/components/hero";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import RsvpForm from "@/components/rsvp-form";
import { useTranslations } from "next-intl";

const Page = () => {
  const t = useTranslations("RsvpForm");
  return (
    <div>
      <Hero
        title={t("rsvp")}
        media="/rsvp_hero.jpeg"
        mediaType="image"
        className="h-[700px]"
      />

      <MaxWidthWrapper className="mt-12 mb-4">
        <RsvpForm />
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
