"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ChevronRight, Star, Shield, QrCode, X, Copy, Check } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { rewards, businesses, currentUser } from "@/data/demo";
import { MemberCard } from "@/components/MemberCard";
import type { Reward } from "@/types";

/* ── QR Grid ── */
function QRGrid({ seed, size = 9, dark = "#1A2438" }: { seed: string; size?: number; dark?: string }) {
  const hash = seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const cells = Array.from({ length: size * size }, (_, i) => {
    const row = Math.floor(i / size), col = i % size;
    const corner = (row < 3 && col < 3) || (row < 3 && col >= size - 3) || (row >= size - 3 && col < 3);
    if (corner) return true;
    return ((hash * (i + 7) * 31) % 97) > 40;
  });
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${size}, 1fr)`, gap: 1.5 }}>
      {cells.map((filled, i) => <div key={i} style={{ width: "100%", paddingBottom: "100%", borderRadius: 1.5, background: filled ? dark : "transparent" }} />)}
    </div>
  );
}

/* ── Benefit Modal ── */
function BenefitModal({ reward, onClose }: { reward: Reward; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { if (reward.code) navigator.clipboard.writeText(reward.code).catch(() => {}); setCopied(true); setTimeout(() => setCopied(false), 2200); };

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(20,15,5,0.55)", backdropFilter: "blur(8px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={e => e.stopPropagation()} className="animate-scale-in" style={{ background: "white", borderRadius: 24, width: "100%", maxWidth: 400, overflow: "hidden", boxShadow: "var(--shadow-xl)" }}>
        <div style={{ background: "linear-gradient(135deg, var(--gold-deep) 0%, var(--gold) 50%, var(--gold-light) 100%)", padding: "24px 24px 20px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 25% 20%, rgba(255,255,255,0.22) 0%, transparent 65%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(100,50,0,0.60)", marginBottom: 6 }}>Benefício Alumni</div>
                <div style={{ fontSize: 28, marginBottom: 6 }}>{reward.emoji}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#1A0A00", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{reward.title}</div>
                <div style={{ fontSize: 12.5, color: "rgba(100,50,0,0.65)", marginTop: 4, fontWeight: 500 }}>{reward.partner}</div>
              </div>
              <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(0,0,0,0.10)", border: "1px solid rgba(100,50,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <X style={{ width: 15, height: 15, color: "#5A3000" }} />
              </button>
            </div>
            <div style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,0,0,0.10)", border: "1px solid rgba(100,50,0,0.15)", borderRadius: 10, padding: "7px 14px" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#1A0A00" }}>{reward.benefit}</span>
            </div>
          </div>
        </div>
        <div style={{ padding: "24px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 20 }}>
            <div style={{ background: "var(--n50)", border: "1px solid var(--n150)", borderRadius: 18, padding: 16, marginBottom: 8 }}>
              <div style={{ width: 140, height: 140 }}><QRGrid seed={reward.id + reward.partner} size={11} /></div>
            </div>
            <div style={{ fontSize: 12, color: "var(--n400)", textAlign: "center" }}>Apresenta este QR ao parceiro</div>
          </div>
          {reward.code && (
            <div style={{ marginBottom: 16 }}>
              <div className="label" style={{ marginBottom: 8 }}>Código de cupão</div>
              <div style={{ display: "flex", gap: 8 }}>
                <div className="mono" style={{ flex: 1, background: "var(--n50)", border: "1.5px dashed var(--n300)", borderRadius: 12, padding: "11px 16px", fontSize: 18, fontWeight: 700, letterSpacing: "0.12em", color: "var(--n800)", textAlign: "center" }}>{reward.code}</div>
                <button onClick={handleCopy} style={{ width: 46, borderRadius: 12, border: "1px solid var(--n200)", background: copied ? "#EDFAF3" : "var(--n100)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  {copied ? <Check style={{ width: 16, height: 16, color: "#166534" }} /> : <Copy style={{ width: 15, height: 15, color: "var(--n500)" }} />}
                </button>
              </div>
              {copied && <div style={{ fontSize: 12, color: "#166534", marginTop: 5, textAlign: "center", fontWeight: 500 }}>Código copiado!</div>}
            </div>
          )}
          <div style={{ background: "var(--gold-muted)", border: "1px solid rgba(232,160,32,0.18)", borderRadius: 12, padding: "12px 14px", marginBottom: 14 }}>
            <div className="label" style={{ color: "var(--gold-deep)", marginBottom: 4 }}>Como usar</div>
            <div style={{ fontSize: 13, color: "#5A3700", lineHeight: 1.55 }}>{reward.code ? `Apresenta o código ${reward.code} no pagamento.` : "Apresenta o QR code ao parceiro para activar o benefício."}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--n400)" }}>
            <span>{reward.redemptionCount} utilizações</span>
            {reward.validUntil && <span>Válido até {reward.validUntil}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BeneficiosPage() {
  const [activeModal, setActiveModal] = useState<Reward | null>(null);
  const [tab, setTab] = useState<"perks" | "empresas">("perks");

  return (
    <AppLayout>
      <div style={{ maxWidth: 1050, margin: "0 auto" }}>

        {/* Hero */}
        <div className="animate-fade-up" style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: "clamp(22px,4vw,28px)", fontWeight: 800, letterSpacing: "-0.03em", color: "var(--n800)", marginBottom: 6 }}>Benefícios & Cartão</h1>
          <p style={{ fontSize: 14, color: "var(--n400)" }}>Vantagens exclusivas para a comunidade AAASE</p>
        </div>

        {/* Layout: card on left, content on right (desktop) */}
        <div className="grid-sidebar animate-fade-up delay-100" style={{ alignItems: "start", marginBottom: 28 }}>

          {/* LEFT: tabs + content */}
          <div>
            {/* Tabs */}
            <div style={{ display: "flex", gap: 4, marginBottom: 20, background: "rgba(255,255,255,0.70)", backdropFilter: "blur(12px)", border: "1px solid var(--n150)", borderRadius: 16, padding: 5 }}>
              {[["perks", "🎁 Perks & Descontos"], ["empresas", "🏢 Empresas Alumni"]].map(([key, label]) => (
                <button key={key} onClick={() => setTab(key as any)}
                  style={{ flex: 1, padding: "9px 14px", borderRadius: 12, fontSize: 13.5, fontWeight: 500, cursor: "pointer", border: "none", fontFamily: "inherit", transition: "all 0.15s",
                    background: tab === key ? "linear-gradient(135deg, var(--gold-deep), var(--gold))" : "transparent",
                    color: tab === key ? "#1A0A00" : "var(--n500)",
                    boxShadow: tab === key ? "0 2px 8px rgba(200,130,10,0.30)" : "none",
                  } as React.CSSProperties}>
                  {label}
                </button>
              ))}
            </div>

            {/* AI strip */}
            <div className="ai-strip" style={{ padding: "13px 18px", marginBottom: 18, display: "flex", gap: 10, alignItems: "center" }}>
              <Sparkles style={{ width: 15, height: 15, color: "var(--gold)", flexShrink: 0 }} />
              <p style={{ fontSize: 12.5, color: "var(--n600)" }}>
                <strong>Recomendado para ti:</strong> Consulta com Lopes & Associados e check-up Estoril Health — 94% dos alumni com o teu perfil adoram.
              </p>
            </div>

            {/* PERKS TAB */}
            {tab === "perks" && (
              <div className="grid-auto-280">
                {rewards.map((r, i) => (
                  <div key={r.id} className="card-glass animate-fade-up" style={{ padding: "20px", animationDelay: `${i * 0.06}s`, position: "relative" }}>
                    {r.isMostLoved && (
                      <div style={{ position: "absolute", top: 12, right: 12 }}>
                        <span className="pill pill-gold" style={{ fontSize: 9.5 }}>★ Popular</span>
                      </div>
                    )}
                    <div style={{ fontSize: 28, marginBottom: 12 }}>{r.emoji}</div>
                    <div style={{ fontSize: 14.5, fontWeight: 650, color: "var(--n800)", letterSpacing: "-0.015em", marginBottom: 3 }}>{r.title}</div>
                    <div style={{ fontSize: 12, color: "var(--blue)", fontWeight: 500, marginBottom: 8 }}>{r.partner}</div>
                    <div style={{ background: "rgba(232,160,32,0.10)", border: "1px solid rgba(232,160,32,0.16)", borderRadius: 10, padding: "8px 11px", marginBottom: 12 }}>
                      <div className="label" style={{ color: "var(--gold-deep)", marginBottom: 2 }}>Teu benefício</div>
                      <div style={{ fontSize: 12.5, color: "#5A3700", fontWeight: 600 }}>{r.benefit}</div>
                    </div>
                    {r.code && <div className="mono" style={{ fontSize: 11, background: "var(--n50)", border: "1px dashed var(--n200)", borderRadius: 8, padding: "6px 10px", textAlign: "center", color: "var(--n500)", marginBottom: 10, letterSpacing: "0.08em" }}>{r.code}</div>}
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--n400)", marginBottom: 12 }}>
                      <span>{r.redemptionCount} utilizações</span>
                      {r.isExclusive && <span className="pill pill-blue" style={{ fontSize: 9.5 }}>Exclusivo</span>}
                    </div>
                    <button onClick={() => setActiveModal(r)} className="btn-gold" style={{ width: "100%", fontSize: 12.5, padding: "9px", borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                      <QrCode style={{ width: 13, height: 13 }} /> Usar benefício
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* EMPRESAS TAB */}
            {tab === "empresas" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {businesses.map((biz, i) => (
                  <div key={biz.id} className="card-glass animate-fade-up" style={{ padding: "20px 22px", display: "flex", gap: 16, alignItems: "flex-start", animationDelay: `${i * 0.07}s` }}>
                    <div style={{ width: 48, height: 48, borderRadius: 13, background: "rgba(232,160,32,0.10)", border: "1px solid rgba(232,160,32,0.16)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{biz.logo}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                        <span style={{ fontSize: 15, fontWeight: 650, color: "var(--n800)" }}>{biz.name}</span>
                        <span className="pill pill-blue" style={{ fontSize: 10 }}>{biz.category}</span>
                        {biz.trustBadge && <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10.5, color: "var(--blue-dark)", fontWeight: 500 }}><Shield style={{ width: 10, height: 10 }} /> Alumni</span>}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                        <div style={{ display: "flex", gap: 2 }}>{[1,2,3,4,5].map(s => <Star key={s} style={{ width: 11, height: 11, fill: s <= Math.round(biz.rating) ? "var(--gold)" : "var(--n200)", color: s <= Math.round(biz.rating) ? "var(--gold)" : "var(--n200)" }} />)}</div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "var(--n700)" }}>{biz.rating}</span>
                        <span style={{ fontSize: 11.5, color: "var(--n400)" }}>({biz.reviewCount})</span>
                      </div>
                      <p style={{ fontSize: 13, color: "var(--n500)", lineHeight: 1.55, marginBottom: 10 }}>{biz.description}</p>
                      <div style={{ background: "rgba(232,160,32,0.10)", border: "1px solid rgba(232,160,32,0.16)", borderRadius: 10, padding: "8px 12px" }}>
                        <div className="label" style={{ color: "var(--gold-deep)", marginBottom: 2 }}>Benefício alumni</div>
                        <div style={{ fontSize: 12.5, color: "#5A3700", fontWeight: 500 }}>{biz.communityPerk}</div>
                      </div>
                    </div>
                    <button className="btn-ghost" style={{ fontSize: 12.5, padding: "9px 16px", flexShrink: 0 }}>Ver detalhes</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: member card sticky */}
          <div style={{ position: "sticky", top: "calc(var(--topbar-h) + 20px)", display: "flex", flexDirection: "column", gap: 16 }}>
            <MemberCard />
            <div className="card-glass" style={{ padding: "16px 18px" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--n700)", marginBottom: 10 }}>Estatísticas do cartão</div>
              {[
                { label: "Benefícios disponíveis", value: rewards.length, color: "var(--gold)" },
                { label: "Empresas parceiras", value: businesses.length, color: "var(--blue)" },
                { label: "Utilizações este mês", value: 4, color: "#166534" },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid var(--n100)" }}>
                  <span style={{ fontSize: 13, color: "var(--n600)" }}>{label}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {activeModal && <BenefitModal reward={activeModal} onClose={() => setActiveModal(null)} />}
    </AppLayout>
  );
}
