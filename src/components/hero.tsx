"use client";

import Button from "@/components/button";
import { cn } from "@/lib/utils";
import { ButtonType } from "@/types";

interface HeroProps {
  media: string;
  title?: string;
  subtitle?: string;
  toptitle?: string;
  button?: ButtonType;
  className?: string;
  mediaType?: "video" | "image";
  stretch?: boolean;
}

const Hero = ({
  media,
  title,
  subtitle,
  button,
  className,
  toptitle,
  mediaType = "image",
  stretch = false,
}: HeroProps) => {
  return (
    <div className="w-screen relative left-[50%] right-[50%] mx-[-50vw]">
      <div className={cn(
        "relative h-96",
        className
      )}>
        {mediaType === "image" && (
          <img
            className="absolute object-cover object-center w-full h-full brightness-75"
            src={media}
            alt={title}
          />
        )}
        {mediaType === "video" && (
          <video
            className="absolute object-cover object-center w-full h-full brightness-75"
            src={media}
            autoPlay
            playsInline
            muted
            loop
          />
        )}
        <div className="z-10 relative text-white flex flex-col justify-center items-center h-full gap-y-4 px-4 text-center">
          <p className="text-sm md:text-2xl tracking-widest">{toptitle}</p>
          <h1 className="text-5xl md:text-8xl text-center">{title}</h1>
          <p className="text-sm md:text-lg">{subtitle}</p>
          {button && <Button {...button} className="mt-5 tracking-widest" />}
        </div>
      </div>
    </div>
  );
};

export default Hero;

