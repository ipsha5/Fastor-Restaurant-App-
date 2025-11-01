import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/LoginScreen.css'

function LoginScreen({ onPhoneSubmit }) {
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    if (!phone.trim()) {
      setError('Please enter your mobile number')
      return
    }

    // Basic phone validation (10 digits)
    const phoneRegex = /^\d{10}$/
    if (!phoneRegex.test(phone)) {
      setError('Please enter a valid 10-digit mobile number')
      return
    }

    onPhoneSubmit(phone)
    navigate('/otp')
  }

  return (
    <div className="login-screen">
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome to Fastor</h1>
          <p>Enter your mobile number to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="phone">Mobile Number</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter 10-digit mobile number"
              maxLength={10}
              className={error ? 'error' : ''}
            />
            {error && <span className="error-message">{error}</span>}
          </div>

          <button type="submit" className="submit-btn">
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginScreen

