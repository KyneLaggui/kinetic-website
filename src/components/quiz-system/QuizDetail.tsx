import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuizHeader } from "@/components/quiz-system/QuizHeader";
import { AddQuestionDialog } from "@/components/quiz-system/AddQuestionDialog";
import { QuestionCard } from "@/components/quiz-system/QuestionCard";
import { StudentResponseCard } from "@/components/quiz-system/StudentResponseCard";
import { ResponseDrawer } from "@/components/quiz-system/ResponseDrawer";

export default function QuizDetail() {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      text: "What is the capital of France?",
      choices: [
        { id: "1a", text: "London", isCorrect: false },
        { id: "1b", text: "Paris", isCorrect: true },
        { id: "1c", text: "Berlin", isCorrect: false },
        { id: "1d", text: "Madrid", isCorrect: false },
      ],
    },
    {
      id: "2",
      text: "Which planet is known as the Red Planet?",
      choices: [
        { id: "2a", text: "Venus", isCorrect: false },
        { id: "2b", text: "Mars", isCorrect: true },
        { id: "2c", text: "Jupiter", isCorrect: false },
        { id: "2d", text: "Saturn", isCorrect: false },
      ],
    },
  ]);

  const [studentResponses, setStudentResponses] = useState<StudentResponse[]>([
    {
      id: "1",
      name: "John Doe",
      studentId: "2021-12345-MN-0",
      score: 8,
      totalQuestions: 10,
      percentage: 80,
      dateTaken: "2024-02-15",
      answers: [
        { questionId: "1", choiceId: "1b" },
        { questionId: "2", choiceId: "2b" },
      ],
    },
    {
      id: "2",
      name: "Jane Smith",
      studentId: "2021-67890-MN-0",
      score: 7,
      totalQuestions: 10,
      percentage: 70,
      dateTaken: "2024-02-15",
      answers: [
        { questionId: "1", choiceId: "1b" },
        { questionId: "2", choiceId: "2c" },
      ],
    },
  ]);

  const [duration, setDuration] = useState(60);
  const [openDrawer, setOpenDrawer] = useState<string | null>(null);

  const handleAddQuestion = (newQuestionData: {
    title: string;
    choices: string[];
  }) => {
    const newQuestion: Question = {
      id: `q${questions.length + 1}`,
      text: newQuestionData.title,
      choices: newQuestionData.choices.map((choiceText, index) => ({
        id: `q${questions.length + 1}c${index + 1}`,
        text: choiceText,
        isCorrect: index === 0, // First choice is correct by default
      })),
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleEditQuestion = (updatedQuestion: Question) => {
    setQuestions(
      questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  };

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
  };

  const handleSetCorrectAnswer = (questionId: string, choiceId: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              choices: q.choices.map((c) => ({
                ...c,
                isCorrect: c.id === choiceId,
              })),
            }
          : q
      )
    );
  };

  const handleEditChoice = (questionId: string, updatedChoice: Choice) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              choices: q.choices.map((c) =>
                c.id === updatedChoice.id ? updatedChoice : c
              ),
            }
          : q
      )
    );
  };

  const handleDeleteChoice = (questionId: string, choiceId: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              choices: q.choices.filter((c) => c.id !== choiceId),
            }
          : q
      )
    );
  };

  const handleAddChoice = (questionId: string, choiceText: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              choices: [
                ...q.choices,
                {
                  id: `${questionId}c${q.choices.length + 1}`,
                  text: choiceText,
                  isCorrect: false,
                },
              ],
            }
          : q
      )
    );
  };

  return (
    <div className="container mx-auto py-6">
      <QuizHeader duration={duration} onDurationChange={setDuration} />

      <Tabs defaultValue="quiz" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
          <TabsTrigger value="responses">Responses</TabsTrigger>
        </TabsList>

        <TabsContent value="quiz" className="space-y-4">
          <div className="flex justify-end mb-4">
            <AddQuestionDialog onAddQuestion={handleAddQuestion} />
          </div>

          {questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={index}
              onEditQuestion={handleEditQuestion}
              onDeleteQuestion={handleDeleteQuestion}
              onSetCorrectAnswer={handleSetCorrectAnswer}
              onEditChoice={handleEditChoice}
              onDeleteChoice={handleDeleteChoice}
              onAddChoice={handleAddChoice}
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
