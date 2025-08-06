import { Suspense } from "react";
import SelectBooks from "./components/select-books";
import AnkiCards from "./components/anki-cards";

export default function BooksPage() {
  return (
    <div>
      <Suspense>
        <div className="space-y-10 px-20">
          <section>
            <SelectBooks />
          </section>
          <section>
            <AnkiCards />
          </section>
        </div>
      </Suspense>
    </div>
  );
}
