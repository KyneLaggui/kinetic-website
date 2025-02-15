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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function QuizSystem() {
  const navigate = useNavigate(); // Hook for navigation
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

  const handleNavigate = (id) => {
    navigate(`/admin/quiz-detail`);
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
            <DialogFooter>
              <Button>Create Quiz</Button>
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
                <Badge variant="secondary">{quiz.responses} Responses</Badge>
                <span className="text-sm text-muted-foreground">
                  Created {new Date(quiz.date).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
