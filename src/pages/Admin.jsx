import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useQuiz from "../supabase/custom-hooks/useQuiz";
import useQuizResult from "@/supabase/custom-hooks/useQuizResult";

const Admin = () => {
  const navigate = useNavigate();
  const { quizzes } = useQuiz();
  const { fetchByAssessmentNumber } = useQuizResult();

  const [responseCounts, setResponseCounts] = useState({});

  useEffect(() => {
    const loadResponseCounts = async () => {
      const counts = {};
      for (const quiz of quizzes) {
        try {
          const responses = await fetchByAssessmentNumber(quiz.assessment);
          counts[quiz.assessment] = responses.length;
        } catch (err) {
          console.error(`Failed to fetch responses for ${quiz.assessment}`, err);
          counts[quiz.assessment] = 0;
        }
      }
      setResponseCounts(counts);
    };

    if (quizzes.length > 0) {
      loadResponseCounts();
    }
  }, [quizzes]);

  const handleNavigate = (assessmentId) => {
    navigate(`/admin/quiz-scores/${assessmentId}`);
  };

  

  return (
    <div className="container py-6">
      <h2 className="text-2xl font-bold tracking-tight mb-4">Scores</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <Card
            key={quiz.id}
            className="cursor-pointer hover:shadow-lg transition"
            onClick={() => handleNavigate(quiz.assessment)}
          >
            <CardHeader>
              <CardTitle>{quiz.title}</CardTitle>
              <CardDescription>{quiz.assessment}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">
                  {responseCounts[quiz.assessment] > 0
                    ? `${responseCounts[quiz.assessment]} Responses`
                    : "No responses"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Admin;
