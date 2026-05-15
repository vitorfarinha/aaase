"use client";

import Link from "next/link";
import { Users, Briefcase, Award, Calendar, Sparkles, ArrowRight, ChevronRight, Shield, MapPin, Clock } from "lucide-react";
import { currentUser, alumniList, opportunities, events, notifications } from "@/data/demo";

export default function DashboardPage() {
  const stats = [
    { label: "Alumni na rede", value: "847", sub: "+12 este mês", style: "stat-blue" },
    { label: "Oportunidades", value: "5",   sub: "Novas para ti",  style: "stat-gold", badge: "Novo" },
    { label: "Benefícios",    value: "12",  sub: "Parceiros alumni", style: "stat-green" },
    { label: "Eventos",       value: "3",   sub: "Próximas 4 semanas", style: "stat-red" },
  ];

  const eventTypeLabel: Record<string, string> = { dinner: "Jantar", talk: "Talk", reunion: "Reencontro", networking: "Networking", workshop: "Workshop" };

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto" }} className="animate-fade-up">

      {/* Hero banner */}
      <div className="hero-gradient" style={{ borderRadius: 20, padding: "clamp(20px, 4vw, 32px) clamp(20px, 4vw, 36px)", marginBottom: 20, color: "white" }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div>
              <div className="label" style={{ color: "rgba(255,255,255,0.55)", marginBottom: 8 }}>Bem-vindo de volta</div>
              <h1 style={{ fontSize: "clamp(20px, 4vw, 26px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 6, color: "white" }}>
                Olá, {currentUser.firstName} 👋
              </h1>
              <p style={{ fontSize: "clamp(12px, 2.5vw, 14px)", color: "rgba(255,255,255,0.68)", maxWidth: 440 }}>
                A tua rede tem <strong style={{ color: "white" }}>3 novas actividades</strong> desde a tua última visita.
              </p>
            </div>
            <div style={{ textAlign: "right" }} className="hide-mobile">
              <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.45)", marginBottom: 3 }}>Membro desde {currentUser.memberSince}</div>
              <div className="mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.60)" }}>{currentUser.memberNumber}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
            {[{ icon: "✓", text: "Verificado" }, { icon: "✦", text: `Trust ${currentUser.trustScore}` }, { icon: "◆", text: "Mentor" }].map(({ icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.16)", borderRadius: 12, padding: "7px 12px", fontSize: "clamp(11px,2vw,12.5px)", fontWeight: 500 }}>
                <span style={{ color: "rgba(255,255,255,0.70)" }}>{icon}</span> <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats grid — 4 cols → 2 cols on tablet/mobile */}
      <div className="grid-4" style={{ marginBottom: 20 }}>
        {stats.map((s) => (
          <div key={s.label} className={s.style} style={{ borderRadius: 18, padding: "clamp(14px,3vw,20px)" }}>
            {s.badge && <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 6 }}><span className="pill pill-gold" style={{ fontSize: 10, padding: "2px 8px" }}>{s.badge}</span></div>}
            <div style={{ fontSize: "clamp(22px,4vw,28px)", fontWeight: 700, color: "var(--n800)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: "clamp(12px,2vw,13px)", fontWeight: 500, color: "var(--n700)", marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: "var(--n400)" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Main layout — sidebar on right on desktop, stacked on mobile */}
      <div className="grid-sidebar" style={{ alignItems: "start" }}>

        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, minWidth: 0 }}>

          {/* AI Insight */}
          <div className="ai-strip" style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 11, background: "var(--gold-muted)", border: "1px solid rgba(232,160,32,0.22)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Sparkles style={{ width: 16, height: 16, color: "var(--gold)" }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="label" style={{ color: "var(--gold)", marginBottom: 6 }}>✦ AI Insight do dia</div>
                <p style={{ fontSize: 13.5, color: "var(--n700)", lineHeight: 1.6 }}>
                  <strong style={{ color: "var(--n800)" }}>Sofia Carvalho</strong> e tu partilham interesse em ClimaTech e têm Pedro Santos em comum. Ela procura Head of Product — <strong style={{ color: "var(--blue)" }}>96% compatibilidade</strong>.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12, flexWrap: "wrap" }}>
                  <Link href="/concierge" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--blue)", textDecoration: "none" }}>
                    Pedir introdução <ArrowRight style={{ width: 13, height: 13 }} />
                  </Link>
                  <Link href="/opportunities" style={{ fontSize: 13, color: "var(--n500)", textDecoration: "none" }}>Ver oportunidade</Link>
                </div>
              </div>
            </div>
          </div>

          {/* People card */}
          <div className="card-glass" style={{ minWidth: 0 }}>
            <div style={{ padding: "16px 20px 12px", borderBottom: "1px solid rgba(200,210,228,0.30)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 650, color: "var(--n800)", letterSpacing: "-0.02em" }}>Pessoas relevantes</div>
                <div style={{ fontSize: 12, color: "var(--n400)", marginTop: 1 }}>Baseado no teu perfil e rede</div>
              </div>
              <Link href="/people" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12.5, fontWeight: 500, color: "var(--blue)", textDecoration: "none", flexShrink: 0 }}>
                Ver todos <ChevronRight style={{ width: 13, height: 13 }} />
              </Link>
            </div>
            {alumniList.slice(0, 3).map((person, i) => (
              <div key={person.id} style={{ padding: "12px 20px", borderBottom: i < 2 ? "1px solid rgba(200,210,228,0.20)" : "none", display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <img src={person.avatar} alt={person.name} style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--n150)" }} />
                  {person.isVerified && (
                    <div style={{ position: "absolute", bottom: -1, right: -1, width: 15, height: 15, background: "var(--blue)", borderRadius: "50%", border: "2px solid white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Shield style={{ width: 7, height: 7, color: "white" }} />
                    </div>
                  )}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 2 }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "var(--n800)", letterSpacing: "-0.01em" }}>{person.name}</span>
                    <span className="pill pill-neutral" style={{ fontSize: 10, padding: "1px 6px" }}>Turma {person.graduationYear}</span>
                    {person.isMentor && <span className="pill pill-gold" style={{ fontSize: 10, padding: "1px 6px" }}>Mentor</span>}
                  </div>
                  <div style={{ fontSize: 12.5, color: "var(--n500)", marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{person.role} · {person.company}</div>
                  {person.whyRelevant && (
                    <div style={{ fontSize: 11.5, color: "var(--blue-dark)", background: "var(--blue-muted)", borderRadius: 8, padding: "5px 10px", lineHeight: 1.4 }}>✦ {person.whyRelevant}</div>
                  )}
                </div>
                <Link href={`/people/${person.id}`} style={{ fontSize: 12, fontWeight: 500, color: "var(--blue)", textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0 }}>Ver →</Link>
              </div>
            ))}
          </div>

          {/* Events card */}
          <div className="card-glass" style={{ minWidth: 0 }}>
            <div style={{ padding: "16px 20px 12px", borderBottom: "1px solid rgba(200,210,228,0.30)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: 15, fontWeight: 650, color: "var(--n800)", letterSpacing: "-0.02em" }}>Próximos eventos</div>
              <Link href="/events" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12.5, fontWeight: 500, color: "var(--blue)", textDecoration: "none" }}>
                Ver todos <ChevronRight style={{ width: 13, height: 13 }} />
              </Link>
            </div>
            {events.slice(0, 3).map((ev, i) => (
              <div key={ev.id} style={{ padding: "12px 20px", borderBottom: i < 2 ? "1px solid rgba(200,210,228,0.20)" : "none", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ background: "var(--blue)", borderRadius: 12, padding: "8px 12px", textAlign: "center", flexShrink: 0, color: "white", minWidth: 44 }}>
                  <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.04em", opacity: 0.7 }}>{ev.date.split(" ")[1]?.toUpperCase()}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.1 }}>{ev.date.split(" ")[0]}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--n800)", marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ev.title}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "var(--n400)", flexWrap: "wrap" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 3 }}><Clock style={{ width: 10, height: 10 }} />{ev.time}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 3 }}><MapPin style={{ width: 10, height: 10 }} />{ev.isVirtual ? "Online" : ev.city}</span>
                  </div>
                </div>
                <Link href="/events" style={{ fontSize: 12.5, fontWeight: 500, color: "var(--blue)", textDecoration: "none", flexShrink: 0 }}>→</Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Member Card */}
          <div className="hero-gradient" style={{ borderRadius: 20, padding: "22px 24px", color: "white" }}>
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                <div>
                  <div className="label" style={{ color: "rgba(255,255,255,0.45)", marginBottom: 4 }}>Cartão de Membro</div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, letterSpacing: "-0.01em" }}>AAASE</div>
                </div>
                <div style={{ width: 30, height: 30, borderRadius: 9, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Shield style={{ width: 14, height: 14, color: "rgba(255,255,255,0.75)" }} />
                </div>
              </div>
              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em" }}>{currentUser.name}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>Turma {currentUser.graduationYear} · {currentUser.memberNumber}</div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginBottom: 2 }}>Trust Score</div>
                  <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em" }}>{currentUser.trustScore}</div>
                </div>
                <Link href="/rewards" style={{ fontSize: 12, fontWeight: 500, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.20)", borderRadius: 11, padding: "7px 12px", color: "white", textDecoration: "none" }}>
                  Ver benefícios →
                </Link>
              </div>
            </div>
          </div>

          {/* Profile completeness */}
          <div className="card-glass" style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--n800)", letterSpacing: "-0.01em" }}>Perfil</div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--blue)" }}>{currentUser.profileCompleteness}%</div>
            </div>
            <div style={{ height: 5, background: "var(--n150)", borderRadius: 999, marginBottom: 10, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${currentUser.profileCompleteness}%`, background: "linear-gradient(90deg, var(--blue-dark), var(--blue-light))", borderRadius: 999 }} />
            </div>
            <p style={{ fontSize: 12, color: "var(--n400)", lineHeight: 1.5, marginBottom: 8 }}>Adiciona interesses para melhorar as recomendações da IA.</p>
            <Link href="/profile" style={{ fontSize: 12.5, fontWeight: 500, color: "var(--blue)", textDecoration: "none" }}>Completar perfil →</Link>
          </div>

          {/* Activity */}
          <div className="card-glass">
            <div style={{ padding: "14px 18px 10px", borderBottom: "1px solid rgba(200,210,228,0.25)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--n800)", letterSpacing: "-0.01em" }}>Actividade</div>
              <span className="pill pill-red" style={{ fontSize: 10, padding: "2px 8px" }}>2 novas</span>
            </div>
            {notifications.slice(0, 4).map((n, i) => (
              <div key={n.id} style={{ padding: "10px 18px", borderBottom: i < 3 ? "1px solid rgba(200,210,228,0.20)" : "none", display: "flex", gap: 10 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", marginTop: 5, flexShrink: 0, background: n.isRead ? "var(--n200)" : "var(--blue)" }} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: n.isRead ? "var(--n600)" : "var(--n800)", marginBottom: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{n.title}</div>
                  <div style={{ fontSize: 11, color: "var(--n400)" }}>{n.timestamp}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="card-glass" style={{ padding: "16px 18px" }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--n800)", letterSpacing: "-0.01em", marginBottom: 10 }}>Acções rápidas</div>
            {[
              { label: "Pedir uma introdução", href: "/concierge", color: "var(--blue)" },
              { label: "Explorar oportunidades", href: "/opportunities", color: "#22C55E" },
              { label: "Ver empresas alumni", href: "/commerce", color: "var(--gold)" },
              { label: "Entrar num grupo", href: "/groups", color: "var(--red)" },
            ].map(({ label, href, color }) => (
              <Link key={href} href={href} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid rgba(200,210,228,0.20)", textDecoration: "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: "var(--n700)", fontWeight: 500 }}>{label}</span>
                </div>
                <ArrowRight style={{ width: 13, height: 13, color: "var(--n300)" }} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
