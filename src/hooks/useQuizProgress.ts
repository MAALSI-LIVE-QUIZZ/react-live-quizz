import { useState } from "react";
import type { Question } from "@/types/question";
import type { UserAnswer } from "@/types/result";

interface UseQuizProgressReturn {
  currentQuestionIndex: number;
  selectedAnswerId: number | null;
  isAnswerValidated: boolean;
  userAnswers: UserAnswer[];
  showResults: boolean;
  progress: number;
  currentQuestion: Question | null;
  selectedAnswer: Question["answers"][0] | undefined;
  selectAnswer: (answerId: number) => void;
  validateAnswer: () => void;
  nextQuestion: () => void;
  getAnswerClassName: (answerId: number, isCorrect: boolean) => string;
}

/**
 * Hook to manage quiz progress (current question, answers, validation)
 */
export const useQuizProgress = (
  questions: Question[]
): UseQuizProgressReturn => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<number | null>(null);
  const [isAnswerValidated, setIsAnswerValidated] = useState(false);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[currentQuestionIndex] || null;
  const progress = questions.length > 0
    ? ((currentQuestionIndex + 1) / questions.length) * 100
    : 0;

  const selectedAnswer = currentQuestion?.answers.find(
    (answer) => answer.id === selectedAnswerId
  );

  const selectAnswer = (answerId: number) => {
    if (!isAnswerValidated) {
      setSelectedAnswerId(answerId);
    }
  };

  const validateAnswer = () => {
    if (selectedAnswerId === null || !currentQuestion) return;

    const answer = currentQuestion.answers.find(
      (a) => a.id === selectedAnswerId
    );

    if (answer) {
      setUserAnswers([
        ...userAnswers,
        {
          questionId: currentQuestion.id,
          answerId: selectedAnswerId,
          isCorrect: answer.isCorrect,
        },
      ]);
      setIsAnswerValidated(true);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswerId(null);
      setIsAnswerValidated(false);
    } else {
      setShowResults(true);
    }
  };

  const getAnswerClassName = (answerId: number, isCorrect: boolean): string => {
    const baseClasses = "rounded-xl border-2 p-4 text-left transition-all";

    if (isAnswerValidated) {
      // After validation
      if (isCorrect) {
        return `${baseClasses} border-green-500 bg-green-50`;
      }
      if (selectedAnswerId === answerId && !isCorrect) {
        return `${baseClasses} border-red-500 bg-red-50`;
      }
      return `${baseClasses} border-gray-200 bg-gray-50 opacity-50`;
    } else {
      // Before validation
      if (selectedAnswerId === answerId) {
        return `${baseClasses} border-indigo-500 bg-indigo-50 shadow-md`;
      }
      return `${baseClasses} border-gray-200 bg-white hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-md cursor-pointer`;
    }
  };

  return {
    currentQuestionIndex,
    selectedAnswerId,
    isAnswerValidated,
    userAnswers,
    showResults,
    progress,
    currentQuestion,
    selectedAnswer,
    selectAnswer,
    validateAnswer,
    nextQuestion,
    getAnswerClassName,
  };
};
