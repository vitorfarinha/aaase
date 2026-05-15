"use client";

import { useState } from "react";
import {
  Shield, MapPin, Briefcase, GraduationCap, Star, Edit3,
  Globe, Award, Users, Calendar, ChevronRight,
  CheckCircle, BarChart3, TrendingUp, Sparkles
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { currentUser, alumniList, groups, opportunities } from "@/data/demo";
import { getTrustColor, getTrustLabel, cn } from "@/lib/utils";

const timelineItems = [
  { year: "2008", event: "Graduação — Colégio Salesiano de Estoril", type: "education" },
  { year: "2010", event: "Product Manager — Vodafone Portugal", type: "work" },
  { year: "2014", event: "Senior PM — Farfetch", type: "work" },
  { year: "2019", event: "Membro AAASE #247", type: "community" },
  { year: "2020", event: "Director of Product — Farfetch", type: "work" },
  { year: "2022", event: "Mentor certificado AAASE", type: "community" },
  { year: "2024", event: "Grupo Fundadores — Co-líder", type: "community" },
];

const skills = [
  "Product Strategy", "Roadmap Planning", "User Research",
  "A/B Testing", "Stakeholder Management", "Agile / Scrum",
  "Data Analytics", "AI / ML Products", "Team Leadership",
  "Startup Advisory"
];

const interests = [
  "Product Strategy", "AI", "Sustainability", "Education", "Startups", "Mentoring"
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"sobre" | "grupos" | "actividade">("sobre");
  const [editing, setEditing] = useState(false);

  const trustColor = getTrustColor(currentUser.trustScore);
  const trustLabel = getTrustLabel(currentUser.trustScore);

  const myGroups = groups.filter(g => currentUser.groups.includes(g.id));

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        {/* Hero Card */}
        <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft overflow-hidden mb-5">
          {/* Banner */}
          <div className="h-28 gradient-navy relative">
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(212,168,67,0.6) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(58,123,200,0.4) 0%, transparent 40%)" }}
            />
            <button
              onClick={() => setEditing(!editing)}
              className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 rounded-xl text-white text-[12.5px] font-medium transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Editar perfil
            </button>
          </div>

          {/* Profile info */}
          <div className="px-6 pb-5">
            <div className="flex items-end gap-4 -mt-12 mb-4">
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-[#1E2D4E] border-4 border-white shadow-card flex items-center justify-center">
                  <span className="text-white text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {currentUser.initials}
                  </span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-white" />
              </div>

              {/* Trust score */}
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border mb-1`}
                style={{ backgroundColor: `${trustColor}12`, borderColor: `${trustColor}30` }}>
                <Star className="w-3.5 h-3.5" style={{ color: trustColor }} />
                <span className="text-[13px] font-bold" style={{ color: trustColor }}>{currentUser.trustScore}</span>
                <span className="text-[11px] font-medium" style={{ color: trustColor }}>{trustLabel}</span>
              </div>

              <div className="ml-auto flex items-center gap-2 mb-1">
                <span className="font-mono text-[12px] text-[#8896A5] bg-[#FAF8F5] border border-[#EDE8E3] px-3 py-1 rounded-xl">
                  {currentUser.memberNumber}
                </span>
                {currentUser.isVerified && (
                  <div className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2.5 py-1 rounded-xl">
                    <CheckCircle className="w-3 h-3" />
                    <span className="text-[11.5px] font-medium">Verificado</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4">
              <h1 className="text-xl font-bold text-[#1A1F2E] mb-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
                {currentUser.name}
              </h1>
              <p className="text-[14px] text-[#4A5568] font-medium">{currentUser.role}</p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-[12.5px] text-[#8896A5]">
                <div className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>{currentUser.company}</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{currentUser.city}</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Turma {currentUser.graduationYear}</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Membro desde {currentUser.memberSince}</span>
                </div>
              </div>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-4 gap-3 p-4 bg-[#FAF8F5] rounded-xl border border-[#EDE8E3]">
              {[
                { label: "Conexões", value: "312", icon: Users },
                { label: "Introd. feitas", value: "47", icon: TrendingUp },
                { label: "Mentees", value: "12", icon: Award },
                { label: "Perfil", value: `${currentUser.profileCompleteness}%`, icon: BarChart3 },
              ].map(stat => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <Icon className="w-4 h-4 text-[#3A7BC8] mx-auto mb-1" />
                    <div className="text-[17px] font-bold text-[#1A1F2E]">{stat.value}</div>
                    <div className="text-[11px] text-[#8896A5]">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t border-[#EDE8E3] px-6 flex gap-6">
            {(["sobre", "grupos", "actividade"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "py-3 text-[13.5px] font-medium border-b-2 transition-all capitalize",
                  activeTab === tab
                    ? "border-[#1E2D4E] text-[#1E2D4E]"
                    : "border-transparent text-[#8896A5] hover:text-[#4A5568]"
                )}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "sobre" && (
          <div className="grid grid-cols-3 gap-5">
            {/* Main column */}
            <div className="col-span-2 space-y-4">
              {/* Bio */}
              <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft p-5">
                <h2 className="text-[14.5px] font-semibold text-[#1A1F2E] mb-3">Sobre mim</h2>
                <p className="text-[13.5px] text-[#4A5568] leading-relaxed">{currentUser.bio}</p>
              </div>

              {/* Skills */}
              <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft p-5">
                <h2 className="text-[14.5px] font-semibold text-[#1A1F2E] mb-3">Competências</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <span key={skill} className="text-[12.5px] bg-[#FAF8F5] border border-[#EDE8E3] text-[#4A5568] px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft p-5">
                <h2 className="text-[14.5px] font-semibold text-[#1A1F2E] mb-4">Percurso</h2>
                <div className="space-y-3">
                  {timelineItems.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className={cn(
                          "w-2 h-2 rounded-full mt-1.5 flex-shrink-0",
                          item.type === "education" ? "bg-blue-400" :
                          item.type === "community" ? "bg-amber-400" : "bg-[#1E2D4E]"
                        )} />
                        {i < timelineItems.length - 1 && (
                          <div className="w-px flex-1 bg-[#EDE8E3] mt-1 h-5" />
                        )}
                      </div>
                      <div className="pb-3">
                        <span className="font-mono text-[11px] text-[#8896A5] mr-2">{item.year}</span>
                        <span className="text-[13px] text-[#4A5568]">{item.event}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Mentor badge */}
              {currentUser.isMentor && (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/60 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span className="text-[13px] font-semibold text-amber-900">Mentor activo</span>
                  </div>
                  <p className="text-[12px] text-amber-700 leading-relaxed">
                    Disponível para sessões 1:1 de mentoria em produto, AI e startups.
                  </p>
                  <button className="mt-3 w-full text-[12.5px] bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 rounded-xl transition-colors">
                    Pedir sessão de mentoria
                  </button>
                </div>
              )}

              {/* Interests */}
              <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft p-4">
                <h3 className="text-[13px] font-semibold text-[#1A1F2E] mb-3">Interesses</h3>
                <div className="flex flex-wrap gap-1.5">
                  {interests.map(interest => (
                    <span key={interest} className="text-[11.5px] bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 rounded-full">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Community badges */}
              <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft p-4">
                <h3 className="text-[13px] font-semibold text-[#1A1F2E] mb-3">Badges</h3>
                <div className="space-y-2.5">
                  {[
                    { emoji: "✦", label: "Membro verificado", color: "text-blue-600" },
                    { emoji: "🎓", label: "Turma 2008", color: "text-purple-600" },
                    { emoji: "🌟", label: "Top mentor 2024", color: "text-amber-600" },
                    { emoji: "🤝", label: "47 introduções feitas", color: "text-emerald-600" },
                  ].map(badge => (
                    <div key={badge.label} className="flex items-center gap-2">
                      <span className={`text-sm ${badge.color}`}>{badge.emoji}</span>
                      <span className="text-[12px] text-[#4A5568]">{badge.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "grupos" && (
          <div className="grid grid-cols-2 gap-4">
            {myGroups.map(group => (
              <div key={group.id} className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft p-5 card-hover">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">{group.emoji}</span>
                  <div>
                    <h3 className="text-[14px] font-semibold text-[#1A1F2E]">{group.name}</h3>
                    <p className="text-[12px] text-[#8896A5]">{group.memberCount} membros</p>
                  </div>
                  {group.isPrivate && (
                    <span className="ml-auto text-[10.5px] bg-[#FAF8F5] border border-[#EDE8E3] text-[#8896A5] px-2 py-0.5 rounded-full">
                      Privado
                    </span>
                  )}
                </div>
                <p className="text-[12.5px] text-[#4A5568] leading-relaxed mb-3">{group.description}</p>
                <p className="text-[11.5px] text-[#8896A5] italic">{group.recentActivity}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "actividade" && (
          <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft p-6">
            <div className="space-y-4">
              {[
                { action: "Fez uma introdução entre Sofia Carvalho e Rui Costa", time: "há 2 dias", icon: "🤝" },
                { action: "Juntou-se ao grupo Fundadores", time: "há 1 semana", icon: "🏗️" },
                { action: "Endossou Lopes & Associados", time: "há 2 semanas", icon: "⭐" },
                { action: "Sessão de mentoria com Catarina Mendes", time: "há 3 semanas", icon: "🌟" },
                { action: "Registou-se no Summit Anual AAASE 2026", time: "há 1 mês", icon: "🎟️" },
                { action: "Completou o perfil AAASE (91%)", time: "há 2 meses", icon: "✓" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b border-[#EDE8E3] last:border-0 last:pb-0">
                  <div className="w-8 h-8 bg-[#FAF8F5] rounded-xl flex items-center justify-center text-base flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[13.5px] text-[#1A1F2E]">{item.action}</p>
                    <p className="text-[11.5px] text-[#8896A5] mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
