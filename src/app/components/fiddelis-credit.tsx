import { FiddelisLogo } from './fiddelis-logo';

export function FiddelisCredit({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="text-2xl font-semibold tracking-tight text-foreground">Kindle2Anki</span>
      <a
        href="https://fiddelis.dev"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="by Fiddelis"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <span>by</span>
        <FiddelisLogo className="h-[13px] w-auto" />
      </a>
    </div>
  );
}
