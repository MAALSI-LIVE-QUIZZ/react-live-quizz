import type { Quiz } from "@/types/quiz";
import type { Question } from "@/types/question";

const QUIZ_API_URL = import.meta.env.VITE_QUIZ_API_URL;
const TIMEOUT_MS = 10000; // 10 seconds

export const fetchQuizById = async (id: string): Promise<Quiz> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${QUIZ_API_URL}/quizz/${id}`, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error("Erreur lors du chargement du quiz");
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error("La requête a expiré. Veuillez réessayer.");
      }
      throw error;
    }

    throw new Error("Une erreur inconnue est survenue");
  }
};

export const fetchQuizQuestions = async (quizId: string): Promise<Question[]> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(
      `${QUIZ_API_URL}/questions?quizzId=${quizId}&_embed=answers`,
      {
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error("Erreur lors du chargement des questions");
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error("La requête a expiré. Veuillez réessayer.");
      }
      throw error;
    }

    throw new Error("Une erreur inconnue est survenue");
  }
};

export const fetchAllQuizzes = async (): Promise<Quiz[]> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${QUIZ_API_URL}/quizz`, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error("Erreur lors du chargement des quiz");
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error("La requête a expiré. Veuillez réessayer.");
      }
      throw error;
    }

    throw new Error("Une erreur inconnue est survenue");
  }
};
