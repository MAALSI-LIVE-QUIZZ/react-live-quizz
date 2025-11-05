import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { GradientHeader } from "./GradientHeader";

interface QuizEmailFormProps {
  quizTitle: string;
  questionsCount: number;
  email: string;
  setEmail: (email: string) => void;
  emailError: string | null;
  setEmailError: (error: string | null) => void;
  hasConsent: boolean;
  setHasConsent: (consent: boolean) => void;
  onStartQuiz: () => void;
}

export const QuizEmailForm = ({
  quizTitle,
  questionsCount,
  email,
  setEmail,
  emailError,
  setEmailError,
  hasConsent,
  setHasConsent,
  onStartQuiz,
}: QuizEmailFormProps) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <GradientHeader
      title={quizTitle}
      subtitle={`${questionsCount} question${questionsCount > 1 ? "s" : ""}`}
    />

    <div className="mx-auto max-w-2xl px-8 py-12">
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-6 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
            <Mail className="h-8 w-8 text-indigo-600" />
          </div>
        </div>

        <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">
          Avant de commencer
        </h2>
        <p className="mb-8 text-center text-gray-600">
          Renseignez votre email pour recevoir vos résultats
        </p>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Adresse email</Label>
            <Input
              id="email"
              type="email"
              placeholder="votre.email@exemple.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError(null);
              }}
              className={emailError ? "border-red-500" : ""}
            />
            {emailError && (
              <p className="text-sm text-red-600">{emailError}</p>
            )}
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="consent"
              checked={hasConsent}
              onCheckedChange={(checked) => setHasConsent(checked as boolean)}
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="consent"
                className="text-sm font-normal leading-relaxed text-gray-700 cursor-pointer"
              >
                J'accepte que mes résultats me soient envoyés par email et
                soient enregistrés pour le suivi de ma progression
              </Label>
            </div>
          </div>

          <Button
            onClick={onStartQuiz}
            disabled={!email || !hasConsent}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Démarrer le quiz
          </Button>
        </div>
      </div>
    </div>
  </div>
);
