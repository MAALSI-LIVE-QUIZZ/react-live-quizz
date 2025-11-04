import { BrowserRouter, Routes, Route } from "react-router";
import { QuizList } from "@/components/QuizList";
import { QuizPage } from "@/pages/QuizPage";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<QuizList />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
      </Routes>
    </BrowserRouter>
  );
};
