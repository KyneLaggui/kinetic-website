import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Timer, Target, Award } from "lucide-react";
import { motion } from "framer-motion";
import SearchBar from "@/layouts/SearchBar.tsx";
import useQuizResult from "@custom-hooks/useQuizResult"; // Import the custom hook
import useAssessment4Result from "@custom-hooks/useAssessment4Result";
import useUser from "@custom-hooks/useUser"; // Import the custom hook
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function GamifiedAssessmentDashboard() {
  const { userId } = useParams();
  // Use the custom hook to fetch quiz results
  const { quizResults, loading, error } = useQuizResult(userId, false);
  const { results: assessment4Results } = useAssessment4Result(userId);
  const { users } = useUser(userId);
  const user = users[0];
  const studentId = "2021-12345-MN-0";

  console.log(user)

  const [assessments, setAssessments] = useState([]);

  // Populate the assessments array with data from quizResults
  useEffect(() => {
    if (quizResults.length > 0 || assessment4Results.length > 0) {
      const latestMap = new Map();
  
      quizResults
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .forEach((result) => {
          const key = result.assessment_number.match(/\d+/)?.[0];
          if (!latestMap.has(key)) {
            latestMap.set(key, {
              id: result.id,
              title: `${result.assessment_number}`,
              date: result.created_at,
              score: result.score,
              duration: result.duration,
              assessment_number: key,
              quiz: {
                duration: result.quiz.duration,
                title: result.quiz.title,
                response: result.quiz.response,
                assessment: result.quiz.assessment,
              },
              answers: result.answers,
            });
          }
        });
  
      const transformedQuizAssessments = Array.from(latestMap.values());
  
      // Sum ALL scores from assessment4Results
      const totalAssessment4Score = assessment4Results.reduce(
        (sum, entry) => sum + entry.score,
        0
      );
  
      const mostRecentDate =
        assessment4Results.sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )[0]?.created_at ?? new Date().toISOString();
  
      const transformedAssessment4 = {
        id: "a4-combined",
        title: "Module 4",
        date: mostRecentDate,
        score: totalAssessment4Score,
        duration: 25,
        assessment_number: "4",
        quiz: {
          duration: 25,
          title: "Module 4",
          response: [],
          assessment: [],
        },
        answers: Array(25).fill({}),
      };
  
      const combined = [...transformedQuizAssessments, transformedAssessment4];

      // Sort by assessment_number in ascending order (as number)
      combined.sort((a, b) => Number(a.assessment_number) - Number(b.assessment_number));
      
      setAssessments(combined)
    }
  }, [quizResults, assessment4Results]);
  
  const stats = useMemo(() => {
    if (assessments.length === 0) return { best: 0, average: 0, completed: 0 };

    const totalScore = assessments.reduce((sum, a) => sum + a.score, 0);
    const totalPossible = assessments.reduce(
      (sum, a) => sum + a.answers.length,
      0
    );

    const best = Math.max(
      ...assessments.map((a) => (((a.score / a.answers.length) * 50) + 50))
    );
    const average = totalPossible > 0 ? ((totalScore / totalPossible) * 50) + 50 : 0;

    return {
      best: Math.round(best),
      average: Math.round(average),
      completed: assessments.length,
    };
  }, [assessments]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto py-8 space-y-8">
        {/* Search Bar */}
        <SearchBar />

        {/* Student Profile */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <div className="relative">
            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-purple-500 shadow-lg">
              <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white text-2xl font-bold flex items-center justify-center">
                {[
                  ...(user?.first_name?.split(" ") || []),
                  user?.middle_name,
                  user?.last_name,
                ]
                  .filter(Boolean)
                  .map((name) => name[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                {user?.student_id || studentId.split("-")[3]}
              </h1>
              <div className="flex justify-center sm:justify-start gap-2 mt-2 items-center">
                <Badge
                  variant="outline"
                  className="text-orange-500 border-orange-500"
                >
                  Student
                </Badge>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-none">
              <CardContent className="p-4 text-center">
                <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">
                  {stats.best}%
                </div>
                <div className="text-sm text-gray-600">Best Score</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-none">
              <CardContent className="p-4 text-center">
                <Target className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">
                  {stats.average}%
                </div>
                <div className="text-sm text-gray-600">Avg Score</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-none">
              <CardContent className="p-4 text-center">
                <Award className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">
                  {stats.completed}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Assessment List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 px-2">
            Recent Quests
          </h2>
          {assessments.map((assessment) => (
            <motion.div
              key={assessment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-white text-lg shadow-lg shrink-0">
                        #{assessment?.assessment_number}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800">
                          {assessment?.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Timer className="w-4 h-4" />
                          {assessment?.quiz.duration} min
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 sm:ml-auto">
                      <div className="text-right">
                        <div className="text-lg sm:text-2xl font-bold text-purple-600">
                          {assessment.score}/{assessment?.answers.length}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {Math.round(((assessment.score / assessment.answers.length) * 50) + 50)}%
                        </div>
                      </div>
                      <a
                        href={`/student-breakdown/${encodeURIComponent(assessment.title)}/${userId}`}
                        className="text-purple-500 hover:text-purple-700 transition"
                        title="View Details"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
