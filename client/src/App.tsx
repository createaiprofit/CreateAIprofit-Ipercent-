import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { ChevronLeft } from "lucide-react";

// Pages
import Home from "./pages/Home";
import Staff from "./pages/Staff";
import MiniSeries from "./pages/MiniSeries";
import Login from "./pages/Login";
import LoginOnboarding from "./pages/LoginOnboarding";
import ProfileSetup from "./pages/ProfileSetup";
import Feed from "./pages/Feed";
import SocialFeed from "./pages/SocialFeed";
import SocialEntry from "./pages/SocialEntry";
import SocialProfile from "./pages/SocialProfile";
import InAppWallet from "./pages/InAppWallet";
import Live from "./pages/Live";
import AdminDashboard from "./pages/AdminDashboard";
import BotEnginePanel from "./pages/BotEnginePanel";
import UserMarketplace from "./pages/UserMarketplace";
import Subscribe from "./pages/Subscribe";
import Terms from "./pages/Terms";
import { TierBadge } from "./pages/TierBadge";
import WellnessBots from "./pages/WellnessBots";
import Episodes from "./pages/Episodes";
import PostScheduler from "./pages/PostScheduler";
import ClubVault from "./pages/ClubVault";
import CheckMate from "./pages/CheckMate";
import ColdCallDashboard from "./pages/ColdCallDashboard";
import Concierge from "./pages/Concierge";
import ConfidenceCologne from "./pages/ConfidenceCologne";
import BookClub from "./pages/BookClub";
import AriaWelcomeBack from "./pages/AriaWelcomeBack";
import NotFound from "./pages/NotFound";

// ─── MAIN APP ────────────────────────────────────────────────────────────────
function AppRoutes() {
  return (
    <Switch>
      {/* ── PUBLIC WEBSITE ── */}
      <Route path="/" component={Home} />
      <Route path="/staff" component={Staff} />
      <Route path="/miniseries" component={MiniSeries} />
      <Route path="/episodes" component={Episodes} />

      {/* ── AUTH ── */}
      <Route path="/login" component={Login} />
      <Route path="/onboarding" component={LoginOnboarding} />
      <Route path="/profile-setup" component={ProfileSetup} />
      <Route path="/subscribe" component={Subscribe} />
      <Route path="/terms" component={Terms} />

      {/* ── 1% PLAYGROUND APP SIDE ── */}
      <Route path="/social" component={SocialEntry} />
      <Route path="/feed" component={Feed} />
      <Route path="/social-feed" component={SocialFeed} />
      <Route path="/profile/:id" component={SocialProfile} />
      <Route path="/wallet" component={InAppWallet} />
      <Route path="/live" component={Live} />
      <Route path="/wellness" component={WellnessBots} />
      <Route path="/marketplace" component={UserMarketplace} />
      <Route path="/club-vault" component={ClubVault} />
      <Route path="/checkmate" component={CheckMate} />
      <Route path="/concierge" component={Concierge} />
      <Route path="/confidence-cologne" component={ConfidenceCologne} />
      <Route path="/book-club" component={BookClub} />
      <Route path="/aria" component={AriaWelcomeBack} />
      
      {/* ── ADMIN / WAR ROOM ── */}
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/bot-engine" component={BotEnginePanel} />
      <Route path="/cold-call" component={ColdCallDashboard} />
      <Route path="/post-scheduler" component={PostScheduler} />

      {/* ── COMING SOON TABS ── */}
      <Route path="/vault" component={() => <ComingSoonTab title="The Vault" desc="Exclusive investment opportunities and deal flow." badge="MEMBERS ONLY" />} />
      <Route path="/download" component={() => <ComingSoonTab title="Download App" desc="The 1% Playground mobile app is coming soon." badge="COMING SOON" />} />
      <Route path="/bizinvest" component={() => <ComingSoonTab title="Business & Investment" desc="Deal flow, partnerships, and investment opportunities." />} />

      {/* ── 404 ── */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

// ─── COMING SOON TAB ─────────────────────────────────────────────────────────
function ComingSoonTab({ title, desc, badge }: { title: string; desc: string; badge?: string }) {
  const [, navigate] = useLocation();
  return (
    <div style={{ background: "#000000", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", paddingBottom: "80px" }}>
      <button
        onClick={() => navigate("/")}
        style={{
          position: "fixed", top: "16px", left: "16px",
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "10px", padding: "8px 14px",
          color: "rgba(255,255,255,0.7)", cursor: "pointer",
          display: "flex", alignItems: "center", gap: "6px",
          fontFamily: "'Rajdhani', sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em",
        }}
      >
        <ChevronLeft className="w-4 h-4" /> Back
      </button>
      {badge && (
        <div style={{
          background: "rgba(254,44,85,0.15)", border: "1px solid rgba(254,44,85,0.4)",
          borderRadius: "20px", padding: "4px 16px", marginBottom: "1.5rem",
          fontFamily: "'Rajdhani', sans-serif", fontSize: "0.7rem", letterSpacing: "0.3em",
          textTransform: "uppercase", color: "#fe2c55",
        }}>
          {badge}
        </div>
      )}
      <div style={{
        width: "64px", height: "64px", borderRadius: "16px",
        background: "linear-gradient(135deg, #fe2c55, #25f4ee)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "1.5rem",
        boxShadow: "0 0 40px rgba(254,44,85,0.3)",
      }}>
        <span style={{ fontSize: "1.75rem" }}>🔒</span>
      </div>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 300, color: "#ffffff", marginBottom: "0.75rem", textAlign: "center" }}>
        {title}
      </h2>
      <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", textAlign: "center", maxWidth: "320px" }}>
        {desc}
      </p>
      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "2rem",
          background: "linear-gradient(135deg, #c9a84c, #f0d080)",
          border: "none", borderRadius: "12px", padding: "12px 32px",
          color: "#000", fontFamily: "'Rajdhani', sans-serif",
          fontSize: "0.85rem", letterSpacing: "0.15em", fontWeight: 700,
          cursor: "pointer", textTransform: "uppercase",
        }}
      >
        Return Home
      </button>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="cap-theme">
      <AppRoutes />
      <Toaster />
    </ThemeProvider>
  );
}
