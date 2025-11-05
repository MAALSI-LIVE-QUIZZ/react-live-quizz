import { Button } from "@/components/ui/button";
import type { Question } from "@/types/question";
import { GradientHeader } from "./GradientHeader";
import { AnswerButton } from "./AnswerButton";
import { QuestionExplanation } from "./QuestionExplanation";

interface QuestionCardProps {
  quizTitle: string;
  currentQuestionIndex: number;
  totalQuestions: number;
  progress: number;
  question: Question;
  selectedAnswerId: number | null;
  isAnswerValidated: boolean;
  selectedAnswer?: Question["answers"][0];
  onAnswerSelect: (answerId: number) => void;
  getAnswerClassName: (answerId: number, isCorrect: boolean) => string;
  onValidateAnswer: () => void;
  onNextQuestion: () => void;
}

export const QuestionCard = ({
  quizTitle,
  currentQuestionIndex,
  totalQuestions,
  progress,
  question,
  selectedAnswerId,
  isAnswerValidated,
  selectedAnswer,
  onAnswerSelect,
  getAnswerClassName,
  onValidateAnswer,
  onNextQuestion,
}: QuestionCardProps) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <GradientHeader
      title={quizTitle}
      subtitle={`Question ${currentQuestionIndex + 1} sur ${totalQuestions}`}
      progress={progress}
      showProgress
    />

    <div className="mx-auto max-w-4xl px-8 py-12">
      <div className="rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8">
          <div className="mb-3 text-sm font-medium text-indigo-600">
            Question {currentQuestionIndex + 1}
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">
            {question.title}
          </h2>
        </div>

        {/* Answers */}
        <div className="mb-8 grid gap-4 md:grid-cols-2">
          {question.answers.map((answer) => (
            <AnswerButton
              key={answer.id}
              answerId={answer.id}
              answerText={answer.text}
              isCorrect={answer.isCorrect}
              isSelected={selectedAnswerId === answer.id}
              isValidated={isAnswerValidated}
              onClick={() => onAnswerSelect(answer.id)}
              className={getAnswerClassName(answer.id, answer.isCorrect)}
            />
          ))}
        </div>

        {/* Explanation (shown after validation) */}
        {isAnswerValidated && question.explanation && (
          <QuestionExplanation
            explanation={question.explanation}
            isCorrect={selectedAnswer?.isCorrect || false}
          />
        )}

        {/* Action Buttons */}
        <div className="flex justify-end">
          {isAnswerValidated ? (
            <Button
              onClick={onNextQuestion}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              {currentQuestionIndex < totalQuestions - 1
                ? "Question suivante"
                : "Voir les résultats"}
            </Button>
          ) : (
            <Button
              onClick={onValidateAnswer}
              disabled={selectedAnswerId === null}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50"
            >
              Valider ma réponse
            </Button>
          )}
        </div>
      </div>
    </div>
  </div>
);
