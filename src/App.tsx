import React from 'react'
import './App.scss'
import BackgroundImage from './assets/images/background.jpg'
import { BrowserRouter as Router } from 'react-router-dom'
import Quiz from './views/Quiz'

const App = () => {
  return (
    <Router>
      <div className="app" style={{ backgroundImage: `url('${BackgroundImage}')` }}>
        <Quiz />
      </div>
    </Router>
  )
}

export default App
