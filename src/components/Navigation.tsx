import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToId } from "./SmoothScroll";
import { Magnetic } from "./anim";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function Navigation() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      const mid = window.innerHeight / 2;
      let current = "home";
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= mid) current = s.id;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between"
      >
        <button
          onClick={() => go("home")}
          className="font-display text-xl tracking-tightest text-paper mix-blend-difference"
        >
          VISHAL<span className="text-mango">.</span>
        </button>

        <nav className="hidden md:flex items-center gap-1 rounded-full border border-paper/15 bg-ink/30 backdrop-blur-md px-2 py-2">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => go(s.id)}
              className="relative px-4 py-1.5 text-sm font-medium text-paper/70 hover:text-paper transition-colors"
            >
              {active === s.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-mango"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span
                className={`relative z-10 ${active === s.id ? "text-ink" : ""}`}
              >
                {s.label}
              </span>
            </button>
          ))}
        </nav>

        <Magnetic strength={0.4} className="hidden md:block">
          <button
            onClick={() => go("contact")}
            className="rounded-full bg-paper text-ink text-sm font-semibold px-5 py-2.5 hover:bg-mango transition-colors"
          >
            Let's Talk
          </button>
        </Magnetic>

        <button
          className="md:hidden flex flex-col gap-1.5 z-50"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          <span
            className={`block w-6 h-px bg-paper transition-transform ${
              open ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-paper transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-px bg-paper transition-transform ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-ink flex flex-col items-center justify-center gap-6 md:hidden"
          >
            {SECTIONS.map((s, i) => (
              <motion.button
                key={s.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                onClick={() => go(s.id)}
                className="font-display text-4xl text-paper"
              >
                {s.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
