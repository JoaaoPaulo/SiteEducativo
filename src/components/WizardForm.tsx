import React, { useState } from 'react';
import { UserProfile, SubjectArea, SubjectDifficulty } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Check, 
  Sparkles, 
  Calendar as CalendarIcon, 
  ShieldCheck, 
  Target, 
  Clock, 
  BrainCircuit, 
  Flame, 
  Award,
  ChevronRight,
  BookOpen,
  HelpCircle,
  PlayCircle,
  FileText,
  Search,
  GraduationCap,
  CheckSquare,
  Square,
  AlertCircle
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
  'Outro'
];

const UNIVERSIDADE_SUGGESTIONS = [
  'USP',
  'UFMG',
  'UFPR',
  'UEM',
  'UFRJ',
  'Não sei ainda'
];

const DIFICULDADES_LIST = [
  'Matemática',
  'Linguagens',
  'Ciências Humanas',
  'Ciências da Natureza',
  'Redação'
];

export const WizardForm: React.FC<WizardFormProps> = ({ onSubmit, onCancel }) => {
  // Navigation state (1 to 15)
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
  const [diasSemanaEstudo, setDiasSemanaEstudo] = useState<number | null>(null); // Q6
  const [horasEstudoDia, setHorasEstudoDia] = useState(''); // Q7
  const [materiasDificuldade, setMateriasDificuldade] = useState<string[]>([]); // Q8
  const [trabalha, setTrabalha] = useState<boolean | null>(null); // Q9
  const [periodoEstudoOrTrabalho, setPeriodoEstudoOrTrabalho] = useState(''); // Q10
  const [procrastina, setProcrastina] = useState(''); // Q11
  const [preferenciaAprendizado, setPreferenciaAprendizado] = useState<string[]>([]); // Q12
  const [tempoFoco, setTempoFoco] = useState(''); // Q13
  const [name, setName] = useState(''); // Q14
  const [email, setEmail] = useState(''); // Q15

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
      'Ciências da Natureza': 'Ciências da Natureza',
      'Ciências Humanas': 'Ciências Humanas',
      'Linguagens': 'Linguagens e Códigos',
      'Redação': 'Redação Nota 1000'
    };

    // Mark selected as difficulty
    materiasDificuldade.forEach(subj => {
      const area = areaMapping[subj];
      if (area) {
        result[area] = 'Preciso de Muita Ajuda';
      }
    });

    // Mark non-selected as Domino Bem (if they are not difficulties, they are strengths)
    Object.keys(areaMapping).forEach(subj => {
      if (!materiasDificuldade.includes(subj)) {
        const area = areaMapping[subj];
        if (area && result[area] !== 'Preciso de Muita Ajuda') {
          result[area] = 'Domino Bem';
        }
      }
    });

    return result;
  };

  // Convert diasSemanaEstudo number to short availableDays array
  const getAvailableDaysArray = (): string[] => {
    const days = diasSemanaEstudo || 5;
    const map = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'];
    return map.slice(0, days);
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

    const days = diasSemanaEstudo || 5;
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
        if (diasSemanaEstudo === null) { setErrors('Selecione quantos dias por semana você pode estudar.'); return false; }
        break;
      case 7:
        if (!horasEstudoDia) { setErrors('Selecione as horas de estudo por dia.'); return false; }
        break;
      case 8:
        if (materiasDificuldade.length === 0) { setErrors('Selecione pelo menos 1 matéria.'); return false; }
        if (materiasDificuldade.length > 3) { setErrors('Selecione no máximo 3 matérias.'); return false; }
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
    }
    return true;
  };

  const handleNext = () => {
    if (validateCurrentQuestion()) {
      if (qIndex === 3 && prestouAntes === false) {
        // Skip question 4 if they haven't taken the ENEM before
        setQIndex(5);
      } else if (qIndex < 15) {
        setQIndex(prev => prev + 1);
      } else {
        // Show study profile summary screen
        setShowSummary(true);
      }
    }
  };

  const handleBack = () => {
    setErrors('');
    if (qIndex === 5 && prestouAntes === false) {
      // Go back to 3 instead of 4 if skipped
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
      examDate: '2026-11-08', // Default to next official ENEM date
      hoursPerWeek: calculateHoursPerWeek(),
      availableDays: getAvailableDaysArray(),
      difficulties: mapSubjectDifficulties(),
      studiedTopicIds: [],
      isSubscribed: false,
      createdAt: new Date().toISOString(),

      // Save custom fields
      curso,
      universidadeSonho,
      prestouAntes: !!prestouAntes,
      mediaAproximada,
      notaAlvoNumero: Number(notaAlvoNumero),
      diasSemanaEstudo: diasSemanaEstudo || 5,
      horasEstudoDia,
      materiasDificuldade,
      trabalha: !!trabalha,
      periodoEstudoOrTrabalho,
      procrastina,
      preferenciaAprendizado,
      tempoFoco
    };

    onSubmit(profile);
  };

  // Handlers for lists
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

  const toggleMateriaDificuldade = (subj: string) => {
    if (materiasDificuldade.includes(subj)) {
      setMateriasDificuldade(materiasDificuldade.filter(s => s !== subj));
    } else {
      if (materiasDificuldade.length < 3) {
        setMateriasDificuldade([...materiasDificuldade, subj]);
      } else {
        setErrors('Você pode selecionar no máximo 3 matérias.');
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

  // Get Etapa name and icon based on QIndex
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

  // Helper to find strengths (best subjects)
  const getMelhorMateria = (): string => {
    const strengths = DIFICULDADES_LIST.filter(x => !materiasDificuldade.includes(x));
    return strengths[0] || 'Redação';
  };

  // Helper to find initial priorities
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
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
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

            <span className="text-[11px] font-bold font-mono text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100">
              Q{qIndex}/15
            </span>
          </div>
        )}

        {/* Progress Bar */}
        {!showSummary && (
          <div className="w-full h-1.5 bg-slate-200 rounded-full mb-8 overflow-hidden">
            <div 
              className="h-full bg-teal-600 transition-all duration-300 ease-out"
              style={{ width: `${(qIndex / 15) * 100}%` }}
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 border border-teal-100 text-teal-700 shadow-2xs">
                    <GraduationCap className="h-8 w-8 text-teal-700" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">Seu Perfil ENEM está pronto!</h2>
                  <p className="text-xs text-slate-500">
                    Com base nas suas respostas, montamos um plano personalizado para maximizar suas chances de aprovação.
                  </p>
                </div>

                {/* Profile Grid Cards */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 space-y-4 shadow-2xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-0.5">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">🎯 Curso</p>
                      <p className="text-sm font-extrabold text-slate-900 truncate">
                        {curso}
                      </p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">📈 Meta</p>
                      <p className="text-sm font-extrabold text-teal-800">
                        {notaAlvoNumero} pontos
                      </p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">⏳ Tempo disponível</p>
                      <p className="text-sm font-extrabold text-slate-900">
                        {horasEstudoDia === 'Varia bastante' ? 'Horários Flexíveis' : `${horasEstudoDia} por dia`}
                      </p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">🏛️ Alvo</p>
                      <p className="text-sm font-extrabold text-slate-900 truncate">
                        {universidadeSonho}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-3 grid gap-3 text-xs">
                    <div>
                      <span className="font-bold text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded mr-2">
                        📚 Maior Dificuldade
                      </span>
                      <span className="font-semibold text-slate-700">
                        {materiasDificuldade.join(', ')}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded mr-2">
                        💪 Melhor Matéria
                      </span>
                      <span className="font-semibold text-slate-700">
                        {getMelhorMateria()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Priority Section */}
                <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-4 space-y-2">
                  <p className="text-xs font-bold text-teal-900 flex items-center gap-1.5">
                    <Flame className="h-4 w-4 text-teal-700" />
                    <span>🔥 Prioridade Inicial da Trilha:</span>
                  </p>
                  <ul className="text-xs text-teal-950 font-semibold list-disc pl-5 space-y-1">
                    {getPrioridadeInicial().map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </div>

                <div className="text-center">
                  <p className="text-xs text-slate-500 font-bold mb-3">Seu plano de estudos já está pronto.</p>
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-teal-700 hover:bg-teal-800 py-4 text-sm font-black text-white shadow-md shadow-teal-700/20 transition-all hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Desbloquear meu plano completo</span>
                    <Sparkles className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ) : (
              // 15 STEP QUESTIONS
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
                  <div className="space-y-4">
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
                    
                    <div className="flex flex-wrap gap-1.5">
                      {CURSO_SUGGESTIONS.map(s => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => { setCurso(s); setCursoSuggestions([]); setQIndex(2); }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                            curso === s
                              ? 'bg-teal-700 text-white border-teal-700'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
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
                    <div className="grid grid-cols-2 gap-2">
                      {UNIVERSIDADE_SUGGESTIONS.map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => { setUniversidadeSonho(opt); setQIndex(3); }}
                          className={`p-3.5 rounded-xl border text-xs font-bold text-left transition-all ${
                            universidadeSonho === opt
                              ? 'border-teal-700 bg-teal-50/80 text-teal-900 font-black'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 font-semibold'
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

                {/* Q6: Dias de Estudo */}
                {qIndex === 6 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">Quantos dias por semana você consegue estudar?</h3>
                      <p className="text-xs text-slate-500 mt-1">Frequência semanal dedicada aos estudos.</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[2, 3, 4, 5, 6, 7].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => { setDiasSemanaEstudo(opt); setQIndex(7); }}
                          className={`p-4 rounded-xl border text-xs font-bold text-center transition-all ${
                            diasSemanaEstudo === opt
                              ? 'border-teal-700 bg-teal-50/80 text-teal-900 font-black'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 font-semibold'
                          }`}
                        >
                          {opt} dias
                        </button>
                      ))}
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
                      <p className="text-xs text-slate-500 mt-1">Selecione até 3 áreas abaixo.</p>
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
                            {isSelected ? (
                              <CheckSquare className="h-4 w-4 text-rose-600" />
                            ) : (
                              <Square className="h-4 w-4 text-slate-300" />
                            )}
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
                            className={`p-3 rounded-xl border text-xs font-bold text-left flex items-center justify-between transition-all ${
                              isSelected
                                ? 'border-teal-700 bg-teal-50/70 text-teal-900 font-black'
                                : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                            }`}
                          >
                            <span>{opt}</span>
                            {isSelected ? (
                              <CheckSquare className="h-4 w-4 text-teal-700" />
                            ) : (
                              <Square className="h-4 w-4 text-slate-300" />
                            )}
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
                    className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
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
