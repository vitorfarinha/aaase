"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { Shield, MapPin, Briefcase, GraduationCap, Users, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { AppLayout } from "@/components/layout/AppLayout";
import { alumniList, currentUser } from "@/data/demo";
import { getTrustColor } from "@/lib/utils";

export default function AlumniProfilePage() {
  const params = useParams();
  const [introRequested, setIntroRequested] = useState(false);
  const [connected, setConnected] = useState(false);
  const person = alumniList.find(a => a.id === params.id);

  if (!person) return (
    <AppLayout>
      <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", padding: "80px 20px" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
        <div style={{ fontSize: 18, fontWeight: 600, color: "var(--n800)", marginBottom: 8 }}>Alumni não encontrado</div>
        <Link href="/people" className="btn-primary" style={{ fontSize: 13, padding: "10px 22px" }}>← Voltar à comunidade</Link>
      </div>
    </AppLayout>
  );

  const trustColor = getTrustColor(person.trustScore);

  return (
    <AppLayout>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <Link href="/people" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13.5, color: "var(--n500)", textDecoration: "none", marginBottom: 22, transition: "color 0.15s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--n800)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--n500)"; }}>
          <ArrowLeft style={{ width: 14, height: 14 }} /> Comunidade
        </Link>

        {/* Header */}
        <div className="card-glass animate-fade-up" style={{ padding: "32px 36px", marginBottom: 18 }}>
          <div style={{ display: "flex", gap: 22, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ position: "relative" }}>
              <img src={person.avatar} alt={person.name} style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--n150)", border: "3px solid white", boxShadow: "var(--shadow-md)" }} />
              {person.isVerified && (
                <div style={{ position: "absolute", bottom: 2, right: 2, width: 22, height: 22, background: "var(--blue)", borderRadius: "50%", border: "2.5px solid white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Shield style={{ width: 11, height: 11, color: "white" }} />
                </div>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap", marginBottom: 6 }}>
                <h1 style={{ fontSize: 22, fontWeight: 750, color: "var(--n800)", letterSpacing: "-0.03em" }}>{person.name}</h1>
                <span className="pill pill-neutral" style={{ fontSize: 11 }}>Turma {person.graduationYear}</span>
                {person.isMentor && <span className="pill pill-gold">Mentor</span>}
                {person.isFounder && <span className="pill pill-green">Fundador</span>}
              </div>
              <div style={{ fontSize: 14.5, color: "var(--n600)", marginBottom: 4, display: "flex", gap: 8, alignItems: "center" }}>
                <Briefcase style={{ width: 13, height: 13 }} />{person.role} · {person.company}
              </div>
              <div style={{ fontSize: 13, color: "var(--n400)", display: "flex", gap: 16, flexWrap: "wrap" }}>
                <span style={{ display: "flex", gap: 5, alignItems: "center" }}><MapPin style={{ width: 12, height: 12 }} />{person.city}, {person.country}</span>
                <span style={{ display: "flex", gap: 5, alignItems: "center" }}><GraduationCap style={{ width: 12, height: 12 }} />Turma {person.graduationYear}</span>
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 30, fontWeight: 750, color: trustColor, letterSpacing: "-0.04em" }}>{person.trustScore}</div>
              <div style={{ fontSize: 11, color: "var(--n400)", fontWeight: 500 }}>Trust Score</div>
            </div>
          </div>

          {person.bio && (
            <p style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(200,210,228,0.25)", fontSize: 14, color: "var(--n600)", lineHeight: 1.65 }}>{person.bio}</p>
          )}

          {/* Actions */}
          <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
            <button onClick={() => setConnected(c => !c)} className="btn-primary" style={{ fontSize: 13, padding: "10px 22px", borderRadius: 12, background: connected ? "#22C55E" : "var(--blue)" }}>
              {connected ? "✓ Conectado" : "+ Conectar"}
            </button>
            <button onClick={() => setIntroRequested(true)} className="btn-ghost" style={{ fontSize: 13, padding: "10px 18px", display: "flex", alignItems: "center", gap: 7 }}>
              <Sparkles style={{ width: 13, height: 13 }} /> {introRequested ? "Introdução pedida ✓" : "Pedir introdução"}
            </button>
          </div>
        </div>

        {/* Why relevant */}
        {person.whyRelevant && (
          <div className="ai-strip animate-fade-up delay-100" style={{ padding: "16px 22px", marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <Sparkles style={{ width: 15, height: 15, color: "var(--gold)", flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--gold)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>✦ Porquê esta pessoa é relevante para ti</div>
                <p style={{ fontSize: 13.5, color: "var(--n700)", lineHeight: 1.6 }}>{person.whyRelevant}</p>
                {person.mutualConnections && person.mutualConnections.length > 0 && (
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 10, fontSize: 13, color: "var(--n500)" }}>
                    <Users style={{ width: 13, height: 13 }} />
                    <strong style={{ color: "var(--n700)" }}>Conexões em comum:</strong> {person.mutualConnections.join(", ")}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Details */}
        <div className="animate-fade-up delay-150" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 14 }}>
          <div className="card-glass" style={{ padding: "20px 22px" }}>
            <div style={{ fontSize: 13.5, fontWeight: 650, color: "var(--n800)", marginBottom: 14 }}>Interesses</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {person.interests.map(i => <span key={i} className="pill pill-neutral" style={{ fontSize: 12 }}>{i}</span>)}
            </div>
          </div>
          <div className="card-glass" style={{ padding: "20px 22px" }}>
            <div style={{ fontSize: 13.5, fontWeight: 650, color: "var(--n800)", marginBottom: 14 }}>Competências</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {person.skills.map(s => <span key={s} className="pill pill-blue" style={{ fontSize: 12 }}>{s}</span>)}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
