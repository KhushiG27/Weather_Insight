export const ICON_MAP = {
  Clouds:       "/clouds.png",
  Clear:        "/clear.png",
  Rain:         "/rain.png",
  Drizzle:      "/drizzle.png",
  Mist:         "/mist.png",
  Fog:          "/mist.png",
  Haze:         "/mist.png",
  Snow:         "/snow.png",
  Thunderstorm: "/rain.png",
};

export function getIcon(condition) {
  return ICON_MAP[condition] || "/clouds.png";
}

export function toF(c) {
  return Math.round(c * 9 / 5 + 32);
}

export function formatTemp(c, isCelsius) {
  return isCelsius ? `${Math.round(c)}°C` : `${toF(c)}°F`;
}

export function formatDate(ts) {
  return new Date(ts * 1000).toLocaleDateString("en-US", {
    weekday: "short", day: "2-digit", month: "short",
  });
}

export function formatTime(ts, timezone) {
  return new Date((ts + timezone) * 1000).toUTCString().slice(17, 22);
}

export const AQI_LABELS = ["", "Good", "Fair", "Moderate", "Poor", "Very Poor"];
export const AQI_COLORS = ["", "text-green-400", "text-yellow-300", "text-orange-400", "text-red-400", "text-red-600"];
export const AQI_BG     = ["", "bg-green-400/20", "bg-yellow-300/20", "bg-orange-400/20", "bg-red-400/20", "bg-red-600/20"];

export const BG_MAP = {
  Clear:        "https://images.unsplash.com/photo-1601297183305-6df142704ea2?auto=format&fit=crop&w=1920&q=80",
  Clouds:       "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80",
  Rain:         "https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=1920&q=80",
  Drizzle:      "https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=1920&q=80",
  Snow:         "https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=1920&q=80",
  Thunderstorm: "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?auto=format&fit=crop&w=1920&q=80",
  Mist:         "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80",
  default:      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80",
};

export function getBg(condition) {
  return BG_MAP[condition] || BG_MAP.default;
}

export function parseForecast(data) {
  if (!data) return [];
  const today = new Date().getDate();
  const seen  = new Set();
  const days  = [];

  // prefer noon slots
  for (const item of data.list) {
    const d      = new Date(item.dt * 1000);
    const dayNum = d.getDate();
    if (dayNum === today) continue;
    if (seen.has(dayNum)) continue;
    if (d.getHours() >= 11 && d.getHours() <= 14) {
      seen.add(dayNum); days.push(item);
    }
    if (days.length === 5) break;
  }

  // fallback
  if (days.length < 5) {
    seen.clear(); days.length = 0;
    for (const item of data.list) {
      const d      = new Date(item.dt * 1000);
      const dayNum = d.getDate();
      if (dayNum === today) continue;
      if (seen.has(dayNum)) continue;
      seen.add(dayNum); days.push(item);
      if (days.length === 5) break;
    }
  }
  return days;
}

// localStorage helpers
const KEY = "weatherRecentSearches";
export function getRecents()       { return JSON.parse(localStorage.getItem(KEY)) || []; }
export function saveRecent(city) {
  let r = getRecents().filter(c => c.toLowerCase() !== city.toLowerCase());
  r.unshift(city);
  if (r.length > 5) r = r.slice(0, 5);
  localStorage.setItem(KEY, JSON.stringify(r));
}
export function clearRecents()     { localStorage.removeItem(KEY); }
