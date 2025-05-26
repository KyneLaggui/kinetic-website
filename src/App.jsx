import Pages from "@/pages/Pages";
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
          path="/student-assessment/:userId"
          element={<Pages.StudentAssessment />}
        />

        <Route
          path="student-breakdown/:assessmentId/:userId"
          element={<Pages.StudentBreakdown />}
        />
        <Route path="scores" element={<AuthGuard><Pages.Admin /></AuthGuard>} />

        <Route path="admin">
          <Route path="quiz-scores/:assessmentId" element={<AuthGuard><Pages.QuizScores /></AuthGuard>} />
          <Route path="quiz-system" element={<AuthGuard><Pages.QuizSystem /></AuthGuard>} />
          <Route path="quiz-detail/:assessmentId" element={<AuthGuard><Pages.QuizDetail /></AuthGuard>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
