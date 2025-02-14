import { ArrowDown, ArrowUp } from "lucide-react";
import { TableCell } from "@/components/tables/TableCell";
import { Badge } from "@/components/ui/badge";

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
];
