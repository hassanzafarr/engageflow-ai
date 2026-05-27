import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Mic, FileText, X, Activity, Quote, Cpu, Wand, Check, Plus, Link, Repeat, Sparkles, ArrowUpRight } from './icons.jsx';
import { SectionHead, Reveal } from './ui.jsx';

const SAMPLE_POSTS = [
  "shipped a thing today that took 4 redesigns to get right. the version that worked was the one I almost deleted at 1am on tuesday. there's a lesson in that I will not be unpacking now.",
  "every \"AI for X\" startup is one prompt-engineering hire away from being a feature inside a bigger tool. moats are still moats.",
  "writing a good error message takes me longer than writing the code that throws it. think that's the job actually.",
];

const VOICE_METRICS = [
  { k: 'Story',  v: 'AI Engineer building tools for builders', icon: () => <Brain size={12}/> },
  { k: 'Voice',  v: 'Casual · dry · short sentences · lowercase opens', icon: () => <Mic size={12}/> },
  { k: 'Vocab',  v: '"ship", "moat", "signal", "loops", "diff"', icon: () => <FileText size={12}/> },
  { k: 'Avoid',  v: 'em-dashes, "game-changer", 🚀 emojis, hype clichés', icon: () => <X size={12}/> },
  { k: 'Cadence', v: 'Open with concrete · land with a single takeaway', icon: () => <Activity size={12}/> },
];

const STEPS = [
  { n: 1, k: 'Connect',  d: 'Paste your handle or 3+ past posts' },
  { n: 2, k: 'Extract',  d: 'Scan structure, vocab, cadence, rules' },
  { n: 3, k: 'Apply',    d: 'Every reply written in your fingerprint' },
];

export function VoiceProfile() {
  const [step, setStep] = React.useState(1);
  const [scanning, setScanning] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [done, setDone] = React.useState(false);

  const runExtract = () => {
    if (scanning || done) return;
    setStep(2);
    setScanning(true);
    setProgress(0);
    let p = 0;
    const id = setInterval(() => {
      p += 2 + Math.random() * 3;
      if (p >= 100) {
        p = 100;
        clearInterval(id);
        setTimeout(() => { setScanning(false); setDone(true); setStep(3); }, 350);
      }
      setProgress(p);
    }, 70);
  };

  const reset = () => { setScanning(false); setDone(false); setProgress(0); setStep(1); };

  return (
    <section id="voice" className="relative py-28 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead
          eyebrow="02 · Voice Profile"
          title="Train it on you, once."
          kicker="Drop in a handful of your past posts. EngageFlow extracts your story, your rules, and the patterns you'd never write down — then writes every reply in that fingerprint."
        />

        <Reveal delay={0.1}>
          <div className="mt-12 max-w-3xl mx-auto flex items-center gap-3 sm:gap-6">
            {STEPS.map((s, i) => (
              <React.Fragment key={s.n}>
                <div className="flex-1 flex items-center gap-3">
                  <div className={`relative w-9 h-9 rounded-full grid place-items-center font-mono text-[12px] font-semibold transition-all
                                ${step >= s.n ? 'bg-em-500 text-ink-950 shadow-[0_0_24px_rgba(16,185,129,.55)]' : 'bg-white/[0.04] border border-white/10 text-white/50'}`}>
                    {step > s.n ? <Check size={14}/> : s.n}
                    {step === s.n && (
                      <span className="absolute inset-0 rounded-full ring-2 ring-em-400/40 animate-ping"></span>
                    )}
                  </div>
                  <div className="hidden sm:block">
                    <div className={`text-[12.5px] font-semibold tracking-tight ${step >= s.n ? 'text-white' : 'text-white/55'}`}>{s.k}</div>
                    <div className="text-[10.5px] text-white/40">{s.d}</div>
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 h-px relative">
                    <div className="absolute inset-0 bg-white/[0.07]"></div>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: step > s.n ? '100%' : '0%' }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-em-400 to-vi-400"
                      style={{ boxShadow: '0 0 12px rgba(139,92,246,.5)' }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.18} className="mt-12">
          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5">
              <div className="glass rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Quote size={14} className="text-vi-300"/>
                    <span className="text-[13px] font-semibold text-white/85">Your past posts</span>
                  </div>
                  <span className="text-[10.5px] font-mono text-white/40">3 / 10 connected</span>
                </div>
                <div className="space-y-2.5">
                  {SAMPLE_POSTS.map((p, i) => (
                    <div key={i} className="relative rounded-xl bg-black/30 border border-white/[0.06] p-3 pl-4">
                      <span className="absolute left-0 top-3 bottom-3 w-[2px] bg-vi-500/60 rounded-r-full"></span>
                      <p className="text-[12.5px] leading-relaxed text-white/75">{p}</p>
                      {scanning && (
                        <motion.div
                          aria-hidden
                          className="absolute inset-y-0 left-0 w-12 pointer-events-none"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 'calc(100% + 20px)', opacity: [0, 1, 1, 0] }}
                          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                          style={{ background: 'linear-gradient(90deg, transparent, rgba(110,231,183,.18), transparent)' }}
                        />
                      )}
                    </div>
                  ))}
                  <button className="w-full py-2.5 rounded-xl border border-dashed border-white/15 text-[12px] text-white/55 hover:text-white/85 hover:border-white/30 transition flex items-center justify-center gap-2">
                    <Plus size={13}/> Paste more posts
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11.5px] text-white/55">
                    <Link size={12}/> linkedin.com/in/yourname
                  </div>
                  <button
                    onClick={done ? reset : runExtract}
                    disabled={scanning}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition
                                ${scanning ? 'bg-white/5 text-white/45 cursor-wait' : done ? 'bg-white/10 text-white/85 hover:bg-white/15' : 'bg-em-500 text-ink-950 hover:bg-em-400 shadow-[0_8px_28px_-8px_rgba(16,185,129,.6)]'}`}>
                    {scanning ? <><Cpu size={12} className="animate-spin"/> Scanning</> : done ? <><Repeat size={12}/> Reset</> : <><Wand size={12}/> Extract voice</>}
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative glass-strong rounded-2xl p-6 overflow-hidden min-h-[420px]">
                <svg aria-hidden className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 420" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="wireA" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0"/>
                      <stop offset="40%" stopColor="#10b981" stopOpacity=".7"/>
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity=".4"/>
                    </linearGradient>
                  </defs>
                  {['M -20 60 C 200 60, 260 160, 380 160','M -20 140 C 220 140, 280 220, 380 220','M -20 220 C 180 220, 280 280, 380 280','M -20 300 C 220 300, 280 340, 380 340'].map((d, i) => (
                    <g key={i}>
                      <path d={d} stroke="rgba(255,255,255,.06)" strokeWidth="1" fill="none"/>
                      {(scanning || done) && (
                        <motion.path
                          d={d} stroke="url(#wireA)" strokeWidth="1.2" fill="none"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: scanning ? [0, 1, 1] : 1, opacity: 1 }}
                          transition={{ duration: 1.6, delay: i * 0.15, repeat: scanning ? Infinity : 0, ease: 'easeInOut' }}
                        />
                      )}
                    </g>
                  ))}
                </svg>

                <div className="relative">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <Brain size={14} className="text-em-300"/>
                      <span className="text-[13px] font-semibold text-white/85">Voice fingerprint</span>
                    </div>
                    <span className={`text-[10.5px] font-mono ${done ? 'text-em-300' : scanning ? 'text-vi-300' : 'text-white/40'}`}>
                      {done ? '● locked' : scanning ? `● scanning · ${Math.round(progress)}%` : '○ waiting'}
                    </span>
                  </div>

                  <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden mb-6">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #10b981, #8b5cf6)', boxShadow: '0 0 12px rgba(139,92,246,.6)' }}
                      animate={{ width: `${done ? 100 : progress}%` }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-2.5">
                    {VOICE_METRICS.map((m, i) => {
                      const revealed = done || (scanning && progress > i * 20 + 5);
                      return (
                        <motion.div
                          key={i}
                          initial={false}
                          animate={{ opacity: revealed ? 1 : 0.25, x: revealed ? 0 : -8, filter: revealed ? 'blur(0)' : 'blur(3px)' }}
                          transition={{ duration: 0.4 }}
                          className={`flex items-center gap-3 rounded-xl border px-4 py-2.5
                                     ${revealed ? 'border-em-500/25 bg-em-500/[0.04]' : 'border-white/[0.06] bg-white/[0.02]'}`}
                        >
                          <span className={`w-7 h-7 rounded-lg grid place-items-center ${revealed ? 'bg-em-500/15 text-em-300' : 'bg-white/[0.04] text-white/30'}`}>
                            <m.icon/>
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="text-[10.5px] uppercase tracking-[0.14em] text-white/45 font-semibold">{m.k}</div>
                            <div className="text-[13px] text-white/85 truncate">{m.v}</div>
                          </div>
                          {revealed && <Check size={14} className="text-em-300 shrink-0"/>}
                        </motion.div>
                      );
                    })}
                  </div>

                  <AnimatePresence>
                    {done && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mt-5 rounded-xl border border-vi-500/30 bg-vi-500/[0.06] px-4 py-3 flex items-center gap-3"
                      >
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-em-400 to-vi-400 grid place-items-center text-ink-950">
                          <Sparkles size={14}/>
                        </div>
                        <div className="flex-1">
                          <div className="text-[13px] font-semibold text-white">Voice locked. Drafts now sound like you.</div>
                          <div className="text-[11px] text-white/55">Re-train any time you change tone. Stored locally.</div>
                        </div>
                        <ArrowUpRight size={16} className="text-vi-300"/>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
