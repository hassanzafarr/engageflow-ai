import React from 'react';
import { motion } from 'framer-motion';
import { Layers, History, Wand, Compass, TrendingUp, Shield, Lock, ArrowRight, Xtwitter } from './icons.jsx';
import { SectionHead, TiltCard, Reveal, Pill } from './ui.jsx';

function FeatureCard({ icon: Icon, title, desc, accent = 'vi', mock, badge, span = 1 }) {
  return (
    <TiltCard glow={accent} maxTilt={5} intensity={1}
      className={`group relative rounded-3xl ${span === 2 ? 'md:col-span-2' : ''}`}>
      <div className="ring-grad rounded-3xl">
        <div className="relative glass-strong rounded-3xl p-6 overflow-hidden min-h-[300px]">
          <div aria-hidden className="absolute -top-24 -right-16 w-72 h-72 rounded-full opacity-40"
               style={{ background: `radial-gradient(closest-side, ${accent === 'em' ? 'rgba(16,185,129,.45)' : 'rgba(139,92,246,.45)'}, transparent 70%)` }}></div>

          <div className="relative flex items-start justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <span className={`w-9 h-9 rounded-xl grid place-items-center ${accent === 'em' ? 'bg-em-500/15 text-em-300' : 'bg-vi-500/15 text-vi-300'}`}>
                <Icon size={16}/>
              </span>
              <h3 className="text-[17px] font-semibold tracking-tight text-white">{title}</h3>
            </div>
            {badge && <Pill tone={accent}>{badge}</Pill>}
          </div>
          <p className="relative text-[13.5px] text-white/60 leading-relaxed max-w-md">{desc}</p>
          <div className="relative mt-5">{mock}</div>
        </div>
      </div>
    </TiltCard>
  );
}

function ThreadMock() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[1,2,3].map(i => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          viewport={{ once: true }}
          className="rounded-xl bg-black/30 border border-white/[0.06] p-2.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[9px] font-mono text-white/40">{i}/3</span>
            <Xtwitter size={9} className="text-white/40"/>
          </div>
          <div className="space-y-1">
            <div className="h-1.5 rounded bg-white/10 w-full"></div>
            <div className="h-1.5 rounded bg-white/10 w-4/5"></div>
            <div className="h-1.5 rounded bg-white/10 w-3/5"></div>
            {i === 1 && <div className="h-1.5 rounded bg-em-500/40 w-2/5 mt-1.5"></div>}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[8.5px] text-white/35 font-mono">
            <span>{180 + i * 12}c</span>
            {i === 2 && <span className="text-vi-300">hook ↺</span>}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function HistoryMock() {
  const rows = [
    { d: 'just now', t: 'Reply · Sasha Lee', s: 'em', tag: 'agree' },
    { d: '2m ago',   t: 'Post · Onboarding loops thread', s: 'vi', tag: 'draft' },
    { d: '14m ago',  t: 'Reply · Maya Chen', s: 'em', tag: 'question' },
    { d: '1h ago',   t: 'Refined · "shipped a thing"', s: 'em', tag: 'witty' },
    { d: '3h ago',   t: 'Reply · Devon R.', s: 'em', tag: 'agree' },
  ];
  return (
    <div className="space-y-1.5">
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-2 rounded-lg bg-black/25 border border-white/[0.05] px-2.5 py-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${r.s === 'em' ? 'bg-em-400' : 'bg-vi-400'} shrink-0`}></span>
          <span className="text-[11.5px] text-white/80 truncate flex-1">{r.t}</span>
          <span className="text-[9.5px] font-mono text-white/40 shrink-0">{r.tag}</span>
          <span className="text-[9.5px] font-mono text-white/30 shrink-0 w-14 text-right">{r.d}</span>
        </div>
      ))}
    </div>
  );
}

function RefineMock() {
  return (
    <div className="space-y-2">
      <div className="rounded-lg bg-black/30 border border-white/[0.06] px-3 py-2 text-[11.5px] text-white/60 line-through decoration-vi-400/70">
        &quot;Great post! Really insightful — totally agree, this is a game changer 🚀&quot;
      </div>
      <div className="flex justify-center"><ArrowRight size={12} className="text-white/40 rotate-90"/></div>
      <div className="rounded-lg bg-em-500/[0.07] border border-em-500/30 px-3 py-2 text-[12px] text-white/85">
        &quot;The specification angle is the right pivot. Curious — what artifact does <span className="bg-em-500/20 text-em-200 px-1 rounded">&apos;thinking clearly&apos;</span> produce in your team?&quot;
      </div>
      <div className="flex items-center gap-1.5">
        {['tighten','warmer','add question','remove cliché'].map(t => (
          <span key={t} className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-white/55 border border-white/[0.06]">{t}</span>
        ))}
      </div>
    </div>
  );
}

function HookMock() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {[
        { h: 'Contrarian', x: 'Most teams measure the wrong loop.', tone: 'vi' },
        { h: 'Receipt',    x: 'Shipped 40 features. 6 kept users.', tone: 'em' },
        { h: 'Question',   x: "What's the spec everyone refuses to write?", tone: 'vi' },
        { h: 'Specific',   x: '4 redesigns. Tuesday 1am. One survived.', tone: 'em' },
      ].map((h, i) => (
        <div key={i} className={`rounded-lg border px-2.5 py-2 ${h.tone === 'em' ? 'border-em-500/25 bg-em-500/[0.05]' : 'border-vi-500/25 bg-vi-500/[0.05]'}`}>
          <div className={`text-[9px] uppercase tracking-[0.14em] font-semibold ${h.tone === 'em' ? 'text-em-300' : 'text-vi-300'}`}>{h.h}</div>
          <div className="text-[11px] text-white/80 leading-snug mt-1">{h.x}</div>
        </div>
      ))}
    </div>
  );
}

export function FeaturesGrid() {
  return (
    <section id="features" className="relative py-28 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead
          eyebrow="04 · Toolkit"
          title="Every workflow, in your sidebar."
          kicker="EngageFlow doesn't replace your writing — it removes the friction between thinking it and posting it."
        />
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          <FeatureCard icon={Layers} title="Thread Builder" badge="X" accent="em"
            desc="Outline once, expand into a thread that breaks at the right beats. Hook, payoff, CTA — composed, not stitched."
            mock={<ThreadMock/>}
          />
          <FeatureCard icon={History} title="Draft History" badge="searchable" accent="vi"
            desc="Every reply, every post, every refinement — kept locally and indexed. Find that comment you wrote three weeks ago in two keystrokes."
            mock={<HistoryMock/>}
          />
          <FeatureCard icon={Wand} title="Refine" badge="one-shot" accent="em"
            desc="Highlight any sentence. Tighten, warm up, swap the verb, strip clichés, add a question — without rewriting the whole draft."
            mock={<RefineMock/>}
          />
          <FeatureCard icon={Compass} title="Hook Library" badge="200+" accent="vi"
            desc="The opening line is 80% of the post. Browse hooks proven to stop the scroll, filtered to your voice and topic."
            mock={<HookMock/>}
          />
          <FeatureCard icon={TrendingUp} title="Engagement signals" badge="live" accent="em"
            desc="See which posts your draft would compete with, the average reply count for your topic, and the slot where the algorithm is hungriest."
            mock={
              <div className="space-y-2">
                {[
                  { l: 'Topic saturation', v: 32, t: 'low → good' },
                  { l: 'Reply velocity',   v: 78, t: 'high → engage now' },
                  { l: 'Your voice fit',   v: 91, t: 'strong match' },
                ].map((s,i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-[10.5px] text-white/55"><span>{s.l}</span><span className="font-mono text-em-300">{s.v}</span></div>
                    <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.v}%` }} transition={{ duration: 0.9, delay: i * 0.1 }} viewport={{ once: true }}
                                  className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #10b981, #8b5cf6)' }}/>
                    </div>
                    <div className="text-[9.5px] text-white/35 font-mono">{s.t}</div>
                  </div>
                ))}
              </div>
            }
          />
          <FeatureCard icon={Shield} title="Local-first & private" badge="your key" accent="vi"
            desc="Your API key talks to Anthropic directly. No relay servers, no logging, no &quot;anonymized telemetry.&quot; Your drafts never touch our infra because we don't have any."
            mock={
              <div className="rounded-xl bg-black/30 border border-white/[0.06] p-3 font-mono text-[11px] leading-relaxed">
                <div className="flex items-center gap-1.5 text-white/40 mb-1.5"><Lock size={11}/> claude.js</div>
                <div className="text-white/70">browser <span className="text-em-300">→</span> api.anthropic.com</div>
                <div className="text-white/40 mt-1">engageflow servers: <span className="text-vi-300">none</span></div>
                <div className="text-white/40">telemetry sent: <span className="text-em-300">0 bytes</span></div>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}
