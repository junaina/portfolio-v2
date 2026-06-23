import { motion, useReducedMotion } from "motion/react";
import { heroAssets } from "./heroAssets";
import HeroCurtain from "./HeroCurtain";
import HeroFrame from "./HeroFrame";
import HeroTitle from "./HeroTitle";
import HeroCamera from "./HeroCamera";
import HeroGrain from "./HeroGrain";

export default function OpeningSceneClient() {
  //const reduceMotion = useReducedMotion();
  const reduceMotion = false;
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      <HeroCurtain reduceMotion={reduceMotion} />

      <div className="absolute inset-0 z-10 bg-black/35" />

      <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,rgba(255,230,170,0.14),transparent_35%)]" />

      <HeroGrain />

      <main className="relative z-30 flex min-h-screen items-center justify-center px-4">
        <div className="relative flex h-[520px] w-full max-w-6xl items-center justify-center md:h-[650px]">
          <div className="relative flex w-[78vw] max-w-[980px] aspect-[16/5.7] items-center justify-center">
            <HeroFrame reduceMotion={reduceMotion} />
            <HeroTitle reduceMotion={reduceMotion} name="NUR JUNAINA" />
          </div>

          <HeroCamera
            srcDesktop={heroAssets.cameraLeft.desktop}
            srcMobile={heroAssets.cameraLeft.mobile}
            alt="Vintage film camera"
            position="left"
            reduceMotion={reduceMotion}
          />

          <HeroCamera
            srcDesktop={heroAssets.cameraRight.desktop}
            srcMobile={heroAssets.cameraRight.mobile}
            alt="Vintage film camera"
            position="right"
            reduceMotion={reduceMotion}
          />
        </div>
      </main>

      <motion.div
        className="absolute bottom-8 left-1/2 z-50 -translate-x-1/2 text-center text-xs uppercase tracking-[0.35em] text-[#f4ede1]/60"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ delay: 2.1, duration: 0.6 }}
      >
        Scroll to enter
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-40 h-40 bg-gradient-to-b from-transparent to-black" />
    </div>
  );
}
