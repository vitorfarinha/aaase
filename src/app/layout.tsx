import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AAASE — Antigos Alunos Salesianos de Estoril",
  description: "A rede de confiança da comunidade Salesiana de Estoril",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>{children}</body>
    </html>
  );
}
