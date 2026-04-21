import { useState } from "react";
import { toast } from "sonner";

const AFFILIATE_LINKS = [
  { key: "suit1", label: "$5,000 Navy Velvet Suit — Brioni", url: "https://createaiprofit.com/vault/suit-brioni" },
  { key: "watch1", label: "$30,000 Rolex Datejust — Gold", url: "https://createaiprofit.com/vault/rolex-datejust" },
  { key: "tie1", label: "$500 Hermès Silk Tie", url: "https://createaiprofit.com/vault/hermes-tie" },
  { key: "cigar1", label: "$200 Cohiba Behike Cigar", url: "https://createaiprofit.com/vault/cohiba-behike" },
  { key: "cologne1", label: "$300 Confidence Cologne — CAP Edition", url: "https://createaiprofit.com/cologne" },
  { key: "shoes1", label: "$1,200 Berluti Oxford Shoes", url: "https://createaiprofit.com/vault/berluti-oxford" },
  { key: "cufflinks1", label: "$800 Cartier Gold Cufflinks", url: "https://createaiprofit.com/vault/cartier-cufflinks" },
  { key: "belt1", label: "$650 Louis Vuitton Monogram Belt", url: "https://createaiprofit.com/vault/lv-belt" },
];

const FEMALE_AVATARS = [
  { id: "la_reina", name: "La Reina", city: "Miami, FL", platform: "TikTok / Instagram", active: true },
  { id: "the_fox", name: "The Fox", city: "Las Vegas, NV", platform: "TikTok / YouTube", active: true },
  { id: "the_starlet", name: "The Starlet", city: "Hollywood, CA", platform: "Instagram / TikTok", active: true },
  { id: "the_queen", name: "The Queen", city: "Atlanta, GA", platform: "TikTok / Instagram", active: true },
  { id: "the_duchess", name: "The Duchess", city: "London, UK", platform: "Instagram / YouTube", active: false },
  { id: "la_vencedora", name: "La Vencedora", city: "Mexico City, MX", platform: "TikTok / Instagram", active: true },
  { id: "the_empress", name: "The Empress", city: "Tokyo, JP", platform: "TikTok / YouTube", active: true },
  { id: "the_oracle", name: "The Oracle", city: "Lagos, NG", platform: "TikTok / Instagram", active: false },
];

const OUTFITS = [
  { tag: "Navy Velvet Suit + Gold Chain + Aviator Shades" },
  { tag: "Charcoal Pinstripe Suit + Rolex + Wayfarers" },
  { tag: "All-Black Suit + Diamond Studs + Cat-Eye Shades" },
];

function getCurrentOutfit(_id: string) {
  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 3)) % OUTFITS.length;
  return OUTFITS[dayIndex];
}

export default function PostScheduler() {
  const [activeTab, setActiveTab] = useState<"links" | "bots">("links");

  return (
    <div style={{ background: "#000000", minHeight: "100vh", color: "#ffffff", fontFamily: "'Rajdhani', sans-serif", padding: "2rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <div style={{ fontSize: "0.65rem", letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "0.5rem" }}>War Room</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 300 }}>Post Scheduler</h1>
        <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginTop: "0.25rem" }}>Affiliate links and host bot management for the 8 affiliate host bots.</p>
      </div>
      <div style={{ display: "flex", gap: "0", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: "2rem" }}>
        {(["links", "bots"] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "0.75rem 1.5rem", background: "transparent", border: "none", borderBottom: activeTab === tab ? "2px solid #ffffff" : "2px solid transparent", color: activeTab === tab ? "#ffffff" : "rgba(255,255,255,0.35)", cursor: "pointer", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", fontFamily: "'Rajdhani', sans-serif" }}>
            {tab === "links" ? "Affiliate Links" : "Host Bots"}
          </button>
        ))}
      </div>
      <div>
        {activeTab === "links" && (
          <div>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }}>Golden Vault Affiliate Links — 8 Active Products · 20% Commission</div>
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
                      <button onClick={() => { navigator.clipboard.writeText(link.url); toast.success("Link copied!"); }} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", padding: "0.3rem 0.75rem", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>Copy</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === "bots" && (
          <div>
            <div style={{ fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "1rem" }}>Affiliate Host Bot Roster — 8 Bots · All Machiavelli Prompt · Affiliate CTA Only</div>
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
                      <span style={{ color: av.active ? "#4ade80" : "#f87171", fontSize: "0.65rem", letterSpacing: "0.15em" }}>● {av.active ? "Active" : "Paused"}</span>
                    </div>
                    <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>Platform: {av.platform}</div>
                    <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.75rem" }}>Wearing: {outfit.tag}</div>
                    <button onClick={() => toast.info(`${av.name} ${av.active ? "paused" : "resumed"}. Connect platform APIs to activate live posting.`)} style={{ width: "100%", background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.5)", padding: "0.5rem", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>
                      {av.active ? "Pause Bot" : "Resume Bot"}
                    </button>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: "1.5rem", padding: "1rem 1.5rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
              All 8 affiliate host bots are baby avatars in suits and sunglasses. They follow the same Machiavelli prompt as all 21 host bots. Their CTA is exclusively affiliate marketing for Golden Vault products.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
