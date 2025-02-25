import Pages from "@/pages/pages";
import { Route, Routes } from "react-router-dom";
import Header from "@/layouts/Header";
import AuthGuard from "@/components/auth/AuthGuard";

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
        <Route path="admin">
          <Route path="scores" element={<AuthGuard><Pages.Admin /></AuthGuard>} />
          <Route
            path="student-breakdown"
            element={<AuthGuard><Pages.StudentBreakdown /></AuthGuard>}
          />
          <Route path="quiz-system" element={<AuthGuard><Pages.QuizSystem /></AuthGuard>} />
          <Route path="quiz-detail/:quizId" element={<AuthGuard><Pages.QuizDetail /></AuthGuard>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
