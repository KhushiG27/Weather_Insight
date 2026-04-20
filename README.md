# 🌤️ Weather App

A clean, responsive weather application built with vanilla HTML, CSS, and JavaScript. Features a glassmorphism UI, real-time weather data, 5-day forecast, voice search, and more.

---

## ✨ Features

- 🔍 **City Search** — search any city by name with Enter key or click
- 🎙️ **Voice Search** — speak a city name using the Web Speech API
- 📍 **Geolocation** — fetch weather for your current location
- 🌡️ **°C / °F Toggle** — switch temperature units instantly, including forecast cards
- 📅 **Current Date** — displays today's date alongside the city name
- 📆 **5-Day Forecast** — daily forecast strip with weather icons and temperatures
- 🕐 **Recent Searches** — last 5 searches saved to localStorage, clickable to re-search
- ⚠️ **Smart Error Handling** — specific messages for 404, network failure, denied location/mic
- 💫 **Smooth Transitions** — fade in/out on weather content, staggered forecast cards, shake on invalid input
- 📱 **Fully Responsive** — works on desktop, tablet, small phones, and landscape orientation

---


## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/KhushiG27/PRODIGY_WD_05.git
cd PRODIGY_WD_05
```

### 2. Get a free API key

1. Go to [openweathermap.org](https://openweathermap.org/api) and create a free account
2. Navigate to **API Keys** in your dashboard
3. Copy your key

### 3. Add your API key

Open `index.html` and replace the placeholder on this line:

```js
const apiKey = "YOUR_API_KEY_HERE";
```

### 4. Open the app

Just open `index.html` in your browser — no build step or server required.

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Structure and semantic markup |
| CSS3 | Glassmorphism UI, animations, responsive layout |
| Vanilla JavaScript | API calls, DOM manipulation, localStorage |
| [OpenWeatherMap API](https://openweathermap.org/api) | Current weather + 5-day forecast data |
| [Google Fonts — Poppins](https://fonts.google.com/specimen/Poppins) | Typography |
| [Unsplash](https://unsplash.com) | Background image |
| Web Speech API | Voice search (browser built-in) |

---

## 📁 Project Structure

```
PRODIGY_WD_05/
├── index.html        # Main app — markup + all JavaScript
├── style.css         # All styles + responsive breakpoints
├── .gitignore
├── LICENSE
├── README.md
└── images/
    ├── clear.png
    ├── clouds.png
    ├── drizzle.png
    ├── humidity.png
    ├── location.png
    ├── mist.png
    ├── rain.png
    ├── search.png
    ├── snow.png
    └── wind.png
```

---

## 🌐 API Endpoints Used

| Endpoint | Purpose |
|---|---|
| `/data/2.5/weather?q={city}` | Current weather by city name |
| `/data/2.5/weather?lat={lat}&lon={lon}` | Current weather by coordinates |
| `/data/2.5/forecast?q={city}` | 5-day forecast by city name |
| `/data/2.5/forecast?lat={lat}&lon={lon}` | 5-day forecast by coordinates |

All requests use `units=metric` by default. The °F conversion is done client-side.

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgements

- Weather data by [OpenWeatherMap](https://openweathermap.org)
- Background photo by [Samuel Ferrara](https://unsplash.com/@samferrara) on [Unsplash](https://unsplash.com)
- Built as part of the **Prodigy InfoTech Web Development Internship** — Task 05
