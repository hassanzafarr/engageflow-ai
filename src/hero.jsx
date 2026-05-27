// Hero section — gradient headline, Three.js particles bg, floating glass widgets.
const { motion: M_hero } = window.Motion;

function FloatingWidget({ children, className = "", float = { y: 8, x: 4, dur: 6, delay: 0 }, rotate = 0 }) {
  return (
    <M_hero.div
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{
        opacity: 1, y: [0, -float.y, 0, float.y, 0], x: [0, float.x, 0, -float.x, 0], scale: 1,
        rotate: [rotate - 1, rotate + 1, rotate - 0.5, rotate + 1, rotate - 1],
      }}
      transition={{
        opacity: { duration: 0.8, delay: float.delay },
        scale: { duration: 0.8, delay: float.delay },
        y: { duration: float.dur, repeat: Infinity, ease: "easeInOut", delay: float.delay + 0.5 },
        x: { duration: float.dur * 1.3, repeat: Infinity, ease: "easeInOut", delay: float.delay + 0.5 },
        rotate: { duration: float.dur * 1.5, repeat: Infinity, ease: "easeInOut", delay: float.delay + 0.5 },
      }}
      className={`absolute ${className}`}
    >
      {children}
    </M_hero.div>
  );
}

function MiniReply({ tone, text, badge }) {
  return (
    <div className="glass-strong rounded-2xl p-3.5 w-[260px] shadow-[0_30px_60px_-30px_rgba(0,0,0,.8)]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-em-400 animate-pulse"></span>
          <span className="text-[10px] uppercase tracking-[0.14em] text-white/50 font-semibold">{tone}</span>
        </div>
        <span className="text-[10px] font-mono text-em-300/80">{badge}</span>
      </div>
      <p className="text-[12.5px] leading-relaxed text-white/85">{text}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-gradient-to-br from-vi-400 to-em-400"></div>
          <span className="text-[10px] text-white/45">in your voice</span>
        </div>
        <div className="flex items-center gap-1">
          <button className="w-6 h-6 rounded-md bg-white/5 grid place-items-center text-white/60 hover:text-em-300"><Check size={11}/></button>
          <button className="w-6 h-6 rounded-md bg-white/5 grid place-items-center text-white/60"><Repeat size={11}/></button>
        </div>
      </div>
    </div>
  );
}

function ScoreWidget() {
  return (
    <div className="glass-strong rounded-2xl p-3.5 w-[220px]">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[10px] uppercase tracking-[0.14em] text-white/50 font-semibold">Feed Scanner</span>
        <Activity size={12} className="text-vi-300"/>
      </div>
      <div className="space-y-1.5">
        {[
          { name: 'AI engineers', v: 92, c: 'em' },
          { name: 'GTM tactics', v: 71, c: 'em' },
          { name: 'Hot takes', v: 38, c: 'vi' },
          { name: 'Promo / hype', v: 12, c: 'vi' },
        ].map((r, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-[10.5px] text-white/70 w-20 truncate">{r.name}</span>
            <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div className={`h-full rounded-full ${r.c === 'em' ? 'bg-em-500' : 'bg-vi-500'}`} style={{ width: `${r.v}%` }}></div>
            </div>
            <span className="font-mono text-[10px] text-white/55 w-7 text-right">{r.v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function VoiceDial() {
  return (
    <div className="glass-strong rounded-2xl p-3.5 w-[200px]">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] uppercase tracking-[0.14em] text-white/50 font-semibold">Voice</span>
        <Mic size={12} className="text-em-300"/>
      </div>
      <div className="relative w-32 h-32 mx-auto">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle cx="50" cy="50" r="44" stroke="rgba(255,255,255,.06)" strokeWidth="3" fill="none"/>
          <circle cx="50" cy="50" r="44" stroke="url(#vg)" strokeWidth="3" fill="none"
                  strokeLinecap="round" strokeDasharray="276" strokeDashoffset="60"
                  transform="rotate(-90 50 50)"/>
          <defs>
            <linearGradient id="vg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#10b981"/><stop offset="100%" stopColor="#8b5cf6"/>
            </linearGradient>
          </defs>
          <text x="50" y="50" textAnchor="middle" dy="-2" fill="white" fontSize="14" fontWeight="700" fontFamily="JetBrains Mono">782</text>
          <text x="50" y="50" textAnchor="middle" dy="12" fill="rgba(255,255,255,.5)" fontSize="6" fontFamily="JetBrains Mono">/ 1200 chars</text>
        </svg>
      </div>
      <div className="grid grid-cols-3 gap-1 mt-2">
        <span className="text-[9px] text-center py-1 rounded bg-em-500/15 text-em-300 font-mono">Casual</span>
        <span className="text-[9px] text-center py-1 rounded bg-white/5 text-white/55 font-mono">Pro</span>
        <span className="text-[9px] text-center py-1 rounded bg-white/5 text-white/55 font-mono">Witty</span>
      </div>
    </div>
  );
}

function Hero({ particleDensity }) {
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  React.useEffect(() => {
    const h = (e) => {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      mx.set((e.clientX - cx) / cx);
      my.set((e.clientY - cy) / cy);
    };
    window.addEventListener('pointermove', h);
    return () => window.removeEventListener('pointermove', h);
  }, []);

  const wx = useTransform(sx, [-1, 1], [-22, 22]);
  const wy = useTransform(sy, [-1, 1], [-14, 14]);

  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60 pointer-events-none"></div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full"
             style={{ background: 'radial-gradient(closest-side, rgba(139,92,246,.18), transparent 70%)' }}></div>
        <div className="absolute top-40 left-[15%] w-[400px] h-[400px] rounded-full"
             style={{ background: 'radial-gradient(closest-side, rgba(16,185,129,.22), transparent 70%)' }}></div>
      </div>
      <div className="absolute inset-0 z-0">
        <Particles density={particleDensity} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal y={14} delay={0.05}>
            <a href="#" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] font-medium text-white/75 border border-white/12 bg-white/[0.04] hover:bg-white/[0.07] backdrop-blur transition">
              <span className="w-1.5 h-1.5 rounded-full bg-em-400 shadow-[0_0_8px_rgba(16,185,129,.8)]"></span>
              Now powered by Claude Haiku 4.5
              <span className="text-white/40">·</span>
              <span className="text-em-300">v1.4</span>
              <ArrowRight size={12} />
            </a>
          </Reveal>

          <Reveal y={22} delay={0.12}>
            <h1 className="mt-7 text-[44px] md:text-[76px] leading-[0.98] font-bold tracking-[-0.025em]">
              <span className="text-grad">Your voice,<br/>amplified.</span>
              <span className="block mt-2 text-white text-[28px] md:text-[40px] font-medium tracking-tight">
                Comment &amp; post <span className="text-em-300">10× faster</span> on <span className="inline-flex items-center gap-1.5"><Linkedin size={28} className="text-vi-400"/></span> &amp; <span className="inline-flex items-center gap-1.5"><Xtwitter size={26} className="text-white/90"/></span>
              </span>
            </h1>
          </Reveal>

          <Reveal y={16} delay={0.2}>
            <p className="mt-8 mx-auto max-w-2xl text-[17px] md:text-[19px] leading-relaxed text-white/65">
              A Chrome extension that reads the post, learns your voice, and drafts the comment you would have written — only faster, on every post worth replying to.
            </p>
          </Reveal>

          <Reveal y={14} delay={0.32}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <GlowButton variant="em" className="px-6 py-3 text-[15px]">
                <Chrome size={16}/> Install Chrome Extension
                <span className="ml-1 text-[11px] font-mono text-em-700/80 bg-em-300/20 px-1.5 py-0.5 rounded">Free</span>
              </GlowButton>
              <GhostButton className="px-6 py-3 text-[15px]">
                <Play size={14}/> Try interactive demo
              </GhostButton>
            </div>
          </Reveal>

          <Reveal y={10} delay={0.4}>
            <div className="mt-7 flex items-center justify-center gap-5 text-[12px] text-white/45">
              <span className="inline-flex items-center gap-1.5"><Shield size={12}/> No data leaves your browser</span>
              <span className="w-px h-3 bg-white/10"></span>
              <span className="inline-flex items-center gap-1.5"><Lock size={12}/> Your API key, your control</span>
              <span className="w-px h-3 bg-white/10"></span>
              <span className="inline-flex items-center gap-1.5"><Zap size={12}/> &lt;400ms replies</span>
            </div>
          </Reveal>
        </div>

        {/* Floating widgets */}
        <M_hero.div style={{ x: wx, y: wy }} className="relative h-[460px] mt-2">
          <FloatingWidget className="top-2 left-[2%] hidden md:block" float={{ y: 12, x: 6, dur: 7, delay: 0.4 }} rotate={-4}>
            <MiniReply tone="Insightful · Pro" badge="92 · LinkedIn" text="The retention boost likely tracks back to onboarding friction, not the feature itself. Did you A/B the activation step in week 2?" />
          </FloatingWidget>
          <FloatingWidget className="top-12 right-[3%] hidden md:block" float={{ y: 10, x: 8, dur: 8, delay: 0.6 }} rotate={5}>
            <MiniReply tone="Witty · X" badge="87 · X" text="“just shipped” doing a lot of heavy lifting in this thread. give us the diff or it didn't happen 👀" />
          </FloatingWidget>
          <FloatingWidget className="top-[180px] left-[10%] hidden lg:block" float={{ y: 14, x: 4, dur: 9, delay: 0.85 }} rotate={-2}>
            <ScoreWidget/>
          </FloatingWidget>
          <FloatingWidget className="top-[160px] right-[8%] hidden lg:block" float={{ y: 16, x: 6, dur: 7.5, delay: 1 }} rotate={3}>
            <VoiceDial/>
          </FloatingWidget>

          {/* Central composer mock */}
          <FloatingWidget className="left-1/2 -translate-x-1/2 top-8" float={{ y: 6, x: 0, dur: 6, delay: 0.2 }} rotate={0}>
            <div className="ring-grad rounded-3xl">
              <div className="glass-strong rounded-3xl px-5 py-4 w-[420px] sm:w-[460px]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-vi-400 to-em-400 grid place-items-center text-ink-950">
                      <Sparkles size={14}/>
                    </div>
                    <div>
                      <div className="text-[12px] text-white/85 font-semibold">EngageFlow Composer</div>
                      <div className="text-[10.5px] text-white/45 font-mono">replying as @you · casual · 220 chars</div>
                    </div>
                  </div>
                  <Pill tone="em" icon={Bolt}>generating</Pill>
                </div>
                <div className="rounded-xl bg-black/30 border border-white/[0.06] px-3.5 py-3 text-[13px] leading-relaxed text-white/85">
                  <span className="text-em-300">{`>`}</span> The framing of “AI replaces writers” keeps flattening a more interesting question:{" "}
                  <span className="bg-vi-500/15 text-vi-200 px-1 rounded">which loops are you willing to delegate</span>, and what do you keep on principle? Mine: outlines no, voice yes.<span className="inline-block w-1.5 h-3.5 align-text-bottom bg-em-400 ml-0.5 animate-pulse"></span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {['Agree','Disagree','Funny','Question'].map((t,i) => (
                      <span key={i} className={`text-[10.5px] px-2 py-1 rounded-full font-medium ${i===0 ? 'bg-em-500/15 text-em-300 border border-em-500/30' : 'bg-white/5 text-white/55 border border-transparent'}`}>{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-white/60">
                    <button className="w-7 h-7 rounded-lg bg-white/5 grid place-items-center hover:text-vi-300"><Repeat size={12}/></button>
                    <button className="w-7 h-7 rounded-lg bg-em-500 text-ink-950 grid place-items-center"><Send size={12}/></button>
                  </div>
                </div>
              </div>
            </div>
          </FloatingWidget>
        </M_hero.div>

        {/* Logo strip */}
        <Reveal delay={0.4} className="mt-2">
          <div className="border-t border-white/[0.06] pt-8">
            <p className="text-center text-[11px] uppercase tracking-[0.18em] text-white/35 mb-5">Drafted for builders shipping at</p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 text-white/45 font-semibold tracking-tight">
              {['Vercel','Linear','Supabase','Resend','Anthropic','Postman','Stripe','Cloudflare'].map((n) => (
                <span key={n} className="text-[15px] hover:text-white/75 transition">{n}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

window.Hero = Hero;
