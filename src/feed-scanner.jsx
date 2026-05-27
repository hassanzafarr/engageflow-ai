import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Star, Zap, Wand, Linkedin, Xtwitter, Heart, MessageCircle, Repeat } from './icons.jsx';
import { Reveal, Pill } from './ui.jsx';

const FEED_POSTS = [
  { id: 1, author: 'Maya Chen', handle: 'mayabuilds', role: 'Founder · Lattice AI', score: 94, topic: 'Retention loops', tone: 'em',
    text: 'Spent the week measuring what we thought was a retention problem. Turns out 60% of churn happens before users finish onboarding — the "product" never actually loaded for them. Onboarding IS the product.',
    likes: 412, replies: 38, network: 'in' },
  { id: 2, author: 'Devon R.', handle: 'd_r_w', role: 'Eng @ Resend', score: 88, topic: 'Dev tools', tone: 'em',
    text: 'Hot take: every dev tool startup eventually rebuilds its own SDK three times. The first one is "MVP". The second is "good". The third is the one users actually love. Skip to three.',
    likes: 1240, replies: 92, network: 'x' },
  { id: 3, author: 'Priya N.', handle: 'priyan', role: 'Design Lead', score: 81, topic: 'AI design', tone: 'em',
    text: "AI features die when they're styled like AI. Glowing borders, sparkle icons, \"generating...\" spinners — your users learn to ignore that visual vocabulary. Hide the magic. Show the result.",
    likes: 803, replies: 47, network: 'in' },
  { id: 4, author: 'Sam K.', handle: 'samk', role: 'Growth · B2B SaaS', score: 76, topic: 'Pricing', tone: 'em',
    text: 'Pricing pages convert best when there are exactly 3 plans and the middle one looks slightly inevitable. Everything else is a research project.',
    likes: 522, replies: 31, network: 'in' },
  { id: 5, author: 'Lex M.', handle: 'lexmtweets', role: 'AI Eng', score: 64, topic: 'Models', tone: 'vi',
    text: "Benchmark obsession is back. Reminder that nobody picked Claude because it scored 0.4% higher on MMLU. They picked it because of how it talks at 2am when you're fixing prod.",
    likes: 1880, replies: 220, network: 'x' },
  { id: 6, author: 'Aiden P.', handle: 'aiden_p', role: 'Product Manager', score: 52, topic: 'PM', tone: 'vi',
    text: 'Tell me about a feature you killed and what it taught you. (genuinely curious — comments only, no quote-tweets pls)',
    likes: 89, replies: 12, network: 'x' },
  { id: 7, author: 'Brett T.', handle: 'thebrettshow', role: 'Creator', score: 41, topic: 'Hype', tone: 'vi',
    text: '🚀🚀 BIG DAY. just shipped something I\'ve been working on for *months*. cannot wait to share more soon. follow if you\'re building. let\'s GO 🔥',
    likes: 34, replies: 5, network: 'in' },
  { id: 8, author: 'Nora S.', handle: 'nora_s', role: 'Marketing', score: 22, topic: 'Promo', tone: 'vi',
    text: 'DM me "BOOK" for my free guide to 10x engagement on LinkedIn — first 50 only. I\'ll send personally. Comment below to claim 👇',
    likes: 8, replies: 3, network: 'in' },
];

export function FeedScanner() {
  const [threshold, setThreshold] = React.useState(70);
  const [topic, setTopic] = React.useState('All topics');

  const visible = FEED_POSTS.filter(p => p.score >= threshold);
  const hidden = FEED_POSTS.length - visible.length;

  return (
    <section id="feed-scanner" className="relative py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <Reveal>
              <Pill tone="em" icon={Filter} className="mb-4">01 · Feed Scanner</Pill>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] text-grad-2 mb-5">
                Skip 80% of the feed.<br/>Engage with the 20% that&nbsp;matters.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-white/60 text-[16px] leading-relaxed mb-8 max-w-md">
                Every post gets scored on relevance to your industry, signal density, and reply potential. Slide the threshold to see your feed re-rank in real time.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="glass rounded-2xl p-5 max-w-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Star size={14} className="text-em-300"/>
                    <span className="text-[13px] font-semibold text-white/85">Score threshold</span>
                  </div>
                  <span className="font-mono text-em-300 text-[15px] tabular-nums">≥ {threshold}</span>
                </div>
                <input
                  type="range" min="0" max="100" value={threshold}
                  onChange={(e) => setThreshold(parseInt(e.target.value, 10))}
                  className="neon w-full"
                  style={{ '--p': `${threshold}%` }}
                />
                <div className="mt-3 flex items-center justify-between text-[11px] text-white/45 font-mono">
                  <span>0 · noise</span><span>50</span><span>100 · signal</span>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div className="text-[12px] text-white/65">
                    <span className="text-white font-semibold">{visible.length}</span>
                    <span className="text-white/45"> · {hidden} hidden</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {['All topics','AI','Growth','Design'].map(t => (
                      <button key={t}
                        onClick={() => setTopic(t)}
                        className={`text-[11px] px-2 py-1 rounded-full transition ${topic === t ? 'bg-em-500/15 text-em-300 border border-em-500/30' : 'text-white/55 hover:text-white/75 border border-transparent'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.25} className="mt-7 grid grid-cols-3 gap-3 max-w-md">
              {[
                { k: '1.2M', v: 'posts scored / day' },
                { k: '<12ms', v: 'per post' },
                { k: '40+', v: 'topic models' },
              ].map((s,i) => (
                <div key={i} className="glass rounded-xl p-3">
                  <div className="text-[18px] font-bold text-grad font-mono">{s.k}</div>
                  <div className="text-[10.5px] text-white/45 mt-0.5 uppercase tracking-wider">{s.v}</div>
                </div>
              ))}
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="relative">
              <div className="glass rounded-t-2xl px-4 py-2.5 flex items-center gap-3 border-b-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400/60"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-em-400/70"></span>
                </div>
                <div className="flex-1 mx-3 h-6 rounded-md bg-white/[0.04] border border-white/[0.05] grid place-items-center text-[10.5px] font-mono text-white/45 px-3">
                  linkedin.com/feed · scanning ⌁
                </div>
                <Pill tone="em" icon={Zap} className="ml-auto">live</Pill>
              </div>

              <div className="glass rounded-b-2xl border-t-0 p-4 max-h-[640px] overflow-y-auto no-scrollbar space-y-3">
                <AnimatePresence initial={false}>
                  {FEED_POSTS.map((p) => {
                    const passes = p.score >= threshold;
                    return (
                      <motion.div
                        key={p.id}
                        layout
                        initial={false}
                        animate={{
                          opacity: passes ? 1 : 0.22,
                          filter: passes ? 'blur(0px) saturate(1)' : 'blur(2px) saturate(0.4)',
                          scale: passes ? 1 : 0.985,
                        }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className={`relative rounded-xl p-4 pl-5 border ${passes ? 'border-vi-500/30 bg-white/[0.03]' : 'border-white/[0.04] bg-white/[0.015]'}`}
                        style={passes ? { boxShadow: '0 0 0 1px rgba(139,92,246,.18), 0 8px 30px -10px rgba(139,92,246,.35)' } : {}}
                      >
                        {passes && (
                          <span aria-hidden className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-gradient-to-b from-vi-400 to-em-400"
                                style={{ boxShadow: '0 0 16px rgba(139,92,246,.6)' }}></span>
                        )}

                        <div className="flex items-start gap-3">
                          <div className={`relative w-10 h-10 rounded-full grid place-items-center font-semibold text-[13px] shrink-0
                                          ${p.network === 'in' ? 'bg-[#0a66c2]/20 text-[#67aaf0]' : 'bg-white/10 text-white/85'}`}>
                            {p.author.split(' ').map(s => s[0]).join('').slice(0,2)}
                            <span className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-ink-900 grid place-items-center
                                              ${p.network === 'in' ? 'bg-[#0a66c2]' : 'bg-black'}`}>
                              {p.network === 'in' ? <Linkedin size={8} className="text-white"/> : <Xtwitter size={8} className="text-white"/>}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <div>
                                <div className="text-[13.5px] font-semibold text-white/90 leading-tight">{p.author} <span className="text-white/35 font-normal">· @{p.handle}</span></div>
                                <div className="text-[11px] text-white/45">{p.role}</div>
                              </div>
                              <AnimatePresence>
                                {passes && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.85, x: 8 }}
                                    animate={{ opacity: 1, scale: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.85, x: 8 }}
                                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                    className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-vi-500/15 border border-vi-500/40">
                                    <Star size={10} className="text-vi-300 fill-vi-300"/>
                                    <span className="text-[10.5px] font-mono text-vi-200 tabular-nums">{p.score}</span>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                            <p className="mt-2 text-[13.5px] leading-relaxed text-white/80">{p.text}</p>
                            <div className="mt-2.5 flex items-center gap-4 text-[11px] text-white/40">
                              <span className="inline-flex items-center gap-1"><Heart size={11}/> {p.likes}</span>
                              <span className="inline-flex items-center gap-1"><MessageCircle size={11}/> {p.replies}</span>
                              <span className="inline-flex items-center gap-1"><Repeat size={11}/></span>
                              <span className="ml-auto text-[10px] font-mono text-white/35">topic: {p.topic}</span>
                            </div>

                            <AnimatePresence>
                              {passes && p.score >= 80 && (
                                <motion.div
                                  layout
                                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                  animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                  transition={{ duration: 0.4 }}
                                  className="overflow-hidden"
                                >
                                  <div className="rounded-lg border border-em-500/30 bg-em-500/5 px-3 py-2 text-[12px] text-em-100/85 flex items-start gap-2">
                                    <Wand size={12} className="text-em-300 mt-0.5"/>
                                    <span><span className="text-em-300 font-semibold">Suggested reply:</span> {p.id === 1 ? "Curious which onboarding step lost the most people — was it the connection step or the first 'aha' moment?" :
                                      p.id === 2 ? "SDK v3 energy is real. Mind sharing which abstraction finally clicked vs. the ones you regretted shipping in v1?" :
                                      p.id === 3 ? "This. The best AI feature we shipped this year has zero visual indicator that it's AI — users just call it 'the smart sort.'" :
                                      "The middle plan looking inevitable is doing a lot of work. Have you tested what happens when you remove it entirely?"}</span>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
