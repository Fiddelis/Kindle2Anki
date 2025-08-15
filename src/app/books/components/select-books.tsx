'use client';

import { openDbFromBlob, searchTableClient } from '@/lib/kindle';
import { KindleBookInfo, LookupWithWord } from '@/types/kindle';
import { useEffect, useState } from 'react';
import { DataTableBooks } from './data-table-books';
import { DataTableWords } from './data-table-words';
import { Separator } from '@/components/ui/separator';
import TranslateSentences from './translate-sentences';

type Props = {
  blobUrl: string;
  lookups: LookupWithWord[];
  onLookupsChange: (rows: LookupWithWord[]) => void;
};
export default function SelectBooks(props: Props) {
  const { blobUrl } = props;
  const [books, setBooks] = useState<KindleBookInfo[] | null>(null);

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
      props.onLookupsChange(rows);
    });
  }

  if (books === null) {
    return <p>Loading books…</p>;
  }
  if (books.length === 0) {
    return <p>No books found in this db file.</p>;
  }

  return (
    <>
      <h1 className="text-4xl text-center my-4 font-bold tracking-tight">Select the books</h1>

      <div>
        <DataTableBooks data={books} onSelectionChange={handleSelectionChange} />
      </div>

      <Separator className="my-10" />

      <h2 className="text-4xl text-center my-4 font-bold tracking-tight">
        Words in selected books
      </h2>
      <div>
        <DataTableWords data={props.lookups} />
      </div>
      <div className="pt-4">
        <TranslateSentences lookups={props.lookups} onLookupsChange={props.onLookupsChange} />
      </div>
    </>
  );
}
