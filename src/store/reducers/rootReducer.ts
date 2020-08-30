import { combineReducers } from 'redux'
import authReducer from './authReducer'
import quizzesReducer from './quizzesReducer'

const rootReducer = combineReducers({ auth: authReducer, quizzes: quizzesReducer })

export default rootReducer
