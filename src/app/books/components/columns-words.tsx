import { Button } from '@/components/ui/button';
import { LookupWithWord } from '@/types/kindle';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

export const columnsLookupWithWord: ColumnDef<LookupWithWord>[] = [
  {
    accessorKey: 'stem',
    header: ({ column }) => {
      return (
        <Button
          className="container flex justify-between"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Stem
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'word',
    header: ({ column }) => {
      return (
        <Button
          className="container flex justify-between"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Word
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'usage',
    size: 200,
    header: ({ column }) => {
      return (
        <Button
          className="container flex justify-between"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Usage
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const usage = row.getValue('usage') as string;
      return (
        <span title={usage} className="block truncate w-100">
          {usage}
        </span>
      );
    },
  },
  {
    accessorKey: 'word_lang',
    header: ({ column }) => {
      return (
        <Button
          className="container flex justify-between"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Language
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'word_translated',
    header: ({ column }) => {
      return (
        <Button
          className="container flex justify-between"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Word Translated
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'usage_translated',
    header: ({ column }) => {
      return (
        <Button
          className="container flex justify-between"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Usage Translated
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];
