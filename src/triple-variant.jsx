import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Check } from './icons.jsx';
import { SectionHead, Reveal, Pill } from './ui.jsx';

const VARIANTS = [
  {
    tone: 'Direct',
    color: 'em',
    label: 'Says it plain',
    text: 'The async lesson is underrated. Most teams skip it because the calendar feels safer than the whiteboard. Worth the discomfort.',
    chars: 143,
  },
  {
    tone: 'Contrarian',
    color: 'vi',
    label: 'Pushes back',
    text: "I'd push back on one piece: async-first only works if you've already nailed documentation culture. Most teams haven't — so you're trading one blocker for another.",
    chars: 168,
  },
  {
    tone: 'Curious',
    color: 'em',
    label: 'Opens a thread',
    text: "Genuine question — how long until a new hire feels productive after you ship this? Curious if async onboarding holds under pressure or needs a sync escape hatch.",
    chars: 165,
  },
];

const TONE_COLORS = {
  em: {
    bg: 'bg-em-500/[0.07]',
    border: 'border-em-500/25',
    glow: 'rgba(16,185,129,.35)',
    pill: 'bg-em-500/15 text-em-300',
    dot: 'bg-em-400',
    ring: 'ring-em-500/40',
  },
  vi: {
    bg: 'bg-vi-500/[0.07]',
    border: 'border-vi-500/25',
    glow: 'rgba(139,92,246,.35)',
    pill: 'bg-vi-500/15 text-vi-300',
    dot: 'bg-vi-400',
    ring: 'ring-vi-500/40',
  },
};

function VariantCard({ variant, index, isActive, onClick }) {
  const c = TONE_COLORS[variant.color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className={`
        relative rounded-2xl border p-4 cursor-pointer transition-all duration-300
        ${isActive ? `${c.bg} ${c.border} ring-1 ${c.ring} shadow-lg` : 'bg-black/20 border-white/[0.06] hover:border-white/[0.12]'}
      `}
      style={isActive ? { boxShadow: `0 0 32px -8px ${c.glow}` } : {}}
    >
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? c.dot : 'bg-white/20'} transition-colors duration-300`}></span>
          <span className={`text-[10px] uppercase tracking-[0.16em] font-semibold transition-colors duration-300 ${isActive ? (variant.color === 'em' ? 'text-em-300' : 'text-vi-300') : 'text-white/40'}`}>
            {variant.tone}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9.5px] font-mono text-white/25">{variant.label}</span>
          <AnimatePresence>
            {isActive && (
              <motion.span
                key="check"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2, type: 'spring', stiffness: 400, damping: 20 }}
                className={`w-5 h-5 rounded-full grid place-items-center shrink-0 ${variant.color === 'em' ? 'bg-em-500/20 text-em-300' : 'bg-vi-500/20 text-vi-300'}`}
              >
                <Check size={10} stroke={2.5} />
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
      <p className={`text-[12.5px] leading-relaxed transition-colors duration-300 ${isActive ? 'text-white/90' : 'text-white/50'}`}>
        {variant.text}
      </p>
      <div className="mt-2.5 flex items-center justify-between">
        <span className="text-[9.5px] font-mono text-white/25">{variant.chars}c</span>
        <AnimatePresence>
          {isActive && (
            <motion.span
              key="use"
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 6 }}
              transition={{ duration: 0.2 }}
              className={`text-[10px] font-semibold ${variant.color === 'em' ? 'text-em-300' : 'text-vi-300'}`}
            >
              Use this →
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export function TripleVariant() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive(i => (i + 1) % 3), 2600);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section className="relative py-28 border-t border-white/[0.05] overflow-hidden">
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 -translate-y-1/2 -left-48 w-[500px] h-[500px] rounded-full"
             style={{ background: 'radial-gradient(closest-side, rgba(16,185,129,.1), transparent 70%)' }}></div>
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full"
             style={{ background: 'radial-gradient(closest-side, rgba(139,92,246,.1), transparent 70%)' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div>
            <Reveal>
              <Pill tone="vi" icon={Sparkles} className="mb-5">Hidden feature</Pill>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.025em] leading-[1.08] text-white mb-5">
                Three takes.<br/>
                <span style={{ background: 'linear-gradient(135deg, #10b981, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  One send.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[16px] text-white/65 leading-relaxed mb-8 max-w-md">
                Every generation returns three takes at once — different angles, different tones, same voice. Direct, contrarian, or curious. Pick the one that fits the moment.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { k: '×3', v: 'per generate' },
                  { k: '<1s', v: 'all at once' },
                  { k: '0', v: 'rewrites needed' },
                ].map(({ k, v }, i) => (
                  <div key={i} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-4 text-center">
                    <div className="text-[22px] font-bold font-mono tabular-nums leading-none"
                         style={{ background: 'linear-gradient(135deg, #10b981, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      {k}
                    </div>
                    <div className="text-[10px] text-white/40 mt-1.5 uppercase tracking-[0.14em]">{v}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="mt-6 flex items-center gap-2">
                <Zap size={13} className="text-vi-300 shrink-0" />
                <p className="text-[12.5px] text-white/45 leading-relaxed">
                  Not mentioned anywhere. You only discover it the first time you hit generate.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right — animated mock */}
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Context: the post being replied to */}
            <Reveal delay={0.08}>
              <div className="rounded-2xl border border-white/[0.07] bg-black/25 p-4 mb-3">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-full shrink-0"
                       style={{ background: 'linear-gradient(135deg, #60a5fa, #8b5cf6)' }}></div>
                  <div>
                    <div className="text-[11.5px] font-semibold text-white/80">Lena Marsh</div>
                    <div className="text-[10px] text-white/35">@lenabuilds · 4h ago</div>
                  </div>
                </div>
                <p className="text-[12px] text-white/60 leading-relaxed">
                  We went async-first six months ago and I genuinely don't know how we survived before. The clarity it forces is the actual product.
                </p>
              </div>
            </Reveal>

            {/* "Generating..." pill */}
            <Reveal delay={0.12}>
              <div className="flex items-center gap-2 mb-3 px-1">
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-1.5 h-1.5 rounded-full bg-em-400"
                ></motion.div>
                <span className="text-[10.5px] text-white/40 font-mono">3 variants ready</span>
                <span className="ml-auto text-[9.5px] font-mono text-white/25 bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 rounded-full">
                  {paused ? 'hover paused' : 'auto-cycling'}
                </span>
              </div>
            </Reveal>

            {/* Variant cards */}
            <div className="space-y-2.5">
              {VARIANTS.map((v, i) => (
                <VariantCard
                  key={i}
                  variant={v}
                  index={i}
                  isActive={active === i}
                  onClick={() => { setActive(i); setPaused(true); }}
                />
              ))}
            </div>

            {/* Dot indicators */}
            <Reveal delay={0.3}>
              <div className="flex items-center justify-center gap-1.5 mt-4">
                {[0, 1, 2].map(i => (
                  <button
                    key={i}
                    onClick={() => { setActive(i); setPaused(true); }}
                    className={`rounded-full transition-all duration-300 ${active === i ? 'w-4 h-1.5 bg-em-400' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/35'}`}
                  />
                ))}
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
