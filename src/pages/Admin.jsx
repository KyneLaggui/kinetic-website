import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useQuiz from "../supabase/custom-hooks/useQuiz";
import useQuizResult from "@/supabase/custom-hooks/useQuizResult";
import { BarChart, Bar, CartesianGrid, LabelList, XAxis, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Register } from "@/components/Register";


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
  const barColors = ["#9932e1", "#db2777", "#cd298c", "#d32883"];

  useEffect(() => {
    const loadResponseCounts = async () => {
      const counts = {};
  
      for (const quiz of quizzes) {
        try {
          const responses = await fetchByAssessmentNumber(quiz.assessment);
          const uniqueLatest = getHighestRetakeResults(responses);
  
          // Count how many unique responses exist for this assessment
          counts[quiz.assessment] = uniqueLatest.length;
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
          console.log(responses)
          allResults.push(...responses);
        } catch (err) {
          console.error(
            `Failed to fetch responses for ${quiz.assessment}`,
            err
          );
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
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold tracking-tight">Scores</h2>
          <p className="text-muted-foreground">
            View detailed analytics and score breakdowns for each student.
          </p>
        </div>
        <Register />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...quizzes]
          .sort((a, b) => {
            const numA = parseInt(a.assessment.replace(/\D/g, ""));
            const numB = parseInt(b.assessment.replace(/\D/g, ""));
            return numA - numB;
          })
          .map((quiz) => {
          const chartData = scoreDistributions[quiz.assessment];

          // ✅ Safely generate coloredChartData inside the map
          const coloredChartData =
            chartData?.map((entry, index) => ({
              ...entry,
              fill: barColors[index % barColors.length],
            })) || [];

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
                {coloredChartData.length > 0 && (
                  <>
                    <h3 className="text-lg font-semibold mb-2">
                      Latest Assessment Results
                    </h3>
                    <ChartContainer
                      config={{ count: { label: "Count", color: "#9932e1" } }}
                    >
                      <BarChart data={coloredChartData} margin={{ top: 40 }}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                          dataKey="score"
                          tickLine={false}
                          tickMargin={10}
                          axisLine={false}
                        />
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="count" radius={6}>
                          {coloredChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                          <LabelList
                            position="top"
                            offset={12}
                            className="fill-foreground"
                            fontSize={12}
                          />
                        </Bar>
                      </BarChart>
                    </ChartContainer>
                  </>
                )}
              </CardContent>
              <CardFooter className="mt-2">
                <div className="text-sm text-muted-foreground hover:text-primary transition cursor-pointer">
                  Click to see a detailed breakdown of all student scores{" "}
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Admin;
