import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyA4zQdBJYyB1NMn5u6VurP7zroQ-I-gBcM',
  authDomain: 'quizzes-me.firebaseapp.com',
  databaseURL: 'https://quizzes-me.firebaseio.com',
  projectId: 'quizzes-me',
  storageBucket: 'quizzes-me.appspot.com',
  messagingSenderId: '387642741436',
  appId: '1:387642741436:web:1d6d508b4929b2b4fc36b9',
  measurementId: 'G-3NJ2ZSR26H',
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ login_hint: 'user@example.com', prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
