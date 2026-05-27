// Content Scheduler — small interactive calendar w/ scheduled posts.
const { motion: M_sc, AnimatePresence: AP_sc } = window.Motion;

const SLOTS = [
  { day: 0, hour: 8,  title: 'Onboarding loops',         net: 'in', tone: 'em', mins: 4 },
  { day: 1, hour: 14, title: 'Spec-first thread',        net: 'x',  tone: 'vi', mins: 7 },
  { day: 2, hour: 9,  title: 'Reply blitz · AI weekly',  net: 'in', tone: 'em', mins: 2 },
  { day: 3, hour: 17, title: '"4 redesigns" essay',      net: 'in', tone: 'vi', mins: 9 },
  { day: 4, hour: 11, title: 'Hot take · benchmarks',    net: 'x',  tone: 'em', mins: 3 },
];

const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

function Scheduler() {
  const [active, setActive] = React.useState(SLOTS[1]);

  return (
    <section id="scheduler" className="relative py-28 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <Reveal>
              <Pill tone="vi" icon={Calendar} className="mb-4">05 · Scheduler</Pill>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.05] text-grad-2 mb-5">
                Show up daily,<br/>without thinking about it.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-white/60 text-[16px] leading-relaxed mb-7">
                Plan a week of posts in twenty minutes. EngageFlow drafts ahead, queues to the slot when your audience is awake, and re-pitches the hook if your engagement window slides.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <ul className="space-y-3">
                {[
                  ['Adaptive timing', 'Picks the slot from your last 30 posts of analytics.'],
                  ['Cross-network', 'Same idea, different shape for LinkedIn and X.'],
                  ['Pause-able', 'Skip the queue when you take a week off. No streak guilt.'],
                ].map(([k, v], i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1 w-5 h-5 rounded-full bg-em-500/15 text-em-300 grid place-items-center shrink-0"><Check size={12}/></span>
                    <div>
                      <div className="text-[14px] text-white font-semibold">{k}</div>
                      <div className="text-[12.5px] text-white/55">{v}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.18}>
              <div className="ring-grad rounded-3xl"
                   style={{ transform: 'perspective(1400px) rotateX(8deg) rotateY(-6deg)' }}>
                <div className="glass-strong rounded-3xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={15} className="text-vi-300"/>
                      <span className="text-[13.5px] font-semibold text-white/90">Week of May 26</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Pill tone="em" icon={Bolt}>5 queued</Pill>
                      <Pill tone="neutral" icon={Repeat}>2 auto-refined</Pill>
                    </div>
                  </div>

                  {/* Week grid */}
                  <div className="grid grid-cols-7 gap-2">
                    {DAYS.map((d, di) => (
                      <div key={d} className="text-center">
                        <div className="text-[10px] uppercase tracking-[0.14em] text-white/40 font-semibold mb-1.5">{d}</div>
                        <div className="text-[18px] font-bold text-white/85 leading-none">{26 + di}</div>
                      </div>
                    ))}
                  </div>

                  {/* Timeline rows */}
                  <div className="mt-4 space-y-1.5">
                    {[10, 13, 16].map((hour, ri) => (
                      <div key={hour} className="grid grid-cols-[40px_1fr] items-center gap-2">
                        <div className="text-[10px] font-mono text-white/35 text-right">{hour}:00</div>
                        <div className="grid grid-cols-7 gap-2">
                          {DAYS.map((_, di) => {
                            const slot = SLOTS.find(s => s.day === di && Math.abs(s.hour - hour) <= 1);
                            return (
                              <button key={di}
                                onClick={() => slot && setActive(slot)}
                                className={`relative h-12 rounded-lg border transition group
                                  ${slot
                                    ? (active?.day === slot.day && active?.hour === slot.hour
                                        ? (slot.tone === 'em' ? 'border-em-500/50 bg-em-500/15' : 'border-vi-500/50 bg-vi-500/15')
                                        : 'border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06]')
                                    : 'border-white/[0.04] bg-white/[0.01]'}`}>
                                {slot && (
                                  <>
                                    <span className={`absolute top-1 left-1 w-1 h-1 rounded-full ${slot.tone === 'em' ? 'bg-em-400' : 'bg-vi-400'}`}></span>
                                    <span className="absolute bottom-1 left-1.5 text-[8.5px] font-mono text-white/50">
                                      {slot.net === 'in' ? 'in' : 'x'} · {slot.mins}m
                                    </span>
                                  </>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Active post preview */}
                  <AP_sc mode="wait">
                    <M_sc.div
                      key={`${active.day}-${active.hour}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.35 }}
                      className="mt-5 rounded-xl border border-white/[0.07] bg-black/30 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-7 h-7 rounded-lg grid place-items-center
                                            ${active.net === 'in' ? 'bg-[#0a66c2]/20 text-[#67aaf0]' : 'bg-white/10 text-white/80'}`}>
                            {active.net === 'in' ? <Linkedin size={12}/> : <Xtwitter size={12}/>}
                          </span>
                          <div>
                            <div className="text-[12.5px] font-semibold text-white">{active.title}</div>
                            <div className="text-[10px] text-white/45 font-mono">{DAYS[active.day]} · {active.hour}:00 · {active.mins}m read</div>
                          </div>
                        </div>
                        <Pill tone={active.tone}>{active.tone === 'em' ? 'agree' : 'contrarian'}</Pill>
                      </div>
                      <p className="text-[12.5px] text-white/70 leading-relaxed">
                        Drafted yesterday from your "spec-first" hook. Hook score 89. Auto-publishes Tuesday at 2pm — peak slot for your audience.
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <button className="text-[11px] inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-em-500 text-ink-950 font-semibold"><Send size={11}/> Send now</button>
                        <button className="text-[11px] inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.06] text-white/80"><Wand size={11}/> Refine</button>
                        <button className="text-[11px] inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.06] text-white/80"><Clock size={11}/> Reschedule</button>
                      </div>
                    </M_sc.div>
                  </AP_sc>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

window.Scheduler = Scheduler;
