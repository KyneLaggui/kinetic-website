import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Pencil, X } from "lucide-react";

export function QuestionChoice({
  choice,
  isCorrect,
  onSetCorrect,
  onEdit,
  onDelete,
}) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg border">
      <div className="flex items-center gap-2">
        <Button
          variant={isCorrect ? "default" : "ghost"}
          size="icon"
          className="h-6 w-6"
          onClick={onSetCorrect}
        >
          <Check className="h-4 w-4" />
        </Button>
        <span>{choice.text}</span>
      </div>
      <div className="flex items-center gap-2">
        {isCorrect && <Badge variant="secondary">Correct Answer</Badge>}
        <Button variant="ghost" size="icon" onClick={onEdit}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onDelete}>
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
