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
import { useState } from "react";

export default function LandingPage() {
  const [search, setSearch] = useState("");

  const studentIds = [
    "2021-12345-MN-0",
    "2020-67890-MN-0",
    "2022-54321-MN-0",
    "2023-98765-MN-0",
    "2019-24680-MN-0",
    "2024-13579-MN-0",
    "2021-19283-MN-0",
    "2020-37462-MN-0",
    "2022-91827-MN-0",
    "2023-56109-MN-0",
  ];

  const filteredIds = search.trim()
    ? studentIds.filter((id) =>
        id.toLowerCase().includes(search.toLowerCase().trim())
      )
    : [];

  return (
    <div
      className="flex flex-col items-center justify-center p-4"
      style={{ minHeight: "calc(100vh - 75px)" }}
    >
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Title */}
        <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            Ki-Net-Ic
          </span>
        </h1>

        {/* Description */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
          Gamified VR Education for Computer Networks Using Meta Quest 2 and
          Kinetic Gloves with Haptic Feedback
        </p>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mt-8 w-full">
          <Command className="w-full border rounded-lg shadow-md">
            <CommandInput
              value={search}
              onValueChange={setSearch}
              placeholder="Search for Student ID..."
              className="h-12 px-4"
            />
            <CommandList>
              {search.trim() ? (
                filteredIds.length > 0 ? (
                  filteredIds.map((id) => (
                    <CommandItem
                      key={id}
                      onSelect={() => setSearch(id)}
                      className="cursor-pointer px-4 py-2 flex items-center space-x-3 hover:bg-gray-100"
                    >
                      {/* Avatar with fallback */}
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="" alt={id} /> {/* Empty for now */}
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <span>{id}</span>
                    </CommandItem>
                  ))
                ) : (
                  <CommandEmpty>No results found</CommandEmpty>
                )
              ) : (
                <CommandEmpty className="hidden"></CommandEmpty>
              )}
            </CommandList>
          </Command>
          <Button size="lg" className="mt-4 w-full">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
