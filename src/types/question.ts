export interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
  questionId: number;
}

export interface Question {
  id: number;
  text: string;
  quizzId: number;
  answers: Answer[];
}
