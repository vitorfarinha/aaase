"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Shield, MapPin, Star } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { alumniList, businesses, opportunities, events, rewards } from "@/data/demo";
import { cn } from "@/lib/utils";

type MessageRole = "user" | "assistant";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

const suggestedPrompts = [
  "Quem trabalha em AI em Lisboa?",
  "Encontrar alumni fundadores",
  "Quem pode ajudar com fundraising?",
  "Advogados alumni de confiança",
  "Empresas alumni recomendadas",
  "Próximos eventos na rede",
  "Oportunidades para mentores",
  "Quem posso contactar sobre ClimaTech?",
];

function generateResponse(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("ai") || t.includes("inteligência artificial"))
    return `Encontrei **${alumniList.filter(a => a.industry.toLowerCase().includes("ai") || a.interests.some(i => i.toLowerCase().includes("ai"))).length} alumni** na área de AI e tecnologia:\n\n**Maria Almeida** — Head of AI Research na Unbabel. PhD em NLP, speaker na NeurIPS. Mentora activa. Trust Score: 91\n\n**Tomás Figueiredo** — VP Engineering na Feedzai. Ex-Amazon e Google. Especialista em AI/ML. Trust Score: 90\n\nAmbos estão em Lisboa. Queres que peça uma introdução?`;
  if (t.includes("fund") || t.includes("investor"))
    return `Para fundraising, o **Rui Costa** (Trust Score: 98) é a pessoa ideal da rede — General Partner na Armilar Venture Partners, investidor em deep tech e clima.\n\nTambém oferece **fast-track pitch review** para alumni. Tens 3 conexões em comum, incluindo Sofia Carvalho.\n\n→ Queres que prepare uma introdução personalizada?`;
  if (t.includes("advogad") || t.includes("legal") || t.includes("law"))
    return `**João Lopes** é o advogado de referência da rede alumni. Partner na Lopes & Associados, especialista em startups e tech law.\n\nTrust Score: **96** — o mais alto na área jurídica.\n\n✦ Benefício alumni: **Consulta gratuita de 1 hora** (valor €350)\n\nTens 2 conexões em comum. Devo pedir uma introdução?`;
  if (t.includes("lisbo") || t.includes("próxim") || t.includes("event"))
    return `Aqui estão os próximos eventos em Lisboa:\n\n🍽️ **Jantar de Networking — Estoril**\nCasino do Estoril · 14 Jun · 20h00 · 22/30 inscritos\n\n🎤 **AI & O Futuro do Trabalho**\nImpact Hub Lisboa · 21 Jun · 18h30\n\n🚀 **Founders Roundtable — Fundraising**\nArmilar Offices · 5 Jul · 09h30 (privado)\n\nQueres que faça a inscrição em algum?`;
  return `Entendi a tua questão! Posso ajudar-te a encontrar pessoas, oportunidades, empresas alumni ou eventos.\n\nA nossa rede tem **847 alumni activos** em mais de 30 países. Tenta perguntar sobre:\n• 👤 Pessoas por área ou cidade\n• 💼 Oportunidades de emprego ou mentoria\n• 🏢 Empresas alumni de confiança\n• 📅 Eventos próximos\n\nO que precisas?`;
}

export default function ConciergePage() {
  const [messages, setMessages] = useState<Message[]>([{
    id: "0", role: "assistant",
    content: `Olá, Miguel! 👋\n\nSou o teu **AI Concierge** da AAASE. Estou aqui para te ajudar a tirar o máximo partido da tua rede alumni.\n\nPosso ajudar-te a:\n• **Encontrar pessoas** com interesses específicos\n• **Descobrir oportunidades** que correspondem ao teu perfil\n• **Pedir introduções** através dos teus contactos\n• **Explorar empresas alumni** de confiança\n\nO que precisas hoje?`,
    timestamp: new Date(),
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMessage: Message = { id: Date.now().toString(), role: "user", content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    let responseText = "";
    try {
      const history = messages.filter(m => m.role === "user" || m.role === "assistant").map(m => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/concierge", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: [...history, { role: "user", content: text }] }) });
      if (res.ok) { const data = await res.json(); responseText = data.text || generateResponse(text); }
      else { responseText = generateResponse(text); }
    } catch { responseText = generateResponse(text); }

    setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: responseText, timestamp: new Date() }]);
    setLoading(false);
  };

  const formatContent = (content: string) => content.split("\n").map((line, i) => {
    const formatted = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/^• /, '').replace(/^→ /, '→ ');
    return <span key={i}><span dangerouslySetInnerHTML={{ __html: formatted }} />{i < content.split("\n").length - 1 && <br />}</span>;
  });

  return (
    <AppLayout>
      <div style={{ maxWidth: 760, margin: "0 auto", height: "calc(100dvh - var(--topbar-h) - var(--mobile-nav-h, 0px) - 56px)", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div className="card-glass animate-fade-up" style={{ padding: "16px 22px", marginBottom: 16, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 42, height: 42, borderRadius: 13, background: "linear-gradient(135deg, var(--blue-dark), var(--blue))", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(46,109,180,0.35)" }}>
            <Sparkles style={{ width: 19, height: 19, color: "var(--gold)" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 650, color: "var(--n800)", letterSpacing: "-0.015em" }}>AI Concierge</div>
            <div style={{ fontSize: 12.5, color: "var(--n400)" }}>Conectado a 847 alumni · Resposta em tempo real</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12.5, fontWeight: 500, color: "#166534", background: "#EDFAF3", border: "1px solid rgba(34,197,94,0.18)", borderRadius: 10, padding: "5px 12px" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E" }} /> Online
          </div>
        </div>

        {/* Messages */}
        <div className="card-glass animate-fade-up delay-100" style={{ flex: 1, overflowY: "auto", padding: "20px 22px", marginBottom: 14 }}>
          {messages.map((msg, i) => (
            <div key={msg.id} style={{ display: "flex", gap: 12, marginBottom: 20, flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: msg.role === "user" ? "var(--blue)" : "linear-gradient(135deg, var(--blue-dark), var(--blue))", boxShadow: "var(--shadow-sm)" }}>
                {msg.role === "user" ? <span style={{ color: "white", fontSize: 11, fontWeight: 700 }}>MF</span> : <Sparkles style={{ width: 14, height: 14, color: "var(--gold)" }} />}
              </div>
              <div style={{ maxWidth: "78%", background: msg.role === "user" ? "var(--blue)" : "white", border: msg.role === "user" ? "none" : "1px solid var(--n150)", borderRadius: msg.role === "user" ? "16px 4px 16px 16px" : "4px 16px 16px 16px", padding: "12px 16px", boxShadow: "var(--shadow-sm)" }}>
                <div style={{ fontSize: 13.5, color: msg.role === "user" ? "white" : "var(--n700)", lineHeight: 1.65 }}>
                  {formatContent(msg.content)}
                </div>
                <div style={{ fontSize: 10.5, color: msg.role === "user" ? "rgba(255,255,255,0.55)" : "var(--n300)", marginTop: 6 }}>
                  {msg.timestamp.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, var(--blue-dark), var(--blue))", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Sparkles style={{ width: 14, height: 14, color: "var(--gold)" }} />
              </div>
              <div style={{ background: "white", border: "1px solid var(--n150)", borderRadius: "4px 16px 16px 16px", padding: "14px 18px", boxShadow: "var(--shadow-sm)" }}>
                <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                  {[0, 1, 2].map(j => <div key={j} style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--blue)", opacity: 0.4, animation: `pulse ${0.6 + j * 0.15}s ease-in-out infinite alternate` }} />)}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggested prompts */}
        {messages.length === 1 && (
          <div className="animate-fade-up delay-150" style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            {suggestedPrompts.slice(0, 4).map(p => (
              <button key={p} onClick={() => sendMessage(p)} style={{ padding: "7px 14px", borderRadius: 999, fontSize: 12.5, fontWeight: 500, cursor: "pointer", background: "white", border: "1px solid var(--n200)", color: "var(--n600)", fontFamily: "inherit", transition: "all 0.15s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--blue-muted)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--blue)"; (e.currentTarget as HTMLElement).style.color = "var(--blue-dark)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "white"; (e.currentTarget as HTMLElement).style.borderColor = "var(--n200)"; (e.currentTarget as HTMLElement).style.color = "var(--n600)"; }}>
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="card-glass animate-fade-up delay-200" style={{ padding: "12px 14px", display: "flex", gap: 10, alignItems: "flex-end" }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
            placeholder="Pergunta qualquer coisa sobre a rede alumni..."
            rows={1}
            style={{ flex: 1, background: "var(--n50)", border: "1px solid var(--n200)", borderRadius: 14, padding: "10px 14px", fontSize: 16, color: "var(--n800)", resize: "none", outline: "none", fontFamily: "inherit", lineHeight: 1.5, transition: "border-color 0.15s" }}
            onFocus={e => { e.target.style.borderColor = "var(--blue)"; }}
            onBlur={e => { e.target.style.borderColor = "var(--n200)"; }}
          />
          <button onClick={() => sendMessage(input)} disabled={!input.trim() || loading} className="btn-primary" style={{ padding: "10px 14px", borderRadius: 13, flexShrink: 0 }}>
            <Send style={{ width: 15, height: 15 }} />
          </button>
        </div>
        <style>{`@keyframes pulse{to{opacity:1}}`}</style>
      </div>
    </AppLayout>
  );
}
