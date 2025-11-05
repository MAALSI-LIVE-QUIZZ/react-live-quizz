import { useState } from "react";
import type { QuizSession } from "@/types/result";
import { validateEmail } from "@/utils/quizUtils";

interface UseQuizSessionReturn {
  session: QuizSession | null;
  quizStarted: boolean;
  email: string;
  hasConsent: boolean;
  emailError: string | null;
  setEmail: (email: string) => void;
  setHasConsent: (consent: boolean) => void;
  setEmailError: (error: string | null) => void;
  startQuiz: () => boolean;
}

/**
 * Hook to manage quiz session (email, consent, start)
 */
export const useQuizSession = (): UseQuizSessionReturn => {
  const [session, setSession] = useState<QuizSession | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [email, setEmail] = useState("");
  const [hasConsent, setHasConsent] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const startQuiz = (): boolean => {
    setEmailError(null);

    if (!email.trim()) {
      setEmailError("L'adresse email est requise");
      return false;
    }

    if (!validateEmail(email)) {
      setEmailError("Format d'email invalide");
      return false;
    }

    if (!hasConsent) {
      setEmailError("Vous devez accepter l'envoi de vos résultats");
      return false;
    }

    setSession({
      email: email.trim(),
      hasConsent: true,
      startedAt: new Date(),
    });
    setQuizStarted(true);
    return true;
  };

  return {
    session,
    quizStarted,
    email,
    hasConsent,
    emailError,
    setEmail,
    setHasConsent,
    setEmailError,
    startQuiz,
  };
};
