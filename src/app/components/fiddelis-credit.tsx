export function FiddelisCredit({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-2xl font-semibold tracking-tight text-foreground">Kindle2Anki</span>
      <a
        href="https://fiddelis.dev"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block shrink-0 transition-transform duration-200 hover:-translate-y-px"
      >
        {/* Pre-rendered pixel-snapped sticker; 1x/2x/3x keep the pixel logo crisp. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/by-fiddelis-sticker@1x.png"
          srcSet="/by-fiddelis-sticker@1x.png 1x, /by-fiddelis-sticker@2x.png 2x, /by-fiddelis-sticker@3x.png 3x"
          width={133}
          height={36}
          alt="by Fiddelis"
          className="block h-[36px] w-[133px] max-w-none"
          draggable={false}
        />
      </a>
    </div>
  );
}
