import { motion } from "framer-motion";
import { EASE, Magnetic, RippleButton, SplitChars } from "./anim";

const WHATSAPP_NUMBER = "917010220206";
const WHATSAPP_TEXT = encodeURIComponent(
  "Hi Vishal, I'd love to build something amazing with you."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT}`;

export function Contact() {
  return (
    <section
      id="contact"
      className="section relative bg-ink text-paper py-32 md:py-56 overflow-hidden"
    >
      {/* Soft mango glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-mango/10 blur-[120px] breathe" />
      </div>

      <div className="absolute top-16 left-6 md:left-16 text-[10px] tracking-[0.3em] uppercase text-paper/40">
        Contact
      </div>

      <div className="relative z-10 px-6 md:px-16 flex flex-col items-center justify-center text-center gap-10">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-xs tracking-[0.3em] uppercase text-mango"
        >
          Let's talk
        </motion.span>

        <h2 className="font-display font-light leading-[0.95] tracking-tightest text-[clamp(2.5rem,9vw,8rem)]">
          <SplitChars text="Let's Build" className="block" stagger={0.04} />
          <SplitChars
            text="Something"
            className="block text-outline"
            stagger={0.04}
            delay={0.2}
          />
          <SplitChars
            text="Amazing."
            className="block text-mango"
            stagger={0.04}
            delay={0.4}
          />
        </h2>

        <p className="text-base text-paper/60 max-w-md">
          One message away. No forms, no friction — just a real conversation
          about your idea.
        </p>

        <Magnetic strength={0.4}>
          <RippleButton
            onClick={() => window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer")}
            className="group relative inline-flex items-center gap-3 rounded-full bg-mango text-ink px-10 py-5 font-display font-medium text-lg tracking-tightest hover:bg-paper transition-colors duration-500"
          >
            <span>Contact Me</span>
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </RippleButton>
        </Magnetic>

        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
          className="text-sm text-paper/50 link-underline"
        >
          +91 70102 22066 · WhatsApp
        </motion.a>
      </div>
    </section>
  );
}
