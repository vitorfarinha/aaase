"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Shield, MapPin, Users, Sparkles } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { alumniList } from "@/data/demo";
import { cn } from "@/lib/utils";
import type { Alumni } from "@/types";

const filters = ["Todos", "Lisboa", "Mentores", "Fundadores", "AI & Tech", "Sustentabilidade", "Saúde", "Investidores", "Expats"];

function AlumniCard({ person }: { person: Alumni }) {
  const [introRequested, setIntroRequested] = useState(false);
  const trustColor = person.trustScore >= 90 ? "#22C55E" : person.trustScore >= 75 ? "var(--blue)" : "var(--gold)";

  return (
    <div className="card-glass animate-fade-up" style={{ padding: "22px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
        <div style={{ position: "relative", flexShrink: 0 }}>
          <img src={person.avatar} alt={person.name} style={{ width: 50, height: 50, borderRadius: "50%", background: "var(--n150)", border: "2px solid white", boxShadow: "var(--shadow-sm)" }} />
          {person.isVerified && (
            <div style={{ position: "absolute", bottom: -1, right: -1, width: 18, height: 18, background: "var(--blue)", borderRadius: "50%", border: "2px solid white", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Shield style={{ width: 9, height: 9, color: "white" }} />
            </div>
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 2 }}>
            <span style={{ fontSize: 14.5, fontWeight: 650, color: "var(--n800)", letterSpacing: "-0.015em" }}>{person.name}</span>
            <span className="pill pill-neutral" style={{ fontSize: 10, padding: "2px 7px" }}>Turma {person.graduationYear}</span>
          </div>
          <div style={{ fontSize: 13, color: "var(--n600)", marginBottom: 1 }}>{person.role}</div>
          <div style={{ fontSize: 12, color: "var(--n400)" }}>{person.company}</div>
        </div>
        {/* Trust score */}
        <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, background: "var(--n50)", border: `1px solid ${trustColor}30`, borderRadius: 10, padding: "5px 10px" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: trustColor }} />
            <span style={{ fontSize: 12, fontWeight: 650, color: trustColor, letterSpacing: "-0.01em" }}>{person.trustScore}</span>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--n400)" }}>
          <MapPin style={{ width: 11, height: 11 }} />
          {person.city}, {person.country}
        </div>
        {person.isMentor && <span className="pill pill-gold" style={{ fontSize: 10.5, padding: "2px 9px" }}>Mentor</span>}
        {person.isFounder && <span className="pill pill-green" style={{ fontSize: 10.5, padding: "2px 9px" }}>Fundador</span>}
      </div>

      {/* AI Why Relevant */}
      {person.whyRelevant && (
        <div style={{ background: "var(--blue-muted)", border: "1px solid rgba(46,109,180,0.12)", borderRadius: 14, padding: "10px 13px", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
            <Sparkles style={{ width: 13, height: 13, color: "var(--blue)", flexShrink: 0, marginTop: 1 }} />
            <p style={{ fontSize: 11.5, color: "var(--blue-dark)", lineHeight: 1.55 }}>
              <strong>Porquê relevante:</strong> {person.whyRelevant}
            </p>
          </div>
        </div>
      )}

      {/* Mutual connections */}
      {person.mutualConnections && person.mutualConnections.length > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 12 }}>
          <Users style={{ width: 12, height: 12, color: "var(--n400)" }} />
          <span style={{ fontSize: 12, color: "var(--n500)" }}>
            {person.mutualConnections.length} conexões em comum: <strong style={{ color: "var(--n700)" }}>{person.mutualConnections.slice(0, 2).join(", ")}</strong>
          </span>
        </div>
      )}

      {/* Interests */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {person.interests.slice(0, 3).map((t) => (
          <span key={t} className="pill pill-neutral" style={{ fontSize: 11, padding: "3px 10px" }}>{t}</span>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 8 }}>
        <Link href={`/people/${person.id}`} style={{ flex: 1, textAlign: "center", fontSize: 13, fontWeight: 500, color: "var(--n800)", background: "var(--n100)", border: "1px solid var(--n200)", borderRadius: 12, padding: "9px 0", textDecoration: "none", transition: "all 0.15s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--n150)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--n100)"; }}
        >
          Ver perfil
        </Link>
        <button
          onClick={() => setIntroRequested(true)}
          className="btn-primary"
          style={{ flex: 1, fontSize: 13, padding: "9px 0", borderRadius: 12, background: introRequested ? "#22C55E" : "var(--blue)", boxShadow: introRequested ? "0 2px 8px rgba(34,197,94,0.25)" : undefined }}
        >
          {introRequested ? "✓ Pedido" : "Introdução"}
        </button>
      </div>
    </div>
  );
}

export default function PeoplePage() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [search, setSearch] = useState("");

  const filtered = alumniList.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.company.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeFilter === "Todos") return true;
    if (activeFilter === "Lisboa") return p.city === "Lisboa";
    if (activeFilter === "Mentores") return p.isMentor;
    if (activeFilter === "Fundadores") return p.isFounder;
    if (activeFilter === "AI & Tech") return p.industry.toLowerCase().includes("ai") || p.industry.toLowerCase().includes("tech") || p.industry.toLowerCase().includes("fintech");
    if (activeFilter === "Sustentabilidade") return p.interests.some(i => i.toLowerCase().includes("sustain") || i.toLowerCase().includes("clima"));
    if (activeFilter === "Saúde") return p.industry.toLowerCase().includes("health") || p.industry.toLowerCase().includes("med");
    if (activeFilter === "Investidores") return p.industry.toLowerCase().includes("capital") || p.industry.toLowerCase().includes("invest");
    if (activeFilter === "Expats") return p.city !== "Lisboa" && p.country !== "Portugal";
    return true;
  });

  return (
    <AppLayout>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }} className="animate-fade-up">
          <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--n800)", marginBottom: 6 }}>Comunidade Alumni</h1>
          <p style={{ fontSize: 14, color: "var(--n400)" }}>847 alumni · Recomendações personalizadas pela IA</p>
        </div>

        {/* Search + AI banner */}
        <div className="ai-strip animate-fade-up delay-100" style={{ padding: "14px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 14 }}>
          <Sparkles style={{ width: 16, height: 16, color: "var(--gold)", flexShrink: 0 }} />
          <p style={{ fontSize: 13, color: "var(--n600)", flex: 1 }}>
            Usa o <strong style={{ color: "var(--n800)" }}>AI Concierge</strong> para encontrar pessoas. Experimenta: "Quem trabalha em AI em Lisboa?" ou "Encontrar fundadores em sustentabilidade"
          </p>
          <Link href="/concierge" className="btn-primary" style={{ fontSize: 12.5, padding: "8px 16px", borderRadius: 11, whiteSpace: "nowrap" }}>
            Abrir Concierge
          </Link>
        </div>

        {/* Search bar */}
        <div className="animate-fade-up delay-150" style={{ position: "relative", marginBottom: 16 }}>
          <Search style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, color: "var(--n400)" }} />
          <input
            className="input-field"
            style={{ paddingLeft: 42 }}
            placeholder="Pesquisar por nome, empresa, cidade, área..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="animate-fade-up delay-200" style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)}
              style={{
                padding: "7px 16px", borderRadius: 999, fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all 0.15s",
                background: activeFilter === f ? "var(--blue)" : "var(--n0)",
                color: activeFilter === f ? "white" : "var(--n600)",
                boxShadow: activeFilter === f ? "0 2px 8px rgba(46,109,180,0.25)" : "var(--shadow-xs)",
                border: activeFilter === f ? "none" : "1px solid var(--n200)",
              } as React.CSSProperties}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 }}>
          {filtered.map((person, i) => (
            <div key={person.id} style={{ animationDelay: `${i * 0.06}s` }}>
              <AlumniCard person={person} />
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 20px", color: "var(--n400)" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
              <div style={{ fontSize: 15, fontWeight: 500, color: "var(--n600)", marginBottom: 6 }}>Nenhum alumni encontrado</div>
              <div style={{ fontSize: 13 }}>Tenta pesquisar com outros termos ou usa o AI Concierge</div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
