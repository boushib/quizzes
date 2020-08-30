import React from 'react'
import './Profile.scss'

import { firestore } from '../../config/firebase'

type ProfileProps = {}
type ProfileState = {
  profile: {
    username: string
    display_name: string
    avatar: string
  } | null
}

class Profile extends React.Component {
  state: ProfileState

  constructor(props: ProfileProps) {
    super(props)
    this.state = {
      profile: null,
    }
  }

  async componentDidMount() {
    console.log(this.props)
    const users = await firestore.collection('users').get()
    console.log({ users })
  }

  render() {
    return (
      <div className="profile">
        <div className="container">
          <h1>Profile</h1>
        </div>
      </div>
    )
  }
}
export default Profile
