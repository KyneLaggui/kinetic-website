import { useState } from "react";
import {
  Pencil,
  Plus,
  Trash2,
  GripVertical,
  Check,
  X,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  id: string;
  text: string;
  choices: Choice[];
}

interface StudentResponse {
  id: string;
  name: string;
  studentId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  dateTaken: string;
  answers: {
    questionId: string;
    choiceId: string;
  }[];
}

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

  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [editingChoice, setEditingChoice] = useState<{
    questionId: string;
    choice: Choice;
  } | null>(null);
  const [newChoiceText, setNewChoiceText] = useState("");
  const [duration, setDuration] = useState(60); // Default duration in minutes
  const [isEditingDuration, setIsEditingDuration] = useState(false);

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

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: `q${questions.length + 1}`,
      text: "New Question",
      choices: [
        { id: `q${questions.length + 1}a`, text: "Choice 1", isCorrect: false },
        { id: `q${questions.length + 1}b`, text: "Choice 2", isCorrect: false },
      ],
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
  };

  const handleUpdateQuestion = (updatedQuestion: Question) => {
    setQuestions(
      questions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
    setEditingQuestion(null);
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

  const handleAddChoice = (questionId: string, choiceText: string) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              choices: [
                ...q.choices,
                {
                  id: `${questionId}${q.choices.length + 1}`,
                  text: choiceText,
                  isCorrect: false,
                },
              ],
            }
          : q
      )
    );
  };

  const handleEditChoice = (questionId: string, choice: Choice) => {
    setEditingChoice({ questionId, choice });
  };

  const handleUpdateChoice = (questionId: string, updatedChoice: Choice) => {
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
    setEditingChoice(null);
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

  const [openDrawer, setOpenDrawer] = useState<string | null>(null);

  const handleUpdateDuration = (newDuration: number) => {
    setDuration(newDuration);
    setIsEditingDuration(false);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold mb-2">Mathematics Quiz 1</h1>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            {isEditingDuration ? (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-20"
                />
                <Button
                  size="sm"
                  onClick={() => handleUpdateDuration(duration)}
                >
                  Save
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>{duration} minutes</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingDuration(true)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
        <p className="text-muted-foreground">
          Edit your quiz questions and view responses
        </p>
      </div>

      <Tabs defaultValue="quiz" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
          <TabsTrigger value="responses">Responses</TabsTrigger>
        </TabsList>

        <TabsContent value="quiz" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button onClick={handleAddQuestion}>
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>

          {questions.map((question, qIndex) => (
            <Card key={question.id} className="mb-4">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Question {qIndex + 1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Question</DialogTitle>
                          <DialogDescription>
                            Make changes to your question here.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <Input
                            defaultValue={question.text}
                            onChange={(e) =>
                              setEditingQuestion({
                                ...question,
                                text: e.target.value,
                              })
                            }
                          />
                        </div>
                        <DialogFooter>
                          <Button
                            onClick={() =>
                              editingQuestion &&
                              handleUpdateQuestion(editingQuestion)
                            }
                          >
                            Save changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteQuestion(question.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="pl-7">
                  <p className="mb-4">{question.text}</p>
                  <div className="space-y-2">
                    {question.choices.map((choice) => (
                      <div
                        key={choice.id}
                        className="flex items-center justify-between p-2 rounded-lg border"
                      >
                        <div className="flex items-center gap-2">
                          <Button
                            variant={choice.isCorrect ? "default" : "ghost"}
                            size="icon"
                            className="h-6 w-6"
                            onClick={() =>
                              handleSetCorrectAnswer(question.id, choice.id)
                            }
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <span>{choice.text}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {choice.isCorrect && (
                            <Badge variant="secondary">Correct Answer</Badge>
                          )}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Choice</DialogTitle>
                                <DialogDescription>
                                  Make changes to your choice here.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <Input
                                  defaultValue={choice.text}
                                  onChange={(e) =>
                                    setEditingChoice({
                                      questionId: question.id,
                                      choice: {
                                        ...choice,
                                        text: e.target.value,
                                      },
                                    })
                                  }
                                />
                              </div>
                              <DialogFooter>
                                <Button
                                  onClick={() =>
                                    editingChoice &&
                                    handleUpdateChoice(
                                      editingChoice.questionId,
                                      editingChoice.choice
                                    )
                                  }
                                >
                                  Save changes
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleDeleteChoice(question.id, choice.id)
                            }
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="mt-4">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Choice
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Choice</DialogTitle>
                        <DialogDescription>
                          Enter the text for the new choice.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <Input
                          id="new-choice"
                          placeholder="Enter choice text"
                          onChange={(e) => setNewChoiceText(e.target.value)}
                        />
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={() => {
                            if (newChoiceText) {
                              handleAddChoice(question.id, newChoiceText);
                              setNewChoiceText("");
                            }
                          }}
                        >
                          Add Choice
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="responses">
          <div className="space-y-4">
            {studentResponses.map((response) => (
              <Card
                key={response.id}
                className="flex flex-row items-center justify-between p-4 cursor-pointer hover:bg-accent"
                onClick={() => setOpenDrawer(response.id)}
              >
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg">{response.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {response.studentId}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      Score: {response.score}/{response.totalQuestions}
                    </p>
                    <Badge variant="secondary">{response.percentage}%</Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          {studentResponses.map((response) => (
            <Drawer
              key={response.id}
              open={openDrawer === response.id}
              onOpenChange={(open) => setOpenDrawer(open ? response.id : null)}
            >
              <DrawerContent>
                <DrawerHeader className="border-b">
                  <DrawerTitle>{response.name}'s Answers</DrawerTitle>
                  <DrawerDescription>{response.studentId}</DrawerDescription>
                </DrawerHeader>
                <ScrollArea className="h-[70vh]">
                  <div className="p-6">
                    <div className="space-y-6">
                      {questions.map((question, index) => {
                        // Find the user's selected answer for this question
                        const userAnswer = response.answers.find(
                          (answer) => answer.questionId === question.id
                        );

                        // Check if the user's selected answer is correct
                        const isCorrect = userAnswer
                          ? question.choices.find(
                              (choice) => choice.id === userAnswer.choiceId
                            )?.isCorrect
                          : null; // Null if no answer selected

                        return (
                          <div key={question.id} className="space-y-4">
                            {/* Question Number with Colored Circle */}
                            <h3 className="font-medium flex items-center gap-2">
                              <span
                                className={`w-6 h-6 flex items-center justify-center rounded-full text-white ${
                                  userAnswer
                                    ? isCorrect
                                      ? "bg-green-500"
                                      : "bg-red-500"
                                    : "bg-gray-500"
                                }`}
                              >
                                {index + 1}
                              </span>
                              {question.text}
                            </h3>

                            {/* Answer Choices */}
                            <div className="grid gap-2">
                              {question.choices.map((choice) => {
                                const isSelected = response.answers.some(
                                  (answer) =>
                                    answer.questionId === question.id &&
                                    answer.choiceId === choice.id
                                );
                                const isCorrectChoice = choice.isCorrect;

                                let bgColor = "bg-white"; // Default color

                                if (isSelected) {
                                  bgColor = isCorrectChoice
                                    ? "bg-green-100 border-green-500"
                                    : "bg-red-100 border-red-500";
                                } else if (isCorrectChoice) {
                                  bgColor = "bg-green-100 border-green-500";
                                }

                                return (
                                  <div
                                    key={choice.id}
                                    className={`p-4 rounded-lg border ${bgColor}`}
                                  >
                                    {choice.text}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </ScrollArea>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
