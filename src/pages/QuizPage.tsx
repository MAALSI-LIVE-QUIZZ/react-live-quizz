import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { Question } from "@/types/question";

export const QuizPage = () => {
  const { id } = useParams<{ id: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizTitle, setQuizTitle] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch quiz info
        const quizResponse = await fetch(`${import.meta.env.VITE_API_URL}/quizz/${id}`);
        if (!quizResponse.ok) {
          throw new Error("Erreur lors du chargement du quiz");
        }
        const quizData = await quizResponse.json();
        setQuizTitle(quizData.title);

        // Fetch questions with answers
        const questionsResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/questions?quizzId=${id}&_embed=answers`
        );
        if (!questionsResponse.ok) {
          throw new Error("Erreur lors du chargement des questions");
        }
        const questionsData = await questionsResponse.json();
        setQuestions(questionsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
          <p className="text-lg text-gray-600">Chargement du quiz...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="rounded-lg bg-red-50 p-6 text-center">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section with Gradient */}
      <div className="bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 px-8 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            {quizTitle}
          </h1>
          <p className="mt-4 text-lg text-white/90">
            {questions.length} question{questions.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Questions Section */}
      <div className="mx-auto max-w-4xl px-8 py-12">
        {questions.length === 0 ? (
          <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
            <p className="text-gray-600">Aucune question disponible pour ce quiz</p>
          </div>
        ) : (
          <div className="space-y-8">
            {questions.map((question, index) => (
              <div
                key={question.id}
                className="rounded-2xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl"
              >
                <h2 className="mb-6 text-xl font-semibold text-gray-900">
                  <span className="mr-2 text-indigo-600">Question {index + 1}:</span>
                  {question.text}
                </h2>

                {/* Answers */}
                <div className="grid gap-4 md:grid-cols-2">
                  {question.answers.map((answer) => (
                    <button
                      key={answer.id}
                      className="rounded-xl border-2 border-gray-200 bg-white p-4 text-left transition-all hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-md"
                    >
                      <span className="text-gray-800">{answer.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
