import React from 'react'
import { useHistory } from 'react-router-dom'

import './Home.scss'

const Home = () => {
  const router = useHistory()
  const startTrivia = () => router.push('/quiz')
  return (
    <div className="home">
      <h1 className="welcome">welcome</h1>
      <button className="btn" onClick={startTrivia}>
        Start Trivia
      </button>
    </div>
  )
}

export default Home
