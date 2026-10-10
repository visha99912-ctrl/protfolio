import { motion } from "framer-motion";
import { EASE, Reveal } from "./anim";

type Project = {
  title: string;
  category: string;
  desc: string;
  tech: string[];
  image: string;
  link?: string;
  accent?: boolean;
};

const PROJECTS: Project[] = [
  {
    title: "Infi Clothing",
    category: "Modern Fashion E-commerce Platform",
    desc: "A contemporary fashion storefront built for speed, fluid browsing, and a premium brand feel across every device.",
    tech: ["React", "Tailwind", "Responsive Design", "Custom UI"],
    image:
      "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1400",
    link: "https://inficlothing.in/",
    accent: true,
  },
  {
    title: "Kellywearstler",
    category: "Luxury Interior Studio Website",
    desc: "An editorial showcase for an interior design studio — slow scroll, generous whitespace, image-led storytelling.",
    tech: ["Next.js", "Framer Motion", "Sanity CMS"],
    image:
    "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1400",
    link: "https://www.kellywearstler.com/",
    accent: true,
  },
  {
    title: "Reflection AI",
    category: "AI Business Dashboard",
    desc: "Reflection AI is an artificial intelligence company developing advanced AI models designed to reason, solve complex problems, and perform real-world tasks.",
    tech: ["React", "TypeScript", "OpenAI", "WebSockets"],
    image:
      "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1400",
       link: "https://reflection.ai/",
    accent: true,
  },
  {
    title: "Aman",
    category: "Modern Restaurant Website",
    desc: "Aman is a global luxury hospitality brand known for its ultra-exclusive resorts and hotels, blending exceptional architecture.",
    tech: ["Next.js", "Tailwind", "Vercel"],
    image:
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1400",
      link: "https://www.aman.com/",
    accent: true,
  },
  {
    title: "Nick",
    category: "Architecture Portfolio",
    desc: "A monolithic, image-first portfolio for an architecture practice with pinned project case studies.",
    tech: ["React", "Lenis", "GSAP"],
    image:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1400",
       link: "https://www.nicholasgurney.com.au/",
    accent: true,
  },
  {
    title: "Vitalis",
    category: "Healthcare Landing Page",
    desc: "A calming, accessible landing experience for a digital health product, tuned for trust and conversion.",
    tech: ["Next.js", "Tailwind", "A11y"],
    image:
      "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    title: "Ledger",
    category: "Fintech Dashboard",
    desc: "A clean, data-dense financial dashboard with modular widgets and a restrained, confident palette.",
    tech: ["React", "TypeScript", "D3", "REST APIs"],
    image:
      "https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
  {
    title: "Studio Mono",
    category: "Creative Agency Website",
    desc: "A bold, type-driven agency site with horizontal scroll case studies and playful micro-interactions.",
    tech: ["React", "Framer Motion", "Lenis"],
    image:
      "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1400",
  },
 
];

export function Projects() {
  return (
    <section
      id="projects"
      className="section relative bg-paper text-ink py-32 md:py-48"
    >
      <div className="absolute top-16 left-6 md:left-16 text-[10px] tracking-[0.3em] uppercase text-ink/40">
        Featured Work
      </div>

      <div className="px-6 md:px-16">
        <Reveal>
          <h2 className="font-display font-light text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] tracking-tightest mb-20 md:mb-28 max-w-4xl">
            Selected <span className="text-outline">projects.</span>
          </h2>
        </Reveal>

        <div className="space-y-24 md:space-y-40">
          {PROJECTS.map((p, i) => (
            <ProjectRow key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 1, ease: EASE }}
      className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center ${
        flip ? "md:[direction:rtl]" : ""
      }`}
    >
      <div className="md:col-span-7 [direction:ltr] group overflow-hidden">
        <div className="relative overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            loading="lazy"
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: EASE }}
            className="w-full h-[34vh] sm:h-[46vh] md:h-[75vh] object-cover"
          />
          <div className="absolute inset-0 bg-ink/10 group-hover:bg-ink/0 transition-colors duration-700" />
          {project.accent && (
            <span className="absolute top-4 left-4 text-[10px] tracking-[0.2em] uppercase bg-mango text-ink px-3 py-1">
              Live
            </span>
          )}
        </div>
      </div>

      <div className="md:col-span-5 [direction:ltr] flex flex-col gap-5">
        <span className="text-xs tracking-[0.3em] uppercase text-ink/40">
          {String(index + 1).padStart(2, "0")} — {project.category}
        </span>
        <h3 className="font-display font-medium text-[clamp(2rem,4.5vw,3.5rem)] leading-[1] tracking-tightest">
          {project.title}
        </h3>
        <p className="text-base text-ink/70 max-w-md leading-relaxed">
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] tracking-[0.15em] uppercase px-3 py-1 border border-ink/15 text-ink/60"
            >
              {t}
            </span>
          ))}
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline mt-4 text-sm font-medium text-ink w-fit"
          >
            Visit live site →
          </a>
        )}
      </div>
    </motion.article>
  );
}
