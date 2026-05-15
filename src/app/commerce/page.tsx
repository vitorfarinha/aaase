"use client";

import { useState } from "react";
import { Star, Shield, Users, Award, ChevronRight, Search, Heart } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { businesses } from "@/data/demo";
import { cn } from "@/lib/utils";

const categories = ["Todos", "Legal", "SaaS / ClimaTech", "Creative Services", "Healthcare", "Finance / VC"];

function BusinessCard({ biz }: { biz: typeof businesses[0] }) {
  const [endorsed, setEndorsed] = useState(false);
  const [endorseCount, setEndorseCount] = useState(biz.endorsements);

  const handleEndorse = () => {
    if (!endorsed) {
      setEndorseCount((c: number) => c + 1);
    } else {
      setEndorseCount((c: number) => c - 1);
    }
    setEndorsed(!endorsed);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft hover:shadow-card transition-all overflow-hidden card-hover">
      {/* Header with perk */}
      <div className="gradient-navy px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-white/60 uppercase tracking-wide font-medium">Empresa Alumni</span>
          {biz.trustBadge && (
            <div className="flex items-center gap-1 bg-white/15 rounded-full px-2 py-0.5">
              <Shield className="w-2.5 h-2.5 text-white" />
              <span className="text-[10px] text-white font-medium">Verificada</span>
            </div>
          )}
        </div>
        <span className="text-[11px] text-white/50">Est. {biz.foundedYear}</span>
      </div>

      <div className="p-5">
        {/* Business info */}
        <div className="flex items-start gap-3 mb-3">
          <div className="w-12 h-12 bg-[#FAF8F5] rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border border-[#EDE8E3]">
            {biz.logo}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-semibold text-[#1A1F2E]">{biz.name}</h3>
            <p className="text-[12.5px] text-[#8896A5]">
              por <span className="text-[#4A5568] font-medium">{biz.founder}</span> · {biz.city}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10.5px] bg-[#FAF8F5] border border-[#EDE8E3] text-[#4A5568] px-2 py-0.5 rounded-full">
                {biz.category}
              </span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(i => (
              <Star key={i} className={cn("w-3.5 h-3.5", i <= Math.floor(biz.rating) ? "text-amber-400 fill-amber-400" : "text-[#EDE8E3]")} />
            ))}
          </div>
          <span className="text-[12.5px] font-semibold text-[#1A1F2E]">{biz.rating}</span>
          <span className="text-[12px] text-[#8896A5]">({biz.reviewCount} reviews alumni)</span>
        </div>

        {/* Description */}
        <p className="text-[13px] text-[#4A5568] leading-relaxed mb-3 line-clamp-2">
          {biz.description}
        </p>

        {/* Featured review */}
        <div className="bg-[#FAF8F5] rounded-xl p-3 mb-3 border border-[#EDE8E3]">
          <p className="text-[12px] text-[#4A5568] italic leading-relaxed mb-1">
            "{biz.featuredReview}"
          </p>
          <p className="text-[11px] text-[#8896A5] font-medium">— {biz.reviewerName}, alumni AAASE</p>
        </div>

        {/* Community perk */}
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <div>
              <span className="text-[10.5px] font-semibold text-amber-800 uppercase tracking-wide">Benefício AAASE</span>
              <p className="text-[12px] text-amber-700 mt-0.5">{biz.communityPerk}</p>
            </div>
          </div>
        </div>

        {/* Community stats */}
        <div className="flex items-center gap-3 mb-4 text-[12px] text-[#8896A5]">
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>{endorseCount} endorsements</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            <span>Verificada pela comunidade</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={handleEndorse}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12.5px] font-medium transition-all border",
              endorsed
                ? "bg-rose-50 text-rose-600 border-rose-200"
                : "bg-[#FAF8F5] text-[#4A5568] border-[#EDE8E3] hover:border-[#B8AFA5]"
            )}
          >
            <Heart className={cn("w-3.5 h-3.5", endorsed && "fill-rose-500")} />
            {endorsed ? "Endossado" : "Endossar"}
          </button>
          <button className="flex-1 bg-[#1E2D4E] hover:bg-[#2A3F6E] text-white text-[12.5px] font-medium rounded-xl py-2 transition-colors">
            Ver & Contactar →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CommercePage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [search, setSearch] = useState("");

  const filtered = businesses.filter(b => {
    const matchesSearch = !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "Todos" || b.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1A1F2E] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            Empresas Alumni
          </h1>
          <p className="text-[14px] text-[#8896A5]">
            Suporte à comunidade · {businesses.length} empresas verificadas
          </p>
        </div>

        {/* Trust Banner */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200/60 rounded-2xl p-5 mb-6">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-emerald-100 rounded-xl flex-shrink-0">
              <Shield className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-[14.5px] font-semibold text-emerald-900 mb-1">Confiança garantida pela comunidade</h2>
              <p className="text-[13px] text-emerald-800 leading-relaxed">
                Cada empresa é fundada por um alumni verificado AAASE. Todos os reviews são escritos por membros reais da rede. 
                <strong className="font-semibold"> Endossa quando tens experiência positiva.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8896A5]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar empresas..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-[#D9D2C9] rounded-xl text-[13.5px] text-[#1A1F2E] placeholder-[#B8C4CC] focus:outline-none focus:ring-2 focus:ring-[#3A7BC8]/20 focus:border-[#3A7BC8] transition-all shadow-soft"
          />
        </div>

        {/* Category Filters */}
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

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filtered.map((biz) => (
            <BusinessCard key={biz.id} biz={biz} />
          ))}
        </div>

        {/* List your business CTA */}
        <div className="mt-6 bg-[#FAF8F5] border border-[#EDE8E3] border-dashed rounded-2xl p-6 text-center">
          <div className="text-2xl mb-2">🏪</div>
          <h3 className="text-[15px] font-semibold text-[#1A1F2E] mb-1">Tens uma empresa?</h3>
          <p className="text-[13px] text-[#8896A5] mb-4">
            Lista a tua empresa e acede à rede de clientes alumni de confiança.
          </p>
          <button className="px-5 py-2.5 bg-[#1E2D4E] hover:bg-[#2A3F6E] text-white text-[13px] font-medium rounded-xl transition-colors">
            Registar empresa →
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
