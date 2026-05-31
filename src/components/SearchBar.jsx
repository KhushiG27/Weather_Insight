import { useState, useEffect, useRef } from "react";
import { getRecents, clearRecents } from "../utils";

export default function SearchBar({ onSearch, onLocation, error, loading }) {
  const [query, setQuery]       = useState("");
  const [recents, setRecents]   = useState(getRecents());
  const [showDrop, setShowDrop] = useState(false);
  const [listening, setListening] = useState(false);
  const [shake, setShake]       = useState(false);
  const inputRef = useRef(null);

  // refresh recents whenever dropdown opens
  useEffect(() => { if (showDrop) setRecents(getRecents()); }, [showDrop]);

  function triggerShake() {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  }

  function handleSubmit(city) {
    const c = (city || query).trim();
    if (!c) { triggerShake(); return; }
    onSearch(c);
    setQuery("");
    setShowDrop(false);
  }

  function handleKey(e) {
    if (e.key === "Enter") handleSubmit();
  }

  function handleClear() {
    clearRecents();
    setRecents([]);
    setShowDrop(false);
  }

  // Voice search
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  function startVoice() {
    if (!SpeechRecognition) return;
    const rec = new SpeechRecognition();
    rec.lang = "en-US";
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onstart  = () => setListening(true);
    rec.onend    = () => setListening(false);
    rec.onerror  = () => setListening(false);
    rec.onresult = (e) => {
      const city = e.results[0][0].transcript.trim();
      setListening(false);
      handleSubmit(city);
    };
    rec.start();
  }

  return (
    <div className="relative w-full">
      {/* Search bar */}
      <div className={`flex items-center gap-2 h-13 px-4 rounded-2xl
        bg-white/10 border transition-all duration-300
        ${shake ? "border-red-400/70 animate-[shake_0.35s_ease]" : "border-white/20"}
        focus-within:border-white/50 focus-within:shadow-[0_0_0_3px_rgba(255,255,255,0.08)]`}>

        {/* Search icon */}
        <img src="/search.png" alt="search"
          className="w-4 h-4 opacity-60 cursor-pointer invert flex-shrink-0 hover:opacity-100 transition-opacity"
          onClick={() => handleSubmit()} />

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKey}
          onFocus={() => setShowDrop(true)}
          placeholder={listening ? "Listening..." : "Search City"}
          spellCheck={false}
          autoComplete="off"
          className="flex-1 min-w-0 bg-transparent border-none outline-none
            text-white text-[15px] placeholder-white/50 font-[Poppins]"
        />

        {/* Voice button */}
        {SpeechRecognition && (
          <button onClick={startVoice} title="Voice search"
            className={`flex-shrink-0 p-1.5 rounded-lg transition-all
              ${listening ? "text-red-400 animate-pulse" : "text-white/70 hover:text-white hover:bg-white/15"}`}>
            <svg viewBox="0 0 24 24" fill="none" className="w-[18px] h-[18px]">
              <rect x="9" y="2" width="6" height="11" rx="3" fill="currentColor"/>
              <path d="M5 10a7 7 0 0 0 14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="9" y1="21" x2="15" y2="21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        )}

        {/* Location button */}
        <button onClick={onLocation} title="Use my location"
          className="flex-shrink-0 p-1.5 rounded-lg text-white/70
            hover:text-white hover:bg-white/15 transition-all">
          <img src="/location.png" alt="location" className="w-[19px] h-[19px] invert opacity-80" />
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 mt-2 px-4 py-3 rounded-xl
          bg-red-500/15 border border-red-500/35 text-red-300 text-[13px]
          animate-[fadeIn_0.3s_ease]">
          <span>⚠</span><span>{error}</span>
        </div>
      )}

      {/* Recent searches dropdown */}
      {showDrop && recents.length > 0 && (
        <div className="mt-2 p-3 rounded-2xl bg-white/8 border border-white/12
          backdrop-blur-xl animate-[fadeIn_0.25s_ease]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-white/60">Recent</span>
            <button onClick={handleClear}
              className="text-[10px] px-3 py-0.5 rounded-full border border-white/30
                text-white/70 hover:bg-white/15 transition-colors">
              Clear
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {recents.map(city => (
              <button key={city} onClick={() => handleSubmit(city)}
                className="px-3 py-1 rounded-full bg-white/12 text-white text-[13px]
                  hover:bg-white/25 transition-all hover:scale-105 active:scale-95">
                {city}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
