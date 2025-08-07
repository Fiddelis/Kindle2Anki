import { Suspense } from 'react';
import SelectBooks from './components/select-books';
import AnkiCards from './components/anki-cards';

export default function BooksPage() {
  return (
    <div className="flex justify-center ">
      <Suspense>
        <div className="space-y-10 w-full px-10 lg:px-20 xl:px-60">
          <section>
            <SelectBooks />
          </section>
          <section className="h-[300px]">
            <AnkiCards />
          </section>
        </div>
      </Suspense>
    </div>
  );
}
