import { getIcon, formatTemp, formatDate, formatTime, AQI_LABELS, AQI_COLORS, AQI_BG } from "../utils";

export default function WeatherCard({ weather, forecast, aqi, isCelsius, onToggleUnit }) {
  const condition = weather.weather[0].main;
  const desc      = weather.weather[0].description
    .split(" ").map(w => w[0].toUpperCase() + w.slice(1)).join(" ");
  const aqiIndex  = aqi?.list?.[0]?.main?.aqi;

  return (
    <div className="animate-[fadeIn_0.4s_ease]">

      {/* City + Date */}
      <div className="flex items-center justify-between mt-5 flex-wrap gap-1">
        <div className="flex items-center gap-1.5">
          <img src="/location.png" alt="" className="w-4 h-4 invert opacity-75 flex-shrink-0" />
          <span className="text-white font-semibold text-lg">{weather.name}, {weather.sys.country}</span>
        </div>
        <span className="text-white/60 text-[13px]">
          {new Date().toLocaleDateString("en-US", { weekday:"short", day:"2-digit", month:"short" })}
        </span>
      </div>

      {/* Main weather row */}
      <div className="flex items-center justify-between mt-4 px-1 gap-3">
        <img src={getIcon(condition)} alt={condition}
          className="w-24 h-24 object-contain drop-shadow-lg flex-shrink-0" />
        <div className="text-right flex-1">
          <h1 className="text-[54px] font-bold leading-none text-white">
            {formatTemp(weather.main.temp, isCelsius)}
          </h1>
          <p className="text-white/75 text-[15px] mt-1">{desc}</p>
          <p className="text-white/50 text-[13px] mt-0.5">
            Feels like {formatTemp(weather.main.feels_like, isCelsius)}
          </p>
          {/* Unit toggle */}
          <div className="flex items-center justify-end gap-2 mt-2.5">
            <span className={`text-[13px] font-semibold transition-colors ${isCelsius ? "text-white" : "text-white/40"}`}>°C</span>
            <label className="relative inline-block w-10 h-[22px] cursor-pointer">
              <input type="checkbox" checked={!isCelsius} onChange={onToggleUnit} className="sr-only" />
              <span className={`absolute inset-0 rounded-full transition-colors duration-300
                ${!isCelsius ? "bg-white/35" : "bg-white/20"}`} />
              <span className={`absolute top-[3px] left-[3px] w-4 h-4 bg-white rounded-full
                transition-transform duration-300 ${!isCelsius ? "translate-x-[18px]" : ""}`} />
            </label>
            <span className={`text-[13px] font-semibold transition-colors ${!isCelsius ? "text-white" : "text-white/40"}`}>°F</span>
          </div>
        </div>
      </div>

      {/* Details row */}
      <div className="grid grid-cols-4 mt-5 p-4 rounded-2xl
        bg-white/8 border border-white/12 gap-3">

        <div className="flex items-center gap-2">
          <img src="/humidity.png" alt="humidity" className="w-6 h-6 invert opacity-80 flex-shrink-0" />
          <div>
            <p className="text-[11px] text-white/55 whitespace-nowrap">Humidity</p>
            <p className="text-[14px] font-semibold text-white">{weather.main.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <img src="/wind.png" alt="wind" className="w-6 h-6 invert opacity-80 flex-shrink-0" />
          <div>
            <p className="text-[11px] text-white/55 whitespace-nowrap">Wind</p>
            <p className="text-[14px] font-semibold text-white whitespace-nowrap">{weather.wind.speed} M/s</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xl flex-shrink-0">🌅</span>
          <div>
            <p className="text-[11px] text-white/55 whitespace-nowrap">Sunrise</p>
            <p className="text-[14px] font-semibold text-white">
              {formatTime(weather.sys.sunrise, weather.timezone)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xl flex-shrink-0">🌇</span>
          <div>
            <p className="text-[11px] text-white/55 whitespace-nowrap">Sunset</p>
            <p className="text-[14px] font-semibold text-white">
              {formatTime(weather.sys.sunset, weather.timezone)}
            </p>
          </div>
        </div>
      </div>

      {/* AQI badge */}
      {aqiIndex && (
        <div className={`flex items-center gap-2 mt-3 px-4 py-2.5 rounded-xl
          border border-white/12 ${AQI_BG[aqiIndex]}`}>
          <span className="text-white/60 text-[12px] font-semibold uppercase tracking-wider">Air Quality</span>
          <span className={`text-[13px] font-bold ${AQI_COLORS[aqiIndex]}`}>
            {AQI_LABELS[aqiIndex]}
          </span>
        </div>
      )}

      {/* 5-day forecast */}
      {forecast.length > 0 && (
        <>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-white/50 mt-5 mb-2.5">
            5-Day Forecast
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {forecast.map((item, i) => (
              <div key={item.dt}
                style={{ animationDelay: `${i * 0.07}s` }}
                className="flex-shrink-0 w-[calc(20%-7px)] min-w-[62px] text-center
                  p-3 rounded-2xl bg-white/8 border border-white/12
                  opacity-0 animate-[cardIn_0.35s_ease_forwards]
                  hover:bg-white/16 hover:-translate-y-1 transition-all cursor-default">
                <p className="text-[11px] text-white/60 font-medium mb-2 whitespace-nowrap">
                  {new Date(item.dt * 1000).toLocaleDateString("en-US", { month:"short", day:"2-digit" })}
                </p>
                <img src={getIcon(item.weather[0].main)} alt={item.weather[0].main}
                  className="w-8 h-8 object-contain mx-auto" />
                <p className="text-[13px] font-semibold text-white mt-2">
                  {formatTemp(item.main.temp, isCelsius)}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
