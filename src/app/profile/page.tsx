"use client";
import { useState } from "react";
import Link from "next/link";
import { Shield, MapPin, Briefcase, GraduationCap, Star, Users, Sparkles } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { currentUser, alumniList } from "@/data/demo";
import { getTrustColor } from "@/lib/utils";

const tabs = ["Visão geral", "Conexões", "Confiança"];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Visão geral");
  const trustColor = getTrustColor(currentUser.trustScore);

  return (
    <AppLayout>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Profile header card */}
        <div className="card-glass animate-fade-up" style={{ padding: "32px 36px", marginBottom: 20, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, right: 0, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(46,109,180,0.07) 0%, transparent 70%)", transform: "translate(30%, -30%)", pointerEvents: "none" }} />
          <div style={{ display: "flex", alignItems: "flex-start", gap: 24, flexWrap: "wrap" }}>
            <div style={{ position: "relative" }}>
              <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--blue)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, color: "white", boxShadow: "0 4px 20px rgba(46,109,180,0.30)" }}>
                {currentUser.initials}
              </div>
              {currentUser.isVerified && (
                <div style={{ position: "absolute", bottom: 2, right: 2, width: 22, height: 22, background: "var(--blue)", borderRadius: "50%", border: "2.5px solid white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Shield style={{ width: 11, height: 11, color: "white" }} />
                </div>
              )}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 6 }}>
                <h1 style={{ fontSize: 22, fontWeight: 750, color: "var(--n800)", letterSpacing: "-0.03em" }}>{currentUser.name}</h1>
                <span className="pill pill-blue">Turma {currentUser.graduationYear}</span>
                {currentUser.isMentor && <span className="pill pill-gold">Mentor</span>}
              </div>
              <div style={{ fontSize: 14.5, color: "var(--n600)", marginBottom: 4, display: "flex", gap: 8, alignItems: "center" }}>
                <Briefcase style={{ width: 13, height: 13 }} />{currentUser.role} · {currentUser.company}
              </div>
              <div style={{ fontSize: 13.5, color: "var(--n400)", display: "flex", gap: 16, flexWrap: "wrap" }}>
                <span style={{ display: "flex", gap: 5, alignItems: "center" }}><MapPin style={{ width: 12, height: 12 }} />{currentUser.city}</span>
                <span style={{ display: "flex", gap: 5, alignItems: "center" }}><GraduationCap style={{ width: 12, height: 12 }} />Turma {currentUser.graduationYear}</span>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 32, fontWeight: 750, color: trustColor, letterSpacing: "-0.04em", lineHeight: 1 }}>{currentUser.trustScore}</div>
                <div style={{ fontSize: 11, color: "var(--n400)", marginTop: 3, fontWeight: 500 }}>Trust Score</div>
              </div>
              <div style={{ width: 96, height: 5, background: "var(--n150)", borderRadius: 999, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${currentUser.trustScore}%`, background: trustColor, borderRadius: 999 }} />
              </div>
            </div>
          </div>

          <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(200,210,228,0.25)" }}>
            <p style={{ fontSize: 14, color: "var(--n600)", lineHeight: 1.65 }}>{currentUser.bio}</p>
          </div>

          <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {currentUser.interests.map(i => <span key={i} className="pill pill-neutral" style={{ fontSize: 12 }}>{i}</span>)}
          </div>

          <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
            <button className="btn-primary" style={{ fontSize: 13, padding: "9px 22px", borderRadius: 12 }}>Editar perfil</button>
            <Link href="/concierge" className="btn-ghost" style={{ fontSize: 13, padding: "9px 18px" }}>Pedir introdução</Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="animate-fade-up delay-100" style={{ display: "flex", gap: 4, marginBottom: 20, background: "white", border: "1px solid var(--n150)", borderRadius: 16, padding: 5 }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)}
              style={{ flex: 1, padding: "9px 16px", borderRadius: 12, fontSize: 13.5, fontWeight: 500, cursor: "pointer", border: "none", fontFamily: "inherit", transition: "all 0.15s", background: activeTab === t ? "var(--blue)" : "transparent", color: activeTab === t ? "white" : "var(--n500)", boxShadow: activeTab === t ? "0 2px 8px rgba(46,109,180,0.25)" : "none" } as React.CSSProperties}>
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="animate-fade-up delay-150">
          {activeTab === "Visão geral" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div className="card-glass" style={{ padding: "20px 22px" }}>
                <div style={{ fontSize: 14, fontWeight: 650, color: "var(--n800)", marginBottom: 14 }}>Completude do perfil</div>
                <div style={{ fontSize: 28, fontWeight: 750, color: "var(--blue)", letterSpacing: "-0.03em", marginBottom: 8 }}>{currentUser.profileCompleteness}%</div>
                <div style={{ height: 6, background: "var(--n150)", borderRadius: 999, overflow: "hidden", marginBottom: 12 }}>
                  <div style={{ height: "100%", width: `${currentUser.profileCompleteness}%`, background: "linear-gradient(90deg, var(--blue-dark), var(--blue-light))", borderRadius: 999 }} />
                </div>
                <div style={{ fontSize: 13, color: "var(--n500)" }}>Adiciona a tua foto e interesses para atingir 100%</div>
              </div>
              <div className="card-glass" style={{ padding: "20px 22px" }}>
                <div style={{ fontSize: 14, fontWeight: 650, color: "var(--n800)", marginBottom: 14 }}>Membro desde</div>
                <div style={{ fontSize: 28, fontWeight: 750, color: "var(--n700)", letterSpacing: "-0.03em", marginBottom: 8 }}>{currentUser.memberSince}</div>
                <div className="mono" style={{ fontSize: 12, color: "var(--n400)" }}>{currentUser.memberNumber}</div>
              </div>
            </div>
          )}
          {activeTab === "Conexões" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {alumniList.slice(0, 4).map(p => (
                <div key={p.id} className="card-glass" style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
                  <img src={p.avatar} alt={p.name} style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--n150)" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--n800)", marginBottom: 3 }}>{p.name}</div>
                    <div style={{ fontSize: 13, color: "var(--n500)" }}>{p.role} · {p.company}</div>
                  </div>
                  <Link href={`/people/${p.id}`} className="btn-ghost" style={{ fontSize: 12.5, padding: "7px 14px" }}>Ver perfil</Link>
                </div>
              ))}
            </div>
          )}
          {activeTab === "Confiança" && (
            <div className="card-glass" style={{ padding: "24px" }}>
              <div style={{ fontSize: 14, fontWeight: 650, color: "var(--n800)", marginBottom: 20 }}>Factores de confiança</div>
              {[
                { label: "Perfil completo", value: 91, max: 100, desc: "Perfil muito completo" },
                { label: "Actividade na comunidade", value: 78, max: 100, desc: "Activo regularmente" },
                { label: "Endossos recebidos", value: 12, max: 20, desc: "12 endossos de alumni" },
                { label: "Mentoria", value: 8, max: 10, desc: "8 mentorias completadas" },
              ].map(({ label, value, max, desc }) => (
                <div key={label} style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 14, color: "var(--n700)", fontWeight: 500 }}>{label}</span>
                    <span style={{ fontSize: 13, color: "var(--n400)" }}>{desc}</span>
                  </div>
                  <div style={{ height: 5, background: "var(--n150)", borderRadius: 999, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${(value/max)*100}%`, background: `linear-gradient(90deg, var(--blue-dark), var(--blue-light))`, borderRadius: 999 }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
