import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import type { Question } from "@/types/question";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

interface UserAnswer {
  questionId: number;
  answerId: number;
  isCorrect: boolean;
}

export const QuizPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizTitle, setQuizTitle] = useState<string>("");

  // Quiz flow state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  const [isAnswerValidated, setIsAnswerValidated] = useState(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);

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

  const handleAnswerSelect = (answerId: number) => {
    if (!isAnswerValidated) {
      setSelectedAnswerId(answerId);
    }
  };

  const handleValidateAnswer = () => {
    if (selectedAnswerId === null) return;

    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = currentQuestion.answers.find(
      (answer) => answer.id === selectedAnswerId
    );

    if (selectedAnswer) {
      setUserAnswers([
        ...userAnswers,
        {
          questionId: currentQuestion.id,
          answerId: selectedAnswerId,
          isCorrect: selectedAnswer.isCorrect,
        },
      ]);
      setIsAnswerValidated(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswerId(null);
      setIsAnswerValidated(false);
    } else {
      setShowResults(true);
    }
  };

  const getAnswerClassName = (answerId: number, isCorrect: boolean) => {
    const baseClasses = "rounded-xl border-2 p-4 text-left transition-all";

    if (!isAnswerValidated) {
      // Before validation
      if (selectedAnswerId === answerId) {
        return `${baseClasses} border-indigo-500 bg-indigo-50 shadow-md`;
      }
      return `${baseClasses} border-gray-200 bg-white hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-md cursor-pointer`;
    } else {
      // After validation
      if (isCorrect) {
        return `${baseClasses} border-green-500 bg-green-50`;
      }
      if (selectedAnswerId === answerId && !isCorrect) {
        return `${baseClasses} border-red-500 bg-red-50`;
      }
      return `${baseClasses} border-gray-200 bg-gray-50 opacity-50`;
    }
  };

  const calculateScore = () => {
    const correctAnswers = userAnswers.filter((answer) => answer.isCorrect).length;
    return {
      correct: correctAnswers,
      total: questions.length,
      percentage: Math.round((correctAnswers / questions.length) * 100),
      grade: ((correctAnswers / questions.length) * 20).toFixed(1),
    };
  };

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

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 px-8 py-16">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              {quizTitle}
            </h1>
          </div>
        </div>
        <div className="mx-auto max-w-4xl px-8 py-12">
          <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
            <p className="text-gray-600">Aucune question disponible pour ce quiz</p>
          </div>
        </div>
      </div>
    );
  }

  // Results screen
  if (showResults) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 px-8 py-16">
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl font-bold text-white md:text-5xl">
              Résultats
            </h1>
          </div>
        </div>
        <div className="mx-auto max-w-4xl px-8 py-12 space-y-8">
          {/* Score Summary Card */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="text-center">
              <div className="mb-6">
                <div className="mx-auto mb-4 flex h-40 w-40 flex-col items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500">
                  <span className="text-5xl font-bold text-white">
                    {score.grade}
                  </span>
                  <span className="text-2xl font-semibold text-white/90">
                    /20
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  Quiz terminé !
                </h2>
              </div>
              <p className="mb-4 text-xl text-gray-600">
                Vous avez obtenu {score.correct} bonne{score.correct > 1 ? "s" : ""} réponse{score.correct > 1 ? "s" : ""} sur {score.total}
              </p>
              <p className="mb-8 text-lg text-gray-500">
                Score : {score.percentage}%
              </p>
              <Button
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                Retour à la liste des quiz
              </Button>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="rounded-2xl bg-white p-8 shadow-lg">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">
              Récapitulatif des réponses
            </h3>
            <div className="space-y-6">
              {userAnswers.map((userAnswer, index) => {
                const question = questions.find(q => q.id === userAnswer.questionId);
                if (!question) return null;

                const selectedAnswer = question.answers.find(a => a.id === userAnswer.answerId);
                const correctAnswer = question.answers.find(a => a.isCorrect);

                return (
                  <div
                    key={question.id}
                    className={`rounded-xl border-2 p-6 ${
                      userAnswer.isCorrect
                        ? "border-green-300 bg-green-50"
                        : "border-red-300 bg-red-50"
                    }`}
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          {userAnswer.isCorrect ? (
                            <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-600" />
                          ) : (
                            <XCircle className="h-6 w-6 flex-shrink-0 text-red-600" />
                          )}
                          <span className="font-semibold text-gray-700">
                            Question {index + 1}
                          </span>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {question.title}
                        </h4>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-gray-700">Votre réponse : </span>
                        <span className={userAnswer.isCorrect ? "text-green-700" : "text-red-700"}>
                          {selectedAnswer?.text}
                        </span>
                      </div>

                      {!userAnswer.isCorrect && correctAnswer && (
                        <div>
                          <span className="font-medium text-gray-700">Bonne réponse : </span>
                          <span className="text-green-700 font-medium">
                            {correctAnswer.text}
                          </span>
                        </div>
                      )}

                      {(!userAnswer.isCorrect && question.explanation) && (
                        <div className="mt-4 rounded-lg bg-blue-50 border border-blue-200 p-4">
                          <p className="font-medium text-blue-900 mb-1">Explication :</p>
                          <p className="text-blue-800">{question.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const selectedAnswer = currentQuestion.answers.find(
    (answer) => answer.id === selectedAnswerId
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section with Gradient */}
      <div className="bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 px-8 py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            {quizTitle}
          </h1>
          <p className="mt-4 text-lg text-white/90">
            Question {currentQuestionIndex + 1} sur {questions.length}
          </p>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="h-3 w-full overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full bg-white transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Question Section */}
      <div className="mx-auto max-w-4xl px-8 py-12">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="mb-8">
            <div className="mb-3 text-sm font-medium text-indigo-600">
              Question {currentQuestionIndex + 1}
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {currentQuestion.title}
            </h2>
          </div>

          {/* Answers */}
          <div className="mb-8 grid gap-4 md:grid-cols-2">
            {currentQuestion.answers.map((answer) => (
              <button
                type="button"
                key={answer.id}
                onClick={() => handleAnswerSelect(answer.id)}
                disabled={isAnswerValidated}
                className={getAnswerClassName(answer.id, answer.isCorrect)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-800">{answer.text}</span>
                  {isAnswerValidated && answer.isCorrect && (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  )}
                  {isAnswerValidated && selectedAnswerId === answer.id && !answer.isCorrect && (
                    <XCircle className="h-6 w-6 text-red-600" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Explanation (shown after validation) */}
          {isAnswerValidated && currentQuestion.explanation && (
            <div className={`mb-6 rounded-xl p-4 ${selectedAnswer?.isCorrect ? "bg-green-50 border-2 border-green-200" : "bg-blue-50 border-2 border-blue-200"}`}>
              <h3 className="mb-2 font-semibold text-gray-900">
                {selectedAnswer?.isCorrect ? "Bien joué !" : "Explication"}
              </h3>
              <p className="text-gray-700">{currentQuestion.explanation}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end">
            {!isAnswerValidated ? (
              <Button
                onClick={handleValidateAnswer}
                disabled={selectedAnswerId === null}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50"
              >
                Valider ma réponse
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                {currentQuestionIndex < questions.length - 1
                  ? "Question suivante"
                  : "Voir les résultats"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
