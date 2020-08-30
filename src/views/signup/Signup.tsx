import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import './Signup.scss'

import { signup } from '../../store/actions/authActions'

import { signInWithGoogle } from '../../config/firebase'

type State = {
  username: string
  email: string
  password: string
  passwordConfirmation: string
  signupMethod: string | null
}

type Props = {
  signup: Function
  history: {
    push: Function
  }
}

class Signup extends React.PureComponent<Props, State> {
  state: State
  constructor(props: Props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      signupMethod: null,
    }
  }

  handleInputChange = (e: any) => {
    const input = e.currentTarget
    const input_name = input.getAttribute('name')
    let state: any = {}
    state[input_name] = input.value
    this.setState(state)
  }

  signup = async (e: any) => {
    e.preventDefault()
    const { username, email, password } = this.state
    this.props.signup({ username, email, password })
  }
  signupWithGoogle = async (e: any) => {
    e.preventDefault()
    await signInWithGoogle()
    this.props.history.push('/')
  }
  signupWithFacebook = async (e: any) => {
    e.preventDefault()
    console.log('signing up with facebook..')
  }

  render() {
    return (
      <div className="signup auth-page">
        <form onSubmit={this.signup}>
          <h2>Signup</h2>
          {this.state.signupMethod === 'email' ? (
            <React.Fragment>
              <input type="text" name="username" placeholder="Choose a username" onChange={this.handleInputChange} />
              <input type="email" name="email" placeholder="Enter your email" onChange={this.handleInputChange} />
              <input
                type="password"
                name="password"
                placeholder="Choose a password"
                onChange={this.handleInputChange}
              />
              <input
                type="password"
                name="passwordConfirmation"
                placeholder="Confirm your password"
                onChange={this.handleInputChange}
              />
              <button className="btn">Signup</button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <button className="btn" onClick={() => this.setState({ signupMethod: 'email' })}>
                Signup with Email
              </button>
              <button className="btn google" onClick={this.signupWithGoogle}>
                Signup with Google
              </button>
              {/* <button className="btn facebook" onClick={this.signupWithFacebook}>
                Signup with Facebook
              </button> */}
            </React.Fragment>
          )}
          <Link to="/login" className="link">
            Already have an account? <span>Login</span>
          </Link>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch: Function) => {
  return { signup: (user_data: object) => dispatch(signup(user_data)) }
}

export default connect(null, mapDispatchToProps)(Signup)
