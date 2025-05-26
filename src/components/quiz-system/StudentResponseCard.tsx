import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function StudentResponseCard({ response, onClick, size = "normal" }) {
  const calculateScore = () => {
    let score = 0;
    response.answers.forEach((answer) => {
      if (answer.selected_answer === answer.correct_answer) {
        score++;
      }
    });
    return score;
  };

  const percentage = (
    ((calculateScore() / response.answers.length) * 50) + 50
  ).toFixed(1);

  // Define smaller styles if size is 'small'
  const paddingClass = size === "small" ? "p-2" : "p-4";
  const titleClass = size === "small" ? "text-base" : "text-lg";
  const subtitleClass = size === "small" ? "text-xs" : "text-sm";
  const scoreTextClass = size === "small" ? "text-xs" : "text-sm";
  const badgeSizeClass = size === "small" ? "text-xs px-2 py-1" : "";

  return (
    <Card
      className={`flex flex-row items-center justify-between ${paddingClass} cursor-pointer hover:bg-accent`}
      onClick={onClick}
    >
      <div className="flex-grow">
        <h3 className={`font-semibold ${titleClass}`}>{response.name}</h3>
        <p className={`${subtitleClass} text-muted-foreground`}>{response.studentId}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className={`${scoreTextClass} font-medium`}>
            Score: {response.score}/{response.answers.length}
          </p>
          <Badge variant="secondary" className={badgeSizeClass}>{percentage}%</Badge>
        </div>
      </div>
    </Card>
  );
}
