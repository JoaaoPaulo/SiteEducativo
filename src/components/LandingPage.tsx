import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw, 
  AlertCircle, 
  Zap, 
  Star, 
  ChevronRight, 
  Video, 
  FileText, 
  Edit3, 
  MessageSquare,
  Calendar,
  TrendingUp,
  Award,
  Users,
  Check,
  X,
  GraduationCap,
  Clock,
  Lock
} from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onStartWizard: () => void;
}

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

const CountUp: React.FC<CountUpProps> = ({ end, duration = 1200, prefix = '', suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [startCount, setStartCount] = useState(false);
  const ref = React.useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startCount) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [startCount, end, duration]);

  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return <span ref={ref}>{prefix}{formatNumber(count)}{suffix}</span>;
};


export const LandingPage: React.FC<LandingPageProps> = ({ onStartWizard }) => {
  const [activeDemoTab, setActiveDemoTab] = useState<'dashboard' | 'weekly' | 'calendar' | 'ai' | 'evolution'>('dashboard');
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div className="min-h-screen bg-surface text-ink flex flex-col selection:bg-blue-600 selection:text-white relative overflow-hidden bg-grad-superficie">
      
      {/* Background Decorative Blur Spheres - reduced opacity to keep it premium and simple */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[400px] h-[400px] rounded-full bg-blue-600/3 blur-[100px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-16 px-4 sm:px-6 lg:px-8 border-b border-line">
        <div className="mx-auto max-w-4xl relative z-10">
          
          {/* Main Headline */}
          <div className="text-center mb-10">
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-extrabold tracking-tight sm:text-5xl text-ink leading-tight font-display"
            >
              Um plano de estudos que se <span className="text-blue-600">refaz sozinho.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-4 text-base sm:text-lg text-muted max-w-2xl mx-auto font-medium"
            >
              Responda três perguntas e receba um plano feito para o seu objetivo, o seu tempo e as suas lacunas. A cada semana, ele muda com você.
            </motion.p>
          </div>

          {/* Clean 3-Part Answer Grid (O que é? Para quem é? Por que é melhor?) */}
          <div className="grid gap-6 md:grid-cols-3 mb-10">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white border border-line p-5 rounded-[10px] shadow-xs text-left"
            >
              <div className="flex items-center gap-2 mb-2 text-blue-600">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-widest block">O que é?</span>
              </div>
              <h3 className="font-extrabold text-sm text-ink mb-1.5 font-display">Plano sob medida</h3>
              <p className="text-xs text-muted leading-relaxed">
                Um plano de estudos dinâmico estruturado para o seu tempo livre e lacunas, cobrindo exatamente o edital do ENEM.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white border border-line p-5 rounded-[10px] shadow-xs text-left"
            >
              <div className="flex items-center gap-2 mb-2 text-blue-600">
                <Users className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-widest block">Para quem é?</span>
              </div>
              <h3 className="font-extrabold text-sm text-ink mb-1.5 font-display">Para quem tem pressa</h3>
              <p className="text-xs text-muted leading-relaxed">
                Feito para quem concilia escola, cursinho ou trabalho e não pode perder nenhuma hora com estudos ineficientes.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white border border-line p-5 rounded-[10px] shadow-xs text-left"
            >
              <div className="flex items-center gap-2 mb-2 text-blue-600">
                <RefreshCw className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-widest block">Por que é melhor?</span>
              </div>
              <h3 className="font-extrabold text-sm text-ink mb-1.5 font-display">Reorganização sem culpa</h3>
              <p className="text-xs text-muted leading-relaxed">
                Perdeu o dia de ontem? O plano se reorganiza e redistribui as sessões automaticamente, sem acumular matérias ou gerar culpa.
              </p>
            </motion.div>
          </div>

          {/* Primary & Secondary CTAs (Page 72) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <button
              onClick={onStartWizard}
              className="w-full sm:w-auto h-12 px-6 rounded-[10px] bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-98 text-white font-semibold text-sm transition-all duration-120 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Criar meu plano — grátis</span>
              <ArrowRight className="h-4 w-4 stroke-[2]" />
            </button>
            <a
              href="#como-funciona"
              className="w-full sm:w-auto h-12 px-6 rounded-[10px] bg-white border border-line text-ink hover:bg-slate-50 font-semibold text-sm active:scale-98 transition-all duration-120 flex items-center justify-center cursor-pointer"
            >
              Ver como funciona
            </a>
          </motion.div>

        </div>
      </section>

      {/* METRICS SECTION */}
      <section className="py-12 bg-slate-50/50 border-b border-line px-4">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-2xl border border-line bg-white shadow-2xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-600">
                <CountUp end={1000} prefix="+" />
              </div>
              <div className="text-xs text-muted font-semibold mt-1">Questões Resolvidas (Meta Mínima)</div>
            </div>
            <div className="p-4 rounded-[10px] border border-line bg-white shadow-2xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-600">
                <CountUp end={50} />
              </div>
              <div className="text-xs text-muted font-semibold mt-1">Disciplinas e Mapas Mentais</div>
            </div>
            <div className="p-4 rounded-[10px] border border-line bg-white shadow-2xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-600">
                <CountUp end={100} suffix="%" />
              </div>
              <div className="text-xs text-muted font-semibold mt-1">Personalizado p/ sua Meta</div>
            </div>
            <div className="p-4 rounded-[10px] border border-line bg-white shadow-2xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-600">
                <CountUp end={24} suffix="h" />
              </div>
              <div className="text-xs text-muted font-semibold mt-1">Suporte Tira-Dúvidas 24h</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: COMO FUNCIONA EM 3 PASSOS (INTERATIVO) */}
      <section id="como-funciona" className="px-4 py-20 sm:px-6 lg:px-8 border-b border-line bg-grad-superficie">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 font-display">Simplicidade Extrema</h2>
            <p className="text-3xl font-black text-ink sm:text-5xl mt-3 font-display">
              Como funciona o sistema?
            </p>
            <p className="text-muted text-sm sm:text-base mt-2">
              Em menos de 3 minutos, você sai do absoluto zero com um plano de estudos blindado
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-12 items-stretch mt-8">
            
            {/* Step Selection Triggers */}
            <div className="md:col-span-5 flex flex-col justify-center gap-4">
              {[
                {
                  id: 0,
                  num: '01',
                  title: 'Conte seu objetivo',
                  desc: 'Curso, prova e data. Três perguntas, dois minutos.'
                },
                {
                  id: 1,
                  num: '02',
                  title: 'Receba o plano',
                  desc: 'Ordem, duração e motivo de cada sessão — para hoje e para a semana.'
                },
                {
                  id: 2,
                  num: '03',
                  title: 'Estude e siga',
                  desc: 'Cada resposta ajusta o que vem depois. Você não precisa refazer nada.'
                }
              ].map(s => {
                const isActive = activeStep === s.id;
                return (
                  <div
                    key={s.id}
                    onMouseEnter={() => setActiveStep(s.id)}
                    onClick={() => setActiveStep(s.id)}
                    className={`p-5 rounded-[10px] border transition-all duration-300 text-left cursor-pointer ${
                      isActive 
                        ? 'border-blue-600/30 bg-blue-600/5 shadow-xs' 
                        : 'border-line bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs font-black px-2 py-0.5 rounded-[4px] ${
                        isActive ? 'bg-blue-600/15 text-blue-600' : 'bg-slate-100 text-muted'
                      }`}>{s.num}</span>
                      <h3 className={`font-black text-sm ${isActive ? 'text-ink font-display' : 'text-muted font-display'}`}>{s.title}</h3>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">{s.desc}</p>
                  </div>
                );
              })}
            </div>

            {/* Dynamic Visual Showcase */}
            <div className="md:col-span-7 flex flex-col justify-center">
              <div className="rounded-3xl p-6 min-h-[280px] flex flex-col justify-between border border-line bg-white shadow-lg relative overflow-hidden text-ink">
                <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-blue-500/5 blur-xl pointer-events-none" />
                
                {/* Step 1 Visual content */}
                {activeStep === 0 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-line pb-3">
                      <span className="text-xs font-bold text-muted">Questionário Inteligente</span>
                      <span className="text-[10px] bg-blue-100 text-blue-700 border border-blue-200 px-2 py-0.5 rounded font-black">Meta: 800+</span>
                    </div>

                    <div className="space-y-3 text-left">
                      <div className="bg-slate-50 p-3.5 rounded-xl border border-line">
                        <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Qual seu curso dos sonhos?</label>
                        <div className="flex items-center justify-between mt-1 text-sm font-bold text-ink bg-white border border-line px-3 py-2 rounded-lg">
                          <span>Medicina</span>
                          <Check className="h-4 w-4 text-blue-600 stroke-[3]" />
                        </div>
                      </div>

                      <div className="bg-slate-50 p-3.5 rounded-xl border border-line">
                        <label className="text-[10px] font-bold text-muted uppercase tracking-wider">Quantas horas você tem por dia?</label>
                        <div className="flex gap-2 mt-1.5">
                          {['2h', '3h', '4h+', 'Sem tempo'].map((h, i) => (
                            <span key={i} className={`text-xs px-3 py-1 rounded-md border font-extrabold ${
                              h === '3h' ? 'border-blue-600 text-blue-600 bg-blue-50' : 'border-line text-muted'
                            }`}>{h}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2 Visual content */}
                {activeStep === 1 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4 text-left"
                  >
                    <div className="flex items-center justify-between border-b border-line pb-3">
                      <span className="text-xs font-bold text-muted">Plano Gerado em Tempo Real</span>
                      <span className="text-[10px] bg-blue-100 text-blue-700 border border-blue-200 px-2 py-0.5 rounded font-black">Pronto</span>
                    </div>

                    <div className="space-y-2.5">
                      <div className="bg-slate-50 border border-line p-3 rounded-[10px] flex items-center justify-between">
                        <div>
                          <span className="text-[9px] text-muted font-bold uppercase block">SEGUNDA-FEIRA</span>
                          <span className="text-xs font-black text-ink">Razão, Proporção e Regra de Três</span>
                        </div>
                        <span className="text-[9px] bg-blue-100 border border-blue-200 text-blue-700 px-2 py-0.5 rounded font-bold">Alta Incidência</span>
                      </div>

                      <div className="bg-slate-50 border border-line p-3 rounded-[10px] flex items-center justify-between">
                        <div>
                          <span className="text-[9px] text-muted font-bold uppercase block">TERÇA-FEIRA</span>
                          <span className="text-xs font-black text-ink">Cadeias Alimentares e Ecologia</span>
                        </div>
                        <span className="text-[9px] bg-blue-100 border border-blue-200 text-blue-700 px-2 py-0.5 rounded font-bold">Alta Incidência</span>
                      </div>

                      <div className="bg-slate-50/40 border border-line p-3 rounded-[10px] flex items-center justify-between opacity-50">
                        <div>
                          <span className="text-[9px] text-muted font-bold uppercase block">QUARTA-FEIRA</span>
                          <span className="text-xs font-black text-muted">Calorimetria & Térmica</span>
                        </div>
                        <span className="text-[9px] bg-slate-100 text-muted px-2 py-0.5 rounded font-bold">Estratégico</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3 Visual content */}
                {activeStep === 2 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4 text-left"
                  >
                    <div className="flex items-center justify-between border-b border-line pb-3">
                      <span className="text-xs font-bold text-muted">Acompanhamento de Consistência</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-black">Em Curso</span>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-slate-50 border border-line p-3 rounded-[10px] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600" />
                          <span className="text-xs text-ink">Meta diária cumprida!</span>
                        </div>
                        <span className="text-xs font-bold text-muted">100% concluído</span>
                      </div>

                      <div className="bg-amber-50 border border-amber-200 p-3 rounded-[10px] flex items-start gap-2.5">
                        <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-[10px] font-black text-amber-700 block uppercase">Reorganização Ativa</span>
                          <span className="text-[10.5px] text-slate-600 leading-relaxed block mt-0.5">
                            Você não pôde estudar ontem. O plano remanejou a tarefa de Calorimetria para o sábado, mantendo a carga da semana equilibrada.
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Simulated interactive trigger help text */}
                <div className="mt-4 text-[10px] text-muted text-center italic border-t border-line pt-2.5">
                  Passe o mouse ou toque nas etapas para simular o funcionamento
                </div>
              </div>
            </div>

          </div>

          {/* Prominent Step CTA */}
          <div className="mt-14 text-center">
            <button
              onClick={onStartWizard}
              className="w-full sm:w-auto h-12 px-6 rounded-[10px] bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-98 text-white font-semibold text-sm transition-all duration-120 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Criar meu plano — grátis</span>
              <ArrowRight className="h-4 w-4 stroke-[2]" />
            </button>
          </div>
        </div>
      </section>

      {/* PRODUCT SHOWCASE (Mostrar o Produto) */}
      <section id="produto" className="px-4 py-20 sm:px-6 lg:px-8 border-b border-line bg-surface">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 font-display">Visualização em Tempo Real</h2>
            <p className="text-3xl font-black text-ink sm:text-5xl mt-3 font-display">
              Explore o STDY por dentro
            </p>
            <p className="text-muted text-sm sm:text-base mt-2">
              Nossa interface foi projetada para ser limpa, clara e focada no que importa.
            </p>
          </div>

          {/* Interactive Showcase Component */}
          <div className="rounded-[16px] border border-line bg-white p-1 md:p-2 shadow-2xl relative overflow-hidden text-ink">
            
            {/* Tab Selectors */}
            <div className="flex flex-wrap border-b border-line p-2 gap-1.5 md:gap-2">
              <button
                onClick={() => setActiveDemoTab('dashboard')}
                className={`flex-1 min-w-[120px] text-xs font-bold py-3 px-4 rounded-[10px] transition-all cursor-pointer ${
                  activeDemoTab === 'dashboard'
                    ? 'bg-slate-100 text-ink border border-line shadow-xs font-black'
                    : 'text-muted hover:bg-slate-50 hover:text-ink'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  <span>Hoje</span>
                </div>
              </button>
              <button
                onClick={() => setActiveDemoTab('weekly')}
                className={`flex-1 min-w-[120px] text-xs font-bold py-3 px-4 rounded-[10px] transition-all cursor-pointer ${
                  activeDemoTab === 'weekly'
                    ? 'bg-slate-100 text-ink border border-line shadow-xs font-black'
                    : 'text-muted hover:bg-slate-50 hover:text-ink'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span>Meu plano</span>
                </div>
              </button>
              <button
                onClick={() => setActiveDemoTab('calendar')}
                className={`flex-1 min-w-[120px] text-xs font-bold py-3 px-4 rounded-[10px] transition-all cursor-pointer ${
                  activeDemoTab === 'calendar'
                    ? 'bg-slate-100 text-ink border border-line shadow-xs font-black'
                    : 'text-muted hover:bg-slate-50 hover:text-ink'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span>Reorganização</span>
                </div>
              </button>
              <button
                onClick={() => setActiveDemoTab('ai')}
                className={`flex-1 min-w-[120px] text-xs font-bold py-3 px-4 rounded-[10px] transition-all cursor-pointer ${
                  activeDemoTab === 'ai'
                    ? 'bg-slate-100 text-ink border border-line shadow-xs font-black'
                    : 'text-muted hover:bg-slate-50 hover:text-ink'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <MessageSquare className="h-4 w-4 text-blue-600" />
                  <span>Tira-Dúvidas</span>
                </div>
              </button>
              <button
                onClick={() => setActiveDemoTab('evolution')}
                className={`flex-1 min-w-[120px] text-xs font-bold py-3 px-4 rounded-[10px] transition-all cursor-pointer ${
                  activeDemoTab === 'evolution'
                    ? 'bg-slate-100 text-ink border border-line shadow-xs font-black'
                    : 'text-muted hover:bg-slate-50 hover:text-ink'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Award className="h-4 w-4 text-blue-600" />
                  <span>Evolução</span>
                </div>
              </button>
            </div>

            {/* Active Demo Window */}
            <div className="p-4 md:p-8 min-h-[350px] bg-slate-50/50 rounded-b-[16px] text-ink">
              {activeDemoTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Dashboard Mockup */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-line pb-4">
                    <div>
                      <h4 className="text-lg font-bold text-ink font-display">Olá, Joshua</h4>
                      <p className="text-xs text-muted">Meta: Medicina (USP) • Faltam 95 dias para o ENEM</p>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-xl">
                      <Zap className="h-4 w-4 text-blue-600 fill-blue-600" />
                      <span className="text-xs font-bold text-blue-700">5 dias de ofensiva!</span>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="bg-white border border-line p-4 rounded-xl">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-muted">Progresso Geral</div>
                      <div className="text-2xl font-black text-ink mt-1">64%</div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '64%' }}></div>
                      </div>
                    </div>
                    <div className="bg-white border border-line p-4 rounded-xl">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-muted">Meta da Semana</div>
                      <div className="text-2xl font-black text-ink mt-1">9 / 12h</div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
                        <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div className="bg-white border border-line p-4 rounded-xl">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-muted">Respostas Corretas</div>
                      <div className="text-2xl font-black text-ink mt-1">82.4%</div>
                      <div className="text-[10px] text-blue-600 mt-2 font-medium">Acima da média de corte (800+)</div>
                    </div>
                  </div>

                  {/* Task Card */}
                  <div className="bg-white border border-line p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
                    <div>
                      <div className="inline-block text-[9px] font-extrabold bg-blue-50 border border-blue-200 px-2 py-0.5 rounded text-blue-700 mb-1">
                        TAREFA DE HOJE • ALTA INCIDÊNCIA
                      </div>
                      <h5 className="font-extrabold text-sm text-ink font-display">Termodinâmica e Calorimetria</h5>
                      <p className="text-xs text-muted mt-0.5">Física • 50 minutos • Videoaula + 10 questões</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 self-start sm:self-auto cursor-pointer">
                      <Check className="h-4 w-4 stroke-[3]" />
                      <span>Concluir Estudo</span>
                    </button>
                  </div>

                  {/* IA MOTIVATION BUBBLE */}
                  <div className="bg-blue-50 border border-blue-100/50 p-3.5 rounded-2xl flex items-start gap-3">
                    <div className="bg-blue-100 border border-blue-200 p-2 rounded-xl text-blue-600">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-blue-800">Dica da sua IA de Estudos</p>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        "Joshua, você está muito bem em humanas. Hoje, ao fazer a bateria de Física, foque nas fórmulas de calor sensível (Q=mcΔT). Elas respondem por 45% das questões de calorimetria no ENEM!"
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeDemoTab === 'weekly' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-line pb-3 mb-2">
                    <h4 className="text-sm font-bold text-ink uppercase tracking-wider font-display">Cronograma Otimizado (Semana 1)</h4>
                    <span className="text-xs text-blue-600 font-semibold">12h estimadas</span>
                  </div>

                  <div className="grid gap-3">
                    <div className="bg-white border border-line p-4 rounded-xl flex items-center justify-between shadow-xs">
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600">
                          <Check className="h-4 w-4 stroke-[3]" />
                        </div>
                        <div>
                          <span className="text-[10px] text-muted font-bold block uppercase tracking-wider">Segunda-feira</span>
                          <span className="font-extrabold text-sm text-ink font-display">Razão, Proporção e Regra de Três</span>
                          <span className="text-xs text-muted block sm:inline sm:ml-2">(Matemática • 60min)</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold bg-blue-50 border border-blue-200 text-blue-700 px-2 py-0.5 rounded">Alta Incidência</span>
                    </div>

                    <div className="bg-white border border-line p-4 rounded-xl flex items-center justify-between shadow-xs">
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600">
                          <Check className="h-4 w-4 stroke-[3]" />
                        </div>
                        <div>
                          <span className="text-[10px] text-muted font-bold block uppercase tracking-wider">Terça-feira</span>
                          <span className="font-extrabold text-sm text-ink font-display">Cadeias Alimentares e Ecologia</span>
                          <span className="text-xs text-muted block sm:inline sm:ml-2">(Biologia • 50min)</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold bg-blue-50 border border-blue-200 text-blue-700 px-2 py-0.5 rounded">Alta Incidência</span>
                    </div>

                    <div className="bg-blue-50/50 border border-blue-200 p-4 rounded-xl flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 border border-blue-200 text-blue-600">
                          <Clock className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <span className="text-[10px] text-blue-600 font-bold block uppercase tracking-wider">Quarta-feira (Hoje)</span>
                          <span className="font-extrabold text-sm text-ink font-display">Termodinâmica e Calorimetria</span>
                          <span className="text-xs text-muted block sm:inline sm:ml-2">(Física • 50min)</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold bg-blue-100 border border-blue-200 text-blue-800 px-2 py-0.5 rounded">Alta Incidência</span>
                    </div>

                    <div className="bg-white border border-line p-4 rounded-xl flex items-center justify-between opacity-50">
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 border border-line text-muted">
                          <Lock className="h-4 w-4 text-muted" />
                        </div>
                        <div>
                          <span className="text-[10px] text-muted font-bold block uppercase tracking-wider">Quinta-feira</span>
                          <span className="font-extrabold text-sm text-ink font-display">Revolução Industrial & Iluminismo</span>
                          <span className="text-xs text-muted block sm:inline sm:ml-2">(História • 45min)</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold bg-slate-100 text-muted px-2 py-0.5 rounded">Estratégico</span>
                    </div>
                  </div>
                </div>
              )}

              {activeDemoTab === 'calendar' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-line pb-3">
                    <h4 className="text-sm font-bold text-ink uppercase tracking-wider font-display">Acompanhamento Ativo &amp; Correção de Atrasos</h4>
                    <span className="text-xs text-amber-600 font-bold flex items-center gap-1">
                      <RefreshCw className="h-3 w-3 animate-spin" />
                      Auto-ajustável
                    </span>
                  </div>

                  <div className="bg-white border border-line p-4 rounded-2xl flex flex-col md:flex-row gap-6 items-center justify-between shadow-xs">
                    <div className="space-y-2">
                      <div className="text-xs text-amber-600 font-bold flex items-center gap-1.5">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>DETECTAMOS ATRASO NA QUARTA-FEIRA</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-md">
                        "Sem acúmulo de matérias ou ansiedade: redistribuímos Calorimetria de Física para o seu Sábado mantendo o ritmo planejado."
                      </p>
                    </div>
                    
                    {/* Visual flow of movement */}
                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-line shrink-0">
                      <div className="text-center p-2 rounded-lg bg-red-50 border border-red-200">
                        <div className="text-[8px] font-bold text-red-600">QUARTA</div>
                        <div className="text-xs font-black text-red-800 font-display">FÍSICA</div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-blue-600" />
                      <div className="text-center p-2 rounded-lg bg-blue-50 border border-blue-200">
                        <div className="text-[8px] font-bold text-blue-600">SÁBADO</div>
                        <div className="text-xs font-black text-blue-800 font-display">FÍSICA</div>
                      </div>
                    </div>
                  </div>

                  {/* Calendar Matrix View */}
                  <div className="grid grid-cols-7 gap-1.5 max-w-sm mx-auto text-center text-xs mt-2">
                    {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((d, i) => (
                      <div key={i} className="font-bold text-muted py-1">{d}</div>
                    ))}
                    {[...Array(14)].map((_, i) => {
                      const day = i + 1;
                      let bg = "bg-white border border-line text-muted";
                      if (day < 3) bg = "bg-emerald-50 border border-emerald-200 text-emerald-600"; // studied
                      if (day === 3) bg = "bg-red-50 border border-red-200 text-red-600 relative"; // missed
                      if (day === 6) bg = "bg-blue-50 border border-blue-200 text-blue-600 relative"; // relocated
                      return (
                        <div key={i} className={`p-2 rounded-lg font-bold ${bg}`}>
                          {day}
                          {day === 3 && <div className="absolute top-1 right-1 h-1.5 w-1.5 bg-red-500 rounded-full" />}
                          {day === 6 && <div className="absolute top-1 right-1 h-1.5 w-1.5 bg-blue-600 rounded-full" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeDemoTab === 'ai' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-line pb-3">
                    <h4 className="text-sm font-bold text-ink uppercase tracking-wider font-display">Suporte Pedagógico Inteligente 24h</h4>
                    <span className="rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-[9px] font-bold text-blue-700">
                      Voz da Matéria Oficial
                    </span>
                  </div>

                  <div className="space-y-3.5 max-w-2xl mx-auto">
                    {/* User Prompt */}
                    <div className="flex items-start gap-2.5 justify-end">
                      <div className="bg-slate-100 border border-line p-3 rounded-2xl rounded-tr-xs max-w-md text-xs text-slate-800">
                        Como eu diferencio Quimiossíntese de Fotossíntese de forma rápida para o ENEM?
                      </div>
                    </div>

                    {/* AI Answer */}
                    <div className="flex items-start gap-2.5">
                      <div className="h-7 w-7 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-600 text-xs shrink-0 font-black">
                        IA
                      </div>
                      <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl rounded-tl-xs text-xs text-slate-700 leading-relaxed space-y-2">
                        <p className="font-bold text-blue-800">Dica resumida do ENEM:</p>
                        <p>A diferença crucial está na <strong>fonte de energia</strong> utilizada para produzir matéria orgânica:</p>
                        <ul className="list-disc pl-4 space-y-1 mt-1 text-slate-600">
                          <li><strong>Fotossíntese:</strong> Usa energia da <strong>luz solar</strong> (plantas, algas, cianobactérias).</li>
                          <li><strong>Quimiossíntese:</strong> Usa energia livre de <strong>reações químicas inorgânicas</strong> (bactérias oxidantes do ferro, enxofre).</li>
                        </ul>
                        <p className="text-[10px] text-blue-600 italic mt-2">Dica: O ENEM costuma cobrar quimiossíntese contextualizada com ecossistemas sem luz (ex: fossas abissais).</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeDemoTab === 'evolution' && (
                <div className="space-y-5">
                  <div className="flex justify-between items-center border-b border-line pb-3">
                    <h4 className="text-sm font-bold text-ink uppercase tracking-wider font-display">Acompanhamento de Evolução e Probabilidades</h4>
                    <span className="text-xs text-blue-600 font-bold">Méd. Geral Projetada: 760</span>
                  </div>

                  <div className="space-y-4 max-w-xl mx-auto">
                    {/* Subject 1 */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-slate-700">Matemática (Meta: 800+)</span>
                        <span className="font-black text-blue-600">810 • Projeção Aprovado (Medicina USP)</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 border border-line overflow-hidden">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>

                    {/* Subject 2 */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-slate-700">Ciências da Natureza (Meta: 750+)</span>
                        <span className="font-black text-amber-600">735 • Recuperando nas últimas 2 semanas</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 border border-line overflow-hidden">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '74%' }}></div>
                      </div>
                    </div>

                    {/* Subject 3 */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-slate-700">Redação (Meta: 900+)</span>
                        <span className="font-black text-blue-600">920 • Próximo ao teto estratégico</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 border border-line overflow-hidden">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Secondary CTA (Mid-page) */}
          <div className="mt-12 text-center">
            <button
              onClick={onStartWizard}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 h-12 px-6 rounded-[10px] bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-98 text-white font-semibold text-sm transition-all duration-120 cursor-pointer shadow-xs"
            >
              <span>Começar agora, leva 2 minutos</span>
              <ArrowRight className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line bg-white px-4 py-10 text-center text-xs text-muted relative z-10">
        <p>© 2026 ADAPTO — O plano evolui com você.</p>
        <p className="mt-2 text-muted/80">stdy.app • adapto.com.br</p>
      </footer>

    </div>
  );
};
