import Pages from "@/pages/pages";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Pages.LandingPage />} />
        <Route
          path="/student-assessment"
          element={<Pages.StudentAssessment />}
        />
        <Route path="/admin" element={<Pages.Admin />} />
        <Route
          path="admin/student-breakdown"
          element={<Pages.StudentBreakdown />}
        />
        <Route path="admin/quiz-system" element={<Pages.QuizSystem />} />
        <Route path="admin/quiz-detail" element={<Pages.QuizDetail />} />
      </Routes>
    </>
  );
}

export default App;
