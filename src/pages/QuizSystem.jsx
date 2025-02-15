"use client";

import { useState } from "react";
import { PlusCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function QuizSystem() {
  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      title: "Mathematics Quiz 1",
      description: "Basic Algebra and Arithmetic",
      responses: 24,
      date: "2024-02-15",
    },
    {
      id: 2,
      title: "Physics Assessment",
      description: "Mechanics and Motion",
      responses: 18,
      date: "2024-02-14",
    },
    {
      id: 3,
      title: "Programming Fundamentals",
      description: "Introduction to Python",
      responses: 32,
      date: "2024-02-13",
    },
  ]);

  const [newQuizTitle, setNewQuizTitle] = useState("");
  const [newQuizSubject, setNewQuizSubject] = useState("");
  const [newQuizDuration, setNewQuizDuration] = useState("");
  const [usedSubjects, setUsedSubjects] = useState(new Set());

  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Literature",
    "History",
    "Geography",
  ];

  const handleCreateQuiz = () => {
    if (newQuizTitle && newQuizSubject && newQuizDuration) {
      const newQuiz = {
        id: quizzes.length + 1,
        title: newQuizTitle,
        description: `${newQuizSubject} - ${newQuizDuration} minutes`,
        responses: 0,
        date: new Date().toISOString().split("T")[0],
      };
      setQuizzes([...quizzes, newQuiz]);
      setUsedSubjects(new Set([...usedSubjects, newQuizSubject]));
      setNewQuizTitle("");
      setNewQuizSubject("");
      setNewQuizDuration("");
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Quizzes</h2>
          <p className="text-muted-foreground">
            Manage and monitor your quizzes and assessments.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newQuizTitle}
                  onChange={(e) => setNewQuizTitle(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subject" className="text-right">
                  Subject
                </Label>
                <Select
                  value={newQuizSubject}
                  onValueChange={setNewQuizSubject}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem
                        key={subject}
                        value={subject}
                        disabled={usedSubjects.has(subject)}
                      >
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">
                  Duration (minutes)
                </Label>
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

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search quizzes..." className="pl-10" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="relative">
            <CardHeader>
              <CardTitle>{quiz.title}</CardTitle>
              <CardDescription>{quiz.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{quiz.responses} Responses</Badge>
                  <span className="text-sm text-muted-foreground">
                    Created {new Date(quiz.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
