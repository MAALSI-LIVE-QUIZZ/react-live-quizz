import type { UserAnswer, QuizScore } from "@/types/result";

/**
 * Validates an email address format
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Calculates the quiz score based on user answers
 */
export const calculateScore = (
  userAnswers: UserAnswer[],
  totalQuestions: number
): QuizScore => {
  const correctAnswers = userAnswers.filter(
    (answer) => answer.isCorrect
  ).length;

  return {
    correct: correctAnswers,
    total: totalQuestions,
    percentage: Math.round((correctAnswers / totalQuestions) * 100),
    grade: ((correctAnswers / totalQuestions) * 20).toFixed(1),
  };
};

/**
 * Calculates session duration in seconds
 */
export const calculateSessionDuration = (startedAt: Date): number => {
  return Math.floor((Date.now() - startedAt.getTime()) / 1000);
};
