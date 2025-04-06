import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useUser from "@custom-hooks/useUser"; // ✅ Adjust the path to your actual hook file

const SearchBar: React.FC = () => {
  const [search, setSearch] = useState("");
  const { users, loading, error } = useUser(); // ✅ Custom hook
  const navigate = useNavigate();

  const filteredUsers = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return [];

    return users.filter((user) => {
      const fullName = [
        user.first_name,
        user.middle_name || "",
        user.last_name,
        user.suffix || "",
      ]
        .join(" ")
        .toLowerCase();

      return (
        user.student_id.toLowerCase().includes(query) ||
        fullName.includes(query)
      );
    });
  }, [search, users]);

  const handleSelectUser = (user: typeof users[number]) => {
    navigate(`/student-assessment/${user.id}`);
  };

  return (
    <div className="relative mx-auto mt-8 w-full">
      <Command className="w-full border rounded-lg shadow-md">
        <CommandInput
          value={search}
          onValueChange={setSearch}
          placeholder="Search by Student ID or Name..."
          className="h-12 px-4"
        />
        <CommandList className="absolute left-0 w-full bg-white shadow-lg border rounded-lg mt-12 z-50 max-h-60 overflow-auto">
          {search.trim() ? (
            filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <CommandItem
                  key={user.id}
                  onSelect={() => handleSelectUser(user)}
                  className="cursor-pointer px-4 py-2 flex items-center space-x-3 hover:bg-gray-100"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="" alt={user.student_id} />
                    <AvatarFallback>
                      {user.first_name.charAt(0)}
                      {user.last_name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="font-medium">{user.student_id}</div>
                    <div className="text-sm text-muted-foreground">
                      {user.first_name} {user.middle_name || ""}{" "}
                      {user.last_name} {user.suffix || ""}
                    </div>
                  </div>
                </CommandItem>
              ))
            ) : (
              <CommandEmpty>No results found</CommandEmpty>
            )
          ) : (
            <CommandEmpty className="hidden" />
          )}
        </CommandList>
      </Command>
    </div>
  );
};

export default SearchBar;
