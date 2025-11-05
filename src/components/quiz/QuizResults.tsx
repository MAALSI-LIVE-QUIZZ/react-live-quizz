import type { Question } from "@/types/question";
import type { QuizScore, UserAnswer } from "@/types/result";
import { GradientHeader } from "./GradientHeader";
import { ScoreCard } from "./ScoreCard";
import { AnswerReview } from "./AnswerReview";

interface QuizResultsProps {
  score: QuizScore;
  isSubmitting: boolean;
  submitSuccess: boolean;
  submitError: string | null;
  sessionEmail?: string;
  userAnswers: UserAnswer[];
  questions: Question[];
  onBackToList: () => void;
}

export const QuizResults = ({
  score,
  isSubmitting,
  submitSuccess,
  submitError,
  sessionEmail,
  userAnswers,
  questions,
  onBackToList,
}: QuizResultsProps) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <GradientHeader title="Résultats" />

    <div className="mx-auto max-w-4xl px-8 py-12 space-y-8">
      <ScoreCard
        score={score}
        isSubmitting={isSubmitting}
        submitSuccess={submitSuccess}
        submitError={submitError}
        sessionEmail={sessionEmail}
        onBackToList={onBackToList}
      />

      {/* Detailed Results */}
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <h3 className="mb-6 text-2xl font-bold text-gray-900">
          Récapitulatif des réponses
        </h3>
        <div className="space-y-6">
          {userAnswers.map((userAnswer, index) => {
            const question = questions.find(
              (q) => q.id === userAnswer.questionId
            );
            if (!question) return null;

            return (
              <AnswerReview
                key={question.id}
                userAnswer={userAnswer}
                question={question}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  </div>
);
