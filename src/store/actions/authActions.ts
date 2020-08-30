type SignupAction = {
  type: string
  user_data: object
}

export const signup = (user_data: object) => {
  return (dispatch: any, getState: any) => {
    // API call
    // console.log(user_data)
    dispatch({ type: 'SIGNUP', user_data })
  }
}
