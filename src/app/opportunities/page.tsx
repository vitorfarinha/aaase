"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, MapPin, Calendar, ChevronRight, Users } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { opportunities } from "@/data/demo";
import { cn } from "@/lib/utils";

const types = ["Todas", "job", "investment", "mentoring", "speaking", "collaboration"];
const typeLabel: Record<string, string> = { job: "Emprego", investment: "Investimento", mentoring: "Mentoria", speaking: "Palestra", collaboration: "Colaboração", consulting: "Consultoria" };
const typeColor: Record<string, string> = { job: "pill-blue", investment: "pill-gold", mentoring: "pill-green", speaking: "pill-red", collaboration: "pill-neutral" };

export default function OpportunitiesPage() {
  const [activeType, setActiveType] = useState("Todas");

  const filtered = opportunities.filter(o => activeType === "Todas" || o.type === activeType);

  return (
    <AppLayout>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ marginBottom: 28 }} className="animate-fade-up">
          <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--n800)", marginBottom: 6 }}>Oportunidades</h1>
          <p style={{ fontSize: 14, color: "var(--n400)" }}>Correspondências com IA baseadas no teu perfil e rede</p>
        </div>

        {/* AI Banner */}
        <div className="hero-gradient animate-fade-up delay-100" style={{ borderRadius: 20, padding: "20px 24px", marginBottom: 24, color: "white" }}>
          <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Sparkles style={{ width: 18, height: 18 }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 3 }}>5 oportunidades encontradas para ti</div>
              <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.65)" }}>O AI Concierge pode ajudar-te a navegar e a pedir introduções directamente</div>
            </div>
            <Link href="/concierge" style={{ fontSize: 13, fontWeight: 500, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.22)", borderRadius: 12, padding: "9px 18px", color: "white", textDecoration: "none", whiteSpace: "nowrap" }}>
              Abrir Concierge
            </Link>
          </div>
        </div>

        {/* Type filters */}
        <div className="animate-fade-up delay-150" style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {types.map(t => (
            <button key={t} onClick={() => setActiveType(t)}
              style={{ padding: "7px 16px", borderRadius: 999, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s", background: activeType === t ? "var(--blue)" : "var(--n0)", color: activeType === t ? "white" : "var(--n600)", border: activeType === t ? "none" : "1px solid var(--n200)", boxShadow: activeType === t ? "0 2px 8px rgba(46,109,180,0.25)" : "var(--shadow-xs)" } as React.CSSProperties}
            >{t === "Todas" ? "Todas" : typeLabel[t] || t}</button>
          ))}
        </div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {filtered.map((opp, i) => (
            <div key={opp.id} className="card-glass animate-fade-up" style={{ padding: "22px 24px", animationDelay: `${i * 0.07}s` }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 14 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                    <span className={`pill ${typeColor[opp.type] || "pill-neutral"}`}>{typeLabel[opp.type] || opp.type}</span>
                    {opp.compensation && <span className="pill pill-green" style={{ fontSize: 11 }}>{opp.compensation}</span>}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 650, color: "var(--n800)", letterSpacing: "-0.02em", marginBottom: 4 }}>{opp.title}</h3>
                  <div style={{ fontSize: 13, color: "var(--n500)", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                    <span>{opp.company}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin style={{ width: 11, height: 11 }} />{opp.city}</span>
                    {opp.deadline && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Calendar style={{ width: 11, height: 11 }} />Prazo: {opp.deadline}</span>}
                  </div>
                </div>
                {/* Relevance score */}
                <div style={{ flexShrink: 0, textAlign: "center" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: opp.relevanceScore >= 90 ? "#EDFAF3" : "var(--blue-muted)", border: `2px solid ${opp.relevanceScore >= 90 ? "#22C55E" : "var(--blue)"}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: opp.relevanceScore >= 90 ? "#166534" : "var(--blue-dark)", letterSpacing: "-0.02em" }}>{opp.relevanceScore}</span>
                  </div>
                  <div style={{ fontSize: 10, color: "var(--n400)", marginTop: 4, fontWeight: 500 }}>match</div>
                </div>
              </div>

              <p style={{ fontSize: 13.5, color: "var(--n600)", lineHeight: 1.6, marginBottom: 14 }}>{opp.description}</p>

              {/* Why matched */}
              <div style={{ background: "var(--blue-muted)", border: "1px solid rgba(46,109,180,0.12)", borderRadius: 12, padding: "10px 14px", marginBottom: 14, display: "flex", gap: 8 }}>
                <Sparkles style={{ width: 13, height: 13, color: "var(--blue)", flexShrink: 0, marginTop: 1 }} />
                <p style={{ fontSize: 12, color: "var(--blue-dark)", lineHeight: 1.5 }}><strong>Porquê foi seleccionado:</strong> {opp.whyMatched}</p>
              </div>

              {/* Mutual connections + tags */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {opp.tags.slice(0, 4).map(t => <span key={t} className="pill pill-neutral" style={{ fontSize: 11 }}>{t}</span>)}
                </div>
                {opp.mutualConnections.length > 0 && (
                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--n500)" }}>
                    <Users style={{ width: 12, height: 12 }} />
                    Conexões: {opp.mutualConnections.join(", ")}
                  </div>
                )}
              </div>

              <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
                <Link href="/concierge" className="btn-primary" style={{ fontSize: 13, padding: "9px 20px", borderRadius: 12 }}>Expressar interesse</Link>
                <button className="btn-ghost" style={{ fontSize: 13, padding: "9px 18px" }}>Guardar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
