import { Suspense } from "react";
import BooksClient from "./books-client";

export default function BooksPage() {
  return (
    <div>
      <h1 className="text-4xl text-center my-4">Select the books</h1>
      <Suspense
        fallback={
          <p className="text-center">Carregando interface de livros…</p>
        }
      >
        <BooksClient />
      </Suspense>
    </div>
  );
}
