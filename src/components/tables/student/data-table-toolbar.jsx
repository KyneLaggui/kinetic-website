import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Register } from "@/components/Register";
import { Backpack, Presentation, X } from "lucide-react";
import DataTableFacetedFilter from "@/components/tables/student/data-table-faceted-filter";

function DataTableToolbar({ table, allData }) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    console.log("Search Value:", searchValue);
    table.getColumn("name")?.setFilterValue(searchValue); // Ensure "name" matches your column key
    console.log("Filter Value:", table.getColumn("name")?.getFilterValue());
  };

  return (
    <div className="flex flex-col items-start lg:flex-row lg:justify-between gap-2 w-full">
      <div className="flex flex-col sm:flex-row gap-2 w-full ">
        <Input
          placeholder="Search for User..."
                  value={
          table.getColumn("name")?.getFilterValue() || 
          ""
        }
        onChange={handleSearch}
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
        <Register />
      </div>
    </div>
  );
}

export default DataTableToolbar;
