import React from 'react'
import { Link } from 'react-router-dom'

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

interface IState {
  isBusy: boolean
  questions: QuestionState[]
  currentQuestion: number
  userAnswers: UserAnswer[]
  userScore: number
  isGameOver: boolean
  isGameEnded: boolean
}

interface IProps {}

class Quiz extends React.PureComponent<IProps, IState> {
  state: IState

  constructor(props: IProps) {
    super(props)
    this.state = {
      isBusy: true,
      questions: [],
      currentQuestion: 0,
      userAnswers: [],
      userScore: 0,
      isGameOver: true,
      isGameEnded: true,
    }
  }

  componentDidMount() {
    this.startTrvia()
  }

  startTrvia = async () => {
    this.setState({ isBusy: true, userAnswers: [], questions: [], currentQuestion: 0, userScore: 0 })
    const questions = await fetchTrivia(TOTAL_QUESTIONS, Difficulty.EASY)
    this.setState({ isBusy: false, questions, isGameOver: false, isGameEnded: false })
  }

  checkAnswer = (answer: string) => {
    const { questions, currentQuestion, userScore, userAnswers } = this.state
    const isCorrect = answer === questions[currentQuestion].correct_answer
    if (isCorrect) this.setState({ userScore: userScore + 1 })
    const userAnswer: UserAnswer = {
      question: questions[currentQuestion].question,
      userAnswer: answer,
      correctAnswer: questions[currentQuestion].correct_answer,
      isCorrect,
    }
    this.setState({ userAnswers: [...userAnswers, userAnswer] })
    if (currentQuestion + 1 >= TOTAL_QUESTIONS) this.setState({ isGameOver: true })
  }

  nextQuestion = () => {
    console.log('next question...')
    const { isGameEnded, userAnswers, currentQuestion } = this.state
    if (isGameEnded) this.setState({ isGameEnded: true })
    if (userAnswers && userAnswers[currentQuestion]) this.setState({ currentQuestion: currentQuestion + 1 })
    else alert('you should choose a answer before moving to the next question!')
  }

  render() {
    const { isBusy, questions, currentQuestion, userAnswers, userScore, isGameOver, isGameEnded } = this.state
    return (
      <div className="quiz-container">
        {questions.length ? (
          <React.Fragment>
            {isGameOver && currentQuestion === TOTAL_QUESTIONS ? (
              <div className="result">
                <h1 className="score">
                  Score: {userScore}/{TOTAL_QUESTIONS}
                </h1>
                <div className="btn-group">
                  <button className="btn" onClick={this.startTrvia}>
                    Try again
                  </button>
                  <Link to="/">
                    <button className="btn danger">End Game</button>
                  </Link>
                </div>
              </div>
            ) : (
              <React.Fragment>
                <QuestionCard
                  questionNumber={currentQuestion + 1}
                  totalQuestions={TOTAL_QUESTIONS}
                  question={questions[currentQuestion].question}
                  answers={questions[currentQuestion].answers}
                  userAnswer={userAnswers ? userAnswers[currentQuestion] : null}
                  checkAnswer={this.checkAnswer}
                  nextQuestion={this.nextQuestion}
                  isGameEnded={isGameEnded}
                />
              </React.Fragment>
            )}
          </React.Fragment>
        ) : isBusy ? (
          <Spinner message="Loading your quiz.." />
        ) : null}
      </div>
    )
  }
}

export default Quiz
