import { ArrowDown, ArrowUp, MoreHorizontalIcon } from "lucide-react";
import { TableCell } from "@/components/tables/TableCell";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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
    accessorKey: "viewMore",
    header: () => (
      <p className="flex items-center gap-1 cursor-pointer">View Breakdown</p>
    ),
    cell: ({ row }) => {
      const navigate = useNavigate(); // Get navigation function

      const handleClick = () => {
        navigate(`/student/${row.original.studentId}`); // Redirect to student details page
      };

      return (
        <TableCell>
          <Button onClick={handleClick} variant="outline">
            View Breakdown
          </Button>
        </TableCell>
      );
    },
  },
];
