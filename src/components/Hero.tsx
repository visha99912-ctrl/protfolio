import { motion, Variants } from "framer-motion";
import { EASE } from "./anim";

const LINES = [
  { text: "HELLO.", tone: "light" },
  { text: "I'M", tone: "dim" },
  { text: "VISHAL V", tone: "accent" },
  { text: "I DESIGN.", tone: "light" },
  { text: "I DEVELOP.", tone: "light" },
  { text: "WITHOUT LIMITS.", tone: "accent" },
  { text: "I CREATE DIGITAL EXPERIENCES.", tone: "outline" },
];

const LINE_DELAY = 0.4;
const LINE_STAGGER = 0.5;

export function Hero() {
  return (
    <section
      id="home"
      className="section relative h-screen min-h-[640px] overflow-hidden"
    >
      {/* Vertical split bg */}
      <div className="absolute inset-0 grid grid-cols-2 z-0">
        <div className="bg-paper" />
        <div className="bg-ink" />
      </div>
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-ink/10 z-0" />

      {/* Lines */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16 gap-1 md:gap-2">
        {LINES.map((line, i) => (
          <HeroLine
            key={i}
            text={line.text}
            tone={line.tone as "light" | "dim" | "accent" | "outline"}
            index={i}
          />
        ))}
      </div>

      <ScrollIndicator />
    </section>
  );
}

function HeroLine({
  text,
  tone,
  index,
}: {
  text: string;
  tone: "light" | "dim" | "accent" | "outline";
  index: number;
}) {
  const leftClass =
    tone === "light"
      ? "text-ink"
      : tone === "dim"
      ? "text-ink/40"
      : tone === "accent"
      ? "text-ink"
      : "text-ink text-outline";

  const rightClass =
    tone === "light"
      ? "text-paper"
      : tone === "dim"
      ? "text-paper/40"
      : tone === "accent"
      ? "text-paper"
      : "text-paper text-outline";

  const accentDot = tone === "accent";

  return (
    <div className="relative overflow-hidden w-full">
      <LineCopy
        text={text}
        colorClass={leftClass}
        accentDot={accentDot}
        accentDotClass="text-mango"
        clip="inset(0 50% 0 0)"
        index={index}
      />
      <LineCopy
        text={text}
        colorClass={rightClass}
        accentDot={accentDot}
        accentDotClass="text-mango"
        clip="inset(0 0 0 50%)"
        index={index}
        absolute
      />
    </div>
  );
}

function LineCopy({
  text,
  colorClass,
  accentDot,
  accentDotClass,
  clip,
  index,
  absolute = false,
}: {
  text: string;
  colorClass: string;
  accentDot: boolean;
  accentDotClass: string;
  clip: string;
  index: number;
  absolute?: boolean;
}) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.035, delayChildren: 0 } },
  };
  const child: Variants = {
    hidden: { y: "115%", opacity: 0 },
    show: {
      y: "0%",
      opacity: 1,
      transition: { duration: 1.1, ease: EASE },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      transition={{ delay: LINE_DELAY + index * LINE_STAGGER, ease: EASE }}
      className={`font-display font-medium leading-[0.95] tracking-tightest whitespace-nowrap ${
        absolute ? "absolute inset-0" : ""
      }`}
      style={{ clipPath: clip, WebkitClipPath: clip }}
    >
      <span className={`block text-[clamp(2.5rem,9vw,9rem)] ${colorClass}`}>
        {text.split("").map((c, i) => (
          <motion.span
            key={i}
            variants={child}
            className="inline-block"
            style={{ whiteSpace: c === " " ? "pre" : "normal" }}
          >
            {c}
          </motion.span>
        ))}
        {accentDot && <span className={accentDotClass}>.</span>}
      </span>
    </motion.div>
  );
}

function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: LINE_DELAY + LINES.length * LINE_STAGGER + 0.3,
        duration: 1,
      }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
    >
      <span className="text-[10px] tracking-[0.3em] uppercase text-ink/50 mix-blend-difference">
        Scroll
      </span>
      <div className="h-12 w-px bg-ink/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-mango scroll-line" />
      </div>
    </motion.div>
  );
}
