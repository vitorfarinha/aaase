"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, User, ArrowRight, Shield, MapPin, Star } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { alumniList, businesses, opportunities, events, rewards } from "@/data/demo";
import { cn } from "@/lib/utils";

type MessageRole = "user" | "assistant";

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  cards?: React.ReactNode;
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

function AlumniMiniCard({ person }: { person: typeof alumniList[0] }) {
  return (
    <div className="bg-white rounded-xl border border-[#EDE8E3] p-3.5 flex items-start gap-3 hover:border-[#3A7BC8]/30 transition-colors cursor-pointer">
      <img src={person.avatar} alt={person.name} className="w-9 h-9 rounded-full bg-[#EDE8E3] flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-[13px] font-semibold text-[#1A1F2E] truncate">{person.name}</span>
          {person.isVerified && <Shield className="w-3 h-3 text-blue-500 flex-shrink-0" />}
        </div>
        <div className="text-[11.5px] text-[#8896A5] truncate">{person.role} · {person.company}</div>
        <div className="flex items-center gap-1 mt-1">
          <MapPin className="w-2.5 h-2.5 text-[#B8C4CC]" />
          <span className="text-[11px] text-[#B8C4CC]">{person.city}</span>
          {person.trustScore >= 90 && (
            <span className="ml-1 text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded-full">✦ {person.trustScore}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function BusinessMiniCard({ biz }: { biz: typeof businesses[0] }) {
  return (
    <div className="bg-white rounded-xl border border-[#EDE8E3] p-3.5 flex items-start gap-3 hover:border-[#3A7BC8]/30 transition-colors cursor-pointer">
      <div className="w-9 h-9 bg-[#FAF8F5] rounded-xl flex items-center justify-center text-lg flex-shrink-0">
        {biz.logo}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="text-[13px] font-semibold text-[#1A1F2E] truncate">{biz.name}</span>
          {biz.trustBadge && <Shield className="w-3 h-3 text-blue-500 flex-shrink-0" />}
        </div>
        <div className="text-[11.5px] text-[#8896A5]">{biz.category} · {biz.city}</div>
        <div className="flex items-center gap-1 mt-1">
          <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
          <span className="text-[11px] text-[#8896A5]">{biz.rating} · {biz.reviewCount} reviews</span>
        </div>
      </div>
    </div>
  );
}

function generateResponse(query: string): { content: string; cards?: React.ReactNode } {
  const q = query.toLowerCase();

  if (q.includes("ai") || q.includes("inteligência artificial") || q.includes("machine learning")) {
    const aiPeople = alumniList.filter(a =>
      a.industry.includes("AI") || a.industry.includes("Tech") || a.interests.includes("Machine Learning")
    );
    return {
      content: `Encontrei **${aiPeople.length} alumni** que trabalham em AI e tecnologia na nossa rede. Aqui estão os mais relevantes para ti:\n\n**Maria Almeida** é Head of AI Research na Unbabel — investigadora de NLP com publicações em NeurIPS. **Tomás Figueiredo** é VP Engineering na Feedzai, onde lidera a plataforma de fraud prevention com ML. Ambos estão em Lisboa e são mentores ativos.\n\nQueres que eu prepare uma introdução?`,
      cards: (
        <div className="grid grid-cols-1 gap-2 mt-3">
          {aiPeople.map(p => <AlumniMiniCard key={p.id} person={p} />)}
        </div>
      ),
    };
  }

  if (q.includes("fundador") || q.includes("founder") || q.includes("startup")) {
    const founders = alumniList.filter(a => a.isFounder);
    return {
      content: `Temos **${founders.length} alumni fundadores** activos na nossa rede! São uma comunidade muito unida — a maioria conhece-se e colabora regularmente.\n\n**Sofia Carvalho** fundou a GreenLeap (ClimaTech, Series A). **Rui Costa** é investidor mas foi fundador 3x antes. **Catarina Mendes** criou o Studio Mendes em Porto.\n\nTodos fazem parte do grupo privado "Fundadores". Queres uma introdução a algum deles?`,
      cards: (
        <div className="grid grid-cols-1 gap-2 mt-3">
          {founders.map(p => <AlumniMiniCard key={p.id} person={p} />)}
        </div>
      ),
    };
  }

  if (q.includes("fundraising") || q.includes("investimento") || q.includes("investidor") || q.includes("vc")) {
    const investors = alumniList.filter(a => a.groups.includes("investors"));
    return {
      content: `Para fundraising, o alumni mais relevante é **Rui Costa**, General Partner na Armilar Venture Partners. Ele é early-stage, foca em deep tech e sustentabilidade, e oferece fast-track pitch review para alumni AAASE.\n\nTens **3 conexões em comum** com o Rui: Sofia Carvalho, João Lopes e o próprio Pedro Santos. Uma introdução através da Sofia seria muito quente.\n\nQueres que eu gere a mensagem de introdução?`,
      cards: (
        <div className="grid grid-cols-1 gap-2 mt-3">
          {investors.slice(0, 2).map(p => <AlumniMiniCard key={p.id} person={p} />)}
        </div>
      ),
    };
  }

  if (q.includes("advogado") || q.includes("legal") || q.includes("jurídic")) {
    const legal = businesses.filter(b => b.category === "Legal");
    return {
      content: `Na nossa rede, o alumni mais recomendado para questões legais é **João Lopes**, Partner na Lopes & Associados. Especializado em startup law, M&A e transações de VC.\n\n**47 endorsements** de outros alumni · Rating de **4.9/5** · Oferece **consulta inicial gratuita** para membros AAASE.\n\nÉ também um dos alumni mais conectados — tens 2 conexões em comum.`,
      cards: (
        <div className="grid grid-cols-1 gap-2 mt-3">
          {legal.map(b => <BusinessMiniCard key={b.id} biz={b} />)}
        </div>
      ),
    };
  }

  if (q.includes("empresa") || q.includes("negócio") || q.includes("comércio") || q.includes("serviço")) {
    return {
      content: `Temos **${businesses.length} empresas** fundadas ou co-fundadas por alumni AAASE. Todas verificadas e com reviews da comunidade.\n\nAs mais recomendadas este mês:\n• **Lopes & Associados** — Legal (4.9 ★)\n• **GreenLeap** — ClimaTech SaaS (4.8 ★)\n• **Estoril Health Clinic** — Saúde (4.9 ★)\n\nTodos oferecem benefícios exclusivos para membros AAASE.`,
      cards: (
        <div className="grid grid-cols-1 gap-2 mt-3">
          {businesses.slice(0, 3).map(b => <BusinessMiniCard key={b.id} biz={b} />)}
        </div>
      ),
    };
  }

  if (q.includes("evento") || q.includes("jantar") || q.includes("networking")) {
    return {
      content: `Tens **${events.length} eventos** próximos na rede AAASE!\n\nO mais próximo é o **Jantar de Networking no Casino do Estoril** (14 Jun) — restam **8 lugares**. É um formato íntimo de 30 pessoas, muito recomendado para conexões genuínas.\n\nHá também um **Talk sobre AI** (21 Jun) com a Maria Almeida e Tomás Figueiredo — ambos na tua rede.`,
      cards: null,
    };
  }

  if (q.includes("mentor") || q.includes("mentoria") || q.includes("orientação")) {
    const mentors = alumniList.filter(a => a.isMentor);
    return {
      content: `Temos **${mentors.length} alumni mentores** ativos na rede, disponíveis para sessões 1:1.\n\nBaseado no teu perfil de Product Director, sugiro:\n• **Sofia Carvalho** — fundraising, produto em B2B SaaS\n• **Maria Almeida** — AI estratégia\n• **Pedro Santos** — equilíbrio carreira/vida\n\nQueres agendar uma sessão?`,
      cards: (
        <div className="grid grid-cols-1 gap-2 mt-3">
          {mentors.slice(0, 3).map(p => <AlumniMiniCard key={p.id} person={p} />)}
        </div>
      ),
    };
  }

  if (q.includes("clima") || q.includes("sustentabilidade") || q.includes("cleantech") || q.includes("green")) {
    const climaAlumni = alumniList.filter(a =>
      a.industry.includes("Clima") || a.interests.includes("ClimaTech") || a.interests.includes("Sustainability") || a.interests.includes("Sustentabilidade")
    );
    return {
      content: `Excelente área! Temos um grupo dedicado de alumni em **ClimaTech e Sustentabilidade** com 156 membros.\n\n**Sofia Carvalho** é a referência — fundadora da GreenLeap, carbon accounting para PMEs. **Ana Rodrigues** está na Dott (mobilidade sustentável em Londres). **Rui Costa** investe ativamente em ClimaTech.\n\nTambém podes entrar no grupo "Sustentabilidade" para aceder às discussões.`,
      cards: (
        <div className="grid grid-cols-1 gap-2 mt-3">
          {climaAlumni.slice(0, 3).map(p => <AlumniMiniCard key={p.id} person={p} />)}
        </div>
      ),
    };
  }

  // Default
  return {
    content: `Percebi a tua pergunta! Deixa-me ajudar a encontrar a melhor resposta na nossa rede de **847 alumni**.\n\nPodes perguntar sobre:\n• **Pessoas** — "Quem trabalha em X?"\n• **Empresas alumni** — "Encontra um advogado alumni"\n• **Oportunidades** — "Quem pode ajudar com Y?"\n• **Eventos** — "Próximos eventos em Lisboa"\n• **Benefícios** — "Que benefícios tenho disponíveis?"\n\nO que precisas?`,
    cards: null,
  };
}

export default function ConciergePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      role: "assistant",
      content: `Olá, Miguel! 👋\n\nSou o teu **AI Concierge** da AAASE — estou aqui para te ajudar a tirar o máximo partido da tua rede alumni.\n\nPosso ajudar-te a:\n• **Encontrar pessoas** na tua rede com interesses específicos\n• **Descobrir oportunidades** que correspondem ao teu perfil\n• **Pedir introduções** através dos teus contactos em comum\n• **Explorar empresas alumni** de confiança\n• **Ver eventos** e recomendações personalizadas\n\nO que precisas hoje?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    let responseText = "";
    try {
      const history = messages
        .filter(m => m.role === "user" || m.role === "assistant")
        .map(m => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/concierge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...history, { role: "user", content: text }] }),
      });

      if (res.ok) {
        const data = await res.json();
        responseText = data.text || generateResponse(text).content;
      } else {
        responseText = generateResponse(text).content;
      }
    } catch {
      responseText = generateResponse(text).content;
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: responseText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, assistantMessage]);
    setLoading(false);
  };

  const formatContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      const formatted = line
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/• /g, '<span class="text-[#3A7BC8]">•</span> ');
      return (
        <span key={i}>
          <span dangerouslySetInnerHTML={{ __html: formatted }} />
          {i < content.split("\n").length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto h-[calc(100vh-80px)] flex flex-col">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft p-4 mb-4 flex items-center gap-3">
          <div className="w-10 h-10 gradient-navy rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-amber-300" />
          </div>
          <div>
            <h1 className="text-[15px] font-semibold text-[#1A1F2E]">AI Concierge</h1>
            <p className="text-[12px] text-[#8896A5]">O teu assistente inteligente para a rede AAASE · Sempre disponível</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-[11.5px] text-emerald-600 font-medium">Online</span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                message.role === "assistant"
                  ? "gradient-navy"
                  : "bg-[#1E2D4E]"
              )}>
                {message.role === "assistant" ? (
                  <Sparkles className="w-4 h-4 text-amber-300" />
                ) : (
                  <span className="text-white text-xs font-semibold">MF</span>
                )}
              </div>

              <div className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3.5",
                message.role === "assistant"
                  ? "bg-white border border-[#EDE8E3] shadow-soft"
                  : "bg-[#1E2D4E] text-white"
              )}>
                <div className={cn(
                  "text-[13.5px] leading-relaxed",
                  message.role === "assistant" ? "text-[#1A1F2E]" : "text-white"
                )}>
                  {formatContent(message.content)}
                </div>
                {message.cards && (
                  <div className="mt-3">{message.cards}</div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full gradient-navy flex items-center justify-center flex-shrink-0 mt-1">
                <Sparkles className="w-4 h-4 text-amber-300" />
              </div>
              <div className="bg-white border border-[#EDE8E3] shadow-soft rounded-2xl px-4 py-3.5">
                <div className="flex gap-1 items-center">
                  <div className="w-2 h-2 bg-[#B8C4CC] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-[#B8C4CC] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-[#B8C4CC] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested prompts */}
        {messages.length <= 1 && (
          <div className="mb-4">
            <p className="text-[11.5px] text-[#B8C4CC] mb-2.5 uppercase tracking-wide font-medium">Exemplos de perguntas</p>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="text-[12.5px] bg-white border border-[#EDE8E3] hover:border-[#3A7BC8]/40 text-[#4A5568] hover:text-[#1A1F2E] px-3 py-1.5 rounded-xl transition-all shadow-soft"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="bg-white border border-[#D9D2C9] rounded-xl shadow-soft flex items-end gap-3 p-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder="Pergunta ao Concierge qualquer coisa sobre a rede..."
            rows={1}
            className="flex-1 resize-none text-[13.5px] text-[#1A1F2E] placeholder-[#B8C4CC] bg-transparent focus:outline-none leading-relaxed"
            style={{ maxHeight: "120px" }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className="p-2.5 bg-[#1E2D4E] hover:bg-[#2A3F6E] disabled:opacity-40 text-white rounded-xl transition-all flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
