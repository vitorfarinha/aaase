"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { adminStats } from "@/data/demo";
import { Users, Handshake, Building2, Award, Calendar, TrendingUp, Globe, ArrowUpRight } from "lucide-react";

function StatCard({ label, value, trend, icon: Icon, colorClass }: { label: string; value: string | number; trend?: string; icon: any; colorClass: string }) {
  return (
    <div className="card-glass" style={{ padding: "20px 22px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
        <div className={colorClass} style={{ width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon style={{ width: 17, height: 17 }} />
        </div>
        {trend && (
          <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 600, color: "#166534" }}>
            <ArrowUpRight style={{ width: 13, height: 13 }} />{trend}
          </div>
        )}
      </div>
      <div style={{ fontSize: 28, fontWeight: 750, color: "var(--n800)", letterSpacing: "-0.04em", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 13, color: "var(--n500)", marginTop: 5 }}>{label}</div>
    </div>
  );
}

export default function AdminPage() {
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const maxEngagement = Math.max(...adminStats.engagementTrend);

  return (
    <AppLayout>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ marginBottom: 28 }} className="animate-fade-up">
          <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--n800)", marginBottom: 6 }}>Dashboard Admin</h1>
          <p style={{ fontSize: 14, color: "var(--n400)" }}>Visão geral da comunidade AAASE</p>
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }} className="animate-fade-up delay-100">
          <StatCard label="Alumni Totais" value={adminStats.totalAlumni} trend="+12%" icon={Users} colorClass="stat-blue" />
          <StatCard label="Activos este mês" value={adminStats.activeThisMonth} trend="+8%" icon={TrendingUp} colorClass="stat-green" />
          <StatCard label="Introduções feitas" value={adminStats.introductionsMade} trend="+18%" icon={Handshake} colorClass="stat-gold" />
          <StatCard label="Sessões de mentoria" value={adminStats.mentorSessions} trend="+11%" icon={Users} colorClass="stat-blue" />
          <StatCard label="Empresas listadas" value={adminStats.businessesListed} icon={Building2} colorClass="stat-red" />
          <StatCard label="Benefícios resgatados" value={adminStats.rewardsRedeemed} trend="+24%" icon={Award} colorClass="stat-gold" />
          <StatCard label="Eventos organizados" value={adminStats.eventsHosted} icon={Calendar} colorClass="stat-green" />
          <StatCard label="Países representados" value="32" icon={Globe} colorClass="stat-blue" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="animate-fade-up delay-150">
          {/* Engagement chart */}
          <div className="card-glass" style={{ padding: "22px" }}>
            <div style={{ fontSize: 15, fontWeight: 650, color: "var(--n800)", marginBottom: 20 }}>Engagement mensal</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120 }}>
              {adminStats.engagementTrend.map((v, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{ width: "100%", background: i === 11 ? "var(--blue)" : "var(--blue-muted)", borderRadius: "6px 6px 0 0", height: `${(v / maxEngagement) * 100}px`, transition: "all 0.3s", border: i === 11 ? "none" : "1px solid rgba(46,109,180,0.15)" }} />
                  <div style={{ fontSize: 9.5, color: "var(--n400)", fontWeight: 500 }}>{months[i].slice(0, 1)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Top industries */}
          <div className="card-glass" style={{ padding: "22px" }}>
            <div style={{ fontSize: 15, fontWeight: 650, color: "var(--n800)", marginBottom: 16 }}>Top indústrias</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {adminStats.topIndustries.map((ind, i) => {
                const pct = Math.round((ind.count / adminStats.totalAlumni) * 100);
                return (
                  <div key={ind.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 13, color: "var(--n700)" }}>
                      <span style={{ fontWeight: 500 }}>{ind.name}</span>
                      <span style={{ color: "var(--n400)" }}>{ind.count} · {pct}%</span>
                    </div>
                    <div style={{ height: 5, background: "var(--n150)", borderRadius: 999, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, var(--blue-dark), var(--blue-light))`, borderRadius: 999 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top cities */}
          <div className="card-glass" style={{ padding: "22px" }}>
            <div style={{ fontSize: 15, fontWeight: 650, color: "var(--n800)", marginBottom: 16 }}>Alumni por cidade</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {adminStats.topCities.map((city, i) => (
                <div key={city.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: i === 0 ? "var(--blue)" : "var(--n100)", border: i > 0 ? "1px solid var(--n200)" : "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: i === 0 ? "white" : "var(--n500)", flexShrink: 0 }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13.5, fontWeight: 500, color: "var(--n700)" }}>{city.name}</span>
                    <span style={{ fontSize: 13, color: "var(--n400)" }}>{city.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick stats */}
          <div className="card-glass" style={{ padding: "22px" }}>
            <div style={{ fontSize: 15, fontWeight: 650, color: "var(--n800)", marginBottom: 16 }}>Actividade recente</div>
            {[
              { label: "Novas introduções hoje", value: "12", color: "var(--blue)" },
              { label: "Sessões de mentoria este mês", value: "34", color: "#22C55E" },
              { label: "Novos membros esta semana", value: "7", color: "var(--gold)" },
              { label: "Eventos activos", value: "5", color: "var(--red)" },
              { label: "Empresas com perks activos", value: "18", color: "var(--blue)" },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--n100)" }}>
                <span style={{ fontSize: 13.5, color: "var(--n600)" }}>{label}</span>
                <span style={{ fontSize: 16, fontWeight: 700, color, letterSpacing: "-0.02em" }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
