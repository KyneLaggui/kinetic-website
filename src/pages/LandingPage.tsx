import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
      {/* Grid Background */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

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
