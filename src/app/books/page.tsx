import { Suspense } from 'react';
import SelectBooks from './components/select-books';
import ExampleCards from './components/anki-cards';
import PageClient from './page-client';

export default function BooksPage() {
  return (
    <div className="flex justify-center ">
      <PageClient />
    </div>
  );
}
