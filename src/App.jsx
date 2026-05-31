import { useState, useCallback } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import {
  fetchWeatherByCity, fetchWeatherByCoords,
  fetchForecastByCity, fetchForecastByCoords,
  fetchAQI
} from "./api";
import { getBg, parseForecast, saveRecent } from "./utils";

export default function App() {
  const [weather,   setWeather]   = useState(null);
  const [forecast,  setForecast]  = useState([]);
  const [aqi,       setAqi]       = useState(null);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [isCelsius, setIsCelsius] = useState(true);
  const [bg,        setBg]        = useState("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80");

  const handleSearch = useCallback(async (city) => {
    setLoading(true);
    setError("");
    setWeather(null);
    try {
      const w = await fetchWeatherByCity(city);
      const [f, a] = await Promise.all([
        fetchForecastByCity(w.name),
        fetchAQI(w.coord.lat, w.coord.lon),
      ]);
      saveRecent(w.name);
      setWeather(w);
      setForecast(parseForecast(f));
      setAqi(a);
      setBg(getBg(w.weather[0].main));
    } catch (err) {
      if (err.message === "CITY_NOT_FOUND")
        setError(`City "${city}" not found. Check the spelling and try again.`);
      else if (err.message.startsWith("SERVER_ERROR"))
        setError(`Server error. Please try again later.`);
      else
        setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setLoading(true);
    setError("");
    setWeather(null);
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { latitude: lat, longitude: lon } }) => {
        try {
          const w = await fetchWeatherByCoords(lat, lon);
          const [f, a] = await Promise.all([
            fetchForecastByCoords(lat, lon),
            fetchAQI(lat, lon),
          ]);
          saveRecent(w.name);
          setWeather(w);
          setForecast(parseForecast(f));
          setAqi(a);
          setBg(getBg(w.weather[0].main));
        } catch {
          setError("Network error. Check your connection and try again.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setLoading(false);
        const msgs = {
          1: "Location access denied. Please allow it in your browser settings.",
          2: "Location unavailable. Try searching by city name.",
          3: "Location request timed out. Try again.",
        };
        setError(msgs[err.code] || "Unable to retrieve your location.");
      },
      { timeout: 10000 }
    );
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 relative"
      style={{ fontFamily: "'Poppins', sans-serif" }}>

      {/* Background */}
      <div className="fixed inset-0 -z-10 transition-all duration-1000"
        style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <div className="fixed inset-0 -z-10 bg-[rgba(10,20,40,0.38)]" />

      {/* Card */}
      <div className="w-full max-w-[420px] bg-white/10 backdrop-blur-2xl
        border border-white/18 rounded-3xl p-7 text-white
        shadow-[0_8px_32px_rgba(0,0,0,0.4)]">

        <SearchBar
          onSearch={handleSearch}
          onLocation={handleLocation}
          error={error}
          loading={loading}
        />

        {/* Loader */}
        {loading && (
          <div className="flex justify-center my-10">
            <div className="w-11 h-11 rounded-full border-4 border-white/20
              border-t-white animate-spin" />
          </div>
        )}

        {/* Weather content */}
        {!loading && weather && (
          <WeatherCard
            weather={weather}
            forecast={forecast}
            aqi={aqi}
            isCelsius={isCelsius}
            onToggleUnit={() => setIsCelsius(p => !p)}
          />
        )}
      </div>
    </div>
  );
}
