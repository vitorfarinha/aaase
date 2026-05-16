"use client";

import Link from "next/link";
import { AppLayout } from "@/components/layout/AppLayout";
import { BookOpen, Heart, HandHeart, ChevronRight, Sparkles, ExternalLink } from "lucide-react";

const reflexao = {
  texto: "A jovem é a pupila dos meus olhos. Tudo o que posso fazer para os jovens, faço-o com todo o meu coração.",
  fonte: "Dom Bosco",
  contexto: "Carta de Roma, 1884",
};

const oracao = {
  titulo: "Oração da Manhã",
  texto: "Senhor, no início deste dia ofereço-Te todo o meu trabalho, alegrias e dificuldades. Que eu saiba ser instrumento da Tua paz junto de todos os que encontrar. Pela intercessão de Dom Bosco, ajuda-me a ser para os jovens um sinal do Teu amor. Amen.",
  santo: "Dom Bosco — 31 de Janeiro",
};

const noticias = [
  {
    id: "1",
    fonte: "Boletim Salesiano",
    titulo: "Missão Salesiana no Brasil: 150 anos de presença",
    resumo: "A Família Salesiana celebra um século e meio de missão junto dos jovens mais vulneráveis do Brasil, com projectos de educação e inclusão social.",
    data: "15 Mai 2026",
    categoria: "Missão",
    url: "#",
    cor: "var(--gold)",
  },
  {
    id: "2",
    fonte: "ANS — Agência Salesiana",
    titulo: "Dom Bosco: patrono da juventude italiana proclamado Doutor da Igreja",
    resumo: "O processo de declaração de Dom Bosco como Doutor da Igreja avança no Vaticano, reconhecendo o seu sistema preventivo como teologia pedagógica.",
    data: "12 Mai 2026",
    categoria: "Igreja",
    url: "#",
    cor: "var(--red)",
  },
  {
    id: "3",
    fonte: "ANS — Agência Salesiana",
    titulo: "Voluntariado Missionário: 320 jovens em missão este verão",
    resumo: "A Missão Dom Bosco coordena 320 voluntários para missões em África, Ásia e América Latina durante os meses de Julho e Agosto.",
    data: "10 Mai 2026",
    categoria: "Voluntariado",
    url: "#",
    cor: "var(--blue)",
  },
  {
    id: "4",
    fonte: "Boletim Salesiano",
    titulo: "Estoril Salesiano: 90 anos ao serviço da juventude",
    resumo: "O colégio Salesiano do Estoril celebra 90 anos com um programa especial de eventos e a abertura dos arquivos históricos à comunidade.",
    data: "8 Mai 2026",
    categoria: "Estoril",
    url: "#",
    cor: "var(--gold)",
  },
];

const projectos = [
  { nome: "Missão Dom Bosco", desc: "Voluntariado missionário salesiano", icon: "✈️", url: "https://missaodombosco.pt" },
  { nome: "Bosco Global", desc: "Rede global de projectos sociais", icon: "🌍", url: "#" },
  { nome: "Oratório em Acção", desc: "Projectos locais com jovens", icon: "⚽", url: "#" },
];

export default function OratorioPage() {
  return (
    <AppLayout>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Hero Oratório */}
        <div className="hero-oratorio animate-fade-up" style={{ borderRadius: 24, padding: "clamp(24px,4vw,40px)", marginBottom: 24, color: "white" }}>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="label" style={{ color: "rgba(255,255,255,0.50)", marginBottom: 10 }}>Espaço Salesiano</div>
            <h1 style={{ fontSize: "clamp(26px,5vw,38px)", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: 12, color: "white" }}>
              Oratório
            </h1>
            <p style={{ fontSize: "clamp(13px,2.5vw,15px)", color: "rgba(255,255,255,0.65)", maxWidth: 480, lineHeight: 1.65, marginBottom: 24 }}>
              Um espaço de espiritualidade salesiana, notícias da Família Salesiana mundial e oportunidades de voluntariado e missão.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href="/oratorio/oracao" className="btn-gold" style={{ fontSize: 13, padding: "10px 20px", borderRadius: 13 }}>
                <Heart style={{ width: 14, height: 14 }} /> Oração do Dia
              </Link>
              <Link href="/oratorio/bosco" className="btn-ghost" style={{ fontSize: 13, padding: "10px 18px", borderRadius: 13, background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.22)", color: "white" }}>
                <BookOpen style={{ width: 14, height: 14 }} /> Dom Bosco
              </Link>
            </div>
          </div>
        </div>

        {/* Reflexão do dia */}
        <div className="card-glass-gold animate-fade-up delay-100" style={{ padding: "22px 26px", marginBottom: 24 }}>
          <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{ fontSize: 32, flexShrink: 0 }}>✝️</div>
            <div style={{ flex: 1 }}>
              <div className="label" style={{ color: "var(--gold-deep)", marginBottom: 10 }}>✦ Reflexão do dia</div>
              <blockquote style={{ fontSize: "clamp(15px,3vw,18px)", fontWeight: 600, color: "var(--n800)", letterSpacing: "-0.02em", lineHeight: 1.55, fontStyle: "italic", marginBottom: 12 }}>
                "{reflexao.texto}"
              </blockquote>
              <div style={{ fontSize: 13, color: "var(--n500)", fontWeight: 500 }}>
                — {reflexao.fonte} · <span style={{ color: "var(--n400)" }}>{reflexao.contexto}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid-sidebar animate-fade-up delay-150" style={{ alignItems: "start" }}>

          {/* Left: Notícias */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
              <h2 style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.025em", color: "var(--n800)" }}>Notícias Salesianas</h2>
              <span style={{ fontSize: 12, color: "var(--n400)" }}>Boletim Salesiano · ANS</span>
            </div>

            {noticias.map((n) => (
              <div key={n.id} className="card-glass" style={{ padding: "18px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <span className="pill" style={{ background: `${n.cor}18`, color: n.cor, border: `1px solid ${n.cor}30`, fontSize: 10 }}>{n.categoria}</span>
                  <span style={{ fontSize: 11.5, color: "var(--n400)" }}>{n.fonte}</span>
                  <span style={{ fontSize: 11, color: "var(--n300)", marginLeft: "auto" }}>{n.data}</span>
                </div>
                <h3 style={{ fontSize: 14.5, fontWeight: 650, color: "var(--n800)", letterSpacing: "-0.02em", lineHeight: 1.35, marginBottom: 8 }}>{n.titulo}</h3>
                <p style={{ fontSize: 13, color: "var(--n500)", lineHeight: 1.6, marginBottom: 12 }}>{n.resumo}</p>
                <Link href={n.url} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12.5, fontWeight: 600, color: "var(--blue)", textDecoration: "none" }}>
                  Ler mais <ExternalLink style={{ width: 11, height: 11 }} />
                </Link>
              </div>
            ))}
          </div>

          {/* Right: Oração + Quick access + Voluntariado */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Oração rápida */}
            <div className="hero-oratorio" style={{ borderRadius: 20, padding: "22px" }}>
              <div style={{ position: "relative", zIndex: 1, color: "white" }}>
                <div className="label" style={{ color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>Oração do dia</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.90)", marginBottom: 8 }}>☀️ {oracao.titulo}</div>
                <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.70)", lineHeight: 1.6, marginBottom: 16 }}>
                  {oracao.texto.slice(0, 120)}...
                </p>
                <Link href="/oratorio/oracao" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 600, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.22)", borderRadius: 11, padding: "8px 14px", color: "white", textDecoration: "none" }}>
                  Oração completa <ChevronRight style={{ width: 13, height: 13 }} />
                </Link>
              </div>
            </div>

            {/* Quick links */}
            <div className="card-glass" style={{ padding: "18px 20px" }}>
              <div style={{ fontSize: 14, fontWeight: 650, color: "var(--n800)", marginBottom: 14 }}>Espaços salesianos</div>
              {[
                { icon: Heart, label: "Oração do Dia", href: "/oratorio/oracao", color: "var(--red)" },
                { icon: BookOpen, label: "Dom Bosco — Reflexões", href: "/oratorio/bosco", color: "var(--gold-deep)" },
                { icon: HandHeart, label: "Voluntariado & Missão", href: "/oratorio/voluntariado", color: "var(--blue)" },
              ].map(({ icon: Icon, label, href, color }) => (
                <Link key={href} href={href}
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: "1px solid rgba(232,160,32,0.12)", textDecoration: "none" }}>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: `${color}14`, border: `1px solid ${color}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon style={{ width: 15, height: 15, color }} />
                  </div>
                  <span style={{ flex: 1, fontSize: 13.5, fontWeight: 500, color: "var(--n700)" }}>{label}</span>
                  <ChevronRight style={{ width: 13, height: 13, color: "var(--n300)" }} />
                </Link>
              ))}
            </div>

            {/* Projectos de voluntariado */}
            <div className="card-glass" style={{ padding: "18px 20px" }}>
              <div style={{ fontSize: 14, fontWeight: 650, color: "var(--n800)", marginBottom: 14 }}>Projectos em destaque</div>
              {projectos.map((p) => (
                <Link key={p.nome} href={p.url} target="_blank"
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid rgba(232,160,32,0.10)", textDecoration: "none" }}>
                  <div style={{ fontSize: 22, width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--gold-muted)", borderRadius: 11, flexShrink: 0 }}>
                    {p.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--n800)" }}>{p.nome}</div>
                    <div style={{ fontSize: 11.5, color: "var(--n400)" }}>{p.desc}</div>
                  </div>
                  <ExternalLink style={{ width: 12, height: 12, color: "var(--n300)" }} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
