"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Home, Users, Briefcase, ShoppingBag, Award, Calendar,
  MessageSquare, Settings, Bell, Search, ChevronRight,
  LayoutGrid, Sparkles, LogOut, Shield
} from "lucide-react";
import { currentUser } from "@/data/demo";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Início", icon: Home },
  { href: "/people", label: "Comunidade", icon: Users },
  { href: "/opportunities", label: "Oportunidades", icon: Briefcase },
  { href: "/commerce", label: "Empresas Alumni", icon: ShoppingBag },
  { href: "/rewards", label: "Benefícios", icon: Award },
  { href: "/groups", label: "Grupos", icon: LayoutGrid },
  { href: "/events", label: "Eventos", icon: Calendar },
  { href: "/concierge", label: "AI Concierge", icon: Sparkles },
];

const bottomItems = [
  { href: "/admin", label: "Admin", icon: Shield },
  { href: "/settings", label: "Definições", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [notifCount] = useState(2);

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-[#EDE8E3] flex flex-col z-30 shadow-soft">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-[#EDE8E3]">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="AAASE" width={36} height={36} className="flex-shrink-0" />
          <div>
            <div className="text-[13px] font-bold text-[#1E2D4E] tracking-wide leading-tight">AAASE</div>
            <div className="text-[10px] text-[#8896A5] leading-tight">Alumni Network</div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-3 border-b border-[#EDE8E3]">
        <Link href="/people" className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F0EBE3] transition-colors group">
          <Search className="w-3.5 h-3.5 text-[#8896A5] group-hover:text-[#3A7BC8] transition-colors" />
          <span className="text-[13px] text-[#8896A5] group-hover:text-[#4A5568]">Pesquisar alumni...</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto">
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all group",
                  isActive
                    ? "bg-[#1E2D4E] text-white shadow-soft"
                    : "text-[#4A5568] hover:bg-[#FAF8F5] hover:text-[#1E2D4E]"
                )}
              >
                <Icon className={cn(
                  "w-4 h-4 flex-shrink-0",
                  isActive ? "text-white" : "text-[#8896A5] group-hover:text-[#3A7BC8]"
                )} />
                <span className="flex-1">{item.label}</span>
                {item.href === "/concierge" && (
                  <span className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-full font-medium",
                    isActive ? "bg-white/20 text-white" : "bg-amber-100 text-amber-700"
                  )}>AI</span>
                )}
              </Link>
            );
          })}
        </div>

        <div className="mt-4 pt-4 border-t border-[#EDE8E3] space-y-0.5">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13.5px] font-medium transition-all group",
                  isActive
                    ? "bg-[#1E2D4E] text-white"
                    : "text-[#4A5568] hover:bg-[#FAF8F5] hover:text-[#1E2D4E]"
                )}
              >
                <Icon className={cn(
                  "w-4 h-4 flex-shrink-0",
                  isActive ? "text-white" : "text-[#8896A5] group-hover:text-[#3A7BC8]"
                )} />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Profile */}
      <div className="px-4 py-4 border-t border-[#EDE8E3]">
        <Link href="/profile" className="flex items-center gap-3 group cursor-pointer p-2 rounded-xl hover:bg-[#FAF8F5] transition-colors">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-[#1E2D4E] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
              {currentUser.initials}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold text-[#1A1F2E] truncate">{currentUser.name}</div>
            <div className="text-[11px] text-[#8896A5] truncate">{currentUser.role}</div>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[#B8C4CC] group-hover:text-[#3A7BC8] flex-shrink-0" />
        </Link>
      </div>
    </aside>
  );
}

export function TopBar() {
  const pathname = usePathname();
  const [notifCount] = useState(2);

  const pageTitle: Record<string, string> = {
    "/dashboard": "Início",
    "/people": "Comunidade",
    "/opportunities": "Oportunidades",
    "/commerce": "Empresas Alumni",
    "/rewards": "Benefícios & Cartão",
    "/groups": "Grupos",
    "/events": "Eventos",
    "/concierge": "AI Concierge",
    "/admin": "Dashboard Admin",
    "/profile": "Perfil",
  };

  const currentPage = pageTitle[pathname] || "AAASE";

  return (
    <header className="fixed top-0 left-64 right-0 h-14 bg-white/95 backdrop-blur border-b border-[#EDE8E3] flex items-center justify-between px-6 z-20">
      <div className="text-[15px] font-semibold text-[#1A1F2E]">{currentPage}</div>
      <div className="flex items-center gap-3">
        <Link href="/notifications" className="relative p-2 rounded-xl hover:bg-[#FAF8F5] transition-colors">
          <Bell className="w-4.5 h-4.5 text-[#8896A5]" />
          {notifCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#C0392B] rounded-full"></span>
          )}
        </Link>
        <Link href="/concierge" className="flex items-center gap-2 px-3 py-1.5 bg-[#1E2D4E] hover:bg-[#2A3F6E] text-white rounded-xl text-[12.5px] font-medium transition-colors">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Concierge AI</span>
        </Link>
      </div>
    </header>
  );
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FEFCFA]">
      <Sidebar />
      <TopBar />
      <main className="pl-64 pt-14 min-h-screen">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
