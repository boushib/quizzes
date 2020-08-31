import React from 'react'
import { signInWithGoogle, auth } from '../../config/firebase'
import './Login.scss'
import { Link } from 'react-router-dom'

type LoginProps = {
  history: {
    push: Function
  }
}

type State = {
  email: string
  password: string
  loginMethod: string | null
}

class Login extends React.Component<LoginProps, State> {
  state: State
  constructor(props: LoginProps) {
    super(props)
    this.state = {
      email: '',
      password: '',
      loginMethod: null,
    }
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    this.setState({ [name]: value } as Pick<State, keyof State>)
  }

  login = async (e: any) => {
    e.preventDefault()
    try {
      const { email, password } = this.state
      const res = await auth.signInWithEmailAndPassword(email, password)
      const { user } = res
      if (user && user.uid) this.props.history.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  loginWithGoogle = async (e: any) => {
    e.preventDefault()
    await signInWithGoogle()
    this.props.history.push('/')
  }
  loginWithFacebook = async (e: any) => {
    e.preventDefault()
    console.log('login in with facebook..')
  }

  render() {
    return (
      <div className="login auth-page">
        <form onSubmit={this.login}>
          <h2>Login</h2>
          {this.state.loginMethod === 'email' ? (
            <React.Fragment>
              <input type="email" name="email" placeholder="Enter your email" onChange={this.handleInputChange} />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={this.handleInputChange}
              />
              <button className="btn">Login</button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <button className="btn" onClick={() => this.setState({ loginMethod: 'email' })}>
                Login with Email
              </button>
              <button className="btn google" onClick={this.loginWithGoogle}>
                Login with Google
              </button>
              {/* <button className="btn facebook" onClick={this.loginWithFacebook}>
                Login with Facebook
              </button> */}
            </React.Fragment>
          )}
          <Link to="/signup" className="link">
            Doesn't have an account? <span>Signup</span>
          </Link>
        </form>
      </div>
    )
  }
}

export default Login
