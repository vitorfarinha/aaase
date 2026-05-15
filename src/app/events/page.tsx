"use client";

import { useState } from "react";
import { Calendar, MapPin, Clock, Users, Sparkles, CheckCircle } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { events } from "@/data/demo";
import { cn, getEventTypeEmoji } from "@/lib/utils";

function EventCard({ event }: { event: typeof events[0] }) {
  const [registered, setRegistered] = useState(false);
  const spotsLeft = event.capacity - event.attendeeCount;
  const isFull = spotsLeft <= 0;

  return (
    <div className="bg-white rounded-2xl border border-[#EDE8E3] shadow-soft hover:shadow-card transition-all overflow-hidden card-hover">
      {/* Date header */}
      <div className="gradient-navy px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{getEventTypeEmoji(event.type)}</div>
          <div>
            <div className="text-[12px] text-white/60">{event.date}</div>
            <div className="text-[13px] font-semibold text-white">{event.time}</div>
          </div>
        </div>
        <div className="text-right">
          <div className={cn(
            "text-[11px] font-medium px-2.5 py-1 rounded-full",
            isFull ? "bg-red-500/20 text-red-200" :
            spotsLeft <= 5 ? "bg-amber-500/20 text-amber-200" :
            "bg-white/10 text-white/70"
          )}>
            {isFull ? "Esgotado" : `${spotsLeft} lugares`}
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start gap-2 mb-2">
          {event.isVirtual && (
            <span className="text-[10.5px] bg-sky-50 text-sky-700 px-2 py-0.5 rounded-full font-medium">Online</span>
          )}
          <span className={cn(
            "text-[10.5px] px-2 py-0.5 rounded-full font-medium",
            event.type === "dinner" ? "bg-rose-50 text-rose-700" :
            event.type === "talk" ? "bg-purple-50 text-purple-700" :
            event.type === "reunion" ? "bg-blue-50 text-blue-700" :
            "bg-amber-50 text-amber-700"
          )}>
            {event.type === "dinner" ? "Jantar" : event.type === "talk" ? "Talk" : event.type === "reunion" ? "Summit" : event.type === "workshop" ? "Workshop" : "Networking"}
          </span>
        </div>

        <h3 className="text-[15px] font-semibold text-[#1A1F2E] mb-1 leading-snug">{event.title}</h3>

        <div className="flex items-center gap-2 text-[12px] text-[#8896A5] mb-3">
          <MapPin className="w-3 h-3" />
          <span>{event.location}</span>
        </div>

        <p className="text-[13px] text-[#4A5568] leading-relaxed mb-3 line-clamp-2">
          {event.description}
        </p>

        {/* AI suggestion */}
        <div className="bg-amber-50/60 rounded-xl p-3 mb-3">
          <div className="flex items-start gap-1.5">
            <Sparkles className="w-3 h-3 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-[11.5px] text-amber-800">
              <strong className="font-semibold">IA sugere: </strong>
              {event.type === "dinner" ? "Óptimo para conectar com Sofia e Rui Costa — ambos confirmados." :
               event.type === "talk" ? "Maria Almeida está a apresentar — aproveita para te apresentar." :
               "3 membros da tua rede estão inscritos."}
            </p>
          </div>
        </div>

        {/* Attendees & price */}
        <div className="flex items-center justify-between mb-4 text-[12px] text-[#8896A5]">
          <div className="flex items-center gap-1.5">
            <Users className="w-3 h-3" />
            <span>{event.attendeeCount}/{event.capacity} inscritos</span>
          </div>
          {event.price && (
            <span className="font-medium text-[#4A5568]">{event.price}</span>
          )}
        </div>

        {/* Action */}
        <button
          onClick={() => !isFull && setRegistered(!registered)}
          disabled={isFull}
          className={cn(
            "w-full text-[12.5px] font-medium rounded-xl py-2.5 transition-all",
            isFull ? "bg-[#FAF8F5] text-[#B8C4CC] border border-[#EDE8E3] cursor-not-allowed" :
            registered ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
            "bg-[#1E2D4E] hover:bg-[#2A3F6E] text-white"
          )}
        >
          {isFull ? "Esgotado" : registered ? "Inscrito ✓" : "Inscrever-me"}
        </button>
      </div>
    </div>
  );
}

export default function EventsPage() {
  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#1A1F2E] mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            Eventos
          </h1>
          <p className="text-[14px] text-[#8896A5]">
            {events.length} eventos próximos · Organizados pela comunidade AAASE
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="mt-6 bg-[#FAF8F5] border border-[#EDE8E3] border-dashed rounded-2xl p-6 text-center">
          <h3 className="text-[15px] font-semibold text-[#1A1F2E] mb-1">Organizar um evento</h3>
          <p className="text-[13px] text-[#8896A5] mb-4">
            Propõe um evento para a comunidade AAASE.
          </p>
          <button className="px-5 py-2.5 bg-[#1E2D4E] hover:bg-[#2A3F6E] text-white text-[13px] font-medium rounded-xl transition-colors">
            Propor evento
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
