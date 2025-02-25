import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuizHeader } from "@/components/quiz-system/QuizHeader";
import { AddQuestionDialog } from "@/components/quiz-system/AddQuestionDialog";
import { QuestionCard } from "@/components/quiz-system/QuestionCard";
import { StudentResponseCard } from "@/components/quiz-system/StudentResponseCard";
import { ResponseDrawer } from "@/components/quiz-system/ResponseDrawer";
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

export default function QuizDetail() {
  const { quizId } = useParams<{ quizId: string }>();
  const { questions, createQuestion, updateQuestion, deleteQuestion, loading, error } = useQuestion(quizId);
  const { quizzes, updateQuiz, deleteQuiz } = useQuiz(quizId)

  const [studentResponses, setStudentResponses] = useState<StudentResponse[]>([/* sample data */]);
  const [openDrawer, setOpenDrawer] = useState<string | null>(null);

  const navigate = useNavigate()

  const handleAddQuestion = async (newQuestionData: { title: string; choices: { choice: string; isAnswer: boolean }[] }) => {
    const correctAnswer = newQuestionData.choices.find((c) => c.isAnswer)?.choice || "";
    await createQuestion(newQuestionData.title, newQuestionData.choices, correctAnswer, quizId);
  };
  
  const handleEditQuestion = async (updatedQuestion: Question) => {    
    await updateQuestion(updatedQuestion.id, updatedQuestion);
  };

  const handleDeleteQuestion = async (questionId: string) => {
    await deleteQuestion(questionId);
  };

  const handleDeleteQuiz = async (quizId: number) => {
    const isSuccessful = await deleteQuiz(quizId);
    if (isSuccessful) {
      navigate('/admin/quiz-system')
    }
  }

  return (
    <div className="container mx-auto py-6">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/quiz-system">All Quizzes</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator><ChevronRight className="h-4 w-4" /></BreadcrumbSeparator>
          <BreadcrumbItem><BreadcrumbPage>Quiz Name</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {quizzes.length > 0 && (
        <QuizHeader onUpdateQuiz={updateQuiz} onDeleteQuiz={handleDeleteQuiz} quizId={quizId} quiz={quizzes[0]} />
      )}

      <Tabs defaultValue="quiz" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
          <TabsTrigger value="responses">Responses</TabsTrigger>
        </TabsList>

        <TabsContent value="quiz" className="space-y-4">
          <div className="flex justify-end mb-4">
            <AddQuestionDialog onAddQuestion={handleAddQuestion} />
          </div>

          {loading ? <p>Loading questions...</p> : error ? <p>Error: {error}</p> : questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={index}
              onEditQuestion={handleEditQuestion}
              onDeleteQuestion={handleDeleteQuestion}
            />
          ))}
        </TabsContent>

        <TabsContent value="responses">
          <div className="space-y-4">
            {studentResponses.map((response) => (
              <StudentResponseCard
                key={response.id}
                response={response}
                onClick={() => setOpenDrawer(response.id)}
              />
            ))}
          </div>

          {studentResponses.map((response) => (
            <ResponseDrawer
              key={response.id}
              response={response}
              questions={questions}
              open={openDrawer === response.id}
              onOpenChange={(open) => setOpenDrawer(open ? response.id : null)}
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
