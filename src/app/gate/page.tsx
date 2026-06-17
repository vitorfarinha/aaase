"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, Shield, Lock } from "lucide-react";

function GateForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/dashboard";

  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/gate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, next }),
      });

      if (res.ok) {
        const data = await res.json();
        router.replace(data.next || "/dashboard");
      } else {
        const data = await res.json();
        setError(data.error || "Password incorrecta");
        setPassword("");
        setShake(true);
        setTimeout(() => setShake(false), 600);
        inputRef.current?.focus();
      }
    } catch {
      setError("Erro de ligação. Tenta novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100dvh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      backgroundColor: "#F4F1EA",
      backgroundImage: [
        "radial-gradient(ellipse 75% 55% at 5% 0%, rgba(232,160,32,0.22) 0%, transparent 55%)",
        "radial-gradient(ellipse 55% 45% at 95% 5%, rgba(192,57,43,0.14) 0%, transparent 50%)",
        "radial-gradient(ellipse 60% 50% at 80% 95%, rgba(46,109,180,0.16) 0%, transparent 55%)",
      ].join(","),
      backgroundAttachment: "fixed",
      fontFamily: "'Geist', -apple-system, system-ui, sans-serif",
    }}>
      <div style={{ width: "100%", maxWidth: 400 }}>

        {/* Card */}
        <div style={{
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.70)",
          borderRadius: 28,
          padding: "40px 36px",
          boxShadow: "0 20px 60px rgba(20,15,5,0.12), 0 1px 0 rgba(255,255,255,0.85) inset",
          animation: shake ? "shake 0.5s ease" : undefined,
        }}>

          {/* Logo + lock */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <div style={{
                width: 64, height: 64, borderRadius: 18,
                overflow: "hidden", margin: "0 auto 4px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                border: "2px solid rgba(232,160,32,0.30)",
              }}>
                <img src="/aaase-logo.png" alt="AAASE"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{
                position: "absolute", bottom: 0, right: -4,
                width: 22, height: 22, borderRadius: "50%",
                background: "linear-gradient(135deg, #C8820A, #E8A020)",
                border: "2px solid white",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 6px rgba(200,130,10,0.40)",
              }}>
                <Lock style={{ width: 11, height: 11, color: "white" }} />
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <div style={{
                fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em",
                color: "#1E1A14", marginBottom: 4,
              }}>
                AAASE
              </div>
              <div style={{
                fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
                textTransform: "uppercase", color: "#948E82",
              }}>
                Alumni Network · Acesso Privado
              </div>
            </div>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: 24, textAlign: "center" }}>
            <p style={{ fontSize: 14, color: "#6E6860", lineHeight: 1.6 }}>
              Esta plataforma é de acesso restrito à comunidade AAASE. Introduz a password para continuar.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submit}>
            <div style={{ position: "relative", marginBottom: 12 }}>
              <input
                ref={inputRef}
                type={visible ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password de acesso"
                autoComplete="current-password"
                style={{
                  width: "100%",
                  padding: "13px 48px 13px 16px",
                  fontSize: 16,
                  fontFamily: "inherit",
                  background: "rgba(255,255,255,0.80)",
                  border: error
                    ? "1.5px solid rgba(192,57,43,0.60)"
                    : "1.5px solid rgba(200,200,190,0.70)",
                  borderRadius: 14,
                  color: "#1E1A14",
                  outline: "none",
                  transition: "border-color 0.15s, box-shadow 0.15s",
                  boxSizing: "border-box",
                }}
                onFocus={e => {
                  if (!error) e.target.style.borderColor = "#E8A020";
                  e.target.style.boxShadow = "0 0 0 3px rgba(232,160,32,0.14)";
                }}
                onBlur={e => {
                  e.target.style.borderColor = error ? "rgba(192,57,43,0.60)" : "rgba(200,200,190,0.70)";
                  e.target.style.boxShadow = "none";
                }}
              />
              <button
                type="button"
                onClick={() => setVisible(v => !v)}
                style={{
                  position: "absolute", right: 14, top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "#948E82", padding: 4,
                  display: "flex", alignItems: "center",
                }}
                tabIndex={-1}
              >
                {visible
                  ? <EyeOff style={{ width: 17, height: 17 }} />
                  : <Eye style={{ width: 17, height: 17 }} />
                }
              </button>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                fontSize: 13, color: "#C0392B",
                background: "rgba(192,57,43,0.08)",
                border: "1px solid rgba(192,57,43,0.18)",
                borderRadius: 10, padding: "9px 13px",
                marginBottom: 12, textAlign: "center",
                fontWeight: 500,
              }}>
                🔒 {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!password || loading}
              style={{
                width: "100%",
                padding: "13px",
                background: loading || !password
                  ? "rgba(200,130,10,0.45)"
                  : "linear-gradient(135deg, #C8820A, #E8A020)",
                border: "none",
                borderRadius: 14,
                fontSize: 14,
                fontWeight: 700,
                color: "#1A0A00",
                cursor: password && !loading ? "pointer" : "not-allowed",
                fontFamily: "inherit",
                letterSpacing: "-0.01em",
                transition: "all 0.15s",
                boxShadow: password && !loading
                  ? "0 4px 14px rgba(200,130,10,0.38)"
                  : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: 16, height: 16,
                    border: "2px solid rgba(26,10,0,0.30)",
                    borderTopColor: "#1A0A00",
                    borderRadius: "50%",
                    display: "inline-block",
                    animation: "spin 0.7s linear infinite",
                  }} />
                  A verificar...
                </>
              ) : (
                <>
                  <Shield style={{ width: 15, height: 15 }} />
                  Entrar na plataforma
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div style={{
            marginTop: 24, paddingTop: 20,
            borderTop: "1px solid rgba(200,190,180,0.40)",
            textAlign: "center",
            fontSize: 12, color: "#948E82",
          }}>
            Antigos Alunos Salesianos de Estoril<br />
            <span style={{ opacity: 0.6 }}>Plataforma reservada a membros</span>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700;800&display=swap');
        @keyframes spin  { to { transform: rotate(360deg); } }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-8px); }
          40%      { transform: translateX(8px); }
          60%      { transform: translateX(-5px); }
          80%      { transform: translateX(5px); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder { color: #948E82; }
      `}</style>
    </div>
  );
}

export default function GatePage() {
  return (
    <Suspense>
      <GateForm />
    </Suspense>
  );
}
