export function BackgroundElements() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-900/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-900/10 rounded-full blur-3xl"></div>
      <div className="absolute top-40 right-20 w-64 h-64 bg-cyan-900/10 rounded-full blur-3xl"></div>

      {/* Decorative grid lines */}
      <div className="absolute inset-0 grid grid-cols-12 opacity-5 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={`col-${i}`} className="border-r border-cyan-500"></div>
        ))}
      </div>
      <div className="absolute inset-0 grid grid-rows-12 opacity-5 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={`row-${i}`} className="border-b border-cyan-500"></div>
        ))}
      </div>
    </div>
  )
}
