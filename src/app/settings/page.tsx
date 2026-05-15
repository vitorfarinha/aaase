"use client";

import { useState } from "react";
import { Bell, Shield, Eye, Smartphone, Globe, LogOut, ChevronRight } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { currentUser } from "@/data/demo";
import { cn } from "@/lib/utils";

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={cn(
        "w-11 h-6 rounded-full transition-all relative",
        checked ? "bg-[#1E2D4E]" : "bg-[#EDE8E3]"
      )}
    >
      <div className={cn(
        "w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow-soft",
        checked ? "left-5.5" : "left-0.5"
      )} style={{ left: checked ? "22px" : "2px" }} />
    </button>
  );
}

export default function SettingsPage() {
  const [prefs, setPrefs] = useState({
    emailIntros: true,
    emailEvents: true,
    emailOpportunities: false,
    pushNotifs: true,
    profileVisible: true,
    showInSearch: true,
    allowIntros: true,
    mentorAvailable: currentUser.isMentor,
    language: "pt",
  });

  const toggle = (key: keyof typeof prefs) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const sections = [
    {
      title: "Notificações por email",
      icon: Bell,
      color: "bg-blue-50 text-blue-600",
      items: [
        { key: "emailIntros" as const, label: "Pedidos de introdução", desc: "Quando alguém pede uma introdução através de ti" },
        { key: "emailEvents" as const, label: "Eventos AAASE", desc: "Novos eventos e lembretes de inscrição" },
        { key: "emailOpportunities" as const, label: "Oportunidades", desc: "Novas oportunidades que correspondem ao teu perfil" },
      ],
    },
    {
      title: "Privacidade",
      icon: Shield,
      color: "bg-emerald-50 text-emerald-600",
      items: [
        { key: "profileVisible" as const, label: "Perfil visível", desc: "Outros alumni podem ver o teu perfil completo" },
        { key: "showInSearch" as const, label: "Aparecer na pesquisa", desc: "O teu nome aparece nos resultados de pesquisa da rede" },
        { key: "allowIntros" as const, label: "Aceitar introduções", desc: "Outros alumni podem pedir-te para fazer introduções" },
      ],
    },
    {
      title: "Mentoria",
      icon: Globe,
      color: "bg-amber-50 text-amber-600",
      items: [
        { key: "mentorAvailable" as const, label: "Disponível para mentorar", desc: "O teu perfil aparece na lista de mentores activos" },
        { key: "pushNotifs" as const, label: "Notificações push", desc: "Recebe notificações no telemóvel" },
      ],
    },
  ];

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-[#1A1F2E]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Definições
          </h1>
          <p className="text-[13px] text-[#8896A5]">Gere a tua conta e preferências</p>
        </div>

        {/* Account card */}
        <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft p-5 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#1E2D4E] flex items-center justify-center text-white font-bold text-lg">
              {currentUser.initials}
            </div>
            <div>
              <p className="text-[14.5px] font-semibold text-[#1A1F2E]">{currentUser.name}</p>
              <p className="text-[12.5px] text-[#8896A5]">{currentUser.memberNumber} · Membro desde {currentUser.memberSince}</p>
            </div>
            <button className="ml-auto text-[13px] text-[#3A7BC8] hover:text-[#1E2D4E] font-medium transition-colors">
              Editar conta →
            </button>
          </div>
        </div>

        {/* Settings sections */}
        {sections.map(section => {
          const Icon = section.icon;
          return (
            <div key={section.title} className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft mb-4 overflow-hidden">
              <div className="px-5 py-4 border-b border-[#EDE8E3] flex items-center gap-2">
                <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center", section.color)}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <h2 className="text-[14px] font-semibold text-[#1A1F2E]">{section.title}</h2>
              </div>
              <div className="divide-y divide-[#EDE8E3]">
                {section.items.map(item => (
                  <div key={item.key} className="px-5 py-4 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[13.5px] font-medium text-[#1A1F2E]">{item.label}</p>
                      <p className="text-[12px] text-[#8896A5] mt-0.5">{item.desc}</p>
                    </div>
                    <Toggle checked={prefs[item.key] as boolean} onChange={() => toggle(item.key)} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {/* Danger zone */}
        <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft overflow-hidden">
          <div className="px-5 py-4 border-b border-[#EDE8E3]">
            <h2 className="text-[14px] font-semibold text-[#1A1F2E]">Conta</h2>
          </div>
          <div className="divide-y divide-[#EDE8E3]">
            <button className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#FAF8F5] transition-colors">
              <span className="text-[13.5px] text-[#4A5568]">Exportar dados</span>
              <ChevronRight className="w-4 h-4 text-[#B8C4CC]" />
            </button>
            <button className="w-full px-5 py-4 flex items-center gap-3 text-left hover:bg-red-50 transition-colors group">
              <LogOut className="w-4 h-4 text-[#8896A5] group-hover:text-red-500 transition-colors" />
              <span className="text-[13.5px] text-[#8896A5] group-hover:text-red-600 transition-colors">Terminar sessão</span>
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
