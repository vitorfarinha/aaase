"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Star, Users, Sparkles } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { businesses } from "@/data/demo";

const categories = ["Todas", "Legal", "SaaS / ClimaTech", "Creative Services", "Healthcare", "Finance / VC"];

export default function CommercePage() {
  const [activeCat, setActiveCat] = useState("Todas");
  const filtered = businesses.filter(b => activeCat === "Todas" || b.category === activeCat);

  return (
    <AppLayout>
      <div style={{ maxWidth: 1050, margin: "0 auto" }}>
        <div style={{ marginBottom: 28 }} className="animate-fade-up">
          <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--n800)", marginBottom: 6 }}>Empresas Alumni</h1>
          <p style={{ fontSize: 14, color: "var(--n400)" }}>Negócios fundados por membros da comunidade AAASE</p>
        </div>

        {/* Trust banner */}
        <div className="ai-strip animate-fade-up delay-100" style={{ padding: "16px 22px", marginBottom: 24 }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ width: 36, height: 36, borderRadius: 11, background: "var(--gold-muted)", border: "1px solid rgba(232,160,32,0.22)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Shield style={{ width: 16, height: 16, color: "var(--gold)" }} />
            </div>
            <p style={{ fontSize: 13.5, color: "var(--n700)" }}>
              Todos os negócios são <strong style={{ color: "var(--n800)" }}>fundados por alumni verificados</strong>. As reviews são exclusivas de membros da comunidade.
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="animate-fade-up delay-150" style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {categories.map(c => (
            <button key={c} onClick={() => setActiveCat(c)}
              style={{ padding: "7px 16px", borderRadius: 999, fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s", background: activeCat === c ? "var(--blue)" : "white", color: activeCat === c ? "white" : "var(--n600)", border: activeCat === c ? "none" : "1px solid var(--n200)", boxShadow: activeCat === c ? "0 2px 8px rgba(46,109,180,0.25)" : "var(--shadow-xs)" } as React.CSSProperties}>
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: 16 }}>
          {filtered.map((biz, i) => (
            <div key={biz.id} className="card-glass animate-fade-up" style={{ padding: "24px", animationDelay: `${i * 0.07}s` }}>
              {/* Header */}
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ width: 50, height: 50, borderRadius: 14, background: "var(--n100)", border: "1px solid var(--n150)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>
                  {biz.logo}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 650, color: "var(--n800)", letterSpacing: "-0.015em", marginBottom: 3 }}>{biz.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span className="pill pill-blue" style={{ fontSize: 10.5 }}>{biz.category}</span>
                    {biz.trustBadge && (
                      <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 500, color: "var(--blue-dark)" }}>
                        <Shield style={{ width: 10, height: 10 }} /> Alumni Trust
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Rating + founder */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ display: "flex", gap: 2 }}>
                    {[1,2,3,4,5].map(s => <Star key={s} style={{ width: 12, height: 12, fill: s <= Math.round(biz.rating) ? "var(--gold)" : "var(--n200)", color: s <= Math.round(biz.rating) ? "var(--gold)" : "var(--n200)" }} />)}
                  </div>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--n700)" }}>{biz.rating}</span>
                  <span style={{ fontSize: 12, color: "var(--n400)" }}>({biz.reviewCount})</span>
                </div>
                <span style={{ fontSize: 12, color: "var(--n400)", display: "flex", alignItems: "center", gap: 4 }}>
                  <Users style={{ width: 11, height: 11 }} />{biz.endorsements} endossos
                </span>
              </div>

              <p style={{ fontSize: 13, color: "var(--n600)", lineHeight: 1.6, marginBottom: 14 }}>{biz.description}</p>

              {/* Perk */}
              <div style={{ background: "var(--gold-muted)", border: "1px solid rgba(232,160,32,0.18)", borderRadius: 12, padding: "10px 13px", marginBottom: 14 }}>
                <div style={{ fontSize: 10.5, fontWeight: 600, color: "#7A4F00", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.04em" }}>✦ Benefício alumni</div>
                <div style={{ fontSize: 12.5, color: "#5A3700", fontWeight: 500 }}>{biz.communityPerk}</div>
              </div>

              {/* Featured review */}
              <div style={{ background: "var(--n50)", borderRadius: 12, padding: "11px 13px", marginBottom: 16, borderLeft: "3px solid var(--n200)" }}>
                <p style={{ fontSize: 12.5, color: "var(--n600)", lineHeight: 1.55, fontStyle: "italic", marginBottom: 5 }}>"{biz.featuredReview}"</p>
                <div style={{ fontSize: 11.5, color: "var(--n400)", fontWeight: 500 }}>— {biz.reviewerName}</div>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn-primary" style={{ flex: 1, fontSize: 13, padding: "9px", borderRadius: 12 }}>Ver detalhes</button>
                <button className="btn-ghost" style={{ fontSize: 13, padding: "9px 14px" }}>Recomendar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
