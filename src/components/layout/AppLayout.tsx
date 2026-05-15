"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Users, Briefcase, ShoppingBag, Award, Calendar,
  Settings, Bell, ChevronRight, LayoutGrid, Sparkles,
  TrendingUp, Menu, X, Search
} from "lucide-react";
import { currentUser } from "@/data/demo";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard",     label: "Início",         icon: Home },
  { href: "/people",        label: "Comunidade",      icon: Users },
  { href: "/opportunities", label: "Oportunidades",   icon: Briefcase },
  { href: "/commerce",      label: "Empresas Alumni", icon: ShoppingBag },
  { href: "/rewards",       label: "Benefícios",      icon: Award },
  { href: "/groups",        label: "Grupos",          icon: LayoutGrid },
  { href: "/events",        label: "Eventos",         icon: Calendar },
  { href: "/concierge",     label: "AI Concierge",    icon: Sparkles },
];

const bottomItems = [
  { href: "/admin",    label: "Admin",      icon: TrendingUp },
  { href: "/settings", label: "Definições", icon: Settings },
];

// Bottom nav items (most important 5 for mobile)
const mobileNavItems = [
  { href: "/dashboard",     label: "Início",      icon: Home },
  { href: "/people",        label: "Comunidade",  icon: Users },
  { href: "/concierge",     label: "AI",          icon: Sparkles },
  { href: "/opportunities", label: "Oportun.",    icon: Briefcase },
  { href: "/rewards",       label: "Benefícios",  icon: Award },
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="glass-sidebar" style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Logo */}
      <div style={{ padding: "18px 20px 16px", borderBottom: "1px solid rgba(200,210,228,0.40)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, overflow: "hidden", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
            <img src="/aaase-logo.png" alt="AAASE" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--n800)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>AAASE</div>
            <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--n400)", marginTop: 2 }}>Alumni Network</div>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 10, border: "1px solid var(--n150)", background: "var(--n100)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <X style={{ width: 15, height: 15, color: "var(--n500)" }} />
          </button>
        )}
      </div>

      {/* Search */}
      <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(200,210,228,0.35)" }}>
        <Link href="/people" onClick={onClose} style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 13px", borderRadius: 14, background: "rgba(46,109,180,0.06)", border: "1px solid rgba(46,109,180,0.10)", textDecoration: "none" }}>
          <Search style={{ width: 13, height: 13, color: "var(--n400)", flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: "var(--n400)" }}>Pesquisar alumni...</span>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "10px 10px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href} onClick={onClose} className={cn("nav-item", isActive && "active")}>
              <Icon style={{ width: 15, height: 15, flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.href === "/concierge" && (
                <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 999, background: isActive ? "rgba(255,255,255,0.20)" : "var(--gold-muted)", color: isActive ? "white" : "#7A4F00" }}>AI</span>
              )}
            </Link>
          );
        })}
        <div style={{ height: 1, background: "var(--n150)", margin: "8px 4px" }} />
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} onClick={onClose} className={cn("nav-item", isActive && "active")}>
              <Icon style={{ width: 15, height: 15, flexShrink: 0 }} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Profile */}
      <div style={{ padding: "10px 10px 14px", borderTop: "1px solid rgba(200,210,228,0.40)" }}>
        <Link href="/profile" onClick={onClose} style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 12px", borderRadius: 14, textDecoration: "none", transition: "background 0.15s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(46,109,180,0.07)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
        >
          <div style={{ position: "relative" }}>
            <div style={{ width: 33, height: 33, borderRadius: "50%", background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 12, fontWeight: 600, flexShrink: 0, boxShadow: "0 2px 8px rgba(46,109,180,0.28)" }}>
              {currentUser.initials}
            </div>
            <div style={{ position: "absolute", bottom: -1, right: -1, width: 9, height: 9, background: "#22C55E", borderRadius: "50%", border: "1.5px solid white" }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--n800)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>{currentUser.name}</div>
            <div style={{ fontSize: 11, color: "var(--n400)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{currentUser.role}</div>
          </div>
          <ChevronRight style={{ width: 13, height: 13, color: "var(--n300)", flexShrink: 0 }} />
        </Link>
      </div>
    </div>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const notifCount = 2;

  // Close sidebar on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Lock body scroll when mobile sidebar open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const pageTitle: Record<string, string> = {
    "/dashboard": "Início", "/people": "Comunidade", "/opportunities": "Oportunidades",
    "/commerce": "Empresas Alumni", "/rewards": "Benefícios & Cartão", "/groups": "Grupos",
    "/events": "Eventos", "/concierge": "AI Concierge", "/admin": "Dashboard",
    "/profile": "Perfil", "/notifications": "Notificações", "/settings": "Definições",
  };

  return (
    <div className="app-bg" style={{ minHeight: "100dvh" }}>

      {/* ── Desktop sidebar ── */}
      <aside className="desktop-sidebar glass-sidebar fixed left-0 top-0 h-full flex-col z-30" style={{ width: "var(--sidebar-w)" }}>
        <SidebarContent />
      </aside>

      {/* ── Mobile overlay ── */}
      <div className={cn("sidebar-overlay", mobileOpen && "open")} onClick={() => setMobileOpen(false)} />
      <div className={cn("mobile-sidebar glass-sidebar", mobileOpen && "open")}>
        <SidebarContent onClose={() => setMobileOpen(false)} />
      </div>

      {/* ── TopBar ── */}
      <header className="glass-topbar fixed right-0 z-20 flex items-center justify-between"
        style={{ left: "var(--sidebar-w)", height: "var(--topbar-h)", top: 0, padding: "0 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileOpen(true)}
            className="hide-desktop"
            style={{ width: 36, height: 36, borderRadius: 11, border: "1px solid var(--n150)", background: "var(--n100)", display: "none", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            id="hamburger-btn"
          >
            <Menu style={{ width: 17, height: 17, color: "var(--n600)" }} />
          </button>
          <div style={{ fontSize: 15, fontWeight: 650, color: "var(--n800)", letterSpacing: "-0.02em" }}>
            {pageTitle[pathname] || "AAASE"}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/notifications" style={{ position: "relative", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 11, background: "var(--n100)", border: "1px solid var(--n150)", textDecoration: "none" }}>
            <Bell style={{ width: 15, height: 15, color: "var(--n500)" }} />
            {notifCount > 0 && <span style={{ position: "absolute", top: 7, right: 7, width: 7, height: 7, background: "var(--red)", borderRadius: "50%", border: "1.5px solid white" }} />}
          </Link>
          <Link href="/concierge" className="btn-primary hide-mobile" style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }}>
            <Sparkles style={{ width: 13, height: 13 }} />
            Concierge AI
          </Link>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="app-main-content" style={{ paddingLeft: "var(--sidebar-w)", paddingTop: "var(--topbar-h)", minHeight: "100dvh" }}>
        <div style={{ padding: "var(--page-pad-y) var(--page-pad-x) 48px" }}>
          {children}
        </div>
      </main>

      {/* ── Mobile bottom nav ── */}
      <nav className="mobile-bottom-nav">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href}
              style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, textDecoration: "none", padding: "6px 0", borderRadius: 12, transition: "all 0.15s",
                color: isActive ? "var(--blue)" : "var(--n400)" }}>
              <div style={{ position: "relative" }}>
                {item.href === "/concierge" ? (
                  <div style={{ width: 36, height: 36, borderRadius: 11, background: isActive ? "var(--blue)" : "var(--blue-muted)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: isActive ? "0 2px 8px rgba(46,109,180,0.35)" : "none" }}>
                    <Icon style={{ width: 16, height: 16, color: isActive ? "white" : "var(--blue)" }} />
                  </div>
                ) : (
                  <Icon style={{ width: 22, height: 22 }} />
                )}
              </div>
              <span style={{ fontSize: 10, fontWeight: isActive ? 600 : 400, letterSpacing: "0.01em" }}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Inline CSS for hamburger show on mobile */}
      <style>{`
        @media (max-width: 767px) {
          #hamburger-btn { display: flex !important; }
        }
      `}</style>
    </div>
  );
}
