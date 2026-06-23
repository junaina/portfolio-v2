import { motion } from "motion/react";
import { heroAssets } from "./heroAssets";
import ResponsiveImage from "./ResponsiveImage";

type HeroCurtainProps = {
  reduceMotion: boolean | null;
};

export default function HeroCurtain({ reduceMotion }: HeroCurtainProps) {
  return (
    <motion.div
      className="absolute inset-0 z-0"
      initial={reduceMotion ? false : { y: "-100%" }}
      animate={{ y: "0%" }}
      transition={{
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <ResponsiveImage
        mobileSrc={heroAssets.curtain.mobile}
        desktopSrc={heroAssets.curtain.desktop}
        alt=""
        className="h-full w-full object-cover brightness-[0.75] contrast-[1.1] saturate-[0.95]"
      />
    </motion.div>
  );
}
