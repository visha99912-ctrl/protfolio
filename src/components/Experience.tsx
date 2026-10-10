import { motion } from "framer-motion";
import { EASE } from "./anim";

const TIMELINE = [
  {
    year: "2022 — Present",
    role: "Freelance Web Developer",
    desc: "Designing and building bespoke websites and web apps for clients across fashion, SaaS, and hospitality.",
    tags: ["React", "Next.js", "Tailwind"],
  },
  {
    year: "2023 — Present",
    role: "Shopify Developer",
    desc: "Crafting custom Shopify storefronts, themes, and checkout experiences that convert.",
    tags: ["Shopify", "Liquid", "Custom UI"],
  },
  {
    year: "2023 — Present",
    role: "UI Designer",
    desc: "Delivering editorial, intentional interfaces with a focus on hierarchy, whitespace, and motion.",
    tags: ["Figma", "Design Systems", "Prototyping"],
  },
  {
    year: "2024 — Present",
    role: "AI-powered Web Solutions",
    desc: "Integrating conversational AI, prompt engineering, and automation into modern web products.",
    tags: ["LLMs", "Prompt Eng.", "APIs"],
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      className="section relative bg-ink text-paper py-32 md:py-48"
    >
      <div className="absolute top-16 left-6 md:left-16 text-[10px] tracking-[0.3em] uppercase text-paper/40">
        Experience
      </div>

      <div className="px-6 md:px-16">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="font-display font-light text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tightest mb-20 md:mb-28 max-w-4xl"
        >
          The work so <span className="text-mango">far.</span>
        </motion.h2>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-paper/10" />
          <div className="space-y-16 md:space-y-24">
            {TIMELINE.map((item, i) => (
              <TimelineItem key={item.role} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  index,
}: {
  item: (typeof TIMELINE)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.9, delay: index * 0.05, ease: EASE }}
      className="relative pl-8 md:pl-16 group"
    >
      <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-mango group-hover:scale-150 transition-transform duration-500" />
      <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-mango/30 group-hover:scale-[3] transition-transform duration-700 -z-0" />

      <p className="text-xs tracking-[0.2em] uppercase text-mango mb-3">
        {item.year}
      </p>
      <h3 className="font-display font-medium text-[clamp(1.5rem,3.5vw,2.75rem)] tracking-tightest leading-[1.05] mb-3">
        {item.role}
      </h3>
      <p className="text-base text-paper/60 max-w-xl leading-relaxed mb-4">
        {item.desc}
      </p>
      <div className="flex flex-wrap gap-2">
        {item.tags.map((t) => (
          <span
            key={t}
            className="text-[10px] tracking-[0.15em] uppercase px-3 py-1 border border-paper/15 text-paper/50"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
