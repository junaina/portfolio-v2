// src/components/hero/HeroFrame.tsx

import { motion } from "motion/react";

type HeroFrameProps = {
  reduceMotion: boolean | null;
};

const horizontalBulbs = Array.from({ length: 20 });
const verticalBulbs = Array.from({ length: 6 });

export default function HeroFrame({ reduceMotion }: HeroFrameProps) {
  return (
    <motion.div
      className="
    absolute z-30
    w-[82vw] max-w-[900px]
    aspect-[16/6]
    md:w-[68vw]
  "
      initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: reduceMotion ? 0 : 0.75,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Outer red frame */}
      <div
        className="
          absolute inset-0 rounded-sm
          border border-[#d8a84e]/100
          bg-[linear-gradient(135deg,#4b0906,#9e1b12,#3a0504)]
          shadow-[0_0_35px_rgba(255,148,38,0.22)]
        "
      />

      {/* Inner cutout area */}
      <div
        className="
         absolute inset-x-[5%] inset-y-[10%]
          rounded-[2px]
          border-2 border-[#d8a84e]/80
          bg-black/10
          shadow-inner
        "
      />

      {/* Top bulbs */}
      <div className="absolute left-[2%] right-[2%] top-[3%] flex justify-between">
        {horizontalBulbs.map((_, index) => (
          <Bulb key={`top-${index}`} />
        ))}
      </div>

      {/* Bottom bulbs */}
      <div className="absolute left-[2%] right-[2%] bottom-[3%] flex justify-between">
        {horizontalBulbs.map((_, index) => (
          <Bulb key={`bottom-${index}`} />
        ))}
      </div>

      {/* Left bulbs */}
      <div className="absolute bottom-[16%] left-[2%] top-[16%] flex flex-col justify-between">
        {verticalBulbs.map((_, index) => (
          <Bulb key={`left-${index}`} />
        ))}
      </div>

      {/* Right bulbs */}
      <div className="absolute bottom-[16%] right-[2%] top-[16%] flex flex-col justify-between">
        {verticalBulbs.map((_, index) => (
          <Bulb key={`right-${index}`} />
        ))}
      </div>
    </motion.div>
  );
}

function Bulb() {
  return (
    <span
      className="
        block h-3 w-3 rounded-full
        md:h-4 md:w-4
        bg-[radial-gradient(circle,#fff7c7_0%,#ffd36a_38%,#c76a13_70%,#5c1c05_100%)]
        shadow-[0_0_7px_rgba(255,203,93,0.75),0_0_14px_rgba(255,133,27,0.25)]
        ring-1 ring-[#4a1c05]
      "
    />
  );
}
