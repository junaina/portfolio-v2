// src/components/hero/HeroTitle.tsx

import { motion } from "motion/react";

type HeroTitleProps = {
  name: string;
  reduceMotion: boolean | null;
};

export default function HeroTitle({ name, reduceMotion }: HeroTitleProps) {
  return (
    <motion.h1
      className="
        absolute z-40 w-[72%] max-w-[900px]
        text-center font-black uppercase leading-none
        tracking-[0.06em] text-[#fff1c7]
        text-[clamp(7.4rem,6.4vw,2.8rem)]
        drop-shadow-[0_0_18px_rgba(255,213,130,0.25)]
        whitespace-nowrap
        font-[SlasherFilm]
        
      "
      initial={reduceMotion ? false : { opacity: 0, y: -120, rotate: -3 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{
        delay: reduceMotion ? 0 : 1.15,
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {name}
    </motion.h1>
  );
}
