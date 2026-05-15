"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users, Briefcase, Award, Calendar, Sparkles,
  ArrowRight, ChevronRight, Shield, MapPin, TrendingUp,
  MessageSquare, Star, Clock, Zap
} from "lucide-react";
import { currentUser, alumniList, opportunities, events, notifications, rewards } from "@/data/demo";
import { cn, getTrustLabel } from "@/lib/utils";

function WelcomeBanner() {
  return (
    <div className="rounded-2xl gradient-navy p-6 text-white relative overflow-hidden mb-6">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-8 w-32 h-32 rounded-full border border-white/30"></div>
        <div className="absolute top-12 right-20 w-20 h-20 rounded-full border border-white/20"></div>
        <div className="absolute -bottom-4 left-1/3 w-48 h-48 rounded-full border border-white/10"></div>
      </div>
      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-white/60 text-[12.5px] font-medium mb-1 tracking-wide uppercase">Bem-vindo de volta</p>
            <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              Olá, {currentUser.firstName} 👋
            </h1>
            <p className="text-white/70 text-[13.5px]">
              A tua rede tem <span className="text-white font-semibold">3 novas actividades</span> desde a tua última visita.
            </p>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-white/50 mb-1">Membro desde {currentUser.memberSince}</div>
            <div className="text-[11px] font-mono-custom text-white/70">{currentUser.memberNumber}</div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-5">
          <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
            <Shield className="w-3.5 h-3.5 text-emerald-300" />
            <span className="text-[12.5px] font-medium">Verificado</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
            <Star className="w-3.5 h-3.5 text-amber-300" />
            <span className="text-[12.5px] font-medium">Trust Score {currentUser.trustScore}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
            <Users className="w-3.5 h-3.5 text-blue-300" />
            <span className="text-[12.5px] font-medium">Mentor activo</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickStats() {
  const stats = [
    { label: "Alumni na rede", value: "847", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Oportunidades", value: "5", icon: Briefcase, color: "text-purple-600", bg: "bg-purple-50", badge: "Novas" },
    { label: "Benefícios activos", value: "12", icon: Award, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Eventos próximos", value: "3", icon: Calendar, color: "text-rose-600", bg: "bg-rose-50" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-soft border border-[#EDE8E3] card-hover">
            <div className="flex items-start justify-between mb-3">
              <div className={cn("p-2 rounded-xl", stat.bg)}>
                <Icon className={cn("w-4 h-4", stat.color)} />
              </div>
              {stat.badge && (
                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                  {stat.badge}
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-[#1A1F2E]">{stat.value}</div>
            <div className="text-[12px] text-[#8896A5] mt-0.5">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}

function AIInsight() {
  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/60 rounded-2xl p-5 mb-6">
      <div className="flex items-start gap-3">
        <div className="p-2 bg-amber-100 rounded-xl flex-shrink-0">
          <Sparkles className="w-4 h-4 text-amber-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[12px] font-semibold text-amber-800 uppercase tracking-wide">AI Insight do dia</span>
          </div>
          <p className="text-[13.5px] text-amber-900 leading-relaxed">
            <strong>Sofia Carvalho</strong> e tu partilham interesse em ClimaTech e têm Pedro Santos como conexão em comum. 
            Ela está a procurar um Head of Product — <span className="font-medium">96% de compatibilidade</span> com o teu perfil. Uma introdução poderia ser muito valiosa.
          </p>
          <div className="flex items-center gap-3 mt-3">
            <Link href="/concierge" className="text-[12.5px] font-semibold text-amber-700 hover:text-amber-900 flex items-center gap-1 transition-colors">
              Pedir introdução <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-amber-300">·</span>
            <Link href="/opportunities" className="text-[12.5px] text-amber-600 hover:text-amber-800 transition-colors">
              Ver oportunidade
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function SuggestedConnections() {
  const suggestions = alumniList.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft overflow-hidden mb-6">
      <div className="px-5 py-4 border-b border-[#EDE8E3] flex items-center justify-between">
        <div>
          <h2 className="text-[15px] font-semibold text-[#1A1F2E]">Pessoas relevantes para ti</h2>
          <p className="text-[12px] text-[#8896A5] mt-0.5">Recomendações baseadas no teu perfil e rede</p>
        </div>
        <Link href="/people" className="text-[12.5px] text-[#3A7BC8] font-medium hover:text-[#1E2D4E] flex items-center gap-1 transition-colors">
          Ver todos <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="divide-y divide-[#EDE8E3]">
        {suggestions.map((person) => (
          <div key={person.id} className="px-5 py-4 hover:bg-[#FAF8F5] transition-colors">
            <div className="flex items-start gap-3">
              <div className="relative flex-shrink-0">
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="w-10 h-10 rounded-full bg-[#EDE8E3]"
                />
                {person.isVerified && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                    <Shield className="w-2 h-2 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[13.5px] font-semibold text-[#1A1F2E]">{person.name}</span>
                  {person.isMentor && (
                    <span className="text-[10px] bg-[#F0EBE3] text-[#8896A5] px-1.5 py-0.5 rounded-full">Mentor</span>
                  )}
                  {person.isFounder && (
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-full">Fundador</span>
                  )}
                </div>
                <div className="text-[12px] text-[#8896A5] mb-1.5">{person.role} · {person.company} · {person.city}</div>
                {person.whyRelevant && (
                  <div className="text-[11.5px] text-[#3A7BC8] bg-blue-50/60 rounded-lg px-2.5 py-1.5 leading-relaxed">
                    <span className="font-medium">Porquê relevante: </span>{person.whyRelevant}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1.5 flex-shrink-0">
                <Link href={`/people/${person.id}`} className="text-[12px] font-medium text-[#3A7BC8] hover:text-[#1E2D4E] transition-colors whitespace-nowrap">
                  Ver perfil →
                </Link>
                <Link href="/concierge" className="text-[12px] text-[#8896A5] hover:text-[#4A5568] transition-colors whitespace-nowrap">
                  Introdução
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UpcomingEvents() {
  const upcomingEvents = events.slice(0, 3);

  const typeColors: Record<string, string> = {
    dinner: "bg-rose-50 text-rose-700",
    talk: "bg-purple-50 text-purple-700",
    reunion: "bg-blue-50 text-blue-700",
    networking: "bg-amber-50 text-amber-700",
    workshop: "bg-emerald-50 text-emerald-700",
    webinar: "bg-sky-50 text-sky-700",
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft overflow-hidden mb-6">
      <div className="px-5 py-4 border-b border-[#EDE8E3] flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-[#1A1F2E]">Próximos eventos</h2>
        <Link href="/events" className="text-[12.5px] text-[#3A7BC8] font-medium hover:text-[#1E2D4E] flex items-center gap-1 transition-colors">
          Ver todos <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="divide-y divide-[#EDE8E3]">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="px-5 py-4 hover:bg-[#FAF8F5] transition-colors">
            <div className="flex items-start gap-3">
              <div className="bg-[#1E2D4E] text-white rounded-xl p-2.5 flex-shrink-0 text-center min-w-[44px]">
                <div className="text-[10px] font-medium opacity-70 leading-none mb-0.5">
                  {event.date.split(" ")[1]}
                </div>
                <div className="text-[16px] font-bold leading-none">
                  {event.date.split(" ")[0]}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[13.5px] font-semibold text-[#1A1F2E] truncate">{event.title}</span>
                </div>
                <div className="flex items-center gap-2 text-[12px] text-[#8896A5] mb-1.5">
                  <Clock className="w-3 h-3" />
                  <span>{event.time}</span>
                  <span>·</span>
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{event.isVirtual ? "Online" : event.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn("text-[10.5px] px-2 py-0.5 rounded-full font-medium", typeColors[event.type] || "bg-gray-50 text-gray-600")}>
                    {event.type === "dinner" ? "Jantar" : event.type === "talk" ? "Talk" : event.type === "reunion" ? "Reencontro" : event.type === "workshop" ? "Workshop" : "Evento"}
                  </span>
                  <span className="text-[11px] text-[#8896A5]">
                    {event.attendeeCount}/{event.capacity} inscritos
                  </span>
                </div>
              </div>
              <Link href={`/events`} className="text-[12px] font-medium text-[#3A7BC8] hover:text-[#1E2D4E] transition-colors flex-shrink-0">
                Inscrever →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MemberCard() {
  return (
    <div className="gradient-navy rounded-2xl p-5 text-white relative overflow-hidden mb-6">
      <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
        <div className="w-full h-full rounded-full border-4 border-white translate-x-8 -translate-y-8"></div>
      </div>

      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Cartão de Membro</div>
          <div className="text-[13px] font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>AAASE</div>
        </div>
        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
          <Shield className="w-4 h-4 text-white/70" />
        </div>
      </div>

      <div className="mb-4">
        <div className="text-[15px] font-bold">{currentUser.name}</div>
        <div className="text-[12px] text-white/60">Turma {currentUser.graduationYear} · {currentUser.memberNumber}</div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] text-white/50 mb-0.5">Trust Score</div>
          <div className="text-[18px] font-bold">{currentUser.trustScore}</div>
        </div>
        <Link href="/rewards" className="text-[12px] bg-white/15 hover:bg-white/25 transition-colors rounded-xl px-3 py-2 font-medium">
          Ver benefícios →
        </Link>
      </div>
    </div>
  );
}

function RecentNotifications() {
  return (
    <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft overflow-hidden mb-6">
      <div className="px-5 py-4 border-b border-[#EDE8E3] flex items-center justify-between">
        <h2 className="text-[15px] font-semibold text-[#1A1F2E]">Actividade recente</h2>
        <span className="text-[10.5px] bg-[#C0392B] text-white rounded-full px-2 py-0.5 font-medium">2 novas</span>
      </div>
      <div className="divide-y divide-[#EDE8E3]">
        {notifications.slice(0, 4).map((notif) => (
          <div key={notif.id} className={cn(
            "px-5 py-3.5 hover:bg-[#FAF8F5] transition-colors",
            !notif.isRead && "bg-blue-50/30"
          )}>
            <div className="flex items-start gap-3">
              <div className={cn(
                "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                !notif.isRead ? "bg-blue-500" : "bg-[#D9D2C9]"
              )} />
              <div>
                <div className="text-[13px] font-medium text-[#1A1F2E]">{notif.title}</div>
                <div className="text-[12px] text-[#8896A5] mt-0.5">{notif.body}</div>
                <div className="text-[11px] text-[#B8C4CC] mt-1">{notif.timestamp}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <WelcomeBanner />

      <div className="grid grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="col-span-2">
          <QuickStats />
          <AIInsight />
          <SuggestedConnections />
          <UpcomingEvents />
        </div>

        {/* Side Column */}
        <div className="col-span-1">
          <MemberCard />

          {/* Profile Completeness */}
          <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft p-5 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[13.5px] font-semibold text-[#1A1F2E]">Perfil</h3>
              <span className="text-[12px] font-medium text-[#3A7BC8]">{currentUser.profileCompleteness}%</span>
            </div>
            <div className="w-full bg-[#EDE8E3] rounded-full h-1.5 mb-3">
              <div
                className="bg-gradient-to-r from-[#1E2D4E] to-[#3A7BC8] h-1.5 rounded-full transition-all"
                style={{ width: `${currentUser.profileCompleteness}%` }}
              />
            </div>
            <p className="text-[11.5px] text-[#8896A5] mb-3">
              Adiciona os teus interesses específicos para melhorar as recomendações da IA.
            </p>
            <Link href="/profile" className="text-[12.5px] font-medium text-[#3A7BC8] hover:text-[#1E2D4E] transition-colors">
              Completar perfil →
            </Link>
          </div>

          <RecentNotifications />

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft p-5">
            <h3 className="text-[13.5px] font-semibold text-[#1A1F2E] mb-3">Acções rápidas</h3>
            <div className="space-y-2">
              {[
                { label: "Pedir uma introdução", href: "/concierge", icon: MessageSquare, color: "text-purple-600" },
                { label: "Explorar oportunidades", href: "/opportunities", icon: Briefcase, color: "text-blue-600" },
                { label: "Ver empresas alumni", href: "/commerce", icon: Award, color: "text-emerald-600" },
                { label: "Entrar num grupo", href: "/groups", icon: Users, color: "text-amber-600" },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#FAF8F5] transition-colors group"
                  >
                    <Icon className={cn("w-4 h-4 flex-shrink-0", action.color)} />
                    <span className="text-[13px] text-[#4A5568] group-hover:text-[#1A1F2E] transition-colors">{action.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B8C4CC] group-hover:text-[#3A7BC8] ml-auto transition-colors" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
