'use client';

import { useRef, useState, DragEvent, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function handleClick() {
    inputRef.current?.click();
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function validateAndSet(f: File | null) {
    setError(null);
    if (!f) return;
    if (!f.name.endsWith('.db')) {
      setError('Invalid file. Please select a .db file (vocab.db).');
      setFile(null);
      return;
    }
    if (!/vocab\.db$/i.test(f.name)) {
      setError('Tip: The Kindle file is usually named "vocab.db".');
    }
    setFile(f);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const f = e.dataTransfer.files?.[0] ?? null;
    validateAndSet(f);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    validateAndSet(f);
  }

  function handleConfirm() {
    if (!file) return;
    const blobUrl = URL.createObjectURL(file);
    router.push(`/books?fileUrl=${encodeURIComponent(blobUrl)}`);
  }

  function clearFile() {
    setFile(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  }

  const humanSize = useMemo(() => {
    if (!file) return '';
    const i = Math.floor(Math.log(file.size) / Math.log(1024));
    const size = (file.size / Math.pow(1024, i)).toFixed(2);
    return `${size} ${['B', 'KB', 'MB', 'GB', 'TB'][i]}`;
  }, [file]);

  return (
    <main className="min-h-screen bg-background flex flex-col gap-10">
      {/* HERO */}
      <section className="container mx-auto px-4 pt-40 pb-6 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          Turn your Kindle vocabulary into Anki flashcards
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Extract your <code className="px-1 py-0.5 rounded bg-muted">vocab.db</code>, select books
          and words, optionally translate them, and generate ready-to-study decks.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button
            className="cursor-pointer"
            size="lg"
            onClick={() =>
              document.getElementById('uploader')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Get started
          </Button>
          <a
            href="https://apps.ankiweb.net/"
            target="_blank"
            rel="noreferrer"
            className="text-sm underline text-muted-foreground hover:text-foreground"
          >
            Need Anki?
          </a>
        </div>
      </section>

      {/* STEPS */}
      <section className="container mx-auto px-4 pb-6">
        <div className="grid md:grid-cols-4 gap-4">
          {[
            {
              title: 'Connect Kindle',
              desc: 'Locate the vocab.db file in your Kindle storage.',
            },
            {
              title: 'Choose books/words',
              desc: 'Filter by book and select only what you want to study.',
            },
            { title: 'Translate (optional)', desc: 'Quick translation to your study language.' },
            { title: 'Export to Anki', desc: 'Generate the package and import in seconds.' },
          ].map((s, i) => (
            <Card key={i} className="border-dashed">
              <CardContent className="pt-6">
                <div className="text-xs text-muted-foreground mb-1">Step {i + 1}</div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* UPLOAD */}
      <section id="uploader" className="container mx-auto px-4 py-6">
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleClick()}
          aria-label="Area to select or drop vocab.db file"
          className={cn(
            'mx-auto max-w-2xl rounded-2xl border border-dashed transition-all cursor-pointer',
            'flex flex-col items-center justify-center p-8 text-center',
            dragActive ? 'border-primary shadow-lg' : 'hover:shadow-md',
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".db,application/octet-stream"
            className="hidden"
            onChange={handleChange}
          />

          <div className="flex flex-col items-center gap-2">
            <div className="text-sm text-muted-foreground">
              Click here or drag your <b>vocab.db</b> file
            </div>
            <div className="text-xs text-muted-foreground">
              Typical path:{' '}
              <code className="px-1 py-0.5 rounded bg-muted">/system/vocabulary/vocab.db</code>
            </div>

            {file ? (
              <div className="mt-3 text-sm">
                <span className="font-medium">{file.name}</span>{' '}
                <span className="text-muted-foreground">({humanSize})</span>
              </div>
            ) : null}

            {error ? <div className="mt-2 text-sm text-red-600">{error}</div> : null}

            <div className="mt-4 flex gap-2">
              <Button variant="outline" onClick={handleClick} className="cursor-pointer">
                {file ? 'Change file' : 'Select file'}
              </Button>
              {file ? (
                <Button variant="ghost" onClick={clearFile}>
                  Clear
                </Button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-2xl mt-4 flex items-center justify-center">
          <Button className="cursor-pointer" disabled={!file} onClick={handleConfirm}>
            Confirm and continue
          </Button>
        </div>
      </section>
    </main>
  );
}
