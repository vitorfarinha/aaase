"use client";

import { useState } from "react";
import { Award, Shield, Sparkles, QrCode, Copy, CheckCircle, Star, ArrowRight } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { rewards, currentUser } from "@/data/demo";
import { cn } from "@/lib/utils";

function DigitalCard() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="mb-6">
      <div
        className="relative cursor-pointer select-none"
        style={{ perspective: "1000px" }}
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className="relative w-full transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            height: "200px",
          }}
        >
          {/* Front */}
          <div className="absolute inset-0 rounded-2xl gradient-navy shadow-elevated overflow-hidden"
            style={{ backfaceVisibility: "hidden" }}>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-6 right-8 w-40 h-40 rounded-full border-2 border-white"></div>
              <div className="absolute top-16 right-20 w-24 h-24 rounded-full border border-white"></div>
              <div className="absolute -bottom-8 left-1/4 w-56 h-56 rounded-full border border-white/50"></div>
            </div>
            <div className="relative z-10 p-6 h-full flex flex-col justify-between text-white">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[11px] text-white/50 uppercase tracking-[0.15em] mb-1">Antigos Alunos Salesianos de Estoril</div>
                  <div className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>AAASE</div>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 rounded-lg px-2 py-1">
                  <Shield className="w-3 h-3 text-emerald-300" />
                  <span className="text-[10px] text-white/80 font-medium">Verificado</span>
                </div>
              </div>

              <div>
                <div className="text-[18px] font-bold mb-0.5">{currentUser.name}</div>
                <div className="text-[12px] text-white/60">
                  Turma {currentUser.graduationYear} · {currentUser.memberNumber}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-white/40 mb-0.5">Trust Score</div>
                  <div className="text-lg font-bold">{currentUser.trustScore}</div>
                </div>
                <div>
                  <div className="text-[10px] text-white/40 mb-0.5">Membro desde</div>
                  <div className="text-[13px] font-medium">{currentUser.memberSince}</div>
                </div>
                <div className="text-[11px] text-white/30 italic">Virar →</div>
              </div>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-2xl gradient-navy shadow-elevated overflow-hidden flex items-center justify-center"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="text-center p-6">
              <div className="w-28 h-28 bg-white rounded-xl mx-auto mb-3 flex items-center justify-center">
                <div className="grid grid-cols-5 gap-0.5">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div key={i} className={cn("w-4 h-4 rounded-sm", Math.random() > 0.5 ? "bg-[#1E2D4E]" : "bg-transparent")} />
                  ))}
                </div>
              </div>
              <div className="text-white/60 text-[11px] font-mono-custom">{currentUser.memberNumber}</div>
              <div className="text-white/40 text-[10px] mt-1">Mostrar na entrada de eventos e parceiros</div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-[11.5px] text-[#B8C4CC] text-center mt-2">Clica no cartão para ver o QR code</p>
    </div>
  );
}

function RewardCard({ reward }: { reward: typeof rewards[0] }) {
  const [redeemed, setRedeemed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (reward.code) {
      navigator.clipboard?.writeText(reward.code).catch(() => {});
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={cn(
      "bg-white rounded-2xl border shadow-soft hover:shadow-card transition-all p-5 card-hover",
      reward.isMostLoved ? "border-amber-200" : "border-[#EDE8E3]"
    )}>
      {/* Badge */}
      {reward.isMostLoved && (
        <div className="flex items-center gap-1.5 mb-3">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span className="text-[10.5px] font-semibold text-amber-700 uppercase tracking-wide">
            Mais amado pela comunidade
          </span>
        </div>
      )}

      <div className="flex items-start gap-3 mb-3">
        <div className="w-11 h-11 bg-[#FAF8F5] rounded-xl flex items-center justify-center text-xl flex-shrink-0 border border-[#EDE8E3]">
          {reward.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="text-[14px] font-semibold text-[#1A1F2E] truncate">{reward.title}</h3>
            {reward.isExclusive && (
              <span className="text-[10px] bg-[#1E2D4E] text-white px-1.5 py-0.5 rounded-full font-medium flex-shrink-0">
                Exclusivo
              </span>
            )}
          </div>
          <p className="text-[12px] text-[#8896A5]">{reward.partner}</p>
        </div>
      </div>

      <p className="text-[13px] text-[#4A5568] leading-relaxed mb-3">{reward.description}</p>

      {/* Benefit highlight */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3 mb-4">
        <div className="flex items-center gap-2">
          <Award className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
          <span className="text-[12.5px] font-semibold text-emerald-800">{reward.benefit}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4 text-[12px] text-[#8896A5]">
        <span>{reward.redemptionCount} membros usaram este benefício</span>
        {reward.validUntil && <span>Válido até {reward.validUntil}</span>}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {reward.code && (
          <button
            onClick={handleCopy}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-medium transition-all border font-mono-custom",
              copied ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-[#FAF8F5] text-[#4A5568] border-[#EDE8E3]"
            )}
          >
            {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? "Copiado!" : reward.code}
          </button>
        )}
        <button
          onClick={() => setRedeemed(!redeemed)}
          className={cn(
            "flex-1 text-[12.5px] font-medium rounded-xl py-2 transition-all",
            redeemed
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : "bg-[#1E2D4E] hover:bg-[#2A3F6E] text-white"
          )}
        >
          {redeemed ? "Resgatado ✓" : "Resgatar benefício"}
        </button>
      </div>
    </div>
  );
}

export default function RewardsPage() {
  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1A1F2E] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            Benefícios & Cartão de Membro
          </h1>
          <p className="text-[14px] text-[#8896A5]">
            Privilégios exclusivos para membros AAASE · {rewards.length} benefícios activos
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left - Card + AI */}
          <div className="col-span-1">
            <DigitalCard />

            {/* AI Recommendations */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/60 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-[11.5px] font-semibold text-amber-800 uppercase tracking-wide">AI recomenda para ti</span>
              </div>
              <p className="text-[12.5px] text-amber-900 leading-relaxed mb-3">
                Baseado no teu perfil de fundador, a consulta jurídica com o <strong>João Lopes</strong> seria especialmente valiosa agora.
              </p>
              <div className="text-[11.5px] text-amber-700 font-medium">
                Usado por 143 membros como tu →
              </div>
            </div>
          </div>

          {/* Right - Rewards */}
          <div className="col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[15px] font-semibold text-[#1A1F2E]">Os teus benefícios</h2>
              <span className="text-[12px] text-[#8896A5]">{rewards.length} disponíveis</span>
            </div>
            <div className="space-y-4">
              {rewards.map((reward) => (
                <RewardCard key={reward.id} reward={reward} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
