/** Döner en SVG/CSS: "gira" desplazando la textura bajo una silueta cilíndrica. Respeta prefers-reduced-motion vía CSS. */
export function DonerFallback({ label = 'Döner girando' }: { label?: string }) {
  const bands = Array.from({ length: 16 })
  return (
    <svg viewBox="0 0 320 420" role="img" aria-label={label} className="mx-auto h-full w-full max-h-[460px]">
      <defs>
        <clipPath id="dk-clip"><path d="M118 70c-30 10-48 60-62 140-8 46-4 100 10 118 20 8 168 8 188 0 14-18 18-72 10-118-14-80-32-130-62-140z" /></clipPath>
        <linearGradient id="dk-shade" x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".78" /><stop offset=".3" stopColor="#000" stopOpacity="0" />
          <stop offset=".62" stopColor="#fff" stopOpacity=".08" /><stop offset="1" stopColor="#000" stopOpacity=".8" />
        </linearGradient>
        <linearGradient id="dk-glow" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#ef5b3a" /><stop offset="1" stopColor="#c2301f" stopOpacity="0" /></linearGradient>
        <linearGradient id="dk-steel" x1="0" x2="1"><stop offset="0" stopColor="#6c6560" /><stop offset=".5" stopColor="#e9e1d6" /><stop offset="1" stopColor="#6c6560" /></linearGradient>
      </defs>
      <ellipse cx="160" cy="395" rx="120" ry="14" fill="#c2301f" opacity=".35" className="flame" />
      <rect x="44" y="60" width="26" height="320" rx="10" fill="url(#dk-glow)" className="flame" opacity=".85" />
      <rect x="250" y="60" width="26" height="320" rx="10" fill="url(#dk-glow)" className="flame" opacity=".85" />
      <rect x="155" y="20" width="10" height="380" rx="5" fill="url(#dk-steel)" />
      <g clipPath="url(#dk-clip)">
        <rect x="40" y="60" width="240" height="290" fill="#6b3319" />
        <g className="doner-strip">
          {bands.map((_, i) => (
            <g key={i} transform={`translate(${i * 40 - 40} 0)`}>
              <path d={`M0 ${70 + (i % 3) * 6} q20 -10 40 0 v300 h-40z`} fill={i % 2 ? '#8a4a22' : '#a45b2a'} />
              <path d={`M6 ${110 + (i % 4) * 14} h24 M2 ${190 + (i % 3) * 18} h30 M8 ${270 + (i % 2) * 20} h22`} stroke={i % 3 ? '#e8c07a' : '#4a2210'} strokeWidth="6" strokeLinecap="round" opacity=".75" />
            </g>
          ))}
        </g>
        <rect x="40" y="60" width="240" height="320" fill="url(#dk-shade)" />
      </g>
      <ellipse cx="160" cy="72" rx="48" ry="9" fill="#d89a58" />
      <circle cx="160" cy="26" r="9" fill="url(#dk-steel)" />
    </svg>
  )
}
