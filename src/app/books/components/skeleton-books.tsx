import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonBooks() {
  return (
    <>
      <h1 className="text-4xl text-center my-4 font-bold tracking-tight">Select the books</h1>
      <Skeleton className="h-[550px]" />
      <Separator className="my-10" />
      <h2 className="text-4xl text-center my-4 font-bold tracking-tight">
        Words in selected books
      </h2>
      <div>
        <Skeleton className="h-[550px] mb-10" />
      </div>
    </>
  );
}
