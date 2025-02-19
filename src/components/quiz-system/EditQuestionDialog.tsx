import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2 } from "lucide-react";
import { AddChoice } from "./AddChoice";
import { DynamicAlertDialog } from "@/components/DynamicAlertDialog";

export function EditQuestionDialog({
  question,
  onEditQuestion,
  onEditChoice,
  onDeleteChoice,
  onAddChoice,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(false);
  const [questionText, setQuestionText] = useState(question.text);
  const [editingChoiceId, setEditingChoiceId] = useState(null);
  const [editingChoiceText, setEditingChoiceText] = useState("");
  const [alertDialog, setAlertDialog] = useState({
    isOpen: false,
    title: "",
    description: "",
    onConfirm: () => {},
  });

  const handleSaveQuestion = () => {
    if (questionText.trim() !== question.text) {
      setAlertDialog({
        isOpen: true,
        title: "Confirm Changes",
        description:
          "Are you sure you want to save these changes to the question?",
        onConfirm: () => {
          onEditQuestion(question.id, questionText);
          setEditingQuestion(false);
          setAlertDialog((prev) => ({ ...prev, isOpen: false }));
        },
      });
    } else {
      setEditingQuestion(false);
    }
  };

  const handleAddChoice = (choice) => {
    onAddChoice(question.id, { id: choice.id, text: String(choice.text) });
  };

  const handleSaveChoice = (choiceId) => {
    const choice = question.choices.find((c) => c.id === choiceId);
    if (editingChoiceText.trim() !== choice.text) {
      setAlertDialog({
        isOpen: true,
        title: "Confirm Changes",
        description:
          "Are you sure you want to save these changes to the choice?",
        onConfirm: () => {
          onEditChoice(question.id, { id: choiceId, text: editingChoiceText });
          setEditingChoiceId(null);
          setAlertDialog((prev) => ({ ...prev, isOpen: false }));
        },
      });
    } else {
      setEditingChoiceId(null);
    }
  };

  const handleDeleteChoice = (choiceId) => {
    setAlertDialog({
      isOpen: true,
      title: "Delete Choice",
      description:
        "Are you sure you want to delete this choice? This action cannot be undone.",
      onConfirm: () => {
        onDeleteChoice(question.id, choiceId);
        setAlertDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Question</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              {editingQuestion ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    placeholder="Enter question"
                  />
                  <Button onClick={handleSaveQuestion}>Save</Button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium">{question.text}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingQuestion(true)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Choices</h3>
              <AddChoice onAdd={handleAddChoice} />
              <div className="space-y-2">
                {question.choices.map((choice) => (
                  <div
                    key={choice.id}
                    className="flex items-center gap-2 rounded-lg border p-4"
                  >
                    <input
                      type="radio"
                      checked={choice.isCorrect}
                      readOnly
                      className="h-4 w-4"
                    />
                    {editingChoiceId === choice.id ? (
                      <div className="flex flex-1 items-center gap-2">
                        <Input
                          value={editingChoiceText}
                          onChange={(e) => setEditingChoiceText(e.target.value)}
                          placeholder="Enter choice"
                        />
                        <Button onClick={() => handleSaveChoice(choice.id)}>
                          Save
                        </Button>
                      </div>
                    ) : (
                      <>
                        <span className="flex-1">{String(choice.text)}</span>{" "}
                        {/* Convert to string */}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingChoiceId(choice.id);
                            setEditingChoiceText(choice.text);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteChoice(choice.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <DynamicAlertDialog
        isOpen={alertDialog.isOpen}
        onClose={() => setAlertDialog((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={alertDialog.onConfirm}
        title={alertDialog.title}
        description={alertDialog.description}
      />
    </>
  );
}
