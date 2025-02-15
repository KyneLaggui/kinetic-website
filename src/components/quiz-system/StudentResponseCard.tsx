import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function StudentResponseCard({ response, onClick }) {
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
            Score: {response.score}/{response.totalQuestions}
          </p>
          <Badge variant="secondary">{response.percentage}%</Badge>
        </div>
      </div>
    </Card>
  );
}
