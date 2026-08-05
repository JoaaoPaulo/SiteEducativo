import React, { useState } from 'react';
import { UserProfile, SubjectArea, SubjectDifficulty } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Target, 
  Clock, 
  BrainCircuit, 
  Flame, 
  Award,
  ChevronRight,
  BookOpen,
  Search,
  GraduationCap,
  AlertCircle,
  Phone,
  Star,
  Lock
} from 'lucide-react';

interface WizardFormProps {
  onSubmit: (userProfile: UserProfile) => void;
  onCancel: () => void;
}

const CURSO_SUGGESTIONS = [
  'Medicina',
  'Direito',
  'Engenharia de Software',
  'Engenharia Civil',
  'Psicologia',
  'Administração',
  'Biomedicina',
  'Odontologia',
  'Medicina Veterinária',
  'Arquitetura e Urbanismo',
  'Ciência da Computação',
  'Enfermagem',
  'Fisioterapia',
  'Nutrição',
  'Publicidade e Propaganda',
  'Relações Internacionais',
  'Ciências Contábeis',
  'Engenharia Mecânica',
  'Engenharia de Produção',
  'Design Gráfico',
  'Letras',
  'Pedagogia',
  'Outro'
];

const UNIVERSIDADE_SUGGESTIONS = [
  'USP',
  'UNICAMP',
  'UNESP',
  'UFMG',
  'UFRJ',
  'UFPR',
  'UFSC',
  'UFRGS',
  'UEM',
  'UEL',
  'UFSCar',
  'UNIFESP',
  'UFRN',
  'UFC',
  'UnB',
  'PUC-SP',
  'PUC-PR',
  'FGV',
  'Mackenzie',
  'Não sei ainda'
];

const DIFICULDADES_LIST = [
  'Matemática',
  'Física',
  'Química',
  'Biologia',
  'História',
  'Geografia',
  'Filosofia & Sociologia',
  'Gramática & Literatura',
  'Inglês / Espanhol',
  'Artes & Educação Física',
  'Redação'
];

const DIAS_DA_SEMANA = [
  { id: 'seg', label: 'Segunda-feira' },
  { id: 'ter', label: 'Terça-feira' },
  { id: 'qua', label: 'Quarta-feira' },
  { id: 'qui', label: 'Quinta-feira' },
  { id: 'sex', label: 'Sexta-feira' },
  { id: 'sab', label: 'Sábado' },
  { id: 'dom', label: 'Domingo' }
];

export const WizardForm: React.FC<WizardFormProps> = ({ onSubmit, onCancel }) => {
  // Navigation state (1 to 16)
  const [qIndex, setQIndex] = useState<number>(1);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>('');

  // Form states
  const [curso, setCurso] = useState(''); // Q1
  const [cursoSuggestions, setCursoSuggestions] = useState<string[]>([]);
  const [universidadeSonho, setUniversidadeSonho] = useState(''); // Q2
  const [prestouAntes, setPrestouAntes] = useState<boolean | null>(null); // Q3
  const [mediaAproximada, setMediaAproximada] = useState(''); // Q4
  const [notaAlvoNumero, setNotaAlvoNumero] = useState(''); // Q5
  const [availableDays, setAvailableDays] = useState<string[]>([]); // Q6 (specific days checklist!)
  const [horasEstudoDia, setHorasEstudoDia] = useState(''); // Q7
  const [materiasDificuldade, setMateriasDificuldade] = useState<string[]>([]); // Q8
  const [trabalha, setTrabalha] = useState<boolean | null>(null); // Q9
  const [periodoEstudoOrTrabalho, setPeriodoEstudoOrTrabalho] = useState(''); // Q10
  const [procrastina, setProcrastina] = useState(''); // Q11
  const [preferenciaAprendizado, setPreferenciaAprendizado] = useState<string[]>([]); // Q12
  const [tempoFoco, setTempoFoco] = useState(''); // Q13
  const [name, setName] = useState(''); // Q14
  const [email, setEmail] = useState(''); // Q15
  const [phone, setPhone] = useState(''); // Q16

  // Formatar celular no padrão brasileiro: (XX) 9XXXX-XXXX
  const formatPhoneNumber = (value: string) => {
    const clean = value.replace(/\D/g, '');
    if (clean.length <= 2) return clean;
    if (clean.length <= 6) return `(${clean.slice(0, 2)}) ${clean.slice(2)}`;
    if (clean.length <= 10) return `(${clean.slice(0, 2)}) ${clean.slice(2, 6)}-${clean.slice(6)}`;
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7, 11)}`;
  };

  // Map school subject selections to SubjectArea -> SubjectDifficulty
  const mapSubjectDifficulties = (): Record<SubjectArea, SubjectDifficulty> => {
    const result: Record<SubjectArea, SubjectDifficulty> = {
      'Matemática': 'Médio',
      'Ciências da Natureza': 'Médio',
      'Ciências Humanas': 'Médio',
      'Linguagens e Códigos': 'Médio',
      'Redação Nota 1000': 'Médio'
    };

    const areaMapping: Record<string, SubjectArea> = {
      'Matemática': 'Matemática',
      'Física': 'Ciências da Natureza',
      'Química': 'Ciências da Natureza',
      'Biologia': 'Ciências da Natureza',
      'História': 'Ciências Humanas',
      'Geografia': 'Ciências Humanas',
      'Filosofia & Sociologia': 'Ciências Humanas',
      'Gramática & Literatura': 'Linguagens e Códigos',
      'Inglês / Espanhol': 'Linguagens e Códigos',
      'Artes & Educação Física': 'Linguagens e Códigos',
      'Redação': 'Redação Nota 1000'
    };

    // Mark selected as difficulty
    materiasDificuldade.forEach(subj => {
      const area = areaMapping[subj];
      if (area) {
        result[area] = 'Preciso de Muita Ajuda';
      }
    });

    // Mark non-selected as Domino Bem if not already marked as Preciso de Muita Ajuda
    Object.keys(areaMapping).forEach(subj => {
      const area = areaMapping[subj];
      if (area && result[area] !== 'Preciso de Muita Ajuda') {
        const siblings = Object.keys(areaMapping).filter(k => areaMapping[k] === area);
        const hasAnyDifficultyInArea = siblings.some(sib => materiasDificuldade.includes(sib));
        if (!hasAnyDifficultyInArea) {
          result[area] = 'Domino Bem';
        }
      }
    });

    return result;
  };

  // Calculate hoursPerWeek based on study hours/day and days/week
  const calculateHoursPerWeek = (): number => {
    let hoursPerDay = 3;
    if (horasEstudoDia === '1h') hoursPerDay = 1;
    else if (horasEstudoDia === '2h') hoursPerDay = 2;
    else if (horasEstudoDia === '3h') hoursPerDay = 3;
    else if (horasEstudoDia === '4h') hoursPerDay = 4;
    else if (horasEstudoDia === '5h+') hoursPerDay = 5;
    else if (horasEstudoDia === 'Varia bastante') hoursPerDay = 3;

    const days = availableDays.length || 5;
    return Math.max(4, hoursPerDay * days);
  };

  // Validation per question
  const validateCurrentQuestion = (): boolean => {
    setErrors('');
    switch (qIndex) {
      case 1:
        if (!curso.trim()) { setErrors('Digite ou escolha o curso desejado.'); return false; }
        break;
      case 2:
        if (!universidadeSonho.trim()) { setErrors('Selecione ou informe a universidade.'); return false; }
        break;
      case 3:
        if (prestouAntes === null) { setErrors('Responda se você já fez o ENEM antes.'); return false; }
        break;
      case 4:
        if (!mediaAproximada) { setErrors('Selecione sua média aproximada.'); return false; }
        break;
      case 5:
        if (!notaAlvoNumero.trim()) { setErrors('Informe a nota que deseja alcançar.'); return false; }
        const score = Number(notaAlvoNumero.trim());
        if (isNaN(score) || score < 300 || score > 1000) {
          setErrors('Por favor, informe uma nota do ENEM válida (entre 300 e 1000).');
          return false;
        }
        break;
      case 6:
        if (availableDays.length === 0) { setErrors('Selecione pelo menos 1 dia da semana para estudar.'); return false; }
        break;
      case 7:
        if (!horasEstudoDia) { setErrors('Selecione as horas de estudo por dia.'); return false; }
        break;
      case 8:
        if (materiasDificuldade.length === 0) { setErrors('Selecione pelo menos 1 matéria.'); return false; }
        if (materiasDificuldade.length > 4) { setErrors('Selecione no máximo 4 matérias.'); return false; }
        break;
      case 9:
        if (trabalha === null) { setErrors('Responda se você trabalha atualmente.'); return false; }
        break;
      case 10:
        if (!periodoEstudoOrTrabalho) { setErrors('Selecione o período.'); return false; }
        break;
      case 11:
        if (!procrastina) { setErrors('Responda sobre procrastinação.'); return false; }
        break;
      case 12:
        if (preferenciaAprendizado.length === 0) { setErrors('Selecione pelo menos 1 método de estudo.'); return false; }
        break;
      case 13:
        if (!tempoFoco) { setErrors('Selecione seu tempo médio de foco.'); return false; }
        break;
      case 14:
        if (!name.trim()) { setErrors('Por favor, informe seu nome.'); return false; }
        break;
      case 15:
        if (!email.trim() || !email.includes('@')) { setErrors('Por favor, digite um e-mail de acesso válido.'); return false; }
        break;
      case 16:
        const cleanPhone = phone.replace(/\D/g, '');
        if (!phone.trim()) { setErrors('Por favor, informe seu número de celular.'); return false; }
        if (cleanPhone.length < 10) { setErrors('Por favor, informe um número de celular válido com DDD.'); return false; }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (validateCurrentQuestion()) {
      if (qIndex === 3 && prestouAntes === false) {
        setQIndex(5);
      } else if (qIndex < 16) {
        setQIndex(prev => prev + 1);
      } else {
        setShowSummary(true);
      }
    }
  };

  const handleBack = () => {
    setErrors('');
    if (qIndex === 5 && prestouAntes === false) {
      setQIndex(3);
    } else if (qIndex > 1) {
      setQIndex(prev => prev - 1);
    } else {
      onCancel();
    }
  };

  const handleFinalSubmit = () => {
    const profile: UserProfile = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      examDate: '2026-11-08',
      hoursPerWeek: calculateHoursPerWeek(),
      availableDays: availableDays,
      difficulties: mapSubjectDifficulties(),
      studiedTopicIds: [],
      isSubscribed: false,
      createdAt: new Date().toISOString(),

      // Custom fields
      curso,
      universidadeSonho,
      prestouAntes: !!prestouAntes,
      mediaAproximada,
      notaAlvoNumero: Number(notaAlvoNumero),
      diasSemanaEstudo: availableDays.length,
      horasEstudoDia,
      materiasDificuldade,
      trabalha: !!trabalha,
      periodoEstudoOrTrabalho,
      procrastina,
      preferenciaAprendizado,
      tempoFoco,
      phone: phone.trim()
    };

    onSubmit(profile);
  };

  // List Handlers
  const handleCursoChange = (value: string) => {
    setCurso(value);
    if (value.trim().length > 1) {
      const filtered = CURSO_SUGGESTIONS.filter(c =>
        c.toLowerCase().includes(value.toLowerCase())
      );
      setCursoSuggestions(filtered);
    } else {
      setCursoSuggestions([]);
    }
  };

  const toggleDayAvailability = (dayId: string) => {
    if (availableDays.includes(dayId)) {
      setAvailableDays(availableDays.filter(d => d !== dayId));
    } else {
      setAvailableDays([...availableDays, dayId]);
    }
  };

  const toggleMateriaDificuldade = (subj: string) => {
    if (materiasDificuldade.includes(subj)) {
      setMateriasDificuldade(materiasDificuldade.filter(s => s !== subj));
    } else {
      if (materiasDificuldade.length < 4) {
        setMateriasDificuldade([...materiasDificuldade, subj]);
      } else {
        setErrors('Você pode selecionar no máximo 4 matérias.');
      }
    }
  };

  const togglePreferenciaAprendizado = (pref: string) => {
    if (preferenciaAprendizado.includes(pref)) {
      setPreferenciaAprendizado(preferenciaAprendizado.filter(p => p !== pref));
    } else {
      setPreferenciaAprendizado([...preferenciaAprendizado, pref]);
    }
  };

  // Get Etapa based on QIndex
  const getEtapaHeader = () => {
    if (qIndex <= 2) return { name: 'Etapa 1 — Objetivo', icon: <Target className="h-4 w-4 text-teal-600" /> };
    if (qIndex <= 5) return { name: 'Etapa 2 — Situação Atual', icon: <Award className="h-4 w-4 text-teal-600" /> };
    if (qIndex <= 7) return { name: 'Etapa 3 — Tempo', icon: <Clock className="h-4 w-4 text-teal-600" /> };
    if (qIndex === 8) return { name: 'Etapa 4 — Matérias', icon: <BrainCircuit className="h-4 w-4 text-teal-600" /> };
    if (qIndex <= 11) return { name: 'Etapa 5 — Perfil', icon: <Flame className="h-4 w-4 text-teal-600" /> };
    if (qIndex <= 13) return { name: 'Etapa 6 — Método', icon: <BookOpen className="h-4 w-4 text-teal-600" /> };
    return { name: 'Etapa 7 — Identificação', icon: <ShieldCheck className="h-4 w-4 text-teal-600" /> };
  };

  const currentEtapa = getEtapaHeader();

  const getMelhorMateria = (): string => {
    const strengths = DIFICULDADES_LIST.filter(x => !materiasDificuldade.includes(x));
    return strengths[0] || 'Redação';
  };

  const getPrioridadeInicial = (): string[] => {
    const list = [...materiasDificuldade];
    if (list.length < 3) {
      if (!list.includes('Redação')) list.push('Redação');
      if (list.length < 3 && !list.includes('Matemática')) list.push('Matemática');
      if (list.length < 3) {
        const others = DIFICULDADES_LIST.filter(x => !list.includes(x));
        if (others[0]) list.push(others[0]);
      }
    }
    return list;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-center px-4 py-8 sm:px-6">
      <div className="mx-auto w-full max-w-xl">
        
        {/* Navigation Top Header */}
        {!showSummary && (
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors animate-fade-in"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{qIndex === 1 ? 'Voltar' : 'Anterior'}</span>
            </button>

            <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs">
              {currentEtapa.icon}
              <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider">
                {currentEtapa.name}
              </span>
            </div>

            <span className="text-[11px] font-bold font-mono text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100 animate-scale-in">
              Q{qIndex}/16
            </span>
          </div>
        )}

        {/* Progress Bar */}
        {!showSummary && (
          <div className="w-full h-1.5 bg-slate-200 rounded-full mb-8 overflow-hidden">
            <div 
              className="h-full bg-teal-600 transition-all duration-300 ease-out"
              style={{ width: `${(qIndex / 16) * 100}%` }}
            />
          </div>
        )}

        {/* Wizard Panel Card */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-md relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {showSummary ? (
              // STUDY PROFILE SUMMARY SCREEN (VALOR IMEDIATO: RESULTADO)
              <motion.div
                key="summary"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.12
                    }
                  }
                }}
                initial="hidden"
                animate="show"
                className="space-y-8"
              >
                {/* Header */}
                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="text-center space-y-3">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 shadow-2xs">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
                    🎯 Seu plano para <span className="text-blue-600">{curso}</span> foi criado.
                  </h2>
                  <p className="text-xs text-muted max-w-sm mx-auto leading-relaxed">
                    Analisamos sua rotina, tempo disponível e dificuldades para criar um plano exclusivo.
                  </p>
                </motion.div>

                {/* Loading Generation Checklist */}
                <motion.div 
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} 
                  className="rounded-[10px] border border-line bg-slate-50/50 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between text-[10px] font-bold text-muted uppercase tracking-wider">
                    <span>Geração do plano de estudos</span>
                    <span className="text-emerald-600">100% concluído</span>
                  </div>
                  <div className="space-y-2">
                    {[
                      'Análise de Perfil concluída',
                      'Matriz do ENEM cruzada com suas lacunas',
                      'Estratégia de prioridade programada'
                    ].map((stepText, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 shrink-0">
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </div>
                        <span>{stepText}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Personalization Insights Grid */}
                <motion.div 
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                  className="grid gap-4 md:grid-cols-2"
                >
                  {/* Smart Responses */}
                  <div className="rounded-[10px] border border-line bg-white p-4 space-y-3 text-left">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-muted">Ajustes da Rotina</span>
                    <div className="space-y-2.5 text-xs text-slate-700 font-medium leading-relaxed">
                      <p>
                        • Seu cronograma foi otimizado para quem estuda apenas <strong className="text-blue-600">{horasEstudoDia === 'Varia bastante' ? 'em horários flexíveis' : horasEstudoDia}</strong> por dia.
                      </p>
                      <p>
                        • <strong className="text-blue-600">{materiasDificuldade[0] || 'Química'}</strong> será sua prioridade de reforço nas próximas semanas.
                      </p>
                      <p>
                        • <strong className="text-emerald-700">{getMelhorMateria()}</strong> exigirá menos tempo de teoria por já ser seu ponto forte.
                      </p>
                    </div>
                  </div>

                  {/* AI Insights Card */}
                  <div className="rounded-[10px] border border-blue-100 bg-blue-50/30 p-4 space-y-3 text-left">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-blue-600">Recomendações do Plano</span>
                    <div className="space-y-2.5 text-xs text-slate-700 font-medium leading-relaxed">
                      <p>
                        🚀 Rotina calculada para cobrir todo o edital do ENEM antes da data da prova.
                      </p>
                      <p>
                        💡 Foco em exercícios de fixação para as áreas de maior dificuldade indicadas.
                      </p>
                      <p>
                        📅 Revisões periódicas automáticas baseadas na curva de esquecimento.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* PRODUCT PREVIEW: Mockup Dashboard (Tuesday/Wednesday Locked) */}
                <motion.div 
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                  className="rounded-[12px] border border-line bg-white shadow-md overflow-hidden text-left"
                >
                  <div className="border-b border-line bg-slate-50/50 p-3 px-4 flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-muted uppercase tracking-wider">Pré-visualização do Plano</span>
                    <span className="text-[9px] bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-[4px] font-bold">Amostra do Primeiro Dia</span>
                  </div>

                  <div className="p-4 space-y-3.5">
                    {/* Active Day - Monday */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] text-muted font-bold">
                        <span>SEGUNDA-FEIRA (ATIVO)</span>
                        <span className="text-blue-600">82% concluído hoje</span>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-slate-50 border border-line p-2.5 rounded-[8px] flex items-center gap-2 text-xs">
                          <Check className="h-3.5 w-3.5 text-emerald-600 stroke-[3] shrink-0" />
                          <span className="font-semibold text-slate-700 truncate">Química • Leitura de Estequiometria</span>
                        </div>
                        <div className="bg-slate-50 border border-line p-2.5 rounded-[8px] flex items-center gap-2 text-xs">
                          <Check className="h-3.5 w-3.5 text-emerald-600 stroke-[3] shrink-0" />
                          <span className="font-semibold text-slate-700 truncate">Biologia • Exercícios de Citologia</span>
                        </div>
                        <div className="bg-blue-50/30 border border-blue-200 p-2.5 rounded-[8px] flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 truncate">
                            <div className="h-2 w-2 rounded-full bg-blue-500 animate-ping shrink-0" />
                            <span className="font-bold text-slate-800 truncate">Física • Revisão de Calorimetria</span>
                          </div>
                          <span className="text-[8px] bg-blue-100 border border-blue-200 text-blue-800 px-2 py-0.5 rounded font-bold shrink-0">Próximo</span>
                        </div>
                      </div>
                    </div>

                    {/* Locked Days */}
                    <div className="space-y-2 pt-2 border-t border-line relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/95 z-10 flex flex-col items-center justify-center gap-1.5 select-none pointer-events-none">
                        <div className="bg-slate-900 text-white rounded-full p-1.5 shadow-md">
                          <Lock className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Plano Completo Bloqueado</span>
                      </div>
                      
                      <div className="blur-[1.5px] opacity-40 space-y-2 select-none pointer-events-none">
                        <div className="flex justify-between items-center text-[10px] text-muted font-bold">
                          <span>TERÇA-FEIRA</span>
                        </div>
                        <div className="bg-slate-50 border border-line p-2.5 rounded-[8px] flex items-center gap-2 text-xs">
                          <div className="h-3.5 w-3.5 rounded-full border border-line shrink-0" />
                          <span className="font-semibold text-slate-400">História • Revolução Industrial</span>
                        </div>
                        <div className="bg-slate-50 border border-line p-2.5 rounded-[8px] flex items-center gap-2 text-xs">
                          <div className="h-3.5 w-3.5 rounded-full border border-line shrink-0" />
                          <span className="font-semibold text-slate-400">Matemática • Proporções</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Value Checklist */}
                <motion.div 
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                  className="space-y-2 text-left"
                >
                  <span className="text-[9px] font-bold uppercase tracking-wider text-muted block mb-1">O que está incluído no seu acesso</span>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {[
                      'Cronograma diário personalizado',
                      'Revisões automáticas programadas',
                      'Reorganização semanal sem culpa',
                      'Meta semanal baseada no seu tempo',
                      'Matriz do ENEM 100% mapeada',
                      'Recomendações e resoluções de questões',
                      'Acompanhamento de evolução real'
                    ].map((val, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
                          <Check className="h-2.5 w-2.5 stroke-[2.5]" />
                        </div>
                        <span>{val}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Social Proof & CTA */}
                <motion.div 
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                  className="text-center pt-2 space-y-3"
                >
                  <div className="flex flex-col items-center justify-center gap-1">
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <span className="text-[10px] text-muted font-semibold">
                      Milhares de planos personalizados criados • 100% Matriz do ENEM
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    className="w-full h-12 rounded-[10px] bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-98 text-white font-semibold text-sm transition-all duration-120 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-600/10"
                  >
                    <span>Liberar meu plano personalizado</span>
                    <Sparkles className="h-4 w-4" />
                  </button>
                </motion.div>
              </motion.div>
            ) : (
              // 16 STEP QUESTIONS
              <motion.div
                key={qIndex}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.18 }}
                className="space-y-6"
              >
                
                {/* Q1: Curso */}
                {qIndex === 1 && (
                  <div className="space-y-4 animate-fade-in">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">Qual curso você quer passar?</h3>
                      <p className="text-xs text-slate-500 mt-1">Escreva ou selecione uma carreira dos exemplos abaixo.</p>
                    </div>
                    <div className="relative">
                      <Search className="h-4 w-4 text-slate-400 absolute left-3 top-3.5" />
                      <input
                        type="text"
                        placeholder="Ex: Medicina, Direito, Engenharia..."
                        value={curso}
                        onChange={e => handleCursoChange(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50/50 pl-9 pr-4 py-3 text-sm text-slate-900 focus:border-teal-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700 transition-all"
                      />
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto pr-1 border border-slate-100 p-2 rounded-lg bg-slate-50/30">
                      {CURSO_SUGGESTIONS.map(s => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => { setCurso(s); setCursoSuggestions([]); setQIndex(2); }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                            curso === s
                              ? 'bg-teal-700 text-white border-teal-700'
                              : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Q2: Faculdade */}
                {qIndex === 2 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">Qual universidade você sonha em estudar?</h3>
                      <p className="text-xs text-slate-500 mt-1">Isso nos ajuda a impulsionar seu foco.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 max-h-[170px] overflow-y-auto p-2 border border-slate-100 rounded-lg bg-slate-50/30">
                      {UNIVERSIDADE_SUGGESTIONS.map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => { setUniversidadeSonho(opt); setQIndex(3); }}
                          className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                            universidadeSonho === opt
                              ? 'border-teal-700 bg-teal-50/80 text-teal-900 font-black'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 font-semibold'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    <div className="pt-2">
                      <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">Outra universidade:</label>
                      <input
                        type="text"
                        placeholder="Ex: UFSCar, UFRGS, UERJ..."
                        value={UNIVERSIDADE_SUGGESTIONS.includes(universidadeSonho) ? '' : universidadeSonho}
                        onChange={e => setUniversidadeSonho(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 focus:border-teal-700 focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                {/* Q3: ENEM antes */}
                {qIndex === 3 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">Você já fez o ENEM antes?</h3>
                      <p className="text-xs text-slate-500 mt-1">Queremos entender seu nível de familiaridade com a prova.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => { setPrestouAntes(true); setQIndex(4); }}
                        className={`p-5 rounded-xl border text-sm font-bold transition-all ${
                          prestouAntes === true
                            ? 'border-teal-700 bg-teal-50/85 text-teal-900'
                            : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        Sim
                      </button>
                      <button
                        type="button"
                        onClick={() => { setPrestouAntes(false); setQIndex(5); }}
                        className={`p-5 rounded-xl border text-sm font-bold transition-all ${
                          prestouAntes === false
                            ? 'border-teal-700 bg-teal-50/85 text-teal-900'
                            : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        Não
                      </button>
                    </div>
                  </div>
                )}

                {/* Q4: Média Aproximada */}
                {qIndex === 4 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">Qual foi sua média aproximada?</h3>
                      <p className="text-xs text-slate-500 mt-1">Informe a faixa aproximada do seu último ENEM.</p>
                    </div>
                    <div className="grid gap-2">
                      {['Nunca fiz', 'Menos de 500', '500–600', '600–700', '700–800', '800+'].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => { setMediaAproximada(opt); setQIndex(5); }}
                          className={`p-3.5 rounded-xl border text-xs font-bold text-left flex justify-between items-center transition-all ${
                            mediaAproximada === opt
                              ? 'border-teal-700 bg-teal-50/80 text-teal-900 font-black'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 font-semibold'
                          }`}
                        >
                          <span>{opt}</span>
                          {mediaAproximada === opt && <Check className="h-4 w-4 text-teal-700" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Q5: Nota Alvo Numero */}
                {qIndex === 5 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">Qual nota você quer alcançar?</h3>
                      <p className="text-xs text-slate-500 mt-1">Sua nota meta do ENEM (ex: 780).</p>
                    </div>
                    <input
                      type="number"
                      placeholder="Ex: 780"
                      min={300}
                      max={1000}
                      value={notaAlvoNumero}
                      onChange={e => setNotaAlvoNumero(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 focus:border-teal-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700 transition-all font-bold"
                    />
                  </div>
                )}

                {/* Q6: Dias da Semana Disponíveis (CHECKBOX LIST ESPECÍFICO) */}
                {qIndex === 6 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">Em quais dias da semana você tem disponibilidade?</h3>
                      <p className="text-xs text-slate-500 mt-1">Selecione os dias específicos para montarmos seu calendário.</p>
                    </div>
                    <div className="grid gap-2">
                      {DIAS_DA_SEMANA.map(day => {
                        const isSelected = availableDays.includes(day.id);
                        return (
                          <button
                            key={day.id}
                            type="button"
                            onClick={() => toggleDayAvailability(day.id)}
                            className={`p-3.5 rounded-xl border text-xs font-bold text-left flex items-center justify-between transition-all ${
                              isSelected
                                ? 'border-teal-700 bg-teal-50/40 text-teal-900 font-black shadow-2xs'
                                : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 font-semibold'
                            }`}
                          >
                            <span>{day.label}</span>
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                              isSelected ? 'border-teal-700 bg-teal-700 text-white' : 'border-slate-300 bg-white'
                            }`}>
                              {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Q7: Horas por Dia */}
                {qIndex === 7 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">Quantas horas por dia?</h3>
                      <p className="text-xs text-slate-500 mt-1">Tempo diário realista.</p>
                    </div>
                    <div className="grid gap-2">
                      {['1h', '2h', '3h', '4h', '5h+', 'Varia bastante'].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => { setHorasEstudoDia(opt); setQIndex(8); }}
                          className={`p-3.5 rounded-xl border text-xs font-bold text-left flex justify-between items-center transition-all ${
                            horasEstudoDia === opt
                              ? 'border-teal-700 bg-teal-50/80 text-teal-900 font-black'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 font-semibold'
                          }`}
                        >
                          <span>{opt}</span>
                          {horasEstudoDia === opt && <Check className="h-4 w-4 text-teal-700" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Q8: Matérias Dificuldade (Até 3) */}
                {qIndex === 8 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">Quais matérias você sente mais dificuldade?</h3>
                      <p className="text-xs text-slate-500 mt-1">Selecione até 4 matérias abaixo.</p>
                    </div>
                    <div className="grid gap-2">
                      {DIFICULDADES_LIST.map(subj => {
                        const isSelected = materiasDificuldade.includes(subj);
                        return (
                          <button
                            key={subj}
                            type="button"
                            onClick={() => toggleMateriaDificuldade(subj)}
                            className={`p-3.5 rounded-xl border text-xs font-bold text-left flex items-center justify-between transition-all ${
                              isSelected
                                ? 'border-rose-300 bg-rose-50/50 text-rose-950 font-black shadow-2xs'
                                : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 font-semibold'
                            }`}
                          >
                            <span>{subj}</span>
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                              isSelected ? 'border-rose-600 bg-rose-600 text-white' : 'border-slate-300 bg-white'
                            }`}>
                              {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Q9: Trabalha */}
                {qIndex === 9 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">Você trabalha?</h3>
                      <p className="text-xs text-slate-500 mt-1">Para sabermos a flexibilidade da rotina.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => { setTrabalha(true); setQIndex(10); }}
                        className={`p-5 rounded-xl border text-sm font-bold transition-all ${
                          trabalha === true
                            ? 'border-teal-700 bg-teal-50/85 text-teal-900 font-black'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 font-semibold'
                        }`}
                      >
                        Sim
                      </button>
                      <button
                        type="button"
                        onClick={() => { setTrabalha(false); setQIndex(10); }}
                        className={`p-5 rounded-xl border text-sm font-bold transition-all ${
                          trabalha === false
                            ? 'border-teal-700 bg-teal-50/85 text-teal-900'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        Não
                      </button>
                    </div>
                  </div>
                )}

                {/* Q10: Período estuda/trabalha */}
                {qIndex === 10 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">Em qual período você estuda ou trabalha?</h3>
                      <p className="text-xs text-slate-500 mt-1">Preenchimento de blocos de estudo livres.</p>
                    </div>
                    <div className="grid gap-2">
                      {['Manhã', 'Tarde', 'Noite', 'Integral'].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => { setPeriodoEstudoOrTrabalho(opt); setQIndex(11); }}
                          className={`p-3.5 rounded-xl border text-xs font-bold text-left flex justify-between items-center transition-all ${
                            periodoEstudoOrTrabalho === opt
                              ? 'border-teal-700 bg-teal-50/80 text-teal-900 font-black'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 font-semibold'
                          }`}
                        >
                          <span>{opt}</span>
                          {periodoEstudoOrTrabalho === opt && <Check className="h-4 w-4 text-teal-700" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Q11: Procrastinação */}
                {qIndex === 11 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">Você costuma procrastinar?</h3>
                      <p className="text-xs text-slate-500 mt-1">Ajuda a IA a definir metas semanais mais realistas.</p>
                    </div>
                    <div className="grid gap-2">
                      {['Muito', 'Um pouco', 'Quase nunca'].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => { setProcrastina(opt); setQIndex(12); }}
                          className={`p-3.5 rounded-xl border text-xs font-bold text-left flex justify-between items-center transition-all ${
                            procrastina === opt
                              ? 'border-teal-700 bg-teal-50/80 text-teal-900 font-black'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 font-semibold'
                          }`}
                        >
                          <span>{opt}</span>
                          {procrastina === opt && <Check className="h-4 w-4 text-teal-700" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Q12: Como aprende melhor */}
                {qIndex === 12 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">Como você aprende melhor?</h3>
                      <p className="text-xs text-slate-500 mt-1">Métodos preferidos.</p>
                    </div>
                    <div className="grid gap-2">
                      {['Videoaulas', 'Exercícios', 'Resumos', 'Flashcards', 'Leitura'].map(opt => {
                        const isSelected = preferenciaAprendizado.includes(opt);
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => togglePreferenciaAprendizado(opt)}
                            className={`p-3.5 rounded-xl border text-xs font-bold text-left flex items-center justify-between transition-all ${
                              isSelected
                                ? 'border-teal-700 bg-teal-50/70 text-teal-900 font-black'
                                : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <span>{opt}</span>
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                              isSelected ? 'border-teal-700 bg-teal-700 text-white' : 'border-slate-300 bg-white'
                            }`}>
                              {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Q13: Tempo de Foco */}
                {qIndex === 13 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">Quanto tempo você consegue manter o foco?</h3>
                      <p className="text-xs text-slate-500 mt-1">Isto definirá a divisão e tamanho das sessões de estudo.</p>
                    </div>
                    <div className="grid gap-2">
                      {['25 minutos', '50 minutos', '1h30', 'Mais de 2h'].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => { setTempoFoco(opt); setQIndex(14); }}
                          className={`p-3.5 rounded-xl border text-xs font-bold text-left flex justify-between items-center transition-all ${
                            tempoFoco === opt
                              ? 'border-teal-700 bg-teal-50/80 text-teal-900 font-black'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                          }`}
                        >
                          <span>{opt}</span>
                          {tempoFoco === opt && <Check className="h-4 w-4 text-teal-700" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Q14: Nome */}
                {qIndex === 14 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">Qual é seu nome?</h3>
                      <p className="text-xs text-slate-500 mt-1">Como podemos te chamar?</p>
                    </div>
                    <input
                      type="text"
                      placeholder="Ex: Lucas Mendes"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 focus:border-teal-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700 transition-all font-bold"
                    />
                  </div>
                )}

                {/* Q15: E-mail */}
                {qIndex === 15 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">E seu e-mail de acesso?</h3>
                      <p className="text-xs text-slate-500 mt-1">Necessário para salvar e recuperar sua trilha.</p>
                    </div>
                    <input
                      type="email"
                      placeholder="Ex: lucas@gmail.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 focus:border-teal-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700 transition-all"
                    />
                  </div>
                )}

                {/* Q16: Telefone Celular */}
                {qIndex === 16 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">Qual é o seu número de celular?</h3>
                      <p className="text-xs text-slate-500 mt-1">Usado para lembretes de estudo via WhatsApp.</p>
                    </div>
                    <div className="relative">
                      <Phone className="h-4 w-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        placeholder="Ex: (11) 98765-4321"
                        value={phone}
                        onChange={e => setPhone(formatPhoneNumber(e.target.value))}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50/50 pl-10 pr-4 py-3 text-sm text-slate-900 focus:border-teal-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700 transition-all font-bold"
                      />
                    </div>
                  </div>
                )}

                {/* ERROR FEEDBACK */}
                {errors && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 flex gap-2 items-center text-xs text-rose-800 font-semibold">
                    <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
                    <span>{errors}</span>
                  </div>
                )}

                {/* BOTTOM NAVIGATION ACTIONS */}
                <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors cursor-pointer font-extrabold"
                  >
                    Voltar
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-1.5 rounded-xl bg-teal-700 hover:bg-teal-800 px-5 py-2.5 text-xs font-bold text-white shadow-2xs transition-all cursor-pointer font-black"
                  >
                    <span>Avançar</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </div>
  );
};
