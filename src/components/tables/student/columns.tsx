import {
  ArrowDown,
  ArrowUp,
  ChevronRight,
  MoreHorizontalIcon,
} from "lucide-react";
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
      // const { name, avatarUrl } = row.original;
      const name = row.original.user.first_name + " " + row.original.user.last_name;
      const avatarUrl = "";
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
    cell: ({ row }) => {
      const { first_name, last_name, middle_name } = row.original.user;

     return (<TableCell>{first_name} {middle_name} {last_name}</TableCell>)
    },
  },

  {
    accessorKey: "studentId",
    header: () => (
      <p className="flex items-center gap-1 cursor-pointer">Student ID</p>
    ),
    cell: ({ row }) => {
      const { student_id: studentID } = row.original.user;

      return (<TableCell className="text-nowrap">{studentID}</TableCell>)
    }
  },

  {
    accessorKey: "section",
    header: () => (
      <p className="flex items-center gap-1 cursor-pointer">Section</p>
    ),
    cell: ({ row }) => {
      const { year, section } = row.original.user;

      return(
        <TableCell>
          <Badge className="text-nowrap">BSCPE {year}-{section}</Badge>
        </TableCell>
      )
    },
  },

  {
    accessorKey: "points",
    header: () => (
      <p className="flex items-center gap-1 cursor-pointer">Points</p>
    ),
    cell: ({ row }) => {

      return <TableCell>{row.original.score}</TableCell>;
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
        navigate(`/admin/student-breakdown/${row.original.id}`); // Redirect to student details page
      };

      return (
        <TableCell>
          <Button onClick={handleClick}>
            View Breakdown <ChevronRight />
          </Button>
        </TableCell>
      );
    },
  },
];
