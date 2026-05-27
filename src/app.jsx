// App entrypoint — composes sections + Tweaks panel.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "particleDensity": 1,
  "showParticles": true,
  "accent": "duo"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // accent affects the gradient text — apply via document var
  React.useEffect(() => {
    const root = document.documentElement;
    if (t.accent === 'em') {
      root.style.setProperty('--accent-1', '#10b981');
      root.style.setProperty('--accent-2', '#34d399');
    } else if (t.accent === 'vi') {
      root.style.setProperty('--accent-1', '#8b5cf6');
      root.style.setProperty('--accent-2', '#a78bfa');
    } else {
      root.style.setProperty('--accent-1', '#10b981');
      root.style.setProperty('--accent-2', '#8b5cf6');
    }
  }, [t.accent]);

  return (
    <div className="relative">
      <Nav/>
      <Hero particleDensity={t.showParticles ? t.particleDensity : 0.01}/>
      <FeedScanner/>
      <VoiceProfile/>
      <Composer/>
      <FeaturesGrid/>
      <Scheduler/>
      <Testimonials/>
      <FAQ/>
      <PricingCTA/>
      <Footer/>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Background"/>
        <TweakToggle label="Three.js particles" value={t.showParticles}
                     onChange={(v) => setTweak('showParticles', v)}/>
        <TweakSlider label="Particle density" value={t.particleDensity}
                     min={0.3} max={2} step={0.1}
                     onChange={(v) => setTweak('particleDensity', v)}/>
        <TweakSection label="Brand"/>
        <TweakRadio label="Accent" value={t.accent}
                    options={['duo', 'em', 'vi']}
                    onChange={(v) => setTweak('accent', v)}/>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
