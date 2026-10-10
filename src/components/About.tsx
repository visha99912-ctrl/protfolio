import { motion, Variants } from "framer-motion";
import { EASE } from "./anim";

const LINES = [
  "I love solving problems.",
  "I transform ideas into products.",
  "I build websites that people remember.",
  "I believe simplicity creates impact.",
  "Every pixel should have a purpose.",
];

const LINE_DELAY = 0.2;
const LINE_STAGGER = 0.5;

export function About() {
  return (
    <section
      id="about"
      className="section relative bg-ink text-paper py-32 md:py-48 overflow-hidden"
    >
      <div className="absolute top-16 left-6 md:left-16 text-[10px] tracking-[0.3em] uppercase text-paper/40">
        About
      </div>

      <div className="px-6 md:px-16">
        <div className="space-y-6 md:space-y-10">
          {LINES.map((line, i) => (
            <AboutLine key={i} text={line} index={i} accent={i === LINES.length - 1} />
          ))}
        </div>

        <div className="mt-20 md:mt-28 flex flex-col gap-2">
          <p className="text-sm text-paper/50 max-w-md">
            Full Stack Web Developer · Shopify Developer · UI/UX Designer · AI
            Enthusiast
          </p>
          <p className="text-xs text-paper/30">
            India · B.Tech CSE (AI & ML), graduating 2027
          </p>
        </div>
      </div>
    </section>
  );
}

function AboutLine({
  text,
  index,
  accent,
}: {
  text: string;
  index: number;
  accent: boolean;
}) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.03, delayChildren: 0 } },
  };
  const child: Variants = {
    hidden: { y: "110%", opacity: 0 },
    show: { y: "0%", opacity: 1, transition: { duration: 0.9, ease: EASE } },
  };

  return (
    <div className="overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ delay: LINE_DELAY + index * LINE_STAGGER }}
        className="font-display font-light leading-[1.05] tracking-tightest"
      >
        <p
          className={`text-[clamp(1.75rem,5.5vw,5rem)] ${
            accent ? "text-mango" : "text-paper"
          }`}
        >
          {text.split(" ").map((w, i) => (
            <span key={i} className="inline-block overflow-hidden align-top">
              <motion.span
                variants={child}
                className="inline-block"
              >
                {w}
                {i < text.split(" ").length - 1 ? "\u00A0" : ""}
              </motion.span>
            </span>
          ))}
        </p>
      </motion.div>
    </div>
  );
}
