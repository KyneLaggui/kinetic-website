import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Backpack, Presentation, X } from "lucide-react";
import DataTableFacetedFilter from "@/components/tables/student/data-table-faceted-filter";

function DataTableToolbar({ table, allData }) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col items-start lg:flex-row lg:justify-between gap-2 w-full">
      <div className="flex flex-col sm:flex-row gap-2 w-full ">
        <Input
          placeholder="Search for User..."
          value={table.getState().globalFilter ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-11"
        />

        <div className="flex items-center">
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        <Button>Export CSV</Button>
      </div>
    </div>
  );
}

export default DataTableToolbar;
