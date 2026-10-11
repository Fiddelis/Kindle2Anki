// Static export of the fiddelis.dev logo at rest (4x4 F grid + pixel IDDELIS).
const GHOST_CELLS = [
  [3.8, 3.8],
  [7.6, 3.8],
  [11.4, 3.8],
  [11.4, 7.6],
  [3.8, 11.4],
  [7.6, 11.4],
  [11.4, 11.4],
] as const;
const LIT_CELLS = [
  [0, 0],
  [3.8, 0],
  [7.6, 0],
  [11.4, 0],
  [0, 3.8],
  [0, 7.6],
  [3.8, 7.6],
  [7.6, 7.6],
  [0, 11.4],
] as const;
const WORD_PATH =
  'M0 0h2v1h-2zM0 1h2v1h-2zM0 2h2v1h-2zM0 3h2v1h-2zM0 4h2v1h-2zM0 5h2v1h-2zM0 6h2v1h-2zM3 0h5v1h-5zM3 1h2v1h-2zM7 1h2v1h-2zM3 2h2v1h-2zM7 2h2v1h-2zM3 3h2v1h-2zM7 3h2v1h-2zM3 4h2v1h-2zM7 4h2v1h-2zM3 5h2v1h-2zM7 5h2v1h-2zM3 6h5v1h-5zM10 0h5v1h-5zM10 1h2v1h-2zM14 1h2v1h-2zM10 2h2v1h-2zM14 2h2v1h-2zM10 3h2v1h-2zM14 3h2v1h-2zM10 4h2v1h-2zM14 4h2v1h-2zM10 5h2v1h-2zM14 5h2v1h-2zM10 6h5v1h-5zM17 0h6v1h-6zM17 1h2v1h-2zM17 2h2v1h-2zM17 3h5v1h-5zM17 4h2v1h-2zM17 5h2v1h-2zM17 6h6v1h-6zM24 0h2v1h-2zM24 1h2v1h-2zM24 2h2v1h-2zM24 3h2v1h-2zM24 4h2v1h-2zM24 5h2v1h-2zM24 6h6v1h-6zM31 0h2v1h-2zM31 1h2v1h-2zM31 2h2v1h-2zM31 3h2v1h-2zM31 4h2v1h-2zM31 5h2v1h-2zM31 6h2v1h-2zM35 0h5v1h-5zM34 1h2v1h-2zM34 2h2v1h-2zM35 3h4v1h-4zM38 4h2v1h-2zM38 5h2v1h-2zM34 6h5v1h-5z';

export function FiddelisLogo({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      shapeRendering="crispEdges"
      viewBox="0 0 81.792 14.4"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="#e3cfad" opacity={0.42}>
        {GHOST_CELLS.map(([x, y]) => (
          <rect height={3} key={`${x}-${y}`} width={3} x={x} y={y} />
        ))}
      </g>
      <g fill="#3f54aa">
        {LIT_CELLS.map(([x, y]) => (
          <rect height={3} key={`${x}-${y}`} width={3} x={x} y={y} />
        ))}
      </g>
      <g transform="translate(16.0046 1.584) scale(1.6046)">
        <path d={WORD_PATH} fill="#e3cfad" transform="translate(0.6 0.6)" />
        <path d={WORD_PATH} fill="#243966" />
      </g>
    </svg>
  );
}
