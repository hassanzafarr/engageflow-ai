import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, ThumbsDown, Smile, MessageCircle, Sparkles, Repeat, Settings, Cpu, Send, FileText, Wand, Clock, Linkedin } from './icons.jsx';
import { SectionHead, Reveal, Pill } from './ui.jsx';

const INTENTS = [
  { id: 'add_value',    label: 'Add Value',   icon: ThumbsUp,      accent: '#10b981' },
  { id: 'offer_alt',    label: 'Offer Alt.',  icon: ThumbsDown,    accent: '#8b5cf6' },
  { id: 'funny',        label: 'Funny',       icon: Smile,         accent: '#fbbf24' },
  { id: 'ask_question', label: 'Ask Question',icon: MessageCircle, accent: '#60a5fa' },
];

const LENGTHS = [
  { id: 'short',  label: 'Short',  chars: 80, ring: 0.25 },
  { id: 'medium', label: 'Medium', chars: 160, ring: 0.45 },
  { id: 'long',   label: 'Long',   chars: 300, ring: 0.72 },
];

const ORIGINAL_POST = {
  author: 'Sasha Lee',
  role: 'CEO @ Filtertree · AI ops',
  text: "Hot take: prompt engineering is a 2024 skill. By Q3 2026 every team will just have one person who 'knows how to think clearly' and the model does the rest. The bottleneck moves from syntax to specification.",
  network: 'in',
};

const REPLIES = {
  add_value: {
    short:  "Specification is the new leverage. The person who can write a requirement so tight that any intelligent system — human or model — can execute it without back-and-forth is worth ten prompt wizards.",
    medium: "Specification is the new leverage. The person who can write a requirement so tight that any intelligent system — human or model — can execute it without back-and-forth is worth ten prompt wizards. Most orgs don't train for this because they've always relied on verbal handoffs. That's the real gap to close.",
    long:   "Specification is the new leverage. The person who can write a requirement so tight that any intelligent system — human or model — can execute it without back-and-forth is worth ten prompt wizards. Most orgs don't train for this because they've always relied on verbal handoffs. That's the real gap to close. The second-order effect: good specs surface which decisions still have no owner. You can't specify what hasn't been decided — and 'just ask the AI' lets that ambiguity hide longer than it should."
  },
  offer_alt: {
    short:  "Counterpoint: spec clarity is harder to develop than prompt fluency, and far rarer. The bottleneck moves — it doesn't shrink.",
    medium: "Counterpoint: spec clarity is harder to develop than prompt fluency, and far rarer. The bottleneck moves — it doesn't shrink. \"Thinking clearly\" is the scarcest skill in most orgs; we just don't measure for it because every JD asks for tool years instead.",
    long:   "Counterpoint: spec clarity is harder to develop than prompt fluency, and far rarer. The bottleneck moves — it doesn't shrink. \"Thinking clearly\" is the scarcest skill in most orgs; we just don't measure for it because every JD asks for tool years instead. Also worth noting: spec-first only works when the cost of being wrong is low. For irreversible decisions — pricing, infra cutovers, hiring — you still want the messy back-and-forth a sharp engineer brings. The model accelerates a band of work, not all of it."
  },
  funny: {
    short:  "every PM I've worked with for ten years just felt a great disturbance in the force, as if their job title was suddenly worth $40k more.",
    medium: "every PM I've worked with for ten years just felt a great disturbance in the force, as if their job title was suddenly worth $40k more. meanwhile the prompt engineering bootcamp grads are checking the return policy on their merch.",
    long:   "every PM I've worked with for ten years just felt a great disturbance in the force, as if their job title was suddenly worth $40k more. meanwhile the prompt engineering bootcamp grads are checking the return policy on their merch. somewhere a CTO is workshopping the LinkedIn post where he discovers 'requirements documents' for the first time and presents it as a paradigm shift. can't wait to hear the keynote."
  },
  ask_question: {
    short:  "What does 'thinking clearly' produce in your workflow — a doc, a decision log, a test set? Genuinely want to know what the artifact looks like.",
    medium: "What does 'thinking clearly' produce in your workflow — a doc, a decision log, a test set? Genuinely want to know what the artifact looks like. Because if we can't name the output, we can't hire for it or teach it — which is the same problem prompt engineering had.",
    long:   "What does 'thinking clearly' produce in your workflow — a doc, a decision log, a test set? Genuinely want to know what the artifact looks like. Because if we can't name the output, we can't hire for it or teach it — which is the same problem prompt engineering had. Also: who reviews the spec? If specs are the new code, there should be a spec-review loop. Have you formalized that, or is it still 'the senior person does a vibe check'?"
  }
};

export function Composer() {
  const [intent, setIntent] = React.useState('add_value');
  const [length, setLength] = React.useState('short');
  const [phase, setPhase] = React.useState('idle');
  const [typed, setTyped] = React.useState('');
  const [ringProgress, setRingProgress] = React.useState(0);
  const fullReplyRef = React.useRef('');
  const typeTimerRef = React.useRef(null);
  const ringTimerRef = React.useRef(null);

  const ringCfg = LENGTHS.find(l => l.id === length);
  const targetRing = ringCfg.ring;
  const intentObj = INTENTS.find(i => i.id === intent);

  const clearTimers = () => {
    if (typeTimerRef.current) { clearInterval(typeTimerRef.current); typeTimerRef.current = null; }
    if (ringTimerRef.current) { clearInterval(ringTimerRef.current); ringTimerRef.current = null; }
  };

  const generate = () => {
    clearTimers();
    setPhase('generating');
    setTyped('');
    setRingProgress(0);
    const full = REPLIES[intent][length];
    fullReplyRef.current = full;

    const start = performance.now();
    const DURATION = 900;
    ringTimerRef.current = setInterval(() => {
      const t = Math.min(1, (performance.now() - start) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      setRingProgress(eased * targetRing);
      if (t >= 1) { clearInterval(ringTimerRef.current); ringTimerRef.current = null; }
    }, 16);

    setTimeout(() => {
      let i = 0;
      typeTimerRef.current = setInterval(() => {
        i += Math.max(1, Math.round(full.length / 90));
        if (i >= full.length) {
          i = full.length;
          clearInterval(typeTimerRef.current); typeTimerRef.current = null;
          setPhase('done');
        }
        setTyped(full.slice(0, i));
      }, 22);
    }, DURATION + 80);
  };

  const reset = () => { clearTimers(); setPhase('idle'); setTyped(''); setRingProgress(0); };

  React.useEffect(() => () => clearTimers(), []);

  React.useEffect(() => {
    if (phase === 'done') { setPhase('idle'); setTyped(''); setRingProgress(0); }
  }, [intent, length]);

  const R = 70;
  const C = 2 * Math.PI * R;

  return (
    <section id="composer" className="relative py-28 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead
          eyebrow="03 · Live Composer"
          title="Three taps to a reply worth posting."
          kicker="Pick intent. Pick length. EngageFlow drafts the comment in your voice — humanized, on-context, ready to send."
        />

        <Reveal delay={0.18} className="mt-12">
          <div className="grid lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="glass rounded-2xl p-5">
                <div className="text-[10px] uppercase tracking-[0.14em] text-white/40 mb-3 font-semibold">Replying to</div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0a66c2]/20 text-[#67aaf0] grid place-items-center font-semibold text-[13px] shrink-0 relative">
                    SL
                    <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#0a66c2] border-2 border-ink-850 grid place-items-center">
                      <Linkedin size={8} className="text-white"/>
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13.5px] font-semibold text-white/90 leading-tight">{ORIGINAL_POST.author}</div>
                    <div className="text-[11px] text-white/45 mb-2">{ORIGINAL_POST.role}</div>
                    <p className="text-[13.5px] leading-relaxed text-white/80">{ORIGINAL_POST.text}</p>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-5">
                <div className="text-[10px] uppercase tracking-[0.14em] text-white/40 mb-3 font-semibold">Intent</div>
                <div className="grid grid-cols-4 gap-2">
                  {INTENTS.map((it) => {
                    const Ic = it.icon;
                    const active = intent === it.id;
                    return (
                      <button key={it.id} onClick={() => setIntent(it.id)} className="relative">
                        {active && (
                          <motion.span layoutId="intent-active"
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                            className="absolute inset-0 rounded-xl border"
                            style={{ borderColor: it.accent + '66', background: it.accent + '14', boxShadow: `0 0 0 1px ${it.accent}55, 0 8px 28px -10px ${it.accent}99` }}/>
                        )}
                        <span className={`relative flex flex-col items-center gap-1.5 py-2.5 rounded-xl border transition
                          ${active ? 'border-transparent' : 'border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04]'}`}>
                          <Ic size={16} className={active ? '' : 'text-white/60'} style={active ? { color: it.accent } : {}}/>
                          <span className={`text-[11px] font-semibold ${active ? 'text-white' : 'text-white/55'}`}>{it.label}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div className="text-[10px] uppercase tracking-[0.14em] text-white/40 font-semibold">Length</div>
                  <span className="font-mono text-[11px] text-white/55 tabular-nums">~{ringCfg.chars} chars</span>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {LENGTHS.map((l) => {
                    const active = length === l.id;
                    return (
                      <button key={l.id} onClick={() => setLength(l.id)}
                        className={`relative py-2 rounded-xl border text-[12px] font-semibold transition
                          ${active ? 'border-em-500/40 bg-em-500/10 text-em-200 shadow-[0_0_0_1px_rgba(16,185,129,.3)]' : 'border-white/[0.07] bg-white/[0.02] text-white/55 hover:bg-white/[0.04]'}`}>
                        {l.label}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-5 flex items-center gap-2">
                  <button
                    onClick={phase === 'done' ? reset : generate}
                    disabled={phase === 'generating'}
                    className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition
                      ${phase === 'generating' ? 'bg-white/[0.04] text-white/40 cursor-wait'
                        : phase === 'done' ? 'bg-white/10 text-white/85 hover:bg-white/15'
                        : 'bg-em-500 text-ink-950 hover:bg-em-400 shadow-[0_8px_28px_-8px_rgba(16,185,129,.6)]'}`}>
                    {phase === 'generating' ? <><Cpu size={13} className="animate-spin"/> Drafting</> :
                     phase === 'done' ? <><Repeat size={13}/> Regenerate</> :
                     <><Sparkles size={13}/> Generate reply</>}
                  </button>
                  <button className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.07] grid place-items-center text-white/60 hover:bg-white/[0.07]">
                    <Settings size={14}/>
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative glass-strong rounded-2xl p-6 min-h-[520px] overflow-hidden">
                <div className="absolute top-5 right-5 w-[160px] h-[160px]">
                  <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                    <defs>
                      <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#10b981"/>
                        <stop offset="100%" stopColor="#8b5cf6"/>
                      </linearGradient>
                      <filter id="ringGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" result="blur"/>
                        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                      </filter>
                    </defs>
                    <circle cx="100" cy="100" r={R} stroke="rgba(255,255,255,.06)" strokeWidth="2.5" fill="none"/>
                    {Array.from({ length: 60 }).map((_, i) => {
                      const a = (i / 60) * Math.PI * 2;
                      const x1 = 100 + Math.cos(a) * (R + 8);
                      const y1 = 100 + Math.sin(a) * (R + 8);
                      const x2 = 100 + Math.cos(a) * (R + (i % 5 === 0 ? 14 : 11));
                      const y2 = 100 + Math.sin(a) * (R + (i % 5 === 0 ? 14 : 11));
                      const passed = i / 60 <= ringProgress;
                      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                                   stroke={passed ? '#a78bfa' : 'rgba(255,255,255,.1)'}
                                   strokeWidth={i % 5 === 0 ? 1.3 : 0.7}
                                   opacity={passed ? 0.9 : 1}/>;
                    })}
                    <circle cx="100" cy="100" r={R}
                      stroke="url(#ringGrad)" strokeWidth="4" fill="none" strokeLinecap="round"
                      filter="url(#ringGlow)"
                      strokeDasharray={C}
                      strokeDashoffset={C * (1 - ringProgress)}
                      style={{ transition: 'stroke-dashoffset 80ms linear' }}/>
                    {ringProgress > 0 && (
                      <circle
                        cx={100 + Math.cos((ringProgress * 2 - 0.5) * Math.PI) * R}
                        cy={100 + Math.sin((ringProgress * 2 - 0.5) * Math.PI) * R}
                        r="4" fill="#fff" style={{ filter: 'drop-shadow(0 0 6px #c4b5fd)' }}/>
                    )}
                  </svg>
                  <div className="absolute inset-0 grid place-items-center text-center pointer-events-none">
                    <div>
                      <div className="font-mono text-[26px] font-bold text-white tabular-nums leading-none">
                        {Math.round((typed.length || ringProgress * ringCfg.chars))}
                      </div>
                      <div className="text-[9px] uppercase tracking-[0.18em] text-white/40 mt-1">chars</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-em-400 to-vi-400 grid place-items-center text-ink-950">
                    <Sparkles size={12}/>
                  </div>
                  <div>
                    <div className="text-[12.5px] font-semibold text-white/85">EngageFlow draft</div>
                    <div className="text-[10.5px] text-white/45 font-mono flex items-center gap-2">
                      <span style={{ color: intentObj.accent }}>● {intentObj.label.toLowerCase()}</span>
                      <span className="text-white/30">·</span>
                      <span>{ringCfg.label.toLowerCase()}</span>
                      <span className="text-white/30">·</span>
                      <span>{phase === 'idle' ? 'idle' : phase === 'generating' ? 'streaming' : 'ready'}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-2 max-w-[calc(100%-180px)] pr-2">
                  {phase === 'idle' && (
                    <motion.div
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="rounded-xl border border-dashed border-white/10 px-4 py-8 text-center text-[13px] text-white/40">
                      Press <span className="text-em-300 font-semibold">Generate reply</span> to see your draft stream in.
                    </motion.div>
                  )}

                  {phase !== 'idle' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl bg-black/30 border border-white/[0.06] p-4 text-[14px] leading-relaxed text-white/85 min-h-[180px]">
                      <span className="text-em-300">{'>'}</span>{' '}
                      {typed}
                      {phase === 'generating' && (
                        <span className="inline-block w-1.5 h-4 align-text-bottom bg-em-400 ml-0.5 animate-pulse"></span>
                      )}
                    </motion.div>
                  )}

                  <AnimatePresence>
                    {phase === 'done' && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mt-4 flex flex-wrap items-center gap-2">
                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold bg-em-500 text-ink-950 hover:bg-em-400 shadow-[0_8px_24px_-8px_rgba(16,185,129,.6)]">
                          <Send size={12}/> Post to LinkedIn
                        </button>
                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] text-white/80 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08]">
                          <FileText size={12}/> Copy
                        </button>
                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] text-white/80 bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08]">
                          <Wand size={12}/> Refine
                        </button>
                        <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] text-white/45 font-mono">
                          <Clock size={11}/> 392ms · Claude Haiku 4.5
                        </span>
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
