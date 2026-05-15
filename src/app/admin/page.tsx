"use client";

import { Users, TrendingUp, Handshake, Building2, Award, Calendar, Globe, BarChart3, ArrowUpRight, Shield } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { adminStats } from "@/data/demo";
import { cn } from "@/lib/utils";

function StatCard({ label, value, icon: Icon, trend, color }: {
  label: string; value: string | number; icon: any; trend?: string; color: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft p-5">
      <div className="flex items-start justify-between mb-3">
        <div className={cn("p-2.5 rounded-xl", color)}>
          <Icon className="w-4.5 h-4.5" />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-[11.5px] text-emerald-600 font-medium">
            <ArrowUpRight className="w-3.5 h-3.5" />
            {trend}
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-[#1A1F2E] mb-0.5">{typeof value === "number" ? value.toLocaleString() : value}</div>
      <div className="text-[12.5px] text-[#8896A5]">{label}</div>
    </div>
  );
}

function MiniBar({ data, max, color }: { data: { name: string; count: number }[]; max: number; color: string }) {
  return (
    <div className="space-y-2">
      {data.map((item) => (
        <div key={item.name} className="flex items-center gap-3">
          <div className="text-[12px] text-[#4A5568] w-24 flex-shrink-0 truncate">{item.name}</div>
          <div className="flex-1 bg-[#EDE8E3] rounded-full h-1.5">
            <div
              className={cn("h-1.5 rounded-full transition-all", color)}
              style={{ width: `${(item.count / max) * 100}%` }}
            />
          </div>
          <div className="text-[12px] text-[#8896A5] w-8 text-right">{item.count}</div>
        </div>
      ))}
    </div>
  );
}

function MiniLineChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 60;
  const w = 100;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-16" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function AdminPage() {
  return (
    <AppLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-[#3A7BC8]" />
              <span className="text-[12px] text-[#3A7BC8] font-semibold uppercase tracking-wide">Administração</span>
            </div>
            <h1 className="text-2xl font-bold text-[#1A1F2E]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Community Insights
            </h1>
            <p className="text-[14px] text-[#8896A5]">Visão geral da rede AAASE · Actualizado em tempo real</p>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-[#8896A5]">Último update</div>
            <div className="text-[13px] font-semibold text-[#1A1F2E]">Hoje, 17:42</div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard label="Alumni registados" value={adminStats.totalAlumni} icon={Users} trend="+12%" color="bg-blue-50 text-blue-600" />
          <StatCard label="Activos este mês" value={adminStats.activeThisMonth} icon={TrendingUp} trend="+8%" color="bg-emerald-50 text-emerald-600" />
          <StatCard label="Introduções feitas" value={adminStats.introductionsMade} icon={Handshake} trend="+23%" color="bg-amber-50 text-amber-600" />
          <StatCard label="Sessões de mentoria" value={adminStats.mentorSessions} icon={Award} trend="+15%" color="bg-purple-50 text-purple-600" />
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard label="Empresas listadas" value={adminStats.businessesListed} icon={Building2} color="bg-rose-50 text-rose-600" />
          <StatCard label="Benefícios resgatados" value={adminStats.rewardsRedeemed} icon={Award} trend="+31%" color="bg-orange-50 text-orange-600" />
          <StatCard label="Eventos realizados" value={adminStats.eventsHosted} icon={Calendar} color="bg-sky-50 text-sky-600" />
          <StatCard label="Alumni globais" value="847" icon={Globe} color="bg-indigo-50 text-indigo-600" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Engagement trend */}
          <div className="col-span-2 bg-white rounded-2xl border border-[#EDE8E3] shadow-soft p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-[14.5px] font-semibold text-[#1A1F2E]">Engagement mensal</h3>
                <p className="text-[12px] text-[#8896A5]">Alumni activos nos últimos 12 meses</p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-[#1A1F2E]">{adminStats.activeThisMonth}</div>
                <div className="text-[11px] text-emerald-600 font-medium">↑ +8% vs mês anterior</div>
              </div>
            </div>
            <MiniLineChart data={adminStats.engagementTrend} color="#3A7BC8" />
            <div className="flex justify-between text-[10.5px] text-[#B8C4CC] mt-1">
              {["Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez", "Jan", "Fev", "Mar", "Abr", "Mai"].map(m => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>

          {/* Intros trend */}
          <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[14.5px] font-semibold text-[#1A1F2E]">Introduções</h3>
            </div>
            <MiniLineChart data={adminStats.introsTrend} color="#D4A843" />
            <div className="flex items-center justify-between mt-2">
              <div className="text-[11px] text-[#8896A5]">Este mês</div>
              <div className="text-[15px] font-bold text-[#1A1F2E]">278</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Top industries */}
          <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft p-5">
            <h3 className="text-[14.5px] font-semibold text-[#1A1F2E] mb-4">Top Indústrias</h3>
            <MiniBar
              data={adminStats.topIndustries}
              max={Math.max(...adminStats.topIndustries.map(i => i.count))}
              color="bg-blue-500"
            />
          </div>

          {/* Top cities */}
          <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft p-5">
            <h3 className="text-[14.5px] font-semibold text-[#1A1F2E] mb-4">Alumni por Cidade</h3>
            <MiniBar
              data={adminStats.topCities}
              max={Math.max(...adminStats.topCities.map(c => c.count))}
              color="bg-emerald-500"
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
