import { useState, useEffect, useRef } from "react";
import type { Question } from "@/types/question";
import { fetchQuizById, fetchQuizQuestions } from "@/services/quizApi";

interface UseQuizDataReturn {
  questions: Question[];
  quizTitle: string;
  loading: boolean;
  error: string | null;
}

/**
 * Hook to fetch quiz data (title and questions)
 */
export const useQuizData = (quizId: string | undefined): UseQuizDataReturn => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizTitle, setQuizTitle] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    // Prevent multiple fetches
    if (hasFetched.current) {
      return;
    }

    const abortController = new AbortController();

    const fetchData = async () => {
      if (!quizId) {
        setError("ID du quiz manquant");
        setLoading(false);
        hasFetched.current = true;
        return;
      }

      try {
        // Fetch quiz info
        const quizData = await fetchQuizById(quizId);

        // Check if aborted
        if (abortController.signal.aborted) {
          return;
        }

        setQuizTitle(quizData.title);

        // Fetch questions with answers
        const questionsData = await fetchQuizQuestions(quizId);

        // Check if aborted
        if (abortController.signal.aborted) {
          return;
        }

        setQuestions(questionsData);
        hasFetched.current = true;
      } catch (err) {
        // Don't set error if request was aborted
        if (!abortController.signal.aborted) {
          setError(
            err instanceof Error ? err.message : "Une erreur est survenue"
          );
          hasFetched.current = true;
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function to abort request if component unmounts
    return () => {
      abortController.abort();
    };
  }, [quizId]);

  return { questions, quizTitle, loading, error };
};
