import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getRestaurantById } from '../services/api'
import '../styles/ImageSuperimpose.css'

function ImageSuperimpose() {
  const { restaurantId } = useParams()
  const navigate = useNavigate()
  const [restaurant, setRestaurant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [logoPosition, setLogoPosition] = useState({ x: 50, y: 50 }) // Percentage
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const logoRef = useRef(null)

  useEffect(() => {
    loadRestaurant()
  }, [restaurantId])

  const loadRestaurant = async () => {
    try {
      setLoading(true)
      const response = await getRestaurantById(restaurantId)
      if (response.success) {
        setRestaurant(response.data)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleMouseDown = (e) => {
    setIsDragging(true)
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setDragStart({ x: e.clientX, y: e.clientY })
    setLogoPosition({ x, y })
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100))
    setLogoPosition({ x, y })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleTouchStart = (e) => {
    e.preventDefault()
    const touch = e.touches[0]
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((touch.clientX - rect.left) / rect.width) * 100
    const y = ((touch.clientY - rect.top) / rect.height) * 100
    setDragStart({ x: touch.clientX, y: touch.clientY })
    setLogoPosition({ x, y })
    setIsDragging(true)
  }

  const handleTouchMove = (e) => {
    if (!isDragging || !containerRef.current) return
    e.preventDefault()
    const touch = e.touches[0]
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100))
    const y = Math.max(0, Math.min(100, ((touch.clientY - rect.top) / rect.height) * 100))
    setLogoPosition({ x, y })
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const generateImage = async () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const container = containerRef.current

    // Set canvas size
    canvas.width = container.offsetWidth
    canvas.height = container.offsetHeight

    // Load restaurant image
    const restaurantImg = new Image()
    restaurantImg.crossOrigin = 'anonymous'
    
    await new Promise((resolve, reject) => {
      restaurantImg.onload = () => {
        // Draw restaurant image
        ctx.drawImage(restaurantImg, 0, 0, canvas.width, canvas.height)
        
        // Load and draw Fastor logo
        const logoSize = Math.min(canvas.width, canvas.height) * 0.15
        const logoImg = new Image()
        logoImg.crossOrigin = 'anonymous'
        logoImg.onload = () => {
          const logoX = (logoPosition.x / 100) * canvas.width - logoSize / 2
          const logoY = (logoPosition.y / 100) * canvas.height - logoSize / 2
          
          ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize)
          
          canvas.toBlob((blob) => {
            resolve(blob)
          }, 'image/png')
        }
        logoImg.onerror = () => {
          // If logo fails, create a text placeholder
          const logoX = (logoPosition.x / 100) * canvas.width
          const logoY = (logoPosition.y / 100) * canvas.height
          ctx.fillStyle = '#667eea'
          ctx.font = `bold ${logoSize * 0.3}px Arial`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText('FASTOR', logoX, logoY)
          canvas.toBlob((blob) => {
            resolve(blob)
          }, 'image/png')
        }
        logoImg.src = '/fastor-logo.svg'
      }
      restaurantImg.onerror = () => {
        // Fallback if image fails
        ctx.fillStyle = '#f0f0f0'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#333'
        ctx.font = '20px Arial'
        ctx.textAlign = 'center'
        ctx.fillText('Restaurant Image', canvas.width / 2, canvas.height / 2)
        canvas.toBlob((blob) => {
          resolve(blob)
        }, 'image/png')
      }
      restaurantImg.src = restaurant.image
    })
  }

  const handleShare = async () => {
    try {
      await generateImage()
      
      const canvas = canvasRef.current
      canvas.toBlob(async (blob) => {
        const file = new File([blob], 'fastor-restaurant.png', { type: 'image/png' })
        
        if (navigator.share && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              title: `${restaurant.name} - Fastor`,
              text: `Check out ${restaurant.name}!`,
              files: [file]
            })
          } catch (err) {
            if (err.name !== 'AbortError') {
              console.error('Error sharing:', err)
              downloadImage(blob)
            }
          }
        } else {
          // Fallback: download the image
          downloadImage(blob)
        }
      }, 'image/png')
    } catch (err) {
      console.error('Error generating image:', err)
      alert('Failed to share image. Please try again.')
    }
  }

  const downloadImage = (blob) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `fastor-${restaurant.name.replace(/\s+/g, '-')}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="superimpose-screen">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading restaurant...</p>
        </div>
      </div>
    )
  }

  if (!restaurant) {
    return (
      <div className="superimpose-screen">
        <div className="error-container">
          <p>Restaurant not found</p>
          <button onClick={() => navigate('/restaurants')}>Go Back</button>
        </div>
      </div>
    )
  }

  return (
    <div className="superimpose-screen">
      <div className="superimpose-header">
        <button onClick={() => navigate('/restaurants')} className="back-button">
          ← Back
        </button>
        <h2>{restaurant.name}</h2>
      </div>

      <div 
        ref={containerRef}
        className="image-container"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/800x600?text=Restaurant+Image'
          }}
        />
        <div
          ref={logoRef}
          className="logo-overlay"
          style={{
            left: `${logoPosition.x}%`,
            top: `${logoPosition.y}%`,
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <img 
            src="/fastor-logo.svg" 
            alt="Fastor Logo"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.nextElementSibling.style.display = 'flex'
            }}
          />
          <div className="logo-placeholder" style={{ display: 'none' }}>
            <span>FASTOR</span>
          </div>
        </div>
      </div>

      <div className="superimpose-actions">
        <p className="hint">Drag the Fastor logo to reposition it</p>
        <button onClick={handleShare} className="share-btn">
          Share Image
        </button>
      </div>

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
}

export default ImageSuperimpose

