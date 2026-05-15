"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Users, Briefcase, ShoppingBag, Award, Calendar,
  Settings, Bell, Search, ChevronRight,
  LayoutGrid, Sparkles, Shield, TrendingUp
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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="glass-sidebar fixed left-0 top-0 h-full flex flex-col z-30" style={{ width: "var(--sidebar-w)" }}>
      {/* Logo */}
      <div style={{ padding: "18px 20px 16px", borderBottom: "1px solid rgba(200,210,228,0.40)", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, overflow: "hidden", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
          <img src="/aaase-logo.png" alt="AAASE" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        </div>
        <div>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: "var(--n800)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>AAASE</div>
          <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--n400)", marginTop: 2 }}>Alumni Network</div>
        </div>
      </div>

      {/* Search */}
      <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(200,210,228,0.35)" }}>
        <Link href="/people" style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 13px", borderRadius: 14, background: "rgba(46,109,180,0.06)", border: "1px solid rgba(46,109,180,0.10)", textDecoration: "none", transition: "all 0.15s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(46,109,180,0.10)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(46,109,180,0.06)"; }}
        >
          <Search style={{ width: 13, height: 13, color: "var(--n400)", flexShrink: 0 }} />
          <span style={{ fontSize: 12.5, color: "var(--n400)" }}>Pesquisar alumni...</span>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "10px 10px", overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href} className={cn("nav-item", isActive && "active")}>
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
            <Link key={item.href} href={item.href} className={cn("nav-item", isActive && "active")}>
              <Icon style={{ width: 15, height: 15, flexShrink: 0 }} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Profile */}
      <div style={{ padding: "10px 10px 14px", borderTop: "1px solid rgba(200,210,228,0.40)" }}>
        <Link href="/profile" style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 12px", borderRadius: 14, textDecoration: "none", transition: "background 0.15s" }}
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
    </aside>
  );
}

export function TopBar() {
  const pathname = usePathname();
  const notifCount = 2;

  const pageTitle: Record<string, string> = {
    "/dashboard": "Início", "/people": "Comunidade", "/opportunities": "Oportunidades",
    "/commerce": "Empresas Alumni", "/rewards": "Benefícios & Cartão", "/groups": "Grupos",
    "/events": "Eventos", "/concierge": "AI Concierge", "/admin": "Dashboard",
    "/profile": "Perfil", "/notifications": "Notificações", "/settings": "Definições",
  };

  return (
    <header className="glass-topbar fixed right-0 z-20 flex items-center justify-between px-6"
      style={{ left: "var(--sidebar-w)", height: "var(--topbar-h)", top: 0 }}>
      <div style={{ fontSize: 15, fontWeight: 650, color: "var(--n800)", letterSpacing: "-0.02em" }}>
        {pageTitle[pathname] || "AAASE"}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <Link href="/notifications" style={{ position: "relative", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 11, background: "var(--n100)", border: "1px solid var(--n150)", transition: "all 0.15s", textDecoration: "none" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--n150)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--n100)"; }}>
          <Bell style={{ width: 15, height: 15, color: "var(--n500)" }} />
          {notifCount > 0 && <span style={{ position: "absolute", top: 7, right: 7, width: 7, height: 7, background: "var(--red)", borderRadius: "50%", border: "1.5px solid white" }} />}
        </Link>
        <Link href="/concierge" className="btn-primary" style={{ padding: "8px 16px", fontSize: 13, borderRadius: 12 }}>
          <Sparkles style={{ width: 13, height: 13 }} />
          Concierge AI
        </Link>
      </div>
    </header>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-bg" style={{ minHeight: "100dvh" }}>
      <Sidebar />
      <TopBar />
      <main style={{ paddingLeft: "var(--sidebar-w)", paddingTop: "var(--topbar-h)", minHeight: "100dvh" }}>
        <div style={{ padding: "28px 28px 48px" }}>{children}</div>
      </main>
    </div>
  );
}
