import { useEffect, useState } from "react";
import { Clock, Pencil, X, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DynamicAlertDialog } from "@/components/DynamicAlertDialog";

interface QuizHeaderProps {
  duration: number;
  quizId: number;
  quiz: 
  onDurationChange: (newDuration: number) => void;
  onUpdateQuiz: (id: number, updates: {}) => void;
  onDeleteQuiz: () => void;
}

const DESCRIPTION_OPTIONS = [
  { value: "Assessment 1", label: "Assessment 1" },
  { value: "Assessment 2", label: "Assessment 2" },
  { value: "Assessment 3", label: "Assessment 3" },
];

export function QuizHeader({
  quizId,
  quiz,
  onUpdateQuiz,
  onDeleteQuiz,
}: QuizHeaderProps) {
  const [isEditingDuration, setIsEditingDuration] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingAssessment, setIsEditingAssessment] = useState(false);
  const [localDuration, setLocalDuration] = useState(quiz.duration);
  const [localTitle, setLocalTitle] = useState(quiz.title);
  const [localAssessment, setLocalAssessment] = useState(
    quiz.assessment
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const handleUpdateDuration = async(newDuration: number) => {
    try {
      await onUpdateQuiz(quizId, { duration: newDuration });
      setIsEditingDuration(false);
    } catch (error) {
      console.error("Failed to update duration", error);
    }
  };

  const handleUpdateTitle = async() => {
    try {
      await onUpdateQuiz(quizId, { title: localTitle }); // Assuming an API call function
      setIsEditingTitle(false);
    } catch (error) {
      console.error("Failed to update title", error);
    }
  };
  
  const handleUpdateDescription = async () => {
    try {
      await onUpdateQuiz(quizId, { assessment: localAssessment });
      setIsEditingAssessment(false);
    } catch (error) {
      console.error("Failed to update description", error);
    }
  };
  
  return (
    <Card className="w-full mb-4">
      <CardContent className="p-4 sm:p-6">
        <div className="flex justify-between flex-col sm:flex-row gap-4">
          {/* Title Section */}
          <div className="flex flex-col gap-4">
            <div className="flex-grow">
              {isEditingTitle ? (
                <div className="flex items-center gap-2 max-w-2xl">
                  <Input
                    value={localTitle}
                    onChange={(e) => setLocalTitle(e.target.value)}
                    className="text-2xl font-bold"
                    placeholder="Enter quiz title"
                    autoFocus
                  />
                  <Button size="sm" onClick={handleUpdateTitle}>
                    <Check />
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
                  <h1 className="text-2xl sm:text-3xl font-bold truncate">
                    {localTitle}
                  </h1>
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

            {/* Description Section */}
            <div>
              {isEditingAssessment ? (
                <div className="flex items-center gap-2">
                  <Select
                    value={localAssessment}
                    onValueChange={setLocalAssessment}
                  >
                    <SelectTrigger className="w-full sm:w-[450px]">
                      <SelectValue placeholder="Select quiz type" />
                    </SelectTrigger>
                    <SelectContent>
                      {DESCRIPTION_OPTIONS.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="text-sm"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button size="sm" onClick={handleUpdateDescription}>
                    <Check />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base">
                    {
                      DESCRIPTION_OPTIONS.find(
                        (option) => option.value === localAssessment
                      )?.label
                    }
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingAssessment(true)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            {/* Duration Section */}
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              {isEditingDuration ? (
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="1"
                    value={localDuration}
                    onChange={(e) => setLocalDuration(Number(e.target.value))}
                    className="w-24"
                    autoFocus
                  />
                  <Button
                    size="sm"
                    onClick={() => handleUpdateDuration(localDuration)}
                  >
                    <Check />
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
                  <span className="text-sm sm:text-base">
                    {quiz.duration} minutes
                  </span>
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
            {/* Delete Button */}
            <div className="flex justify-end pt-4">
              <Button
                className="w-full sm:w-fit"
                variant="destructive"
                size="sm"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4" /> Delete Quiz
              </Button>
            </div>
          </div>
        </div>
      </CardContent>

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
    </Card>
  );
}
