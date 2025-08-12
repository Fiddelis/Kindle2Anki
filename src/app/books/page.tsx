import { Suspense } from 'react';
import PageClient from './page-client';

export default function BooksPage() {
  return (
    <div className="flex justify-center ">
      <Suspense>
        <PageClient />
      </Suspense>
    </div>
  );
}
