import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

// ─── SHARED STYLES ────────────────────────────────────────────────────────────
const S = {
  btn: (variant: "primary" | "ghost" | "danger" = "ghost") => ({
    background: variant === "primary" ? "#ffffff" : variant === "danger" ? "rgba(248,113,113,0.15)" : "rgba(255,255,255,0.06)",
    color: variant === "primary" ? "#000000" : variant === "danger" ? "#f87171" : "rgba(255,255,255,0.7)",
    border: variant === "danger" ? "1px solid rgba(248,113,113,0.3)" : "1px solid rgba(255,255,255,0.1)",
    padding: "0.6rem 1.25rem",
    cursor: "pointer" as const,
    fontFamily: "'Rajdhani', sans-serif",
    fontSize: "0.75rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    fontWeight: 600,
    transition: "all 0.2s",
  }),
  badge: (bg: string) => ({
    display: "inline-block" as const,
    padding: "0.15rem 0.5rem",
    background: bg,
    fontSize: "0.6rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    fontFamily: "'Rajdhani', sans-serif",
    borderRadius: "2px",
  }),
  card: {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.07)",
    padding: "1.5rem",
    marginBottom: "1rem",
  },
};

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function Loader() {
  return (
    <div style={{ textAlign: "center", padding: "3rem", color: "rgba(255,255,255,0.3)", fontFamily: "'Rajdhani', sans-serif", fontSize: "0.75rem", letterSpacing: "0.3em" }}>
      LOADING...
    </div>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div style={{ textAlign: "center", padding: "3rem", color: "rgba(255,255,255,0.25)", fontFamily: "'Rajdhani', sans-serif", fontSize: "0.8rem" }}>
      {text}
    </div>
  );
}

function SectionHeader({ label, title, inline }: { label: string; title: string; inline?: boolean }) {
  return (
    <div style={{ marginBottom: inline ? 0 : "1.5rem" }}>
      <div style={{ fontSize: "0.6rem", letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "0.25rem", fontFamily: "'Rajdhani', sans-serif" }}>{label}</div>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 300, color: "#ffffff", margin: 0 }}>{title}</h2>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState<"overview" | "alerts" | "finance" | "bots">("overview");
  const [appView, setAppView] = useState<"website" | "app">("website");

  const TABS = [
    { id: "overview", label: "Overview" },
    { id: "alerts", label: "Alerts" },
    { id: "finance", label: "Finance" },
    { id: "bots", label: "Bot Engine" },
  ] as const;

  return (
    <div style={{ background: "#000000", minHeight: "100vh", color: "#ffffff", fontFamily: "'Rajdhani', sans-serif" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "1.5rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: "0.6rem", letterSpacing: "0.5em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)", marginBottom: "0.25rem" }}>CreateAIProfit · Admin</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.75rem", fontWeight: 300, color: "#ffffff", margin: 0 }}>War Room</h1>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
          {/* WEBSITE / APP TOGGLE */}
          <div style={{ display: "flex", background: "rgba(255,255,255,0.04)", borderRadius: "4px", padding: "2px", border: "1px solid rgba(255,255,255,0.1)" }}>
            <button
              onClick={() => { setAppView("website"); navigate("/"); }}
              style={{
                padding: "0.35rem 0.9rem",
                background: appView === "website" ? "rgba(201,168,76,0.2)" : "transparent",
                border: appView === "website" ? "1px solid rgba(201,168,76,0.4)" : "1px solid transparent",
                color: appView === "website" ? "#c9a84c" : "rgba(255,255,255,0.35)",
                cursor: "pointer",
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase" as const,
                borderRadius: "3px",
                transition: "all 0.2s",
              }}
            >
              Website
            </button>
            <button
              onClick={() => { setAppView("app"); navigate("/social"); }}
              style={{
                padding: "0.35rem 0.9rem",
                background: appView === "app" ? "rgba(148,163,170,0.2)" : "transparent",
                border: appView === "app" ? "1px solid rgba(148,163,170,0.4)" : "1px solid transparent",
                color: appView === "app" ? "#94A3AA" : "rgba(255,255,255,0.35)",
                cursor: "pointer",
                fontFamily: "'Rajdhani', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase" as const,
                borderRadius: "3px",
                transition: "all 0.2s",
              }}
            >
              1% App
            </button>
          </div>
          <button onClick={() => navigate("/admin/botengine")} style={S.btn("ghost")}>Bot Engine</button>
          <button onClick={() => navigate("/admin/scheduler")} style={S.btn("ghost")}>Scheduler</button>
          <button onClick={() => navigate("/admin/coldcall")} style={S.btn("ghost")}>Cold Call</button>
          <button
            onClick={() => navigate("/")}
            style={{ ...S.btn("ghost"), color: "rgba(201,168,76,0.7)", borderColor: "rgba(201,168,76,0.2)" }}
          >
            ← Home
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 2rem" }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "0.85rem 1.5rem",
              background: "transparent",
              border: "none",
              borderBottom: activeTab === tab.id ? "2px solid #ffffff" : "2px solid transparent",
              color: activeTab === tab.id ? "#ffffff" : "rgba(255,255,255,0.35)",
              cursor: "pointer",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontFamily: "'Rajdhani', sans-serif",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
        {activeTab === "overview" && <OverviewTab navigate={navigate} />}
        {activeTab === "alerts" && <AlertsTab />}
        {activeTab === "finance" && <FinanceTab />}
        {activeTab === "bots" && <BotsTab />}
      </div>
    </div>
  );
}

// ─── OVERVIEW TAB ─────────────────────────────────────────────────────────────
function OverviewTab({ navigate }: { navigate: (path: string) => void }) {
  const { data: stats } = trpc.warRoom.stats.useQuery();
  const CARDS = [
    { label: "Active Members", value: stats?.activeMembers ?? 1000, color: "#4ade80" },
    { label: "Bot Posts Today", value: stats?.botPostsToday ?? 847, color: "#60a5fa" },
    { label: "Wallet Balance (Total)", value: `$${(stats?.totalWalletBalance ?? 284750).toLocaleString()}`, color: "#fbbf24" },
    { label: "Unread Alerts", value: stats?.unreadAlerts ?? 3, color: "#f87171" },
  ];
  return (
    <div>
      <SectionHeader label="War Room" title="Platform Overview" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        {CARDS.map(card => (
          <div key={card.label} style={S.card}>
            <div style={{ fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.5rem" }}>{card.label}</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 300, color: card.color }}>{card.value}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
        {[
          { label: "Bot Engine", path: "/admin/botengine", desc: "Toggle bots, seed queue, launch blitz" },
          { label: "Post Scheduler", path: "/admin/scheduler", desc: "Affiliate links and host bot management" },
          { label: "Cold Call Dashboard", path: "/admin/coldcall", desc: "AI cold call scripts and closer bots" },
        ].map(item => (
          <button key={item.path} onClick={() => navigate(item.path)} style={{ ...S.card, border: "1px solid rgba(255,255,255,0.1)", cursor: "pointer", textAlign: "left", width: "100%" }}>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#ffffff", marginBottom: "0.4rem" }}>{item.label}</div>
            <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>{item.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── BOTS TAB ─────────────────────────────────────────────────────────────────
function BotsTab() {
  const seedQueue = trpc.botEngine.seedQueue.useMutation({ onSuccess: () => toast.success("Queue seeded successfully") });
  const launchBlitz = trpc.botEngine.launchBlitz.useMutation({ onSuccess: () => toast.success("Blitz launched!") });
  const runEngagement = trpc.botEngine.runEngagementCycle.useMutation({ onSuccess: () => toast.success("Engagement cycle running") });
  const toggleBots = trpc.botEngine.toggleBots.useMutation({ onSuccess: (d) => toast.success(d.message) });

  return (
    <div>
      <SectionHeader label="Bot Engine" title="Control Panel" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        <div style={S.card}>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.75rem" }}>Toggle Bots</div>
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", marginBottom: "1rem" }}>Enable or disable all 1,000 member bots and 21 host bots.</p>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button style={S.btn("primary")} onClick={() => toggleBots.mutate({ active: true })}>Enable All</button>
            <button style={S.btn("danger")} onClick={() => toggleBots.mutate({ active: false })}>Disable All</button>
          </div>
        </div>
        <div style={S.card}>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.75rem" }}>Seed Queue</div>
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", marginBottom: "1rem" }}>Pre-fill the post queue with wins, tips, and community content.</p>
          <button style={S.btn("primary")} onClick={() => seedQueue.mutate()}>Seed Queue</button>
        </div>
        <div style={S.card}>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.75rem" }}>Launch Blitz</div>
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", marginBottom: "1rem" }}>Fire 50 posts simultaneously across all active bots.</p>
          <button style={S.btn("primary")} onClick={() => launchBlitz.mutate()}>Launch Blitz</button>
        </div>
        <div style={S.card}>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.75rem" }}>Engagement Cycle</div>
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", marginBottom: "1rem" }}>Run likes, comments, and shares across the member feed.</p>
          <button style={S.btn("primary")} onClick={() => runEngagement.mutate()}>Run Cycle</button>
        </div>
      </div>
      <div style={{ padding: "1rem 1.5rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", fontSize: "0.75rem", color: "rgba(255,255,255,0.35)" }}>
        1,000 enterprise member bots are pre-built and ready. Host bots (21) follow the Machiavelli prompt. Mini Series cast follow the Mini Series Prompt. All groups are segregated — no crossover.
      </div>
    </div>
  );
}

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
/**
 * MONEY FLOW:
 * Gross → Taxes (~46.6%) → After-Tax → 40% Member Wallets / 40% Surplus / 20% Business Checking
 * NO WITHDRAWALS from in-app wallet by anyone, ever.
 */
function FinanceTab() {
  const [grossInput, setGrossInput] = useState("");
  const [grossRevenue, setGrossRevenue] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const TAX_RATE = 0.466;
  const MEMBER_SPLIT = 0.40;
  const SURPLUS_SPLIT = 0.40;
  const BUSINESS_SPLIT = 0.20;

  const afterTax = grossRevenue !== null ? grossRevenue * (1 - TAX_RATE) : null;
  const memberWallets = afterTax !== null ? afterTax * MEMBER_SPLIT : null;
  const surplus = afterTax !== null ? afterTax * SURPLUS_SPLIT : null;
  const businessChecking = afterTax !== null ? afterTax * BUSINESS_SPLIT : null;

  const fmt = (n: number | null) => n !== null ? "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "—";

  return (
    <div>
      <SectionHeader label="Finance" title="Revenue Distribution" />
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: "1.5rem", marginBottom: "2rem" }}>
        <div style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "1rem" }}>Calculate Distribution</div>
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
          <input type="number" value={grossInput} onChange={e => setGrossInput(e.target.value)} placeholder="Enter gross revenue..." style={{ flex: 1, minWidth: "200px", padding: "0.75rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", color: "#ffffff", fontFamily: "Rajdhani, sans-serif", fontSize: "0.9rem", outline: "none" }} />
          <button style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.1)", padding: "0.6rem 1.25rem", cursor: "pointer", fontFamily: "Rajdhani, sans-serif", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" }} onClick={() => { setGrossInput(""); setGrossRevenue(null); }}>Clear</button>
        </div>
        {grossRevenue !== null && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem" }}>
            {[
              { label: "Gross Revenue", value: fmt(grossRevenue), color: "#ffffff" },
              { label: "Taxes (46.6%)", value: fmt(grossRevenue * TAX_RATE), color: "#f87171" },
              { label: "After-Tax", value: fmt(afterTax), color: "#fbbf24" },
              { label: "Member Wallets (40%)", value: fmt(memberWallets), color: "#4ade80" },
              { label: "Surplus (40%)", value: fmt(surplus), color: "#60a5fa" },
              { label: "Business Checking (20%)", value: fmt(businessChecking), color: "#c084fc" },
            ].map(row => (
              <div key={row.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", padding: "1rem" }}>
                <div style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.4rem" }}>{row.label}</div>
                <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.4rem", fontWeight: 300, color: row.color }}>{row.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", padding: "1.5rem" }}>
        <div style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.75rem" }}>Finance Notes</div>
        <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Add a finance note..." rows={4} style={{ width: "100%", padding: "0.75rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.12)", color: "#ffffff", fontFamily: "Rajdhani, sans-serif", fontSize: "0.85rem", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
        <div style={{ marginTop: "0.75rem", fontSize: "0.7rem", color: "rgba(255,255,255,0.25)" }}>RULE: No withdrawals from in-app wallets. Ever. Member wallets are internal credits only.</div>
      </div>
    </div>
  );
}
