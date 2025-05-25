import { useEffect, useState } from "react";
import { StudentResponseCard } from "@/components/quiz-system/StudentResponseCard";
import useQuizResult from "@/supabase/custom-hooks/useQuizResult";
import useUser from "@/supabase/custom-hooks/useUser";
import { useParams } from "react-router-dom";
import LatestAttemptList from "@/components/quiz-system/LatestAttemptList";

export default function QuizScores() {
  const { assessmentId } = useParams();
  const { fetchByAssessmentNumber } = useQuizResult();
  const { fetchUserById } = useUser();

  const [studentResponses, setStudentResponses] = useState([]);

  useEffect(() => {
    const fetchStudentResponses = async () => {
      try {
        const rawResponses = await fetchByAssessmentNumber(assessmentId);

        console.log(rawResponses);

        const enhancedResponses = await Promise.all(
          rawResponses.map(async (res) => {
            const user = await fetchUserById(res.user_id);

            return {
              ...res,
              name: user
                ? `${user.first_name} ${user.last_name}`
                : `User ${res.user_id}`,
              studentId: user?.student_id || res.user_id,
            };
          })
        );

        setStudentResponses(enhancedResponses);
      } catch (err) {
        console.error("Failed to fetch student responses:", err.message);
      }
    };

    if (assessmentId) fetchStudentResponses();
  }, [assessmentId]);

  return (
    <div className="flex flex-col items-center">
      {studentResponses.length === 0 ? (
        <p>No responses found.</p>
      ) : (
        <LatestAttemptList responses={studentResponses} />
      )}
    </div>
  );
}

