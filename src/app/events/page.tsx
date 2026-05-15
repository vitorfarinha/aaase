"use client";

import { useState } from "react";
import { MapPin, Clock, Users, Sparkles } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { events } from "@/data/demo";

const typeLabel: Record<string, string> = { dinner: "Jantar", talk: "Talk", reunion: "Reencontro", networking: "Networking", workshop: "Workshop", webinar: "Webinar" };
const typeClass: Record<string, string> = { dinner: "pill-red", talk: "pill-blue", reunion: "pill-blue", networking: "pill-gold", workshop: "pill-green", webinar: "pill-neutral" };

export default function EventsPage() {
  const [rsvped, setRsvped] = useState<string[]>([]);

  return (
    <AppLayout>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ marginBottom: 28 }} className="animate-fade-up">
          <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--n800)", marginBottom: 6 }}>Eventos</h1>
          <p style={{ fontSize: 14, color: "var(--n400)" }}>Encontros exclusivos da comunidade alumni</p>
        </div>

        {/* Featured */}
        <div className="hero-gradient animate-fade-up delay-100" style={{ borderRadius: 20, padding: "clamp(20px,4vw,32px) clamp(20px,4vw,36px)", marginBottom: 24, color: "white" }}>
          <div style={{ position: "relative", zIndex: 1 }}>
            <span className="pill" style={{ background: "rgba(255,255,255,0.18)", color: "white", fontSize: 11, marginBottom: 16, display: "inline-block" }}>🎟 Destaque</span>
            <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 10 }}>{events[0].title}</h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.68)", lineHeight: 1.6, marginBottom: 20, maxWidth: 500 }}>{events[0].description}</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", fontSize: 13, color: "rgba(255,255,255,0.65)", marginBottom: 20 }}>
              <span style={{ display: "flex", gap: 6, alignItems: "center" }}><Clock style={{ width: 13, height: 13 }} />{events[0].date} · {events[0].time}</span>
              <span style={{ display: "flex", gap: 6, alignItems: "center" }}><MapPin style={{ width: 13, height: 13 }} />{events[0].location}</span>
              <span style={{ display: "flex", gap: 6, alignItems: "center" }}><Users style={{ width: 13, height: 13 }} />{events[0].attendeeCount}/{events[0].capacity}</span>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setRsvped(r => r.includes(events[0].id) ? r.filter(x => x !== events[0].id) : [...r, events[0].id])}
                style={{ padding: "11px 26px", borderRadius: 14, fontSize: 13.5, fontWeight: 600, cursor: "pointer", border: "none", background: rsvped.includes(events[0].id) ? "rgba(255,255,255,0.20)" : "white", color: rsvped.includes(events[0].id) ? "white" : "var(--blue-dark)", transition: "all 0.15s", fontFamily: "inherit" }}>
                {rsvped.includes(events[0].id) ? "✓ Inscrito" : "Inscrever agora"}
              </button>
              <div style={{ padding: "11px 20px", borderRadius: 14, fontSize: 13, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)", color: "white" }}>
                {events[0].price || "Gratuito"}
              </div>
            </div>
          </div>
        </div>

        {/* AI who to meet */}
        <div className="ai-strip animate-fade-up delay-150" style={{ padding: "16px 20px", marginBottom: 24, display: "flex", gap: 14, alignItems: "flex-start" }}>
          <Sparkles style={{ width: 16, height: 16, color: "var(--gold)", flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--n800)", marginBottom: 4 }}>✦ AI — Quem encontrar neste evento</div>
            <p style={{ fontSize: 13, color: "var(--n600)", lineHeight: 1.55 }}>
              <strong>Sofia Carvalho</strong> e <strong>Rui Costa</strong> estão inscritos. Baseado nos teus interesses em ClimaTech e VC, estas conexões podem ser particularmente valiosas.
            </p>
          </div>
        </div>

        {/* Event list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {events.slice(1).map((ev, i) => (
            <div key={ev.id} className="card-glass animate-fade-up" style={{ padding: "20px 24px", display: "flex", gap: 18, alignItems: "flex-start", animationDelay: `${i * 0.07}s` }}>
              <div style={{ background: "var(--blue)", borderRadius: 14, padding: "12px 16px", textAlign: "center", flexShrink: 0, color: "white", minWidth: 56 }}>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.05em", opacity: 0.65 }}>{ev.date.split(" ")[1]?.toUpperCase()}</div>
                <div style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.1 }}>{ev.date.split(" ")[0]}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 6, alignItems: "center" }}>
                  <span className={`pill ${typeClass[ev.type]}`} style={{ fontSize: 10.5 }}>{typeLabel[ev.type]}</span>
                  {ev.isVirtual && <span className="pill pill-neutral" style={{ fontSize: 10.5 }}>Online</span>}
                </div>
                <h3 style={{ fontSize: 15.5, fontWeight: 650, color: "var(--n800)", letterSpacing: "-0.02em", marginBottom: 6 }}>{ev.title}</h3>
                <p style={{ fontSize: 13, color: "var(--n500)", lineHeight: 1.55, marginBottom: 10 }}>{ev.description}</p>
                <div style={{ display: "flex", gap: 16, fontSize: 12.5, color: "var(--n400)", flexWrap: "wrap" }}>
                  <span style={{ display: "flex", gap: 5, alignItems: "center" }}><Clock style={{ width: 12, height: 12 }} />{ev.time}</span>
                  <span style={{ display: "flex", gap: 5, alignItems: "center" }}><MapPin style={{ width: 12, height: 12 }} />{ev.isVirtual ? "Online" : ev.location}</span>
                  <span style={{ display: "flex", gap: 5, alignItems: "center" }}><Users style={{ width: 12, height: 12 }} />{ev.attendeeCount}/{ev.capacity} inscritos</span>
                </div>
              </div>
              <div style={{ flexShrink: 0 }}>
                <button onClick={() => setRsvped(r => r.includes(ev.id) ? r.filter(x => x !== ev.id) : [...r, ev.id])} className="btn-primary"
                  style={{ fontSize: 12.5, padding: "9px 18px", borderRadius: 12, background: rsvped.includes(ev.id) ? "#22C55E" : "var(--blue)" }}>
                  {rsvped.includes(ev.id) ? "✓ Inscrito" : "Inscrever"}
                </button>
                {ev.price && <div style={{ fontSize: 11, color: "var(--n400)", textAlign: "center", marginTop: 6 }}>{ev.price}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
