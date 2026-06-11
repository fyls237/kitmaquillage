"use client";

import { useState, useEffect } from "react";

interface AnnouncementBarProps {
  message: string;
  targetDate?: Date; // Date cible pour le compte à rebours
}

export function AnnouncementBar({ message, targetDate }: AnnouncementBarProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setMounted(true);

    if (!targetDate) return;

    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calcul initial
    calculateTimeLeft();

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div
      className="w-full bg-rose-poudre py-2.5 px-4 text-center flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4"
      role="banner"
    >
      <p className="label-nav text-noir m-0 leading-normal">{message}</p>
      
      {mounted && targetDate && (
        <div className="flex items-center gap-1.5 label-nav text-fuchsia font-bold">
          <span className="bg-noir/5 px-2 py-0.5">{timeLeft.days}J</span>
          <span>:</span>
          <span className="bg-noir/5 px-2 py-0.5">{String(timeLeft.hours).padStart(2, "0")}H</span>
          <span>:</span>
          <span className="bg-noir/5 px-2 py-0.5">{String(timeLeft.minutes).padStart(2, "0")}M</span>
          <span>:</span>
          <span className="bg-noir/5 px-2 py-0.5">{String(timeLeft.seconds).padStart(2, "0")}S</span>
        </div>
      )}
    </div>
  );
}
