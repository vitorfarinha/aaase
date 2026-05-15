import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-PT", { day: "numeric", month: "long", year: "numeric" });
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("pt-PT", { day: "numeric", month: "short" });
}

export function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Hoje";
  if (days === 1) return "Ontem";
  if (days < 7) return `há ${days} dias`;
  if (days < 30) return `há ${Math.floor(days / 7)} semanas`;
  return `há ${Math.floor(days / 30)} meses`;
}

export function getTrustColor(score: number): string {
  if (score >= 90) return "#22C55E";
  if (score >= 75) return "#F5A623";
  return "#A8A899";
}

export function getTrustLabel(score: number): string {
  if (score >= 90) return "Alta Confiança";
  if (score >= 75) return "Confiança Estabelecida";
  return "A Desenvolver";
}

export function getOpportunityTypeColor(type: string): string {
  const colors: Record<string, string> = {
    job: "#1E3A5F",
    mentoring: "#22C55E",
    investment: "#D4891A",
    consulting: "#2A4F7C",
    speaking: "#C0392B",
    startup: "#F5A623",
    volunteering: "#5A5A4E",
    freelance: "#152B47",
    internship: "#22C55E",
  };
  return colors[type] || "#5A5A4E";
}

export function getOpportunityTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    job: "Emprego",
    mentoring: "Mentoria",
    investment: "Investimento",
    consulting: "Consultoria",
    speaking: "Palestra",
    startup: "Startup",
    volunteering: "Voluntariado",
    freelance: "Freelance",
    internship: "Estágio",
  };
  return labels[type] || type;
}

export function getEventTypeEmoji(type: string): string {
  const emojis: Record<string, string> = {
    networking: "🤝",
    dinner: "🍽️",
    talk: "🎤",
    webinar: "💻",
    reunion: "🎊",
    workshop: "🛠️",
  };
  return emojis[type] || "📅";
}

export function truncate(text: string, length: number): string {
  return text.length > length ? text.slice(0, length) + "…" : text;
}
