import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

export function AddQuestionDialog({ onAddQuestion }) {
  const [title, setTitle] = useState("");
  const [choices, setChoices] = useState([
    { choice: "", isAnswer: true },
    { choice: "", isAnswer: false }
  ]);

  const handleAddChoice = () => {
    setChoices([...choices, { choice: "", isAnswer: false }]);
  };

  const handleRemoveChoice = (index: number) => {
    if (choices.length > 2) {
      setChoices(choices.filter((_, i) => i !== index));
    }
  };

  const handleChoiceChange = (index: number, value: string) => {
    const updatedChoices = [...choices];
    updatedChoices[index].choice = value;
    setChoices(updatedChoices);
  };

  const handleCorrectAnswerChange = (index: number) => {
    setChoices(choices.map((choice, i) => ({ ...choice, isAnswer: i === index })));
  };

  const handleSubmit = () => {
    if (
      title.trim() &&
      choices.every((c) => c.choice.trim()) &&
      choices.length >= 2
    ) {
      onAddQuestion({ title, choices });
      setTitle("");
      setChoices([{ choice: "", isAnswer: true }, { choice: "", isAnswer: false }]);
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
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={choice.isAnswer}
                  onChange={() => handleCorrectAnswerChange(index)}
                />
                <Input
                  placeholder={`Choice ${index + 1}`}
                  value={choice.choice}
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
        </div>
        <Button onClick={handleAddChoice}>Add Choice</Button>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={
              !title.trim() ||
              choices.length < 2 ||
              choices.some((c) => !c.choice.trim())
            }
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

