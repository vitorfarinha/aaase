"use client";
import { AppLayout } from "@/components/layout/AppLayout";

const oracoes = [
  { hora: "Manhã", icon: "☀️", titulo: "Oração do Início do Dia", texto: "Senhor Jesus, ao começar este dia confio-me à Tua providência. Dá-me a sabedoria de Dom Bosco para estar próximo dos jovens, a paciência para escutar e a coragem para amar sem reservas. Que as minhas mãos, palavras e coração sejam instrumentos do Teu amor. Nossa Senhora Auxiliadora, intercede por nós. Amen." },
  { hora: "Meio-dia", icon: "🌤", titulo: "Angelus", texto: "O Anjo do Senhor anunciou a Maria... E ela concebeu do Espírito Santo. Ave Maria... Eis aqui a serva do Senhor... faça-se em mim segundo a Tua palavra. Ave Maria... E o Verbo encarnou... e habitou entre nós. Ave Maria... Rogai por nós, Santa Mãe de Deus... Para que sejamos dignos das promessas de Cristo. Oremos: Derrama, Senhor, a Tua graça em nossas almas..." },
  { hora: "Noite", icon: "🌙", titulo: "Exame de Consciência Salesiano", texto: "Senhor, ao terminar este dia faço o exame da minha consciência ao Teu amor. Fui para os jovens um sinal de alegria? Soube escutar com o coração de Dom Bosco? Em que falhei ao amor? Peço perdão pelas minhas faltas e renovo a minha dedicação à comunidade salesiana. Descansarei em paz, sabendo que Tu me amas. Amen." },
];

const santo = { nome: "Dom Bosco", data: "31 de Janeiro", emoji: "⛪" };

export default function OracaoPage() {
  return (
    <AppLayout>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div className="hero-oratorio animate-fade-up" style={{ borderRadius: 22, padding: "clamp(22px,4vw,36px)", marginBottom: 24, color: "white" }}>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div className="label" style={{ color: "rgba(255,255,255,0.50)", marginBottom: 8 }}>Oratório · Oração</div>
            <h1 style={{ fontSize: "clamp(22px,4vw,30px)", fontWeight: 800, letterSpacing: "-0.03em", color: "white", marginBottom: 8 }}>Oração do Dia</h1>
            <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.60)", lineHeight: 1.6 }}>
              Santo do dia: <strong style={{ color: "rgba(255,255,255,0.85)" }}>{santo.emoji} {santo.nome}</strong> · {santo.data}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {oracoes.map((o, i) => (
            <div key={o.hora} className="card-glass animate-fade-up" style={{ padding: "24px 26px", animationDelay: `${i * 0.1}s` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ fontSize: 24 }}>{o.icon}</div>
                <div>
                  <div className="label" style={{ color: "var(--gold-deep)", marginBottom: 3 }}>{o.hora}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "var(--n800)", letterSpacing: "-0.02em" }}>{o.titulo}</div>
                </div>
              </div>
              <p style={{ fontSize: 14, color: "var(--n600)", lineHeight: 1.75, fontStyle: "italic", borderLeft: "3px solid var(--gold)", paddingLeft: 16 }}>
                {o.texto}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
