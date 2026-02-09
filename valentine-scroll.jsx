import { useState, useEffect, useRef } from "react";

const MAP_IMG = ""

const SoftCloud = ({ width = 200, opacity = 0.9, color = "white", style = {} }) => (
  <svg width={width} height={width * 0.5} viewBox="0 0 200 100" style={style}>
    <ellipse cx="100" cy="60" rx="90" ry="35" fill={color} fillOpacity={opacity * 0.85} />
    <ellipse cx="65" cy="45" rx="55" ry="35" fill={color} fillOpacity={opacity * 0.95} />
    <ellipse cx="140" cy="50" rx="50" ry="30" fill={color} fillOpacity={opacity * 0.9} />
    <ellipse cx="100" cy="40" rx="60" ry="32" fill={color} fillOpacity={opacity} />
    <ellipse cx="50" cy="55" rx="40" ry="25" fill={color} fillOpacity={opacity * 0.85} />
    <ellipse cx="155" cy="55" rx="35" ry="22" fill={color} fillOpacity={opacity * 0.8} />
  </svg>
);

const PixelHeart = ({ size = 24, color = "#E87A8F", style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 16 15" style={{ imageRendering: "pixelated", ...style }}>
    <rect x="2" y="0" width="3" height="1" fill={color} />
    <rect x="9" y="0" width="3" height="1" fill={color} />
    <rect x="1" y="1" width="5" height="1" fill={color} />
    <rect x="8" y="1" width="5" height="1" fill={color} />
    <rect x="0" y="2" width="7" height="1" fill={color} />
    <rect x="7" y="2" width="7" height="1" fill={color} />
    <rect x="0" y="3" width="14" height="1" fill={color} />
    <rect x="0" y="4" width="14" height="1" fill={color} />
    <rect x="1" y="5" width="12" height="1" fill={color} />
    <rect x="1" y="6" width="12" height="1" fill={color} />
    <rect x="2" y="7" width="10" height="1" fill={color} />
    <rect x="3" y="8" width="8" height="1" fill={color} />
    <rect x="4" y="9" width="6" height="1" fill={color} />
    <rect x="5" y="10" width="4" height="1" fill={color} />
    <rect x="6" y="11" width="2" height="1" fill={color} />
    <rect x="2" y="2" width="2" height="1" fill="rgba(255,255,255,0.4)" />
  </svg>
);

const PixelSparkle = ({ size = 8, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 8 8" style={{ imageRendering: "pixelated", ...style }}>
    <rect x="3" y="0" width="2" height="2" fill="#FFE8A0" />
    <rect x="0" y="3" width="2" height="2" fill="#FFE8A0" />
    <rect x="6" y="3" width="2" height="2" fill="#FFE8A0" />
    <rect x="3" y="6" width="2" height="2" fill="#FFE8A0" />
    <rect x="3" y="3" width="2" height="2" fill="#FFFFF0" />
  </svg>
);

const WORLD_HEIGHT = 8000;
const LANDING_HEIGHT = 900;
const MAP_START = LANDING_HEIGHT;

export default function ValentineScrollAdventure() {
  const [scrollY, setScrollY] = useState(0);
  const [started, setStarted] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const l = document.createElement("link");
    l.href = "https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Quicksand:wght@400;500;600;700&display=swap";
    l.rel = "stylesheet";
    document.head.appendChild(l);
  }, []);

  useEffect(() => {
    const handler = () => {
      if (containerRef.current) setScrollY(containerRef.current.scrollTop);
    };
    const el = containerRef.current;
    if (el) el.addEventListener("scroll", handler, { passive: true });
    return () => { if (el) el.removeEventListener("scroll", handler); };
  }, []);

  const handleStart = () => {
    setStarted(true);
    const el = containerRef.current;
    if (!el) return;
    const start = el.scrollTop;
    const target = window.innerHeight * 0.85;
    const distance = target - start;
    const duration = 2500;
    let startTime = null;
    const ease = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2;
    const step = ts => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      el.scrollTop = start + distance * ease(p);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const landingOpacity = Math.max(0, 1 - scrollY / (vh * 0.55));

  return (
    <>
      <style>{`
        @keyframes float { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-14px) } }
        @keyframes twinkle { 0%,100% { opacity:0.15 } 50% { opacity:1 } }
        @keyframes pulse { 0%,100% { transform:scale(1) } 50% { transform:scale(1.08) } }
        @keyframes drift { 0% { transform:translateX(0) } 50% { transform:translateX(25px) } 100% { transform:translateX(0) } }
        @keyframes bounceDown { 0%,100% { transform:translateY(0) } 50% { transform:translateY(6px) } }
        @keyframes heartFloat { 0%,100% { transform:translateY(0) rotate(0deg) } 25% { transform:translateY(-8px) rotate(5deg) } 75% { transform:translateY(4px) rotate(-3deg) } }
        * { box-sizing:border-box; margin:0; padding:0 }
        ::-webkit-scrollbar { width:5px }
        ::-webkit-scrollbar-track { background:transparent }
        ::-webkit-scrollbar-thumb { background:#F7B5C7; border-radius:3px }
      `}</style>

      <div ref={containerRef} style={{ width:"100%", height:"100vh", overflowY:"auto", overflowX:"hidden" }}>
        <div style={{ width:"100%", height:WORLD_HEIGHT, position:"relative" }}>

          {/* ===== TILING MAP BACKGROUND ===== */}
          <div style={{
            position: "absolute",
            top: MAP_START - 100,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#8CD4A8",
            backgroundImage: `url(${MAP_IMG})`,
            backgroundSize: "100.5% auto",
            backgroundRepeat: "repeat-y",
            backgroundPosition: "top center",
          }} />

          {/* ===== SKY / LANDING BACKGROUND ===== */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: LANDING_HEIGHT + 200,
            background: "linear-gradient(180deg, #FDECD0 0%, #F7C5C0 30%, #F0A8B0 60%, #E89CAA 80%, #E090A0 100%)",
            zIndex: 1,
          }} />

          {/* ===== SKY PARALLAX LAYER ===== */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "220vh",
            pointerEvents: "none",
            zIndex: 2,
            transform: `translateY(${-scrollY * 0.35}px)`,
          }}>
            <SoftCloud width={200} opacity={0.9} style={{ position:"absolute", top:"6%", left:"3%", animation:"drift 14s ease-in-out infinite" }} />
            <SoftCloud width={260} opacity={0.85} style={{ position:"absolute", top:"3%", right:"5%", animation:"drift 18s ease-in-out infinite 3s" }} />
            <SoftCloud width={150} opacity={0.75} style={{ position:"absolute", top:"15%", left:"38%", animation:"drift 12s ease-in-out infinite 5s" }} />
            <SoftCloud width={190} opacity={0.8} style={{ position:"absolute", top:"22%", right:"18%", animation:"drift 16s ease-in-out infinite 2s" }} />
            <SoftCloud width={170} opacity={0.7} style={{ position:"absolute", top:"30%", left:"8%", animation:"drift 13s ease-in-out infinite 4s" }} />
            <SoftCloud width={220} opacity={0.65} style={{ position:"absolute", top:"35%", right:"3%", animation:"drift 15s ease-in-out infinite 1s" }} />

            {/* Floating pixel hearts in sky */}
            {[...Array(10)].map((_, i) => (
              <PixelHeart key={`fh${i}`} size={16 + (i % 3) * 10}
                color={["#F7B5C7","#FFD5E0","#F7A0B8","#E87090"][i % 4]}
                style={{
                  position: "absolute",
                  top: `${5 + (i * 7) % 32}%`,
                  left: `${6 + (i * 13) % 82}%`,
                  animation: `heartFloat ${3 + i % 3}s ease-in-out infinite ${i * 0.5}s`,
                  opacity: 0.3 + (i % 3) * 0.12,
                }}
              />
            ))}

            {/* Sparkles */}
            {[...Array(14)].map((_, i) => (
              <PixelSparkle key={`sp${i}`} size={6 + (i % 3) * 3}
                style={{
                  position: "absolute",
                  top: `${3 + (i * 5) % 36}%`,
                  left: `${4 + (i * 11) % 88}%`,
                  animation: `twinkle ${2 + i % 3}s ease-in-out infinite ${i * 0.4}s`,
                }}
              />
            ))}
          </div>

          {/* ===== CLOUD TRANSITION into map ===== */}
          <div style={{
            position: "absolute",
            top: LANDING_HEIGHT - 150,
            left: 0,
            right: 0,
            height: 700,
            pointerEvents: "none",
            zIndex: 6,
          }}>
            {/* Top row - wide clouds covering full width including sides */}
            <SoftCloud width={700} opacity={0.3} style={{ position:"absolute", top:"0%", left:"-20%", animation:"drift 22s ease-in-out infinite" }} />
            <SoftCloud width={700} opacity={0.3} style={{ position:"absolute", top:"0%", right:"-20%", animation:"drift 20s ease-in-out infinite 1s" }} />
            <SoftCloud width={600} opacity={0.28} style={{ position:"absolute", top:"5%", left:"0%", animation:"drift 18s ease-in-out infinite 3s" }} />
            <SoftCloud width={600} opacity={0.28} style={{ position:"absolute", top:"5%", right:"0%", animation:"drift 24s ease-in-out infinite 2s" }} />

            {/* Near map start - full coverage */}
            <SoftCloud width={650} opacity={0.28} style={{ position:"absolute", top:"14%", left:"-18%", animation:"drift 21s ease-in-out infinite 4s" }} />
            <SoftCloud width={650} opacity={0.28} style={{ position:"absolute", top:"14%", right:"-18%", animation:"drift 19s ease-in-out infinite 2s" }} />
            <SoftCloud width={550} opacity={0.26} style={{ position:"absolute", top:"18%", left:"5%", animation:"drift 17s ease-in-out infinite 5s" }} />
            <SoftCloud width={550} opacity={0.26} style={{ position:"absolute", top:"18%", right:"5%", animation:"drift 23s ease-in-out infinite 1s" }} />

            {/* Below map start - thinning */}
            <SoftCloud width={500} opacity={0.24} style={{ position:"absolute", top:"30%", left:"-10%", animation:"drift 18s ease-in-out infinite 3s" }} />
            <SoftCloud width={500} opacity={0.24} style={{ position:"absolute", top:"30%", right:"-10%", animation:"drift 22s ease-in-out infinite 5s" }} />
            <SoftCloud width={450} opacity={0.22} style={{ position:"absolute", top:"38%", left:"5%", animation:"drift 20s ease-in-out infinite 1s" }} />
            <SoftCloud width={450} opacity={0.22} style={{ position:"absolute", top:"38%", right:"5%", animation:"drift 19s ease-in-out infinite 4s" }} />

            {/* Wisps */}
            <SoftCloud width={400} opacity={0.18} style={{ position:"absolute", top:"50%", left:"-5%", animation:"drift 17s ease-in-out infinite 2s" }} />
            <SoftCloud width={400} opacity={0.18} style={{ position:"absolute", top:"50%", right:"-5%", animation:"drift 21s ease-in-out infinite 3s" }} />
            <SoftCloud width={350} opacity={0.14} style={{ position:"absolute", top:"60%", left:"8%", animation:"drift 19s ease-in-out infinite 5s" }} />
            <SoftCloud width={350} opacity={0.14} style={{ position:"absolute", top:"60%", right:"8%", animation:"drift 16s ease-in-out infinite 1s" }} />

            {/* Ghost wisps */}
            <SoftCloud width={300} opacity={0.08} style={{ position:"absolute", top:"72%", left:"5%", animation:"drift 18s ease-in-out infinite 4s" }} />
            <SoftCloud width={300} opacity={0.08} style={{ position:"absolute", top:"72%", right:"5%", animation:"drift 20s ease-in-out infinite 2s" }} />
            <SoftCloud width={250} opacity={0.05} style={{ position:"absolute", top:"84%", left:"15%", animation:"drift 17s ease-in-out infinite 3s" }} />
            <SoftCloud width={250} opacity={0.05} style={{ position:"absolute", top:"84%", right:"15%", animation:"drift 19s ease-in-out infinite 5s" }} />
          </div>

          {/* ===== LANDING PAGE ===== */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: landingOpacity,
            pointerEvents: landingOpacity < 0.2 ? "none" : "auto",
            zIndex: 10,
          }}>
            <h1 style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "clamp(20px, 5vw, 36px)",
              color: "#D4627A",
              textAlign: "center",
              lineHeight: 1.7,
              textShadow: "2px 2px 0 rgba(212,98,122,0.12)",
              marginBottom: 28,
            }}>
              Valentine&#39;s<br />Scroll<br />Adventure
            </h1>
            <p style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 18, color: "#8B5E6B", fontWeight: 600 }}>Made by</p>
            <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "clamp(18px, 4vw, 28px)", color: "#F7A0B8", margin: "6px 0" }}>Jake</p>
            <PixelHeart size={28} style={{ margin: "4px 0" }} />
            <p style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 18, color: "#8B5E6B", fontWeight: 600 }}>for</p>
            <p style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "clamp(18px, 4vw, 28px)", color: "#F7A0B8", margin: "6px 0 28px" }}>Emma</p>
            <button
              onClick={handleStart}
              style={{
                fontFamily: "'Press Start 2P', monospace",
                fontSize: 15,
                padding: "18px 52px",
                background: "linear-gradient(135deg, #F7A0B8, #F08098)",
                border: "none",
                borderRadius: 8,
                color: "white",
                cursor: "pointer",
                boxShadow: "0 6px 0 #D05070, 0 10px 25px rgba(212,98,122,0.3)",
                animation: "pulse 2.5s ease-in-out infinite",
              }}
              onMouseDown={e => { e.currentTarget.style.transform = "translateY(3px)"; e.currentTarget.style.boxShadow = "0 3px 0 #D05070"; }}
              onMouseUp={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 0 #D05070, 0 10px 25px rgba(212,98,122,0.3)"; }}
            >
              Start Journey
            </button>
            <p style={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: 14,
              color: "#B8868F",
              marginTop: 36,
              fontWeight: 500,
              animation: "bounceDown 2s ease-in-out infinite",
            }}>
              Scroll down to begin your adventure ↓
            </p>
          </div>

        </div>
      </div>
    </>
  );
}
