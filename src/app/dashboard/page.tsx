"use client";

import Link from "next/link";
import { Users, Briefcase, Award, Calendar, Sparkles, ArrowRight, ChevronRight, Shield, MapPin, Clock } from "lucide-react";
import { currentUser, alumniList, opportunities, events, notifications } from "@/data/demo";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const stats = [
    { label: "Alumni na rede", value: "847", sub: "+12 este mês", style: "stat-blue", iconColor: "var(--blue)" },
    { label: "Oportunidades", value: "5", sub: "Novas para ti", style: "stat-gold", iconColor: "var(--gold)", badge: "Novo" },
    { label: "Benefícios activos", value: "12", sub: "Parceiros alumni", style: "stat-green", iconColor: "#22C55E" },
    { label: "Eventos próximos", value: "3", sub: "Nas próximas 4 semanas", style: "stat-red", iconColor: "var(--red)" },
  ];

  const eventTypeLabel: Record<string, string> = {
    dinner: "Jantar", talk: "Talk", reunion: "Reencontro", networking: "Networking", workshop: "Workshop",
  };

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto" }} className="animate-fade-up">
      {/* Hero */}
      <div className="hero-gradient" style={{ borderRadius: 24, padding: "32px 36px", marginBottom: 24, color: "white" }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div className="label" style={{ color: "rgba(255,255,255,0.55)", marginBottom: 8 }}>Bem-vindo de volta</div>
              <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 6, color: "white" }}>
                Olá, {currentUser.firstName} 👋
              </h1>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.68)", maxWidth: 440 }}>
                A tua rede tem <strong style={{ color: "white" }}>3 novas actividades</strong> desde a tua última visita.
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.45)", marginBottom: 3 }}>Membro desde {currentUser.memberSince}</div>
              <div className="mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.60)" }}>{currentUser.memberNumber}</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
            {[
              { icon: "✓", text: "Verificado" },
              { icon: "✦", text: `Trust Score ${currentUser.trustScore}` },
              { icon: "◆", text: "Mentor activo" },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.16)", borderRadius: 12, padding: "7px 14px", fontSize: 12.5, fontWeight: 500 }}>
                <span style={{ color: "rgba(255,255,255,0.70)" }}>{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
        {stats.map((s) => (
          <div key={s.label} className={s.style} style={{ borderRadius: 20, padding: "18px 20px", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
          >
            {s.badge && (
              <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
                <span className="pill pill-gold" style={{ fontSize: 10, padding: "2px 8px" }}>{s.badge}</span>
              </div>
            )}
            <div style={{ fontSize: 28, fontWeight: 700, color: "var(--n800)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 6 }}>{s.value}</div>
            <div style={{ fontSize: 13, fontWeight: 500, color: "var(--n700)", marginBottom: 3 }}>{s.label}</div>
            <div style={{ fontSize: 11.5, color: "var(--n400)" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>
        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* AI Insight */}
          <div className="ai-strip" style={{ padding: "20px 22px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <div style={{ width: 36, height: 36, borderRadius: 11, background: "var(--gold-muted)", border: "1px solid rgba(232,160,32,0.22)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Sparkles style={{ width: 16, height: 16, color: "var(--gold)" }} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="label" style={{ color: "var(--gold)", marginBottom: 6 }}>✦ AI Insight do dia</div>
                <p style={{ fontSize: 13.5, color: "var(--n700)", lineHeight: 1.6 }}>
                  <strong style={{ color: "var(--n800)" }}>Sofia Carvalho</strong> e tu partilham interesse em ClimaTech e têm Pedro Santos como conexão em comum.
                  Ela está a procurar um Head of Product — <strong style={{ color: "var(--blue)" }}>96% de compatibilidade</strong> com o teu perfil.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12 }}>
                  <Link href="/concierge" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--blue)", textDecoration: "none" }}>
                    Pedir introdução <ArrowRight style={{ width: 13, height: 13 }} />
                  </Link>
                  <Link href="/opportunities" style={{ fontSize: 13, color: "var(--n500)", textDecoration: "none" }}>Ver oportunidade</Link>
                </div>
              </div>
            </div>
          </div>

          {/* People */}
          <div className="card-glass">
            <div style={{ padding: "18px 22px 14px", borderBottom: "1px solid rgba(200,210,228,0.30)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 650, color: "var(--n800)", letterSpacing: "-0.02em" }}>Pessoas relevantes para ti</div>
                <div style={{ fontSize: 12, color: "var(--n400)", marginTop: 2 }}>Recomendações baseadas no teu perfil e rede</div>
              </div>
              <Link href="/people" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12.5, fontWeight: 500, color: "var(--blue)", textDecoration: "none" }}>
                Ver todos <ChevronRight style={{ width: 13, height: 13 }} />
              </Link>
            </div>
            <div>
              {alumniList.slice(0, 3).map((person, i) => (
                <div key={person.id} style={{ padding: "14px 22px", borderBottom: i < 2 ? "1px solid rgba(200,210,228,0.20)" : "none", display: "flex", alignItems: "flex-start", gap: 14, transition: "background 0.15s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(46,109,180,0.03)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <div style={{ position: "relative" }}>
                    <img src={person.avatar} alt={person.name} style={{ width: 42, height: 42, borderRadius: "50%", background: "var(--n150)", flexShrink: 0 }} />
                    {person.isVerified && (
                      <div style={{ position: "absolute", bottom: -1, right: -1, width: 16, height: 16, background: "var(--blue)", borderRadius: "50%", border: "2px solid white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Shield style={{ width: 8, height: 8, color: "white" }} />
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 2 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: "var(--n800)", letterSpacing: "-0.01em" }}>{person.name}</span>
                      <span className="pill pill-neutral" style={{ fontSize: 10, padding: "2px 7px" }}>Turma {person.graduationYear}</span>
                      {person.isMentor && <span className="pill pill-gold" style={{ fontSize: 10, padding: "2px 7px" }}>Mentor</span>}
                      {person.isFounder && <span className="pill pill-green" style={{ fontSize: 10, padding: "2px 7px" }}>Fundador</span>}
                    </div>
                    <div style={{ fontSize: 12.5, color: "var(--n500)", marginBottom: 6 }}>{person.role} · {person.company}</div>
                    {person.whyRelevant && (
                      <div style={{ fontSize: 11.5, color: "var(--blue-dark)", background: "var(--blue-muted)", borderRadius: 10, padding: "6px 11px", lineHeight: 1.5 }}>
                        ✦ {person.whyRelevant}
                      </div>
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 }}>
                    <Link href={`/people/${person.id}`} style={{ fontSize: 12.5, fontWeight: 500, color: "var(--blue)", textDecoration: "none", whiteSpace: "nowrap" }}>Ver perfil →</Link>
                    <Link href="/concierge" style={{ fontSize: 12, color: "var(--n400)", textDecoration: "none", whiteSpace: "nowrap" }}>Introdução</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Events */}
          <div className="card-glass">
            <div style={{ padding: "18px 22px 14px", borderBottom: "1px solid rgba(200,210,228,0.30)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: 15, fontWeight: 650, color: "var(--n800)", letterSpacing: "-0.02em" }}>Próximos eventos</div>
              <Link href="/events" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12.5, fontWeight: 500, color: "var(--blue)", textDecoration: "none" }}>
                Ver todos <ChevronRight style={{ width: 13, height: 13 }} />
              </Link>
            </div>
            <div>
              {events.slice(0, 3).map((ev, i) => (
                <div key={ev.id} style={{ padding: "14px 22px", borderBottom: i < 2 ? "1px solid rgba(200,210,228,0.20)" : "none", display: "flex", alignItems: "center", gap: 16, transition: "background 0.15s" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(46,109,180,0.03)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                >
                  <div style={{ background: "var(--blue)", borderRadius: 14, padding: "10px 14px", textAlign: "center", flexShrink: 0, minWidth: 50, color: "white" }}>
                    <div style={{ fontSize: 9.5, fontWeight: 600, letterSpacing: "0.04em", opacity: 0.7, lineHeight: 1 }}>{ev.date.split(" ")[1]?.toUpperCase()}</div>
                    <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.1 }}>{ev.date.split(" ")[0]}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--n800)", marginBottom: 4 }}>{ev.title}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: "var(--n400)" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock style={{ width: 11, height: 11 }} />{ev.time}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin style={{ width: 11, height: 11 }} />{ev.isVirtual ? "Online" : ev.city}</span>
                      <span className="pill pill-neutral" style={{ fontSize: 10.5, padding: "2px 8px" }}>{eventTypeLabel[ev.type] || ev.type}</span>
                    </div>
                  </div>
                  <Link href="/events" style={{ fontSize: 12.5, fontWeight: 500, color: "var(--blue)", textDecoration: "none", whiteSpace: "nowrap" }}>Inscrever →</Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* Member Card */}
          <div className="hero-gradient" style={{ borderRadius: 20, padding: "22px 24px", color: "white" }}>
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                <div>
                  <div className="label" style={{ color: "rgba(255,255,255,0.45)", marginBottom: 4 }}>Cartão de Membro</div>
                  <div style={{ fontSize: 13.5, fontWeight: 700, letterSpacing: "-0.01em" }}>AAASE</div>
                </div>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Shield style={{ width: 15, height: 15, color: "rgba(255,255,255,0.75)" }} />
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em" }}>{currentUser.name}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 3 }}>Turma {currentUser.graduationYear} · {currentUser.memberNumber}</div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", marginBottom: 2 }}>Trust Score</div>
                  <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em" }}>{currentUser.trustScore}</div>
                </div>
                <Link href="/rewards" style={{ fontSize: 12, fontWeight: 500, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.20)", borderRadius: 11, padding: "8px 14px", color: "white", textDecoration: "none" }}>
                  Ver benefícios →
                </Link>
              </div>
            </div>
          </div>

          {/* Profile completeness */}
          <div className="card-glass" style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--n800)", letterSpacing: "-0.01em" }}>Perfil</div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--blue)" }}>{currentUser.profileCompleteness}%</div>
            </div>
            <div style={{ height: 5, background: "var(--n150)", borderRadius: 999, marginBottom: 10, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${currentUser.profileCompleteness}%`, background: "linear-gradient(90deg, var(--blue-dark), var(--blue-light))", borderRadius: 999 }} />
            </div>
            <p style={{ fontSize: 12, color: "var(--n400)", lineHeight: 1.5, marginBottom: 10 }}>
              Adiciona interesses específicos para melhorar as recomendações da IA.
            </p>
            <Link href="/profile" style={{ fontSize: 12.5, fontWeight: 500, color: "var(--blue)", textDecoration: "none" }}>Completar perfil →</Link>
          </div>

          {/* Recent activity */}
          <div className="card-glass">
            <div style={{ padding: "16px 20px 12px", borderBottom: "1px solid rgba(200,210,228,0.25)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--n800)", letterSpacing: "-0.01em" }}>Actividade recente</div>
              <span className="pill pill-red" style={{ fontSize: 10, padding: "2px 8px" }}>2 novas</span>
            </div>
            {notifications.slice(0, 4).map((n, i) => (
              <div key={n.id} style={{ padding: "11px 20px", borderBottom: i < 3 ? "1px solid rgba(200,210,228,0.20)" : "none", display: "flex", gap: 11 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", marginTop: 6, flexShrink: 0, background: n.isRead ? "var(--n200)" : "var(--blue)" }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500, color: n.isRead ? "var(--n600)" : "var(--n800)", marginBottom: 2 }}>{n.title}</div>
                  <div style={{ fontSize: 11.5, color: "var(--n400)", lineHeight: 1.4 }}>{n.body}</div>
                  <div style={{ fontSize: 11, color: "var(--n300)", marginTop: 3 }}>{n.timestamp}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick actions */}
          <div className="card-glass" style={{ padding: "18px 20px" }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--n800)", letterSpacing: "-0.01em", marginBottom: 12 }}>Acções rápidas</div>
            {[
              { label: "Pedir uma introdução", href: "/concierge", color: "var(--blue)" },
              { label: "Explorar oportunidades", href: "/opportunities", color: "#22C55E" },
              { label: "Ver empresas alumni", href: "/commerce", color: "var(--gold)" },
              { label: "Entrar num grupo", href: "/groups", color: "var(--red)" },
            ].map(({ label, href, color }) => (
              <Link key={href} href={href} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(200,210,228,0.20)", textDecoration: "none", transition: "all 0.15s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.paddingLeft = "4px"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.paddingLeft = "0"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: color }} />
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
