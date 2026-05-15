"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, Shield, Star, MapPin, Users, Sparkles, MessageSquare, UserPlus, ChevronDown } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { alumniList } from "@/data/demo";
import { cn } from "@/lib/utils";
import type { Alumni } from "@/types";

const filters = ["Todos", "Lisboa", "Mentores", "Fundadores", "AI & Tech", "Sustentabilidade", "Saúde", "Investidores", "Expats"];

function AlumniCard({ person }: { person: Alumni }) {
  const [introRequested, setIntroRequested] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft hover:shadow-card transition-all p-5 card-hover">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="relative flex-shrink-0">
          <img src={person.avatar} alt={person.name} className="w-12 h-12 rounded-full bg-[#EDE8E3]" />
          {person.isVerified && (
            <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
              <Shield className="w-2.5 h-2.5 text-white" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[14px] font-semibold text-[#1A1F2E]">{person.name}</span>
            <span className="text-[10px] text-[#8896A5] bg-[#FAF8F5] px-1.5 py-0.5 rounded-full">
              Turma {person.graduationYear}
            </span>
          </div>
          <div className="text-[12.5px] text-[#4A5568] mt-0.5">{person.role}</div>
          <div className="text-[12px] text-[#8896A5]">{person.company}</div>
        </div>
        <div className="flex-shrink-0 text-right">
          <div className={cn(
            "text-[11px] font-medium px-2 py-1 rounded-full",
            person.trustScore >= 90 ? "bg-emerald-50 text-emerald-700" :
            person.trustScore >= 75 ? "bg-blue-50 text-blue-700" :
            "bg-amber-50 text-amber-700"
          )}>
            ✦ {person.trustScore}
          </div>
        </div>
      </div>

      {/* Location & badges */}
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <div className="flex items-center gap-1 text-[12px] text-[#8896A5]">
          <MapPin className="w-3 h-3" />
          {person.city}, {person.country}
        </div>
        {person.isMentor && (
          <span className="text-[10.5px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-medium">Mentor</span>
        )}
        {person.isFounder && (
          <span className="text-[10.5px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Fundador</span>
        )}
      </div>

      {/* AI Why Relevant */}
      {person.whyRelevant && (
        <div className="bg-blue-50/60 rounded-xl p-3 mb-3">
          <div className="flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-[11.5px] text-blue-800 leading-relaxed">
              <span className="font-semibold">Porquê relevante: </span>{person.whyRelevant}
            </p>
          </div>
        </div>
      )}

      {/* Mutual connections */}
      {person.mutualConnections && person.mutualConnections.length > 0 && (
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-3 h-3 text-[#8896A5]" />
          <span className="text-[12px] text-[#8896A5]">
            {person.mutualConnections.length} conexão{person.mutualConnections.length > 1 ? "ões" : ""} em comum:
            <span className="text-[#4A5568] font-medium"> {person.mutualConnections.slice(0, 2).join(", ")}</span>
          </span>
        </div>
      )}

      {/* Interests */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {person.interests.slice(0, 3).map((interest) => (
          <span key={interest} className="text-[11px] text-[#4A5568] bg-[#FAF8F5] border border-[#EDE8E3] px-2 py-0.5 rounded-full">
            {interest}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Link
          href={`/people/${person.id}`}
          className="flex-1 text-center text-[12.5px] font-medium text-[#1A1F2E] bg-[#FAF8F5] hover:bg-[#F0EBE3] border border-[#EDE8E3] rounded-xl py-2 transition-colors"
        >
          Ver perfil
        </Link>
        <button
          onClick={() => setIntroRequested(!introRequested)}
          className={cn(
            "flex-1 flex items-center justify-center gap-1.5 text-[12.5px] font-medium rounded-xl py-2 transition-all",
            introRequested
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-[#1E2D4E] hover:bg-[#2A3F6E] text-white"
          )}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          {introRequested ? "Pedido enviado ✓" : "Introdução"}
        </button>
      </div>
    </div>
  );
}

function SearchFilters({ activeFilter, setActiveFilter }: { activeFilter: string; setActiveFilter: (f: string) => void }) {
  return (
    <div className="flex gap-2 flex-wrap mb-6">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={cn(
            "px-3 py-1.5 rounded-xl text-[12.5px] font-medium transition-all",
            activeFilter === filter
              ? "bg-[#1E2D4E] text-white shadow-soft"
              : "bg-white text-[#4A5568] border border-[#EDE8E3] hover:border-[#B8AFA5]"
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default function PeoplePage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");

  const filteredAlumni = alumniList.filter((a) => {
    const matchesSearch =
      !search ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.role.toLowerCase().includes(search.toLowerCase()) ||
      a.company.toLowerCase().includes(search.toLowerCase()) ||
      a.industry.toLowerCase().includes(search.toLowerCase()) ||
      a.city.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      activeFilter === "Todos" ||
      (activeFilter === "Lisboa" && a.city === "Lisboa") ||
      (activeFilter === "Mentores" && a.isMentor) ||
      (activeFilter === "Fundadores" && a.isFounder) ||
      (activeFilter === "AI & Tech" && (a.industry.includes("AI") || a.industry.includes("Tech") || a.industry.includes("FinTech"))) ||
      (activeFilter === "Sustentabilidade" && (a.industry.includes("Clima") || a.interests.includes("ClimaTech") || a.interests.includes("Sustentabilidade"))) ||
      (activeFilter === "Saúde" && a.industry.includes("Health")) ||
      (activeFilter === "Investidores" && a.industry.includes("Capital")) ||
      (activeFilter === "Expats" && a.country !== "Portugal");

    return matchesSearch && matchesFilter;
  });

  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1A1F2E] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            Comunidade Alumni
          </h1>
          <p className="text-[14px] text-[#8896A5]">
            {alumniList.length} alumni · Recomendações personalizadas pela IA
          </p>
        </div>

        {/* AI Banner */}
        <div className="bg-gradient-to-br from-[#1E2D4E] to-[#2A3F6E] rounded-2xl p-5 mb-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="text-[12px] font-semibold uppercase tracking-wide text-white/70">AI Concierge</span>
          </div>
          <p className="text-[14px] text-white/80 mb-3">
            Diz ao Concierge quem procuras e ele encontra a melhor correspondência na rede.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              "Quem trabalha em AI em Lisboa?",
              "Encontrar fundadores em sustentabilidade",
              "Quem pode ajudar com fundraising?",
              "Advogados alumni de confiança",
            ].map((prompt) => (
              <Link
                key={prompt}
                href={`/concierge?q=${encodeURIComponent(prompt)}`}
                className="text-[12px] bg-white/10 hover:bg-white/20 text-white/80 hover:text-white px-3 py-1.5 rounded-xl transition-colors border border-white/10"
              >
                {prompt}
              </Link>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8896A5]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar por nome, empresa, cidade, área..."
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#D9D2C9] rounded-xl text-[14px] text-[#1A1F2E] placeholder-[#B8C4CC] focus:outline-none focus:ring-2 focus:ring-[#3A7BC8]/20 focus:border-[#3A7BC8] transition-all shadow-soft"
          />
        </div>

        <SearchFilters activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-[13px] text-[#8896A5]">
            {filteredAlumni.length} alumni encontrado{filteredAlumni.length !== 1 ? "s" : ""}
          </p>
          <button className="flex items-center gap-1.5 text-[12.5px] text-[#4A5568] hover:text-[#1A1F2E] transition-colors">
            <Filter className="w-3.5 h-3.5" />
            Filtros avançados
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Grid */}
        {filteredAlumni.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {filteredAlumni.map((person) => (
              <AlumniCard key={person.id} person={person} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-14 h-14 bg-[#FAF8F5] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-[#B8C4CC]" />
            </div>
            <h3 className="text-[15px] font-semibold text-[#1A1F2E] mb-1">Nenhum alumni encontrado</h3>
            <p className="text-[13px] text-[#8896A5] mb-4">Tenta outra pesquisa ou usa o AI Concierge.</p>
            <Link href="/concierge" className="text-[13px] font-medium text-[#3A7BC8] hover:text-[#1E2D4E] transition-colors">
              Abrir AI Concierge →
            </Link>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
