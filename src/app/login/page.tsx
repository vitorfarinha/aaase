"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, ArrowRight, Shield, Users, Award, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"email" | "magic" | "google">("email");
  const [loading, setLoading] = useState(false);

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setStep("magic");
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#FEFCFA] flex">
      {/* Left - Decorative */}
      <div className="hidden lg:flex w-[45%] gradient-navy relative overflow-hidden flex-col justify-between p-12">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-8 w-64 h-64 rounded-full border border-white/10"></div>
          <div className="absolute top-32 left-20 w-40 h-40 rounded-full border border-white/08"></div>
          <div className="absolute bottom-20 right-8 w-80 h-80 rounded-full border border-white/06"></div>
          <div className="absolute bottom-40 right-20 w-48 h-48 rounded-full border border-white/10"></div>
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm" style={{ fontFamily: "'Playfair Display', serif" }}>AA</span>
            </div>
            <div>
              <div className="text-white font-bold text-sm tracking-wide">AAASE</div>
              <div className="text-white/50 text-xs">Alumni Network</div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-white leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            A tua comunidade.<br />A tua rede.<br />O teu legado.
          </h1>
          <p className="text-white/65 text-[15px] leading-relaxed max-w-sm">
            Uma rede privada e de confiança para os Antigos Alunos Salesianos de Estoril. Ligações genuínas, oportunidades reais, comunidade para toda a vida.
          </p>
        </div>

        {/* Trust indicators */}
        <div className="relative z-10 space-y-3">
          {[
            { icon: Shield, text: "Identidade verificada para todos os membros" },
            { icon: Users, text: "847 alumni activos em todo o mundo" },
            { icon: Award, text: "Benefícios e perks exclusivos para membros" },
            { icon: Sparkles, text: "AI Concierge para ligações inteligentes" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.text} className="flex items-center gap-3">
                <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-3.5 h-3.5 text-white/70" />
                </div>
                <span className="text-white/60 text-[13px]">{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right - Auth form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-[380px]">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="w-9 h-9 gradient-navy rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xs" style={{ fontFamily: "'Playfair Display', serif" }}>AA</span>
            </div>
            <div className="text-[15px] font-bold text-[#1E2D4E] tracking-wide">AAASE Alumni Network</div>
          </div>

          {step === "magic" ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-[#1A1F2E] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Verifica o teu email
              </h2>
              <p className="text-[#8896A5] text-[13.5px] leading-relaxed mb-6">
                Enviámos um link de acesso para <strong className="text-[#1A1F2E]">{email}</strong>.
                Clica no link para entrar na tua conta.
              </p>
              <button
                onClick={() => setStep("email")}
                className="text-[13px] text-[#3A7BC8] hover:text-[#1E2D4E] transition-colors"
              >
                ← Tentar com outro email
              </button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#1A1F2E] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Bem-vindo de volta
                </h2>
                <p className="text-[#8896A5] text-[14px]">
                  A tua comunidade está à tua espera.
                </p>
              </div>

              {/* Google Login */}
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-[#D9D2C9] hover:border-[#B8AFA5] rounded-xl text-[13.5px] font-medium text-[#1A1F2E] shadow-soft hover:shadow-card transition-all mb-4 group"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/>
                  <path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96h-3.98v3.09C3.515 21.3 7.615 24 12.255 24z"/>
                  <path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62h-3.98a11.86 11.86 0 000 10.76l3.98-3.09z"/>
                  <path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.64 0-8.74 2.7-10.71 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/>
                </svg>
                {loading ? "A entrar..." : "Continuar com Google"}
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-[#EDE8E3]"></div>
                <span className="text-[12px] text-[#B8C4CC]">ou</span>
                <div className="flex-1 h-px bg-[#EDE8E3]"></div>
              </div>

              {/* Magic Link */}
              <form onSubmit={handleMagicLink} className="space-y-3">
                <div>
                  <label className="text-[12.5px] font-medium text-[#4A5568] block mb-1.5">
                    Email institucional ou pessoal
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="o-teu-email@exemplo.com"
                    className="w-full px-4 py-3 bg-white border border-[#D9D2C9] rounded-xl text-[13.5px] text-[#1A1F2E] placeholder-[#B8C4CC] focus:outline-none focus:ring-2 focus:ring-[#3A7BC8]/20 focus:border-[#3A7BC8] transition-all"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#1E2D4E] hover:bg-[#2A3F6E] disabled:opacity-50 text-white rounded-xl text-[13.5px] font-medium transition-all shadow-card hover:shadow-elevated"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Enviar link mágico
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 pt-5 border-t border-[#EDE8E3] text-center">
                <p className="text-[12.5px] text-[#8896A5]">
                  Ainda não és membro?{" "}
                  <Link href="/signup" className="text-[#3A7BC8] font-medium hover:text-[#1E2D4E] transition-colors">
                    Pede acesso
                  </Link>
                </p>
              </div>
            </>
          )}

          <div className="mt-8 flex items-center justify-center gap-1">
            <Shield className="w-3 h-3 text-[#B8C4CC]" />
            <span className="text-[11px] text-[#B8C4CC]">Rede privada e verificada · AAASE © 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
