export enum QuestionType {
    Simple = 'SIMPLE',
    MultipleChoice = 'MULTIPLE_CHOICE'
}

export interface Question {
    id: string
    icon?: string | null
    text: string
    answerIds: string[]
    selectedAnswerId?: string | null
    selectedAnswerIds?: string[]
    type: QuestionType,
    followUpQuestionId?: string | null
    followUpQuestion?: Question | null
    minAnswers?: number | null
    maxAnswers?: number | null
}

export interface ReportQuestion extends Question {
    answers: ReportAnswer[]
}


export interface Answer {
    id: string
    text: string
    followUpQuestionId: string
}

export interface ReportAnswer {
    id: string
    text: string
    followUpQuestionId: string
    selected: boolean
}