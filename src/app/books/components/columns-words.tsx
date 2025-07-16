import { Checkbox } from "@/components/ui/checkbox";
import { KindleWord } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

export const columnsWords: ColumnDef<KindleWord>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="container flex items-center">
        <Checkbox
          className="cursor-pointer"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="container flex items-center">
        <Checkbox
          className="cursor-pointer"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableResizing: false,
    enableSorting: false,
    enableHiding: false,
  },
];
