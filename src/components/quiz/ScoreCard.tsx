import { Button } from "@/components/ui/button";
import type { QuizScore } from "@/types/result";
import { SubmissionStatus } from "./SubmissionStatus";

interface ScoreCardProps {
  score: QuizScore;
  isSubmitting: boolean;
  submitSuccess: boolean;
  submitError: string | null;
  sessionEmail?: string;
  onBackToList: () => void;
}

export const ScoreCard = ({
  score,
  isSubmitting,
  submitSuccess,
  submitError,
  sessionEmail,
  onBackToList,
}: ScoreCardProps) => (
  <div className="rounded-2xl bg-white p-8 shadow-lg">
    <div className="text-center">
      <div className="mb-6">
        <div className="mx-auto mb-4 flex h-40 w-40 flex-col items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500">
          <span className="text-5xl font-bold text-white">{score.grade}</span>
          <span className="text-2xl font-semibold text-white/90">/20</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Quiz terminé !</h2>
      </div>
      <p className="mb-4 text-xl text-gray-600">
        Vous avez obtenu {score.correct} bonne
        {score.correct > 1 ? "s" : ""} réponse
        {score.correct > 1 ? "s" : ""} sur {score.total}
      </p>
      <p className="mb-8 text-lg text-gray-500">Score : {score.percentage}%</p>

      <SubmissionStatus
        isSubmitting={isSubmitting}
        submitSuccess={submitSuccess}
        submitError={submitError}
        email={sessionEmail}
      />

      <Button
        onClick={onBackToList}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
      >
        Retour à la liste des quiz
      </Button>
    </div>
  </div>
);
