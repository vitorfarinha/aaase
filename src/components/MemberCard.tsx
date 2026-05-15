"use client";

/**
 * MemberCard — digital version of the physical AAASE "Cartão de Associado"
 *
 * Physical card reference:
 *  • Top section: gold/yellow gradient background, AAASE shield logo top-left,
 *    "Cartão de Associado / AAASE" title, ghost portrait watermark top-right
 *  • Bottom section: white/cream strip with Nº, Nome, Válido até
 *
 * Digital adaptation:
 *  • Top section keeps the gold palette, includes logo + title + watermark SVG
 *  • Bottom section is white glass with member number, name, validity, QR
 */

import { currentUser } from "@/data/demo";

/* ── deterministic QR grid (same as rewards page) ── */
function QRGrid({ seed, size = 9, dark = "#1A2438" }: { seed: string; size?: number; dark?: string }) {
  const hash = seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const cells = Array.from({ length: size * size }, (_, i) => {
    const row = Math.floor(i / size), col = i % size;
    const corner =
      (row < 3 && col < 3) ||
      (row < 3 && col >= size - 3) ||
      (row >= size - 3 && col < 3);
    if (corner) return true;
    return ((hash * (i + 7) * 31) % 97) > 40;
  });
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${size}, 1fr)`, gap: 1.5 }}>
      {cells.map((filled, i) => (
        <div
          key={i}
          style={{
            width: "100%",
            paddingBottom: "100%",
            borderRadius: 1.5,
            background: filled ? dark : "transparent",
          }}
        />
      ))}
    </div>
  );
}

/* ── Ghost portrait watermark (Don Bosco silhouette SVG) ── */
function GhostPortrait() {
  return (
    <svg
      viewBox="0 0 120 160"
      style={{ width: "100%", height: "100%", opacity: 0.13 }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Simplified silhouette — head + shoulders */}
      <ellipse cx="60" cy="52" rx="30" ry="36" fill="#7A4F00" />
      <path
        d="M10 160 Q10 100 60 92 Q110 100 110 160Z"
        fill="#7A4F00"
      />
      {/* Collar/robe suggestion */}
      <path
        d="M40 110 Q60 102 80 110 L90 160 L30 160Z"
        fill="#7A4F00"
        opacity="0.6"
      />
    </svg>
  );
}

interface MemberCardProps {
  compact?: boolean; // smaller version for dashboard sidebar
}

export function MemberCard({ compact = false }: MemberCardProps) {
  const cardRadius = 20;
  const topPad = compact ? "18px 20px 14px" : "22px 24px 18px";
  const botPad = compact ? "14px 20px" : "18px 24px";
  const nameSize = compact ? 17 : 20;
  const titleSize = compact ? 15 : 18;

  return (
    <div
      style={{
        borderRadius: cardRadius,
        overflow: "hidden",
        boxShadow: "0 12px 40px rgba(180,120,0,0.20), 0 4px 12px rgba(0,0,0,0.12)",
        maxWidth: "min(520px, 100%)",
        /* credit-card aspect ratio 85.6mm × 53.98mm ≈ 1.586 */
      }}
    >
      {/* ── TOP SECTION — gold gradient ── */}
      <div
        style={{
          background: "linear-gradient(135deg, #E8A020 0%, #F5C842 45%, #E09010 100%)",
          padding: topPad,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle inner highlight */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 60% at 30% 20%, rgba(255,255,255,0.22) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        {/* Ghost portrait watermark — top right */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: compact ? 90 : 110,
            height: compact ? 120 : 145,
            pointerEvents: "none",
          }}
        >
          <GhostPortrait />
        </div>

        {/* Header row: logo + title */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            alignItems: "flex-start",
            gap: 14,
            marginBottom: compact ? 14 : 20,
          }}
        >
          {/* Shield logo */}
          <div
            style={{
              width: compact ? 40 : 48,
              height: compact ? 40 : 48,
              borderRadius: 10,
              overflow: "hidden",
              flexShrink: 0,
              boxShadow: "0 2px 10px rgba(0,0,0,0.20)",
              border: "1.5px solid rgba(255,255,255,0.35)",
            }}
          >
            <img
              src="/aaase-logo.png"
              alt="AAASE"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          <div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(100,50,0,0.65)",
                marginBottom: 3,
              }}
            >
              Cartão de Associado
            </div>
            <div
              style={{
                fontSize: titleSize,
                fontWeight: 800,
                color: "#1A0A00",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              AAASE
            </div>
          </div>
        </div>

        {/* Full name — large, prominent */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "rgba(80,40,0,0.55)",
              marginBottom: 4,
            }}
          >
            Associado
          </div>
          <div
            style={{
              fontSize: nameSize,
              fontWeight: 700,
              color: "#1A0A00",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
            }}
          >
            {currentUser.name}
          </div>
        </div>
      </div>

      {/* ── BOTTOM SECTION — white/cream strip ── */}
      <div
        style={{
          background: "linear-gradient(180deg, #FEFCF5 0%, #FFFFFF 100%)",
          padding: botPad,
          borderTop: "1px solid rgba(232,160,32,0.20)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        {/* Left — member number + validity */}
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: compact ? 8 : 10 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "var(--n400)",
                marginBottom: 2,
              }}
            >
              Nº de Sócio
            </div>
            <div
              className="mono"
              style={{
                fontSize: compact ? 15 : 17,
                fontWeight: 700,
                color: "var(--n800)",
                letterSpacing: "0.04em",
              }}
            >
              {currentUser.memberNumber.replace("AAASE-", "")}
            </div>
          </div>

          <div style={{ display: "flex", gap: compact ? 16 : 24, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--n400)", marginBottom: 2 }}>
                Turma
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--n700)" }}>
                {currentUser.graduationYear}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--n400)", marginBottom: 2 }}>
                Válido até
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--n700)" }}>
                31-12-2026
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--n400)", marginBottom: 2 }}>
                Trust
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "var(--blue)" }}>
                {currentUser.trustScore}
              </div>
            </div>
          </div>
        </div>

        {/* Right — QR code */}
        <div
          style={{
            width: compact ? 56 : 68,
            height: compact ? 56 : 68,
            background: "white",
            border: "1px solid var(--n150)",
            borderRadius: 10,
            padding: 6,
            flexShrink: 0,
            boxShadow: "var(--shadow-xs)",
          }}
        >
          <QRGrid seed={currentUser.memberNumber} size={9} dark="#1A2438" />
        </div>
      </div>
    </div>
  );
}
