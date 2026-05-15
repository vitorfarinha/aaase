"use client";

import { useState } from "react";
import { Lock, Users } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { groups, currentUser } from "@/data/demo";

export default function GroupsPage() {
  const [joined, setJoined] = useState<string[]>(currentUser.groups);
  const myGroups = groups.filter(g => joined.includes(g.id));
  const suggestedGroups = groups.filter(g => !joined.includes(g.id));

  return (
    <AppLayout>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ marginBottom: 28 }} className="animate-fade-up">
          <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--n800)", marginBottom: 6 }}>Grupos</h1>
          <p style={{ fontSize: 14, color: "var(--n400)" }}>Micro-comunidades curadas da rede alumni</p>
        </div>

        {/* My groups */}
        <div style={{ marginBottom: 32 }}>
          <div className="label" style={{ marginBottom: 14 }}>Os meus grupos</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
            {myGroups.map((g, i) => (
              <div key={g.id} className="card-glass animate-fade-up" style={{ padding: "20px 22px", animationDelay: `${i * 0.06}s` }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 12 }}>
                  <div style={{ fontSize: 28, width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--n100)", borderRadius: 14, flexShrink: 0 }}>{g.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                      <span style={{ fontSize: 14, fontWeight: 650, color: "var(--n800)", letterSpacing: "-0.01em" }}>{g.name}</span>
                      {g.isPrivate && <Lock style={{ width: 11, height: 11, color: "var(--n400)" }} />}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--n400)" }}>
                      <Users style={{ width: 11, height: 11 }} />{g.memberCount} membros
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: "var(--n500)", lineHeight: 1.55, marginBottom: 12 }}>{g.description}</p>
                <div style={{ fontSize: 11.5, color: "var(--blue)", background: "var(--blue-muted)", borderRadius: 10, padding: "7px 11px" }}>💬 {g.recentActivity}</div>
                <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                  <button className="btn-primary" style={{ flex: 1, fontSize: 13, padding: "8px", borderRadius: 11 }}>Ver grupo</button>
                  <button onClick={() => setJoined(j => j.filter(id => id !== g.id))} className="btn-ghost" style={{ fontSize: 13, padding: "8px 14px" }}>Sair</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested */}
        {suggestedGroups.length > 0 && (
          <div>
            <div className="label" style={{ marginBottom: 14 }}>Grupos sugeridos</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
              {suggestedGroups.map((g, i) => (
                <div key={g.id} className="card animate-fade-up" style={{ padding: "20px 22px", animationDelay: `${i * 0.06}s` }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 12 }}>
                    <div style={{ fontSize: 26, width: 46, height: 46, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--n50)", borderRadius: 14, flexShrink: 0, border: "1px solid var(--n150)" }}>{g.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 3 }}>
                        <span style={{ fontSize: 14, fontWeight: 650, color: "var(--n800)" }}>{g.name}</span>
                        {g.isPrivate && <Lock style={{ width: 11, height: 11, color: "var(--n400)" }} />}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--n400)", display: "flex", gap: 5, alignItems: "center" }}><Users style={{ width: 11, height: 11 }} />{g.memberCount} membros</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: "var(--n500)", lineHeight: 1.55, marginBottom: 14 }}>{g.description}</p>
                  <button onClick={() => setJoined(j => [...j, g.id])} className="btn-primary" style={{ width: "100%", fontSize: 13, padding: "9px", borderRadius: 11 }}>
                    + Entrar no grupo
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
