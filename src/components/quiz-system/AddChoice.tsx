import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Check, X } from "lucide-react";

interface Choice {
  choice: string;
  isAnswer: boolean;
}

interface Question {
  quizId: number;
  description: string;
  choices: Choice[];
}

interface AddChoiceProps {
  question: Question;
  onEditQuestion: (updatedQuestion: Question) => Promise<void>;
}

export function AddChoice({ question, onEditQuestion }: AddChoiceProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newChoice, setNewChoice] = useState("");

  const handleSave = async () => {
    if (!newChoice.trim()) return;

    const updatedQuestion = {
      ...question,
      choices: [...question.choices, { choice: newChoice.trim(), isAnswer: false }],
    };

    await onEditQuestion(updatedQuestion); // Update in the database
    setNewChoice(""); // Clear input
    setIsAdding(false); // Close input field
  };

  const handleDiscard = () => {
    setNewChoice("");
    setIsAdding(false);
  };

  if (isAdding) {
    return (
      <div className="flex items-center gap-2 mb-4">
        <Input
          value={newChoice}
          onChange={(e) => setNewChoice(e.target.value)}
          placeholder="Enter new choice"
          className="flex-1"
          autoFocus
        />
        <Button variant="ghost" size="icon" onClick={handleSave} disabled={!newChoice.trim()}>
          <Check className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleDiscard}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button variant="outline" className="mb-4" onClick={() => setIsAdding(true)}>
      <Plus className="h-4 w-4 mr-2" />
      Add Choice
    </Button>
  );
}
