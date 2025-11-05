interface QuestionExplanationProps {
  explanation: string;
  isCorrect: boolean;
}

export const QuestionExplanation = ({
  explanation,
  isCorrect,
}: QuestionExplanationProps) => (
  <div
    className={`mb-6 rounded-xl p-4 ${
      isCorrect
        ? "bg-green-50 border-2 border-green-200"
        : "bg-blue-50 border-2 border-blue-200"
    }`}
  >
    <h3 className="mb-2 font-semibold text-gray-900">
      {isCorrect ? "Bien joué !" : "Explication"}
    </h3>
    <p className="text-gray-700">{explanation}</p>
  </div>
);
