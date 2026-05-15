"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, ArrowRight, Shield, Users, Award, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "magic">("email");
  const [loading, setLoading] = useState(false);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setStep("magic");
    setLoading(false);
  };

  const handleDemo = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    router.push("/dashboard");
  };

  const trustItems = [
    { icon: Shield, text: "Identidade verificada para todos os membros" },
    { icon: Users, text: "847 alumni activos em todo o mundo" },
    { icon: Award, text: "Benefícios e perks exclusivos" },
    { icon: Sparkles, text: "AI Concierge para ligações inteligentes" },
  ];

  return (
    <div style={{ minHeight: "100dvh", background: "var(--n50)", display: "flex" }} className="app-bg">
      {/* Left panel — hero */}
      <div
        className="hero-gradient"
        style={{ width: "44%", display: "none", flexDirection: "column", justifyContent: "space-between", padding: "48px", position: "relative", flexShrink: 0 }}
        id="left-panel"
      >
        <style>{`@media(min-width:960px){#left-panel{display:flex}}`}</style>
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 56 }}>
            <div style={{ width: 42, height: 42, borderRadius: 13, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.20)" }}>
              <img src="/aaase-logo.png" alt="AAASE" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: "white", letterSpacing: "-0.02em" }}>AAASE</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.50)", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>Alumni Network</div>
            </div>
          </div>

          <h1 style={{ fontSize: 38, fontWeight: 750, color: "white", letterSpacing: "-0.04em", lineHeight: 1.12, marginBottom: 20, textWrap: "balance" } as React.CSSProperties}>
            A tua comunidade.<br />A tua rede.<br />O teu legado.
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.60)", lineHeight: 1.65, maxWidth: 360 }}>
            Uma rede privada e de confiança para os Antigos Alunos Salesianos de Estoril.
          </p>
        </div>

        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
          {trustItems.map(({ icon: Icon, text }) => (
            <div key={text} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.16)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon style={{ width: 14, height: 14, color: "rgba(255,255,255,0.75)" }} />
              </div>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.58)" }}>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — auth */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 20px" }}>
        <div style={{ width: "100%", maxWidth: 380 }}>
          {/* Mobile logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }} id="mobile-logo">
            <style>{`@media(min-width:960px){#mobile-logo{display:none}}`}</style>
            <div style={{ width: 36, height: 36, borderRadius: 11, overflow: "hidden" }}>
              <img src="/aaase-logo.png" alt="AAASE" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--n800)" }}>AAASE Alumni Network</div>
          </div>

          {step === "magic" ? (
            <div style={{ textAlign: "center", padding: "40px 0" }} className="animate-scale-in">
              <div style={{ width: 56, height: 56, borderRadius: 18, background: "var(--blue-muted)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", border: "1px solid rgba(46,109,180,0.15)" }}>
                <Mail style={{ width: 24, height: 24, color: "var(--blue)" }} />
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--n800)", letterSpacing: "-0.025em", marginBottom: 10 }}>Verifica o teu email</h2>
              <p style={{ fontSize: 14, color: "var(--n400)", lineHeight: 1.6, marginBottom: 24 }}>
                Enviámos um link de acesso para <strong style={{ color: "var(--n700)" }}>{email}</strong>. Clica no link para entrar.
              </p>
              <button onClick={() => setStep("email")} style={{ fontSize: 13, color: "var(--blue)", background: "none", border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                ← Tentar com outro email
              </button>
            </div>
          ) : (
            <div className="animate-fade-up">
              <h2 style={{ fontSize: 24, fontWeight: 750, color: "var(--n800)", letterSpacing: "-0.03em", marginBottom: 6 }}>Bem-vindo de volta</h2>
              <p style={{ fontSize: 14, color: "var(--n400)", marginBottom: 32 }}>A tua comunidade está à tua espera.</p>

              {/* Google */}
              <button
                onClick={handleDemo}
                disabled={loading}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "12px 20px", background: "white", border: "1px solid var(--n200)", borderRadius: 14, fontSize: 14, fontWeight: 500, color: "var(--n800)", cursor: "pointer", boxShadow: "var(--shadow-xs)", marginBottom: 16, transition: "all 0.15s", fontFamily: "inherit" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-sm)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--n300)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-xs)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--n200)"; }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.615 24 12.255 24z"/><path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z"/><path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.64 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>
                {loading ? "A entrar..." : "Continuar com Google"}
              </button>

              {/* Divider */}
              <div className="divider-text" style={{ marginBottom: 16, fontSize: 12, color: "var(--n400)" }}>ou</div>

              {/* Magic link */}
              <form onSubmit={handleMagicLink} style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 12.5, fontWeight: 500, color: "var(--n600)", marginBottom: 7 }}>
                  Email institucional ou pessoal
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="o-teu-email@exemplo.com"
                  className="input-field"
                  style={{ marginBottom: 10 }}
                />
                <button type="submit" className="btn-primary" style={{ width: "100%", padding: "12px", fontSize: 14, borderRadius: 14 }} disabled={loading || !email}>
                  {loading ? (
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
                      A enviar...
                    </span>
                  ) : (
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      Enviar link mágico <ArrowRight style={{ width: 15, height: 15 }} />
                    </span>
                  )}
                </button>
              </form>

              {/* Demo */}
              <div style={{ borderTop: "1px solid var(--n150)", paddingTop: 20, marginBottom: 20 }}>
                <button
                  onClick={handleDemo}
                  style={{ width: "100%", padding: "12px", background: "var(--blue-dark)", border: "none", borderRadius: 14, fontSize: 13.5, fontWeight: 600, color: "white", cursor: "pointer", boxShadow: "0 4px 16px rgba(26,74,128,0.35)", transition: "all 0.15s", fontFamily: "inherit" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--blue)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--blue-dark)"; }}
                >
                  ✦ Entrar como Miguel Ferreira (Demo)
                </button>
                <p style={{ fontSize: 11.5, color: "var(--n300)", textAlign: "center", marginTop: 10 }}>
                  Acesso imediato à plataforma demo
                </p>
              </div>
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <Shield style={{ width: 12, height: 12, color: "var(--n300)" }} />
            <span style={{ fontSize: 11.5, color: "var(--n300)" }}>Rede privada e verificada · AAASE © 2026</span>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
