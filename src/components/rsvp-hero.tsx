"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface RsvpHeroProps {
  media: string;
  className?: string;
}

const RsvpHero = ({
  media,
  className,
}: RsvpHeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 1;
    }
  }, []);

  return (
    <div className="w-screen relative left-[50%] right-[50%] mx-[-50vw]">
      <div className={cn(
        "relative h-96",
        className
      )}>
        <video
          ref={videoRef}
          className="absolute object-cover w-full h-full brightness-75 object-[50%_35%]"
          src={media}
          autoPlay
          playsInline
          muted
          loop
        />
        <div className="z-10 relative text-white flex flex-col justify-center items-center h-full gap-y-4 px-4 text-center">
          {/* Empty content area */}
        </div>
      </div>
    </div>
  );
};

export default RsvpHero;
