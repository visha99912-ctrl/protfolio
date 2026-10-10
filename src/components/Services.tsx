import { motion } from "framer-motion";
import { EASE, Reveal } from "./anim";

const SERVICES = [
  {
    n: "01",
    title: "Portfolio Websites",
    desc: "Personal brands that feel cinematic and unforgettable.",
    tags: ["React", "Framer Motion", "Lenis"],
  },
  {
    n: "02",
    title: "Business Websites",
    desc: "Professional presence engineered to convert visitors.",
    tags: ["Next.js", "SEO", "CMS"],
  },
  {
    n: "03",
    title: "Shopify Store Development",
    desc: "Custom storefronts that sell with elegance and speed.",
    tags: ["Shopify", "Liquid", "Custom UI"],
  },
  {
    n: "04",
    title: "Landing Pages",
    desc: "Focused single-page experiences built for conversion.",
    tags: ["React", "Tailwind", "A/B ready"],
  },
  {
    n: "05",
    title: "UI/UX Design",
    desc: "Editorial, intentional interfaces with a premium feel.",
    tags: ["Figma", "Design System", "Prototype"],
  },
  {
    n: "06",
    title: "Website Redesign",
    desc: "Breathing new life into tired, underperforming sites.",
    tags: ["Audit", "Design", "Rebuild"],
  },
  {
    n: "07",
    title: "Website Optimization",
    desc: "Speed, SEO, and Core Web Vitals tuned to perfection.",
    tags: ["Performance", "SEO", "Vitals"],
  },
  {
    n: "08",
    title: "AI Chatbot Integration",
    desc: "Conversational AI that assists, qualifies, and converts.",
    tags: ["LLM", "Prompt Eng.", "API"],
  },
  {
    n: "09",
    title: "Custom React Applications",
    desc: "Tailored web apps built component-first, scale-ready.",
    tags: ["React", "TypeScript", "API"],
  },
  {
    n: "10",
    title: "Responsive Web Development",
    desc: "Pixel-perfect across every screen, every breakpoint.",
    tags: ["Mobile-first", "Tailwind", "A11y"],
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="section relative bg-ink text-paper py-32 md:py-48"
    >
      <div className="absolute top-16 left-6 md:left-16 text-[10px] tracking-[0.3em] uppercase text-paper/40">
        Services
      </div>

      <div className="px-6 md:px-16">
        <Reveal>
          <h2 className="font-display font-light text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tightest mb-20 md:mb-28 max-w-4xl">
            What I can <span className="text-mango">build</span> for you.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-paper/10 border border-paper/10">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.n} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.1, ease: EASE }}
      className="group relative bg-ink p-8 md:p-12 overflow-hidden cursor-pointer"
      data-cursor="hover"
    >
      {/* Hover fill */}
      <motion.div
        className="absolute inset-0 bg-paper origin-bottom"
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ scaleY: 0 }}
      />

      <div className="relative z-10 group-hover:text-ink transition-colors duration-500">
        <div className="flex items-start justify-between mb-8">
          <span className="text-sm font-mono text-paper/40 group-hover:text-ink/50 transition-colors duration-500">
            {service.n}
          </span>
          <motion.span
            className="text-mango opacity-0 group-hover:opacity-100 group-hover:text-ink transition-opacity duration-500"
            initial={{ rotate: -45 }}
            whileHover={{ rotate: 0 }}
          >
            →
          </motion.span>
        </div>

        <h3 className="font-display font-medium text-[clamp(1.5rem,3vw,2.5rem)] tracking-tightest leading-[1.05] mb-4">
          {service.title}
        </h3>
        <p className="text-sm text-paper/60 group-hover:text-ink/70 transition-colors duration-500 max-w-md mb-6">
          {service.desc}
        </p>

        <div className="flex flex-wrap gap-2">
          {service.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] tracking-[0.15em] uppercase px-3 py-1 border border-paper/20 group-hover:border-ink/20 text-paper/60 group-hover:text-ink/60 transition-colors duration-500"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
