import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const WORDS = ["LET", "IT", "HAPPEN"];
const CAPTION = "Great ideas become reality when someone decides to start.";

export function Final() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const glowOpacity = useTransform(scrollYProgress, [0.3, 0.85], [0, 1]);
  const lineScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
  const captionOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);

  return (
    <section
      ref={ref}
      className="section relative bg-ink text-paper"
      style={{ height: "240vh" }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Soft mango glow that spreads */}
        <motion.div
          style={{ opacity: glowOpacity }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] rounded-full bg-mango/15 blur-[160px] breathe"
        />

        {/* Floating particles */}
        <Particles />

        {/* Thin line growing from bottom */}
        <motion.div
          style={{ scaleY: lineScale, originY: 1 }}
          className="absolute left-1/2 bottom-0 w-px h-1/2 bg-gradient-to-t from-mango/60 to-transparent -translate-x-1/2"
        />

        {/* Words */}
        <div className="relative z-10 flex flex-col items-center gap-2 md:gap-4">
          {WORDS.map((w, i) => (
            <FinalWord
              key={w}
              text={w}
              index={i}
              total={WORDS.length}
              progress={scrollYProgress}
            />
          ))}
        </div>

        {/* Caption */}
        <motion.p
          style={{ opacity: captionOpacity }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center text-sm md:text-base text-paper/50 max-w-md px-6"
        >
          {CAPTION}
        </motion.p>
      </div>
    </section>
  );
}

function FinalWord({
  text,
  index,
  total,
  progress,
}: {
  text: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const segStart = 0.2 + (index / total) * 0.6;
  const segEnd = segStart + 0.15;
  const local = useTransform(progress, [segStart, segEnd], [0, 1]);

  const opacity = useTransform(local, [0, 0.3, 1], [0, 1, 1]);
  const y = useTransform(local, [0, 1], [60, 0]);
  const blur = useTransform(local, [0, 0.3, 1], [16, 0, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <div className="overflow-hidden">
      <motion.h2
        style={{ opacity, y, filter }}
        className="font-display font-light tracking-tightest leading-[0.9] text-center text-[clamp(3.5rem,16vw,16rem)]"
      >
        {text.split("").map((c, i) => (
          <motion.span
            key={i}
            className="inline-block"
            animate={{ y: [0, -4, 0] }}
            transition={{
              duration: 5 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15,
            }}
          >
            {c}
          </motion.span>
        ))}
      </motion.h2>
    </div>
  );
}

function Particles() {
  const particles = Array.from({ length: 18 });
  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((_, i) => {
        const left = (i * 53) % 100;
        const top = (i * 37) % 100;
        const size = 2 + (i % 3);
        const delay = (i % 6) * 0.6;
        const duration = 6 + (i % 5);
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-mango/40"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
            }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.7, 0.2] }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
          />
        );
      })}
    </div>
  );
}
