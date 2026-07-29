import React, { useState, useEffect } from 'react';
import { UserProfile, StudyTrail, TrailItem } from '../types';
import { formatDayFull } from '../utils/trailGenerator';
import { Lock, Sparkles, AlertTriangle, CheckCircle2, PlayCircle, FileText, ExternalLink, Clock, Check, ChevronDown, ChevronUp } from 'lucide-react';

interface TrailPreviewProps {
  user: UserProfile;
  trail: StudyTrail;
  onSubscribe: () => void;
  onCheckIn: (itemId: string, status: 'CONCLUIDO' | 'PARCIAL' | 'ATRASADO') => void;
}

export const TrailPreview: React.FC<TrailPreviewProps> = ({
  user,
  trail,
  onSubscribe,
  onCheckIn
}) => {
  const week1Items = trail.items.filter(item => item.weekNumber === 1);
  const [activeItem, setActiveItem] = useState<TrailItem | null>(week1Items[0] || null);

  // Agrupar itens da semana por dia
  const groupedDays = week1Items.reduce((acc, item) => {
    const key = item.date;
    if (!acc[key]) {
      acc[key] = {
        date: item.date,
        dayOfWeek: item.dayOfWeek,
        items: []
      };
    }
    acc[key].items.push(item);
    return acc;
  }, {} as Record<string, { date: string; dayOfWeek: string; items: TrailItem[] }>);

  const sortedDays = (Object.values(groupedDays) as Array<{ date: string; dayOfWeek: string; items: TrailItem[] }>).sort((a, b) => a.date.localeCompare(b.date));

  // Accordion state
  const [expandedDays, setExpandedDays] = useState<string[]>([]);

  useEffect(() => {
    if (sortedDays.length > 0 && expandedDays.length === 0) {
      setExpandedDays([sortedDays[0].date]);
    }
  }, [sortedDays]);

  const toggleDayExpanded = (date: string) => {
    if (expandedDays.includes(date)) {
      setExpandedDays(expandedDays.filter(d => d !== date));
    } else {
      setExpandedDays([...expandedDays, date]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      
      {/* Banner Capacity Warning if exists */}
      {trail.capacityWarning && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 text-xs text-amber-900">
          <div className="mx-auto max-w-7xl flex items-center gap-2.5">
            <AlertTriangle className="h-4 w-4 text-amber-700 shrink-0" />
            <p className="font-medium">{trail.capacityWarning}</p>
          </div>
        </div>
      )}

      {/* Header Info */}
      <div className="border-b border-slate-200 bg-white px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-teal-50 border border-teal-200 px-3 py-1 text-xs font-extrabold text-teal-800">
                Prévia da Trilha Gerada
              </span>
              <span className="text-xs text-slate-500">
                • {trail.totalWeeks} Semanas até o ENEM ({user.examDate})
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Olá, {user.name}! Aqui está sua Semana 1 de estudos
            </h1>
          </div>

          <button
            onClick={onSubscribe}
            className="flex items-center gap-2 rounded-2xl bg-teal-700 hover:bg-teal-800 px-5 py-3 text-sm font-bold text-white shadow-xs transition-all shrink-0"
          >
            <Sparkles className="h-4 w-4" />
            <span>Desbloquear Trilha Completa por R$ 29,90/mês</span>
          </button>
        </div>
      </div>


      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 grid gap-8 lg:grid-cols-12">
        
        {/* Left Column: Week 1 Schedule Items (Unlocked) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-teal-700" />
              <span>Semana 1 (Liberada e Interativa)</span>
            </h2>
            <span className="text-xs text-teal-800 font-semibold bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
              {week1Items.length} tópicos
            </span>
          </div>

          <div className="space-y-3">
            {sortedDays.map((dayGroup) => {
              const isExpanded = expandedDays.includes(dayGroup.date);
              return (
                <div key={dayGroup.date} className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs animate-fade-in">
                  {/* Clickable Header Accordion */}
                  <div 
                    onClick={() => toggleDayExpanded(dayGroup.date)}
                    className="flex items-center justify-between p-4 sm:p-5 cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-colors border-b border-slate-100"
                  >
                    <div className="flex items-center gap-3">
                      {isExpanded ? (
                        <ChevronUp className="h-4.5 w-4.5 text-slate-500 shrink-0" />
                      ) : (
                        <ChevronDown className="h-4.5 w-4.5 text-slate-500 shrink-0" />
                      )}
                      <h3 className="font-extrabold text-slate-800 text-sm sm:text-base uppercase tracking-wider">
                        {formatDayFull(dayGroup.dayOfWeek)}
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded">
                      {dayGroup.items.length} {dayGroup.items.length === 1 ? 'matéria' : 'matérias'}
                    </span>
                  </div>

                  {/* Accordion Content */}
                  {isExpanded && (
                    <div className="p-4 sm:p-5 space-y-3 bg-white animate-fade-in">
                      {dayGroup.items.map((item) => {
                        const isSelected = activeItem?.id === item.id;
                        return (
                          <div
                            key={item.id}
                            onClick={() => setActiveItem(item)}
                            className={`cursor-pointer rounded-xl border p-4 transition-all ${
                              isSelected
                                ? 'border-teal-700 bg-teal-50/40 shadow-xs font-semibold'
                                : 'border-slate-100 bg-slate-50/40 hover:border-slate-200 text-slate-700'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="flex items-center gap-2 text-xs mb-1 flex-wrap">
                                  <span className="font-bold text-teal-700">{item.topic.area}</span>
                                  {item.isRevisionOnly && (
                                    <span className="rounded bg-teal-100 border border-teal-200 text-teal-900 text-[10px] px-1.5 py-0.2 font-bold">
                                      Revisão
                                    </span>
                                  )}
                                  {item.topic.weight === 'ALTA' && (
                                    <span className="rounded bg-rose-50 border border-rose-200 text-rose-800 text-[10px] px-1.5 py-0.2 font-bold">
                                      Alta Incidência
                                    </span>
                                  )}
                                </div>
                                <h4 className="font-bold text-slate-900 text-sm sm:text-base">{item.topic.topic}</h4>
                                <p className="text-xs text-slate-500 mt-0.5">{item.topic.subtopic}</p>
                              </div>

                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                                item.status === 'CONCLUIDO' 
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                                  : item.status === 'PARCIAL'
                                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                                  : 'bg-slate-100 text-slate-600 border-slate-200'
                              }`}>
                                {item.status}
                              </span>
                            </div>

                            {/* Resource Chips */}
                            <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                              {item.topic.resources.map(res => (
                                <span key={res.id} className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-0.5 text-[10px] text-slate-600 border border-slate-200 font-medium">
                                  {res.type === 'video' ? <PlayCircle className="h-3 w-3 text-rose-500" /> : <FileText className="h-3 w-3 text-teal-600" />}
                                  <span>{res.title}</span>
                                </span>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Selected Topic Detail & Check-in OR Blurred Remaining Weeks */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Unlocked Item Detail Card */}
          {activeItem && (
            <div className="rounded-3xl border border-teal-200 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <span className="text-xs font-bold text-teal-800 uppercase tracking-widest">
                  {formatDayFull(activeItem.dayOfWeek)} • Estudo do Dia
                </span>
                <span className="text-xs text-slate-500 font-medium">{activeItem.topic.estimatedMinutes} min sugeridos</span>
              </div>

              <h3 className="text-lg font-black text-slate-900">{activeItem.topic.topic}</h3>
              <p className="text-xs text-slate-600 mt-1">{activeItem.topic.subtopic}</p>

              {/* Resources Links */}
              <div className="mt-4 space-y-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Recursos de Estudo Vinculados:</p>
                {activeItem.topic.resources.map(res => (
                  <a
                    key={res.id}
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/50 p-3 hover:border-teal-700 hover:bg-teal-50/30 transition-all text-xs group"
                  >
                    <div className="flex items-center gap-2.5">
                      {res.type === 'video' ? <PlayCircle className="h-4 w-4 text-rose-600 shrink-0" /> : <FileText className="h-4 w-4 text-teal-700 shrink-0" />}
                      <div>
                        <p className="font-bold text-slate-900 group-hover:text-teal-800 transition-colors">{res.title}</p>
                        <p className="text-[10px] text-slate-500">{res.provider} • {res.durationMinutes} min</p>
                      </div>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-teal-700" />
                  </a>
                ))}
              </div>

              {/* Quick Check-in simulation */}
              <div className="mt-5 border-t border-slate-100 pt-4">
                <p className="text-xs font-bold text-slate-700 mb-2">Marcar progresso de hoje:</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onCheckIn(activeItem.id, 'CONCLUIDO')}
                    className="py-2.5 px-3 rounded-xl bg-teal-700 text-white font-bold text-xs hover:bg-teal-800 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Check className="h-4 w-4 stroke-[2.5]" /> Estudei Completo
                  </button>
                  <button
                    onClick={() => onCheckIn(activeItem.id, 'PARCIAL')}
                    className="py-2.5 px-3 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 font-bold text-xs hover:bg-amber-100 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Clock className="h-4 w-4" /> Estudei Parte
                  </button>
                </div>
              </div>
            </div>
          )}


          {/* BLURRED / LOCKED WEEKS 2 TO 24+ */}
          <div className="relative rounded-3xl border border-slate-200 bg-white p-6 overflow-hidden">
            
            {/* Blur Overlay & Subscription Trigger */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/90 backdrop-blur-md p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 border border-amber-200 text-amber-800 shadow-xs mb-3">
                <Lock className="h-6 w-6" />
              </div>

              <h3 className="text-xl font-black text-slate-900">Semanas 2 a {trail.totalWeeks} Bloqueadas</h3>
              <p className="text-xs text-slate-600 mt-2 max-w-sm leading-relaxed">
                Desbloqueie todo o cronograma até a prova ({trail.totalItems} tópicos da Matriz do ENEM) + o acompanhamento ativo que reorganiza sua semana se você atrasar.
              </p>

              <button
                onClick={onSubscribe}
                className="mt-5 flex items-center gap-2 rounded-2xl bg-teal-700 hover:bg-teal-800 px-6 py-3.5 text-sm font-bold text-white shadow-xs transition-all"
              >
                <Sparkles className="h-4 w-4" />
                <span>Assinar Pro por R$ 29,90/mês</span>
              </button>
              <p className="text-[10px] text-slate-500 mt-2">Cancele quando quiser diretamente na plataforma.</p>
            </div>

            {/* Fake Locked Content Preview behind blur */}
            <div className="opacity-20 space-y-3 pointer-events-none filter blur-sm">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-bold text-slate-500">Semana 2 • Segunda-feira</p>
                <p className="text-sm font-bold text-slate-800 mt-1">Geometria Plana: Áreas e Teorema de Pitágoras</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-bold text-slate-500">Semana 2 • Quarta-feira</p>
                <p className="text-sm font-bold text-slate-800 mt-1">Química: Estequiometria e Relações em Massa</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-bold text-slate-500">Semana 3 • Terça-feira</p>
                <p className="text-sm font-bold text-slate-800 mt-1">Física: Leis de Ohm e Consumo Elétrico</p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

