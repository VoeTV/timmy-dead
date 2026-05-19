import type { SVGProps } from "react";

const base = (p: SVGProps<SVGSVGElement>) => ({
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...p
});

export const Play = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M6 4l14 8-14 8V4z" fill="currentColor" stroke="none" />
  </svg>
);

export const Pause = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none" />
    <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none" />
  </svg>
);

export const Skip = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M5 4l11 8-11 8V4z" fill="currentColor" stroke="none" />
    <line x1="19" y1="4" x2="19" y2="20" />
  </svg>
);

export const Rewind = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M19 4L8 12l11 8V4z" fill="currentColor" stroke="none" />
    <line x1="5" y1="4" x2="5" y2="20" />
  </svg>
);

export const Download = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 4v12" />
    <path d="M7 11l5 5 5-5" />
    <path d="M5 20h14" />
  </svg>
);

export const Compass = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
  </svg>
);

export const Heart = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
  </svg>
);

export const Drop = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 3s6 6.5 6 11a6 6 0 11-12 0c0-4.5 6-11 6-11z" />
  </svg>
);

export const Thermo = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M14 14.76V4a2 2 0 10-4 0v10.76a4 4 0 104 0z" />
  </svg>
);

export const Speed = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M21 12a9 9 0 11-9-9" />
    <path d="M12 12l5-3" />
  </svg>
);

export const Ruler = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M3 17l4-4 3 3 4-4 3 3 4-4" />
    <path d="M3 21h18" />
  </svg>
);

export const Weight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M5 8h14l-1.5 12h-11L5 8z" />
    <circle cx="12" cy="6" r="2.5" />
  </svg>
);

export const BookOpen = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M3 5h6a3 3 0 013 3v11a2 2 0 00-2-2H3V5z" />
    <path d="M21 5h-6a3 3 0 00-3 3v11a2 2 0 012-2h7V5z" />
  </svg>
);

export const Beaker = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M9 3h6" />
    <path d="M10 3v6.5L5 19a2 2 0 001.7 3h10.6a2 2 0 001.7-3L14 9.5V3" />
    <path d="M7 14h10" />
  </svg>
);

export const Pin = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 21s7-7.5 7-12a7 7 0 10-14 0c0 4.5 7 12 7 12z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

export const Sparkle = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M12 3v6M12 15v6M3 12h6M15 12h6" />
  </svg>
);

export const ChevronLeft = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M15 6l-6 6 6 6" />
  </svg>
);

export const ChevronRight = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export const Whale = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base({ viewBox: "0 0 24 24", ...p })}>
    <path d="M2 14c1-3 4-5 8-5s7 1 9 3c1 1 3 1 3 1s-1 2-3 2c-1 1-3 2-6 2-2 2-5 2-7 1-2-1-3-2-4-4z" />
    <circle cx="9" cy="11.5" r="0.6" fill="currentColor" stroke="none" />
    <path d="M19 12s1-3 3-3" />
  </svg>
);
