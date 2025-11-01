import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/OTPScreen.css'

function OTPScreen({ phoneNumber, onVerify }) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return // Only allow digits
    
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1) // Only take last character
    setOtp(newOtp)
    setError('')

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split('').concat(Array(6 - pastedData.length).fill(''))
      setOtp(newOtp)
      setError('')
    }
  }

  const handleVerify = () => {
    const otpString = otp.join('')
    
    if (otpString.length !== 6) {
      setError('Please enter complete OTP')
      return
    }

    if (otpString === '123456') {
      onVerify()
      navigate('/restaurants')
    } else {
      setError('Invalid OTP. Please try again')
    }
  }

  return (
    <div className="otp-screen">
      <div className="otp-container">
        <div className="otp-header">
          <h1>Verify OTP</h1>
          <p>We sent an OTP to +91 {phoneNumber}</p>
          <p className="hint">Enter OTP: <strong>123456</strong></p>
        </div>
        
        <div className="otp-input-group">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className={error ? 'error' : ''}
              autoFocus={index === 0}
            />
          ))}
        </div>

        {error && <span className="error-message">{error}</span>}

        <button onClick={handleVerify} className="verify-btn">
          Verify OTP
        </button>

        <button 
          onClick={() => navigate('/login')} 
          className="back-btn"
        >
          Change Number
        </button>
      </div>
    </div>
  )
}

export default OTPScreen

