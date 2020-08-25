import React from 'react'
import './App.scss'
import BackgroundImage from './assets/images/background.jpg'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './views/Home'
import Quiz from './views/Quiz'
import Navbar from './components/navbar/Navbar'
import Signup from './views/signup/Signup'
import Login from './views/login/Login'

const App = () => {
  return (
    <Router>
      <div className="app" style={{ backgroundImage: `url('${BackgroundImage}')` }}>
        <Navbar />
        <Switch>
          <Route path="/quiz" component={Quiz} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
