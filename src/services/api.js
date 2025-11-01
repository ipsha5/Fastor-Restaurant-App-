// Mock restaurant data - In production, this would fetch from a real API
const mockRestaurants = [
  {
    id: 1,
    name: 'The Gourmet Kitchen',
    cuisine: 'Italian',
    rating: 4.5,
    distance: '0.5 km',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400',
    address: '123 Main Street'
  },
  {
    id: 2,
    name: 'Spice Garden',
    cuisine: 'Indian',
    rating: 4.8,
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400',
    address: '456 Oak Avenue'
  },
  {
    id: 3,
    name: 'Sushi Master',
    cuisine: 'Japanese',
    rating: 4.7,
    distance: '0.8 km',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
    address: '789 Pine Road'
  },
  {
    id: 4,
    name: 'Burger Haven',
    cuisine: 'American',
    rating: 4.3,
    distance: '1.5 km',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
    address: '321 Elm Street'
  },
  {
    id: 5,
    name: 'Dragon Palace',
    cuisine: 'Chinese',
    rating: 4.6,
    distance: '2.0 km',
    image: 'https://images.unsplash.com/photo-1552569973-517d4c469596?w=400',
    address: '654 Maple Drive'
  },
  {
    id: 6,
    name: 'La Trattoria',
    cuisine: 'Italian',
    rating: 4.4,
    distance: '0.9 km',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
    address: '987 Cedar Lane'
  }
]

export const getRestaurants = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // In production, this would be:
  // return fetch('/api/restaurants').then(res => res.json())
  
  return {
    success: true,
    data: mockRestaurants
  }
}

export const getRestaurantById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300))
  
  const restaurant = mockRestaurants.find(r => r.id === parseInt(id))
  
  if (!restaurant) {
    throw new Error('Restaurant not found')
  }
  
  return {
    success: true,
    data: restaurant
  }
}

