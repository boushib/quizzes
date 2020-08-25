import React from 'react'
import './Signup.scss'

type State = {
  username: string
  email: string
  password: string
  passwordConfirmation: string
}

type Props = {}

class Signup extends React.PureComponent<Props, State> {
  state: State
  constructor(props: Props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    }
  }

  signup = () => {
    console.log('login..')
  }

  render() {
    return (
      <div className="signup auth-page">
        <form action="">
          <h2>Signup</h2>
          <input type="text" placeholder="Choose a username" />
          <input type="email" placeholder="Enter your email" />
          <input type="password" placeholder="Choose a password" />
          <input type="password" placeholder="Confirm your password" />
          <button className="btn">Signup</button>
        </form>
      </div>
    )
  }
}

export default Signup
