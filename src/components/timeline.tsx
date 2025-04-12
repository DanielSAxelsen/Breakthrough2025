"use client";

import TimelineRow from "@/components/timeline-row";
import { cn } from "@/lib/utils";
import { ImageType } from "@/types";
import {
  createRef,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useInView } from "react-intersection-observer";

let halfScreenHeight: number;
if (typeof window !== "undefined") {
  halfScreenHeight = window?.innerHeight / 2;
}

interface TimeLineProps {
  timeline: {
    year?: number;
    title: string;
    description: string;
    image: ImageType;
    subtitle?: string;
  }[];
  className?: string;
}

const TimeLine = ({ timeline, className }: TimeLineProps) => {
  const [progressY, setProgressY] = useState(0.0);

  const {
    ref: lineRef,
    inView,
    entry,
  } = useInView({
    threshold: 0,
    rootMargin: "-50% 0% -50% 0%",
  });
  const circleRefs = useRef<RefObject<HTMLDivElement>[]>([]);

  useEffect(() => {
    circleRefs.current = timeline.map(() => createRef<HTMLDivElement>());
  }, []);

  const animation = useCallback(() => {
    window.requestAnimationFrame(() => {
      if (entry?.target) {
        const { top, height, bottom } = entry.target.getBoundingClientRect();
        if (bottom > halfScreenHeight && top < halfScreenHeight) {
          const depthPx = bottom - halfScreenHeight;
          const depthPercent = (depthPx * 100) / height;
          setProgressY(100 - depthPercent);
        }

        if (bottom < halfScreenHeight) {
          setProgressY(100);
        }

        if (top > halfScreenHeight) {
          setProgressY(0);
        }

        circleRefs.current.forEach((circleRef) => {
          if (circleRef.current) {
            const { top, height, bottom } =
              circleRef.current.getBoundingClientRect();
            if (bottom > halfScreenHeight && top < halfScreenHeight) {
              const depthPx = bottom - halfScreenHeight;
              const depthPercent = 100 - (depthPx * 100) / height;
              circleRef.current.style.background = `linear-gradient(hsl(var(--primary)) ${depthPercent}%, hsl(var(--primary) / 50%) 0%)`;
            }

            if (bottom < halfScreenHeight) {
              circleRef.current.style.background = `linear-gradient(hsl(var(--primary)) 100%, hsl(var(--primary) / 50%) 0%)`;
            }

            if (top > halfScreenHeight) {
              circleRef.current.style.background = `hsl(var(--primary) / 50%`;
            }
          }
        });
      }
    });
  }, [entry]);
  useEffect(() => {
    document.addEventListener("scroll", animation);
    return () => {
      document.removeEventListener("scroll", animation);
    };
  }, [inView]);

  return (
    <div className={cn("relative space-y-12", className)}>
      <div
        ref={lineRef}
        style={{
          background: `linear-gradient(to bottom, hsl(var(--primary)) ${progressY}%, hsla(var(--muted) / 0.4) 0%`,
        }}
        className={cn(
          "w-1 h-full left-0 -translate-x-1/2  md:left-1/2 absolute"
        )}
      />
      {timeline.map((item, index) => (
        <div className="grid grid-cols-7 md:gap-y-10" key={index}>
          <TimelineRow item={item} index={index} circleRefs={circleRefs} />
        </div>
      ))}
    </div>
  );
};

export default TimeLine;
