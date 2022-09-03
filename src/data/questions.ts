import { QuestionType, type Question } from '../types';


export const questions: Question[] = [
    {
        id: '1',
        icon: 'https://andreasjansen.com/wp-content/uploads/2022/03/House.png',
        text: 'Frage 1 asdjkhakshd haksdhk jahskjdhkajsh dkjhasjkdh aksjhdjkahsjkdh akjsh djkhsd',
        answerIds: ['1-1', '1-2', '1-3'],
        selectedAnswerId: null,
        type: QuestionType.Simple
    },
    {
        id: '1.1',
        text: 'Frage 1.1',
        answerIds: ['1.1-1'],
        selectedAnswerId: null,
        type: QuestionType.Simple
    },
    {
        id: '1.1.1',
        text: 'Frage 1.1.1',
        answerIds: ['1.1.1-1'],
        selectedAnswerId: null,
        type: QuestionType.Simple
    },
    {
        id: '2',
        text: 'Frage 2',
        answerIds: ['2-1', '2-2'],
        selectedAnswerId: null,
        type: QuestionType.Simple
    },
    {
        id: '3',
        text: 'Frage 3 (Multiple Choice)',
        answerIds: ['3-1', '3-2', '3-3', '3-4'],
        selectedAnswerIds: [],
        followUpQuestionId: '4',
        type: QuestionType.MultipleChoice,
        minAnswers: 2,
        maxAnswers: 3
    },
    {
        id: '4',
        text: 'Frage 4 (After Multiple Choice)',
        answerIds: ['4-1', '4-2'],
        selectedAnswerId: null,
        type: QuestionType.Simple,

    },
]

export const questions2: Question[] = [
    {
        id: '1',
        text: 'Auf welchen Bereich möchtest du dich fokusieren?',
        answerIds: ['1', '2', '3', '4'],
        selectedAnswerId: null,
        type: QuestionType.Simple
    },
    {
        id: '2',
        text: 'Welches dieser Ziele steht bei dir im Fokus?',
        answerIds: ['5', '6', '7', '8'],
        selectedAnswerId: null,
        type: QuestionType.Simple
    },
    {
        id: '3',
        text: 'Hast du einen Notfallgroschen von mehr als 3 Monatsgehältern?',
        answerIds: [],
        selectedAnswerId: null,
        type: QuestionType.Simple
    },
    {
        id: '4',
        text: 'Was sind deine lieblings Assetklassen?',
        answerIds: ['9', '10', '11'],
        selectedAnswerId: null,
        followUpQuestionId: null,
        type: QuestionType.MultipleChoice,
    }
];