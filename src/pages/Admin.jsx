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
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const getHighestRetakeResults = (results) => {
  const resultMap = new Map();

  results.forEach((result) => {
    const key = `${result.user_id}-${result.assessment_number}`;
    const existing = resultMap.get(key);

    if (!existing || result.retake_number > existing.retake_number) {
      resultMap.set(key, result);
    }
  });

  return Array.from(resultMap.values());
};

const getScoreDistribution = (results) => {
  const distribution = {};

  results.forEach((result) => {
    const assessment = result.assessment_number;
    const score = result.score;

    if (!distribution[assessment]) {
      distribution[assessment] = {};
    }

    if (!distribution[assessment][score]) {
      distribution[assessment][score] = 0;
    }

    distribution[assessment][score]++;
  });

  // Convert to array format for charts
  const chartData = {};
  Object.keys(distribution).forEach((assessment) => {
    chartData[assessment] = Object.entries(distribution[assessment]).map(
      ([score, count]) => ({
        score: parseInt(score, 10),
        count,
      })
    );
  });

  return chartData;
};



const Admin = () => {
  const navigate = useNavigate();
  const { quizzes } = useQuiz();
  const { quizResults, fetchByAssessmentNumber } = useQuizResult();

  const [scoreDistributions, setScoreDistributions] = useState({});
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

  useEffect(() => {
    const loadScoreDistributions = async () => {
      const allResults = [];
  
      for (const quiz of quizzes) {
        try {
          const responses = await fetchByAssessmentNumber(quiz.assessment);
          allResults.push(...responses);
        } catch (err) {
          console.error(`Failed to fetch responses for ${quiz.assessment}`, err);
        }
      }
  
      const highestRetakes = getHighestRetakeResults(allResults);
      const distributions = getScoreDistribution(highestRetakes);
  
      setScoreDistributions(distributions);
    };
  
    if (quizzes.length > 0) {
      loadScoreDistributions();
    }
  }, [quizzes]);

  return (
      <div className="container py-6">
      <h2 className="text-2xl font-bold tracking-tight mb-4">Scores</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => {
          const chartData = scoreDistributions[quiz.assessment];

          return (
            <Card
              key={quiz.id}
              className="cursor-pointer hover:shadow-lg transition"
              onClick={() => handleNavigate(quiz.assessment)}
            >
              <CardHeader className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{quiz.title}</CardTitle>
                    <CardDescription>{quiz.assessment}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="whitespace-nowrap">
                    {responseCounts[quiz.assessment] > 0
                      ? `${responseCounts[quiz.assessment]} Responses`
                      : "No responses"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {chartData && chartData.length > 0 && (
                  <>
                    <h3 className="text-lg font-semibold mb-2">
                      Latest Assessment Results
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="score"
                          label={{ value: "Score", position: "insideBottom", offset: -5 }}
                        />
                        <YAxis
                          label={{ value: "Count", angle: -90, position: "insideLeft" }}
                        />
                        <Tooltip />
                        <Bar dataKey="count">
                          {chartData.map((entry, index) => {
                            const colors = [
                              "#C084FC", // purple-400
                              "#E879F9", // pink-400
                              "#A855F7", // purple-500
                              "#EC4899", // pink-500
                              "#9333EA", // purple-600
                              "#DB2777", // pink-600
                            ];
                            return (
                              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            );
                          })}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Admin;
