import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";

const CAP_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663435070666/UKZTwoEXuGkRzDU2B5gMpQ/cap_logo_master_9abf3722.png";

const TRAILER_HOOKS = [
  "21 episodes. 21 systems. One app.",
  "The AI that earns while you sleep.",
  "Download the app. Start the series. Change your life.",
  "Every episode is a blueprint.",
  "The 1% don't watch. They build.",
];

export default function MiniSeries() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [activeTab, setActiveTab] = useState<"stars" | "costars">("stars");
  const [hoveredStar, setHoveredStar] = useState<string | null>(null);
  const [hookIdx, setHookIdx] = useState(0);
  const [cameoPlaying, setCameoPlaying] = useState<string | null>(null);
  const cameoTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHookIdx(i => (i + 1) % TRAILER_HOOKS.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  const playCameoIntro = (id: string) => {
    setCameoPlaying(id);
    if (cameoTimerRef.current) clearTimeout(cameoTimerRef.current);
    cameoTimerRef.current = setTimeout(() => setCameoPlaying(null), 10000);
    // Siren-style audio for Kobe; funky bass for Katt
    try {
      const ctx = new AudioContext();
      if (id === "kobe") {
        // Deep dramatic bass hit
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = "sine"; osc.frequency.setValueAtTime(55, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.5);
        gain.gain.setValueAtTime(0.6, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 3);
        osc.start(); osc.stop(ctx.currentTime + 3);
      } else {
        // Funky wah-wah for Katt
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();
        osc.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
        osc.type = "sawtooth"; osc.frequency.setValueAtTime(110, ctx.currentTime);
        filter.type = "bandpass"; filter.frequency.setValueAtTime(400, ctx.currentTime);
        filter.frequency.setValueAtTime(1200, ctx.currentTime + 0.3);
        filter.frequency.setValueAtTime(400, ctx.currentTime + 0.6);
        filter.frequency.setValueAtTime(1200, ctx.currentTime + 0.9);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 3);
        osc.start(); osc.stop(ctx.currentTime + 3);
      }
    } catch { /* blocked */ }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "transparent",
      color: "#ffffff",
      fontFamily: "'Cormorant Garamond', serif",
      paddingTop: "64px",
    }}>
      {/* ── CHECKERBOARD — full opacity, glides behind Aria ── */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(45deg, rgba(255,255,255,0.055) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,0.055) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.055) 75%), linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.055) 75%)",
        backgroundSize: "60px 60px",
        backgroundPosition: "0 0, 0 30px, 30px -30px, -30px 0px",
        animation: "chessGlide 18s linear infinite",
      }} />
      {/* Chess pieces floating layer */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        display: "flex", flexWrap: "wrap", alignContent: "flex-start",
        fontSize: "2.2rem",
        gap: "3.5rem",
        padding: "2rem",
        animation: "chessGlide 22s linear infinite reverse",
        overflow: "hidden",
      }}>
        {["♟","♞","♝","♜","♛","♚","♙","♘","♗","♖","♕","♔","♟","♞","♝","♜","♛","♚","♙","♘","♗","♖","♕","♔","♟","♞","♝","♜","♛","♚","♙","♘","♗","♖","♕","♔"].map((p, i) => (
          <span key={i} style={{ color: i % 2 === 0 ? "rgba(255,255,255,0.18)" : "rgba(200,160,60,0.22)", userSelect: "none" }}>{p}</span>
        ))}
      </div>
      {/* Aria Rabbit — top-center, 70% width, 0.60 opacity, red hair filter, full scene */}
      <div style={{
        position: "fixed", top: 0, left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1, pointerEvents: "none",
        width: "70vw", maxWidth: "700px", minWidth: "280px",
        opacity: 0.60,
      }}>
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663435070666/UKZTwoEXuGkRzDU2B5gMpQ/aria_rabbit_redhead_2767_4703dc41.jpg"
          alt="Aria Rabbit"
          style={{
            width: "100%",
            objectFit: "contain",
            objectPosition: "top center",
            display: "block",
            filter: "hue-rotate(320deg) saturate(2.5) brightness(0.95)",
          }}
        />
      </div>
      {/* Radial glow */}
      <div style={{
        position: "fixed", top: "40%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "700px", height: "700px",
        background: "radial-gradient(circle, rgba(120,0,0,0.10) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      {/* Main content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Nav */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "0.75rem 0",
        }}>
          <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <img src={CAP_LOGO} alt="CAP" style={{ height: "36px", cursor: "pointer" }} onClick={() => navigate("/")} />
            <div style={{ fontSize: "0.75rem", letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
              Mini Series
            </div>
            <button onClick={() => navigate("/")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "0.7rem" }}>
              ← Home
            </button>
          </div>
        </nav>

        {/* Hero */}
        <div style={{ padding: "6rem 0 3rem", textAlign: "center" }}>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.6em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "1rem" }}>
            E Capital Venture · Flagship Launch Strategy
          </div>
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 300, letterSpacing: "0.05em", marginBottom: "1rem", lineHeight: 1.1 }}>
            21 Episodes.
          </h1>
          <p style={{ fontStyle: "italic", fontSize: "1.2rem", color: "rgba(255,255,255,0.5)", marginBottom: "2rem" }}>
            {TRAILER_HOOKS[0]}
          </p>
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email to get early access"
                style={{
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)",
                  color: "#fff", padding: "0.75rem 1.5rem", fontSize: "0.9rem",
                  outline: "none", minWidth: "280px",
                }}
              />
              <button type="submit" style={{
                background: "#b8860b", border: "none", color: "#000",
                padding: "0.75rem 2rem", fontSize: "0.8rem",
                letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", fontWeight: 700,
              }}>
                Download App
              </button>
            </form>
          ) : (
            <div style={{ color: "#b8860b", fontSize: "1rem", letterSpacing: "0.1em" }}>
              ✓ You're on the list. The app drops soon.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
