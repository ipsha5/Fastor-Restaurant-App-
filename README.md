# Fastor Restaurant App

A Progressive Web Application (PWA) for discovering restaurants and sharing images with logo superimposition.

## Features

1. **Login System**
   - Mobile number input screen
   - OTP verification (Fixed OTP: `123456`)

2. **Restaurant Discovery**
   - List of nearby restaurants via REST API
   - Beautiful card-based UI with ratings and distance

3. **Image Superimposition**
   - View restaurant images
   - Superimpose Fastor logo on restaurant images
   - **Bonus Feature**: Drag and reposition the logo anywhere on the image

4. **PWA Share Functionality**
   - Share superimposed images directly from the browser
   - Fallback download option if share API is not available

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
fastor-restaurant-app/
├── public/
│   ├── fastor-logo.svg    # Fastor logo for superimposition
│   └── logo.svg           # App favicon
├── src/
│   ├── screens/
│   │   ├── LoginScreen.jsx        # Mobile number input
│   │   ├── OTPScreen.jsx           # OTP verification
│   │   ├── RestaurantList.jsx      # Restaurant listing
│   │   └── ImageSuperimpose.jsx    # Image with logo overlay
│   ├── styles/
│   │   ├── LoginScreen.css
│   │   ├── OTPScreen.css
│   │   ├── RestaurantList.css
│   │   └── ImageSuperimpose.css
│   ├── services/
│   │   └── api.js                  # API service (mock data)
│   ├── App.jsx                     # Main app with routing
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles
├── index.html
├── vite.config.js                  # Vite + PWA configuration
└── package.json
```

## Usage

1. **Login Flow**:
   - Enter a 10-digit mobile number
   - Enter OTP: `123456` (fixed for demo)
   - You'll be redirected to the restaurant list

2. **Restaurant List**:
   - Browse nearby restaurants
   - Click on any restaurant card to view details

3. **Image Superimposition**:
   - Restaurant image is displayed
   - Fastor logo is overlaid in the center
   - **Drag the logo** to reposition it anywhere on the image
   - Click "Share Image" to share or download the final image

## API Integration

The app currently uses mock restaurant data. To integrate with a real API:

1. Update `src/services/api.js`
2. Replace mock data with actual API calls
3. Adjust the response structure as needed

Example API endpoint structure:
```javascript
export const getRestaurants = async () => {
  const response = await fetch('/api/restaurants')
  return response.json()
}
```

## PWA Features

- **Installable**: Can be installed on mobile devices and desktops
- **Offline Support**: Service worker caching (via vite-plugin-pwa)
- **Share API**: Native sharing functionality for supported browsers

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari (iOS 12.1+)
- Opera

## Technologies Used

- React 18
- React Router v6
- Vite
- vite-plugin-pwa
- CSS3 (Responsive Design)

## Notes

- The OTP is fixed to `123456` for demo purposes
- Restaurant images are fetched from Unsplash
- Logo repositioning works with both mouse and touch events
- Share functionality uses the Web Share API with download fallback

## License

This project is created for demonstration purposes.

