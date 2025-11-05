import type { QuizResult } from "@/types/result";

const RESULTS_API_URL = import.meta.env.VITE_RESULTS_API_URL;
const TIMEOUT_MS = 10000; // 10 seconds

export const submitQuizResults = async (
  result: QuizResult
): Promise<void> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${RESULTS_API_URL}/api/quiz-results`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(
        `Échec de l'envoi des résultats: ${response.statusText}`
      );
    }

    // Optionally parse response if the API returns data
    // const data = await response.json();
    // return data;
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
