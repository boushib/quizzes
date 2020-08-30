import React from 'react'
import './App.scss'
import BackgroundImage from './assets/images/background.jpg'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { auth } from './config/firebase'
import Home from './views/Home'
import Quiz from './views/Quiz'
import Navbar from './components/navbar/Navbar'
import Signup from './views/signup/Signup'
import Login from './views/login/Login'

type GoogleUser = {
  uid: string
  email: string
  photoURL: string
  displayName: string
}

class App extends React.Component {
  state = {
    loggedInUser: {},
  }

  unsubscribeFromAuth: any = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user: any) => {
      const { uid, email, photoURL, displayName } = user
      this.setState({ loggedInUser: { uid, email, photoURL, displayName } })
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <Router>
        <div className="app" style={{ backgroundImage: `url('${BackgroundImage}')` }}>
          <Navbar user={this.state.loggedInUser} />
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
}

export default App
