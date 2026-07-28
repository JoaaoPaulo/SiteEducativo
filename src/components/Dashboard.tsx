import React, { useState } from 'react';
import { UserProfile, StudyTrail, TrailItem, CheckInStatus } from '../types';
import { formatDayFull } from '../utils/trailGenerator';
import { Calendar as CalendarIcon, CheckCircle2, Clock, AlertCircle, RefreshCw, PlayCircle, FileText, ExternalLink, Sparkles, Flame, BookOpen, ChevronLeft, ChevronRight, XCircle } from 'lucide-react';

interface DashboardProps {
  user: UserProfile;
  trail: StudyTrail;
  onCheckIn: (itemId: string, status: CheckInStatus) => void;
  onTriggerAiReplan: (missedItem?: TrailItem) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  trail,
  onCheckIn,
  onTriggerAiReplan
}) => {
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [selectedDayFilter, setSelectedDayFilter] = useState<string>('todos');

  // Stats
  const completedCount = trail.items.filter(i => i.status === 'CONCLUIDO').length;
  const missedCount = trail.items.filter(i => i.status === 'ATRASADO').length;
  const totalCount = trail.items.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Days until exam calculation
  const examDateObj = new Date(user.examDate || '2026-11-08');
  const now = new Date();
  const diffTime = examDateObj.getTime() - now.getTime();
  const daysUntilExam = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  // Filter items for current week & day
  const currentWeekItems = trail.items.filter(item => item.weekNumber === selectedWeek);
  const filteredItems = selectedDayFilter === 'todos' 
    ? currentWeekItems 
    : currentWeekItems.filter(item => item.dayOfWeek === selectedDayFilter);

  // Check if there are overdue/missed items
  const hasMissedItems = trail.items.some(i => i.status === 'ATRASADO');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      
      {/* Top Banner Header */}
      <div className="border-b border-slate-200 bg-white px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-teal-50 border border-teal-200 px-2.5 py-0.5 text-xs font-bold text-teal-800">
                Acompanhamento Ativo
              </span>
              <span className="text-xs text-slate-500">
                • {user.hoursPerWeek}h/semana em {user.availableDays.length} dias
              </span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 mt-1">
              Bons estudos, {user.name}!
            </h1>
            <p className="text-xs text-slate-600">
              Cronograma adaptativo para o ENEM • Acompanhe seu progresso e marque o check-in diário.
            </p>
          </div>

          {/* Key Metrics Header Cards */}
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-center min-w-[90px]">
              <span className="text-[10px] font-bold uppercase text-slate-500">Faltam</span>
              <p className="text-lg font-black text-amber-700 flex items-center justify-center gap-1">
                <span>{daysUntilExam}</span>
                <span className="text-xs font-normal text-slate-500">dias</span>
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-center min-w-[110px]">
              <span className="text-[10px] font-bold uppercase text-slate-500">Edital Concluído</span>
              <p className="text-lg font-black text-teal-800">
                {progressPercent}%
              </p>
            </div>

            <div className="rounded-2xl border border-teal-200 bg-teal-50/60 px-3.5 py-2 text-center min-w-[100px]">
              <span className="text-[10px] font-bold uppercase text-teal-900 flex items-center justify-center gap-1">
                <Flame className="h-3 w-3 text-amber-600 fill-amber-600" />
                Sequência
              </span>
              <p className="text-lg font-black text-slate-900">
                {completedCount > 0 ? `${completedCount}d` : '0d'}
              </p>
            </div>
          </div>

        </div>
      </div>


      {/* Proactive Re-plan Alert Banner if student missed tasks */}
      {hasMissedItems && (
        <div className="bg-teal-50 border-b border-teal-200 px-4 py-3 text-xs text-teal-950">
          <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <RefreshCw className="h-4 w-4 text-teal-700 shrink-0" />
              <p className="font-medium">
                Detectamos tarefas pendentes ou atrasadas na sua trilha. O sistema pode redistribuir esses tópicos nos seus próximos dias de estudo.
              </p>
            </div>

            <button
              onClick={() => onTriggerAiReplan()}
              className="flex items-center gap-1.5 rounded-xl bg-teal-700 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-teal-800 transition-all shrink-0"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Replanejar Cronograma</span>
            </button>
          </div>
        </div>
      )}


      {/* Main Dashboard Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 grid gap-8 lg:grid-cols-12">
        
        {/* Left Column: Calendar & Week Switcher (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Week Selector Bar */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3 shadow-2xs">
            <button
              onClick={() => setSelectedWeek(prev => Math.max(1, prev - 1))}
              disabled={selectedWeek === 1}
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 disabled:opacity-30"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="text-center">
              <span className="text-xs font-bold text-teal-800 uppercase tracking-widest">
                Semana {selectedWeek} de {trail.totalWeeks}
              </span>
              <p className="text-[11px] text-slate-500 font-medium">
                Cronograma Personalizado
              </p>
            </div>

            <button
              onClick={() => setSelectedWeek(prev => Math.min(trail.totalWeeks, prev + 1))}
              disabled={selectedWeek === trail.totalWeeks}
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 disabled:opacity-30"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>


          {/* Day Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'todos', label: 'Todos os dias' },
              { id: 'seg', label: 'Segunda' },
              { id: 'ter', label: 'Terça' },
              { id: 'qua', label: 'Quarta' },
              { id: 'qui', label: 'Quinta' },
              { id: 'sex', label: 'Sexta' },
              { id: 'sab', label: 'Sábado' },
              { id: 'dom', label: 'Domingo' },
            ].map(dayFilter => (
              <button
                key={dayFilter.id}
                onClick={() => setSelectedDayFilter(dayFilter.id)}
                className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all border whitespace-nowrap ${
                  selectedDayFilter === dayFilter.id
                    ? 'bg-teal-700 text-white border-teal-700 shadow-2xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {dayFilter.label}
              </button>
            ))}
          </div>


          {/* Scheduled Topic Cards for selected week & day */}
          <div className="space-y-4">
            {filteredItems.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-2xs">
                <BookOpen className="h-8 w-8 mx-auto text-slate-400 mb-2" />
                <p className="text-sm font-bold text-slate-800">Nenhum tópico agendado para este dia.</p>
                <p className="text-xs mt-1">Aproveite para revisar resumos anteriores ou descansar!</p>
              </div>
            ) : (
              filteredItems.map(item => (
                <div
                  key={item.id}
                  className={`rounded-2xl border p-5 transition-all shadow-2xs ${
                    item.status === 'CONCLUIDO'
                      ? 'border-teal-300 bg-teal-50/40'
                      : item.status === 'ATRASADO'
                      ? 'border-rose-200 bg-rose-50/40'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-bold text-teal-800 uppercase tracking-wider text-[11px]">
                          {formatDayFull(item.dayOfWeek)}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-600 font-medium">{item.topic.area}</span>
                        {item.isRevisionOnly && (
                          <span className="rounded bg-teal-100 border border-teal-300 text-teal-900 text-[10px] px-2 py-0.5 font-bold">
                            🎯 Exercícios de Revisão
                          </span>
                        )}
                        {item.topic.weight === 'ALTA' && (
                          <span className="rounded bg-amber-50 border border-amber-200 text-amber-800 text-[10px] px-1.5 font-bold">
                            Alta Incidência
                          </span>
                        )}
                        {item.replannedCount && item.replannedCount > 0 ? (
                          <span className="rounded bg-teal-100 text-teal-900 text-[10px] px-1.5 font-bold border border-teal-200">
                            Reorganizado
                          </span>
                        ) : null}
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 mt-1">{item.topic.topic}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{item.topic.subtopic}</p>
                    </div>

                    {/* Status badge */}
                    <div className="shrink-0">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${
                        item.status === 'CONCLUIDO'
                          ? 'bg-teal-50 text-teal-800 border-teal-200'
                          : item.status === 'PARCIAL'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : item.status === 'ATRASADO'
                          ? 'bg-rose-50 text-rose-800 border-rose-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {item.status === 'CONCLUIDO' && 'Estudado'}
                        {item.status === 'PARCIAL' && 'Parcial'}
                        {item.status === 'ATRASADO' && 'Atrasado'}
                        {item.status === 'PENDENTE' && 'Pendente'}
                      </span>
                    </div>
                  </div>

                  {/* Resources Links */}
                  <div className="grid gap-2 sm:grid-cols-2 mb-4">
                    {item.topic.resources.map(res => (
                      <a
                        key={res.id}
                        href={res.url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-2.5 text-xs hover:border-teal-300 transition-all group"
                      >
                        <div className="flex items-center gap-2">
                          {res.type === 'video' ? <PlayCircle className="h-4 w-4 text-slate-600 shrink-0" /> : <FileText className="h-4 w-4 text-teal-700 shrink-0" />}
                          <span className="font-semibold text-slate-700 group-hover:text-teal-900 transition-colors truncate max-w-[180px]">
                            {res.title}
                          </span>
                        </div>
                        <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover:text-teal-700 shrink-0" />
                      </a>
                    ))}
                  </div>

                  {/* Interactive Check-in Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Registrar Progresso:</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onCheckIn(item.id, 'CONCLUIDO')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                          item.status === 'CONCLUIDO'
                            ? 'bg-teal-700 text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-teal-50 hover:text-teal-900'
                        }`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Estudei</span>
                      </button>

                      <button
                        onClick={() => onCheckIn(item.id, 'PARCIAL')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                          item.status === 'PARCIAL'
                            ? 'bg-amber-600 text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-amber-900'
                        }`}
                      >
                        <Clock className="h-3.5 w-3.5" />
                        <span>Parcial</span>
                      </button>

                      <button
                        onClick={() => {
                          onCheckIn(item.id, 'ATRASADO');
                          onTriggerAiReplan(item);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                          item.status === 'ATRASADO'
                            ? 'bg-rose-600 text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-900'
                        }`}
                      >
                        <XCircle className="h-3.5 w-3.5" />
                        <span>Não Consegui</span>
                      </button>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>

        </div>


        {/* Right Column: Mentorship & Progress Overview (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Replan Proactive Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xs relative overflow-hidden">
            <div className="flex items-center gap-2 text-teal-800 font-bold text-xs uppercase tracking-widest mb-2">
              <Sparkles className="h-4 w-4 text-teal-700" />
              <span>Replanejamento Adaptativo</span>
            </div>

            <h3 className="text-lg font-black text-slate-900">Acumulou matérias? Reorganize seu tempo sem estresse.</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Diferente de cronogramas estáticos, o motor recalcula os dias restantes mantendo a prioridade nos tópicos de maior peso na prova do ENEM.
            </p>

            <button
              onClick={() => onTriggerAiReplan()}
              className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-4 py-3 text-xs font-bold text-white shadow-2xs hover:bg-teal-800 transition-all"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Reorganizar Cronograma</span>
            </button>
          </div>

          {/* Overall Trail Progress Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-4 shadow-2xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Resumo do Edital ENEM</h3>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-500">Progresso Geral:</span>
                <span className="font-bold text-teal-800">{completedCount} de {totalCount} tópicos</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-teal-700 transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center pt-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Concluídos</span>
                <p className="text-base font-bold text-teal-800">{completedCount}</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Atrasados</span>
                <p className="text-base font-bold text-rose-600">{missedCount}</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

