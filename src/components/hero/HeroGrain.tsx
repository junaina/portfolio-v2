// src/components/hero/HeroGrain.tsx

export default function HeroGrain() {
  return (
    <div
      className="
        pointer-events-none absolute inset-0 z-20 opacity-[0.07]
        mix-blend-overlay
        bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.9)_0_1px,transparent_1px_3px)]
      "
    />
  );
}
