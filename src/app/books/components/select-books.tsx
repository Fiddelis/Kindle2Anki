'use client';

import { openDbFromBlob, searchTableClient } from '@/lib/kindle';
import { KindleBookInfo, LookupWithWord } from '@/types/kindle';
import { useSearchParams } from 'next/navigation';
import { SetStateAction, useEffect, useState } from 'react';
import { DataTableBooks } from './data-table-books';
import { columnsBooks } from './columns-books';
import { columnsLookupWithWord } from './columns-words';
import { DataTableWords } from './data-table-words';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { translate } from '@/lib/translate';

export default function SelectBooks() {
  const params = useSearchParams();
  const blobUrl = params.get('fileUrl')!;

  const [books, setBooks] = useState<KindleBookInfo[] | null>(null);
  const [lookupsWithWords, setLookupsWithWords] = useState<LookupWithWord[] | null>(null);

  // Search for books
  useEffect(() => {
    if (!blobUrl) return;
    openDbFromBlob(blobUrl).then((db) => {
      const rows = searchTableClient<KindleBookInfo>(db, '*', 'BOOK_INFO', {});
      setBooks(rows);
    });
  }, [blobUrl]);

  // Search for lookups when selecting books
  function handleSelectionChange(ids: string[]) {
    if (ids.length === 0) return;
    openDbFromBlob(blobUrl).then((db) => {
      const rows = searchTableClient<LookupWithWord>(
        db,
        `l.id AS lookup_id,
         l.book_key AS book_id,
         l.usage,
         l.timestamp AS lookup_timestamp,
         w.id AS word_id,
         w.word,
         w.stem,
         w.lang AS word_lang,
         w.timestamp AS word_timestamp`,
        'LOOKUPS AS l JOIN WORDS AS w ON l.word_key = w.id',
        { book_id: ids },
      );
      setLookupsWithWords(rows);
    });
  }

  function handleTranslate() {
    if (!lookupsWithWords || lookupsWithWords.length === 0) return;

    translate(lookupsWithWords, 'pt').then(
      (translated: SetStateAction<LookupWithWord[] | null>) => {
        setLookupsWithWords(translated);
      },
    );
  }

  if (books === null) {
    return <p>Carregando livros…</p>;
  }
  if (books.length === 0) {
    return <p>Nenhum livro encontrado neste arquivo.</p>;
  }

  return (
    <>
      <h1 className="text-4xl text-center my-4">Select the books</h1>

      <div className="container mx-auto">
        <DataTableBooks
          columns={columnsBooks}
          data={books}
          onSelectionChange={handleSelectionChange}
        />
      </div>

      <Separator className="my-10" />

      <h2 className="text-4xl text-center my-4">Words in selected books</h2>
      <div className="container mx-auto">
        <DataTableWords columns={columnsLookupWithWord} data={lookupsWithWords ?? []} />
        <div>
          <Button onClick={handleTranslate}>Translate</Button>
        </div>
      </div>
    </>
  );
}
