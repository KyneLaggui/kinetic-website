import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import useQuizResult from "@/supabase/custom-hooks/useQuizResult";
import useUser from "@/supabase/custom-hooks/useUser";
import useQuiz from "@/supabase/custom-hooks/useQuiz";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function QuizScores() {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const { fetchByAssessmentNumber } = useQuizResult();
  const { fetchUserById } = useUser();
  const { quizzes } = useQuiz(assessmentId);

  const [studentResponses, setStudentResponses] = useState([]);
  const [quiz, setQuiz] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchStudentResponses = async () => {
      try {
        const rawResponses = await fetchByAssessmentNumber(assessmentId);

        // Enhance each response with user info
        const enhancedResponses = await Promise.all(
          rawResponses.map(async (res) => {
            const user = await fetchUserById(res.user_id);
            return {
              ...res,
              name: user ? `${user.first_name} ${user.last_name}` : `User ${res.user_id}`,
              studentId: user?.student_id || res.user_id,
            };
          })
        );

        // Deduplicate by user_id – keep only the latest attempt
        const latestByUser = Object.values(
          enhancedResponses.reduce((acc, res) => {
            const userId = res.user_id;
            if (!acc[userId] || new Date(res.created_at) > new Date(acc[userId].created_at)) {
              acc[userId] = res;
            }
            return acc;
          }, {})
        );

        setStudentResponses(latestByUser);
      } catch (err) {
        console.error("Failed to fetch student responses:", err.message);
      }
    };

    if (assessmentId) {
      fetchStudentResponses();
    }
  }, [assessmentId]);

  useEffect(() => {
    if (quizzes.length > 0) {
      setQuiz(quizzes[0]);
    }
  }, [quizzes]);

  // Search filter
  const filteredResults = studentResponses.filter((res) =>
    `${res.name} ${res.studentId}`.toLowerCase().includes(search.toLowerCase())
  );

  const handleClick = (userId) => {
    navigate(`/student-breakdown/${assessmentId}/${userId}`);
  };

  return (
    <div className="container px-4 py-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/admin/scores"
              onClick={(e) => {
                e.preventDefault();
                navigate("/admin/scores");
              }}
            >
              All Assessments
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <ChevronRight className="h-4 w-4" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>{quiz?.title || assessmentId}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Title */}
      <header className="mt-4 mb-8">
        <div className="space-y-2 text-left">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-nowrap">
            {quiz?.title || "Quiz Title"}
          </h1>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <h2 className="text-md sm:text-lg text-muted-foreground">
              {quiz?.assessment || `${assessmentId}`}
            </h2>
            <Badge variant="outline" className="w-fit">
              {studentResponses.length} student{studentResponses.length !== 1 ? "s" : ""}
            </Badge>
          </div>
        </div>
      </header>

      {/* Search + List */}
      <div className="w-full max-w-6xl mx-auto">
        <Input
          type="text"
          placeholder="Search by name or student number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4"
        />

        {filteredResults.length === 0 ? (
          <p className="text-center w-full py-16 text-muted-foreground">
            No matching responses found.
          </p>
        ) : (
          <div className="space-y-4">
            {filteredResults.map((res) => {
              const percentage = ((res.score / res.answers.length) * 50 + 50).toFixed(1);
              return (
                <Card
                  key={res.id}
                  onClick={() => handleClick(res.user_id)}
                  className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{res.name}</p>
                      <p className="text-sm text-muted-foreground">{res.studentId}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">
                        Latest Score: {res.score}/{res.answers.length}
                      </p>
                      <Badge variant="secondary">{percentage}%</Badge>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
