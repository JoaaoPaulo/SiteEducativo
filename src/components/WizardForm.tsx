import React, { useState } from 'react';
import { UserProfile, SubjectArea, SubjectDifficulty } from '../types';
import { ENEM_MATRIX_TOPICS } from '../data/enemData';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Calendar as CalendarIcon, 
  ShieldCheck, 
  Target, 
  BookOpen, 
  AlertCircle, 
  Search, 
  CheckSquare, 
  Square, 
  GraduationCap, 
  Briefcase, 
  Clock, 
  BrainCircuit, 
  Flame, 
  Award,
  ChevronRight
} from 'lucide-react';

interface WizardFormProps {
  onSubmit: (userProfile: UserProfile) => void;
  onCancel: () => void;
}

// Sugestões de cursos para a pergunta 2
const CURSO_SUGGESTIONS = [
  'Medicina',
  'Direito',
  'Engenharia de Software',
  'Engenharia Civil',
  'Engenharia Mecânica',
  'Psicologia',
  'Administração',
  'Enfermagem',
  'Odontologia',
  'Arquitetura e Urbanismo',
  'Ciência da Computação',
  'Medicina Veterinária',
  'Fisioterapia',
  'Nutrição',
  'Pedagogia',
  'Jornalismo',
  'Ciências Contábeis',
  'Relações Internacionais'
];

const MATERIAS_LIST = [
  'Matemática',
  'Física',
  'Química',
  'Biologia',
  'História',
  'Geografia',
  'Português',
  'Redação',
  'Inglês'
];

export const WizardForm: React.FC<WizardFormProps> = ({ onSubmit, onCancel }) => {
  // Question navigation state (1 to 18)
  const [qIndex, setQIndex] = useState<number>(1);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [errors, setErrors] = useState<string>('');

  // 18 Individual states
  const [objetivo, setObjetivo] = useState(''); // Q1
  const [curso, setCurso] = useState(''); // Q2
  const [cursoSuggestions, setCursoSuggestions] = useState<string[]>([]);
  const [notaAlvo, setNotaAlvo] = useState(''); // Q3
  const [examDate, setExamDate] = useState('2026-11-08'); // Q4
  const [tempoEstudoDia, setTempoEstudoDia] = useState(''); // Q5
  const [availableDays, setAvailableDays] = useState<string[]>(['seg', 'ter', 'qua', 'qui', 'sex']); // Q6
  const [nivelInicial, setNivelInicial] = useState(''); // Q7
  const [prestouAntes, setPrestouAntes] = useState<boolean | null>(null); // Q8
  const [notaAnterior, setNotaAnterior] = useState(''); // Q9
  const [materiasDificuldade, setMateriasDificuldade] = useState<string[]>([]); // Q10
  const [materiasDominio, setMateriasDominio] = useState<string[]>([]); // Q11
  const [trabalha, setTrabalha] = useState<boolean | null>(null); // Q12
  const [periodoEstudo, setPeriodoEstudo] = useState(''); // Q13
  const [preferenciaAprendizado, setPreferenciaAprendizado] = useState<string[]>([]); // Q14
  const [cumpreCronograma, setCumpreCronograma] = useState(''); // Q15
  const [maiorDesafio, setMaiorDesafio] = useState(''); // Q16
  const [name, setName] = useState(''); // Q17
  const [email, setEmail] = useState(''); // Q18

  // Helper mapping school subjects to ENEM topic IDs
  const getTopicIdsBySchoolSubject = (subjectName: string): string[] => {
    switch (subjectName) {
      case 'Matemática':
        return ['mat-01', 'mat-02', 'mat-03', 'mat-04', 'mat-05', 'mat-06', 'mat-07'];
      case 'Biologia':
        return ['nat-01', 'nat-02'];
      case 'Química':
        return ['nat-03', 'nat-04'];
      case 'Física':
        return ['nat-05', 'nat-06'];
      case 'História':
        return ['hum-01', 'hum-04'];
      case 'Geografia':
        return ['hum-02', 'hum-03'];
      case 'Português':
        return ['lin-01', 'lin-02'];
      case 'Redação':
        return ['red-01', 'red-02'];
      default:
        return [];
    }
  };

  // Map school subject selections to the structure expected by the old backend/generator
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
      'Português': 'Linguagens e Códigos',
      'Inglês': 'Linguagens e Códigos',
      'Redação': 'Redação Nota 1000'
    };

    // Set difficulties
    materiasDificuldade.forEach(subj => {
      const area = areaMapping[subj];
      if (area) {
        result[area] = 'Preciso de Muita Ajuda';
      }
    });

    // Set masteries
    materiasDominio.forEach(subj => {
      const area = areaMapping[subj];
      if (area) {
        result[area] = 'Domino Bem';
      }
    });

    return result;
  };

  // Calculate hoursPerWeek based on study hours/day and available days
  const calculateHoursPerWeek = (): number => {
    let hoursPerDay = 3; // Default 2-4h
    if (tempoEstudoDia === 'Menos de 2h') hoursPerDay = 1.5;
    else if (tempoEstudoDia === '2–4h') hoursPerDay = 3;
    else if (tempoEstudoDia === '4–6h') hoursPerDay = 5;
    else if (tempoEstudoDia === '6h+') hoursPerDay = 7;

    return Math.max(4, Math.round(hoursPerDay * availableDays.length));
  };

  // Validation before going next
  const validateCurrentQuestion = (): boolean => {
    setErrors('');
    switch (qIndex) {
      case 1:
        if (!objetivo) { setErrors('Selecione o seu objetivo principal.'); return false; }
        break;
      case 2:
        if (!curso.trim()) { setErrors('Digite ou escolha o curso desejado.'); return false; }
        break;
      case 3:
        if (!notaAlvo) { setErrors('Selecione uma faixa de nota.'); return false; }
        break;
      case 4:
        if (!examDate) { setErrors('Escolha uma data válida.'); return false; }
        const parsedDate = new Date(examDate);
        if (isNaN(parsedDate.getTime()) || parsedDate < new Date()) {
          setErrors('A data da prova precisa ser válida e no futuro.');
          return false;
        }
        break;
      case 5:
        if (!tempoEstudoDia) { setErrors('Selecione as horas diárias disponíveis.'); return false; }
        break;
      case 6:
        if (availableDays.length === 0) { setErrors('Selecione pelo menos um dia da semana.'); return false; }
        break;
      case 7:
        if (!nivelInicial) { setErrors('Selecione seu nível de partida.'); return false; }
        break;
      case 8:
        if (prestouAntes === null) { setErrors('Responda se já realizou o vestibular antes.'); return false; }
        break;
      case 9:
        // Optional question, but if they put invalid text, we can check it
        break;
      case 10:
        // Optional, but must not intersect heavily or we can just proceed
        break;
      case 11:
        // Check if there are common selections between Q10 and Q11
        const overlap = materiasDificuldade.filter(x => materiasDominio.includes(x));
        if (overlap.length > 0) {
          setErrors(`Uma matéria não pode estar nas duas listas ao mesmo tempo: ${overlap.join(', ')}`);
          return false;
        }
        break;
      case 12:
        if (trabalha === null) { setErrors('Responda se você trabalha atualmente.'); return false; }
        break;
      case 13:
        if (!periodoEstudo) { setErrors('Selecione o período em que estuda.'); return false; }
        break;
      case 14:
        if (preferenciaAprendizado.length === 0) { setErrors('Selecione pelo menos 1 formato de aprendizado.'); return false; }
        break;
      case 15:
        if (!cumpreCronograma) { setErrors('Responda sobre a consistência com cronogramas.'); return false; }
        break;
      case 16:
        if (!maiorDesafio) { setErrors('Selecione o seu maior desafio atual.'); return false; }
        break;
      case 17:
        if (!name.trim()) { setErrors('Por favor, informe seu nome.'); return false; }
        break;
      case 18:
        if (!email.trim() || !email.includes('@')) { setErrors('Por favor, digite um e-mail válido.'); return false; }
        break;
    }
    return true;
  };

  const handleNext = () => {
    if (validateCurrentQuestion()) {
      if (qIndex === 8 && prestouAntes === false) {
        // Skip question 9 if they haven't taken the exam before
        setQIndex(10);
      } else if (qIndex < 18) {
        setQIndex(prev => prev + 1);
      } else {
        // Show study profile summary screen
        setShowSummary(true);
      }
    }
  };

  const handleBack = () => {
    setErrors('');
    if (qIndex === 10 && prestouAntes === false) {
      // Go back to 8 instead of 9 if it was skipped
      setQIndex(8);
    } else if (qIndex > 1) {
      setQIndex(prev => prev - 1);
    } else {
      onCancel();
    }
  };

  const handleFinalSubmit = () => {
    // Generate mapped topic list for revision
    const finalStudiedTopicIds: string[] = [];
    materiasDominio.forEach(subject => {
      finalStudiedTopicIds.push(...getTopicIdsBySchoolSubject(subject));
    });

    const profile: UserProfile = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      examDate,
      hoursPerWeek: calculateHoursPerWeek(),
      availableDays,
      difficulties: mapSubjectDifficulties(),
      studiedTopicIds: finalStudiedTopicIds,
      isSubscribed: false,
      createdAt: new Date().toISOString(),

      // Save new extended fields
      objetivo,
      curso,
      notaAlvo,
      tempoEstudoDia,
      nivelInicial,
      prestouAntes: !!prestouAntes,
      notaAnterior,
      materiasDificuldade,
      materiasDominio,
      trabalha: !!trabalha,
      periodoEstudo,
      preferenciaAprendizado,
      cumpreCronograma,
      maiorDesafio
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

  const toggleDay = (day: string) => {
    if (availableDays.includes(day)) {
      setAvailableDays(availableDays.filter(d => d !== day));
    } else {
      setAvailableDays([...availableDays, day]);
    }
  };

  const toggleMateriaDificuldade = (subj: string) => {
    if (materiasDificuldade.includes(subj)) {
      setMateriasDificuldade(materiasDificuldade.filter(s => s !== subj));
    } else {
      setMateriasDificuldade([...materiasDificuldade, subj]);
      // Remove from mastery to avoid duplicate
      setMateriasDominio(materiasDominio.filter(s => s !== subj));
    }
  };

  const toggleMateriaDominio = (subj: string) => {
    if (materiasDominio.includes(subj)) {
      setMateriasDominio(materiasDominio.filter(s => s !== subj));
    } else {
      setMateriasDominio([...materiasDominio, subj]);
      // Remove from difficulty to avoid duplicate
      setMateriasDificuldade(materiasDificuldade.filter(s => s !== subj));
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
    if (qIndex <= 3) return { name: 'Etapa 1 — Objetivo', icon: <Target className="h-4 w-4 text-teal-600" /> };
    if (qIndex <= 6) return { name: 'Etapa 2 — Tempo', icon: <Clock className="h-4 w-4 text-teal-600" /> };
    if (qIndex <= 9) return { name: 'Etapa 3 — Nível', icon: <Award className="h-4 w-4 text-teal-600" /> };
    if (qIndex <= 11) return { name: 'Etapa 4 — Dificuldades', icon: <BrainCircuit className="h-4 w-4 text-teal-600" /> };
    if (qIndex <= 14) return { name: 'Etapa 5 — Perfil', icon: <Briefcase className="h-4 w-4 text-teal-600" /> };
    if (qIndex <= 16) return { name: 'Etapa 6 — Hábitos', icon: <Flame className="h-4 w-4 text-teal-600" /> };
    return { name: 'Etapa 7 — Perfil Final', icon: <GraduationCap className="h-4 w-4 text-teal-600" /> };
  };

  const currentEtapa = getEtapaHeader();

  // Days until exam calculation
  const getDaysUntilExam = () => {
    const diff = new Date(examDate).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
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
              Q{qIndex}/18
            </span>
          </div>
        )}

        {/* Progress Bar */}
        {!showSummary && (
          <div className="w-full h-1.5 bg-slate-200 rounded-full mb-8 overflow-hidden">
            <div 
              className="h-full bg-teal-600 transition-all duration-300 ease-out"
              style={{ width: `${(qIndex / 18) * 100}%` }}
            />
          </div>
        )}

        {/* Wizard Panel Card */}
        <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-md relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {showSummary ? (
              // STUDY PROFILE SUMMARY SCREEN (VALOR IMEDIATO)
              <motion.div
                key="summary"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center space-y-2">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 border border-teal-100 text-teal-700 shadow-2xs">
                    <GraduationCap className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">Seu Perfil de Estudante está pronto!</h2>
                  <p className="text-xs text-slate-500">
                    Analisamos suas respostas e estruturamos um plano de alta eficiência para você.
                  </p>
                </div>

                {/* Profile Grid Cards */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5 space-y-4 shadow-2xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-0.5">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">🎯 Objetivo</p>
                      <p className="text-sm font-extrabold text-slate-900 truncate">
                        {curso} ({objetivo})
                      </p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">📅 Dias até a prova</p>
                      <p className="text-sm font-extrabold text-teal-800">
                        {getDaysUntilExam()} dias
                      </p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">⏱ Tempo disponível</p>
                      <p className="text-sm font-extrabold text-slate-900">
                        {tempoEstudoDia} ({availableDays.length}d/semana)
                      </p>
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">⭐ Nota Alvo</p>
                      <p className="text-sm font-extrabold text-slate-900">
                        {notaAlvo}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-3 grid gap-3 text-xs">
                    <div>
                      <span className="font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded mr-2">
                        💪 Pontos Fortes
                      </span>
                      <span className="font-semibold text-slate-700">
                        {materiasDominio.length > 0 ? materiasDominio.join(', ') : 'Nenhum listado'}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded mr-2">
                        📚 Foco Principal
                      </span>
                      <span className="font-semibold text-slate-700">
                        {materiasDificuldade.length > 0 ? materiasDificuldade.join(', ') : 'Geral (peso oficial)'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-4 flex gap-3 items-start text-xs text-teal-950">
                  <Sparkles className="h-5 w-5 text-teal-700 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    Com base no seu perfil de <strong>{nivelInicial}</strong>, seu plano priorizará as matérias do edital que possuem maior incidência e peso para <strong>{curso}</strong>, acelerando seu estudo com revisões dinâmicas onde você já domina.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="w-full flex items-center justify-center gap-2 rounded-2xl bg-teal-700 hover:bg-teal-800 py-4 text-sm font-black text-white shadow-md shadow-teal-700/20 transition-all hover:-translate-y-0.5"
                >
                  <span>Desbloquear meu plano completo</span>
                  <Sparkles className="h-4 w-4" />
                </button>
              </motion.div>
            ) : (
              // 18 STEP QUESTIONS
              <motion.div
                key={qIndex}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.18 }}
                className="space-y-6"
              >
                {/* QUESTION WRAPPERS */}
                
                {/* Q1: Objetivo */}
                {qIndex === 1 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">1. Qual é seu principal objetivo?</h3>
                      <p className="text-xs text-slate-500 mt-1">Selecione o vestibular que você pretende realizar.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      {['ENEM', 'Fuvest', 'Unicamp', 'UEM', 'UFPR', 'Outro'].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => { setObjetivo(opt); setQIndex(2); }}
                          className={`p-3.5 rounded-xl border text-xs font-bold text-left transition-all ${
                            objetivo === opt
                              ? 'border-teal-700 bg-teal-50/80 text-teal-900 font-black'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 font-semibold'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Q2: Curso */}
                {qIndex === 2 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">2. Qual curso você quer fazer?</h3>
                      <p className="text-xs text-slate-500 mt-1">Digite a carreira dos seus sonhos.</p>
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
                    {cursoSuggestions.length > 0 && (
                      <div className="rounded-xl border border-slate-100 bg-white p-2 shadow-2xs max-h-[150px] overflow-y-auto space-y-1">
                        {cursoSuggestions.map(s => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => { setCurso(s); setCursoSuggestions([]); handleNext(); }}
                            className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium hover:bg-slate-100 text-slate-800 transition-colors"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Q3: Nota Alvo */}
                {qIndex === 3 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">3. Qual nota você precisa alcançar?</h3>
                      <p className="text-xs text-slate-500 mt-1">Selecione a faixa média do seu curso.</p>
                    </div>
                    <div className="grid gap-2">
                      {['Não sei', 'Até 650', '650–750', '750–850', '850+'].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => { setNotaAlvo(opt); setQIndex(4); }}
                          className={`p-3.5 rounded-xl border text-xs font-bold text-left flex justify-between items-center transition-all ${
                            notaAlvo === opt
                              ? 'border-teal-700 bg-teal-50/80 text-teal-900 font-black'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 font-semibold'
                          }`}
                        >
                          <span>{opt}</span>
                          {notaAlvo === opt && <Check className="h-4 w-4 text-teal-700" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Q4: Calendário Prova */}
                {qIndex === 4 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">4. Quando será sua prova?</h3>
                      <p className="text-xs text-slate-500 mt-1">Insira a data do exame para organizarmos o cronograma.</p>
                    </div>
                    <div className="relative">
                      <CalendarIcon className="h-4 w-4 text-slate-400 absolute left-3 top-3.5" />
                      <input
                        type="date"
                        value={examDate}
                        onChange={e => setExamDate(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50/50 pl-9 pr-4 py-3 text-sm text-slate-900 focus:border-teal-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700 transition-all"
                      />
                    </div>
                  </div>
                )}

                {/* Q5: Horas por Dia */}
                {qIndex === 5 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">5. Quantas horas você consegue estudar por dia?</h3>
                      <p className="text-xs text-slate-500 mt-1">Disponibilidade dedicada diariamente.</p>
                    </div>
                    <div className="grid gap-2">
                      {['Menos de 2h', '2–4h', '4–6h', '6h+'].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => { setTempoEstudoDia(opt); setQIndex(6); }}
                          className={`p-3.5 rounded-xl border text-xs font-bold text-left flex justify-between items-center transition-all ${
                            tempoEstudoDia === opt
                              ? 'border-teal-700 bg-teal-50/80 text-teal-900 font-black'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 font-semibold'
                          }`}
                        >
                          <span>{opt}</span>
                          {tempoEstudoDia === opt && <Check className="h-4 w-4 text-teal-700" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Q6: Dias Disponíveis */}
                {qIndex === 6 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">6. Em quais dias da semana você consegue estudar?</h3>
                      <p className="text-xs text-slate-500 mt-1">Marque os dias de estudo.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'seg', label: 'Segunda-feira' },
                        { id: 'ter', label: 'Terça-feira' },
                        { id: 'qua', label: 'Quarta-feira' },
                        { id: 'qui', label: 'Quinta-feira' },
                        { id: 'sex', label: 'Sexta-feira' },
                        { id: 'sab', label: 'Sábado' },
                        { id: 'dom', label: 'Domingo' }
                      ].map(d => {
                        const isSelected = availableDays.includes(d.id);
                        return (
                          <button
                            key={d.id}
                            type="button"
                            onClick={() => toggleDay(d.id)}
                            className={`p-3 rounded-xl border text-xs font-bold text-left flex items-center justify-between transition-all ${
                              isSelected
                                ? 'border-teal-700 bg-teal-50/70 text-teal-900 font-black'
                                : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 font-semibold'
                            }`}
                          >
                            <span>{d.label}</span>
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

                {/* Q7: Nível */}
                {qIndex === 7 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">7. Como você avalia seu nível?</h3>
                      <p className="text-xs text-slate-500 mt-1">Seu ponto de partida teórico.</p>
                    </div>
                    <div className="grid gap-2">
                      {['Iniciante', 'Intermediário', 'Avançado'].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => { setNivelInicial(opt); setQIndex(8); }}
                          className={`p-4 rounded-xl border text-xs font-bold text-left flex justify-between items-center transition-all ${
                            nivelInicial === opt
                              ? 'border-teal-700 bg-teal-50/80 text-teal-900 font-black'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 font-semibold'
                          }`}
                        >
                          <div>
                            <p className="font-extrabold">{opt}</p>
                            <p className="text-[10px] text-slate-500 font-normal mt-0.5">
                              {opt === 'Iniciante' && 'Necessito aprender a teoria básica do zero.'}
                              {opt === 'Intermediário' && 'Entendo a teoria, mas erro questões de nível médio.'}
                              {opt === 'Avançado' && 'Gostaria de focar em simulados e revisões ativas.'}
                            </p>
                          </div>
                          {nivelInicial === opt && <Check className="h-4 w-4 text-teal-700" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Q8: Prestou Antes */}
                {qIndex === 8 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">8. Você já prestou esse vestibular antes?</h3>
                      <p className="text-xs text-slate-500 mt-1">Queremos entender se você já tem experiência de prova.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => { setPrestouAntes(true); setQIndex(9); }}
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
                        onClick={() => { setPrestouAntes(false); setQIndex(10); }}
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

                {/* Q9: Nota Anterior */}
                {qIndex === 9 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">9. Se sim, qual foi sua nota?</h3>
                      <p className="text-xs text-slate-500 mt-1">Campo opcional. Ajuda a balizar os simulados.</p>
                    </div>
                    <input
                      type="text"
                      placeholder="Ex: 720 na média geral, ou nota por área"
                      value={notaAnterior}
                      onChange={e => setNotaAnterior(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 focus:border-teal-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700 transition-all"
                    />
                  </div>
                )}

                {/* Q10: Matérias Dificuldade */}
                {qIndex === 10 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">10. Quais matérias você tem mais dificuldade?</h3>
                      <p className="text-xs text-slate-500 mt-1">Seleção múltipla. Nestas matérias focaremos mais em teoria e revisão profunda.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {MATERIAS_LIST.map(subj => {
                        const isSelected = materiasDificuldade.includes(subj);
                        return (
                          <button
                            key={subj}
                            type="button"
                            onClick={() => toggleMateriaDificuldade(subj)}
                            className={`p-3 rounded-xl border text-xs font-bold text-left flex items-center justify-between transition-all ${
                              isSelected
                                ? 'border-rose-300 bg-rose-50/50 text-rose-950 shadow-2xs font-black'
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

                {/* Q11: Matérias Domínio */}
                {qIndex === 11 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">11. Quais matérias você domina melhor?</h3>
                      <p className="text-xs text-slate-500 mt-1">Nestas matérias, economizaremos tempo enviando listas de exercícios diretas de fixação.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {MATERIAS_LIST.map(subj => {
                        const isSelected = materiasDominio.includes(subj);
                        return (
                          <button
                            key={subj}
                            type="button"
                            onClick={() => toggleMateriaDominio(subj)}
                            className={`p-3 rounded-xl border text-xs font-bold text-left flex items-center justify-between transition-all ${
                              isSelected
                                ? 'border-emerald-300 bg-emerald-50/50 text-emerald-950 shadow-2xs font-black'
                                : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 font-semibold'
                            }`}
                          >
                            <span>{subj}</span>
                            {isSelected ? (
                              <CheckSquare className="h-4 w-4 text-emerald-600" />
                            ) : (
                              <Square className="h-4 w-4 text-slate-300" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Q12: Trabalha */}
                {qIndex === 12 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">12. Você trabalha?</h3>
                      <p className="text-xs text-slate-500 mt-1">Ajuste de densidade e ritmo da trilha.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => { setTrabalha(true); setQIndex(13); }}
                        className={`p-5 rounded-xl border text-sm font-bold transition-all ${
                          trabalha === true
                            ? 'border-teal-700 bg-teal-50/85 text-teal-900'
                            : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        Sim
                      </button>
                      <button
                        type="button"
                        onClick={() => { setTrabalha(false); setQIndex(13); }}
                        className={`p-5 rounded-xl border text-sm font-bold transition-all ${
                          trabalha === false
                            ? 'border-teal-700 bg-teal-50/85 text-teal-900'
                            : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                        }`}
                      >
                        Não
                      </button>
                    </div>
                  </div>
                )}

                {/* Q13: Período de Estudo */}
                {qIndex === 13 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">13. Você estuda em qual período?</h3>
                      <p className="text-xs text-slate-500 mt-1">Para envio de notificações e lembretes ativos.</p>
                    </div>
                    <div className="grid gap-2">
                      {['Manhã', 'Tarde', 'Noite', 'Não estudo'].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => { setPeriodoEstudo(opt); setQIndex(14); }}
                          className={`p-3.5 rounded-xl border text-xs font-bold text-left flex justify-between items-center transition-all ${
                            periodoEstudo === opt
                              ? 'border-teal-700 bg-teal-50/80 text-teal-900 font-black'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 font-semibold'
                          }`}
                        >
                          <span>{opt}</span>
                          {periodoEstudo === opt && <Check className="h-4 w-4 text-teal-700" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Q14: Como prefere aprender */}
                {qIndex === 14 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">14. Como você prefere aprender?</h3>
                      <p className="text-xs text-slate-500 mt-1">Selecione os formatos que melhor funcionam para você.</p>
                    </div>
                    <div className="grid gap-2">
                      {['Videoaulas', 'Exercícios', 'Leitura', 'Resumos', 'Flashcards'].map(opt => {
                        const isSelected = preferenciaAprendizado.includes(opt);
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => togglePreferenciaAprendizado(opt)}
                            className={`p-3 rounded-xl border text-xs font-bold text-left flex items-center justify-between transition-all ${
                              isSelected
                                ? 'border-teal-700 bg-teal-50/70 text-teal-900 font-black'
                                : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 font-semibold'
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

                {/* Q15: Cumpre Cronograma */}
                {qIndex === 15 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">15. Você costuma cumprir seu cronograma?</h3>
                      <p className="text-xs text-slate-500 mt-1">Isto influenciará a frequência de revisões e alertas.</p>
                    </div>
                    <div className="grid gap-2">
                      {['Sempre', 'Às vezes', 'Quase nunca'].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => { setCumpreCronograma(opt); setQIndex(16); }}
                          className={`p-3.5 rounded-xl border text-xs font-bold text-left flex justify-between items-center transition-all ${
                            cumpreCronograma === opt
                              ? 'border-teal-700 bg-teal-50/80 text-teal-900 font-black'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 font-semibold'
                          }`}
                        >
                          <span>{opt}</span>
                          {cumpreCronograma === opt && <Check className="h-4 w-4 text-teal-700" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Q16: Maior Desafio */}
                {qIndex === 16 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">16. Qual é seu maior desafio hoje?</h3>
                      <p className="text-xs text-slate-500 mt-1">Para focarmos na superação desse obstáculo.</p>
                    </div>
                    <div className="grid gap-2">
                      {[
                        'Falta de organização',
                        'Não sei por onde começar',
                        'Procrastinação',
                        'Pouco tempo',
                        'Conteúdo muito grande'
                      ].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => { setMaiorDesafio(opt); setQIndex(17); }}
                          className={`p-3.5 rounded-xl border text-xs font-bold text-left flex justify-between items-center transition-all ${
                            maiorDesafio === opt
                              ? 'border-teal-700 bg-teal-50/80 text-teal-900 font-black'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 font-semibold'
                          }`}
                        >
                          <span>{opt}</span>
                          {maiorDesafio === opt && <Check className="h-4 w-4 text-teal-700" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Q17: Nome */}
                {qIndex === 17 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">17. Qual é seu nome?</h3>
                      <p className="text-xs text-slate-500 mt-1">Como podemos te chamar?</p>
                    </div>
                    <input
                      type="text"
                      placeholder="Ex: João Paulo Campiolo"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 focus:border-teal-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700 transition-all"
                    />
                  </div>
                )}

                {/* Q18: E-mail */}
                {qIndex === 18 && (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900">18. E seu e-mail de acesso?</h3>
                      <p className="text-xs text-slate-500 mt-1">Necessário para salvar seu plano na nuvem.</p>
                    </div>
                    <input
                      type="email"
                      placeholder="Ex: joaopaulo@gmail.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50/50 px-4 py-3 text-sm text-slate-900 focus:border-teal-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-teal-700 transition-all"
                    />
                    <p className="text-[10px] text-slate-400 flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
                      Não compartilhamos suas informações.
                    </p>
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
