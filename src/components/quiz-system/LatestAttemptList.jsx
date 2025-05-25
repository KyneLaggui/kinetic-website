import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function LatestAttemptList({ responses }) {
  const navigate = useNavigate();
  const { assessmentId } = useParams();

  const latestByUser = Object.values(
    responses.reduce((acc, res) => {
      const userId = res.user_id;
      if (!acc[userId] || new Date(res.created_at) > new Date(acc[userId].created_at)) {
        acc[userId] = res;
      }
      return acc;
    }, {})
  );

  const handleClick = (userId) => {
    navigate(`/admin/student-breakdown/${assessmentId}/${userId}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {latestByUser.map((res) => {
        const percentage = ((res.score / res.answers.length) * 50 + 50).toFixed(1);

        return (
          <Card
            key={res.id}
            onClick={() => handleClick(res.user_id)}
            className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{res.name}</p>
                <p className="text-sm text-muted-foreground">{res.studentId}</p>
              </div>
              <div className="text-right">
                <p className="text-sm">Score: {res.score}/{res.answers.length}</p>
                <Badge variant="secondary">{percentage}%</Badge>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
