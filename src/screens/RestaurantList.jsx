import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getRestaurants } from '../services/api'
import '../styles/RestaurantList.css'

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    loadRestaurants()
  }, [])

  const loadRestaurants = async () => {
    try {
      setLoading(true)
      const response = await getRestaurants()
      if (response.success) {
        setRestaurants(response.data)
      }
    } catch (err) {
      setError('Failed to load restaurants. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleRestaurantClick = (restaurantId) => {
    navigate(`/superimpose/${restaurantId}`)
  }

  if (loading) {
    return (
      <div className="restaurant-list-screen">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading restaurants...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="restaurant-list-screen">
        <div className="error-container">
          <p>{error}</p>
          <button onClick={loadRestaurants}>Retry</button>
        </div>
      </div>
    )
  }

  return (
    <div className="restaurant-list-screen">
      <div className="restaurant-header">
        <h1>Nearby Restaurants</h1>
        <p>Discover amazing places to dine</p>
      </div>

      <div className="restaurant-grid">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="restaurant-card"
            onClick={() => handleRestaurantClick(restaurant.id)}
          >
            <div className="restaurant-image-container">
              <img 
                src={restaurant.image} 
                alt={restaurant.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=Restaurant'
                }}
              />
              <div className="rating-badge">
                ⭐ {restaurant.rating}
              </div>
            </div>
            <div className="restaurant-info">
              <h3>{restaurant.name}</h3>
              <p className="cuisine">{restaurant.cuisine}</p>
              <div className="restaurant-meta">
                <span className="distance">📍 {restaurant.distance}</span>
                <span className="address">{restaurant.address}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {restaurants.length === 0 && (
        <div className="empty-state">
          <p>No restaurants found nearby</p>
        </div>
      )}
    </div>
  )
}

export default RestaurantList

