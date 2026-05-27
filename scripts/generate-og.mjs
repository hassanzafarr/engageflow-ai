import sharp from 'sharp';

const W = 1200;
const H = 630;

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="textGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#8b5cf6"/>
    </linearGradient>
    <radialGradient id="glowEm" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#10b981" stop-opacity="0.25"/>
      <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowVi" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="clip">
      <rect width="${W}" height="${H}"/>
    </clipPath>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="#09090b"/>

  <!-- Grid -->
  ${Array.from({ length: 22 }, (_, i) => `<line x1="${i * 56}" y1="0" x2="${i * 56}" y2="${H}" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>`).join('\n  ')}
  ${Array.from({ length: 12 }, (_, i) => `<line x1="0" y1="${i * 56}" x2="${W}" y2="${i * 56}" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>`).join('\n  ')}

  <!-- Glow orbs -->
  <ellipse cx="180" cy="220" rx="380" ry="320" fill="url(#glowEm)" clip-path="url(#clip)"/>
  <ellipse cx="1050" cy="460" rx="340" ry="280" fill="url(#glowVi)" clip-path="url(#clip)"/>

  <!-- Border frame -->
  <rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="0" fill="none" stroke="rgba(255,255,255,0.07)" stroke-width="1"/>

  <!-- Logo badge -->
  <rect x="80" y="72" width="176" height="38" rx="19" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
  <circle cx="107" cy="91" r="8" fill="#10b981" opacity="0.9"/>
  <text x="123" y="96" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-size="13.5" font-weight="600" fill="rgba(255,255,255,0.85)" letter-spacing="0.2">EngageFlow AI</text>

  <!-- Headline line 1 -->
  <text x="80" y="270" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-size="80" font-weight="800" fill="white" letter-spacing="-3">Your Voice,</text>

  <!-- Headline line 2 — gradient -->
  <text x="80" y="368" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-size="80" font-weight="800" fill="url(#textGrad)" letter-spacing="-3">Amplified.</text>

  <!-- Subtext -->
  <text x="80" y="430" font-family="ui-sans-serif, system-ui, -apple-system, sans-serif" font-size="21" fill="rgba(255,255,255,0.5)" letter-spacing="0.1">AI-powered LinkedIn &amp; X engagement. Draft, refine, schedule — in your sidebar.</text>

  <!-- Pills row -->
  <rect x="80" y="508" width="136" height="30" rx="15" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.35)" stroke-width="1"/>
  <text x="148" y="528" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12.5" font-weight="600" fill="#6ee7b7" text-anchor="middle">Chrome Extension</text>

  <rect x="228" y="508" width="120" height="30" rx="15" fill="rgba(139,92,246,0.12)" stroke="rgba(139,92,246,0.35)" stroke-width="1"/>
  <text x="288" y="528" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12.5" font-weight="600" fill="#c4b5fd" text-anchor="middle">Claude Powered</text>

  <rect x="360" y="508" width="104" height="30" rx="15" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" stroke-width="1"/>
  <text x="412" y="528" font-family="ui-sans-serif, system-ui, sans-serif" font-size="12.5" font-weight="600" fill="rgba(255,255,255,0.55)" text-anchor="middle">Local-first</text>

  <!-- URL hint bottom-right -->
  <text x="${W - 80}" y="${H - 38}" font-family="ui-monospace, monospace" font-size="13" fill="rgba(255,255,255,0.2)" text-anchor="end">engageflow.ai</text>
</svg>`;

await sharp(Buffer.from(svg))
  .resize(W, H)
  .png({ compressionLevel: 9 })
  .toFile('public/og-image.png');

console.log('✓ public/og-image.png — 1200×630');
