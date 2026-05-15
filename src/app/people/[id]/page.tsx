"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Shield, MapPin, Briefcase, GraduationCap, Star,
  Users, ChevronLeft, MessageSquare, Sparkles, Award,
  CheckCircle, Globe, TrendingUp
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { alumniList, groups } from "@/data/demo";
import { getTrustColor, getTrustLabel, cn } from "@/lib/utils";

export default function AlumniProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [introRequested, setIntroRequested] = useState(false);
  const [connected, setConnected] = useState(false);

  const person = alumniList.find(a => a.id === params.id);

  if (!person) {
    return (
      <AppLayout>
        <div className="max-w-2xl mx-auto text-center py-20">
          <p className="text-[#8896A5]">Alumni não encontrado.</p>
          <button onClick={() => router.push("/people")} className="mt-4 text-[#3A7BC8] text-[13.5px]">
            ← Voltar à Comunidade
          </button>
        </div>
      </AppLayout>
    );
  }

  const trustColor = getTrustColor(person.trustScore);
  const trustLabel = getTrustLabel(person.trustScore);
  const personGroups = groups.filter(g => person.groups.includes(g.id));

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-[13px] text-[#8896A5] hover:text-[#1E2D4E] transition-colors mb-4"
        >
          <ChevronLeft className="w-4 h-4" />
          Voltar à Comunidade
        </button>

        {/* Hero */}
        <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft overflow-hidden mb-5">
          {/* Banner */}
          <div className="h-24 gradient-navy relative">
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(212,168,67,0.5) 0%, transparent 50%)" }}
            />
          </div>

          <div className="px-6 pb-5">
            <div className="flex items-end gap-4 -mt-10 mb-4">
              <div className="relative">
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="w-18 h-18 rounded-2xl border-4 border-white shadow-card bg-[#EDE8E3]"
                  style={{ width: 72, height: 72 }}
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white" />
              </div>

              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border mb-1`}
                style={{ backgroundColor: `${trustColor}12`, borderColor: `${trustColor}30` }}>
                <Star className="w-3 h-3" style={{ color: trustColor }} />
                <span className="text-[12.5px] font-bold" style={{ color: trustColor }}>{person.trustScore}</span>
                <span className="text-[11px]" style={{ color: trustColor }}>{trustLabel}</span>
              </div>

              <div className="ml-auto flex items-center gap-2 mb-1">
                {person.isVerified && (
                  <div className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2.5 py-1 rounded-xl">
                    <CheckCircle className="w-3 h-3" />
                    <span className="text-[11.5px] font-medium">Verificado</span>
                  </div>
                )}
                {person.isMentor && (
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-xl">
                    <Sparkles className="w-3 h-3" />
                    <span className="text-[11.5px] font-medium">Mentor</span>
                  </div>
                )}
                {person.isFounder && (
                  <div className="flex items-center gap-1 bg-purple-50 text-purple-700 px-2.5 py-1 rounded-xl">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-[11.5px] font-medium">Fundador</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4">
              <h1 className="text-xl font-bold text-[#1A1F2E] mb-0.5" style={{ fontFamily: "'Playfair Display', serif" }}>
                {person.name}
              </h1>
              <p className="text-[14px] text-[#4A5568] font-medium">{person.role} · {person.company}</p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-[12.5px] text-[#8896A5]">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{person.city}, {person.country}</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Turma {person.graduationYear}</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5" />
                  <span>{person.languages.join(", ")}</span>
                </div>
              </div>
            </div>

            {/* AI Why Relevant */}
            {person.whyRelevant && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-4">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10.5px] font-semibold text-blue-700 uppercase tracking-wide">Porquê relevante para ti</span>
                    <p className="text-[12.5px] text-blue-800 mt-0.5">{person.whyRelevant}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Mutual connections */}
            {person.mutualConnections && person.mutualConnections.length > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-3.5 h-3.5 text-[#8896A5]" />
                <span className="text-[12.5px] text-[#8896A5]">
                  <span className="font-medium text-[#4A5568]">{person.mutualConnections.length} conexões em comum</span>
                  {" — "}{person.mutualConnections.join(", ")}
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setConnected(!connected)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13.5px] font-medium transition-all border",
                  connected
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-[#FAF8F5] text-[#4A5568] border-[#D9D2C9] hover:border-[#1E2D4E]"
                )}
              >
                <Users className="w-4 h-4" />
                {connected ? "Conectado ✓" : "Conectar"}
              </button>
              <button
                onClick={() => setIntroRequested(!introRequested)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13.5px] font-medium transition-all",
                  introRequested
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : "bg-[#1E2D4E] hover:bg-[#2A3F6E] text-white"
                )}
              >
                <Sparkles className="w-4 h-4" />
                {introRequested ? "Introdução pedida ✓" : "Pedir introdução AI"}
              </button>
              <button className="p-2.5 bg-[#FAF8F5] hover:bg-[#F0EBE3] border border-[#D9D2C9] rounded-xl transition-colors">
                <MessageSquare className="w-4 h-4 text-[#8896A5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 space-y-4">
            {/* Bio */}
            <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft p-5">
              <h2 className="text-[14.5px] font-semibold text-[#1A1F2E] mb-3">Sobre</h2>
              <p className="text-[13.5px] text-[#4A5568] leading-relaxed">{person.bio}</p>
            </div>

            {/* Skills */}
            {person.skills && person.skills.length > 0 && (
              <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft p-5">
                <h2 className="text-[14.5px] font-semibold text-[#1A1F2E] mb-3">Competências</h2>
                <div className="flex flex-wrap gap-2">
                  {person.skills.map(skill => (
                    <span key={skill} className="text-[12.5px] bg-[#FAF8F5] border border-[#EDE8E3] text-[#4A5568] px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Groups */}
            {personGroups.length > 0 && (
              <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft p-5">
                <h2 className="text-[14.5px] font-semibold text-[#1A1F2E] mb-3">Grupos</h2>
                <div className="flex flex-wrap gap-2">
                  {personGroups.map(g => (
                    <div key={g.id} className="flex items-center gap-1.5 bg-[#FAF8F5] border border-[#EDE8E3] px-3 py-1.5 rounded-full">
                      <span>{g.emoji}</span>
                      <span className="text-[12.5px] text-[#4A5568]">{g.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Interests */}
            <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft p-4">
              <h3 className="text-[13px] font-semibold text-[#1A1F2E] mb-3">Interesses</h3>
              <div className="flex flex-wrap gap-1.5">
                {person.interests.map(interest => (
                  <span key={interest} className="text-[11.5px] bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 rounded-full">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Connection strength */}
            {person.connectionStrength && (
              <div className={cn(
                "rounded-2xl border p-4",
                person.connectionStrength === "close" ? "bg-emerald-50 border-emerald-200" :
                person.connectionStrength === "warm" ? "bg-amber-50 border-amber-200" :
                "bg-[#FAF8F5] border-[#EDE8E3]"
              )}>
                <h3 className="text-[13px] font-semibold mb-1">
                  {person.connectionStrength === "close" ? "🤝 Conexão próxima" :
                   person.connectionStrength === "warm" ? "🌟 Conexão quente" :
                   "💫 Na tua rede"}
                </h3>
                <p className="text-[12px] text-[#4A5568]">
                  {person.connectionStrength === "close" ? "Conheces bem esta pessoa através de múltiplas conexões." :
                   person.connectionStrength === "warm" ? "Têm amigos em comum e interesses partilhados." :
                   "Partilham a rede AAASE. Uma introdução pode aproximar."}
                </p>
              </div>
            )}

            {/* Industry */}
            <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft p-4">
              <h3 className="text-[13px] font-semibold text-[#1A1F2E] mb-2">Indústria</h3>
              <span className="text-[12.5px] bg-[#1E2D4E]/8 text-[#1E2D4E] px-3 py-1 rounded-full">
                {person.industry}
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
