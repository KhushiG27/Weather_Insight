const API_KEY = "f0d4705f2ff161e9df26cbe47a8731b6";
const BASE    = "https://api.openweathermap.org/data/2.5";

export async function fetchWeatherByCity(city) {
  const res = await fetch(`${BASE}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`);
  if (res.status === 404) throw new Error("CITY_NOT_FOUND");
  if (!res.ok)           throw new Error(`SERVER_ERROR_${res.status}`);
  return res.json();
}

export async function fetchWeatherByCoords(lat, lon) {
  const res = await fetch(`${BASE}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
  if (!res.ok) throw new Error(`SERVER_ERROR_${res.status}`);
  return res.json();
}

export async function fetchForecastByCity(city) {
  const res = await fetch(`${BASE}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchForecastByCoords(lat, lon) {
  const res = await fetch(`${BASE}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
  if (!res.ok) return null;
  return res.json();
}

export async function fetchAQI(lat, lon) {
  const res = await fetch(`${BASE}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
  if (!res.ok) return null;
  return res.json();
}
