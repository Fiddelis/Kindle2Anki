const F_CELLS: Array<[number, number]> = [
  [0, 0],
  [1, 0],
  [2, 0],
  [3, 0],
  [0, 1],
  [0, 2],
  [1, 2],
  [2, 2],
  [0, 3],
];

function FiddelisMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 442 442"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="crispEdges"
    >
      {F_CELLS.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x * 114} y={y * 114} width={100} height={100} fill="#3f54aa" />
      ))}
    </svg>
  );
}

export function FiddelisCredit() {
  return (
    <div className="flex items-baseline gap-3 px-4 pt-4 sm:px-6">
      <span className="text-2xl font-semibold tracking-tight text-foreground">Kindle2Anki</span>
      <a
        href="https://fiddelis.dev"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="by fiddelis.dev"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <span>by</span>
        <FiddelisMark className="h-3.5 w-3.5" />
        <span className="font-medium">fiddelis.dev</span>
      </a>
    </div>
  );
}
