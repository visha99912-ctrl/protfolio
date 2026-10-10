import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  { n: "01", title: "Research", desc: "Understanding goals, users, and the competitive landscape." },
  { n: "02", title: "Wireframe", desc: "Structuring content and flow before a single pixel is polished." },
  { n: "03", title: "UI Design", desc: "Crafting an editorial, intentional visual language." },
  { n: "04", title: "Development", desc: "Building with React, Tailwind, and motion-first thinking." },
  { n: "05", title: "Optimization", desc: "Tuning speed, SEO, accessibility, and Core Web Vitals." },
  { n: "06", title: "Launch", desc: "Shipping with confidence and a plan to keep improving." },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={ref}
      className="section relative bg-paper text-ink py-32 md:py-48 overflow-hidden"
    >
      <div className="absolute top-16 left-6 md:left-16 text-[10px] tracking-[0.3em] uppercase text-ink/40">
        Process
      </div>

      <div className="px-6 md:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-light text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tightest mb-20 md:mb-32 max-w-4xl"
        >
          From idea to <span className="text-outline">launch.</span>
        </motion.h2>

        <div className="relative">
          {/* Vertical progress line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-ink/10 -translate-x-1/2" />
          <motion.div
            style={{ scaleY: lineScale, originY: 0 }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-mango -translate-x-1/2"
          />

          <div className="space-y-16 md:space-y-24">
            {STEPS.map((step, i) => (
              <Step key={step.n} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
  index: number;
}) {
  const left = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20% 0px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
        left ? "" : "md:[direction:rtl]"
      }`}
    >
      <div className={`md:[direction:ltr] pl-12 md:pl-0 ${left ? "md:text-right md:pr-16" : "md:pl-16"}`}>
        <span className="font-display text-mango text-sm tracking-[0.2em]">
          {step.n}
        </span>
        <h3 className="font-display font-medium text-[clamp(1.75rem,4vw,3rem)] tracking-tightest leading-[1] mt-2">
          {step.title}
        </h3>
      </div>
      <div className={`md:[direction:ltr] pl-12 md:pl-0 ${left ? "md:pl-16" : "md:pr-16 md:text-right"}`}>
        <p className="text-base text-ink/60 max-w-sm">{step.desc}</p>
      </div>

      {/* Node */}
      <div className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 w-3 h-3 rounded-full bg-mango border-2 border-paper" />
    </motion.div>
  );
}
