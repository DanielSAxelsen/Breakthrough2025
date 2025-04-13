import Hero from "@/components/hero";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import RsvpForm from "@/components/rsvp-form";
const Page = () => {
  return (
    <div>
      <Hero
        media="/LaunchTeaser.mp4"
        mediaType="video"
        className="h-[300px] md:h-[600px]"
      />

      <MaxWidthWrapper className="mt-12 mb-4">
        <RsvpForm />
      </MaxWidthWrapper>
    </div>
  );
};

export default Page;
