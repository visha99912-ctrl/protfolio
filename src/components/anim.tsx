import { motion, useInView, useMotionValue, useSpring, Variants } from "framer-motion";
import { ReactNode, useRef } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT = [0.77, 0, 0.175, 1] as const;

/** Reveal children when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Split a string into characters and stagger-reveal them. */
export function SplitChars({
  text,
  className = "",
  delay = 0,
  stagger = 0.03,
  y = 60,
  once = true,
  outline = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  y?: number;
  once?: boolean;
  outline?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });
  const chars = text.split("");

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
  const child: Variants = {
    hidden: { y, opacity: 0, rotateX: -40 },
    show: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: { duration: 1, ease: EASE },
    },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${outline ? "text-outline" : ""} ${className}`}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      style={{ perspective: 800 }}
    >
      {chars.map((c, i) => (
        <motion.span
          key={i}
          variants={child}
          className="inline-block"
          style={{ whiteSpace: c === " " ? "pre" : "normal" }}
        >
          {c}
        </motion.span>
      ))}
    </motion.span>
  );
}

/** Split into words and stagger-reveal. */
export function SplitWords({
  text,
  className = "",
  delay = 0,
  stagger = 0.08,
  y = 50,
  once = true,
  outline = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  y?: number;
  once?: boolean;
  outline?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });
  const words = text.split(" ");

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const child: Variants = {
    hidden: { y, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 1, ease: EASE } },
  };

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${outline ? "text-outline" : ""} ${className}`}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {words.map((w, i) => (
        <motion.span key={i} variants={child} className="inline-block">
          {w}
          {i < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
}

/** Mask reveal: content slides up from behind a clip. */
export function MaskReveal({
  children,
  delay = 0,
  className = "",
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "110%" }}
        animate={inView ? { y: "0%" } : { y: "110%" }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Magnetic hover wrapper for buttons / links. */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    x.set(mx * strength);
    y.set(my * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`magnetic ${className}`}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
    >
      {children}
    </motion.div>
  );
}

/** Ripple effect button. */
export function RippleButton({
  children,
  onClick,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    const btn = ref.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(r.width, r.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${e.clientX - r.left - size / 2}px`;
    ripple.style.top = `${e.clientY - r.top - size / 2}px`;
    ripple.style.position = "absolute";
    ripple.style.borderRadius = "9999px";
    ripple.style.background = "rgba(244,185,66,0.35)";
    ripple.style.transform = "scale(0)";
    ripple.style.opacity = "1";
    ripple.style.pointerEvents = "none";
    ripple.style.transition = "transform 0.7s ease-out, opacity 0.9s ease-out";
    btn.appendChild(ripple);
    requestAnimationFrame(() => {
      ripple.style.transform = "scale(2.4)";
      ripple.style.opacity = "0";
    });
    setTimeout(() => ripple.remove(), 1000);
    onClick?.();
  };

  return (
    <button
      ref={ref}
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
    >
      {children}
    </button>
  );
}
