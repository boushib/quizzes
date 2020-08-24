import React from 'react'
import './Spinner.scss'

type SpinnerProps = { message: string }

const Spinner = ({ message }: SpinnerProps) => (
  <div className="spinner-container">
    <div className="message">{message}</div>
    <div className="spinner"></div>
  </div>
)

export default Spinner
