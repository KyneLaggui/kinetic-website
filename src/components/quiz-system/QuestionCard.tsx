import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GripVertical, Trash2 } from "lucide-react";
import { QuestionChoice } from "@/components/quiz-system/QuestionChoice";
import { EditQuestionDialog } from "@/components/quiz-system/EditQuestionDialog";
import { AddChoiceDialog } from "@/components/quiz-system/AddChoiceDialog";

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
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <GripVertical className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">Question {index + 1}</span>
          </div>
          <div className="flex items-center gap-2">
            <EditQuestionDialog question={question} onEdit={onEditQuestion} />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDeleteQuestion(question.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="pl-1">
          <p className="mb-4">{question.text}</p>
          <div className="space-y-2">
            {question.choices.map((choice) => (
              <QuestionChoice
                key={choice.id}
                choice={choice}
                isCorrect={choice.isCorrect}
                onSetCorrect={() => onSetCorrectAnswer(question.id, choice.id)}
                onEdit={() => onEditChoice(question.id, choice)}
                onDelete={() => onDeleteChoice(question.id, choice.id)}
              />
            ))}
          </div>
          <AddChoiceDialog questionId={question.id} onAdd={onAddChoice} />
        </div>
      </CardContent>
    </Card>
  );
}
