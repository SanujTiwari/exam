import { branding } from '../config/assessment';

export function Brand({ compact = false }) {
  return (
    <div className={`brand ${compact ? 'brand--compact' : ''}`} aria-label={branding.name}>
      <span className="brand__mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span className="brand__word">
        {branding.name.slice(0, -2)}
        <span>{branding.name.slice(-2)}</span>
      </span>
    </div>
  );
}
