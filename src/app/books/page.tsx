"use client";
import { openDbFromBlob, searchTableClient } from "@/lib/searchKindle";
import { KindleBookInfo, LookupWithWord } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTableBooks } from "./components/data-table-books";
import { columnsBooks } from "./components/columns-books";
import { columnsLookupWithWord } from "./components/columns-words";
import { DataTableWords } from "./components/data-table-words";
import { Separator } from "@/components/ui/separator";

export default function BooksPage() {
  const params = useSearchParams();
  const blobUrl = params.get("fileUrl")!;
  const [books, setBooks] = useState<KindleBookInfo[] | null>(null);
  const [lookupsWithWords, setLookupsWithWords] = useState<
    LookupWithWord[] | null
  >(null);

  async function fetchLookupWithWord(bookId: string[]) {
    const db = await openDbFromBlob(blobUrl);
    const rows = searchTableClient<LookupWithWord>(
      db,
      "l.id AS lookup_id, l.book_key, l.usage, l.timestamp AS lookup_timestamp, w.id AS word_id, w.word, w.stem, w.lang AS word_lang, w.timestamp AS word_timestamp",
      "LOOKUPS AS l JOIN WORDS AS w ON l.word_key = w.id",
      { book_key: bookId }
    );

    setLookupsWithWords(rows);
  }

  async function fetchBooks() {
    const db = await openDbFromBlob(blobUrl);
    const rows = searchTableClient<KindleBookInfo>(db, "*", "BOOK_INFO", {});

    setBooks(rows);
  }

  function handleSelectionChange(ids: string[]) {
    if (ids.length === 0) return;

    fetchLookupWithWord(ids);
  }

  useEffect(() => {
    console.log("Lookups with words:", lookupsWithWords);
  }, [lookupsWithWords]);

  useEffect(() => {
    if (!blobUrl) return;

    fetchBooks();
  }, [blobUrl]);

  if (books === null) {
    return <p>Carregando livros…</p>;
  }

  if (books.length === 0) {
    return <p>Nenhum livro encontrado neste arquivo.</p>;
  }

  return (
    <>
      <div className="w-full flex align-center justify-center text-4xl my-4">
        Select the books
      </div>
      <div className="container mx-auto px-10">
        <DataTableBooks
          columns={columnsBooks}
          data={books}
          onSelectionChange={handleSelectionChange}
        />
      </div>
      <Separator className="my-10" />

      <div className="w-full flex align-center justify-center text-4xl my-4">
        Words in selected books
      </div>
      <div className="container mx-auto px-10">
        <DataTableWords
          columns={columnsLookupWithWord}
          data={lookupsWithWords ?? []}
        />
      </div>
    </>
  );
}
