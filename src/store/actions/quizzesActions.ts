export const fetchQuizzes = () => {
  return (dispatch: Function, getState: any) => {
    dispatch({ type: 'FETCH_QUIZZES' })
  }
}
