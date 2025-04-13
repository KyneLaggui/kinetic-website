import { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Timer, Target, Award } from "lucide-react";
import { motion } from "framer-motion";
import SearchBar from "@/layouts/SearchBar.tsx";
import useQuizResult from "@custom-hooks/useQuizResult"; // Import the custom hook
import useAssessment4Result from '@custom-hooks/useAssessment4Result';
import useUser from "@custom-hooks/useUser"; // Import the custom hook
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';


export default function GamifiedAssessmentDashboard() {
  const { userId } = useParams()
  // Use the custom hook to fetch quiz results
  const { quizResults, loading, error } = useQuizResult(userId, false);
  const { results: assessment4Results } = useAssessment4Result(userId);
  const { users } = useUser(userId);
  const user = users[0];

  const studentId = "2021-12345-MN-0"

  const [assessments, setAssessments] = useState([]);

  // Populate the assessments array with data from quizResults
  useEffect(() => {
    if (quizResults.length > 0 || assessment4Results.length > 0) {
      const transformedQuizAssessments = quizResults.map((result) => ({
        id: result.id,
        title: `Assessment ${result.assessment_number}: ${result.title}`,
        date: result.created_at,
        score: result.score,
        duration: result.duration,
        assessment_number: result.assessment_number.match(/\d+/)?.[0],
        quiz: {
          duration: result.quiz.duration,
          title: result.quiz.title,
          response: result.quiz.response,
          assessment: result.quiz.assessment,
        },
        answers: result.answers,
      }));
  
      // ✅ Sum ALL scores from assessment4Results (no filtering)
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
        answers: Array(25).fill({}), // Optional placeholder for completeness
      };
  
      const combined = [...transformedQuizAssessments, transformedAssessment4];
      setAssessments(combined);
    }
  }, [quizResults, assessment4Results]);

  const stats = useMemo(() => {
    if (assessments.length === 0) return { best: 0, average: 0, completed: 0 };
  
    const percentageScores = assessments.map(
      (a) => (a.score / a.answers.length) * 100
    );
  
    const best = Math.max(...percentageScores);
    const average =
      percentageScores.reduce((sum, score) => sum + score, 0) /
      percentageScores.length;
  
    return {
      best: Math.round(best),
      average: Math.round(average),
      completed: assessments.length,
    };
  }, [assessments]);

  if (loading) return <div>Loading...</div>;
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
                <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-2xl text-white">
                  {/* {user?.student_id || studentId.split("-")[3]} */}
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
                <div className="text-2xl font-bold text-gray-800">{stats.best}%</div>
                <div className="text-sm text-gray-600">Best Score</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-none">
              <CardContent className="p-4 text-center">
                <Target className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">{stats.average}%</div>
                <div className="text-sm text-gray-600">Avg Score</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-none">
              <CardContent className="p-4 text-center">
                <Award className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">{stats.completed}</div>
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
                          {assessment?.quiz.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Timer className="w-4 h-4" />
                          {assessment?.quiz.duration} min
                        </div>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-purple-600">
                      {assessment.score}/{assessment?.answers.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <Badge variant="outline">
                        {Math.round((assessment.score / assessment.answers.length) * 100)}%
                      </Badge>
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
