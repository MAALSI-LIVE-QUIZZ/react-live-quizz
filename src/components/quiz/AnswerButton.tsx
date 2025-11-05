import { CheckCircle, XCircle } from "lucide-react";

interface AnswerButtonProps {
  answerId: number;
  answerText: string;
  isCorrect: boolean;
  isSelected: boolean;
  isValidated: boolean;
  onClick: () => void;
  className: string;
}

export const AnswerButton = ({
  answerText,
  isCorrect,
  isSelected,
  isValidated,
  onClick,
  className,
}: AnswerButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={isValidated}
    className={className}
  >
    <div className="flex items-center justify-between">
      <span className="text-gray-800">{answerText}</span>
      {isValidated && isCorrect && (
        <CheckCircle className="h-6 w-6 text-green-600" />
      )}
      {isValidated && isSelected && !isCorrect && (
        <XCircle className="h-6 w-6 text-red-600" />
      )}
    </div>
  </button>
);
