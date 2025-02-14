import { ArrowDown, ArrowUp, MoreHorizontalIcon } from "lucide-react";
import { TableCell } from "@/components/tables/TableCell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import Avatar from ShadCN
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    accessorKey: "avatar",
    header: () => (
      <p className="flex items-center gap-1 cursor-pointer">Avatar</p>
    ),
    cell: ({ row }) => {
      const { name, avatarUrl } = row.original;
      const nameParts = name.split(" ");
      const initials =
        nameParts.length >= 2
          ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
          : nameParts[0][0];

      return (
        <TableCell>
          <Avatar>
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback>{initials.toUpperCase()}</AvatarFallback>
          </Avatar>
        </TableCell>
      );
    },
  },

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
    cell: ({ row }) => (
      <TableCell>
        <Badge>{row.original.section}</Badge>
      </TableCell>
    ),
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
          <Button onClick={handleClick}>View Breakdown</Button>
        </TableCell>
      );
    },
  },
];
