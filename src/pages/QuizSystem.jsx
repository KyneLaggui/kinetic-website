import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function QuizSystem() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      title: "The Network Quest – Unveiling the Hidden World of Communication",
      description: "Assessment 1 ",
      responses: 24,
    },
    {
      id: 2,
      title: "The Network Engineer's Toolkit – Gearing Up for the Adventure",
      description: "Assessment 2",
      responses: 18,
    },
    {
      id: 3,
      title: "The Terminal Challenge – Command the Network with Your Skills",
      description: "Assessment 3",
      responses: 0,
    },
  ]);

  const handleNavigate = (id) => {
    navigate(`/admin/quiz-detail`);
  };

  const [newQuizTitle, setNewQuizTitle] = useState("");
  const [newQuizDescription, setNewQuizDescription] = useState("");
  const [newQuizDuration, setNewQuizDuration] = useState("");
  const [newQuizAssessment, setNewQuizAssessment] = useState("");
  const [usedAssessments, setUsedAssessments] = useState(new Set());
  const assessments = ["Assessment 1", "Assessment 2", "Assessment 3"];

  const handleCreateQuiz = () => {
    if (
      newQuizTitle &&
      newQuizDescription &&
      newQuizAssessment &&
      newQuizDuration
    ) {
      const newQuiz = {
        id: quizzes.length + 1,
        title: newQuizTitle,
        responses: 0,
        date: new Date().toISOString().split("T")[0],
      };
      setQuizzes([...quizzes, newQuiz]);
      setUsedAssessments(new Set([...usedAssessments, newQuizAssessment]));
      setNewQuizTitle("");
      setNewQuizDescription("");
      setNewQuizAssessment("");
      setNewQuizDuration("");
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Quizzes</h2>
          <p className="text-muted-foreground">
            Manage and monitor your quizzes and assessments.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-fit">
              <PlusCircle className="h-4 w-4" />
              Create Quiz
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Quiz</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new quiz.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newQuizTitle}
                  onChange={(e) => setNewQuizTitle(e.target.value)}
                  className="col-span-3"
                />
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="assessment">Assessment</Label>
                <Select
                  value={newQuizAssessment}
                  onValueChange={setNewQuizAssessment}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select an Assessment" />
                  </SelectTrigger>
                  <SelectContent>
                    {assessments.map((assessment) => (
                      <SelectItem
                        key={assessment}
                        value={assessment}
                        disabled={usedAssessments.has(assessment)}
                      >
                        {assessment}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-3">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={newQuizDuration}
                  onChange={(e) => setNewQuizDuration(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateQuiz}>Create Quiz</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <Card
            key={quiz.id}
            className="cursor-pointer hover:shadow-lg transition"
            onClick={() => handleNavigate()}
          >
            <CardHeader>
              <CardTitle>{quiz.title}</CardTitle>
              <CardDescription>{quiz.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">
                  <Badge variant="secondary">
                    {quiz.responses
                      ? `${quiz.responses} Responses`
                      : "No responses"}
                  </Badge>
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
