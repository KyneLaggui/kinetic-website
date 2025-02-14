import Pages from "@/pages/pages";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Pages.StudentAssessment />} />
        <Route path="/admin" element={<Pages.Admin />} />
      </Routes>
    </>
  );
}

export default App;
