"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, ChevronRight, Shield, MapPin, Clock, Church, Users, Award, Heart } from "lucide-react";
import { currentUser, alumniList, events, notifications } from "@/data/demo";
import { MemberCard } from "@/components/MemberCard";

export default function DashboardPage() {
  const stats = [
    { label: "Alumni", value: "847", sub: "+12 este mês", style: "stat-blue", href: "/people" },
    { label: "Oportunidades", value: "5", sub: "Novas para ti", style: "stat-gold", href: "/opportunities", badge: "Novo" },
    { label: "Benefícios", value: "12", sub: "Perks activos", style: "stat-green", href: "/beneficios" },
    { label: "Eventos", value: "3", sub: "Próximas 4 semanas", style: "stat-red", href: "/events" },
  ];

  return (
    <div style={{ maxWidth: 1160, margin: "0 auto" }} className="animate-fade-up">

      {/* Welcome hero */}
      <div className="hero-blue" style={{ borderRadius: 24, padding: "clamp(22px,4vw,36px)", marginBottom: 22, color: "white" }}>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div>
              <div className="label" style={{ color: "rgba(255,255,255,0.50)", marginBottom: 10 }}>Bem-vindo de volta</div>
              <h1 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, letterSpacing: "-0.04em", color: "white", marginBottom: 8, lineHeight: 1.1 }}>
                Olá, {currentUser.firstName} 👋
              </h1>
              <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.62)", maxWidth: 420, lineHeight: 1.65 }}>
                A tua rede tem <strong style={{ color: "rgba(255,255,255,0.90)" }}>3 novas actividades</strong>. A comunidade AAASE está à tua espera.
              </p>
            </div>
            <div className="hide-mobile" style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.40)", marginBottom: 3 }}>Membro desde {currentUser.memberSince}</div>
              <div className="mono" style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>{currentUser.memberNumber}</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
            {[{ t: "✓ Verificado" }, { t: `✦ Trust ${currentUser.trustScore}` }, { t: "◆ Mentor" }].map(({ t }) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.13)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 10, padding: "6px 12px", fontSize: 12, fontWeight: 500 }}>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: 22 }}>
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className={s.style} style={{ borderRadius: 20, padding: "clamp(14px,3vw,20px)", textDecoration: "none", display: "block", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}>
            {s.badge && <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 6 }}><span className="pill pill-gold" style={{ fontSize: 9.5 }}>{s.badge}</span></div>}
            <div style={{ fontSize: "clamp(24px,4vw,30px)", fontWeight: 800, color: "var(--n800)", letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--n700)", marginBottom: 2 }}>{s.label}</div>
            <div style={{ fontSize: 11, color: "var(--n400)" }}>{s.sub}</div>
          </Link>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid-sidebar" style={{ alignItems: "start" }}>

        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18, minWidth: 0 }}>

          {/* Section links */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { icon: Church, label: "Oratório", sub: "Espiritualidade salesiana", href: "/oratorio", bg: "linear-gradient(135deg, var(--gold-deep), var(--gold))", color: "#1A0A00" },
              { icon: Users, label: "Comunidade", sub: "Alumni, grupos, eventos", href: "/people", bg: "linear-gradient(135deg, var(--red-deep), var(--red))", color: "white" },
              { icon: Award, label: "Benefícios", sub: "Perks & empresas alumni", href: "/beneficios", bg: "linear-gradient(135deg, #14532D, #166534)", color: "white" },
            ].map(({ icon: Icon, label, sub, href, bg, color }) => (
              <Link key={href} href={href} style={{ flex: "1 1 160px", textDecoration: "none", background: bg, borderRadius: 18, padding: "18px 20px", color, boxShadow: "var(--shadow-sm)", transition: "transform 0.18s, box-shadow 0.18s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)"; }}>
                <Icon style={{ width: 22, height: 22, marginBottom: 10, opacity: 0.85 }} />
                <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: 11.5, opacity: 0.65 }}>{sub}</div>
              </Link>
            ))}
          </div>

          {/* AI Insight */}
          <div className="ai-strip" style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 11, background: "rgba(232,160,32,0.15)", border: "1px solid rgba(232,160,32,0.22)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Sparkles style={{ width: 16, height: 16, color: "var(--gold)" }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="label" style={{ color: "var(--gold-deep)", marginBottom: 6 }}>✦ AI Insight do dia</div>
                <p style={{ fontSize: 13.5, color: "var(--n700)", lineHeight: 1.6 }}>
                  <strong style={{ color: "var(--n800)" }}>Sofia Carvalho</strong> e tu partilham interesse em ClimaTech. Ela procura Head of Product — <strong style={{ color: "var(--blue)" }}>96% match</strong>.
                </p>
                <div style={{ display: "flex", gap: 14, marginTop: 10, flexWrap: "wrap" }}>
                  <Link href="/concierge" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 600, color: "var(--blue)", textDecoration: "none" }}>Pedir introdução <ArrowRight style={{ width: 12, height: 12 }} /></Link>
                  <Link href="/opportunities" style={{ fontSize: 13, color: "var(--n400)", textDecoration: "none" }}>Ver oportunidade</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Oratório preview */}
          <div className="card-glass-gold">
            <div style={{ padding: "16px 20px 12px", borderBottom: "1px solid rgba(232,160,32,0.18)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Church style={{ width: 15, height: 15, color: "var(--gold-deep)" }} />
                <div style={{ fontSize: 14.5, fontWeight: 650, color: "var(--n800)" }}>Oratório</div>
              </div>
              <Link href="/oratorio" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12.5, fontWeight: 500, color: "var(--gold-deep)", textDecoration: "none" }}>
                Ver tudo <ChevronRight style={{ width: 13, height: 13 }} />
              </Link>
            </div>
            <div style={{ padding: "16px 20px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid rgba(232,160,32,0.12)" }}>
                <div style={{ fontSize: 20, flexShrink: 0 }}>✝️</div>
                <div>
                  <div className="label" style={{ color: "var(--gold-deep)", marginBottom: 6 }}>Reflexão do dia</div>
                  <p style={{ fontSize: 13, color: "var(--n700)", lineHeight: 1.6, fontStyle: "italic" }}>
                    "A jovem é a pupila dos meus olhos. Tudo o que posso fazer para os jovens, faço-o com todo o meu coração."
                  </p>
                  <div style={{ fontSize: 11.5, color: "var(--n400)", marginTop: 5 }}>— Dom Bosco</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <Link href="/oratorio/oracao" style={{ flex: 1, display: "flex", alignItems: "center", gap: 7, padding: "9px 12px", borderRadius: 12, background: "rgba(232,160,32,0.12)", border: "1px solid rgba(232,160,32,0.18)", textDecoration: "none" }}>
                  <Heart style={{ width: 13, height: 13, color: "var(--red)" }} />
                  <span style={{ fontSize: 12.5, fontWeight: 500, color: "var(--n700)" }}>Oração do dia</span>
                </Link>
                <Link href="/oratorio/voluntariado" style={{ flex: 1, display: "flex", alignItems: "center", gap: 7, padding: "9px 12px", borderRadius: 12, background: "rgba(192,57,43,0.08)", border: "1px solid rgba(192,57,43,0.14)", textDecoration: "none" }}>
                  <span style={{ fontSize: 12, color: "var(--n500)" }}>✈️</span>
                  <span style={{ fontSize: 12.5, fontWeight: 500, color: "var(--n700)" }}>Voluntariado</span>
                </Link>
              </div>
            </div>
          </div>

          {/* People */}
          <div className="card-glass">
            <div style={{ padding: "16px 20px 12px", borderBottom: "1px solid rgba(255,255,255,0.50)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: 14.5, fontWeight: 650, color: "var(--n800)" }}>Pessoas relevantes</div>
              <Link href="/people" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12.5, fontWeight: 500, color: "var(--red)", textDecoration: "none" }}>Ver comunidade <ChevronRight style={{ width: 13, height: 13 }} /></Link>
            </div>
            {alumniList.slice(0, 3).map((person, i) => (
              <div key={person.id} style={{ padding: "12px 20px", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.40)" : "none", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <img src={person.avatar} alt={person.name} style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--n150)", border: "2px solid rgba(255,255,255,0.80)" }} />
                  {person.isVerified && <div style={{ position: "absolute", bottom: -1, right: -1, width: 14, height: 14, background: "var(--blue)", borderRadius: "50%", border: "2px solid white", display: "flex", alignItems: "center", justifyContent: "center" }}><Shield style={{ width: 7, height: 7, color: "white" }} /></div>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--n800)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{person.name}</div>
                  <div style={{ fontSize: 12, color: "var(--n500)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{person.role} · {person.company}</div>
                </div>
                <Link href={`/people/${person.id}`} style={{ fontSize: 12.5, fontWeight: 500, color: "var(--red)", textDecoration: "none", flexShrink: 0 }}>→</Link>
              </div>
            ))}
          </div>

          {/* Events */}
          <div className="card-glass">
            <div style={{ padding: "16px 20px 12px", borderBottom: "1px solid rgba(255,255,255,0.50)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: 14.5, fontWeight: 650, color: "var(--n800)" }}>Próximos eventos</div>
              <Link href="/events" style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12.5, fontWeight: 500, color: "var(--red)", textDecoration: "none" }}>Ver todos <ChevronRight style={{ width: 13, height: 13 }} /></Link>
            </div>
            {events.slice(0, 3).map((ev, i) => (
              <div key={ev.id} style={{ padding: "12px 20px", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.40)" : "none", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ background: "linear-gradient(135deg, var(--red-deep), var(--red))", borderRadius: 12, padding: "8px 12px", textAlign: "center", flexShrink: 0, color: "white", minWidth: 44 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, opacity: 0.65 }}>{ev.date.split(" ")[1]?.toUpperCase()}</div>
                  <div style={{ fontSize: 17, fontWeight: 800, lineHeight: 1.1 }}>{ev.date.split(" ")[0]}</div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--n800)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginBottom: 2 }}>{ev.title}</div>
                  <div style={{ display: "flex", gap: 10, fontSize: 12, color: "var(--n400)" }}>
                    <span style={{ display: "flex", gap: 3, alignItems: "center" }}><Clock style={{ width: 10, height: 10 }} />{ev.time}</span>
                    <span style={{ display: "flex", gap: 3, alignItems: "center" }}><MapPin style={{ width: 10, height: 10 }} />{ev.isVirtual ? "Online" : ev.city}</span>
                  </div>
                </div>
                <Link href="/events" style={{ fontSize: 12.5, fontWeight: 500, color: "var(--red)", textDecoration: "none", flexShrink: 0 }}>→</Link>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <MemberCard compact />

          {/* Profile completeness */}
          <div className="card-glass" style={{ padding: "18px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--n800)" }}>Perfil</div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--blue)" }}>{currentUser.profileCompleteness}%</div>
            </div>
            <div style={{ height: 5, background: "var(--n150)", borderRadius: 999, marginBottom: 10, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${currentUser.profileCompleteness}%`, background: "linear-gradient(90deg, var(--blue-dark), var(--blue-light))", borderRadius: 999 }} />
            </div>
            <p style={{ fontSize: 12, color: "var(--n400)", lineHeight: 1.5, marginBottom: 8 }}>Adiciona interesses para melhorar as recomendações da IA.</p>
            <Link href="/profile" style={{ fontSize: 12.5, fontWeight: 600, color: "var(--blue)", textDecoration: "none" }}>Completar perfil →</Link>
          </div>

          {/* Activity */}
          <div className="card-glass">
            <div style={{ padding: "14px 18px 10px", borderBottom: "1px solid rgba(255,255,255,0.50)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--n800)" }}>Actividade</div>
              <span className="pill pill-red" style={{ fontSize: 9.5 }}>2 novas</span>
            </div>
            {notifications.slice(0, 4).map((n, i) => (
              <div key={n.id} style={{ padding: "9px 18px", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.40)" : "none", display: "flex", gap: 10 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", marginTop: 5, flexShrink: 0, background: n.isRead ? "var(--n200)" : "var(--blue)" }} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: n.isRead ? "var(--n500)" : "var(--n800)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{n.title}</div>
                  <div style={{ fontSize: 11, color: "var(--n300)", marginTop: 2 }}>{n.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
