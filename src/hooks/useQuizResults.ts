import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import type { Question } from "@/types/question";
import type {
  QuizSession,
  UserAnswer,
  QuizResult,
  QuizAnswerDetail,
  QuizScore,
} from "@/types/result";
import { calculateScore, calculateSessionDuration } from "@/utils/quizUtils";
import { submitQuizResults } from "@/services/resultsApi";

interface UseQuizResultsReturn {
  score: QuizScore;
  isSubmitting: boolean;
  submitError: string | null;
  submitSuccess: boolean;
  submitResults: () => Promise<void>;
}

/**
 * Hook to manage quiz results (score calculation and submission)
 */
export const useQuizResults = (
  quizId: string | undefined,
  quizTitle: string,
  session: QuizSession | null,
  userAnswers: UserAnswer[],
  questions: Question[],
  showResults: boolean
): UseQuizResultsReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const hasAttemptedSubmit = useRef(false);

  // Memoize score to avoid recalculations
  const score = useMemo(
    () => calculateScore(userAnswers, questions.length),
    [userAnswers, questions.length]
  );

  const submitResults = useCallback(async () => {
    if (!session || !quizId || hasAttemptedSubmit.current) return;

    hasAttemptedSubmit.current = true;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const sessionDuration = calculateSessionDuration(session.startedAt);

      const answersDetails: QuizAnswerDetail[] = userAnswers.map(
        (userAnswer) => {
          const question = questions.find(
            (q) => q.id === userAnswer.questionId
          );
          const answer = question?.answers.find(
            (a) => a.id === userAnswer.answerId
          );

          return {
            questionId: userAnswer.questionId,
            questionTitle: question?.title || "",
            answerId: userAnswer.answerId,
            answerText: answer?.text || "",
            isCorrect: userAnswer.isCorrect,
          };
        }
      );

      const result: QuizResult = {
        email: session.email,
        quizId: Number(quizId),
        quizTitle: quizTitle,
        score: score,
        answers: answersDetails,
        completedAt: new Date().toISOString(),
        sessionDuration: sessionDuration,
      };

      await submitQuizResults(result);
      setSubmitSuccess(true);
    } catch (err) {
      console.error("Error submitting results:", err);
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Erreur lors de l'envoi des résultats"
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [session, quizId, quizTitle, userAnswers, questions, score]);

  // Auto-submit when results are shown (only once)
  useEffect(() => {
    if (showResults && !submitSuccess && !isSubmitting && !hasAttemptedSubmit.current) {
      submitResults();
    }
  }, [showResults, submitSuccess, isSubmitting, submitResults]);

  return {
    score,
    isSubmitting,
    submitError,
    submitSuccess,
    submitResults,
  };
};
