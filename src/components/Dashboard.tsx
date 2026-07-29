import React, { useState } from 'react';
import { UserProfile, StudyTrail, TrailItem, CheckInStatus } from '../types';
import { formatDayFull, formatLocalDate } from '../utils/trailGenerator';
import { Calendar as CalendarIcon, CheckCircle2, Clock, AlertCircle, RefreshCw, PlayCircle, FileText, ExternalLink, Sparkles, Flame, BookOpen, ChevronLeft, ChevronRight, XCircle } from 'lucide-react';

interface DashboardProps {
  user: UserProfile;
  trail: StudyTrail;
  onCheckIn: (itemId: string, status: CheckInStatus) => void;
  onTriggerAiReplan: (missedItem?: TrailItem) => void;
}

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const WEEKDAY_NAMES = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export const Dashboard: React.FC<DashboardProps> = ({
  user,
  trail,
  onCheckIn,
  onTriggerAiReplan
}) => {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');
  
  // Format today's date safely
  const todayStr = formatLocalDate(new Date());

  // Set selectedDate initially to today if today has items, otherwise first item's date, otherwise today
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const hasToday = trail.items.some(item => item.date === todayStr);
    return hasToday ? todayStr : (trail.items[0]?.date || todayStr);
  });

  // Month navigation state
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    if (trail.items.length > 0) {
      // Find the item date and parse it safely
      const firstItemDate = new Date(trail.items[0].date + 'T00:00:00');
      if (!isNaN(firstItemDate.getTime())) {
        return firstItemDate;
      }
    }
    return new Date();
  });

  // Original list view states
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

  // Filter items for list view (current week & day)
  const currentWeekItems = trail.items.filter(item => item.weekNumber === selectedWeek);
  const filteredItems = selectedDayFilter === 'todos' 
    ? currentWeekItems 
    : currentWeekItems.filter(item => item.dayOfWeek === selectedDayFilter);

  // Group list view items by date/day
  const listGroupedDays = filteredItems.reduce((acc, item) => {
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

  const listSortedDays = (Object.values(listGroupedDays) as Array<{ date: string; dayOfWeek: string; items: TrailItem[] }>).sort((a, b) => a.date.localeCompare(b.date));

  // Check if there are overdue/missed items
  const hasMissedItems = trail.items.some(i => i.status === 'ATRASADO');

  // Month navigation handlers
  const handlePrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  // Generate grid cells for calendar
  const getDaysInMonthGrid = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDayOfWeek = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    
    const grid: Array<{ date: Date; dateStr: string; isCurrentMonth: boolean }> = [];
    
    // Prev month padding
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, prevMonthDays - i);
      grid.push({
        date: d,
        dateStr: formatLocalDate(d),
        isCurrentMonth: false
      });
    }
    
    // Current month
    for (let i = 1; i <= daysInMonth; i++) {
      const d = new Date(year, month, i);
      grid.push({
        date: d,
        dateStr: formatLocalDate(d),
        isCurrentMonth: true
      });
    }
    
    // Next month padding (6 weeks standard layout = 42 cells)
    const totalCells = 42;
    const nextPadding = totalCells - grid.length;
    for (let i = 1; i <= nextPadding; i++) {
      const d = new Date(year, month + 1, i);
      grid.push({
        date: d,
        dateStr: formatLocalDate(d),
        isCurrentMonth: false
      });
    }
    
    return grid;
  };

  const getDayStatus = (dateStr: string) => {
    const dayItems = trail.items.filter(item => item.date === dateStr);
    if (dayItems.length === 0) return null;
    
    const allCompleted = dayItems.every(i => i.status === 'CONCLUIDO');
    const anyAtrasado = dayItems.some(i => i.status === 'ATRASADO');
    const anyParcial = dayItems.some(i => i.status === 'PARCIAL');
    
    if (allCompleted) return 'CONCLUIDO';
    if (anyAtrasado) return 'ATRASADO';
    if (anyParcial) return 'PARCIAL';
    return 'PENDENTE';
  };

  const getFormattedLocalDateString = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    if (isNaN(d.getTime())) return dateStr;
    const weekday = formatDayFull(['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'][d.getDay()]);
    const day = String(d.getDate()).padStart(2, '0');
    const month = MONTH_NAMES[d.getMonth()];
    const year = d.getFullYear();
    return `${weekday}, ${day} de ${month} de ${year}`;
  };

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
          
          {/* Toggles and Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-3">
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-teal-700" />
              <span>Cronograma de Estudos</span>
            </h2>
            
            <div className="flex rounded-xl bg-slate-100 p-0.5 border border-slate-200 text-xs font-bold self-start sm:self-auto">
              <button
                onClick={() => setViewMode('calendar')}
                className={`rounded-lg px-3 py-1.5 transition-all cursor-pointer ${
                  viewMode === 'calendar'
                    ? 'bg-white text-teal-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Calendário
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`rounded-lg px-3 py-1.5 transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white text-teal-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Lista por Semanas
              </button>
            </div>
          </div>

          {/* Render Calendar View */}
          {viewMode === 'calendar' && (
            <div className="space-y-6">
              {/* Monthly Calendar Selector & Grid */}
              <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <button
                    onClick={handlePrevMonth}
                    className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  
                  <div className="text-center">
                    <h3 className="text-sm font-bold text-teal-950 uppercase tracking-wider">
                      {MONTH_NAMES[currentMonth.getMonth()]} de {currentMonth.getFullYear()}
                    </h3>
                  </div>

                  <button
                    onClick={handleNextMonth}
                    className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all cursor-pointer"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                {/* Calendar Grid Header */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-slate-500 pb-2 border-b border-slate-100">
                  {WEEKDAY_NAMES.map(day => (
                    <div key={day} className="py-1">{day}</div>
                  ))}
                </div>

                {/* Grid cells */}
                <div className="grid grid-cols-7 gap-1.5">
                  {getDaysInMonthGrid(currentMonth).map(({ date, dateStr, isCurrentMonth }, idx) => {
                    const isSelected = selectedDate === dateStr;
                    const status = getDayStatus(dateStr);
                    const dayItems = trail.items.filter(item => item.date === dateStr);
                    const isToday = todayStr === dateStr;
                    
                    return (
                      <button
                        key={`${dateStr}-${idx}`}
                        onClick={() => setSelectedDate(dateStr)}
                        className={`min-h-[64px] flex flex-col justify-between p-1.5 rounded-2xl border transition-all text-left relative group cursor-pointer ${
                          isSelected
                            ? 'bg-teal-50 border-teal-400 text-teal-950 font-black shadow-xs ring-1 ring-teal-400/30'
                            : isCurrentMonth
                            ? 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50/50'
                            : 'bg-slate-50/40 border-slate-100 text-slate-400 hover:bg-slate-50/60'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className={`text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full ${
                            isToday ? 'bg-teal-700 text-white font-extrabold shadow-2xs' : ''
                          }`}>
                            {date.getDate()}
                          </span>
                          
                          {/* Indicator dot */}
                          {dayItems.length > 0 && (
                            <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                              status === 'CONCLUIDO'
                                ? 'bg-teal-600'
                                : status === 'ATRASADO'
                                ? 'bg-rose-500'
                                : status === 'PARCIAL'
                                ? 'bg-amber-500'
                                : 'bg-slate-400'
                            }`} />
                          )}
                        </div>

                        {/* Summary preview on Desktop */}
                        {dayItems.length > 0 && (
                          <div className="hidden sm:block mt-1 text-[9px] font-medium leading-tight truncate w-full text-slate-500 group-hover:text-slate-800">
                            {dayItems.map(item => item.topic.topic).join(', ')}
                          </div>
                        )}
                        
                        {/* Day indicator for mobile */}
                        {dayItems.length > 0 && (
                          <div className="text-[8px] font-bold text-teal-800 uppercase tracking-widest sm:hidden">
                            {dayItems.length} mat.
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Selected Day study items list */}
              <div className="space-y-4">
                <div className="rounded-2xl bg-slate-100 border border-slate-200 px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-teal-700" />
                    <span className="text-xs font-bold text-slate-700">
                      {getFormattedLocalDateString(selectedDate)}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200 self-start sm:self-auto">
                    {trail.items.filter(i => i.date === selectedDate).length} matérias agendadas
                  </span>
                </div>

                {/* Items List */}
                {trail.items.filter(item => item.date === selectedDate).length === 0 ? (
                  <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-2xs">
                    <BookOpen className="h-8 w-8 mx-auto text-slate-400 mb-2" />
                    <p className="text-sm font-bold text-slate-800">Dia Livre ou Descanso!</p>
                    <p className="text-xs mt-1">Nenhum tópico de estudo agendado para esta data. Aproveite para descansar ou revisar!</p>
                  </div>
                ) : (
                  trail.items.filter(item => item.date === selectedDate).map(item => (
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
                          <div className="flex items-center gap-2 text-xs flex-wrap">
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
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
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
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
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
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
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
          )}

          {/* Render Original List View */}
          {viewMode === 'list' && (
            <div className="space-y-6">
              {/* Week Selector Bar */}
              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3 shadow-2xs">
                <button
                  onClick={() => setSelectedWeek(prev => Math.max(1, prev - 1))}
                  disabled={selectedWeek === 1}
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 disabled:opacity-30 cursor-pointer"
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
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800 disabled:opacity-30 cursor-pointer"
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
                    className={`py-1.5 px-3 rounded-xl text-xs font-bold transition-all border whitespace-nowrap cursor-pointer ${
                      selectedDayFilter === dayFilter.id
                        ? 'bg-teal-700 text-white border-teal-700 shadow-2xs'
                        : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900 hover:border-slate-300'
                    }`}
                  >
                    {dayFilter.label}
                  </button>
                ))}
              </div>

              {/* Scheduled Topic Cards grouped by weekday blocks */}
              <div className="space-y-6">
                {listSortedDays.length === 0 ? (
                  <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-slate-500 shadow-2xs">
                    <BookOpen className="h-8 w-8 mx-auto text-slate-400 mb-2" />
                    <p className="text-sm font-bold text-slate-800">Nenhum tópico agendado para esta semana.</p>
                    <p className="text-xs mt-1">Aproveite para revisar resumos anteriores ou descansar!</p>
                  </div>
                ) : (
                  listSortedDays.map(dayGroup => (
                    <div key={dayGroup.date} className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 shadow-2xs">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <h3 className="font-extrabold text-teal-800 text-sm sm:text-base uppercase tracking-wider">
                          {formatDayFull(dayGroup.dayOfWeek)}
                        </h3>
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {dayGroup.items.length} {dayGroup.items.length === 1 ? 'matéria' : 'matérias'}
                        </span>
                      </div>
                      <div className="space-y-4">
                        {dayGroup.items.map(item => (
                          <div
                            key={item.id}
                            className={`rounded-xl border p-4 transition-all ${
                              item.status === 'CONCLUIDO'
                                ? 'border-teal-300 bg-teal-50/20'
                                : item.status === 'ATRASADO'
                                ? 'border-rose-200 bg-rose-50/20'
                                : 'border-slate-100 bg-slate-50/30'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-3">
                              <div>
                                <div className="flex items-center gap-2 text-xs flex-wrap">
                                  <span className="font-bold text-teal-800 uppercase tracking-wider text-[11px]">
                                    {item.topic.area}
                                  </span>
                                  {item.isRevisionOnly && (
                                    <span className="rounded bg-teal-100 border border-teal-200 text-teal-900 text-[10px] px-1.5 py-0.2 font-bold">
                                      Revisão
                                    </span>
                                  )}
                                  {item.topic.weight === 'ALTA' && (
                                    <span className="rounded bg-amber-50 border border-amber-200 text-amber-800 text-[10px] px-1.5 py-0.2 font-bold">
                                      Alta Incidência
                                    </span>
                                  )}
                                  {item.replannedCount && item.replannedCount > 0 ? (
                                    <span className="rounded bg-teal-100 text-teal-900 text-[10px] px-1.5 py-0.2 font-bold border border-teal-200">
                                      Reorganizado
                                    </span>
                                  ) : null}
                                </div>

                                <h4 className="text-base font-bold text-slate-900 mt-1">{item.topic.topic}</h4>
                                <p className="text-xs text-slate-500 mt-0.5">{item.topic.subtopic}</p>
                              </div>

                              {/* Status badge */}
                              <div className="shrink-0">
                                <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
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
                                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-2.5 text-xs hover:border-teal-300 transition-all group"
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
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Registrar Progresso:</span>
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => onCheckIn(item.id, 'CONCLUIDO')}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
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
                                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
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
                                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
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
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

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

