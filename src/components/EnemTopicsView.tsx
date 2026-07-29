import React, { useState, useMemo } from 'react';
import { UserProfile, EnemMatrixTopic, SubjectArea } from '../types';
import { ENEM_MATRIX_TOPICS } from '../data/enemData';
import { 
  BookOpen, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  PlayCircle, 
  FileText, 
  Sparkles, 
  RefreshCw, 
  Award,
  BookMarked,
  BrainCircuit,
  Hourglass
} from 'lucide-react';

interface EnemTopicsViewProps {
  user: UserProfile;
  onToggleStudiedTopic: (topicId: string) => void;
  onRecalculateTrail: () => void;
}

const SUBJECT_AREAS: { area: SubjectArea; label: string; icon: any; color: string; bg: string; border: string; text: string }[] = [
  { 
    area: 'Matemática', 
    label: 'Matemática', 
    icon: Award, 
    color: 'emerald-600', 
    bg: 'bg-emerald-50', 
    border: 'border-emerald-200', 
    text: 'text-emerald-800' 
  },
  { 
    area: 'Ciências da Natureza', 
    label: 'Natureza', 
    icon: BrainCircuit, 
    color: 'teal-600', 
    bg: 'bg-teal-50', 
    border: 'border-teal-200', 
    text: 'text-teal-800' 
  },
  { 
    area: 'Ciências Humanas', 
    label: 'Humanas', 
    icon: BookMarked, 
    color: 'amber-600', 
    bg: 'bg-amber-50', 
    border: 'border-amber-200', 
    text: 'text-amber-800' 
  },
  { 
    area: 'Linguagens e Códigos', 
    label: 'Linguagens', 
    icon: BookOpen, 
    color: 'sky-600', 
    bg: 'bg-sky-50', 
    border: 'border-sky-200', 
    text: 'text-sky-800' 
  },
  { 
    area: 'Redação Nota 1000', 
    label: 'Redação', 
    icon: Sparkles, 
    color: 'rose-600', 
    bg: 'bg-rose-50', 
    border: 'border-rose-200', 
    text: 'text-rose-800' 
  }
];

export const EnemTopicsView: React.FC<EnemTopicsViewProps> = ({
  user,
  onToggleStudiedTopic,
  onRecalculateTrail
}) => {
  const [selectedArea, setSelectedArea] = useState<SubjectArea | 'todos'>('todos');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);
  const [hasChangesPending, setHasChangesPending] = useState(false);

  // Group topics by area
  const topicsByArea = useMemo(() => {
    return ENEM_MATRIX_TOPICS.reduce((acc, topic) => {
      if (!acc[topic.area]) {
        acc[topic.area] = [];
      }
      acc[topic.area].push(topic);
      return acc;
    }, {} as Record<SubjectArea, EnemMatrixTopic[]>);
  }, []);

  // Calculate statistics
  const stats = useMemo(() => {
    const total = ENEM_MATRIX_TOPICS.length;
    const studiedCount = ENEM_MATRIX_TOPICS.filter(t => user.studiedTopicIds?.includes(t.id)).length;
    const percentGeneral = total > 0 ? Math.round((studiedCount / total) * 100) : 0;

    const areaStats = SUBJECT_AREAS.map(({ area, label }) => {
      const areaTopics = topicsByArea[area] || [];
      const totalArea = areaTopics.length;
      const studiedArea = areaTopics.filter(t => user.studiedTopicIds?.includes(t.id)).length;
      const percent = totalArea > 0 ? Math.round((studiedArea / totalArea) * 100) : 0;
      return { area, label, total: totalArea, studied: studiedArea, percent };
    });

    return { total, studiedCount, percentGeneral, areaStats };
  }, [user.studiedTopicIds, topicsByArea]);

  const filteredTopics = useMemo(() => {
    if (selectedArea === 'todos') {
      return ENEM_MATRIX_TOPICS;
    }
    return ENEM_MATRIX_TOPICS.filter(t => t.area === selectedArea);
  }, [selectedArea]);

  const handleToggle = (topicId: string) => {
    onToggleStudiedTopic(topicId);
    setHasChangesPending(true);
  };

  const handleApplyRecalculate = () => {
    onRecalculateTrail();
    setHasChangesPending(false);
  };

  const toggleExpandTopic = (topicId: string) => {
    setExpandedTopicId(expandedTopicId === topicId ? null : topicId);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-28">
      {/* Header Banner */}
      <div className="border-b border-slate-200 bg-white px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="rounded-full bg-teal-50 border border-teal-200 px-2.5 py-0.5 text-xs font-bold text-teal-800">
              Edital ENEM Completo
            </span>
            <h1 className="text-2xl font-black text-slate-900 mt-1">
              Guia de Conteúdos & Progresso
            </h1>
            <p className="text-xs text-slate-600">
              Gerencie os tópicos que você já domina. Eles serão transformados em revisões rápidas na sua trilha diária.
            </p>
          </div>

          {/* General Progress Card */}
          <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 shadow-2xs min-w-[240px]">
            <div className="relative flex h-14 w-14 items-center justify-center shrink-0">
              {/* Circular progress background */}
              <svg className="absolute h-full w-full -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  className="stroke-slate-200"
                  strokeWidth="4"
                  fill="transparent"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  className="stroke-teal-600 transition-all duration-500 ease-out"
                  strokeWidth="4"
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 24}`}
                  strokeDashoffset={`${2 * Math.PI * 24 * (1 - stats.percentGeneral / 100)}`}
                />
              </svg>
              <span className="text-sm font-black text-slate-900">{stats.percentGeneral}%</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-500">Progresso Geral</span>
              <p className="text-sm font-black text-slate-800">
                {stats.studiedCount} de {stats.total} tópicos
              </p>
              <p className="text-[10px] text-slate-500">concluídos do edital</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
        {/* Progress Grid by Area */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {stats.areaStats.map(({ area, label, studied, total, percent }) => {
            const config = SUBJECT_AREAS.find(a => a.area === area)!;
            const Icon = config.icon;
            
            return (
              <div 
                key={area}
                onClick={() => setSelectedArea(area)}
                className={`rounded-2xl border p-3.5 transition-all cursor-pointer relative group ${
                  selectedArea === area 
                    ? `bg-white border-${config.color} ring-2 ring-${config.color}/20 shadow-xs` 
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`rounded-lg p-1.5 ${config.bg} ${config.text}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${config.bg} ${config.text}`}>
                    {percent}%
                  </span>
                </div>
                <h3 className="text-xs font-black text-slate-900 tracking-tight">{label}</h3>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                  {studied}/{total} estudados
                </p>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 bg-${config.color}`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters and List */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-teal-700" />
              <h2 className="text-lg font-black text-slate-900">
                {selectedArea === 'todos' ? 'Todos os Tópicos do ENEM' : `Conteúdos de ${selectedArea}`}
              </h2>
              <span className="rounded-full bg-slate-100 border border-slate-200 px-2 py-0.5 text-xs font-bold text-slate-600">
                {filteredTopics.length}
              </span>
            </div>

            {/* Quick Filters */}
            <div className="flex items-center gap-2 flex-wrap text-xs font-bold">
              <button
                onClick={() => setSelectedArea('todos')}
                className={`rounded-lg px-3 py-1.5 transition-all cursor-pointer border ${
                  selectedArea === 'todos'
                    ? 'bg-slate-900 border-slate-900 text-white shadow-2xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Todos
              </button>
              {SUBJECT_AREAS.map(item => (
                <button
                  key={item.area}
                  onClick={() => setSelectedArea(item.area)}
                  className={`rounded-lg px-3 py-1.5 transition-all cursor-pointer border ${
                    selectedArea === item.area
                      ? `bg-${item.color} border-${item.color} text-white shadow-2xs`
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Topics Grid */}
          <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2">
            {filteredTopics.map(topic => {
              const areaConfig = SUBJECT_AREAS.find(a => a.area === topic.area)!;
              const isStudied = user.studiedTopicIds?.includes(topic.id) ?? false;
              const isExpanded = expandedTopicId === topic.id;
              
              // Relevance Badge style
              const weightConfig = 
                topic.weight === 'ALTA'
                  ? { bg: 'bg-rose-50 text-rose-700 border-rose-200', text: 'Prioridade Máxima' }
                  : topic.weight === 'MEDIA'
                  ? { bg: 'bg-amber-50 text-amber-700 border-amber-200', text: 'Frequente' }
                  : { bg: 'bg-teal-50 text-teal-700 border-teal-200', text: 'Estratégico' };

              return (
                <div 
                  key={topic.id}
                  className={`rounded-2xl border bg-white transition-all overflow-hidden flex flex-col group ${
                    isStudied 
                      ? 'border-slate-200 bg-slate-50/50' 
                      : 'border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-xs'
                  }`}
                >
                  {/* Main header block */}
                  <div className="p-4 sm:p-5 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      {/* Checkbox button */}
                      <button
                        onClick={() => handleToggle(topic.id)}
                        className={`h-6 w-6 rounded-lg border-2 flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                          isStudied 
                            ? 'bg-teal-600 border-teal-600 text-white shadow-2xs' 
                            : 'border-slate-300 bg-white hover:border-slate-400'
                        }`}
                      >
                        {isStudied && <Check className="h-4 w-4" />}
                      </button>

                      {/* Content text */}
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md border ${weightConfig.bg}`}>
                            {weightConfig.text} • Peso {topic.weightScore}
                          </span>
                          <span className="text-[9px] font-bold text-slate-400">• {topic.area}</span>
                        </div>
                        <h3 className={`text-sm font-black tracking-tight ${isStudied ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                          {topic.topic}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 font-medium">
                          {topic.subtopic}
                        </p>
                      </div>
                    </div>

                    {/* Expand/Collapse resources */}
                    <button
                      onClick={() => toggleExpandTopic(topic.id)}
                      className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all cursor-pointer"
                      title={isExpanded ? "Ocultar Recursos" : "Ver Recursos de Estudo"}
                    >
                      {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </button>
                  </div>

                  {/* Expanded Resources Drawer */}
                  {isExpanded && (
                    <div className="border-t border-slate-100 bg-slate-50/70 p-4 space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-500 pb-1">
                        <span>Recursos Recomendados para Estudo:</span>
                        <span className="flex items-center gap-1">
                          <Hourglass className="h-3.5 w-3.5" />
                          Estimar ~{topic.estimatedMinutes}min
                        </span>
                      </div>

                      <div className="grid gap-2">
                        {topic.resources.map(res => (
                          <a
                            key={res.id}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between gap-3 p-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 transition-all text-xs group/link"
                          >
                            <div className="flex items-center gap-2">
                              {res.type === 'video' ? (
                                <PlayCircle className="h-4 w-4 text-rose-600" />
                              ) : (
                                <FileText className="h-4 w-4 text-indigo-600" />
                              )}
                              <div>
                                <p className="font-semibold text-slate-800 group-hover/link:text-slate-950 transition-colors">
                                  {res.title}
                                </p>
                                <span className="text-[10px] text-slate-400 font-medium">
                                  {res.provider} • {res.durationMinutes} min
                                </span>
                              </div>
                            </div>
                            <ExternalLink className="h-3.5 w-3.5 text-slate-400 group-hover/link:text-slate-600 shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Recalculate Alert Banner at the bottom */}
      {hasChangesPending && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-teal-950 text-white border-t border-teal-900 py-4 px-4 shadow-xl">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <RefreshCw className="h-5 w-5 text-teal-400 animate-spin-slow shrink-0" />
              <div>
                <p className="text-sm font-bold">Você alterou os tópicos estudados!</p>
                <p className="text-xs text-teal-300 font-medium">Atualize seu cronograma para transformar estes temas em sessões de revisão rápidas.</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setHasChangesPending(false)}
                className="px-4 py-2 text-xs font-bold text-teal-200 hover:text-white transition-all cursor-pointer"
              >
                Ignorar
              </button>
              <button
                onClick={handleApplyRecalculate}
                className="flex items-center gap-1.5 rounded-xl bg-teal-600 px-4 py-2 text-xs font-bold text-white hover:bg-teal-500 transition-all shadow-xs cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5 text-teal-200" />
                <span>Atualizar Trilha</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
