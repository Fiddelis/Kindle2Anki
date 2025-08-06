import { Suspense } from "react";
import SelectBooks from "./components/select-books";
import AnkiCards from "./components/anki-cards";

export default function BooksPage() {
  return (
    <div>
      <h1 className="text-4xl text-center my-4">Select the books</h1>
      <Suspense
        fallback={
          <p className="text-center">Carregando interface de livros…</p>
        }
      >
        <div className="px-20">
          <SelectBooks />
          <AnkiCards />
        </div>
      </Suspense>
    </div>
  );
}
