"use client";

import { useState } from "react";
import { Clock, Pencil, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DynamicAlertDialog } from "@/components/DynamicAlertDialog";

interface QuizHeaderProps {
  duration: number;
  onDurationChange: (newDuration: number) => void;
  onDeleteQuiz: () => void;
}

export function QuizHeader({
  duration,
  onDurationChange,
  onDeleteQuiz,
}: QuizHeaderProps) {
  const [isEditingDuration, setIsEditingDuration] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [localDuration, setLocalDuration] = useState(duration);
  const [localTitle, setLocalTitle] = useState("Untitled Quiz");
  const [localDescription, setLocalDescription] = useState(
    "No description provided."
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleUpdateDuration = (newDuration: number) => {
    onDurationChange(newDuration);
    setIsEditingDuration(false);
  };

  const handleUpdateTitle = () => {
    console.log("Title saved:", localTitle);
    setIsEditingTitle(false);
  };

  const handleUpdateDescription = () => {
    console.log("Description saved:", localDescription);
    setIsEditingDescription(false);
  };

  return (
    <div className="mb-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-grow">
          {isEditingTitle ? (
            <div className="flex items-center gap-2">
              <Input
                value={localTitle}
                onChange={(e) => setLocalTitle(e.target.value)}
                className="text-2xl max-w-xl sm:text-3xl font-bold"
              />
              <Button size="sm" onClick={handleUpdateTitle}>
                Save
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditingTitle(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold">{localTitle}</h1>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditingTitle(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
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
      <div className="flex items-start gap-2">
        {isEditingDescription ? (
          <div className="flex-grow flex items-start gap-2">
            <Input
              value={localDescription}
              onChange={(e) => setLocalDescription(e.target.value)}
              className="text-sm max-w-xl sm:text-base text-muted-foreground"
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleUpdateDescription}>
                Save
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditingDescription(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex-grow flex items-center gap-2">
            <p className="text-sm sm:text-base text-muted-foreground">
              {localDescription}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditingDescription(true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <div className="flex justify-end">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setIsDeleteDialogOpen(true)}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete Quiz
        </Button>
      </div>
      <DynamicAlertDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          setIsDeleteDialogOpen(false);
          onDeleteQuiz();
        }}
        title="Delete Quiz"
        description="Are you sure you want to delete this quiz? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
