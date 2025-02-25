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

interface Choice {
  choice: string;
  isAnswer: boolean;
}

interface Question {
  quizId: number;
  id: number;
  description: string;
  choices: Choice[];
}

interface EditQuestionDialogProps {
  question: Question;
  onEditQuestion: (updatedQuestion: Question) => void;
}

export function EditQuestionDialog({
  question,
  onEditQuestion,
}: EditQuestionDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(false);
  const [questionText, setQuestionText] = useState(question.description);
  const [editingChoiceIndex, setEditingChoiceIndex] = useState<number | null>(null);
  const [editingChoiceText, setEditingChoiceText] = useState("");
  const [alertDialog, setAlertDialog] = useState({
    isOpen: false,
    title: "",
    description: "",
    onConfirm: () => {},
  });

  const handleSaveQuestion = async () => {
    if (questionText.trim() && questionText !== question.description) {
      setAlertDialog({
        isOpen: true,
        title: "Confirm Changes",
        description: "Save changes to the question?",
        onConfirm: async () => {
          const updatedQuestion = { ...question, description: questionText.trim() };
          await onEditQuestion(updatedQuestion);
          setEditingQuestion(false);
          setAlertDialog((prev) => ({ ...prev, isOpen: false }));
        },
      });
    } else {
      setEditingQuestion(false);
    }
  };

  const handleSaveChoice = (choiceIndex: number) => {
    const updatedChoices = question.choices.map((choice, index) =>
      index === choiceIndex ? { ...choice, choice: editingChoiceText } : choice
    );

    setAlertDialog({
      isOpen: true,
      title: "Confirm Changes",
      description: "Save changes to the choice?",
      onConfirm: () => {
        const updatedQuestion = { ...question, choices: updatedChoices };
        onEditQuestion(updatedQuestion);
        setEditingChoiceIndex(null);
        setAlertDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleDeleteChoice = (choiceIndex: number) => {
    const updatedChoices = question.choices.filter((_, index) => index !== choiceIndex);

    setAlertDialog({
      isOpen: true,
      title: "Delete Choice",
      description: "Are you sure you want to delete this choice?",
      onConfirm: () => {
        const updatedQuestion = { ...question, choices: updatedChoices };
        onEditQuestion(updatedQuestion);
        setAlertDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  const handleSetAnswer = (choiceIndex: number) => {
    const updatedChoices = question.choices.map((choice, index) => ({
      ...choice,
      isAnswer: index === choiceIndex,
    }));

    const updatedQuestion = { ...question, choices: updatedChoices };
    onEditQuestion(updatedQuestion);
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
                    placeholder="Edit question"
                  />
                  <Button onClick={handleSaveQuestion}>Save</Button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <p className="text-lg font-medium">{question.description}</p>
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
              <AddChoice
                quizId={question.quizId}
                question={question}
                onEditQuestion={onEditQuestion}
              />
              <div className="space-y-2">
                {question.choices.map((choice, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 rounded-lg border p-4"
                  >
                    <input
                      type="radio"
                      checked={choice.isAnswer}
                      onChange={() => handleSetAnswer(index)}
                      className="h-4 w-4"
                    />
                    {editingChoiceIndex === index ? (
                      <div className="flex flex-1 items-center gap-2">
                        <Input
                          value={editingChoiceText}
                          onChange={(e) => setEditingChoiceText(e.target.value)}
                          placeholder="Edit choice"
                        />
                        <Button onClick={() => handleSaveChoice(index)}>Save</Button>
                      </div>
                    ) : (
                      <>
                        <span className="flex-1">{choice.choice}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditingChoiceIndex(index);
                            setEditingChoiceText(choice.choice);
                          }}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteChoice(index)}
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
