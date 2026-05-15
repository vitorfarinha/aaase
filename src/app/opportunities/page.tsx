"use client";

import { useState } from "react";
import Link from "next/link";
import { Briefcase, Users, TrendingUp, Clock, MapPin, Sparkles, ChevronRight, Filter } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { opportunities } from "@/data/demo";
import { cn, getOpportunityTypeLabel, getOpportunityTypeColor } from "@/lib/utils";

const typeFilters = ["Todas", "Emprego", "Consultoria", "Mentoria", "Orador", "Investimento", "Voluntariado", "Colaboração"];

function OpportunityCard({ opp }: { opp: typeof opportunities[0] }) {
  const [applied, setApplied] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft hover:shadow-card transition-all p-5 card-hover">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0 mr-3">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={cn("text-[11px] px-2.5 py-0.5 rounded-full font-medium", getOpportunityTypeColor(opp.type))}>
              {getOpportunityTypeLabel(opp.type)}
            </span>
            {opp.relevanceScore >= 85 && (
              <span className="text-[10.5px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                {opp.relevanceScore}% match
              </span>
            )}
          </div>
          <h3 className="text-[14.5px] font-semibold text-[#1A1F2E] leading-snug">{opp.title}</h3>
        </div>
        <div className="text-right flex-shrink-0">
          <div className={cn(
            "text-[12px] font-bold px-2.5 py-1 rounded-xl",
            opp.relevanceScore >= 90 ? "bg-emerald-50 text-emerald-700" :
            opp.relevanceScore >= 75 ? "bg-blue-50 text-blue-700" :
            "bg-amber-50 text-amber-700"
          )}>
            {opp.relevanceScore}%
          </div>
        </div>
      </div>

      {/* Company & Location */}
      <div className="flex items-center gap-3 mb-3 text-[12.5px] text-[#8896A5]">
        <span className="font-medium text-[#4A5568]">{opp.company}</span>
        <span>·</span>
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          {opp.city}, {opp.country}
        </div>
        {opp.deadline && (
          <>
            <span>·</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {opp.deadline}
            </div>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-[13px] text-[#4A5568] leading-relaxed mb-3 line-clamp-2">
        {opp.description}
      </p>

      {/* AI Why Matched */}
      <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-3 mb-3">
        <div className="flex items-start gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-[11.5px] text-amber-800 leading-relaxed">
            <span className="font-semibold">Porquê match: </span>{opp.whyMatched}
          </p>
        </div>
      </div>

      {/* Mutual connections */}
      {opp.mutualConnections.length > 0 && (
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-3 h-3 text-[#8896A5]" />
          <span className="text-[12px] text-[#8896A5]">
            Conexões: <span className="text-[#4A5568] font-medium">{opp.mutualConnections.join(", ")}</span>
          </span>
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {opp.tags.map((tag) => (
          <span key={tag} className="text-[10.5px] text-[#4A5568] bg-[#FAF8F5] border border-[#EDE8E3] px-2 py-0.5 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      {/* Compensation */}
      {opp.compensation && (
        <div className="text-[12.5px] font-medium text-emerald-700 bg-emerald-50 rounded-xl px-3 py-2 mb-4">
          💰 {opp.compensation}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <Link href="/concierge" className="flex-1 text-center text-[12.5px] font-medium text-[#4A5568] bg-[#FAF8F5] hover:bg-[#F0EBE3] border border-[#EDE8E3] rounded-xl py-2 transition-colors">
          Pedir introdução
        </Link>
        <button
          onClick={() => setApplied(!applied)}
          className={cn(
            "flex-1 text-[12.5px] font-medium rounded-xl py-2 transition-all",
            applied
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-[#1E2D4E] hover:bg-[#2A3F6E] text-white"
          )}
        >
          {applied ? "Candidatura enviada ✓" : "Candidatar"}
        </button>
      </div>
    </div>
  );
}

export default function OpportunitiesPage() {
  const [activeType, setActiveType] = useState("Todas");
  const [sortBy, setSortBy] = useState("match");

  const sorted = [...opportunities].sort((a, b) =>
    sortBy === "match" ? b.relevanceScore - a.relevanceScore : 0
  );

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1A1F2E] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            Oportunidades
          </h1>
          <p className="text-[14px] text-[#8896A5]">
            {opportunities.length} oportunidades · Ordenadas por compatibilidade com o teu perfil
          </p>
        </div>

        {/* AI Match Banner */}
        <div className="bg-gradient-to-br from-[#1E2D4E] to-[#2A3F6E] rounded-2xl p-5 mb-6 text-white">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-white/10 rounded-xl flex-shrink-0">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="text-[12px] font-semibold text-white/60 uppercase tracking-wide mb-1">AI Matching Activado</div>
              <p className="text-[14px] text-white/85 leading-relaxed mb-3">
                A IA analisou o teu perfil e identificou <strong className="text-white">5 oportunidades</strong> com alta compatibilidade.
                A melhor match é o <strong className="text-white">Head of Product na GreenLeap</strong> — 96% de compatibilidade.
              </p>
              <Link href="/concierge" className="inline-flex items-center gap-2 text-[12.5px] bg-white/15 hover:bg-white/25 text-white px-3 py-2 rounded-xl transition-colors font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                Explorar com AI Concierge
              </Link>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap mb-4">
          {typeFilters.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={cn(
                "px-3 py-1.5 rounded-xl text-[12.5px] font-medium transition-all",
                activeType === type
                  ? "bg-[#1E2D4E] text-white shadow-soft"
                  : "bg-white text-[#4A5568] border border-[#EDE8E3] hover:border-[#B8AFA5]"
              )}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-[13px] text-[#8896A5]">{sorted.length} oportunidades</p>
          <div className="flex items-center gap-2">
            <span className="text-[12.5px] text-[#8896A5]">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-[12.5px] text-[#4A5568] bg-white border border-[#D9D2C9] rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#3A7BC8]/20"
            >
              <option value="match">Compatibilidade</option>
              <option value="recent">Mais recentes</option>
            </select>
          </div>
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-2 gap-4">
          {sorted.map((opp) => (
            <OpportunityCard key={opp.id} opp={opp} />
          ))}
        </div>

        {/* Post Opportunity */}
        <div className="mt-6 bg-[#FAF8F5] border border-[#EDE8E3] rounded-2xl p-5 text-center">
          <h3 className="text-[15px] font-semibold text-[#1A1F2E] mb-1">Tens uma oportunidade para partilhar?</h3>
          <p className="text-[13px] text-[#8896A5] mb-4">
            Partilha empregos, colaborações, ou procura de mentores com a comunidade AAASE.
          </p>
          <button className="px-5 py-2.5 bg-[#1E2D4E] hover:bg-[#2A3F6E] text-white text-[13px] font-medium rounded-xl transition-colors">
            Publicar oportunidade
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
