/** Vapor y brillo sutiles sobre una foto. Solo CSS; se desactiva con prefers-reduced-motion. */
export function Steam() {
  return (
    <div aria-hidden="true" className="steam pointer-events-none absolute inset-0 overflow-hidden">
      <span className="wisp w1" /><span className="wisp w2" /><span className="wisp w3" />
      <span className="shine" />
    </div>
  )
}
