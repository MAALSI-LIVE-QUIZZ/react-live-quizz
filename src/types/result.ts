export interface QuizScore {
  correct: number;
  total: number;
  percentage: number;
  grade: string;
}

export interface QuizAnswerDetail {
  questionId: number;
  questionTitle: string;
  answerId: number;
  answerText: string;
  isCorrect: boolean;
}

export interface QuizResult {
  email: string;
  quizId: number;
  quizTitle: string;
  score: QuizScore;
  answers: QuizAnswerDetail[];
  completedAt: string;
  sessionDuration: number; // in seconds
}

export interface QuizSession {
  email: string;
  hasConsent: boolean;
  startedAt: Date;
}
