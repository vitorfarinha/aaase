"use client";

import { AppLayout } from "@/components/layout/AppLayout";
import { adminStats } from "@/data/demo";
import { Users, Handshake, Building2, Award, Calendar, TrendingUp, Globe, ArrowUpRight } from "lucide-react";

function StatCard({ label, value, trend, icon: Icon, colorClass }: { label: string; value: string | number; trend?: string; icon: any; colorClass: string }) {
  return (
    <div className="card-glass" style={{ padding: "18px 20px" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
        <div className={colorClass} style={{ width: 38, height: 38, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon style={{ width: 16, height: 16 }} />
        </div>
        {trend && (
          <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 12, fontWeight: 600, color: "#166534" }}>
            <ArrowUpRight style={{ width: 12, height: 12 }} />{trend}
          </div>
        )}
      </div>
      <div style={{ fontSize: "clamp(22px,4vw,28px)", fontWeight: 750, color: "var(--n800)", letterSpacing: "-0.04em", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12.5, color: "var(--n500)", marginTop: 4 }}>{label}</div>
    </div>
  );
}

export default function AdminPage() {
  const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];
  const maxEngagement = Math.max(...adminStats.engagementTrend);

  return (
    <AppLayout>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ marginBottom: 24 }} className="animate-fade-up">
          <h1 style={{ fontSize: "clamp(20px,4vw,26px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--n800)", marginBottom: 4 }}>Dashboard Admin</h1>
          <p style={{ fontSize: 14, color: "var(--n400)" }}>Visão geral da comunidade AAASE</p>
        </div>

        {/* Stats — 4 cols → 2 cols → 2 cols */}
        <div className="grid-4 animate-fade-up delay-100" style={{ marginBottom: 24 }}>
          <StatCard label="Alumni Totais" value={adminStats.totalAlumni} trend="+12%" icon={Users} colorClass="stat-blue" />
          <StatCard label="Activos este mês" value={adminStats.activeThisMonth} trend="+8%" icon={TrendingUp} colorClass="stat-green" />
          <StatCard label="Introduções feitas" value={adminStats.introductionsMade} trend="+18%" icon={Handshake} colorClass="stat-gold" />
          <StatCard label="Sessões de mentoria" value={adminStats.mentorSessions} trend="+11%" icon={Users} colorClass="stat-blue" />
          <StatCard label="Empresas listadas" value={adminStats.businessesListed} icon={Building2} colorClass="stat-red" />
          <StatCard label="Benefícios resgatados" value={adminStats.rewardsRedeemed} trend="+24%" icon={Award} colorClass="stat-gold" />
          <StatCard label="Eventos organizados" value={adminStats.eventsHosted} icon={Calendar} colorClass="stat-green" />
          <StatCard label="Países representados" value="32" icon={Globe} colorClass="stat-blue" />
        </div>

        {/* Charts grid — 2 cols on desktop, 1 on mobile */}
        <div className="grid-2 animate-fade-up delay-150">
          {/* Engagement chart */}
          <div className="card-glass" style={{ padding: "20px" }}>
            <div style={{ fontSize: 14, fontWeight: 650, color: "var(--n800)", marginBottom: 18 }}>Engagement mensal</div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 100 }}>
              {adminStats.engagementTrend.map((v, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                  <div style={{ width: "100%", background: i === 11 ? "var(--blue)" : "var(--blue-muted)", borderRadius: "5px 5px 0 0", height: `${(v / maxEngagement) * 100}px`, border: i === 11 ? "none" : "1px solid rgba(46,109,180,0.15)" }} />
                  <div style={{ fontSize: 9, color: "var(--n400)", fontWeight: 500 }}>{months[i]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Top industries */}
          <div className="card-glass" style={{ padding: "20px" }}>
            <div style={{ fontSize: 14, fontWeight: 650, color: "var(--n800)", marginBottom: 16 }}>Top indústrias</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {adminStats.topIndustries.map((ind) => {
                const pct = Math.round((ind.count / adminStats.totalAlumni) * 100);
                return (
                  <div key={ind.name}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 13, color: "var(--n700)" }}>
                      <span style={{ fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{ind.name}</span>
                      <span style={{ color: "var(--n400)", flexShrink: 0, marginLeft: 8 }}>{pct}%</span>
                    </div>
                    <div style={{ height: 5, background: "var(--n150)", borderRadius: 999, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, var(--blue-dark), var(--blue-light))", borderRadius: 999 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top cities */}
          <div className="card-glass" style={{ padding: "20px" }}>
            <div style={{ fontSize: 14, fontWeight: 650, color: "var(--n800)", marginBottom: 14 }}>Alumni por cidade</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {adminStats.topCities.map((city, i) => (
                <div key={city.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: i === 0 ? "var(--blue)" : "var(--n100)", border: i > 0 ? "1px solid var(--n200)" : "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: i === 0 ? "white" : "var(--n500)", flexShrink: 0 }}>
                    {i + 1}
                  </div>
                  <div style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", minWidth: 0 }}>
                    <span style={{ fontSize: 13.5, fontWeight: 500, color: "var(--n700)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{city.name}</span>
                    <span style={{ fontSize: 13, color: "var(--n400)", flexShrink: 0, marginLeft: 8 }}>{city.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick stats */}
          <div className="card-glass" style={{ padding: "20px" }}>
            <div style={{ fontSize: 14, fontWeight: 650, color: "var(--n800)", marginBottom: 14 }}>Actividade recente</div>
            {[
              { label: "Novas introduções hoje", value: "12", color: "var(--blue)" },
              { label: "Mentorias este mês", value: "34", color: "#22C55E" },
              { label: "Novos membros esta semana", value: "7", color: "var(--gold)" },
              { label: "Eventos activos", value: "5", color: "var(--red)" },
              { label: "Empresas com perks activos", value: "18", color: "var(--blue)" },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid var(--n100)" }}>
                <span style={{ fontSize: 13, color: "var(--n600)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</span>
                <span style={{ fontSize: 16, fontWeight: 700, color, letterSpacing: "-0.02em", flexShrink: 0, marginLeft: 12 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
