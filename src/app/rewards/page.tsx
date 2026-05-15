"use client";

import { useState } from "react";
import { Shield, Sparkles } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { rewards, currentUser } from "@/data/demo";

export default function RewardsPage() {
  const [redeemed, setRedeemed] = useState<string[]>([]);

  return (
    <AppLayout>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ marginBottom: 28 }} className="animate-fade-up">
          <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--n800)", marginBottom: 6 }}>Benefícios & Cartão</h1>
          <p style={{ fontSize: 14, color: "var(--n400)" }}>Vantagens exclusivas da comunidade alumni</p>
        </div>

        {/* Digital member card */}
        <div className="hero-gradient animate-fade-up delay-100" style={{ borderRadius: 24, padding: "32px 36px", marginBottom: 28, color: "white", maxWidth: 520 }}>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: 6 }}>Cartão de Membro</div>
                <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em" }}>AAASE Alumni Network</div>
              </div>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Shield style={{ width: 17, height: 17, color: "rgba(255,255,255,0.75)" }} />
              </div>
            </div>

            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 6 }}>{currentUser.name}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>Turma {currentUser.graduationYear} · {currentUser.memberNumber}</div>
            </div>

            {/* QR code mock */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.40)", marginBottom: 4 }}>Trust Score</div>
                <div style={{ fontSize: 26, fontWeight: 750, letterSpacing: "-0.04em" }}>{currentUser.trustScore}</div>
              </div>
              <div style={{ width: 64, height: 64, background: "rgba(255,255,255,0.12)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(5,8px)", gap: 2 }}>
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div key={i} style={{ width: 8, height: 8, borderRadius: 1, background: Math.random() > 0.5 ? "rgba(255,255,255,0.80)" : "rgba(255,255,255,0.15)" }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI recommendation */}
        <div className="ai-strip animate-fade-up delay-150" style={{ padding: "14px 20px", marginBottom: 24, display: "flex", gap: 12, alignItems: "center" }}>
          <Sparkles style={{ width: 15, height: 15, color: "var(--gold)", flexShrink: 0 }} />
          <p style={{ fontSize: 13, color: "var(--n700)" }}>
            <strong>Mais amado por alumni como tu:</strong> Consulta jurídica com Lopes & Associados e check-up na Estoril Health Clinic — 94% dos alumni no teu perfil adoram estes benefícios.
          </p>
        </div>

        {/* Rewards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: 16 }}>
          {rewards.map((r, i) => (
            <div key={r.id} className="card-glass animate-fade-up" style={{ padding: "22px", animationDelay: `${i * 0.07}s`, position: "relative", overflow: "hidden" }}>
              {r.isMostLoved && (
                <div style={{ position: "absolute", top: 14, right: 14 }}>
                  <span className="pill pill-gold" style={{ fontSize: 10, padding: "3px 9px" }}>✦ Mais amado</span>
                </div>
              )}

              <div style={{ fontSize: 32, marginBottom: 14 }}>{r.emoji}</div>
              <div style={{ fontSize: 15, fontWeight: 650, color: "var(--n800)", letterSpacing: "-0.015em", marginBottom: 4 }}>{r.title}</div>
              <div style={{ fontSize: 12.5, color: "var(--blue)", fontWeight: 500, marginBottom: 10 }}>{r.partner}</div>
              <p style={{ fontSize: 13, color: "var(--n500)", lineHeight: 1.6, marginBottom: 14 }}>{r.description}</p>

              {/* Benefit highlight */}
              <div style={{ background: "var(--gold-muted)", border: "1px solid rgba(232,160,32,0.18)", borderRadius: 12, padding: "10px 13px", marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#7A4F00", marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.04em" }}>Teu benefício</div>
                <div style={{ fontSize: 13, color: "#5A3700", fontWeight: 600 }}>{r.benefit}</div>
              </div>

              {r.code && !redeemed.includes(r.id) && (
                <div className="mono" style={{ fontSize: 12, background: "var(--n100)", border: "1px solid var(--n200)", borderRadius: 10, padding: "8px 12px", textAlign: "center", color: "var(--n700)", marginBottom: 12, letterSpacing: "0.06em" }}>
                  {r.code}
                </div>
              )}

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <span style={{ fontSize: 11.5, color: "var(--n400)" }}>{r.redemptionCount} resgates</span>
                {r.validUntil && <span style={{ fontSize: 11.5, color: "var(--n400)" }}>Válido até {r.validUntil}</span>}
                {r.isExclusive && <span className="pill pill-blue" style={{ fontSize: 10.5 }}>Exclusivo</span>}
              </div>

              <button
                onClick={() => setRedeemed(prev => prev.includes(r.id) ? prev.filter(x => x !== r.id) : [...prev, r.id])}
                className="btn-primary"
                style={{ width: "100%", padding: "10px", fontSize: 13, borderRadius: 12, background: redeemed.includes(r.id) ? "#22C55E" : "var(--blue)" }}
              >
                {redeemed.includes(r.id) ? "✓ Resgatado" : "Resgatar benefício"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
