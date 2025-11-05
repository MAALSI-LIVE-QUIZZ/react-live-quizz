import { CheckCircle, XCircle } from "lucide-react";
import type { Question } from "@/types/question";
import type { UserAnswer } from "@/types/result";

interface AnswerReviewProps {
  userAnswer: UserAnswer;
  question: Question;
  index: number;
}

export const AnswerReview = ({
  userAnswer,
  question,
  index,
}: AnswerReviewProps) => {
  const selectedAnswer = question.answers.find(
    (a) => a.id === userAnswer.answerId
  );
  const correctAnswer = question.answers.find((a) => a.isCorrect);

  return (
    <div
      className={`rounded-xl border-2 p-6 ${
        userAnswer.isCorrect
          ? "border-green-300 bg-green-50"
          : "border-red-300 bg-red-50"
      }`}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            {userAnswer.isCorrect ? (
              <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-600" />
            ) : (
              <XCircle className="h-6 w-6 flex-shrink-0 text-red-600" />
            )}
            <span className="font-semibold text-gray-700">
              Question {index + 1}
            </span>
          </div>
          <h4 className="text-lg font-semibold text-gray-900">
            {question.title}
          </h4>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <span className="font-medium text-gray-700">Votre réponse : </span>
          <span
            className={
              userAnswer.isCorrect ? "text-green-700" : "text-red-700"
            }
          >
            {selectedAnswer?.text}
          </span>
        </div>

        {!userAnswer.isCorrect && correctAnswer && (
          <div>
            <span className="font-medium text-gray-700">Bonne réponse : </span>
            <span className="text-green-700 font-medium">
              {correctAnswer.text}
            </span>
          </div>
        )}

        {!userAnswer.isCorrect && question.explanation && (
          <div className="mt-4 rounded-lg bg-blue-50 border border-blue-200 p-4">
            <p className="font-medium text-blue-900 mb-1">Explication :</p>
            <p className="text-blue-800">{question.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};
