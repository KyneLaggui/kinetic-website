import { useState } from "react";
import { Pencil } from "lucide-react";
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

type EditQuestionDialogProps = {
  question: Question;
  onEdit: (updatedQuestion: Question) => void;
};

export function EditQuestionDialog({
  question,
  onEdit,
}: EditQuestionDialogProps) {
  const [editedQuestion, setEditedQuestion] = useState<Question>(question);
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    if (editedQuestion.text.trim()) {
      onEdit(editedQuestion);
      setOpen(false);
    }
  };

  const handleTextChange = (newText: string) => {
    setEditedQuestion({
      ...editedQuestion,
      text: newText,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Question</DialogTitle>
          <DialogDescription>
            Make changes to your question here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            value={editedQuestion.text}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Enter question text"
          />
        </div>
        <DialogFooter>
          <Button onClick={handleSave} disabled={!editedQuestion.text.trim()}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
