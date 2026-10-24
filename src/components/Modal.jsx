import { useEffect } from 'react';
import { Icon } from './Icons';

export function Modal({ open, title, children, onClose, actions, width = 480 }) {
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

  return (
    <div className="modal-layer" role="presentation">
      <button
        type="button"
        className="modal-backdrop"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <section
        className="modal"
        style={{ maxWidth: width }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal__header">
          <h2 id="modal-title">{title}</h2>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close dialog">
            <Icon name="close" />
          </button>
        </div>
        <div className="modal__body">{children}</div>
        {actions ? <div className="modal__actions">{actions}</div> : null}
      </section>
    </div>
  );
}
