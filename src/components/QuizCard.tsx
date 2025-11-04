import type { Quiz } from "@/types/quiz";

interface QuizCardProps {
  quiz: Quiz;
  onClick?: () => void;
}

export const QuizCard = ({ quiz, onClick }: QuizCardProps) => {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      {/* Gradient header */}
      <div className="h-32 w-full bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500" />

      {/* Content */}
      <div className="p-6">
        <h3 className="mb-2 text-xl font-semibold text-gray-900 transition-colors group-hover:text-indigo-600">
          {quiz.title}
        </h3>
        <p className="text-sm text-gray-600">
          {quiz.description}
        </p>
      </div>
    </div>
  );
};
