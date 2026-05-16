"use client";
import Link from "next/link";
import { ExternalLink, MapPin, Calendar } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";

const projectos = [
  { nome: "Missão Dom Bosco", pais: "Portugal / Mundo", desc: "O maior programa de voluntariado missionário salesiano em Portugal. Envia jovens para missões em África, Ásia e América.", icone: "✈️", tipo: "Missão", data: "Jul–Ago 2026", url: "https://missaodombosco.pt", vagas: 12 },
  { nome: "Oratório em Acção — Estoril", pais: "Estoril, Portugal", desc: "Animação do Oratório Salesiano do Estoril: actividades desportivas, catequese e apoio escolar para jovens.", icone: "⚽", tipo: "Local", data: "Todo o ano", url: "#", vagas: 8 },
  { nome: "Bosco Global Network", pais: "Internacional", desc: "Rede global de projectos sociais salesianos. Candidatura a projectos de 3 a 12 meses em 130 países.", icone: "🌍", tipo: "Internacional", data: "Candidaturas abertas", url: "#", vagas: 25 },
  { nome: "Apoio Escolar Salesiano", pais: "Lisboa, Portugal", desc: "Voluntariado de tutoria académica para jovens de famílias carenciadas em parceria com as obras salesianas de Lisboa.", icone: "📚", tipo: "Educação", data: "Out 2026 – Jun 2027", url: "#", vagas: 15 },
];

export default function VoluntariadoPage() {
  return (
    <AppLayout>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="hero-oratorio animate-fade-up" style={{ borderRadius: 22, padding: "clamp(22px,4vw,36px)", marginBottom: 24, color: "white" }}>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="label" style={{ color: "rgba(255,255,255,0.50)", marginBottom: 8 }}>Oratório · Missão</div>
            <h1 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, letterSpacing: "-0.03em", color: "white", marginBottom: 8 }}>Voluntariado & Missão</h1>
            <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.60)", lineHeight: 1.6, maxWidth: 460 }}>Projectos de voluntariado salesiano — local, nacional e missionário — para alumni que queiram continuar o carisma de Dom Bosco.</p>
          </div>
        </div>

        <div className="grid-auto-280 animate-fade-up delay-100">
          {projectos.map((p, i) => (
            <div key={p.nome} className="card-glass" style={{ padding: "22px", animationDelay: `${i * 0.08}s` }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ fontSize: 26, width: 46, height: 46, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(232,160,32,0.12)", border: "1px solid rgba(232,160,32,0.18)", borderRadius: 13, flexShrink: 0 }}>{p.icone}</div>
                <div>
                  <div style={{ display: "flex", gap: 7, marginBottom: 5 }}>
                    <span className="pill pill-gold" style={{ fontSize: 10 }}>{p.tipo}</span>
                    {p.vagas > 0 && <span className="pill pill-green" style={{ fontSize: 10 }}>{p.vagas} vagas</span>}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--n800)", letterSpacing: "-0.02em" }}>{p.nome}</div>
                </div>
              </div>
              <p style={{ fontSize: 13, color: "var(--n500)", lineHeight: 1.6, marginBottom: 12 }}>{p.desc}</p>
              <div style={{ display: "flex", gap: 12, fontSize: 12, color: "var(--n400)", marginBottom: 16, flexWrap: "wrap" }}>
                <span style={{ display: "flex", gap: 4, alignItems: "center" }}><MapPin style={{ width: 11, height: 11 }} />{p.pais}</span>
                <span style={{ display: "flex", gap: 4, alignItems: "center" }}><Calendar style={{ width: 11, height: 11 }} />{p.data}</span>
              </div>
              <Link href={p.url} target={p.url !== "#" ? "_blank" : undefined} className="btn-gold" style={{ width: "100%", fontSize: 13, padding: "10px", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
                Candidatar <ExternalLink style={{ width: 13, height: 13 }} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
