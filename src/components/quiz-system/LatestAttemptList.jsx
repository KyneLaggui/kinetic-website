import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input"; // Make sure this path matches your project structure

export default function LatestAttemptList({ responses }) {
  const navigate = useNavigate();
  const { assessmentId } = useParams();
  const [search, setSearch] = useState("");

  const latestByUser = Object.values(
    responses.reduce((acc, res) => {
      const userId = res.user_id;
      if (
        !acc[userId] ||
        new Date(res.created_at) > new Date(acc[userId].created_at)
      ) {
        acc[userId] = res;
      }
      return acc;
    }, {})
  );

  const filteredResults = latestByUser.filter((res) =>
    `${res.name} ${res.studentId}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleClick = (userId) => {
    navigate(`/student-breakdown/${assessmentId}/${userId}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4">
      <Input
        type="text"
        placeholder="Search by name or student number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />

      {filteredResults.map((res) => {
        const percentage = ((res.score / res.answers.length) * 50 + 50).toFixed(
          1
        );

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
                <p className="text-sm">
                  Latest Score: {res.score}/{res.answers.length}
                </p>
                <Badge variant="secondary">{percentage}%</Badge>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
