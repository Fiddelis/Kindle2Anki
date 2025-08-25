'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function HowToUsePage() {
  return (
    <div className="mx-auto container px-4 pb-24 pt-10">
      {/* Header */}
      <header className="flex flex-col items-center text-center gap-3 mb-10">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          How to Use <span className="text-primary">Kindle2Anki</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Follow these steps to locate your Kindle vocabulary database, load it into Kindle2Anki,
          and generate an <b>.apkg</b> file ready for Anki.
        </p>
      </header>

      {/* Steps */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1 */}
        <Card className="rounded-2xl shadow-sm flex justify-between">
          <CardHeader>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border">
                1
              </span>
              <span>Find your Kindle file</span>
            </div>
            <CardTitle className="text-xl">
              Locate <code>vocab.db</code>
            </CardTitle>
            <CardDescription>
              The Kindle vocabulary database is typically stored in the paths below. After locating
              the file, <b>make sure to copy it to another folder on your system</b> to ensure it
              can be accessed and later uploaded to the site.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-3 text-sm">
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <b>Kindle e‑ink (USB):</b> <code>/system/vocabulary/vocab.db</code>
                </li>
              </ul>
            </div>
            <div className="relative aspect-video w-full h-80 overflow-hidden rounded-xl border">
              <Image
                src="/find-vocabdb.png"
                alt="Where to find the vocab.db file"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
                priority
              />
            </div>
          </CardContent>
        </Card>

        {/* Step 2 */}
        <Card className="rounded-2xl shadow-sm flex justify-between">
          <CardHeader>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border">
                2
              </span>
              <span>Load into Kindle2Anki</span>
            </div>
            <CardTitle className="text-xl">
              Upload <code>vocab.db</code> and review entries
            </CardTitle>
            <CardDescription>
              Drag and drop the file or click to select it. Filter, sort, and pick the books you
              want to include. When you are ready, click <b>Generate Cards</b>.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative aspect-video w-full h-96 overflow-hidden rounded-xl border">
              <Image
                src="/upload-vocabdb.gif"
                alt="Upload vocab.db in Kindle2Anki"
                fill
                className="object-cover scale-125 ml-13 mb-10"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
              />
            </div>
          </CardContent>
        </Card>

        {/* Step 3 */}
        <Card className="rounded-2xl shadow-sm flex justify-between">
          <CardHeader>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border">
                3
              </span>
              <span>Create your Anki deck</span>
            </div>
            <CardTitle className="text-xl">
              Download the <code>.apkg</code> and open it with Anki
            </CardTitle>
            <CardDescription>
              Select the books and translate the words. Then click <b>Generate Cards</b> to build
              and download an <code>.apkg</code> file.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            Double-click the file or open Anki and go to <b>File → Import</b>.
            <div className="relative aspect-video w-full h-96 overflow-hidden rounded-xl border">
              <Image
                src="/anki-import.gif"
                alt="Importing .apkg into Anki"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 33vw"
              />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer note */}
      <p className="mt-10 text-xs text-center text-muted-foreground">
        Need more help?{' '}
        <Link href="/contact" className="underline underline-offset-4">
          Contact us
        </Link>
        .
      </p>
    </div>
  );
}
