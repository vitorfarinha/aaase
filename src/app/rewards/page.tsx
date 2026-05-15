"use client";

import { useState } from "react";
import { Shield, Sparkles, X, Copy, Check, QrCode } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { rewards, currentUser } from "@/data/demo";
import type { Reward } from "@/types";

/* ─── QR grid (deterministic from id string) ─── */
function QRGrid({ seed, size = 9 }: { seed: string; size?: number }) {
  const hash = seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const cells = Array.from({ length: size * size }, (_, i) => {
    // corners are always dark (finder pattern simulation)
    const row = Math.floor(i / size), col = i % size;
    const corner =
      (row < 3 && col < 3) || (row < 3 && col >= size - 3) || (row >= size - 3 && col < 3);
    if (corner) return true;
    return ((hash * (i + 7) * 31) % 97) > 40;
  });
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${size}, 1fr)`, gap: 2 }}>
      {cells.map((dark, i) => (
        <div key={i} style={{ width: "100%", paddingBottom: "100%", borderRadius: 2, background: dark ? "var(--n800)" : "transparent" }} />
      ))}
    </div>
  );
}

/* ─── Modal ─── */
function BenefitModal({ reward, onClose }: { reward: Reward; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (reward.code) navigator.clipboard.writeText(reward.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    /* Backdrop */
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(13,20,32,0.55)", backdropFilter: "blur(6px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
    >
      {/* Card */}
      <div
        onClick={e => e.stopPropagation()}
        className="animate-scale-in"
        style={{ background: "white", borderRadius: 24, width: "100%", maxWidth: 400, overflow: "hidden", boxShadow: "var(--shadow-xl)" }}
      >
        {/* Header strip */}
        <div className="hero-gradient" style={{ padding: "24px 24px 20px", position: "relative" }}>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: "rgba(255,255,255,0.50)", marginBottom: 6 }}>Benefício Alumni</div>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{reward.emoji}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "white", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{reward.title}</div>
                <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.60)", marginTop: 4 }}>{reward.partner}</div>
              </div>
              <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <X style={{ width: 15, height: 15, color: "white" }} />
              </button>
            </div>

            {/* Benefit pill */}
            <div style={{ marginTop: 16, display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.20)", borderRadius: 10, padding: "7px 14px" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "white" }}>{reward.benefit}</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "24px" }}>
          {/* QR code */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 22 }}>
            <div style={{ background: "var(--n50)", border: "1px solid var(--n150)", borderRadius: 18, padding: 18, marginBottom: 10 }}>
              <div style={{ width: 140, height: 140 }}>
                <QRGrid seed={reward.id + reward.partner} size={11} />
              </div>
            </div>
            <div style={{ fontSize: 12, color: "var(--n400)", textAlign: "center" }}>
              Apresenta este QR code no parceiro
            </div>
          </div>

          {/* Coupon code */}
          {reward.code && (
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "var(--n400)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Código de cupão</div>
              <div style={{ display: "flex", gap: 8 }}>
                <div className="mono" style={{ flex: 1, background: "var(--n50)", border: "1.5px dashed var(--n300)", borderRadius: 12, padding: "11px 16px", fontSize: 18, fontWeight: 700, letterSpacing: "0.12em", color: "var(--n800)", textAlign: "center" }}>
                  {reward.code}
                </div>
                <button
                  onClick={handleCopy}
                  style={{ width: 46, borderRadius: 12, border: "1px solid var(--n200)", background: copied ? "#EDFAF3" : "var(--n100)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s", flexShrink: 0 }}
                >
                  {copied
                    ? <Check style={{ width: 16, height: 16, color: "#166534" }} />
                    : <Copy style={{ width: 15, height: 15, color: "var(--n500)" }} />
                  }
                </button>
              </div>
              {copied && <div style={{ fontSize: 12, color: "#166534", marginTop: 6, textAlign: "center", fontWeight: 500 }}>Código copiado!</div>}
            </div>
          )}

          {/* Instructions */}
          <div style={{ background: "var(--gold-muted)", border: "1px solid rgba(232,160,32,0.18)", borderRadius: 12, padding: "12px 14px", marginBottom: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#7A4F00", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 5 }}>Como usar</div>
            <div style={{ fontSize: 13, color: "#5A3700", lineHeight: 1.55 }}>
              {reward.code
                ? `Apresenta o código ${reward.code} no momento do pagamento ou introduz-o online.`
                : "Apresenta o QR code ao parceiro para identificares o teu benefício de membro AAASE."}
            </div>
          </div>

          {/* Meta */}
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--n400)" }}>
            <span>{reward.redemptionCount} alumni já usaram</span>
            {reward.validUntil && <span>Válido até {reward.validUntil}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ─── */
export default function RewardsPage() {
  const [activeModal, setActiveModal] = useState<Reward | null>(null);

  return (
    <AppLayout>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ marginBottom: 28 }} className="animate-fade-up">
          <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--n800)", marginBottom: 6 }}>Benefícios & Cartão</h1>
          <p style={{ fontSize: 14, color: "var(--n400)" }}>Vantagens exclusivas da comunidade alumni</p>
        </div>

        {/* Digital member card */}
        <div className="hero-gradient animate-fade-up delay-100" style={{ borderRadius: 24, padding: "32px 36px", marginBottom: 28, color: "white", maxWidth: "min(520px, 100%)" }}>
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

            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.40)", marginBottom: 4 }}>Trust Score</div>
                <div style={{ fontSize: 26, fontWeight: 750, letterSpacing: "-0.04em" }}>{currentUser.trustScore}</div>
              </div>
              {/* Member card QR */}
              <div style={{ width: 64, height: 64, background: "rgba(255,255,255,0.92)", borderRadius: 12, padding: 6 }}>
                <QRGrid seed={currentUser.memberNumber} size={7} />
              </div>
            </div>
          </div>
        </div>

        {/* AI recommendation */}
        <div className="ai-strip animate-fade-up delay-150" style={{ padding: "14px 20px", marginBottom: 24, display: "flex", gap: 12, alignItems: "center" }}>
          <Sparkles style={{ width: 15, height: 15, color: "var(--gold)", flexShrink: 0 }} />
          <p style={{ fontSize: 13, color: "var(--n700)" }}>
            <strong>Popular entre alumni como tu:</strong> Consulta jurídica com Lopes & Associados e check-up na Estoril Health Clinic — 94% dos alumni no teu perfil adoram estes benefícios.
          </p>
        </div>

        {/* Rewards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(290px, 100%), 1fr))", gap: 16 }}>
          {rewards.map((r, i) => (
            <div key={r.id} className="card-glass animate-fade-up" style={{ padding: "22px", animationDelay: `${i * 0.07}s`, position: "relative", overflow: "hidden" }}>

              {/* Popular badge */}
              {r.isMostLoved && (
                <div style={{ position: "absolute", top: 14, right: 14 }}>
                  <span className="pill pill-gold" style={{ fontSize: 10, padding: "3px 9px" }}>★ Popular</span>
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

              {/* Coupon code preview */}
              {r.code && (
                <div className="mono" style={{ fontSize: 12, background: "var(--n100)", border: "1px dashed var(--n300)", borderRadius: 10, padding: "8px 12px", textAlign: "center", color: "var(--n600)", marginBottom: 12, letterSpacing: "0.08em" }}>
                  {r.code}
                </div>
              )}

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <span style={{ fontSize: 11.5, color: "var(--n400)" }}>{r.redemptionCount} utilizações</span>
                {r.validUntil && <span style={{ fontSize: 11.5, color: "var(--n400)" }}>Válido até {r.validUntil}</span>}
                {r.isExclusive && <span className="pill pill-blue" style={{ fontSize: 10.5 }}>Exclusivo</span>}
              </div>

              <button
                onClick={() => setActiveModal(r)}
                className="btn-primary"
                style={{ width: "100%", padding: "10px", fontSize: 13, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
              >
                <QrCode style={{ width: 14, height: 14 }} />
                Usar benefício
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeModal && (
        <BenefitModal reward={activeModal} onClose={() => setActiveModal(null)} />
      )}
    </AppLayout>
  );
}
