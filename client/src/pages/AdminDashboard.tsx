import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";

// ─── STYLE HELPERS ────────────────────────────────────────────────────────────
const S = {
  btn: (variant: "gold" | "ghost" | "danger") => ({
    background:
      variant === "gold" ? "#b8860b" :
      variant === "danger" ? "rgba(248,113,113,0.15)" :
      "rgba(255,255,255,0.06)",
    border: `1px solid ${
      variant === "gold" ? "#b8860b" :
      variant === "danger" ? "rgba(248,113,113,0.4)" :
      "rgba(255,255,255,0.12)"
    }`,
    color: variant === "gold" ? "#000" : variant === "danger" ? "#f87171" : "rgba(255,255,255,0.7)",
    padding: "0.6rem 1.25rem",
    fontSize: "0.75rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    cursor: "pointer",
    fontFamily: "'Rajdhani', sans-serif",
    fontWeight: 600,
  }),
  badge: (bg: string) => ({
    background: bg,
    padding: "0.2rem 0.6rem",
    fontSize: "0.6rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    borderRadius: "2px",
  }),
};

function SectionHeader({ label, title, inline }: { label: string; title: string; inline?: boolean }) {
  return (
    <div style={{ marginBottom: inline ? 0 : "1.5rem" }}>
      <div style={{ fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.25rem" }}>{label}</div>
      <div style={{ fontSize: "1.25rem", fontWeight: 600, color: "#fff", letterSpacing: "0.05em" }}>{title}</div>
    </div>
  );
}

function Loader() {
  return <div style={{ color: "rgba(255,255,255,0.3)", padding: "2rem", textAlign: "center", fontSize: "0.8rem", letterSpacing: "0.2em" }}>Loading…</div>;
}

function Empty({ text }: { text: string }) {
  return <div style={{ color: "rgba(255,255,255,0.25)", padding: "2rem", textAlign: "center", fontSize: "0.85rem" }}>{text}</div>;
}

// ─── ALERTS TAB ───────────────────────────────────────────────────────────────
function AlertsTab() {
  const [unreadOnly, setUnreadOnly] = useState(false);
  const { data: alerts = [], isLoading, refetch } = trpc.warRoom.alerts.list.useQuery({ unreadOnly, limit: 50 });
  const markRead = trpc.warRoom.alerts.markRead.useMutation({ onSuccess: () => refetch() });
  const markAllRead = trpc.warRoom.alerts.markAllRead.useMutation({ onSuccess: () => refetch() });
  const SEVERITY_COLOR: Record<string, string> = {
    info: "rgba(59,130,246,0.2)", warning: "rgba(234,179,8,0.2)", critical: "rgba(248,113,113,0.2)",
  };
  const SEVERITY_TEXT: Record<string, string> = {
    info: "#60a5fa", warning: "#eab308", critical: "#f87171",
  };
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <SectionHeader label="System Alerts" title="War Room Notifications" inline />
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <button
            style={{ ...S.btn("ghost"), padding: "0.4rem 0.85rem", fontSize: "0.75rem", background: unreadOnly ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)" }}
            onClick={() => setUnreadOnly(!unreadOnly)}
          >
            {unreadOnly ? "Show All" : "Unread Only"}
          </button>
          <button style={S.btn("ghost")} onClick={() => markAllRead.mutate()}>Mark All Read</button>
        </div>
      </div>
      {isLoading ? <Loader /> : alerts.length === 0 ? <Empty text="No alerts. All clear." /> : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,255,255,0.04)" }}>
          {alerts.map(alert => (
            <div
              key={alert.id}
              style={{
                background: alert.read ? "#000000" : "rgba(255,255,255,0.02)",
                padding: "1rem 1.25rem",
                display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem",
                opacity: alert.read ? 0.5 : 1,
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.35rem" }}>
                  <span style={{ ...S.badge(SEVERITY_COLOR[alert.severity] ?? "rgba(255,255,255,0.1)"), color: SEVERITY_TEXT[alert.severity] ?? "#ffffff" }}>
                    {alert.severity}
                  </span>
                  <span style={{ fontSize: "0.9rem", color: "#ffffff", fontWeight: 600 }}>{alert.title}</span>
                  {!alert.read && (
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
                  )}
                </div>
                <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", marginBottom: "0.25rem" }}>{alert.message}</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)" }}>
                  {new Date(alert.createdAt).toLocaleString()}
                </div>
              </div>
              {!alert.read && (
                <button style={{ ...S.btn("ghost"), padding: "0.3rem 0.75rem", fontSize: "0.75rem", flexShrink: 0 }} onClick={() => markRead.mutate({ id: alert.id })}>
                  Mark Read
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── FINANCE TAB ─────────────────────────────────────────────────────────────
function FinanceTab() {
  const [grossInput, setGrossInput] = useState("");
  const [grossRevenue, setGrossRevenue] = useState<number | null>(null);
  const [note, setNote] = useState("");

  const calculate = () => {
    const gross = parseFloat(grossInput.replace(/[^0-9.]/g, ""));
    if (!isNaN(gross)) setGrossRevenue(gross);
  };

  const taxes = grossRevenue ? grossRevenue * 0.466 : null;
  const afterTax = grossRevenue && taxes ? grossRevenue - taxes : null;
  const memberWallets = afterTax ? afterTax * 0.4 : null;
  const surplus = afterTax ? afterTax * 0.4 : null;
  const businessChecking = afterTax ? afterTax * 0.2 : null;

  return (
    <div>
      <SectionHeader label="Revenue Calculator" title="Money Flow Engine" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: "1.5rem" }}>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.75rem" }}>
            Gross Revenue Input
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <input
              type="text"
              value={grossInput}
              onChange={e => setGrossInput(e.target.value)}
              placeholder="e.g. 100000"
              style={{
                flex: 1, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)",
                color: "#fff", padding: "0.6rem 1rem", fontSize: "1rem", outline: "none",
              }}
            />
            <button onClick={calculate} style={S.btn("gold")}>Calculate</button>
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: "1.5rem" }}>
          <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.75rem" }}>
            Notes
          </div>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Add finance notes..."
            style={{
              width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)",
              color: "#fff", padding: "0.6rem 1rem", fontSize: "0.85rem", outline: "none",
              resize: "vertical", minHeight: "60px", fontFamily: "inherit",
            }}
          />
        </div>
      </div>
      {grossRevenue !== null && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
          {[
            { label: "Gross Revenue", value: grossRevenue, color: "#fff" },
            { label: "Taxes (46.6%)", value: taxes, color: "#f87171" },
            { label: "After-Tax", value: afterTax, color: "#60a5fa" },
            { label: "Member Wallets (40%)", value: memberWallets, color: "#4ade80" },
            { label: "Surplus Reserve (40%)", value: surplus, color: "#b8860b" },
            { label: "Business Checking (20%)", value: businessChecking, color: "#a78bfa" },
          ].map(item => (
            <div key={item.label} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: "1.25rem" }}>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.5rem" }}>
                {item.label}
              </div>
              <div style={{ fontSize: "1.4rem", fontWeight: 700, color: item.color }}>
                ${item.value?.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </div>
            </div>
          ))}
        </div>
      )}
      <div style={{ marginTop: "1.5rem", padding: "1rem 1.5rem", background: "rgba(184,134,11,0.05)", border: "1px solid rgba(184,134,11,0.15)", fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
        <strong style={{ color: "#b8860b" }}>Policy:</strong> NO withdrawals from in-app wallet by anyone, ever. Member wallets accumulate and are used for subscription renewals only.
      </div>
    </div>
  );
}

// ─── BOT ENGINE TAB ───────────────────────────────────────────────────────────
function BotEngineTab() {
  const { data: rosterData, isLoading } = trpc.botEngine.roster.useQuery({ page: 0, limit: 50 });
  const bots = rosterData?.bots ?? [];
  return (
    <div>
      <SectionHeader label="Bot Engine" title="Active Bot Roster" />
      {isLoading ? <Loader /> : bots.length === 0 ? <Empty text="No bots configured." /> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
          {bots.map((bot: { id: string; name: string; handle: string; avatar: string; tier: string; isActive: boolean; postsToday: number; likesToday: number; commentsToday: number; lastAction: string }) => (
            <div key={bot.id} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: "1.25rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                <div>
                  <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#fff" }}>{bot.name}</div>
                  <div style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginTop: "0.2rem" }}>{bot.tier}</div>
                </div>
                <span style={{ color: bot.isActive ? "#4ade80" : "rgba(255,255,255,0.3)", fontSize: "0.65rem", letterSpacing: "0.15em" }}>
                  ● {bot.isActive ? "active" : "inactive"}
                </span>
              </div>
              {bot.lastAction && (
                <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)" }}>
                  Last active: {new Date(bot.lastAction).toLocaleString()}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const ADMIN_PASSWORD = "CAP2024admin";

export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<"bots" | "finance" | "alerts">("bots");
  const [mode, setMode] = useState<"website" | "app">("website");

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  if (!authenticated) {
    return (
      <div style={{
        minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Rajdhani', sans-serif",
      }}>
        <form onSubmit={handleAuth} style={{ textAlign: "center", width: "320px" }}>
          <div style={{ fontSize: "0.6rem", letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "2rem" }}>
            War Room Access
          </div>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter admin password"
            style={{
              width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${authError ? "#f87171" : "rgba(255,255,255,0.12)"}`,
              color: "#fff", padding: "0.75rem 1rem", fontSize: "1rem", outline: "none",
              marginBottom: "1rem", boxSizing: "border-box" as const,
            }}
          />
          {authError && <div style={{ color: "#f87171", fontSize: "0.8rem", marginBottom: "0.75rem" }}>Incorrect password.</div>}
          <button type="submit" style={{ ...S.btn("gold"), width: "100%" }}>Enter War Room</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#000", color: "#fff", fontFamily: "'Rajdhani', sans-serif" }}>
      {/* Header */}
      <div style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(0,0,0,0.95)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "0.75rem 2rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <button onClick={() => navigate("/")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
            ← Home
          </button>
          <div style={{ fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
            War Room
          </div>
        </div>
        {/* Website / App Toggle */}
        <div style={{ display: "flex", gap: "0.5rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", padding: "0.25rem" }}>
          {(["website", "app"] as const).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); if (m === "app") navigate("/social"); else navigate("/"); }}
              style={{
                background: mode === m ? "rgba(184,134,11,0.3)" : "transparent",
                border: mode === m ? "1px solid rgba(184,134,11,0.5)" : "1px solid transparent",
                color: mode === m ? "#b8860b" : "rgba(255,255,255,0.35)",
                padding: "0.3rem 0.85rem",
                fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer",
              }}
            >
              {m === "website" ? "Website" : "1% App"}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "0", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 2rem" }}>
        {(["bots", "finance", "alerts"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              background: "transparent", border: "none",
              borderBottom: activeTab === tab ? "2px solid #b8860b" : "2px solid transparent",
              color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.4)",
              padding: "1rem 1.5rem",
              fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer",
            }}
          >
            {tab === "bots" ? "Bot Engine" : tab === "finance" ? "Finance" : "Alerts"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "2rem" }}>
        {activeTab === "bots" && <BotEngineTab />}
        {activeTab === "finance" && <FinanceTab />}
        {activeTab === "alerts" && <AlertsTab />}
      </div>
    </div>
  );
}
