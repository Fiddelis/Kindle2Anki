'use client';

import { AnkiCard, LookupWithWord } from '@/types/kindle';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import SelectBooks from './components/select-books';
import ExampleCards from './components/anki-cards';

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replaceWordExactUnicode(text: string, word: string, mask: string) {
  const escaped = escapeRegExp(word.trim());
  const flags = 'giu';
  const re = new RegExp(`(?<![\\p{L}\\p{M}\\p{N}])${escaped}(?![\\p{L}\\p{M}\\p{N}])`, flags);
  return text.replace(re, mask);
}

function generateBasicOnlyWordsCards(
  lookups: Array<Pick<LookupWithWord, 'word' | 'word_translated'>>,
): AnkiCard[] {
  return lookups
    .filter((l): l is { word: string; word_translated: string } => !!l.word && !!l.word_translated)
    .map(
      ({ word, word_translated }) =>
        ({
          front: word.trim(),
          back: word_translated.trim(),
        }) satisfies AnkiCard,
    );
}

function generateBasicWithSentenceTranslatedCards(
  lookups: Array<Pick<LookupWithWord, 'word' | 'word_translated' | 'usage' | 'usage_translated'>>,
): AnkiCard[] {
  return lookups
    .filter(
      (
        l,
      ): l is { word: string; word_translated: string; usage: string; usage_translated: string } =>
        !!l.word && !!l.word_translated && !!l.usage && !!l.usage_translated,
    )
    .map(
      ({ word, word_translated, usage, usage_translated }) =>
        ({
          front: `${replaceWordExactUnicode(usage.trim(), word, `<mark>${word}</mark>`)}`,
          back: `Literal translation: <mark>${word_translated.trim()}</mark><br><br>${usage_translated.trim()}`,
        }) satisfies AnkiCard,
    );
}

function generateClozeDeletionCards(
  lookups: Array<Pick<LookupWithWord, 'word' | 'word_translated' | 'usage' | 'usage_translated'>>,
): AnkiCard[] {
  return lookups
    .filter(
      (
        l,
      ): l is { word: string; word_translated: string; usage: string; usage_translated: string } =>
        !!l.word && !!l.word_translated && !!l.usage && !!l.usage_translated,
    )
    .map(
      ({ word, usage }) =>
        ({
          front: replaceWordExactUnicode(usage.trim(), word, '<mark>[...]</mark>'),
          back: replaceWordExactUnicode(usage.trim(), word, `<mark>${word}</mark>`),
        }) satisfies AnkiCard,
    );
}

export default function PageClient() {
  const params = useSearchParams();
  const router = useRouter();
  type Format = 'basicOnlyWords' | 'basicWithSentenceTranslated' | 'clozeDeletion';
  const [selectedFormat, setSelectedFormat] = useState<Format>('basicOnlyWords');
  const [isValidBlob, setIsValidBlob] = useState<boolean>(true);
  const blobUrl = params.get('fileUrl')!;
  const [lookups, setLookups] = useState<LookupWithWord[]>([]);
  const [cards, setCards] = useState<AnkiCard[]>();
  const [deckName, setDeckName] = useState<string>('k2a');
  const cardTypesExample = [
    {
      label: 'Basic (Only Words)',
      value: 'basicOnlyWords',
    },
    {
      label: 'Basic (With Sentence Translated)',
      value: 'basicWithSentenceTranslated',
    },
    {
      label: 'Cloze Deletion',
      value: 'clozeDeletion',
    },
  ];
  const [downloadRequested, setDownloadRequested] = useState(false);

  const onGenerateCards = useCallback(() => {
    switch (selectedFormat) {
      case 'basicOnlyWords':
        setCards(generateBasicOnlyWordsCards(lookups));
        break;
      case 'basicWithSentenceTranslated':
        setCards(generateBasicWithSentenceTranslatedCards(lookups));
        break;
      case 'clozeDeletion':
        setCards(generateClozeDeletionCards(lookups));
        break;
      default:
        break;
    }
  }, [lookups, selectedFormat]);

  useEffect(() => {
    if (!downloadRequested || !deckName || !cards?.length) return;

    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch('/api/export-apkg', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ deckName, cards }),
          signal: controller.signal,
        });
        if (!res.ok) throw new Error('Falha ao gerar APKG');
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${deckName}.apkg`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      } catch (e) {
        console.error(e);
        alert('Error generating APKG');
      } finally {
        setDownloadRequested(false);
      }
    })();

    return () => controller.abort();
  }, [downloadRequested, deckName, cards]);

  useEffect(() => {
    if (!blobUrl) {
      router.replace('/');
    }
  }, [blobUrl, router]);

  useEffect(() => {
    if (!blobUrl) return;

    const controller = new AbortController();

    (async () => {
      try {
        const res = await fetch(blobUrl, {
          method: 'HEAD',
          signal: controller.signal,
        }).catch(() =>
          fetch(blobUrl, {
            method: 'GET',
            headers: { Range: 'bytes=0-0' },
            signal: controller.signal,
          }),
        );

        if (!res || (res instanceof Response && !res.ok)) {
          throw new Error('Invalid blob URL');
        }

        setIsValidBlob(true);
      } catch {
        setIsValidBlob(false);
        router.replace('/');
      }
    })();
  }, [blobUrl, router]);

  if (!blobUrl || !isValidBlob) return null;

  return (
    <div className="container mx-auto px-10">
      <section>
        <SelectBooks blobUrl={blobUrl} lookups={lookups} onLookupsChange={setLookups} />
      </section>

      <section>
        <ExampleCards
          cardTypes={cardTypesExample}
          selectedFormat={selectedFormat}
          onSelectedFormatChange={(format) => setSelectedFormat(format as Format)}
          onGenerateCards={() => {
            onGenerateCards();
            setDownloadRequested(true);
          }}
          deckName={deckName}
          onDeckNameChange={setDeckName}
        />
      </section>
    </div>
  );
}
