"use client";
import { AppLayout } from "@/components/layout/AppLayout";

const textos = [
  { tipo: "Carta", ano: "1884", titulo: "Carta de Roma", excerto: "Quando era jovem, sonhava com os rapazes que me rodeavam: tumultuosos, irreverentes, às vezes blasfemos. Ouvi uma voz que me dizia: 'Não com pancadas, mas com a mansidão e a caridade deverás ganhar estes teus amigos.'", contexto: "Escrita em Roma, esta carta define o coração do Sistema Preventivo." },
  { tipo: "Máxima", ano: "1875", titulo: "O Sistema Preventivo", excerto: "A razão, a religião e o amor — eis os três pilares que sustentam o edifício da educação salesiana. Basta que os jovens saibam que sois amados para que se deixem guiar.", contexto: "Fundamento do método pedagógico de Dom Bosco." },
  { tipo: "Biografia", ano: "1815–1888", titulo: "Giovanni Bosco — uma vida para os jovens", excerto: "Nascido em 1815 numa família humilde de Castelnuovo d'Asti, Giovanni Bosco cresceu num ambiente de pobreza e fé. Após a ordenação sacerdotal em 1841, dedicou toda a sua vida aos jovens trabalhadores de Turim, criando os Oratórios que se tornaram modelo educativo para o mundo.", contexto: "Dom Bosco foi canonizado por Pio XI em 1934." },
];

export default function BoscoPage() {
  return (
    <AppLayout>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div className="hero-oratorio animate-fade-up" style={{ borderRadius: 22, padding: "clamp(22px,4vw,36px)", marginBottom: 24, color: "white" }}>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="label" style={{ color: "rgba(255,255,255,0.50)", marginBottom: 8 }}>Oratório · Dom Bosco</div>
            <h1 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, letterSpacing: "-0.03em", color: "white", marginBottom: 8 }}>Dom Bosco</h1>
            <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.60)" }}>Cartas, textos e reflexões do Fundador dos Salesianos</p>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {textos.map((t, i) => (
            <div key={t.titulo} className="card-glass animate-fade-up" style={{ padding: "24px 26px", animationDelay: `${i * 0.1}s` }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                <span className="pill pill-gold">{t.tipo}</span>
                <span className="pill pill-neutral">{t.ano}</span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "var(--n800)", letterSpacing: "-0.02em", marginBottom: 12 }}>{t.titulo}</h3>
              <blockquote style={{ fontSize: 14.5, color: "var(--n700)", lineHeight: 1.7, fontStyle: "italic", borderLeft: "3px solid var(--gold)", paddingLeft: 16, marginBottom: 12 }}>
                "{t.excerto}"
              </blockquote>
              <p style={{ fontSize: 12.5, color: "var(--n400)", lineHeight: 1.5 }}>{t.contexto}</p>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
