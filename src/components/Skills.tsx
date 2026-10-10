import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const SKILLS = [
  "React", "Next.js", "Tailwind CSS", "Affinity ", "TypeScript",
  "Node.js", "Python", "Shopify", "HTML", "CSS", "Git",
  "Responsive Design", "REST APIs", "AI Integration",
  "Prompt Engineering", "UI/UX Design", "WordPress", "Framer",
  "Figma", "Animations",
];

export function Skills() {
  return (
    <section
      id="skills"
      className="section relative bg-paper text-ink py-32 md:py-48 overflow-hidden"
    >
      <div className="absolute top-16 left-6 md:left-16 text-[10px] tracking-[0.3em] uppercase text-ink/40">
        Skills
      </div>

      <div
        className="px-6 md:px-16 pt-20 md:pt-32"
      >
        <div className="flex flex-wrap gap-x-8 gap-y-6 md:gap-x-14 md:gap-y-12">
          {SKILLS.map((skill, i) => (
            <FloatingSkill key={skill} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FloatingSkill({ skill, index }: { skill: string; index: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 120, damping: 18, mass: 0.4 });
  const rotate = useTransform(sx, [-100, 100], [-6, 6]);

  const big = index % 5 === 0 || index % 7 === 0;

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const radius = 160;
    if (dist < radius) {
      // Push away from cursor, stronger when closer.
      const force = (1 - dist / radius) * 60;
      const angle = Math.atan2(dy, dx);
      mx.set(Math.cos(angle) * force);
      my.set(Math.sin(angle) * force);
    } else {
      mx.set(0);
      my.set(0);
    }
  };

  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy, rotate }}
      className={`font-display font-medium tracking-tightest inline-block will-change-transform ${
        big
          ? "text-[clamp(2rem,5vw,4rem)]"
          : "text-[clamp(1.25rem,3vw,2.25rem)]"
      } text-ink hover:text-mango transition-colors duration-300 cursor-default select-none`}
    >
      {skill}
    </motion.span>
  );
}
