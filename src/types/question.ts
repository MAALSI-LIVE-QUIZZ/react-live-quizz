export interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
  questionId: number;
}

export interface Question {
  id: number;
  title: string;
  quizzId: number;
  answers: Answer[];
  explanation?: string;
}
