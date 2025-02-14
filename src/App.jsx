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
        <Route path="/student-breakdown" element={<Pages.StudentBreakdown />} />
      </Routes>
    </>
  );
}

export default App;
