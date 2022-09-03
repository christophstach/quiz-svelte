
import { answers } from './data/answers';
import { questions } from './data/questions';
import type { Answer, Question } from './types';

export function findQuestion(questionId: string): Question {
    return questions.find((question) => question.id === questionId);
}

export function findAnswer(answerId: string): Answer {
    return answers.find((answer) => answer.id === answerId);
}
  