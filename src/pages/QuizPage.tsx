import { useParams, useNavigate } from "react-router";
import { useQuizData } from "@/hooks/useQuizData";
import { useQuizSession } from "@/hooks/useQuizSession";
import { useQuizProgress } from "@/hooks/useQuizProgress";
import { useQuizResults } from "@/hooks/useQuizResults";
import { LoadingSpinner } from "@/components/quiz/LoadingSpinner";
import { ErrorDisplay } from "@/components/quiz/ErrorDisplay";
import { GradientHeader } from "@/components/quiz/GradientHeader";
import { QuizEmailForm } from "@/components/quiz/QuizEmailForm";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { QuizResults } from "@/components/quiz/QuizResults";

export const QuizPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Fetch quiz data
  const { questions, quizTitle, loading, error } = useQuizData(id);

  // Manage session (email, consent)
  const {
    session,
    quizStarted,
    email,
    hasConsent,
    emailError,
    setEmail,
    setHasConsent,
    setEmailError,
    startQuiz,
  } = useQuizSession();

  // Manage quiz progress (questions, answers)
  const {
    currentQuestionIndex,
    selectedAnswerId,
    isAnswerValidated,
    userAnswers,
    showResults,
    progress,
    currentQuestion,
    selectedAnswer,
    selectAnswer,
    validateAnswer,
    nextQuestion,
    getAnswerClassName,
  } = useQuizProgress(questions);

  // Manage results (score, submission)
  const { score, isSubmitting, submitError, submitSuccess } = useQuizResults(
    id,
    quizTitle,
    session,
    userAnswers,
    questions,
    showResults
  );

  // Loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Error state
  if (error) {
    return <ErrorDisplay message={error} />;
  }

  // No questions available
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <GradientHeader title={quizTitle} />
        <div className="mx-auto max-w-4xl px-8 py-12">
          <div className="rounded-2xl bg-white p-8 text-center shadow-lg">
            <p className="text-gray-600">
              Aucune question disponible pour ce quiz
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Email form (before quiz starts)
  if (!quizStarted) {
    return (
      <QuizEmailForm
        quizTitle={quizTitle}
        questionsCount={questions.length}
        email={email}
        setEmail={setEmail}
        emailError={emailError}
        setEmailError={setEmailError}
        hasConsent={hasConsent}
        setHasConsent={setHasConsent}
        onStartQuiz={startQuiz}
      />
    );
  }

  // Results screen
  if (showResults) {
    return (
      <QuizResults
        score={score}
        isSubmitting={isSubmitting}
        submitSuccess={submitSuccess}
        submitError={submitError}
        sessionEmail={session?.email}
        userAnswers={userAnswers}
        questions={questions}
        onBackToList={() => navigate("/")}
      />
    );
  }

  // Question screen
  if (!currentQuestion) {
    return <ErrorDisplay message="Question non trouvée" />;
  }

  return (
    <QuestionCard
      quizTitle={quizTitle}
      currentQuestionIndex={currentQuestionIndex}
      totalQuestions={questions.length}
      progress={progress}
      question={currentQuestion}
      selectedAnswerId={selectedAnswerId}
      isAnswerValidated={isAnswerValidated}
      selectedAnswer={selectedAnswer}
      onAnswerSelect={selectAnswer}
      getAnswerClassName={getAnswerClassName}
      onValidateAnswer={validateAnswer}
      onNextQuestion={nextQuestion}
    />
  );
};
