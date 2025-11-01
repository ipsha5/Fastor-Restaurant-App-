import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import LoginScreen from './screens/LoginScreen'
import OTPScreen from './screens/OTPScreen'
import RestaurantList from './screens/RestaurantList'
import ImageSuperimpose from './screens/ImageSuperimpose'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/restaurants" replace /> : 
            <LoginScreen onPhoneSubmit={(phone) => {
              setPhoneNumber(phone)
              setIsAuthenticated(false)
            }} />
          } 
        />
        <Route 
          path="/otp" 
          element={
            phoneNumber ? 
            <OTPScreen 
              phoneNumber={phoneNumber}
              onVerify={() => setIsAuthenticated(true)} 
            /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/restaurants" 
          element={
            isAuthenticated ? 
            <RestaurantList /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/superimpose/:restaurantId" 
          element={
            isAuthenticated ? 
            <ImageSuperimpose /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App

