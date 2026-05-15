"use client";
import { useState } from "react";
import { Bell, Shield, Eye, Globe, LogOut } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { currentUser } from "@/data/demo";

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} style={{ width: 44, height: 24, borderRadius: 999, background: checked ? "var(--blue)" : "var(--n200)", border: "none", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
      <div style={{ width: 20, height: 20, borderRadius: "50%", background: "white", position: "absolute", top: 2, left: checked ? 22 : 2, transition: "left 0.2s", boxShadow: "var(--shadow-sm)" }} />
    </button>
  );
}

function Section({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
  return (
    <div className="card-glass animate-fade-up" style={{ padding: "22px", marginBottom: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <div className="stat-blue" style={{ width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon style={{ width: 15, height: 15 }} />
        </div>
        <div style={{ fontSize: 15, fontWeight: 650, color: "var(--n800)", letterSpacing: "-0.015em" }}>{title}</div>
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const [prefs, setPrefs] = useState({ emails: true, intro: true, events: true, opportunities: true, weekly: false, public: true, mentor: true, searchable: true });
  const toggle = (k: keyof typeof prefs) => setPrefs(p => ({ ...p, [k]: !p[k] }));

  return (
    <AppLayout>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ marginBottom: 28 }} className="animate-fade-up">
          <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--n800)", marginBottom: 4 }}>Definições</h1>
          <p style={{ fontSize: 14, color: "var(--n400)" }}>{currentUser.name}</p>
        </div>

        <Section title="Notificações" icon={Bell}>
          {[
            { label: "Novos pedidos de introdução", key: "intro" },
            { label: "Eventos relevantes para mim", key: "events" },
            { label: "Oportunidades correspondentes", key: "opportunities" },
            { label: "Emails e comunicações", key: "emails" },
            { label: "Resumo semanal da comunidade", key: "weekly" },
          ].map(({ label, key }) => (
            <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--n100)" }}>
              <span style={{ fontSize: 14, color: "var(--n700)" }}>{label}</span>
              <Toggle checked={prefs[key as keyof typeof prefs]} onChange={() => toggle(key as keyof typeof prefs)} />
            </div>
          ))}
        </Section>

        <Section title="Privacidade & Visibilidade" icon={Eye}>
          {[
            { label: "Perfil público para alumni", key: "public" },
            { label: "Disponível como mentor", key: "mentor" },
            { label: "Encontrável na pesquisa", key: "searchable" },
          ].map(({ label, key }) => (
            <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--n100)" }}>
              <span style={{ fontSize: 14, color: "var(--n700)" }}>{label}</span>
              <Toggle checked={prefs[key as keyof typeof prefs]} onChange={() => toggle(key as keyof typeof prefs)} />
            </div>
          ))}
        </Section>

        <div className="card-glass animate-fade-up delay-200" style={{ padding: "18px 22px" }}>
          <button className="btn-ghost" style={{ width: "100%", justifyContent: "center", color: "var(--red)", borderColor: "rgba(192,57,43,0.20)", gap: 9 }}>
            <LogOut style={{ width: 15, height: 15 }} /> Terminar sessão
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
