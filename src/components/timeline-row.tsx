import TimeLineRowCard from "@/components/timeline-row-card";
import { cn } from "@/lib/utils";
import { ImageType } from "@/types";
import React from "react";

interface TimelineRowProps {
  item: {
    year?: number;
    title: string;
    description: string;
    image: ImageType;
    subtitle?: string;
  };
  index: number;
  circleRefs: React.MutableRefObject<React.RefObject<HTMLDivElement>[]>;
}
const TimelineRow = ({ item, circleRefs, index }: TimelineRowProps) => {
  const variant = index % 2 === 0 ? "default" : "reverse";
  return (
    <>
      <div
        className={cn(
          "self-center col-span-6 md:col-span-3 md:block order-2 md:order-none",
          {
            hidden: variant === "default",
          }
        )}
      >
        {variant === "default" ? (
          <img {...item.image} className="w-full hidden md:block rounded-xl" />
        ) : (
          <TimeLineRowCard item={item} />
        )}
      </div>
      <div className="justify-self-start md:justify-self-center relative col-span-1 order-1 md:order-none">
        <div className="absolute bg-gray-50/95 h-7 w-7 rounded-full left-1/2 -translate-x-1/2 top-1/2">
          <div
            ref={circleRefs.current[index]}
            className="absolute bg-gray-100 h-4 w-4 rounded-full left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2"
          ></div>
        </div>
      </div>
      <div
        className={cn(
          "self-center col-span-6 md:col-span-3 md:block order-1 md:order-none",
          {
            hidden: variant === "reverse",
          }
        )}
      >
        {variant === "default" ? (
          <TimeLineRowCard item={item} />
        ) : (
          <img {...item.image} className="w-full hidden md:block rounded-xl" />
        )}
      </div>
    </>
  );
};

export default TimelineRow;
