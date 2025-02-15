import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function AddQuestionDialog({ onAddQuestion }) {
  const [title, setTitle] = useState("");
  const [choices, setChoices] = useState(["", ""]);

  const handleAddChoice = () => {
    setChoices([...choices, ""]);
  };

  const handleRemoveChoice = (index: number) => {
    if (choices.length > 2) {
      setChoices(choices.filter((_, i) => i !== index));
    }
  };

  const handleChoiceChange = (index: number, value: string) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = value;
    setChoices(updatedChoices);
  };

  const handleSubmit = () => {
    if (
      title.trim() &&
      choices.every((choice) => choice.trim()) &&
      choices.length >= 2
    ) {
      onAddQuestion({ title, choices });
      setTitle("");
      setChoices(["", ""]);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Question</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a New Question</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Enter question title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="space-y-2">
            {choices.map((choice, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  placeholder={`Choice ${index + 1}`}
                  value={choice}
                  onChange={(e) => handleChoiceChange(index, e.target.value)}
                />
                {choices.length > 2 && (
                  <Button
                    variant="destructive"
                    onClick={() => handleRemoveChoice(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>
          <Button onClick={handleAddChoice}>Add Choice</Button>
          <Button
            onClick={handleSubmit}
            disabled={
              !title.trim() ||
              choices.length < 2 ||
              choices.some((c) => !c.trim())
            }
          >
            Submit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
