import { useEffect } from 'react';
import { Icon } from './Icons';

export function MenuDrawer({ open, onClose, candidate, participantId, languages, onOpenPrivacy, onFullscreen }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;

  const copyParticipantId = async () => {
    if (!participantId) return;
    try {
      await navigator.clipboard.writeText(participantId);
    } catch {
      // Clipboard access may be blocked by the browser; the ID remains visible for manual copying.
    }
  };

  return (
    <div className="drawer-layer">
      <button type="button" className="drawer-backdrop" aria-label="Close assessment menu" onClick={onClose} />
      <aside className="drawer drawer--reference" aria-label="Assessment menu">
        <div className="drawer__reference-top">
          <button type="button" className="drawer-reference-icon" aria-label="Toggle fullscreen" title="Toggle fullscreen" onClick={onFullscreen}>
            <Icon name="fullscreen" size={19} />
          </button>
          <button type="button" className="drawer-reference-close" aria-label="Close menu" onClick={onClose}>
            <Icon name="close" size={21} />
          </button>
        </div>
        <div className="drawer__reference-body">
          <div className="drawer-reference-row drawer-reference-row--participant">
            <div><strong>Name:</strong> {candidate?.name || 'Not registered'}</div>
          </div>
          <div className="drawer-reference-row drawer-reference-row--participant">
            <div><strong>Participant ID:</strong> {participantId || 'Not generated'}</div>
            <button type="button" className="drawer-copy-id" aria-label="Copy participant ID" title="Copy participant ID" onClick={copyParticipantId}>
              <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="8" y="3" width="12" height="15" rx="1.5"/><path d="M5 7v14h12"/></svg>
            </button>
          </div>
          <div className="drawer-reference-row">
            <strong>Assessment Language:</strong> {languages.assessment}
          </div>
          <button type="button" className="drawer-reference-language" aria-label="Navigation language">
            <span><strong>Navigation language:</strong> {languages.navigation}</span>
            <Icon name="chevronDown" size={13} />
          </button>
          <button type="button" className="drawer-reference-privacy" onClick={onOpenPrivacy}>Data Protection Notice</button>
        </div>
      </aside>
    </div>
  );
}
