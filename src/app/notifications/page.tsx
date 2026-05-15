"use client";
import { useState } from "react";
import { Bell, Users, Briefcase, Calendar, Award, MessageSquare, Sparkles, Check } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { notifications } from "@/data/demo";

const iconMap: Record<string, any> = { intro: Sparkles, connection: Users, opportunity: Briefcase, event: Calendar, reward: Award, message: MessageSquare };
const colorMap: Record<string, string> = { intro: "stat-gold", connection: "stat-blue", opportunity: "stat-blue", event: "stat-red", reward: "stat-gold", message: "stat-blue" };

export default function NotificationsPage() {
  const [read, setRead] = useState<string[]>(notifications.filter(n => n.isRead).map(n => n.id));
  const markAll = () => setRead(notifications.map(n => n.id));

  return (
    <AppLayout>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }} className="animate-fade-up">
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--n800)", marginBottom: 4 }}>Notificações</h1>
            <p style={{ fontSize: 14, color: "var(--n400)" }}>{notifications.filter(n => !read.includes(n.id)).length} não lidas</p>
          </div>
          <button onClick={markAll} className="btn-ghost" style={{ fontSize: 13, display: "flex", alignItems: "center", gap: 7 }}>
            <Check style={{ width: 13, height: 13 }} /> Marcar tudo como lido
          </button>
        </div>

        <div className="card-glass animate-fade-up delay-100" style={{ overflow: "hidden" }}>
          {notifications.map((n, i) => {
            const Icon = iconMap[n.type] || Bell;
            const isRead = read.includes(n.id);
            return (
              <div key={n.id} onClick={() => setRead(r => [...r, n.id])}
                style={{ display: "flex", gap: 14, padding: "16px 22px", borderBottom: i < notifications.length - 1 ? "1px solid rgba(200,210,228,0.25)" : "none", background: isRead ? "transparent" : "rgba(46,109,180,0.03)", cursor: "pointer", transition: "background 0.15s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(46,109,180,0.05)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = isRead ? "transparent" : "rgba(46,109,180,0.03)"; }}
              >
                <div className={colorMap[n.type]} style={{ width: 38, height: 38, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon style={{ width: 16, height: 16 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 14, fontWeight: isRead ? 400 : 600, color: "var(--n800)" }}>{n.title}</span>
                    {!isRead && <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--blue)", flexShrink: 0 }} />}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--n500)", marginTop: 3, lineHeight: 1.5 }}>{n.body}</div>
                  <div style={{ fontSize: 11.5, color: "var(--n300)", marginTop: 5 }}>{n.timestamp}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
