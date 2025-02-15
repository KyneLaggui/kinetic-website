import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

type AddChoiceDialogProps = {
  questionId: string;
  onAdd: (questionId: string, choiceText: string) => void;
};

export function AddChoiceDialog({ questionId, onAdd }: AddChoiceDialogProps) {
  const [open, setOpen] = useState(false);
  const [choiceText, setChoiceText] = useState("");

  const handleSubmit = () => {
    if (choiceText.trim()) {
      onAdd(questionId, choiceText.trim());
      setChoiceText("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mt-4">
          <Plus className="h-4 w-4 mr-2" />
          Add Choice
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Choice</DialogTitle>
          <DialogDescription>
            Enter the text for the new choice.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            value={choiceText}
            onChange={(e) => setChoiceText(e.target.value)}
            placeholder="Enter choice text"
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={!choiceText.trim()}>
            Add Choice
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
