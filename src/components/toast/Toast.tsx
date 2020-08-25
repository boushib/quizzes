import React from 'react'
import './Toast.scss'
import AlertIcon from '../../assets/images/alert.svg'

type ToastProps = {
  type: string
  message: string
}

const Toast: React.FC<ToastProps> = ({ type, message }) => (
  <div className={`toast ${type}`}>
    {type === 'error' ? <img src={AlertIcon} alt="alert" /> : null}
    <div className="message">{message}</div>
  </div>
)

export default Toast
