
import { writable } from 'svelte/store';
import { questions } from './data/questions';
import type { Question } from './types';

export const questionsStore = writable<Question[]>(questions);
export const currentQuizDepthStore = writable<number>(0);
