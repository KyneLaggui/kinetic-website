import { ArrowDown, ArrowUp, MoreHorizontalIcon } from "lucide-react";
import { TableCell } from "@/components/tables/TableCell";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const columns = [
  {
    accessorKey: "name",
    header: () => (
      <p className="flex items-center gap-1 cursor-pointer">Full Name</p>
    ),
    cell: ({ row }) => <TableCell>{row.original.name}</TableCell>,
  },

  {
    accessorKey: "studentId",
    header: () => (
      <p className="flex items-center gap-1 cursor-pointer">Student ID</p>
    ),
    cell: ({ row }) => <TableCell>{row.original.studentId}</TableCell>,
  },
  {
    accessorKey: "section",
    header: () => (
      <p className="flex items-center gap-1 cursor-pointer">Section</p>
    ),
    cell: ({ row }) => <TableCell>{row.original.section}</TableCell>,
  },

  {
    accessorKey: "points",
    header: () => (
      <p className="flex items-center gap-1 cursor-pointer">Points</p>
    ),
    cell: ({ row }) => {
      const totalScore = Object.values(row.original.scores).reduce(
        (acc, assessment) => acc + assessment.score,
        0
      );

      return <TableCell>{totalScore}</TableCell>;
    },
  },

  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const faq = row.original;
      const [isOpen, setIsOpen] = useState(false);
      const [isDialogOpen, setIsDialogOpen] = useState(false);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreHorizontalIcon className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>More Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                View Breakdown
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
