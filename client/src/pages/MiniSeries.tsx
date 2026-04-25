import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";

const CAP_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663435070666/UKZTwoEXuGkRzDU2B5gMpQ/cap_logo_master_9abf3722.png";
const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663435070666/UKZTwoEXuGkRzDU2B5gMpQ/";

const TRAILER_HOOKS = [
  "They built the system. Now they're letting you in.",
  "21 episodes. Every secret. Nothing held back.",
  "The 1% don't hustle harder. They build smarter.",
  "Your wallet earns while you sleep. Watch Episode 1.",
  "The bots work. The system runs. You collect.",
  "This isn't a course. This is a movement.",
  "Stack silent. Move loud. Watch the series.",
];

const CAST_STARS = [
  { id: "la_reina", name: "La Reina", role: "The Closer", city: "Miami, FL", episodes: [1,3,7,12,18], bio: "She closes deals in four languages and never raises her voice.", color: "#e8a87c", img: CDN + "avatar_la_reina_v2-RQAaqhU5NiDB29qXHwdR9L.webp" },
  { id: "the_starlet", name: "The Starlet", role: "The Visionary", city: "Hollywood, CA", episodes: [2,5,9,14,19], bio: "She sees the system before it is built. Cinematic precision.", color: "#c9a96e", img: CDN + "cap_director_v2_b792c29b.png" },
  { id: "the_fox", name: "The Fox", role: "The Strategist", city: "Las Vegas, NV", episodes: [4,8,13,17,21], bio: "Every move calculated. Every episode a lesson in leverage.", color: "#b8a9d9", img: CDN + "avatar_fox_blonde_v2-MezpQqZSy4NzKAtZPG6X9h.webp" },
  { id: "the_queen", name: "The Queen", role: "The Architect", city: "Atlanta, GA", episodes: [6,10,15,20], bio: "She designed the Playground. She knows every room.", color: "#d4a0a0", img: CDN + "cap_king_v2_7b825da9.png" },
  { id: "the_closer", name: "The Closer", role: "The Operator", city: "New York, NY", episodes: [11,16], bio: "Cold calls, warm closes, and a system that never sleeps.", color: "#a8c5da", img: CDN + "cap_broker_v2_33e631cb.png" },
];

const CAST_COSTARS = [
  { id: "aria_rabbit", name: "Aria Rabbit", role: "Platform Host & CFO", city: "San Francisco, CA", episodes: [1,7,14,21], bio: "Aria Rabbit is the voice of the 1% Playground.", color: "#ff6b9d", img: CDN + "aria_rabbit_redhead_2767_4703dc41.jpg" },
  { id: "the_patriarch", name: "The Patriarch", role: "The Elder", city: "Chicago, IL", episodes: [3,12], bio: "Old money wisdom meets new money systems.", color: "#94A3AA", img: CDN + "cap_patriarch_v2_placeholder.png" },
  { id: "the_prince", name: "The Prince", role: "The Heir", city: "Dubai, UAE", episodes: [5,15], bio: "Born into wealth, building more.", color: "#ffd700", img: CDN + "cap_prince_v2_placeholder.png" },
  { id: "the_hammer", name: "The Hammer", role: "Chief Investment Officer", city: "New York, NY", episodes: [8,18], bio: "The CIO of the Syndicate. Drives returns, manages risk.", color: "#ff4444", img: CDN + "cap_cio_v2_placeholder.png" },
  { id: "the_rook", name: "The Rook", role: "The Enforcer", city: "Detroit, MI", episodes: [10,20], bio: "Quiet. Precise. Unstoppable.", color: "#888888", img: CDN + "cap_rook_v2_placeholder.png" },
  { id: "the_manila_closer", name: "The Manila Closer", role: "The International", city: "Manila, PH", episodes: [6,16], bio: "Closing deals across the Pacific Rim.", color: "#4ecdc4", img: CDN + "cap_manila_v2_placeholder.png" },
];

const EPISODES_LIST = [
  { ep:1, title:"The System Explained", duration:"2:00", stars:["La Reina","Aria Rabbit"], desc:"How E Capital Venture works from the ground up." },
  { ep:2, title:"AI That Pays You", duration:"2:00", stars:["The Starlet"], desc:"The AI engine that generates passive income 24/7." },
  { ep:3, title:"Affiliate Secrets", duration:"2:00", stars:["La Reina","The Patriarch"], desc:"Earn commissions on luxury goods without owning anything." },
  { ep:4, title:"The Wallet Economy", duration:"2:00", stars:["The Fox"], desc:"40% of bot earnings flow directly into your wallet." },
  { ep:5, title:"Club Vault Breakdown", duration:"2:00", stars:["The Starlet","The Prince"], desc:"Inside the luxury affiliate store." },
  { ep:6, title:"Wellness Bots & Passive Income", duration:"2:00", stars:["The Queen","The Manila Closer"], desc:"AI wellness bots pitch supplements at 5% below retail." },
  { ep:7, title:"Designer Clothes That Pay", duration:"2:00", stars:["La Reina","Aria Rabbit"], desc:"Saint Laurent, Tom Ford, Hermes - the bots earn on every click." },
  { ep:8, title:"Jewelry & Watches", duration:"2:00", stars:["The Fox","The Hammer"], desc:"Rolex, Cartier, Patek Philippe - curated affiliate listings." },
  { ep:9, title:"Real Estate AI Closer", duration:"2:00", stars:["The Starlet"], desc:"AI-powered scripts that close Airbnb and wholesale deals." },
  { ep:10, title:"The 1% Playground", duration:"2:00", stars:["The Queen","The Rook"], desc:"Inside the members-only social club." },
  { ep:11, title:"Bot Army Explained", duration:"2:00", stars:["The Closer"], desc:"21 host bots, 8 affiliate bots, 1,000 member bots." },
  { ep:12, title:"Your First $10,000", duration:"2:00", stars:["La Reina","The Patriarch"], desc:"The exact path from zero to $10K in your wallet." },
  { ep:13, title:"The Wallet Economy Part 2", duration:"2:00", stars:["The Fox"], desc:"Platform earns, you earn. 40% flows automatically." },
  { ep:14, title:"Confidence Cologne Story", duration:"2:00", stars:["The Starlet","Aria Rabbit"], desc:"The story behind the $300 bottle. Why it exists." },
  { ep:15, title:"CheckMate - AI Chess System", duration:"2:00", stars:["The Fox","The Prince"], desc:"AI chess coaching through the lens of power and business." },
  { ep:16, title:"Cold Call AI Closer", duration:"2:00", stars:["The Closer","The Manila Closer"], desc:"AI cold call scripts that never sleep and never flinch." },
  { ep:17, title:"Dropshipping With AI", duration:"2:00", stars:["The Fox"], desc:"AI-curated dropshipping. The bots find winners. You collect." },
  { ep:18, title:"Concierge Services Explained", duration:"2:00", stars:["La Reina","The Hammer"], desc:"Yacht charters, private jets, and galas - booked through the platform." },
  { ep:19, title:"The App - Full Walkthrough", duration:"2:00", stars:["The Starlet"], desc:"Every feature: wallet, social club, affiliate store, bot earnings." },
  { ep:20, title:"Social Club - Inside Access", duration:"2:00", stars:["The Queen","The Rook"], desc:"The feed, the members, the earnings, the culture." },
  { ep:21, title:"Stack Silent. Move Loud.", duration:"2:00", stars:["The Fox","Aria Rabbit"], desc:"Build the system. Let it run. Collect. Repeat." },
];

export default function MiniSeries() {
  const [, navigate] = useLocation();
  const [glitch, setGlitch] = useState(false);
  const [activeTab, setActiveTab] = useState<"stars" | "costars">("stars");
  const [hoveredStar, setHoveredStar] = useState<string | null>(null);
  const [hookIdx, setHookIdx] = useState(0);
  const [cameoPlaying, setCameoPlaying] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedEp, setSelectedEp] = useState<typeof EPISODES_LIST[0] | null>(null);
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
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(55, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.8);
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.5);
      osc.start(); osc.stop(ctx.currentTime + 2.5);
    } catch (_e) { /* blocked */ }
  };

  const activeCast = activeTab === "stars" ? CAST_STARS : CAST_COSTARS;

  return (
    <div style={{ minHeight: "100vh", background: "#000000", color: "#ffffff", fontFamily: "'Cormorant Garamond', serif", overflowX: "hidden" }}>
      <style>{`
        @keyframes chessGlide { 0% { transform: translate(0,0); } 100% { transform: translate(60px,60px); } }
        @keyframes hookFade { 0% { opacity:0; transform:translateY(8px); } 15% { opacity:1; transform:translateY(0); } 85% { opacity:1; transform:translateY(0); } 100% { opacity:0; transform:translateY(-8px); } }
        @keyframes glitchFlash { 0%,100% { opacity:1; } 50% { opacity:0.4; filter:hue-rotate(90deg); } }
        .hook-text { animation: hookFade 3.8s ease-in-out infinite; }
        .glitch-active { animation: glitchFlash 0.2s steps(2) 1; }
      `}</style>

      <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", backgroundImage:"linear-gradient(45deg,rgba(255,255,255,0.04) 25%,transparent 25%),linear-gradient(-45deg,rgba(255,255,255,0.04) 25%,transparent 25%),linear-gradient(45deg,transparent 75%,rgba(255,255,255,0.04) 75%),linear-gradient(-45deg,transparent 75%,rgba(255,255,255,0.04) 75%)", backgroundSize:"60px 60px", backgroundPosition:"0 0,0 30px,30px -30px,-30px 0px", animation:"chessGlide 18s linear infinite" }} />
      <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", display:"flex", flexWrap:"wrap", alignContent:"flex-start", fontSize:"2.2rem", gap:"3.5rem", padding:"2rem", animation:"chessGlide 22s linear infinite reverse", overflow:"hidden" }}>
        {["♟","♞","♝","♜","♛","♚","♙","♘","♗","♖","♕","♔","♟","♞","♝","♜","♛","♚","♙","♘","♗","♖","♕","♔","♟","♞","♝","♜","♛","♚","♙","♘","♗","♖","♕","♔"].map((p,i) => (
          <span key={i} style={{ color: i%2===0 ? "rgba(255,255,255,0.12)" : "rgba(200,160,60,0.16)", userSelect:"none" }}>{p}</span>
        ))}
      </div>
      <div style={{ position:"fixed", top:0, left:"50%", transform:"translateX(-50%)", zIndex:1, pointerEvents:"none", width:"70vw", maxWidth:"700px", minWidth:"280px", opacity:0.55 }}>
        <img src={CDN+"aria_rabbit_redhead_2767_4703dc41.jpg"} alt="Aria Rabbit" style={{ width:"100%", objectFit:"contain", objectPosition:"top center", display:"block", filter:"hue-rotate(320deg) saturate(2.5) brightness(0.9)" }} />
      </div>
      <div style={{ position:"fixed", top:"40%", left:"50%", transform:"translate(-50%,-50%)", width:"700px", height:"700px", background:"radial-gradient(circle,rgba(120,0,0,0.12) 0%,transparent 70%)", pointerEvents:"none", zIndex:0 }} />

      <nav style={{ position:"sticky", top:0, zIndex:50, background:"rgba(0,0,0,0.88)", backdropFilter:"blur(16px)", borderBottom:"1px solid rgba(255,255,255,0.06)", padding:"0.75rem 0" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"0 1.5rem", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <img src={CAP_LOGO} alt="CAP" style={{ height:"34px", width:"34px", objectFit:"contain", cursor:"pointer" }} onClick={() => navigate("/")} />
          <div style={{ fontSize:"0.65rem", letterSpacing:"0.6em", textTransform:"uppercase", color:"rgba(255,255,255,0.3)" }}>The Mini Series</div>
          <button onClick={() => navigate("/episodes")} style={{ background:"none", border:"1px solid rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.5)", cursor:"pointer", fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase", padding:"0.4rem 0.9rem", fontFamily:"'Rajdhani',sans-serif" }}>All 21 Episodes</button>
        </div>
      </nav>

      <div style={{ position:"relative", zIndex:2, textAlign:"center", padding:"5rem 1.5rem 3rem" }}>
        <div style={{ fontSize:"0.65rem", letterSpacing:"0.7em", textTransform:"uppercase", color:"rgba(255,255,255,0.2)", marginBottom:"1rem" }}>E Capital Venture · CreateAIProfit.com</div>
        <h1 className={glitch ? "glitch-active" : ""} style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(3rem,8vw,6rem)", fontWeight:300, lineHeight:1.05, color:"#ffffff", marginBottom:"0.5rem", textShadow:"0 0 60px rgba(120,0,0,0.4)" }}>The 1% Playground</h1>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1rem,2.5vw,1.4rem)", fontStyle:"italic", color:"rgba(255,255,255,0.35)", marginBottom:"2.5rem" }}>21 Episodes · 2 Minutes Each · The Entire System</div>
        <div style={{ height:"2.5rem", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"2.5rem" }}>
          <p key={hookIdx} className="hook-text" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(1rem,2vw,1.25rem)", fontStyle:"italic", color:"rgba(255,255,255,0.6)" }}>"{TRAILER_HOOKS[hookIdx]}"</p>
        </div>
        <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={() => navigate("/episodes")} style={{ padding:"1rem 2.5rem", background:"#ffffff", color:"#000000", border:"none", cursor:"pointer", fontFamily:"'Rajdhani',sans-serif", fontSize:"0.8rem", letterSpacing:"0.35em", textTransform:"uppercase", fontWeight:600 }}>Watch All 21 Episodes</button>
          <button onClick={() => navigate("/subscribe")} style={{ padding:"1rem 2.5rem", background:"transparent", color:"rgba(255,255,255,0.6)", border:"1px solid rgba(255,255,255,0.2)", cursor:"pointer", fontFamily:"'Rajdhani',sans-serif", fontSize:"0.8rem", letterSpacing:"0.35em", textTransform:"uppercase" }}>Join the 1% Playground</button>
        </div>
      </div>

      <div style={{ position:"relative", zIndex:2, maxWidth:"1100px", margin:"0 auto", padding:"2rem 1.5rem" }}>
        <div style={{ fontSize:"0.65rem", letterSpacing:"0.5em", textTransform:"uppercase", color:"rgba(255,255,255,0.2)", marginBottom:"1.5rem", textAlign:"center" }}>21 Two-Minute Episodes · The Complete Marketing Series</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"1px", background:"rgba(255,255,255,0.06)" }}>
          {EPISODES_LIST.map(ep => (
            <div key={ep.ep} onClick={() => setSelectedEp(ep)} style={{ background:"#000000", padding:"1.5rem", cursor:"pointer", transition:"background 0.2s" }} onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background="rgba(255,255,255,0.04)"; }} onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background="#000000"; }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"0.75rem" }}>
                <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:300, color:"rgba(255,255,255,0.12)", lineHeight:1 }}>{String(ep.ep).padStart(2,"0")}</span>
                <span style={{ fontSize:"0.65rem", letterSpacing:"0.2em", color:"rgba(255,255,255,0.25)", fontFamily:"'Rajdhani',sans-serif" }}>{ep.duration}</span>
              </div>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.1rem", fontWeight:400, color:"#ffffff", marginBottom:"0.4rem" }}>{ep.title}</h3>
              <p style={{ fontSize:"0.75rem", color:"rgba(255,255,255,0.35)", lineHeight:1.5, marginBottom:"0.75rem", fontFamily:"'Rajdhani',sans-serif" }}>{ep.desc}</p>
              <div style={{ fontSize:"0.6rem", letterSpacing:"0.15em", color:"rgba(255,255,255,0.2)", fontFamily:"'Rajdhani',sans-serif" }}>{ep.stars.join(" · ")}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position:"relative", zIndex:2, maxWidth:"1100px", margin:"0 auto", padding:"3rem 1.5rem" }}>
        <div style={{ textAlign:"center", marginBottom:"2rem" }}>
          <div style={{ fontSize:"0.65rem", letterSpacing:"0.5em", textTransform:"uppercase", color:"rgba(255,255,255,0.2)", marginBottom:"0.75rem" }}>The Cast</div>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:300, color:"#ffffff" }}>Actors. Not Bots.</h2>
          <p style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:"0.8rem", color:"rgba(255,255,255,0.3)", marginTop:"0.5rem" }}>Mini Series cast follow the Mini Series Prompt exclusively. Their purpose: make you watch, get hooked, download the app.</p>
        </div>
        <div style={{ display:"flex", gap:0, borderBottom:"1px solid rgba(255,255,255,0.08)", marginBottom:"2rem", justifyContent:"center" }}>
          {(["stars","costars"] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding:"0.75rem 2rem", background:"transparent", border:"none", borderBottom: activeTab===tab ? "2px solid #ffffff" : "2px solid transparent", color: activeTab===tab ? "#ffffff" : "rgba(255,255,255,0.3)", cursor:"pointer", fontSize:"0.7rem", letterSpacing:"0.35em", textTransform:"uppercase", fontFamily:"'Rajdhani',sans-serif" }}>{tab==="stars" ? "Stars" : "Co-Stars"}</button>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:"1.5rem" }}>
          {activeCast.map(cast => (
            <div key={cast.id} onMouseEnter={() => setHoveredStar(cast.id)} onMouseLeave={() => setHoveredStar(null)} onClick={() => playCameoIntro(cast.id)} style={{ cursor:"pointer", transform: hoveredStar===cast.id ? "translateY(-4px)" : "translateY(0)", transition:"transform 0.3s" }}>
              <div style={{ position:"relative", marginBottom:"1rem", border: cameoPlaying===cast.id ? `2px solid ${cast.color}` : "2px solid rgba(255,255,255,0.06)", transition:"border-color 0.3s" }}>
                <img src={cast.img} alt={cast.name} style={{ width:"100%", aspectRatio:"3/4", objectFit:"cover", objectPosition:"top", display:"block" }} onError={e => { (e.target as HTMLImageElement).style.display="none"; }} />
                {cameoPlaying===cast.id && (
                  <div style={{ position:"absolute", inset:0, background:`linear-gradient(to top,${cast.color}33,transparent)`, display:"flex", alignItems:"flex-end", padding:"1rem" }}>
                    <span style={{ fontSize:"0.65rem", letterSpacing:"0.2em", color:cast.color, fontFamily:"'Rajdhani',sans-serif" }}>INTRO PLAYING</span>
                  </div>
                )}
                <div style={{ position:"absolute", top:"0.5rem", right:"0.5rem", background:"rgba(0,0,0,0.7)", padding:"0.2rem 0.5rem", fontSize:"0.55rem", letterSpacing:"0.2em", color:cast.color, fontFamily:"'Rajdhani',sans-serif", textTransform:"uppercase" }}>Mini Series</div>
              </div>
              <div style={{ fontSize:"1rem", fontWeight:400, color:"#ffffff", marginBottom:"0.2rem" }}>{cast.name}</div>
              <div style={{ fontSize:"0.65rem", letterSpacing:"0.2em", textTransform:"uppercase", color:cast.color, marginBottom:"0.25rem", fontFamily:"'Rajdhani',sans-serif" }}>{cast.role}</div>
              <div style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.3)", fontFamily:"'Rajdhani',sans-serif" }}>{cast.city}</div>
              <div style={{ fontSize:"0.65rem", color:"rgba(255,255,255,0.2)", marginTop:"0.35rem", fontFamily:"'Rajdhani',sans-serif" }}>Eps: {cast.episodes.join(", ")}</div>
              <p style={{ fontSize:"0.75rem", color:"rgba(255,255,255,0.35)", lineHeight:1.6, marginTop:"0.5rem", fontFamily:"'Rajdhani',sans-serif" }}>{cast.bio}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position:"relative", zIndex:2, maxWidth:"560px", margin:"0 auto", padding:"3rem 1.5rem 6rem", textAlign:"center" }}>
        <div style={{ fontSize:"0.65rem", letterSpacing:"0.5em", textTransform:"uppercase", color:"rgba(255,255,255,0.2)", marginBottom:"1rem" }}>Get Notified</div>
        <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"1.75rem", fontWeight:300, color:"#ffffff", marginBottom:"0.5rem" }}>New Episodes Drop Weekly</h3>
        <p style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:"0.8rem", color:"rgba(255,255,255,0.35)", marginBottom:"2rem" }}>Be the first to watch. Join the 1% Playground early access list.</p>
        {submitted ? (
          <div style={{ padding:"1.5rem", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.6)", fontFamily:"'Rajdhani',sans-serif", fontSize:"0.85rem", letterSpacing:"0.2em" }}>You are on the list. Watch your inbox.</div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display:"flex", gap:"0.5rem" }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required style={{ flex:1, padding:"0.85rem 1rem", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.12)", color:"#ffffff", fontFamily:"'Rajdhani',sans-serif", fontSize:"0.85rem", outline:"none" }} />
            <button type="submit" style={{ padding:"0.85rem 1.5rem", background:"#ffffff", color:"#000000", border:"none", cursor:"pointer", fontFamily:"'Rajdhani',sans-serif", fontSize:"0.75rem", letterSpacing:"0.3em", textTransform:"uppercase", fontWeight:600 }}>Notify Me</button>
          </form>
        )}
      </div>

      {selectedEp && (
        <div onClick={() => setSelectedEp(null)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.88)", zIndex:100, display:"flex", alignItems:"center", justifyContent:"center", padding:"2rem" }}>
          <div onClick={e => e.stopPropagation()} style={{ background:"#0a0a0a", border:"1px solid rgba(255,255,255,0.1)", padding:"3rem", maxWidth:"520px", width:"100%" }}>
            <div style={{ fontSize:"0.6rem", letterSpacing:"0.4em", textTransform:"uppercase", color:"rgba(255,255,255,0.2)", marginBottom:"0.75rem", fontFamily:"'Rajdhani',sans-serif" }}>Episode {String(selectedEp.ep).padStart(2,"0")} · {selectedEp.duration}</div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"2rem", fontWeight:300, color:"#ffffff", marginBottom:"1rem" }}>{selectedEp.title}</h2>
            <p style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:"0.9rem", color:"rgba(255,255,255,0.5)", lineHeight:1.8, marginBottom:"1.5rem" }}>{selectedEp.desc}</p>
            <div style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.3)", fontFamily:"'Rajdhani',sans-serif", marginBottom:"2rem" }}>Starring: {selectedEp.stars.join(" · ")}</div>
            <div style={{ display:"flex", gap:"1rem" }}>
              <button onClick={() => navigate("/episodes")} style={{ flex:1, padding:"0.85rem", background:"#ffffff", color:"#000000", border:"none", cursor:"pointer", fontFamily:"'Rajdhani',sans-serif", fontSize:"0.75rem", letterSpacing:"0.3em", textTransform:"uppercase" }}>Watch Episode</button>
              <button onClick={() => setSelectedEp(null)} style={{ padding:"0.85rem 1.5rem", background:"transparent", color:"rgba(255,255,255,0.4)", border:"1px solid rgba(255,255,255,0.1)", cursor:"pointer", fontFamily:"'Rajdhani',sans-serif", fontSize:"0.75rem", letterSpacing:"0.3em", textTransform:"uppercase" }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
