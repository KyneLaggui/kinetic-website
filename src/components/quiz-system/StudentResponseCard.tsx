import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function StudentResponseCard({ response, onClick }) {
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
    ((calculateScore() / response.answers.length) *
    50) + 50
  ).toFixed(1);

  return (
    <Card
      className="flex flex-row items-center justify-between p-4 cursor-pointer hover:bg-accent"
      onClick={onClick}
    >
      <div className="flex-grow">
        <h3 className="font-semibold text-lg">{response.name}</h3>
        <p className="text-sm text-muted-foreground">{response.studentId}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium">
            Score: {response.score}/{response.answers.length}
          </p>
          <Badge variant="secondary">{percentage}%</Badge>
        </div>
      </div>
    </Card>
  );
}
