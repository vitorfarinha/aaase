"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Users, Briefcase, ShoppingBag, Award, Calendar,
  Settings, Bell, ChevronRight, LayoutGrid, Sparkles,
  TrendingUp, Menu, X, Search, Church, Heart, Star,
  HandHeart, BookOpen, Gift
} from "lucide-react";
import { currentUser } from "@/data/demo";
import { cn } from "@/lib/utils";

// ── Section colour resolver ──
function getActiveClass(href: string): string {
  if (["/oratorio", "/oratorio/noticias", "/oratorio/oracao", "/oratorio/bosco", "/oratorio/voluntariado"].some(h => href.startsWith(h.split("/")[1] ? "/" + href.split("/")[1] : h)))
    return "active-gold";
  if (["/comunidade", "/people", "/groups", "/events", "/opportunities", "/concierge"].some(h => href.startsWith(h)))
    return "active-red";
  if (["/beneficios", "/rewards", "/commerce"].some(h => href.startsWith(h)))
    return "active-green";
  return "active-blue";
}

type NavItem = { href: string; label: string; icon: any; accent: string; badge?: string };
type NavSection = { label: string | null; color?: string; items: NavItem[] };

const navSections: NavSection[] = [
  {
    label: null,
    items: [{ href: "/dashboard", label: "Início", icon: Home, accent: "active-blue" }],
  },
  {
    label: "Oratório",
    color: "var(--gold-deep)",
    items: [
      { href: "/oratorio",             label: "Início Oratório",  icon: Church,    accent: "active-gold" },
      { href: "/oratorio/oracao",      label: "Oração do Dia",    icon: Heart,     accent: "active-gold" },
      { href: "/oratorio/bosco",       label: "Dom Bosco",        icon: BookOpen,  accent: "active-gold" },
      { href: "/oratorio/voluntariado",label: "Voluntariado",     icon: HandHeart, accent: "active-gold" },
    ],
  },
  {
    label: "Comunidade",
    color: "var(--red)",
    items: [
      { href: "/people",        label: "Alumni",          icon: Users,     accent: "active-red" },
      { href: "/groups",        label: "Grupos",          icon: LayoutGrid,accent: "active-red" },
      { href: "/events",        label: "Eventos",         icon: Calendar,  accent: "active-red" },
      { href: "/opportunities", label: "Oportunidades",   icon: Briefcase, accent: "active-red" },
      { href: "/concierge",     label: "AI Concierge",    icon: Sparkles,  accent: "active-red", badge: "AI" },
    ],
  },
  {
    label: "Benefícios",
    color: "#166534",
    items: [
      { href: "/beneficios",  label: "Cartão & Perks",  icon: Award,      accent: "active-green" },
      { href: "/commerce",    label: "Empresas Alumni",  icon: ShoppingBag,accent: "active-green" },
    ],
  },
];

const bottomItems = [
  { href: "/admin",    label: "Admin",      icon: TrendingUp },
  { href: "/settings", label: "Definições", icon: Settings },
];

const mobileNavItems = [
  { href: "/dashboard",  label: "Início",     icon: Home,     accent: "blue" },
  { href: "/oratorio",   label: "Oratório",   icon: Church,   accent: "gold" },
  { href: "/concierge",  label: "AI",         icon: Sparkles, accent: "blue", highlight: true },
  { href: "/people",     label: "Alumni",     icon: Users,    accent: "red" },
  { href: "/beneficios", label: "Benefícios", icon: Gift,     accent: "green" },
];

// Section colour dot
function SectionDot({ color }: { color?: string }) {
  if (!color) return null;
  return <span style={{ width: 5, height: 5, borderRadius: "50%", background: color, flexShrink: 0, display: "inline-block" }} />;
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="glass-sidebar" style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>

      {/* Logo */}
      <div style={{ padding: "18px 18px 15px", borderBottom: "1px solid rgba(232,160,32,0.18)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
          <div style={{ width: 36, height: 36, borderRadius: 11, overflow: "hidden", flexShrink: 0, boxShadow: "0 3px 10px rgba(0,0,0,0.15)", border: "1.5px solid rgba(232,160,32,0.30)" }}>
            <img src="/aaase-logo.png" alt="AAASE" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "var(--n800)", letterSpacing: "-0.025em", lineHeight: 1.15 }}>AAASE</div>
            <div style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--n400)", marginTop: 1 }}>Alumni Network</div>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 9, border: "1px solid var(--n200)", background: "rgba(255,255,255,0.60)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <X style={{ width: 14, height: 14, color: "var(--n500)" }} />
          </button>
        )}
      </div>

      {/* Search */}
      <div style={{ padding: "10px 12px", borderBottom: "1px solid rgba(232,160,32,0.12)" }}>
        <Link href="/people" onClick={onClose}
          style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", borderRadius: 12, background: "rgba(232,160,32,0.08)", border: "1px solid rgba(232,160,32,0.14)", textDecoration: "none", transition: "all 0.15s" }}>
          <Search style={{ width: 13, height: 13, color: "var(--n400)", flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: "var(--n400)" }}>Pesquisar alumni...</span>
        </Link>
      </div>

      {/* Nav sections */}
      <nav style={{ flex: 1, padding: "6px 10px 10px", overflowY: "auto", display: "flex", flexDirection: "column" }}>
        {navSections.map((section) => (
          <div key={section.label || "home"}>
            {section.label && (
              <div className="nav-section-label" style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <SectionDot color={section.color} />
                {section.label}
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link key={item.href} href={item.href} onClick={onClose}
                    className={cn("nav-item", isActive && (item.accent || "active-blue"))}>
                    <Icon style={{ width: 15, height: 15, flexShrink: 0 }} />
                    <span style={{ flex: 1 }}>{item.label}</span>
                    {item.badge && (
                      <span style={{ fontSize: 9.5, fontWeight: 700, padding: "2px 7px", borderRadius: 999,
                        background: isActive ? "rgba(255,255,255,0.25)" : "rgba(232,160,32,0.15)",
                        color: isActive ? "inherit" : "var(--gold-deep)",
                        border: "1px solid rgba(232,160,32,0.20)" }}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        <div style={{ height: 1, background: "rgba(232,160,32,0.15)", margin: "10px 4px" }} />

        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} onClick={onClose}
              className={cn("nav-item", isActive && "active-blue")}>
              <Icon style={{ width: 15, height: 15, flexShrink: 0 }} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Profile footer */}
      <div style={{ padding: "10px 10px 14px", borderTop: "1px solid rgba(232,160,32,0.18)" }}>
        <Link href="/profile" onClick={onClose}
          style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 14, textDecoration: "none", transition: "background 0.15s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(232,160,32,0.08)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: 33, height: 33, borderRadius: "50%", background: "linear-gradient(135deg, var(--blue-dark), var(--blue))", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 12, fontWeight: 700, flexShrink: 0, boxShadow: "0 2px 8px rgba(46,109,180,0.32)" }}>
              {currentUser.initials}
            </div>
            <div style={{ position: "absolute", bottom: -1, right: -1, width: 9, height: 9, background: "#22C55E", borderRadius: "50%", border: "1.5px solid white" }} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--n800)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{currentUser.name}</div>
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

  useEffect(() => { setMobileOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const pageTitles: Record<string, { title: string; accent: string }> = {
    "/dashboard":             { title: "Início",           accent: "var(--blue)" },
    "/oratorio":              { title: "Oratório",         accent: "var(--gold-deep)" },
    "/oratorio/oracao":       { title: "Oração do Dia",    accent: "var(--gold-deep)" },
    "/oratorio/bosco":        { title: "Dom Bosco",        accent: "var(--gold-deep)" },
    "/oratorio/voluntariado": { title: "Voluntariado",     accent: "var(--gold-deep)" },
    "/people":                { title: "Alumni",           accent: "var(--red)" },
    "/groups":                { title: "Grupos",           accent: "var(--red)" },
    "/events":                { title: "Eventos",          accent: "var(--red)" },
    "/opportunities":         { title: "Oportunidades",    accent: "var(--red)" },
    "/concierge":             { title: "AI Concierge",     accent: "var(--blue)" },
    "/beneficios":            { title: "Benefícios",       accent: "#166534" },
    "/commerce":              { title: "Empresas Alumni",  accent: "#166534" },
    "/admin":                 { title: "Dashboard Admin",  accent: "var(--blue)" },
    "/profile":               { title: "Perfil",           accent: "var(--blue)" },
    "/notifications":         { title: "Notificações",     accent: "var(--blue)" },
    "/settings":              { title: "Definições",       accent: "var(--blue)" },
  };

  const page = pageTitles[pathname] || { title: "AAASE", accent: "var(--blue)" };

  return (
    <div className="app-bg" style={{ minHeight: "100dvh" }}>

      {/* Desktop sidebar */}
      <aside className="desktop-sidebar glass-sidebar fixed left-0 top-0 h-full flex-col z-30" style={{ width: "var(--sidebar-w)" }}>
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      <div className={cn("sidebar-overlay", mobileOpen && "open")} onClick={() => setMobileOpen(false)} />
      <div className={cn("mobile-sidebar glass-sidebar", mobileOpen && "open")}>
        <SidebarContent onClose={() => setMobileOpen(false)} />
      </div>

      {/* TopBar */}
      <header className="glass-topbar"
        style={{ position: "fixed", top: 0, left: "var(--sidebar-w)", right: 0, zIndex: 20,
                 height: "var(--topbar-h)", display: "flex", alignItems: "center",
                 justifyContent: "space-between", padding: "0 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={() => setMobileOpen(true)} id="hamburger-btn"
            style={{ width: 36, height: 36, borderRadius: 11, border: "1px solid var(--n200)", background: "rgba(255,255,255,0.65)", display: "none", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
            <Menu style={{ width: 17, height: 17, color: "var(--n600)" }} />
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 3, height: 18, borderRadius: 999, background: page.accent }} />
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--n800)", letterSpacing: "-0.025em" }}>
              {page.title}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/notifications"
            style={{ position: "relative", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 11, background: "rgba(255,255,255,0.65)", border: "1px solid var(--n200)", textDecoration: "none", backdropFilter: "blur(8px)" }}>
            <Bell style={{ width: 15, height: 15, color: "var(--n500)" }} />
            {notifCount > 0 && <span style={{ position: "absolute", top: 7, right: 7, width: 7, height: 7, background: "var(--red)", borderRadius: "50%", border: "1.5px solid white" }} />}
          </Link>
          <Link href="/concierge" className="btn-primary hide-mobile" style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }}>
            <Sparkles style={{ width: 13, height: 13 }} />
            Concierge AI
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="app-main-content" style={{ paddingLeft: "var(--sidebar-w)", paddingTop: "var(--topbar-h)", minHeight: "100dvh" }}>
        <div style={{ padding: "var(--page-pad-y) var(--page-pad-x) 48px" }}>
          {children}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="mobile-bottom-nav">
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          const accentColors: Record<string, string> = { blue: "var(--blue)", gold: "var(--gold-deep)", red: "var(--red)", green: "#166534" };
          const accent = accentColors[item.accent] || "var(--blue)";
          return (
            <Link key={item.href} href={item.href}
              style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, textDecoration: "none", padding: "6px 0", borderRadius: 12, transition: "all 0.15s", color: isActive ? accent : "var(--n400)" }}>
              {item.highlight ? (
                <div style={{ width: 38, height: 38, borderRadius: 12, background: isActive ? "var(--blue)" : "linear-gradient(135deg, var(--blue-dark), var(--blue))", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 10px rgba(46,109,180,0.38)", marginBottom: 1 }}>
                  <Icon style={{ width: 17, height: 17, color: "white" }} />
                </div>
              ) : (
                <Icon style={{ width: 22, height: 22 }} />
              )}
              <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 400 }}>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <style>{`@media(max-width:767px){#hamburger-btn{display:flex!important}}`}</style>
    </div>
  );
}
