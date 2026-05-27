import React from 'react';
import { Nav, Testimonials, FAQ, PricingCTA, Footer } from './sections.jsx';
import { Hero } from './hero.jsx';
import { FeedScanner } from './feed-scanner.jsx';
import { VoiceProfile } from './voice-profile.jsx';
import { Composer } from './composer.jsx';
import { FeaturesGrid } from './features.jsx';
import { Scheduler } from './scheduler.jsx';
import { useTweaks, TweaksPanel, TweakSection, TweakSlider, TweakToggle, TweakRadio } from './tweaks-panel.jsx';

const TWEAK_DEFAULTS = {
  particleDensity: 1,
  showParticles: true,
  accent: 'duo',
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '2rem', color: '#f87171', fontFamily: 'monospace', fontSize: '13px' }}>
          <strong>Section error:</strong> {this.state.error.message}
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

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
      <ErrorBoundary><Nav /></ErrorBoundary>
      <ErrorBoundary><Hero particleDensity={t.showParticles ? t.particleDensity : 0.01} /></ErrorBoundary>
      <ErrorBoundary><FeedScanner /></ErrorBoundary>
      <ErrorBoundary><VoiceProfile /></ErrorBoundary>
      <ErrorBoundary><Composer /></ErrorBoundary>
      <ErrorBoundary><FeaturesGrid /></ErrorBoundary>
      <ErrorBoundary><Scheduler /></ErrorBoundary>
      <ErrorBoundary><Testimonials /></ErrorBoundary>
      <ErrorBoundary><FAQ /></ErrorBoundary>
      <ErrorBoundary><PricingCTA /></ErrorBoundary>
      <ErrorBoundary><Footer /></ErrorBoundary>

      {import.meta.env.DEV && (
        <TweaksPanel title="Tweaks">
          <TweakSection label="Background" />
          <TweakToggle label="Three.js particles" value={t.showParticles}
                       onChange={(v) => setTweak('showParticles', v)} />
          <TweakSlider label="Particle density" value={t.particleDensity}
                       min={0.3} max={2} step={0.1}
                       onChange={(v) => setTweak('particleDensity', v)} />
          <TweakSection label="Brand" />
          <TweakRadio label="Accent" value={t.accent}
                      options={['duo', 'em', 'vi']}
                      onChange={(v) => setTweak('accent', v)} />
        </TweaksPanel>
      )}
    </div>
  );
}

export default App;
