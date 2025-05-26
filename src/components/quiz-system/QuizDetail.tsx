import { useEffect, useState } from "react";
import { QuizHeader } from "@/components/quiz-system/QuizHeader";
import { AddQuestionDialog } from "@/components/quiz-system/AddQuestionDialog";
import { QuestionCard } from "@/components/quiz-system/QuestionCard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight } from "lucide-react";
import useQuestion from "@/supabase/custom-hooks/useQuestion";
import { useNavigate, useParams } from "react-router-dom";
import useQuiz from "@/supabase/custom-hooks/useQuiz";
import useQuizResult from "@/supabase/custom-hooks/useQuizResult";
import useUser from "@/supabase/custom-hooks/useUser";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function QuizDetail() {
  const { assessmentId } = useParams<{ assessmentId: string }>();
  const {
    questions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    loading,
    error,
  } = useQuestion(assessmentId);
  const { quizzes, updateQuiz, deleteQuiz } = useQuiz(assessmentId);
  const { fetchByAssessmentNumber } = useQuizResult();
  const { fetchUserById } = useUser();

  const [studentResponses, setStudentResponses] = useState<StudentResponse[]>(
    []
  );
  const [openDrawer, setOpenDrawer] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleAddQuestion = async (newQuestionData: {
    title: string;
    choices: { choice: string; isAnswer: boolean }[];
  }) => {
    const correctAnswer =
      newQuestionData.choices.find((c) => c.isAnswer)?.choice || "";
    await createQuestion(
      newQuestionData.title,
      newQuestionData.choices,
      correctAnswer,
      assessmentId
    );
  };

  const handleEditQuestion = async (updatedQuestion: Question) => {
    await updateQuestion(updatedQuestion.id, updatedQuestion);
  };

  const handleDeleteQuestion = async (questionId: string) => {
    await deleteQuestion(questionId);
  };

  const handleDeleteQuiz = async (assessmentId: string) => {
    const isSuccessful = await deleteQuiz(assessmentId);
    if (isSuccessful) {
      navigate("/admin/quiz-system");
    }
  };

  useEffect(() => {
    const fetchStudentResponses = async () => {
      if (quizzes.length === 0) return;

      const currentAssessment = quizzes[0].assessment;

      try {
        const rawResponses = await fetchByAssessmentNumber(currentAssessment);

        // Fetch user info for each response concurrently
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

    fetchStudentResponses();
  }, [quizzes]);

  return (
    <div className="container mx-auto py-6">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/quiz-system">
              All Quizzes
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Quiz Name</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {quizzes.length > 0 && (
        <QuizHeader
          onUpdateQuiz={updateQuiz}
          onDeleteQuiz={handleDeleteQuiz}
          assessmentId={assessmentId}
          quiz={quizzes[0]}
        />
      )}

      <div className="flex justify-end mb-4 mt-6 ">
        <AddQuestionDialog onAddQuestion={handleAddQuestion} />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p className="flex items-center justify-center h-screen w-full">
          Error: {error}
        </p>
      ) : (
        questions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            index={index}
            onEditQuestion={handleEditQuestion}
            onDeleteQuestion={handleDeleteQuestion}
          />
        ))
      )}
    </div>
  );
}
