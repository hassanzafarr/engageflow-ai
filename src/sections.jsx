// Nav, testimonials, FAQ, CTA, footer.
const { motion: M_sx, AnimatePresence: AP_sx, useScroll: useScroll_sx, useTransform: useTransform_sx } = window.Motion;

function Nav() {
  const { scrollY } = useScroll_sx();
  const bg = useTransform_sx(scrollY, [0, 80], ['rgba(9,9,11,0.4)', 'rgba(9,9,11,0.82)']);

  const links = [
    { label: 'Feed Scanner', href: '#feed-scanner' },
    { label: 'Voice', href: '#voice' },
    { label: 'Composer', href: '#composer' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <M_sx.nav
      style={{ background: bg, backdropFilter: 'blur(14px) saturate(140%)', WebkitBackdropFilter: 'blur(14px) saturate(140%)' }}
      className="fixed top-0 inset-x-0 z-50 border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <span className="relative w-7 h-7 rounded-lg overflow-hidden grid place-items-center"
                style={{ background: 'linear-gradient(135deg, #10b981, #8b5cf6)', boxShadow: '0 0 18px rgba(139,92,246,.4)' }}>
            <Sparkles size={14} className="text-ink-950"/>
          </span>
          <span className="text-[15px] font-semibold tracking-tight">EngageFlow <span className="text-em-300">AI</span></span>
        </a>
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <a key={l.href} href={l.href} className="px-3 py-1.5 text-[13px] text-white/65 hover:text-white transition rounded-full">
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a href="#" className="hidden sm:inline-flex items-center gap-1.5 text-[12.5px] text-white/65 hover:text-white px-3 py-1.5">
            <Github size={14}/> Source
          </a>
          <GlowButton variant="em" className="px-4 py-2 text-[13px]"><Chrome size={14}/>Add to Chrome</GlowButton>
        </div>
      </div>
    </M_sx.nav>
  );
}

const TESTIMONIALS = [
  { n: 'Maya Chen', r: 'Founder · Lattice AI', q: 'I went from posting twice a month to twice a day. EngageFlow drafts the comment I would have written — it just doesn\'t make me wait for the words to show up.', avatar: ['#10b981','#8b5cf6'] },
  { n: 'Devon R.',  r: 'Engineer · Resend',    q: 'The voice profile is genuinely uncanny. My team can\'t tell which replies I wrote and which it drafted. I can barely tell anymore.', avatar: ['#8b5cf6','#60a5fa'] },
  { n: 'Priya N.',  r: 'Design Lead',          q: 'Replaced three Chrome extensions and a Notion doc full of "hook templates." The feed scanner alone saves an hour a day.', avatar: ['#fbbf24','#10b981'] },
  { n: 'Sam K.',    r: 'Growth · Stripe',      q: 'I stopped writing "great post!" replies in 2024. EngageFlow just made me actually consistent about it.', avatar: ['#f472b6','#8b5cf6'] },
  { n: 'Aiden P.',  r: 'PM · Notion',          q: 'The refine tool is the killer. Highlight, tighten, ship. I never close the tab to "edit later" anymore.', avatar: ['#34d399','#a78bfa'] },
  { n: 'Lex M.',    r: 'AI Engineer',          q: 'Local-first, my key, my voice, my drafts. The only AI tool I trust with my actual identity on the network.', avatar: ['#60a5fa','#34d399'] },
];

function Testimonials() {
  return (
    <section className="relative py-28 border-t border-white/[0.05] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead
          eyebrow="What people are saying"
          title="Replies that earn replies."
          kicker="Operators, founders, and engineers who treat social as a craft — not a treadmill."
        />
      </div>

      <div className="mt-14 relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ink-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ink-950 to-transparent z-10 pointer-events-none"></div>
        <div className="flex gap-4 marquee-track w-max">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div key={i} className="glass rounded-2xl p-5 w-[360px] shrink-0">
              <Quote size={16} className="text-vi-300 mb-3"/>
              <p className="text-[14px] leading-relaxed text-white/85">{t.q}</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full grid place-items-center font-semibold text-[12px] text-ink-950"
                     style={{ background: `linear-gradient(135deg, ${t.avatar[0]}, ${t.avatar[1]})` }}>
                  {t.n.split(' ').map(s => s[0]).join('')}
                </div>
                <div>
                  <div className="text-[12.5px] font-semibold text-white">{t.n}</div>
                  <div className="text-[10.5px] text-white/45">{t.r}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const FAQS = [
  { q: 'How does EngageFlow handle my data?', a: 'Your Anthropic API key talks directly to api.anthropic.com from your browser. We don\'t proxy, log, or store anything. The extension persists drafts and your voice profile in chrome.storage.local on your machine.' },
  { q: 'Which model powers the replies?', a: 'Claude Haiku 4.5 by default — sub-400ms latency on most replies. You can swap to Sonnet 4.5 for long-form posts and threads in settings.' },
  { q: 'Will my replies sound like AI?', a: 'Only if you let it. The Voice Profile extracts your cadence, vocabulary, and rules ("no em-dashes, no clichés"). Anything generated runs through your fingerprint before it lands in the box.' },
  { q: 'Does it work on the LinkedIn mobile site?', a: 'It\'s a Chrome extension — desktop only for now. Mobile happens via the LinkedIn / X app share sheet, planned for Q3.' },
  { q: 'What about agencies and teams?', a: 'Team plan ships in July. Shared voice profiles, central API key, audit log per editor. Email hi@engageflow.ai to join the beta list.' },
  { q: 'Can I see what it would have posted before it posts?', a: 'EngageFlow never auto-posts unless you explicitly enable Scheduler. Every reply lands in the comment box for you to send.' },
];

function FAQ() {
  const [open, setOpen] = React.useState(0);
  return (
    <section className="relative py-28 border-t border-white/[0.05]">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHead eyebrow="FAQ" title="Questions, answered." />
        <div className="mt-12 space-y-2">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <M_sx.div
                key={i}
                layout
                onClick={() => setOpen(isOpen ? -1 : i)}
                className={`glass rounded-2xl px-5 py-4 cursor-pointer ${isOpen ? 'border-em-500/25' : ''}`}>
                <M_sx.div layout className="flex items-center justify-between gap-4">
                  <span className={`text-[15px] font-semibold tracking-tight ${isOpen ? 'text-white' : 'text-white/85'}`}>{f.q}</span>
                  <M_sx.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.3 }}
                             className="w-7 h-7 rounded-full bg-white/[0.04] border border-white/[0.07] grid place-items-center text-white/60 shrink-0">
                    <Plus size={14}/>
                  </M_sx.span>
                </M_sx.div>
                <AP_sx initial={false}>
                  {isOpen && (
                    <M_sx.div
                      key="content"
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 10 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.32 }}
                      className="overflow-hidden">
                      <p className="text-[13.5px] text-white/65 leading-relaxed max-w-2xl">{f.a}</p>
                    </M_sx.div>
                  )}
                </AP_sx>
              </M_sx.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PricingCTA() {
  return (
    <section id="pricing" className="relative py-32 border-t border-white/[0.05] overflow-hidden">
      {/* glow bg */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/4 w-[600px] h-[600px] rounded-full"
             style={{ background: 'radial-gradient(closest-side, rgba(16,185,129,.18), transparent 70%)' }}></div>
        <div className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] rounded-full"
             style={{ background: 'radial-gradient(closest-side, rgba(139,92,246,.22), transparent 70%)' }}></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <Reveal>
          <Pill tone="vi" icon={Sparkles} className="mb-5">Free during beta</Pill>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-5xl md:text-7xl font-bold tracking-[-0.025em] leading-[1.02] text-grad mb-6">
            Show up like the<br/>operator you are.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="text-white/65 text-[17px] max-w-2xl mx-auto mb-10 leading-relaxed">
            EngageFlow is free while we cook. Bring your own Anthropic key. Install in 30 seconds. Uninstall in 5.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
            <GlowButton variant="em" className="px-7 py-3.5 text-[15px]">
              <Chrome size={16}/> Install Chrome Extension
              <ArrowRight size={14} className="ml-1"/>
            </GlowButton>
            <GhostButton className="px-7 py-3.5 text-[15px]">
              <Github size={14}/> Star on GitHub
            </GhostButton>
          </div>
        </Reveal>

        <Reveal delay={0.28}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              ['30s', 'Setup'],
              ['$0', 'Beta pricing'],
              ['BYOK', 'Anthropic'],
              ['MIT', 'License'],
            ].map(([k, v], i) => (
              <div key={i} className="glass rounded-2xl px-4 py-4">
                <div className="text-[22px] font-bold text-grad-2 font-mono tabular-nums leading-none">{k}</div>
                <div className="text-[11px] text-white/45 mt-1.5 uppercase tracking-[0.14em]">{v}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/[0.05] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <a href="#" className="flex items-center gap-2.5">
              <span className="relative w-7 h-7 rounded-lg grid place-items-center"
                    style={{ background: 'linear-gradient(135deg, #10b981, #8b5cf6)' }}>
                <Sparkles size={14} className="text-ink-950"/>
              </span>
              <span className="text-[15px] font-semibold tracking-tight">EngageFlow <span className="text-em-300">AI</span></span>
            </a>
            <p className="text-[12.5px] text-white/45 mt-3 max-w-xs leading-relaxed">
              A social media co-pilot for LinkedIn and X. Local-first. Bring your own key. Sounds like you.
            </p>
            <div className="mt-4 flex items-center gap-2 text-white/45">
              <a href="#" className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] grid place-items-center hover:text-white"><Xtwitter size={13}/></a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] grid place-items-center hover:text-white"><Linkedin size={13}/></a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] grid place-items-center hover:text-white"><Github size={13}/></a>
            </div>
          </div>
          {[
            { h: 'Product', items: ['Feed Scanner','Voice Profile','Composer','Scheduler','Hooks'] },
            { h: 'Company', items: ['About','Changelog','Roadmap','Contact'] },
            { h: 'Resources', items: ['Docs','Privacy','Open source','Status'] },
            { h: 'Connect', items: ['GitHub','Twitter','LinkedIn','Discord'] },
          ].map((c, i) => (
            <div key={i} className="md:col-span-2">
              <div className="text-[10.5px] uppercase tracking-[0.18em] text-white/40 font-semibold mb-3">{c.h}</div>
              <ul className="space-y-2">
                {c.items.map(x => (
                  <li key={x}><a href="#" className="text-[13px] text-white/65 hover:text-white transition">{x}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11.5px] text-white/40 font-mono">© 2026 EngageFlow AI · MIT licensed</div>
          <div className="text-[11.5px] text-white/40">Built with ☕ in the margins of busy weeks.</div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Testimonials, FAQ, PricingCTA, Footer });
