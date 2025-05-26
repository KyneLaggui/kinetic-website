import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import useQuizResult from "@/supabase/custom-hooks/useQuizResult";
import useUser from "@/supabase/custom-hooks/useUser";
import LatestAttemptList from "@/components/quiz-system/LatestAttemptList";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";

export default function QuizScores() {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const { fetchByAssessmentNumber, fetchQuizByAssessmentNumber } =
    useQuizResult();
  const { fetchUserById } = useUser();

  const [studentResponses, setStudentResponses] = useState([]);
  const [quiz, setQuiz] = useState(null); // for quiz.title and quiz.assessment

  useEffect(() => {
    const fetchStudentResponses = async () => {
      try {
        const rawResponses = await fetchByAssessmentNumber(assessmentId);

        const enhancedResponses = await Promise.all(
          rawResponses.map(async (res) => {
            const user = await fetchUserById(res.user_id);
            return {
              ...res,
              name: user
                ? `${user.first_name} ${user.last_name}`
                : `User ${res.user_id}`,
              studentId: user?.student_id || res.user_id,
            };
          })
        );

        setStudentResponses(enhancedResponses);
      } catch (err) {
        console.error("Failed to fetch student responses:", err.message);
      }
    };

    const fetchQuizMetadata = async () => {
      try {
        const quizData = await fetchQuizByAssessmentNumber(assessmentId);
        setQuiz(quizData);
      } catch (err) {
        console.error("Failed to fetch quiz metadata:", err.message);
      }
    };

    if (assessmentId) {
      fetchStudentResponses();
      fetchQuizMetadata();
    }
  }, [
    assessmentId,
    fetchByAssessmentNumber,
    fetchUserById,
    fetchQuizByAssessmentNumber,
  ]);

  return (
    <div className="container px-4 py-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/admin/quiz-scores"
              onClick={(e) => {
                e.preventDefault();
                navigate("/admin/quiz-scores");
              }}
            >
              All Assessments
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>{quiz?.title || assessmentId}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Title */}
      <header className="mt-4 mb-8">
        <div className="space-y-2 text-left">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-nowrap">
            {quiz?.title || "Quiz Title"}
          </h1>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 ">
            <h2 className="text-md sm:text-lg text-muted-foreground">
              {quiz?.assessment || `Assessment ID: ${assessmentId}`}
            </h2>
            <Badge variant="outline" className="w-fit ">
              16 responses
            </Badge>
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-col items-start justify-start">
        {studentResponses.length === 0 ? (
          <p className="flex items-center justify-center h-screen w-full">
            No responses found.
          </p>
        ) : (
          <LatestAttemptList responses={studentResponses} />
        )}
      </div>
    </div>
  );
}
