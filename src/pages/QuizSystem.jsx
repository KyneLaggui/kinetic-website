import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";
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
import useQuiz from "../supabase/custom-hooks/useQuiz";
import useQuestion from "@/supabase/custom-hooks/useQuestion";



export default function QuizSystem() {
  const navigate = useNavigate();
  const { quizzes, createQuiz } = useQuiz();

  const handleNavigate = (assessmentId) => {
    navigate(`/admin/quiz-detail/${assessmentId}`);
  };

  const [newQuizTitle, setNewQuizTitle] = useState("");
  const [newQuizDuration, setNewQuizDuration] = useState("");
  const [newQuizAssessment, setNewQuizAssessment] = useState("");
  const [usedAssessments, setUsedAssessments] = useState(new Set());
  const { fetchQuestionsReturn } = useQuestion(); // Only needed for type consistency
  const [questionCounts, setQuestionCounts] = useState({});

  
  const assessments = ["Assessment 1", "Assessment 2", "Assessment 3"];

  const handleCreateQuiz = async() => {    
    const result = await createQuiz(newQuizTitle, newQuizAssessment, newQuizDuration);

    if (result) {
      setUsedAssessments(new Set([...usedAssessments, newQuizAssessment]));
      setNewQuizTitle("");
      setNewQuizAssessment("");
      setNewQuizDuration("");
    }     
  };

  useEffect(() => {
    const usedAssessments = new Set(quizzes.map((quiz) => quiz.assessment));
    setUsedAssessments(usedAssessments);
  
    const loadQuestionCounts = async () => {
      const counts = {};
  
      for (const quiz of quizzes) {
        try {
          const questions = await fetchQuestionsReturn(quiz.assessment);
          counts[quiz.assessment] = questions?.length || 0;
        } catch (err) {
          console.error(`Failed to fetch questions for ${quiz.assessment}`, err);
          counts[quiz.assessment] = 0;
        }
      }
  
      setQuestionCounts(counts);
    };
  
    if (quizzes.length > 0) {
      loadQuestionCounts();
    }
  }, [quizzes]);  

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
            <Button className={`w-full sm:w-fit`} disabled={usedAssessments.size >= 3}>
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
            onClick={() => handleNavigate(quiz.assessment)}
          >
            <CardHeader>
              <CardTitle>{quiz.title}</CardTitle>
              <CardDescription>{quiz.assessment}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">
                <Badge variant="secondary">
                  {questionCounts[quiz.assessment] > 0
                    ? `${questionCounts[quiz.assessment]} Question${questionCounts[quiz.assessment] === 1 ? '' : 's'}`
                    : "No questions"}
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
