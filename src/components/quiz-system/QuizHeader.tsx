import { useState } from "react";
import { Clock, Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function QuizHeader({ duration, onDurationChange }) {
  const [isEditingDuration, setIsEditingDuration] = useState(false);
  const [localDuration, setLocalDuration] = useState(duration);

  const handleUpdateDuration = (newDuration: number) => {
    onDurationChange(newDuration);
    setIsEditingDuration(false);
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Mathematics Quiz 1</h1>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          {isEditingDuration ? (
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={localDuration}
                onChange={(e) => setLocalDuration(Number(e.target.value))}
                className="w-20"
              />
              <Button
                size="sm"
                onClick={() => handleUpdateDuration(localDuration)}
              >
                Save
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditingDuration(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base">{duration} minutes</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditingDuration(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
      <p className="text-sm sm:text-base text-muted-foreground">
        Description here
      </p>
    </div>
  );
}
