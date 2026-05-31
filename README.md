# Weather Insight 🌤️

A weather app I built using React and Tailwind CSS. It pulls real-time data from the OpenWeatherMap API and shows current conditions, a 5-day forecast, air quality, and more — all wrapped in a glassmorphism UI with a dynamic background that changes based on the weather.

---

## What it does

- Search any city by name, press Enter or click the search icon
- Speak a city name using the mic button (voice search)
- Tap the location icon to get weather for your current location
- Switch between °C and °F — updates everywhere including the forecast
- See humidity, wind speed, sunrise and sunset times at a glance
- Air Quality Index (AQI) shown with color-coded labels
- Last 5 searches saved locally — click any to re-search
- Background image changes based on weather condition (sunny, rainy, snowy, etc.)
- Fully responsive — works on mobile, tablet, and desktop

---

## Tech used

- React (Vite)
- Tailwind CSS
- OpenWeatherMap API
- Web Speech API (voice search)
- localStorage (recent searches)

---

## Running locally

```bash
git clone https://github.com/KhushiG27/PRODIGY_WD_05.git
cd PRODIGY_WD_05
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

You'll need an API key from [openweathermap.org](https://openweathermap.org/api). Once you have it, replace the key in `src/api.js`:

```js
const API_KEY = "your_api_key_here";
```

---

## Project structure

```
src/
├── api.js              # All API calls
├── utils.js            # Helpers, icon map, forecast parser
├── App.jsx             # Main component, state management
└── components/
    ├── SearchBar.jsx   # Search, voice, recent searches
    └── WeatherCard.jsx # Weather display, forecast, AQI
```

---

Built as part of the Prodigy InfoTech Web Development Internship — Task 05.
