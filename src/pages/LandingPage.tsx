import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div
      className="flex flex-col items-center justify-center p-4"
      style={{ minHeight: "calc(100vh - 75px)" }}
    >
      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Title with gradient */}
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
        <div className="relative max-w-2xl mx-auto mt-8">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Seach for Gamers..."
                className="pl-9 pr-4 h-12"
              />
            </div>
            <Button size="lg" className="px-8">
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
