"use client";
import { openDbFromBlob, searchTableClient } from "@/lib/searchKindle";
import { KindleBookInfo } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTable } from "./components/data-table";
import { columnsBooks } from "./components/columns-books";

export default function BooksPage() {
  const params = useSearchParams();
  const blobUrl = params.get("fileUrl")!;
  const [books, setBooks] = useState<KindleBookInfo[] | null>(null);

  useEffect(() => {
    if (!blobUrl) return;

    async function fetchBooks() {
      const db = await openDbFromBlob(blobUrl);
      const rows = searchTableClient<KindleBookInfo>(db, "BOOK_INFO", {});

      setBooks(rows);
    }

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
        <DataTable columns={columnsBooks} data={books} />
      </div>
    </>
  );
}
