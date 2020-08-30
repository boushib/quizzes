const initState = {
  auth: { token: '123' },
}

const authReducer = (state = initState, action: any) => {
  switch (action.type) {
    case 'SIGNUP':
      console.log('signing up..')
      break
    default:
      console.log('Case not handled!')
      break
  }
  return state
}

export default authReducer
