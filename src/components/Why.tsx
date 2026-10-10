import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const WORDS = [
  { text: "FAST.", outline: false },
  { text: "PREMIUM.", outline: true },
  { text: "MODERN.", outline: false },
  { text: "RESPONSIVE.", outline: true },
  { text: "CREATIVE.", outline: false },
];

export function Why() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={ref}
      className="section relative bg-paper text-ink py-32 md:py-56 overflow-hidden"
    >
      <div className="absolute top-16 left-6 md:left-16 text-[10px] tracking-[0.3em] uppercase text-ink/40">
        Why Work With Me
      </div>

      <div className="px-6 md:px-16 flex flex-col items-center justify-center gap-6 md:gap-10">
        {WORDS.map((w, i) => (
          <WhyWord
            key={w.text}
            text={w.text}
            outline={w.outline}
            index={i}
            total={WORDS.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

function WhyWord({
  text,
  outline,
  index,
  total,
  progress,
}: {
  text: string;
  outline: boolean;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const segStart = index / total;
  const segEnd = (index + 1) / total;
  const local = useTransform(progress, [segStart, segEnd], [0, 1]);

  const opacity = useTransform(local, [0, 0.2, 0.8, 1], [0.1, 1, 1, 0.2]);
  const scale = useTransform(local, [0, 0.2, 0.8, 1], [0.92, 1, 1, 1.04]);
  const y = useTransform(local, [0, 0.2, 0.8, 1], [40, 0, 0, -30]);
  const rotate = useTransform(local, [0, 1], [-1, 1]);

  return (
    <motion.h2
      style={{ opacity, scale, y, rotate }}
      className={`font-display font-medium tracking-tightest leading-[0.9] text-center text-[clamp(3rem,15vw,14rem)] ${
        outline ? "text-outline" : "text-ink"
      }`}
    >
      {text}
    </motion.h2>
  );
}
