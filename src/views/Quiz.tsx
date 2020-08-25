import React from 'react'
import { Link } from 'react-router-dom'

import QuestionCard from '../components/QuestionCard'
import Spinner from '../components/spinner/Spinner'
import Toast from '../components/toast/Toast'
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
  toast: {
    type: string
    message: string
    isDisplayed: boolean
  }
}

interface IProps {}

let toastTimeout: any

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
      toast: {
        type: 'error',
        message: '',
        isDisplayed: false,
      },
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
    const { isGameEnded, userAnswers, currentQuestion } = this.state
    if (isGameEnded) this.setState({ isGameEnded: true })
    if (userAnswers && userAnswers[currentQuestion]) this.setState({ currentQuestion: currentQuestion + 1 })
    else this.displayToast('Please choose a answer!', 'error')
  }

  displayToast = (message: string, type: string) => {
    this.setState({ toast: { message, type, isDisplayed: true } })
    clearTimeout(toastTimeout)
    toastTimeout = setTimeout(() => {
      this.setState({ toast: { message: '', type: '', isDisplayed: false } })
    }, 3000)
  }

  render() {
    const { isBusy, questions, currentQuestion, userAnswers, userScore, isGameOver, isGameEnded, toast } = this.state
    return (
      <div className="quiz-container">
        {toast.isDisplayed ? <Toast type={toast.type} message={toast.message} /> : null}
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
