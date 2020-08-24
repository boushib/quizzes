import axios from './axios'
import { Question } from '../models/question'
import { shuffleArr } from '../utils/index'
export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

// const API_URI = 'https://opentdb.com/api.php?amount=10&type=multiple'
export const fetchTrivia = async (questionsCount: number, difficulty: Difficulty) => {
  try {
    const { data } = await axios.get(`?amount=${questionsCount}&type=multiple&difficulty=${difficulty}`)
    return data.results.map((q: Question) => ({
      ...q,
      answers: shuffleArr([...q.incorrect_answers, q.correct_answer]),
    }))
  } catch (err) {
    console.log(err)
  }
}
