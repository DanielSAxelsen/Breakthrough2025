"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: string;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const t = useTranslations("Countdown");

  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const time = calculateTimeLeft();
      setTimeLeft(time);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const timerComponents: React.ReactNode[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (timeLeft[interval as keyof typeof timeLeft]) {
      timerComponents.push(
        <span key={interval} className="text-lg font-bold mx-0.5">
          {timeLeft[interval as keyof typeof timeLeft]} {interval}{" "}
        </span>
      );
    }
  });

  if (!mounted) return null;

  return (
    <div className="py-4 px-6 bg-slate-700 text-white flex justify-center items-center sticky top-0 z-30 ">
      {/* {isTimeUp && <Confetti numberOfPieces={400} gravity={0.5} />}*/}

      <div className="text-center">
        {timerComponents.length ? (
          <div className="text-lg">
            <span>{t("looking_forward")}</span>
            {timerComponents} <span>{t("for_wedding")}</span>
          </div>
        ) : (
          <span className="font-bold">{t("welcome")}</span>
        )}
      </div>
    </div>
  );
};

export default Countdown;
