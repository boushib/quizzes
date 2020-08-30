import React from 'react'
import './Login.scss'
import { Link } from 'react-router-dom'

type Props = {}
type State = {
  email: string
  password: string
}

class Login extends React.Component<Props, State> {
  state: State
  constructor(props: Props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  login = () => {
    console.log('login..')
  }

  render() {
    return (
      <div className="login auth-page">
        <form action="">
          <h2>Login</h2>
          <input type="text" placeholder="Enter your email" />
          <input type="password" placeholder="Enter your password" />
          <button className="btn">Login</button>
          <Link to="/signup" className="link">
            Doesn't have an account? <span>Signup</span>
          </Link>
        </form>
      </div>
    )
  }
}

export default Login
