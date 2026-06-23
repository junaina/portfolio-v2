// src/components/hero/HeroCamera.tsx

import { motion } from "motion/react";
import ResponsiveImage from "./ResponsiveImage";

type HeroCameraProps = {
  srcDesktop: string;
  srcMobile: string;
  alt: string;
  position: "left" | "right";
  reduceMotion: boolean | null;
};

export default function HeroCamera({
  srcDesktop,
  srcMobile,
  alt,
  position,
  reduceMotion,
}: HeroCameraProps) {
  const isLeft = position === "left";

  const positionClasses = isLeft
    ? "left-[-4rem] bottom-[3rem] w-[19rem] md:left-[4rem] md:bottom-[5rem] md:w-[21rem] lg:w-[24rem]"
    : "right-[1rem] top-[2.5rem] w-[17rem] md:right-[5rem] md:top-[4rem] md:w-[20rem] lg:w-[22rem]";

  const initial = isLeft
    ? { opacity: 0, x: -180, y: 120, rotate: -55, scale: 0.72 }
    : { opacity: 0, x: 180, y: -120, rotate: 55, scale: 0.72 };

  const animate = isLeft
    ? { opacity: 1, x: -70, y: 50, rotate: -20, scale: 1 }
    : { opacity: 1, x: 80, y: 0, rotate: 20, scale: 1 };

  return (
    <motion.div
      className={`absolute z-50 ${positionClasses}`}
      initial={reduceMotion ? false : initial}
      animate={reduceMotion ? { opacity: 1 } : animate}
      transition={{
        delay: reduceMotion ? 0 : isLeft ? 1.35 : 1.5,
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <ResponsiveImage
        mobileSrc={srcMobile}
        desktopSrc={srcDesktop}
        alt={alt}
        className="w-full select-none drop-shadow-[0_18px_40px_rgba(0,0,0,0.55)]"
      />
    </motion.div>
  );
}
