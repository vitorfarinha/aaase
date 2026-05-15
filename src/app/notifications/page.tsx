"use client";

import { useState } from "react";
import { Bell, Users, Briefcase, Calendar, Award, MessageSquare, Sparkles, CheckCheck } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { notifications } from "@/data/demo";
import { cn } from "@/lib/utils";

const typeIcon: Record<string, any> = {
  intro: Sparkles,
  connection: Users,
  opportunity: Briefcase,
  event: Calendar,
  reward: Award,
  message: MessageSquare,
};

const typeColor: Record<string, string> = {
  intro: "bg-amber-50 text-amber-600",
  connection: "bg-blue-50 text-blue-600",
  opportunity: "bg-emerald-50 text-emerald-600",
  event: "bg-purple-50 text-purple-600",
  reward: "bg-rose-50 text-rose-600",
  message: "bg-[#FAF8F5] text-[#4A5568]",
};

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(notifications);

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const unreadCount = notifs.filter(n => !n.isRead).length;

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold text-[#1A1F2E]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Notificações
            </h1>
            <p className="text-[13px] text-[#8896A5]">
              {unreadCount > 0 ? `${unreadCount} não lidas` : "Tudo a dia"}
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 text-[13px] text-[#3A7BC8] hover:text-[#1E2D4E] transition-colors font-medium"
            >
              <CheckCheck className="w-4 h-4" />
              Marcar todas como lidas
            </button>
          )}
        </div>

        <div className="space-y-2">
          {notifs.map(notif => {
            const Icon = typeIcon[notif.type] || Bell;
            const color = typeColor[notif.type] || "bg-[#FAF8F5] text-[#8896A5]";

            return (
              <div
                key={notif.id}
                onClick={() => setNotifs(prev => prev.map(n => n.id === notif.id ? { ...n, isRead: true } : n))}
                className={cn(
                  "bg-white rounded-xl border shadow-soft p-4 flex items-start gap-3 cursor-pointer transition-all hover:shadow-card",
                  notif.isRead ? "border-[#EDE8E3] opacity-80" : "border-[#D9D2C9]"
                )}
              >
                <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0", color)}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={cn("text-[13.5px] font-medium", notif.isRead ? "text-[#4A5568]" : "text-[#1A1F2E]")}>
                      {notif.title}
                    </p>
                    {!notif.isRead && (
                      <div className="w-2 h-2 bg-[#C0392B] rounded-full flex-shrink-0 mt-1" />
                    )}
                  </div>
                  <p className="text-[12.5px] text-[#8896A5] mt-0.5">{notif.body}</p>
                  <p className="text-[11px] text-[#B8C4CC] mt-1">{notif.timestamp}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
