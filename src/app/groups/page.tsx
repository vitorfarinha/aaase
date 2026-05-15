"use client";

import { useState } from "react";
import { Users, Lock, ArrowRight, CheckCircle } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { groups, currentUser } from "@/data/demo";
import { cn } from "@/lib/utils";

function GroupCard({ group }: { group: typeof groups[0] }) {
  const isMember = currentUser.groups.includes(group.id);
  const [joined, setJoined] = useState(isMember);

  return (
    <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft hover:shadow-card transition-all p-5 card-hover">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-[#FAF8F5] rounded-xl flex items-center justify-center text-xl border border-[#EDE8E3]">
            {group.emoji}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-[14px] font-semibold text-[#1A1F2E]">{group.name}</h3>
              {group.isPrivate && <Lock className="w-3 h-3 text-[#8896A5]" />}
            </div>
            <div className="flex items-center gap-1 text-[12px] text-[#8896A5]">
              <Users className="w-3 h-3" />
              <span>{group.memberCount} membros</span>
              <span>·</span>
              <span className="text-[10.5px] bg-[#FAF8F5] border border-[#EDE8E3] text-[#4A5568] px-1.5 py-0.5 rounded-full">
                {group.category}
              </span>
            </div>
          </div>
        </div>
        {joined && (
          <div className="flex items-center gap-1 text-[11px] text-emerald-600 bg-emerald-50 rounded-lg px-2 py-1">
            <CheckCircle className="w-3 h-3" />
            Membro
          </div>
        )}
      </div>

      <p className="text-[13px] text-[#4A5568] leading-relaxed mb-3">{group.description}</p>

      <div className="text-[11.5px] text-[#B8C4CC] mb-4 italic">{group.recentActivity}</div>

      <button
        onClick={() => setJoined(!joined)}
        className={cn(
          "w-full text-[12.5px] font-medium rounded-xl py-2.5 transition-all",
          joined
            ? "bg-[#FAF8F5] text-[#4A5568] border border-[#EDE8E3] hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            : group.isPrivate
            ? "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
            : "bg-[#1E2D4E] hover:bg-[#2A3F6E] text-white"
        )}
      >
        {joined
          ? "Sair do grupo"
          : group.isPrivate
          ? "Pedir acesso"
          : "Entrar no grupo"
        }
      </button>
    </div>
  );
}

export default function GroupsPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const categories = ["Todos", "Professional", "Cause", "Regional", "Life", "Values"];

  const filtered = groups.filter(g =>
    activeCategory === "Todos" || g.category === activeCategory
  );

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1A1F2E] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            Grupos & Micro-Comunidades
          </h1>
          <p className="text-[14px] text-[#8896A5]">
            Espaços íntimos e curados dentro da tua rede alumni
          </p>
        </div>

        {/* My groups summary */}
        <div className="bg-gradient-to-br from-[#1E2D4E] to-[#2A3F6E] rounded-2xl p-5 mb-6 text-white">
          <div className="text-[12px] text-white/60 uppercase tracking-wide mb-2">Os teus grupos</div>
          <div className="flex items-center gap-2 flex-wrap">
            {currentUser.groups.map((gId) => {
              const g = groups.find(gr => gr.id === gId);
              if (!g) return null;
              return (
                <div key={gId} className="flex items-center gap-1.5 bg-white/10 rounded-xl px-3 py-1.5">
                  <span>{g.emoji}</span>
                  <span className="text-[12.5px] font-medium">{g.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 flex-wrap mb-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-xl text-[12.5px] font-medium transition-all",
                activeCategory === cat
                  ? "bg-[#1E2D4E] text-white shadow-soft"
                  : "bg-white text-[#4A5568] border border-[#EDE8E3] hover:border-[#B8AFA5]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {filtered.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>

        {/* Create group CTA */}
        <div className="mt-6 bg-[#FAF8F5] border border-[#EDE8E3] border-dashed rounded-2xl p-6 text-center">
          <h3 className="text-[15px] font-semibold text-[#1A1F2E] mb-1">Criar um novo grupo</h3>
          <p className="text-[13px] text-[#8896A5] mb-4">
            Propõe um novo grupo para a comunidade AAASE.
          </p>
          <button className="px-5 py-2.5 bg-[#1E2D4E] hover:bg-[#2A3F6E] text-white text-[13px] font-medium rounded-xl transition-colors">
            Propor grupo
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
