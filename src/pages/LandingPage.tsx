import SearchBar from "@/layouts/SearchBar";

export default function LandingPage() {
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

        <SearchBar />
      </div>
    </div>
  );
}
