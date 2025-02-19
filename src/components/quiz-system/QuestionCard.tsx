"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical, Trash2 } from "lucide-react";
import { EditQuestionDialog } from "./EditQuestionDialog";
import { AddChoice } from "./AddChoice";
import { DynamicAlertDialog } from "@/components/DynamicAlertDialog";
import { Badge } from "@/components/ui/badge";

export function QuestionCard({
  question,
  index,
  onEditQuestion,
  onDeleteQuestion,
  onSetCorrectAnswer,
  onEditChoice,
  onDeleteChoice,
  onAddChoice,
}) {
  const [alertDialog, setAlertDialog] = useState({
    isOpen: false,
    title: "",
    description: "",
    onConfirm: () => {},
  });

  const handleDeleteQuestion = () => {
    setAlertDialog({
      isOpen: true,
      title: "Delete Question",
      description:
        "Are you sure you want to delete this question? This action cannot be undone.",
      onConfirm: () => {
        onDeleteQuestion(question.id);
        setAlertDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <GripVertical className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">Question {index + 1}</span>
          </div>
          <div className="flex items-center gap-2">
            <EditQuestionDialog
              question={question}
              onEditQuestion={onEditQuestion}
              onEditChoice={onEditChoice}
              onDeleteChoice={onDeleteChoice}
              onAddChoice={onAddChoice}
            />
            <Button variant="ghost" size="icon" onClick={handleDeleteQuestion}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="pl-1">
          <p className="mb-4">{question.text}</p>
          <div className="space-y-2">
            {question.choices.map((choice) => (
              <div
                key={choice.id}
                className="flex items-center gap-2 rounded-lg border p-4"
              >
                <input
                  type="radio"
                  checked={choice.isCorrect}
                  onChange={() => onSetCorrectAnswer(question.id, choice.id)}
                  className="h-4 w-4"
                />
                <span>{choice.text}</span>
                {choice.isCorrect && (
                  <span className="ml-auto text-sm text-muted-foreground">
                    <Badge>Correct Answer</Badge>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <DynamicAlertDialog
        isOpen={alertDialog.isOpen}
        onClose={() => setAlertDialog((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={alertDialog.onConfirm}
        title={alertDialog.title}
        description={alertDialog.description}
      />
    </Card>
  );
}
