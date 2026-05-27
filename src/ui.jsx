// Small shared UI primitives.
const { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } = window.Motion;

function Reveal({ children, delay = 0, y = 24, className = "", once = true, as: As = motion.div }) {
  return (
    <As
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once, margin: "-80px" }}
      className={className}
    >
      {children}
    </As>
  );
}

function GlowButton({ children, variant = "em", as: As = "button", className = "", ...rest }) {
  const palette = variant === "em"
    ? "bg-em-500 hover:bg-em-400 text-ink-950 shadow-[0_0_0_1px_rgba(110,231,183,.5),0_8px_30px_-4px_rgba(16,185,129,.55),inset_0_1px_0_rgba(255,255,255,.4)]"
    : variant === "vi"
    ? "bg-vi-500 hover:bg-vi-400 text-white shadow-[0_0_0_1px_rgba(196,181,253,.5),0_8px_30px_-4px_rgba(139,92,246,.55)]"
    : "bg-white/5 hover:bg-white/10 text-white border border-white/15";
  return (
    <As
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-tight transition-all duration-200 active:translate-y-[1px] ${palette} ${className}`}
      {...rest}
    >
      {children}
    </As>
  );
}

function GhostButton({ children, className = "", as: As = "button", ...rest }) {
  return (
    <As
      className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-tight text-white/85 border border-white/15 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/25 backdrop-blur-sm transition ${className}`}
      {...rest}
    >
      {children}
    </As>
  );
}

function Pill({ children, className = "", tone = "neutral", icon: Icon }) {
  const tones = {
    neutral: "bg-white/[0.04] border-white/10 text-white/80",
    em: "bg-em-500/10 border-em-500/30 text-em-300",
    vi: "bg-vi-500/10 border-vi-500/30 text-vi-300",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium tracking-tight border ${tones[tone]} ${className}`}>
      {Icon && <Icon size={12} />}{children}
    </span>
  );
}

// Tilt card — 3D hover tilt + glowing border on hover.
function TiltCard({ children, className = "", glow = "vi", maxTilt = 7, intensity = 1 }) {
  const ref = React.useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });

  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    ry.set((x - 0.5) * maxTilt * 2 * intensity);
    rx.set(-(y - 0.5) * maxTilt * 2 * intensity);
    gx.set(x * 100); gy.set(y * 100);
  };
  const onLeave = () => { rx.set(0); ry.set(0); gx.set(50); gy.set(50); };

  const glowColor = glow === "em" ? "rgba(16,185,129,.35)" : "rgba(139,92,246,.4)";

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      {/* hover glow */}
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-[inherit] opacity-0 pointer-events-none"
        style={{
          background: `radial-gradient(220px circle at ${gx.get()}% ${gy.get()}%, ${glowColor}, transparent 60%)`,
        }}
        animate={{ opacity: 1 }}
      />
      {children}
    </motion.div>
  );
}

// Section wrapper with eyebrow + heading.
function SectionHead({ eyebrow, title, kicker, align = "center", className = "" }) {
  return (
    <div className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && (
        <Reveal delay={0} y={12} className="mb-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.14em] text-em-300 bg-em-500/10 border border-em-500/25">
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05} className="mb-4">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-grad-2 leading-[1.05]">
          {title}
        </h2>
      </Reveal>
      {kicker && (
        <Reveal delay={0.1}>
          <p className="text-white/60 text-lg leading-relaxed">{kicker}</p>
        </Reveal>
      )}
    </div>
  );
}

Object.assign(window, { Reveal, GlowButton, GhostButton, Pill, TiltCard, SectionHead });
