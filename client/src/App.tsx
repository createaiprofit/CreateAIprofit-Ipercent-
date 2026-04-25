import { Switch, Route, useLocation } from "wouter";
import { ChevronLeft } from "lucide-react";

// Pages
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import LoginOnboarding from "@/pages/LoginOnboarding";
import ProfileSetup from "@/pages/ProfileSetup";
import Terms from "@/pages/Terms";
import Subscribe from "@/pages/Subscribe";
import MiniSeries from "@/pages/MiniSeries";
import Episodes from "@/pages/Episodes";
import SocialEntry from "@/pages/SocialEntry";
import SocialFeed from "@/pages/SocialFeed";
import SocialProfile from "@/pages/SocialProfile";
import Feed from "@/pages/Feed";
import InAppWallet from "@/pages/InAppWallet";
import ClubVault from "@/pages/ClubVault";
import Staff from "@/pages/Staff";
import Concierge from "@/pages/Concierge";
import ConfidenceCologne from "@/pages/ConfidenceCologne";
import WellnessBots from "@/pages/WellnessBots";
import CheckMate from "@/pages/CheckMate";
import BookClub from "@/pages/BookClub";
import UserMarketplace from "@/pages/UserMarketplace";
import AriaWelcomeBack from "@/pages/AriaWelcomeBack";
import Live from "@/pages/Live";
import BotEnginePanel from "@/pages/BotEnginePanel";
import PostScheduler from "@/pages/PostScheduler";
import ColdCallDashboard from "@/pages/ColdCallDashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Switch>
      {/* Public / Marketing */}
      <Route path={"/"} component={Home} />
      <Route path={"/mini-series"} component={MiniSeries} />
      <Route path={"/episodes"} component={Episodes} />
      <Route path={"/subscribe"} component={Subscribe} />
      <Route path={"/confidence-cologne"} component={ConfidenceCologne} />
      <Route path={"/wellness"} component={WellnessBots} />
      <Route path={"/checkmate"} component={CheckMate} />
      <Route path={"/club-vault"} component={ClubVault} />
      <Route path={"/concierge"} component={Concierge} />
      <Route path={"/staff"} component={Staff} />
      <Route path={"/book-club"} component={BookClub} />
      <Route path={"/marketplace"} component={UserMarketplace} />

      {/* Auth / Onboarding */}
      <Route path={"/login"} component={Login} />
      <Route path={"/onboarding"} component={LoginOnboarding} />
      <Route path={"/profile-setup"} component={ProfileSetup} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/aria-welcome"} component={AriaWelcomeBack} />

      {/* Social / Members-Only */}
      <Route path={"/social"} component={SocialEntry} />
      <Route path={"/social/feed"} component={SocialFeed} />
      <Route path={"/social/profile"} component={SocialProfile} />
      <Route path={"/feed"} component={Feed} />
      <Route path={"/wallet"} component={InAppWallet} />
      <Route path={"/live"} component={Live} />

      {/* Coming Soon tabs */}
      <Route path={"/dating"} component={() => <ComingSoonTab title="Dating" desc="Exclusive introductions for the 1%." badge="Coming Soon" />} />
      <Route path={"/oldmoney"} component={() => <ComingSoonTab title="Old Money" desc="For those who inherited the blueprint." badge="55+" />} />
      <Route path={"/newmoney"} component={() => <ComingSoonTab title="New Money" desc="For those building the blueprint." badge="25 & Under" />} />
      <Route path={"/bizinvest"} component={() => <ComingSoonTab title="Business & Investment" desc="Deal flow, partnerships, and investment opportunities." />} />

      {/* Admin */}
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/admin/botengine"} component={BotEnginePanel} />
      <Route path={"/admin/scheduler"} component={PostScheduler} />
      <Route path={"/admin/coldcall"} component={ColdCallDashboard} />

      {/* 404 */}
      <Route path={"/404"} component={NotFound} />
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
        onClick={() => navigate("/social")}
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
      <p style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", textAlign: "center", maxWidth: "320px", lineHeight: 1.6 }}>
        {desc}
      </p>
      <div style={{ marginTop: "2rem", fontFamily: "'Rajdhani', sans-serif", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)" }}>
        Members Only · 1% Playground
      </div>
    </div>
  );
}
