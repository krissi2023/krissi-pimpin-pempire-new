import React from 'react';
import { 
  DiamondLogo, 
  CoinIcon, 
  ArcadeMachineIcon,
  PuzzleIcon,
  DiamondSpinner,
  StarBurst,
  NeonText
} from '../components/Graphics';
import ImagePlaceholder, {
  ComicCoverPlaceholder,
  PuzzlePlaceholder,
  WallpaperPlaceholder,
  SlotSymbolPlaceholder
} from '../components/ImagePlaceholder';
import '../components/GraphicEffects.css';
import './GraphicsDemo.css';

/**
 * Graphics Demo Page
 * Showcases all available graphic components and effects
 * 
 * Visit this page to see everything in action!
 */
function GraphicsDemo() {
  return (
    <div className="graphics-demo">
      <header className="demo-header">
        <DiamondLogo size={100} />
        <h1 className="neon-glow pulse-glow">Graphics System Demo</h1>
        <p>All components and effects available in Diamondz Playhouse</p>
      </header>

      {/* SVG Components Section */}
      <section className="demo-section">
        <h2>SVG Components</h2>
        <div className="demo-grid">
          <div className="demo-item">
            <DiamondLogo size={80} />
            <p>DiamondLogo</p>
          </div>
          <div className="demo-item">
            <ArcadeMachineIcon size={80} />
            <p>ArcadeMachineIcon</p>
          </div>
          <div className="demo-item">
            <CoinIcon type="arcade" size={64} />
            <p>CoinIcon (arcade)</p>
          </div>
          <div className="demo-item">
            <CoinIcon type="gold" size={64} />
            <p>CoinIcon (gold)</p>
          </div>
          <div className="demo-item">
            <CoinIcon type="pb" size={64} />
            <p>CoinIcon (pb)</p>
          </div>
          <div className="demo-item">
            <PuzzleIcon size={64} />
            <p>PuzzleIcon</p>
          </div>
          <div className="demo-item">
            <DiamondSpinner />
            <p>DiamondSpinner</p>
          </div>
          <div className="demo-item">
            <StarBurst />
            <p>StarBurst</p>
          </div>
        </div>
      </section>

      {/* Text Effects Section */}
      <section className="demo-section dark-bg">
        <h2>Text Effects</h2>
        <div className="text-effects-demo">
          <h3 className="neon-glow">Neon Glow Text</h3>
          <h3 className="neon-flicker">Neon Flicker Text</h3>
          <h3 className="pulse-glow">Pulse Glow Text</h3>
          <h3 className="shimmer-text">Shimmer Text</h3>
          <NeonText text="NeonText Component" color="#00d4ff" />
        </div>
      </section>

      {/* Comic Effects Section */}
      <section className="demo-section">
        <h2>Comic Book Effects</h2>
        <div className="demo-grid">
          <div className="comic-panel">
            <p>Comic Panel Frame</p>
            <p className="small">Perfect for content boxes</p>
          </div>
          <div className="speech-bubble">
            This is a speech bubble!
          </div>
          <div className="thought-bubble">
            This is a thought bubble...
          </div>
          <div className="comic-impact">POW!</div>
          <div className="comic-impact">BAM!</div>
          <div className="comic-impact">BOOM!</div>
        </div>
      </section>

      {/* Button Animations Section */}
      <section className="demo-section dark-bg">
        <h2>Button Animations</h2>
        <div className="button-demo">
          <button className="demo-btn pulse-glow">Pulse Glow</button>
          <button className="demo-btn shimmer">Shimmer</button>
          <button className="demo-btn bounce-in">Bounce In</button>
          <button className="demo-btn neon-glow">Neon Glow</button>
        </div>
      </section>

      {/* Image Placeholders Section */}
      <section className="demo-section">
        <h2>Image Placeholders</h2>
        <div className="placeholder-showcase">
          <div className="placeholder-item">
            <ComicCoverPlaceholder title="The Rise" comicId="1" />
            <p>Comic Cover</p>
          </div>
          <div className="placeholder-item">
            <PuzzlePlaceholder puzzleType="jigsaw" />
            <p>Jigsaw Puzzle</p>
          </div>
          <div className="placeholder-item">
            <WallpaperPlaceholder resolution="1920x1080" />
            <p>Wallpaper</p>
          </div>
          <div className="placeholder-item">
            <SlotSymbolPlaceholder symbolName="Diamond" />
            <p>Slot Symbol</p>
          </div>
        </div>
      </section>

      {/* Celebration Effects Section */}
      <section className="demo-section dark-bg">
        <h2>Celebration Effects</h2>
        <div className="celebration-demo">
          <button 
            className="demo-btn pulse-glow"
            onClick={(e) => {
              e.target.classList.add('win-celebration');
              setTimeout(() => e.target.classList.remove('win-celebration'), 2000);
            }}
          >
            Trigger Win Celebration
          </button>
          <div className="star-burst">⭐</div>
          <div className="confetti-burst">🎉</div>
        </div>
      </section>

      {/* Arcade Effects Section */}
      <section className="demo-section">
        <h2>Arcade Effects</h2>
        <div className="arcade-demo">
          <div className="coin-flip">
            <CoinIcon type="gold" size={64} />
          </div>
          <div className="slot-spin">
            <div className="slot-symbol">🍒</div>
            <div className="slot-symbol">💎</div>
            <div className="slot-symbol">⭐</div>
          </div>
        </div>
      </section>

      {/* Combined Example Section */}
      <section className="demo-section dark-bg">
        <h2>Combined Example</h2>
        <div className="combined-example">
          <div className="comic-panel">
            <DiamondLogo size={60} />
            <h3 className="neon-glow">Welcome to the Arcade!</h3>
            <div className="speech-bubble">
              Purchase a comic to get $50 in arcade credits!
            </div>
            <div className="currency-display">
              <div className="currency-item">
                <CoinIcon type="arcade" size={32} />
                <span className="shimmer-text">5000 Credits</span>
              </div>
              <div className="currency-item">
                <CoinIcon type="gold" size={32} />
                <span className="shimmer-text">150 Gold</span>
              </div>
              <div className="currency-item">
                <CoinIcon type="pb" size={32} />
                <span className="shimmer-text">75 PB</span>
              </div>
            </div>
            <button className="demo-btn pulse-glow neon-glow">
              Start Playing
            </button>
          </div>
        </div>
      </section>

      {/* Usage Guide Section */}
      <section className="demo-section">
        <h2>How to Use</h2>
        <div className="usage-guide">
          <div className="usage-card">
            <h3>Import Components</h3>
            <pre>{`import { DiamondLogo, CoinIcon } from '../components/Graphics';
import '../components/GraphicEffects.css';`}</pre>
          </div>
          <div className="usage-card">
            <h3>Use SVG Components</h3>
            <pre>{`<DiamondLogo size={80} />
<CoinIcon type="gold" size={32} />`}</pre>
          </div>
          <div className="usage-card">
            <h3>Apply CSS Effects</h3>
            <pre>{`<h1 className="neon-glow pulse-glow">
  My Title
</h1>
<button className="shimmer">
  Click Me
</button>`}</pre>
          </div>
          <div className="usage-card">
            <h3>Use Placeholders</h3>
            <pre>{`import { ComicCoverPlaceholder } from '../components/ImagePlaceholder';

<ComicCoverPlaceholder 
  title="The Rise" 
  comicId="1" 
/>`}</pre>
          </div>
        </div>
      </section>

      {/* Documentation Links */}
      <section className="demo-section dark-bg">
        <h2>Documentation</h2>
        <div className="doc-links">
          <a href="/docs/GRAPHICS_OVERVIEW.md" className="doc-link neon-glow">
            <div className="doc-icon">📚</div>
            <div className="doc-info">
              <h4>Graphics Overview</h4>
              <p>Complete system documentation</p>
            </div>
          </a>
          <a href="/docs/GRAPHICS_QUICKSTART.md" className="doc-link neon-glow">
            <div className="doc-icon">🚀</div>
            <div className="doc-info">
              <h4>Quick Start Guide</h4>
              <p>Common tasks & examples</p>
            </div>
          </a>
          <a href="/docs/DESIGN_SYSTEM.md" className="doc-link neon-glow">
            <div className="doc-icon">🎨</div>
            <div className="doc-info">
              <h4>Design System</h4>
              <p>Brand guidelines & specs</p>
            </div>
          </a>
          <a href="/docs/ASSET_GUIDE.md" className="doc-link neon-glow">
            <div className="doc-icon">📸</div>
            <div className="doc-info">
              <h4>Asset Management</h4>
              <p>How to add images</p>
            </div>
          </a>
        </div>
      </section>

      <footer className="demo-footer">
        <DiamondSpinner />
        <p>All components are ready to use throughout your app!</p>
        <p className="shimmer-text">💎 Diamondz Playhouse Graphics System ✨</p>
      </footer>
    </div>
  );
}

export default GraphicsDemo;
