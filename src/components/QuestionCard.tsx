import React from 'react'
import './QuestionCard.scss'

type Props = {
  questionNumber: number
  totalQuestions: number
  question: string
  answers: string[]
  userAnswer: any
  checkAnswer: Function
}

const QuestionCard: React.FC<Props> = ({
  questionNumber,
  totalQuestions,
  question,
  answers,
  userAnswer,
  checkAnswer,
}) => (
  <div className="question-card">
    <h1>
      Question {questionNumber}/{totalQuestions}
    </h1>
    <p className="question" dangerouslySetInnerHTML={{ __html: question }}></p>
    {answers.map((answer, index) => (
      <button
        className={`answer ${userAnswer && answer === userAnswer.correctAnswer ? 'correct' : ''} ${
          userAnswer && userAnswer.userAnswer === answer && !userAnswer.isCorrect ? 'wrong' : ''
        }`}
        key={index}
        onClick={() => {
          checkAnswer(answer)
        }}
        disabled={userAnswer}
        dangerouslySetInnerHTML={{ __html: answer }}
      ></button>
    ))}
  </div>
)

export default QuestionCard
