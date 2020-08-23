import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import QuestionCard from '../components/QuestionCard'
import Spinner from '../components/spinner/Spinner'
import { fetchTrivia, Difficulty } from '../api'
import { QuestionState } from '../models/question'
const TOTAL_QUESTIONS = 10

type UserAnswer = {
  question: string
  userAnswer: string
  correctAnswer: string
  isCorrect: boolean
}

const Quiz = () => {
  const router = useHistory()
  const [isBusy, setIsBusy] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [questionNumber, setQuestionNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
  const [userScore, setUserScore] = useState(0)
  const [isGameOver, setIsGameOver] = useState(true)
  const [isGameEnded, setIsGameEnded] = useState(true)

  const startTrvia = async () => {
    setIsBusy(true)
    setUserAnswers([])
    setQuestions([])
    setQuestionNumber(0)
    setUserScore(0)
    const questions = await fetchTrivia(TOTAL_QUESTIONS, Difficulty.EASY)
    setQuestions(questions)
    setIsBusy(false)
    setIsGameOver(false)
    setIsGameEnded(false)
  }

  const checkAnswer = (answer: string) => {
    console.log('checking answer: ', answer)
    const isCorrect = answer === questions[questionNumber].correct_answer
    // console.log('correct: ', isCorrect)
    if (isCorrect) setUserScore(userScore + 1)
    const userAnswer: UserAnswer = {
      question: questions[questionNumber].question,
      userAnswer: answer,
      correctAnswer: questions[questionNumber].correct_answer,
      isCorrect,
    }
    setUserAnswers([...userAnswers, userAnswer])
    if (questionNumber + 1 >= TOTAL_QUESTIONS) setIsGameEnded(true)
  }

  const nextQuestion = () => {
    if (isGameEnded) setIsGameOver(true)
    if (userAnswers && userAnswers[questionNumber]) setQuestionNumber(questionNumber + 1)
    else alert('you should choose a answer before moving to the next question!')
  }

  const endGame = () => {
    router.push('/')
  }
  return (
    <div className="quiz-container">
      {isGameOver && questionNumber !== TOTAL_QUESTIONS ? (
        <div>
          {' '}
          <h1 className="welcome">Welcome</h1>
          <button className="btn" onClick={startTrvia}>
            Start Trivia
          </button>
        </div>
      ) : null}
      {questions.length ? (
        <React.Fragment>
          {isGameOver && questionNumber === TOTAL_QUESTIONS ? (
            <div className="result">
              <h1 className="score">
                Score: {userScore}/{TOTAL_QUESTIONS}
              </h1>
              <div className="btn-group">
                <button className="btn success" onClick={startTrvia}>
                  Try again
                </button>
                <button className="btn danger" onClick={endGame}>
                  End Game
                </button>
              </div>
            </div>
          ) : (
            <React.Fragment>
              <QuestionCard
                questionNumber={questionNumber + 1}
                totalQuestions={TOTAL_QUESTIONS}
                question={questions[questionNumber].question}
                answers={questions[questionNumber].answers}
                userAnswer={userAnswers ? userAnswers[questionNumber] : null}
                checkAnswer={checkAnswer}
              />
              {isGameEnded ? (
                <button className="btn" onClick={nextQuestion}>
                  Calculate my result
                </button>
              ) : (
                <button className="btn" onClick={nextQuestion}>
                  Next Question
                </button>
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      ) : isBusy ? (
        <Spinner />
      ) : null}
    </div>
  )
}

export default Quiz
