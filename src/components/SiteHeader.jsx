import { Icon } from './Icons';

export function SiteHeader({ onMenu, onFullscreen, isFullscreen, timerLabel, showTimer, onHelp, onExit }) {
  return (
    <header className="site-header">
      <button
        type="button"
        className="site-header__wordmark"
        title="Open assessment menu"
        aria-label="Open assessment menu"
        onClick={onMenu}
      >
        <img className="site-header__logo" src="/shl-wordmark.png" alt="SHL" />
      </button>

      <div className="site-header__center">
        {showTimer && timerLabel ? (
          <div className="site-header__timer" aria-label={`Time remaining: ${timerLabel}`}>
            {timerLabel}
          </div>
        ) : null}
      </div>

      <div className="site-header__actions">
        {/* Fullscreen button - always visible */}
        <button
          type="button"
          className={`site-header__action-btn site-header__fullscreen-btn ${isFullscreen ? 'is-active' : ''}`}
          title={isFullscreen ? 'Exit full screen' : 'Enter full screen'}
          aria-label={isFullscreen ? 'Exit full screen' : 'Enter full screen'}
          onClick={onFullscreen}
        >
          <Icon name="fullscreen" size={16} />
        </button>

        <span className="site-header__divider" aria-hidden="true" />

        {/* Help button - always visible */}
        <button
          type="button"
          className="site-header__action-btn site-header__help-btn"
          onClick={onHelp}
        >
          <Icon name="help" size={16} />
          Help
        </button>

        <span className="site-header__divider" aria-hidden="true" />

        {/* Exit button - always visible */}
        <button
          type="button"
          className="site-header__action-btn site-header__exit-btn"
          onClick={onExit}
        >
          <Icon name="exit" size={16} />
          Exit
        </button>

        <span className="site-header__divider" aria-hidden="true" />

        {/* Hamburger menu - always visible */}
        <button
          type="button"
          className="site-header__action-btn site-header__menu-btn"
          title="Open assessment menu"
          aria-label="Open assessment menu"
          onClick={onMenu}
        >
          <Icon name="menu" size={18} />
        </button>
      </div>
    </header>
  );
}
