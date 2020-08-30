import React from 'react'
import { signInWithGoogle } from '../../config/firebase'
import './Login.scss'
import { Link } from 'react-router-dom'

type Props = {}
type State = {
  email: string
  password: string
  loginMethod: string | null
}

class Login extends React.Component<Props, State> {
  state: State
  constructor(props: Props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      loginMethod: null,
    }
  }

  login = () => {
    console.log('login..')
  }

  loginWithGoogle = async (e: any) => {
    e.preventDefault()
    await signInWithGoogle()
    // const router = useHistory()
    // router.push('/')
  }
  loginWithFacebook = async (e: any) => {
    e.preventDefault()
    console.log('login in with facebook..')
  }

  render() {
    return (
      <div className="login auth-page">
        <form action="">
          <h2>Login</h2>
          {this.state.loginMethod === 'email' ? (
            <React.Fragment>
              <input type="text" placeholder="Enter your email" />
              <input type="password" placeholder="Enter your password" />
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
