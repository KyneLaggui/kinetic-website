import { useState } from "react";
import { ChevronRight } from "lucide-react";
import useQuizResult from "@custom-hooks/useQuizResult";
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
import { useNavigate, useParams } from "react-router-dom";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";


export default function StudentBreakdown() {
  const { userId, assessmentId } = useParams();
  const navigate = useNavigate();
  const { quizResults, isLoading } = useQuizResult(userId, true);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (isLoading) return <LoadingSpinner />;
  if (!quizResults.length) return <p>No quiz results found.</p>;

  const filteredResults = quizResults.filter((result) => {
    return (result.assessment_number === assessmentId)
  });

  const student = filteredResults[0]?.user;
  
  const getSelectedAssessment = () => {
    return filteredResults.find((a) => a.id === selectedAssessment);
  };
  
  const calculatePercentage = (score, total) => {
    return (((score / total) * 50) + 50).toFixed(1);
  };

  const getInitials = (name) => {
    const [first, last] = name.split(" ");
    return `${first?.charAt(0) || ""}${last?.charAt(0) || ""}`.toUpperCase();
  };

  const lineChartData = filteredResults.map((result) => ({
    name: `Attempt ${result.retake_number}`,
    score: result.score,
    total: result.answers.length,
    Percentage: parseFloat(calculatePercentage(result.score, result.answers.length)),
  }));

  return (
    <div className="container px-4 sm:px-6 py-6 space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/admin/quiz-scores/${assessmentId}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/admin/quiz-scores/${assessmentId}`);
              }}
            >
              {assessmentId}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>
              {student?.first_name} {student?.last_name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src="" alt={student?.first_name} />
            <AvatarFallback>
              {getInitials(student?.first_name + " " + student?.last_name)}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-2 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
              {student?.student_id}
            </h1>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center ">
              <h2 className="text-xl sm:text-2xl">
                {student?.first_name} {student?.last_name}
              </h2>
              <Badge variant="outline" className="w-fit">
                {student?.year}-{student?.section}
              </Badge>
            </div>
          </div>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} tickFormatter={(val) => `${val}%`} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Line type="monotone" dataKey="Percentage" stroke="#3b82f6" strokeWidth={3} dot />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredResults.map((assessment) => (
            <Card
              key={assessment.id}
              onClick={() => {
                setSelectedAssessment(assessment.id);
                setIsDrawerOpen(true);
              }}
              className="cursor-pointer"
            >
            <CardHeader className="flex flex-row items-start justify-between">
              <CardTitle className="text-lg sm:text-xl">
                Attempt {assessment.retake_number}
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                {new Date(assessment.created_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-end justify-between">
                    <div className="text-xl sm:text-2xl font-bold">
                      {assessment.score}/{assessment.answers.length}
                    </div>
                    <div className="text-base sm:text-lg text-muted-foreground">
                      {calculatePercentage(
                        assessment.score,
                        assessment.answers.length
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
                          assessment.answers.length
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
          <DrawerTitle className="text-lg sm:text-xl">
            Attempt {getSelectedAssessment()?.retake_number} Results
          </DrawerTitle>
            <DrawerDescription>
              Score: {getSelectedAssessment()?.score}/
              {getSelectedAssessment()?.answers.length} (
              {calculatePercentage(
                getSelectedAssessment()?.score || 0,
                getSelectedAssessment()?.answers.length || 1
              )}
              %)
            </DrawerDescription>
          </DrawerHeader>
          <ScrollArea className="h-[60vh] sm:h-[70vh]">
            <div className="p-4 sm:p-6 space-y-6">
              {getSelectedAssessment()?.answers.map((question, qIndex) => (
                <div key={qIndex} className="space-y-4">
                  <h3 className="text-sm sm:text-base font-medium flex items-start gap-2">
                    <span
                      className={`w-6 h-6 flex items-center justify-center rounded-full text-white ${
                        question.selected_answer === question.correct_answer
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {qIndex + 1}
                    </span>
                    {question.question}
                  </h3>
                  <div className="grid gap-2">
                    {question.choices.map((choice, cIndex) => (
                      <div
                        key={cIndex}
                        className={`p-3 sm:p-4 rounded-lg border ${
                          choice === question.selected_answer
                            ? choice === question.correct_answer
                              ? "bg-green-100 border-green-500"
                              : "bg-red-100 border-red-500"
                            : choice === question.correct_answer
                            ? "border-green-500 bg-green-100"
                            : "border-gray-300"
                        }`}
                      >
                        {choice}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
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








