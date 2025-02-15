import { useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data - replace with real data fetching
const studentData = {
  id: "2023-58291-MN-0",
  name: "John Doe",
  section: "BSCPE 3-5",
  avatarUrl: "", // Add actual avatar URL if available
  assessments: [
    {
      id: 1,
      title: "Assessment 1",
      score: 8,
      totalQuestions: 10,
      questions: [
        {
          id: 1,
          question: "What is the capital of France?",
          choices: ["London", "Berlin", "Paris", "Madrid"],
          correctAnswer: 2,
          userAnswer: 1,
        },
        {
          id: 2,
          question: "Which planet is closest to the sun?",
          choices: ["Venus", "Mercury", "Mars", "Earth"],
          correctAnswer: 1,
          userAnswer: 1,
        },
      ],
    },
    {
      id: 2,
      title: "Assessment 2",
      score: 15,
      totalQuestions: 20,
      questions: [
        {
          id: 1,
          question: "What is the largest mammal?",
          choices: [
            "African Elephant",
            "Blue Whale",
            "Giraffe",
            "Hippopotamus",
          ],
          correctAnswer: 1,
          userAnswer: 1,
        },
      ],
    },
  ],
};

export default function StudentBreakdown() {
  const [selectedAssessment, setSelectedAssessment] = useState<number | null>(
    null
  );
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const getSelectedAssessment = () => {
    return studentData.assessments.find((a) => a.id === selectedAssessment);
  };

  const calculatePercentage = (score: number, total: number) => {
    return ((score / total) * 100).toFixed(1);
  };

  const getInitials = (name: string) => {
    const [first, last] = name.split(" ");
    return `${first?.charAt(0) || ""}${last?.charAt(0) || ""}`.toUpperCase();
  };

  return (
    <div className="container p-6 space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">All Students</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>{studentData.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={studentData.avatarUrl} alt={studentData.name} />
            <AvatarFallback>{getInitials(studentData.name)}</AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              {studentData.id}
            </h1>
            <div className="flex gap-4">
              <h2 className="text-2xl">{studentData.name}</h2>
              <Badge variant="outline" className="w-fit">
                {studentData.section}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {studentData.assessments.map((assessment) => (
            <Card
              key={assessment.id}
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => {
                setSelectedAssessment(assessment.id);
                setIsDrawerOpen(true);
              }}
            >
              <CardHeader>
                <CardTitle>{assessment.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-end justify-between">
                    <div className="text-2xl font-bold">
                      {assessment.score}/{assessment.totalQuestions}
                    </div>
                    <div className="text-lg text-muted-foreground">
                      {calculatePercentage(
                        assessment.score,
                        assessment.totalQuestions
                      )}
                      %
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{
                        width: `${calculatePercentage(
                          assessment.score,
                          assessment.totalQuestions
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader className="border-b">
            <DrawerTitle>{getSelectedAssessment()?.title} Results</DrawerTitle>
            <DrawerDescription>
              Score: {getSelectedAssessment()?.score}/
              {getSelectedAssessment()?.totalQuestions} (
              {calculatePercentage(
                getSelectedAssessment()?.score || 0,
                getSelectedAssessment()?.totalQuestions || 1
              )}
              %)
            </DrawerDescription>
          </DrawerHeader>
          <ScrollArea className="h-[70vh]">
            <div className="p-6">
              <div className="space-y-6">
                {getSelectedAssessment()?.questions.map((question, qIndex) => (
                  <div key={question.id} className="space-y-4">
                    <h3 className="font-medium">
                      {qIndex + 1}. {question.question}
                    </h3>
                    <div className="grid gap-2">
                      {question.choices.map((choice, cIndex) => (
                        <div
                          key={cIndex}
                          className={`p-4 rounded-lg border ${
                            question.userAnswer === cIndex
                              ? cIndex === question.correctAnswer
                                ? "bg-green-100 border-green-500"
                                : "bg-red-100 border-red-500"
                              : cIndex === question.correctAnswer
                              ? "bg-green-100 border-green-500"
                              : ""
                          }`}
                        >
                          {choice}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
          <DrawerFooter className="border-t">
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
