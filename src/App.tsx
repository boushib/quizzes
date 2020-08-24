import React from 'react'
import './App.scss'
import BackgroundImage from './assets/images/background.jpg'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './views/Home'
import Quiz from './views/Quiz'

const App = () => {
  return (
    <Router>
      <div className="app" style={{ backgroundImage: `url('${BackgroundImage}')` }}>
        <Switch>
          <Route path="/quiz" component={Quiz} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
