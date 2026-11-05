import type { SVGProps } from 'react'
const base = (p: SVGProps<SVGSVGElement>) => ({ width: 20, height: 20, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true, ...p })
export const WhatsAppIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.4A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.1.82.83-3.03-.2-.31a8.2 8.2 0 1 1 6.97 3.85Zm4.5-6.15c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-3.3-2.88c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.48a.92.92 0 0 0-.67.31c-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.6c.12.17 1.78 2.72 4.3 3.81 1.6.69 2.22.75 3.02.63.49-.07 1.46-.6 1.67-1.17.2-.58.2-1.07.14-1.17-.06-.1-.23-.16-.48-.28Z" /></svg>
)
export const PhoneIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1Z" /></svg>
)
export const InstagramIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6Zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" /></svg>
)
export const TikTokIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M16.6 2h-3.1v13.4a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.4a6 6 0 1 0 5.1 5.9V8.6a7.4 7.4 0 0 0 4.3 1.4V6.9a4.3 4.3 0 0 1-4.3-4.3V2Z" /></svg>
)
export const PinIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" /></svg>
)
export const ClockIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm.75 5v5.2l4.1 2.4-.75 1.3-4.85-2.8V7h1.5Z" /></svg>
)
export const StarIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9L12 2.5Z" /></svg>
)
export const PlayIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)}><path d="M8 5v14l11-7z" /></svg>
)
