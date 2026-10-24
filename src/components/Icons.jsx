export function Icon({ name, size = 18, className = '' }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className: `icon ${className}`.trim(),
    'aria-hidden': 'true',
  };

  const paths = {
    fullscreen: (
      <>
        <path d="M8 3H3v5" />
        <path d="M16 3h5v5" />
        <path d="M8 21H3v-5" />
        <path d="M16 21h5v-5" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="M5 5l14 14" />
        <path d="M19 5L5 19" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </>
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M9.8 9.2a2.4 2.4 0 1 1 3.6 2.1c-.9.5-1.4 1-1.4 2" />
        <path d="M12 16.7h.01" />
      </>
    ),
    exit: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8l4 4-4 4" />
        <path d="M8 12h8" />
      </>
    ),
    chevronDown: <path d="M6 9l6 6 6-6" />,
    chevronRight: <path d="M9 6l6 6-6 6" />,
    chevronLeft: <path d="M15 6l-6 6 6 6" />,
    arrowLeft: (
      <>
        <path d="M19 12H5" />
        <path d="M11 6l-6 6 6 6" />
      </>
    ),
    arrowRight: (
      <>
        <path d="M5 12h14" />
        <path d="M13 6l6 6-6 6" />
      </>
    ),
    flag: (
      <>
        <path d="M5 21V4" />
        <path d="M5 4c4-2 8 2 12 0v9c-4 2-8-2-12 0" />
      </>
    ),
    check: <path d="M5 12.5l4.2 4L19 7" />,
    lock: (
      <>
        <rect x="5" y="10" width="14" height="10" rx="1.5" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3l7 3v5c0 4.4-2.8 7.7-7 10-4.2-2.3-7-5.6-7-10V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 11v5" />
        <path d="M12 7.8h.01" />
      </>
    ),
  };

  return <svg {...common}>{paths[name]}</svg>;
}
