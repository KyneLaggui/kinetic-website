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
        <Route path="admin">
          <Route path="scores" element={<AuthGuard><Pages.Admin /></AuthGuard>} />
          <Route
            path="student-breakdown/:assessmentId/:userId"
            element={<AuthGuard><Pages.StudentBreakdown /></AuthGuard>}
          />
          <Route path="quiz-system" element={<AuthGuard><Pages.QuizSystem /></AuthGuard>} />
          <Route path="quiz-detail/:assessmentId" element={<AuthGuard><Pages.QuizDetail /></AuthGuard>} />
          <Route path="quiz-scores/:assessmentId" element={<AuthGuard><Pages.QuizScores /></AuthGuard>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
