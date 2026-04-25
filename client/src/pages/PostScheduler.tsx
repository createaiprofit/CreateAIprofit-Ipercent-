import { useState } from "react";

// ─── AFFILIATE LINKS ──────────────────────────────────────────────────────────
const AFFILIATE_LINKS = [
  { key: "cap", label: "CreateAIProfit Course", url: "https://createaiprofit.com/join" },
  { key: "luxe", label: "LuxeSin Membership", url: "https://luxesin.com/vip" },
  { key: "eai", label: "eAIProfit Tools", url: "https://eaiprofit.com/tools" },
  { key: "ecap", label: "eCapital Fund", url: "https://ecapital.com/invest" },
  { key: "airbnb", label: "Airbnb Host Program", url: "https://airbnb.com/host" },
];

// ─── FEMALE AVATARS (8 Host Bots — Suits + Sunglasses, Machiavelli Prompt) ───
const FEMALE_AVATARS = [
  { id: "f1", name: "Aria Voss", city: "New York", platform: "TikTok / IG", active: true },
  { id: "f2", name: "Zara Okafor", city: "London", platform: "TikTok / X", active: true },
  { id: "f3", name: "Mia Chen", city: "Singapore", platform: "IG / LinkedIn", active: true },
  { id: "f4", name: "Lena Moreau", city: "Paris", platform: "TikTok / IG", active: true },
  { id: "f5", name: "Sofia Reyes", city: "Miami", platform: "TikTok / IG", active: false },
  { id: "f6", name: "Nadia Petrov", city: "Dubai", platform: "IG / X", active: true },
  { id: "f7", name: "Yuki Tanaka", city: "Tokyo", platform: "TikTok / IG", active: true },
  { id: "f8", name: "Amara Diallo", city: "Lagos", platform: "TikTok / IG", active: false },
];

// ─── OUTFIT ROTATION ──────────────────────────────────────────────────────────
const OUTFITS = [
  { tag: "Black Power Suit + Aviators" },
  { tag: "White Blazer + Cat-Eye Shades" },
  { tag: "Navy Pinstripe + Gold Frames" },
  { tag: "Charcoal Suit + Oversized Sunglasses" },
];

function getCurrentOutfit(id: string) {
  const day = new Date().getDay();
  const idx = (id.charCodeAt(1) + day) % OUTFITS.length;
  return OUTFITS[idx];
}

// ─── TOAST HELPER ─────────────────────────────────────────────────────────────
const toast = {
  success: (msg: string) => console.log("[toast:success]", msg),
  info: (msg: string) => console.log("[toast:info]", msg),
  error: (msg: string) => console.error("[toast:error]", msg),
};

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function PostScheduler() {
  const [activeTab, setActiveTab] = useState<"schedule" | "affiliate" | "bots">("schedule");

  const TABS = [
    { id: "schedule" as const, label: "Post Schedule" },
    { id: "affiliate" as const, label: "Affiliate Links" },
    { id: "bots" as const, label: "Bot Roster" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "#fff",
      fontFamily: "'Rajdhani', sans-serif",
      padding: "2rem",
    }}>
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ fontSize: "0.6rem", letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.5rem" }}>
          War Room · Bot Engine
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, letterSpacing: "0.05em", margin: 0 }}>
          Post Scheduler
        </h1>
        <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", marginTop: "0.5rem" }}>
          Manage affiliate links, bot rosters, and post scheduling for the 8 female host bots.
        </p>
      </div>

      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: "transparent",
              border: "none",
              borderBottom: activeTab === tab.id ? "2px solid #b8860b" : "2px solid transparent",
              color: activeTab === tab.id ? "#fff" : "rgba(255,255,255,0.4)",
              padding: "0.75rem 1.5rem",
              fontSize: "0.75rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "schedule" && (
        <div>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }}>
            Posting Schedule — All 8 Host Bots
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.5rem", marginBottom: "1.5rem" }}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
              <div key={day} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", padding: "1rem 0.5rem", textAlign: "center" }}>
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.5rem" }}>{day}</div>
                <div style={{ fontSize: "0.8rem", color: "#b8860b" }}>3 posts</div>
                <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", marginTop: "0.25rem" }}>9am · 1pm · 7pm</div>
              </div>
            ))}
          </div>
          <div style={{ padding: "1rem 1.5rem", background: "rgba(184,134,11,0.05)", border: "1px solid rgba(184,134,11,0.2)", fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>
            <strong style={{ color: "#b8860b" }}>Machiavelli Prompt Active</strong> — All 8 female host bots post affiliate marketing content. Suit + sunglasses uniform enforced.
          </div>
        </div>
      )}

      {activeTab === "affiliate" && (
        <div>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }}>
            Affiliate Link Registry — 20% Commission Per Conversion
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                {["Product", "Link", "Commission", "Action"].map(h => (
                  <th key={h} style={{ padding: "0.75rem 1rem", textAlign: "left", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {AFFILIATE_LINKS.map(link => (
                <tr key={link.key} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <td style={{ padding: "0.9rem 1rem", fontSize: "0.9rem" }}>{link.label}</td>
                  <td style={{ padding: "0.9rem 1rem", color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", fontFamily: "monospace" }}>{link.url}</td>
                  <td style={{ padding: "0.9rem 1rem", color: "#4ade80", fontSize: "0.8rem" }}>20%</td>
                  <td style={{ padding: "0.9rem 1rem" }}>
                    <button onClick={() => { navigator.clipboard.writeText(link.url); toast.success("Link copied!"); }} style={{
                      background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
                      color: "rgba(255,255,255,0.5)", padding: "0.3rem 0.75rem",
                      fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer",
                    }}>
                      Copy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "bots" && (
        <div>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }}>
            Female-Only Bot Roster — 8 Active · Scale to 50 on Traffic Spike
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
            {FEMALE_AVATARS.map(av => {
              const outfit = getCurrentOutfit(av.id);
              return (
                <div key={av.id} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", padding: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                    <div>
                      <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>{av.name}</div>
                      <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginTop: "0.2rem" }}>{av.city}</div>
                    </div>
                    <span style={{ color: av.active ? "#4ade80" : "#f87171", fontSize: "0.65rem", letterSpacing: "0.15em" }}>
                      ● {av.active ? "Active" : "Paused"}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>Platform: {av.platform}</div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.75rem" }}>Wearing: {outfit.tag}</div>
                  <button
                    onClick={() => toast.info(`${av.name} ${av.active ? "paused" : "resumed"}.`)}
                    style={{
                      width: "100%", background: "transparent", border: "1px solid rgba(255,255,255,0.12)",
                      color: "rgba(255,255,255,0.5)", padding: "0.5rem",
                      fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer",
                    }}
                  >
                    {av.active ? "Pause Bot" : "Resume Bot"}
                  </button>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: "1.5rem", padding: "1rem 1.5rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
            Scale rule: when daily traffic exceeds 10,000 unique visitors, auto-scale to 50 bots. Each new bot inherits the female-only roster, outfit rotation, and affiliate link assignment.
          </div>
        </div>
      )}
    </div>
  );
}
