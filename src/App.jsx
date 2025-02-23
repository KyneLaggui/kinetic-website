import Pages from "@/pages/pages";
import { Route, Routes } from "react-router-dom";
import Header from "@/layouts/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Pages.LandingPage />} />
        <Route
          path="/student-assessment"
          element={<Pages.StudentAssessment />}
        />
        <Route path="/admin/scores" element={<Pages.Admin />} />
        <Route
          path="admin/student-breakdown"
          element={<Pages.StudentBreakdown />}
        />
        <Route path="admin/quiz-system" element={<Pages.QuizSystem />} />
        <Route path="admin/quiz-detail/:quizId" element={<Pages.QuizDetail />} />
      </Routes>
    </>
  );
}

export default App;
