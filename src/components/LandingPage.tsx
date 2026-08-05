import React, { useState } from 'react';
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
  GraduationCap
} from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onStartWizard: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartWizard }) => {
  const [activeDemoTab, setActiveDemoTab] = useState<'dashboard' | 'weekly' | 'calendar' | 'ai' | 'evolution'>('dashboard');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-teal-500 selection:text-slate-950 relative overflow-hidden">
      
      {/* Background Decorative Blur Spheres */}
      <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-teal-500/10 blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full bg-teal-500/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-teal-500/5 blur-[180px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative pt-20 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-900">
        <div className="mx-auto max-w-5xl text-center relative z-10">
          
          {/* Badge Social Proof */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-teal-500/35 bg-teal-500/10 px-4 py-1.5 text-xs font-semibold text-teal-300 shadow-lg mb-8 backdrop-blur-md"
          >
            <Sparkles className="h-4 w-4 text-teal-400" />
            <span>Criado por estudantes de Engenharia de Software da USP e UFMG</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl text-white leading-tight"
          >
            Passe no ENEM estudando <br />
            <span className="bg-gradient-to-r from-teal-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent text-glow">
              exatamente o que você precisa.
            </span>
          </motion.h1>

          {/* Subtitle / For Whom & Why Better */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-medium"
          >
            Nossa IA cria um plano personalizado baseado no seu curso, tempo disponível e nível atual. Se você atrasar um dia, o cronograma se adapta ativamente sem acumular matéria.
          </motion.p>

          {/* Primary CTA (Above the fold) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={onStartWizard}
              className="w-full sm:w-auto flex items-center justify-center gap-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 px-8 py-5 text-lg font-black shadow-lg shadow-teal-500/20 transform hover:-translate-y-1 transition-all cursor-pointer"
            >
              <Sparkles className="h-5.5 w-5.5" />
              <span>Criar meu plano gratuito</span>
              <ArrowRight className="h-5.5 w-5.5 stroke-[2.5]" />
            </button>
          </motion.div>

          {/* Micro Trust Signals */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400 font-medium"
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4.5 w-4.5 text-teal-400" />
              Baseado na matriz oficial do ENEM
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4.5 w-4.5 text-teal-400" />
              Cronogramas 100% personalizados
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4.5 w-4.5 text-teal-400" />
              Prévia instantânea sem cartão de crédito
            </span>
          </motion.div>

        </div>
      </section>

      {/* METRICS SECTION (Coloque números) */}
      <section className="py-12 bg-slate-950/40 border-b border-slate-900 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 rounded-2xl border border-slate-900 bg-slate-950/70 backdrop-blur-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-white bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent">+2.000</div>
              <div className="text-xs text-slate-400 font-semibold mt-1">Questões Resolvidas (Meta Mínima)</div>
            </div>
            <div className="p-4 rounded-2xl border border-slate-900 bg-slate-950/70 backdrop-blur-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-white bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent">50</div>
              <div className="text-xs text-slate-400 font-semibold mt-1">Disciplinas e Mapas Mentais</div>
            </div>
            <div className="p-4 rounded-2xl border border-slate-900 bg-slate-950/70 backdrop-blur-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-white bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent">100%</div>
              <div className="text-xs text-slate-400 font-semibold mt-1">Personalizado p/ sua Meta</div>
            </div>
            <div className="p-4 rounded-2xl border border-slate-900 bg-slate-950/70 backdrop-blur-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-white bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent">24h</div>
              <div className="text-xs text-slate-400 font-semibold mt-1">Suporte Tira-Dúvidas com IA</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: COMO FUNCIONA EM 3 PASSOS */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 border-b border-slate-900 bg-slate-950/50">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal-400">Simplicidade Extrema</h2>
            <p className="text-3xl font-black text-white sm:text-5xl mt-3">
              Como funciona o sistema?
            </p>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Em menos de 3 minutos, você sai do absoluto zero com um plano de estudos blindado
            </p>
          </div>

          <div className="relative">
            {/* Connection Line for Desktop */}
            <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-slate-800 -translate-y-12 z-0" />

            <div className="grid gap-8 md:grid-cols-3 relative z-10">
              {/* Step 1 */}
              <div className="glass rounded-2xl p-6 flex flex-col items-center text-center group hover:border-teal-500/50 transition-all duration-300">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 font-black text-xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  1️⃣
                </div>
                <h3 className="font-extrabold text-lg text-white mb-2">Responda um formulário</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Leva apenas 2 minutos. Diga seu curso dos sonhos, suas dificuldades e quantas horas você tem para estudar.
                </p>
              </div>

              {/* Step 2 */}
              <div className="glass rounded-2xl p-6 flex flex-col items-center text-center group hover:border-teal-500/50 transition-all duration-300">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 font-black text-xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  2️⃣
                </div>
                <h3 className="font-extrabold text-lg text-white mb-2">Receba seu plano personalizado</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Nossa IA calcula o peso das matérias e monta um cronograma otimizado com foco no que realmente cai no ENEM.
                </p>
              </div>

              {/* Step 3 */}
              <div className="glass rounded-2xl p-6 flex flex-col items-center text-center group hover:border-teal-500/50 transition-all duration-300">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 font-black text-xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  3️⃣
                </div>
                <h3 className="font-extrabold text-lg text-white mb-2">Estude com acompanhamento</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Faça seus estudos diários com a IA tirando dúvidas e reorganizando a semana automaticamente se você atrasar.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={onStartWizard}
              className="inline-flex items-center gap-2 text-sm font-bold text-teal-400 hover:text-teal-300 group cursor-pointer"
            >
              <span>Começar agora</span>
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* PRODUCT SHOWCASE (Mostrar o Produto) */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 border-b border-slate-900 bg-slate-950">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal-400">Visualização em Tempo Real</h2>
            <p className="text-3xl font-black text-white sm:text-5xl mt-3">
              Explore o sistema por dentro
            </p>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              Nossa interface foi projetada para ser limpa, motivadora e extremamente eficiente.
            </p>
          </div>

          {/* Interactive Showcase Component */}
          <div className="rounded-3xl border border-slate-900 bg-slate-950/70 p-1 md:p-2 shadow-2xl relative overflow-hidden backdrop-blur-md">
            
            {/* Tab Selectors */}
            <div className="flex flex-wrap border-b border-slate-900 p-2 gap-1.5 md:gap-2">
              <button
                onClick={() => setActiveDemoTab('dashboard')}
                className={`flex-1 min-w-[120px] text-xs font-bold py-3 px-4 rounded-xl transition-all cursor-pointer ${
                  activeDemoTab === 'dashboard'
                    ? 'bg-slate-900 text-white border border-slate-800 shadow-sm text-glow'
                    : 'text-slate-400 hover:bg-slate-900/40 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className="h-4 w-4 text-teal-400" />
                  <span>Dashboard</span>
                </div>
              </button>
              <button
                onClick={() => setActiveDemoTab('weekly')}
                className={`flex-1 min-w-[120px] text-xs font-bold py-3 px-4 rounded-xl transition-all cursor-pointer ${
                  activeDemoTab === 'weekly'
                    ? 'bg-slate-900 text-white border border-slate-800 shadow-sm text-glow'
                    : 'text-slate-400 hover:bg-slate-900/40 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <FileText className="h-4 w-4 text-teal-400" />
                  <span>Plano Semanal</span>
                </div>
              </button>
              <button
                onClick={() => setActiveDemoTab('calendar')}
                className={`flex-1 min-w-[120px] text-xs font-bold py-3 px-4 rounded-xl transition-all cursor-pointer ${
                  activeDemoTab === 'calendar'
                    ? 'bg-slate-900 text-white border border-slate-800 shadow-sm text-glow'
                    : 'text-slate-400 hover:bg-slate-900/40 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="h-4 w-4 text-teal-400" />
                  <span>Calendário IA</span>
                </div>
              </button>
              <button
                onClick={() => setActiveDemoTab('ai')}
                className={`flex-1 min-w-[120px] text-xs font-bold py-3 px-4 rounded-xl transition-all cursor-pointer ${
                  activeDemoTab === 'ai'
                    ? 'bg-slate-900 text-white border border-slate-800 shadow-sm text-glow'
                    : 'text-slate-400 hover:bg-slate-900/40 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <MessageSquare className="h-4 w-4 text-teal-400" />
                  <span>Tira-Dúvidas IA</span>
                </div>
              </button>
              <button
                onClick={() => setActiveDemoTab('evolution')}
                className={`flex-1 min-w-[120px] text-xs font-bold py-3 px-4 rounded-xl transition-all cursor-pointer ${
                  activeDemoTab === 'evolution'
                    ? 'bg-slate-900 text-white border border-slate-800 shadow-sm text-glow'
                    : 'text-slate-400 hover:bg-slate-900/40 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Award className="h-4 w-4 text-teal-400" />
                  <span>Evolução</span>
                </div>
              </button>
            </div>

            {/* Active Demo Window */}
            <div className="p-4 md:p-8 min-h-[350px] bg-slate-950/80 rounded-b-3xl">
              
              {activeDemoTab === 'dashboard' && (
                <div className="space-y-6">
                  {/* Dashboard Mockup */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-900 pb-4">
                    <div>
                      <h4 className="text-lg font-bold text-white">Olá, Joshua 👋</h4>
                      <p className="text-xs text-slate-400">Meta: Medicina (USP) • Faltam 95 dias para o ENEM</p>
                    </div>
                    <div className="flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 px-3.5 py-1.5 rounded-xl">
                      <Zap className="h-4 w-4 text-teal-400 fill-teal-400" />
                      <span className="text-xs font-bold text-teal-300">5 dias de ofensiva!</span>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="bg-slate-900/50 border border-slate-900 p-4 rounded-xl">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Progresso Geral</div>
                      <div className="text-2xl font-black text-white mt-1">64%</div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
                        <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: '64%' }}></div>
                      </div>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-900 p-4 rounded-xl">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Meta da Semana</div>
                      <div className="text-2xl font-black text-white mt-1">9 / 12h</div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
                        <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-900 p-4 rounded-xl">
                      <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Respostas Corretas</div>
                      <div className="text-2xl font-black text-white mt-1">82.4%</div>
                      <div className="text-[10px] text-teal-400 mt-2 font-medium">Acima da média de corte (800+)</div>
                    </div>
                  </div>

                  {/* Task Card */}
                  <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
                    <div>
                      <div className="inline-block text-[9px] font-extrabold bg-teal-500/10 border border-teal-500/25 px-2 py-0.5 rounded text-teal-400 mb-1">
                        TAREFA DE HOJE • ALTA INCIDÊNCIA
                      </div>
                      <h5 className="font-extrabold text-sm text-white">Termodinâmica e Calorimetria</h5>
                      <p className="text-xs text-slate-400 mt-0.5">Física • 50 minutos • Videoaula + 10 questões</p>
                    </div>
                    <button className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 self-start sm:self-auto cursor-pointer">
                      <Check className="h-4 w-4 stroke-[3]" />
                      <span>Concluir Estudo</span>
                    </button>
                  </div>

                  {/* IA MOTIVATION BUBBLE */}
                  <div className="bg-indigo-950/20 border border-indigo-900/30 p-3.5 rounded-2xl flex items-start gap-3">
                    <div className="bg-teal-500/10 border border-teal-500/20 p-2 rounded-xl text-teal-400">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-teal-300">Dica da sua IA de Estudos</p>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        "Joshua, você está muito bem em humanas. Hoje, ao fazer a bateria de Física, foque nas fórmulas de calor sensível (Q=mcΔT). Elas respondem por 45% das questões de calorimetria no ENEM!"
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeDemoTab === 'weekly' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-900 pb-3 mb-2">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Cronograma Otimizado (Semana 1)</h4>
                    <span className="text-xs text-teal-400 font-semibold">12h estimadas</span>
                  </div>

                  <div className="grid gap-3">
                    <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/35 text-emerald-400">
                          <Check className="h-4 w-4 stroke-[3]" />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Segunda-feira</span>
                          <span className="font-extrabold text-sm text-white">Razão, Proporção e Regra de Três</span>
                          <span className="text-xs text-slate-400 block sm:inline sm:ml-2">(Matemática • 60min)</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold bg-teal-500/10 border border-teal-500/20 text-teal-300 px-2 py-0.5 rounded">Alta Incidência</span>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-800/80 p-4 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/35 text-emerald-400">
                          <Check className="h-4 w-4 stroke-[3]" />
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Terça-feira</span>
                          <span className="font-extrabold text-sm text-white">Cadeias Alimentares e Ecologia</span>
                          <span className="text-xs text-slate-400 block sm:inline sm:ml-2">(Biologia • 50min)</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold bg-teal-500/10 border border-teal-500/20 text-teal-300 px-2 py-0.5 rounded">Alta Incidência</span>
                    </div>

                    <div className="bg-slate-900/90 border border-slate-700/80 p-4 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400">
                          <span className="text-xs font-bold">⏳</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-teal-400 font-bold block uppercase tracking-wider">Quarta-feira (Hoje)</span>
                          <span className="font-extrabold text-sm text-white">Termodinâmica e Calorimetria</span>
                          <span className="text-xs text-slate-400 block sm:inline sm:ml-2">(Física • 50min)</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">Alta Incidência</span>
                    </div>

                    <div className="bg-slate-900/30 border border-slate-900 p-4 rounded-xl flex items-center justify-between opacity-60">
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-slate-400">
                          <span className="text-xs font-bold">🔒</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 font-bold block uppercase tracking-wider">Quinta-feira</span>
                          <span className="font-extrabold text-sm text-slate-300">Revolução Industrial & Iluminismo</span>
                          <span className="text-xs text-slate-500 block sm:inline sm:ml-2">(História • 45min)</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold bg-slate-900 text-slate-500 px-2 py-0.5 rounded">Estratégico</span>
                    </div>
                  </div>
                </div>
              )}

              {activeDemoTab === 'calendar' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Acompanhamento Ativo & Correção de Atrasos</h4>
                    <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                      <RefreshCw className="h-3 w-3 animate-spin" />
                      Auto-ajustável
                    </span>
                  </div>

                  <div className="bg-slate-900/50 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row gap-6 items-center justify-between">
                    <div className="space-y-2">
                      <div className="text-xs text-amber-400 font-bold">⚠️ DETECTAMOS ATRAZO NA QUARTA-FEIRA</div>
                      <p className="text-xs text-slate-300 leading-relaxed max-w-md">
                        "Sem acúmulo de matérias ou ansiedade: redistribuímos Calorimetria de Física para o seu Sábado mantendo o ritmo planejado."
                      </p>
                    </div>
                    
                    {/* Visual flow of movement */}
                    <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 shrink-0">
                      <div className="text-center p-2 rounded-lg bg-red-950/30 border border-red-900/40">
                        <div className="text-[8px] font-bold text-red-400">QUARTA</div>
                        <div className="text-xs font-black text-red-200">FÍSICA</div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-teal-400" />
                      <div className="text-center p-2 rounded-lg bg-teal-950/40 border border-teal-500/20">
                        <div className="text-[8px] font-bold text-teal-400">SÁBADO</div>
                        <div className="text-xs font-black text-teal-200">FÍSICA</div>
                      </div>
                    </div>
                  </div>

                  {/* Calendar Matrix View */}
                  <div className="grid grid-cols-7 gap-1.5 max-w-sm mx-auto text-center text-xs mt-2">
                    {['S', 'T', 'Q', 'Q', 'S', 'S', 'D'].map((d, i) => (
                      <div key={i} className="font-bold text-slate-500 py-1">{d}</div>
                    ))}
                    {[...Array(14)].map((_, i) => {
                      const day = i + 1;
                      let bg = "bg-slate-900 border border-slate-800 text-slate-500";
                      if (day < 3) bg = "bg-emerald-950/40 border border-emerald-800 text-emerald-400"; // studied
                      if (day === 3) bg = "bg-red-950/40 border border-red-900 text-red-400 relative"; // missed
                      if (day === 6) bg = "bg-teal-950/40 border border-teal-500 text-teal-400"; // relocated
                      return (
                        <div key={i} className={`p-2 rounded-lg font-bold ${bg}`}>
                          {day}
                          {day === 3 && <div className="absolute top-1 right-1 h-1.5 w-1.5 bg-red-500 rounded-full" />}
                          {day === 6 && <div className="absolute top-1 right-1 h-1.5 w-1.5 bg-teal-400 rounded-full" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeDemoTab === 'ai' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Suporte Pedagógico Inteligente 24h</h4>
                    <span className="rounded-full bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 text-[9px] font-bold text-teal-400">
                      Voz da Matéria Oficial
                    </span>
                  </div>

                  <div className="space-y-3.5 max-w-2xl mx-auto">
                    {/* User Prompt */}
                    <div className="flex items-start gap-2.5 justify-end">
                      <div className="bg-slate-900 border border-slate-800 p-3 rounded-2xl rounded-tr-xs max-w-md text-xs text-white">
                        Como eu diferencio Quimiossíntese de Fotossíntese de forma rápida para o ENEM?
                      </div>
                    </div>

                    {/* AI Answer */}
                    <div className="flex items-start gap-2.5">
                      <div className="h-7 w-7 rounded-lg bg-teal-500/10 border border-teal-500/25 flex items-center justify-center text-teal-400 text-xs shrink-0 font-black">
                        IA
                      </div>
                      <div className="bg-indigo-950/20 border border-indigo-900/20 p-4 rounded-2xl rounded-tl-xs text-xs text-slate-200 leading-relaxed space-y-2">
                        <p className="font-bold text-teal-300">Dica resumida do ENEM:</p>
                        <p>A diferença crucial está na <strong>fonte de energia</strong> utilizada para produzir matéria orgânica:</p>
                        <ul className="list-disc pl-4 space-y-1 mt-1 text-slate-300">
                          <li><strong>Fotossíntese:</strong> Usa energia da <strong>luz solar</strong> (plantas, algas, cianobactérias).</li>
                          <li><strong>Quimiossíntese:</strong> Usa energia livre de <strong>reações químicas inorgânicas</strong> (bactérias oxidantes do ferro, enxofre).</li>
                        </ul>
                        <p className="text-[10px] text-teal-400/80 italic mt-2">Dica: O ENEM costuma cobrar quimiossíntese contextualizada com ecossistemas sem luz (ex: fossas abissais).</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeDemoTab === 'evolution' && (
                <div className="space-y-5">
                  <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">Acompanhamento de Evolução e Probabilidades</h4>
                    <span className="text-xs text-teal-400 font-bold">Méd. Geral Projetada: 760</span>
                  </div>

                  <div className="space-y-4 max-w-xl mx-auto">
                    {/* Subject 1 */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-slate-300">Matemática (Meta: 800+)</span>
                        <span className="font-black text-teal-400">810 • Projeção Aprovado (Medicina USP)</span>
                      </div>
                      <div className="w-full bg-slate-900 rounded-full h-2 border border-slate-800 overflow-hidden">
                        <div className="bg-teal-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>

                    {/* Subject 2 */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-slate-300">Ciências da Natureza (Meta: 750+)</span>
                        <span className="font-black text-amber-400">735 • Recuperando nas últimas 2 semanas</span>
                      </div>
                      <div className="w-full bg-slate-900 rounded-full h-2 border border-slate-800 overflow-hidden">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '74%' }}></div>
                      </div>
                    </div>

                    {/* Subject 3 */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-bold text-slate-300">Redação (Meta: 900+)</span>
                        <span className="font-black text-teal-400">920 • Próximo ao teto estratégico</span>
                      </div>
                      <div className="w-full bg-slate-900 rounded-full h-2 border border-slate-800 overflow-hidden">
                        <div className="bg-teal-500 h-2 rounded-full" style={{ width: '92%' }}></div>
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
              className="inline-flex items-center gap-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all cursor-pointer"
            >
              <span>Começar agora</span>
              <ArrowRight className="h-4 w-4 text-teal-400" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 4: BENEFÍCIOS (Venda valor, não funcionalidade) */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 border-b border-slate-900 bg-slate-950/40">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal-400">Liberdade & Performance</h2>
            <p className="text-3xl font-black text-white sm:text-5xl mt-3">
              Estude sem a sobrecarga mental dos métodos antigos
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="glass p-6 rounded-2xl hover:border-teal-500/30 transition-all">
              <div className="h-10 w-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-4">
                <Check className="h-5 w-5 stroke-[3]" />
              </div>
              <h3 className="text-lg font-black text-white mb-2">Nunca mais fique perdido sem saber o que estudar</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Abra a plataforma e encontre exatamente a tarefa de hoje. A IA organiza quais disciplinas, teorias e blocos de exercícios você deve fazer para atingir a nota alvo do seu curso.
              </p>
            </div>

            <div className="glass p-6 rounded-2xl hover:border-teal-500/30 transition-all">
              <div className="h-10 w-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-4">
                <Check className="h-5 w-5 stroke-[3]" />
              </div>
              <h3 className="text-lg font-black text-white mb-2">Estude menos e aprenda muito mais</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Você não precisa de 12 horas diárias. Nosso motor de relevância foca 100% dos seus esforços nos temas de alta incidência do ENEM, eliminando conteúdos que caem uma vez a cada dez anos.
              </p>
            </div>

            <div className="glass p-6 rounded-2xl hover:border-teal-500/30 transition-all">
              <div className="h-10 w-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-4">
                <Check className="h-5 w-5 stroke-[3]" />
              </div>
              <h3 className="text-lg font-black text-white mb-2">Seu plano atualiza automaticamente</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Imprevistos acontecem. Faltou um dia? A IA reorganiza as matérias não vistas na semana de forma realista, diluindo nos dias de maior disponibilidade para que você não acumule estresse.
              </p>
            </div>

            <div className="glass p-6 rounded-2xl hover:border-teal-500/30 transition-all">
              <div className="h-10 w-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-4">
                <Check className="h-5 w-5 stroke-[3]" />
              </div>
              <h3 className="text-lg font-black text-white mb-2">IA com você 24 horas por dia</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Ficou com dúvida em um exercício de biologia ou de termodinâmica? Tire dúvidas e peça explicações pedagógicas direcionadas a qualquer momento do dia ou da noite na mesma tela.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARATIVE SECTION (Por que somos diferentes) */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 border-b border-slate-900 bg-slate-950">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal-400">Comparação Sem Filtro</h2>
            <p className="text-3xl font-black text-white sm:text-5xl mt-3">
              Por que somos diferentes?
            </p>
          </div>

          <div className="glass rounded-3xl overflow-hidden shadow-xl border border-slate-900">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-200">
                  <th className="p-4 sm:p-5 font-black uppercase tracking-wider">MÉTODO DE ESTUDO</th>
                  <th className="p-4 sm:p-5 font-black uppercase tracking-wider text-red-400/80">OUTROS SISTEMAS</th>
                  <th className="p-4 sm:p-5 font-black bg-teal-500/5 uppercase tracking-wider text-teal-400 text-glow">TRILHA ENEM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 font-medium">
                <tr>
                  <td className="p-4 sm:p-5 font-extrabold text-white">Tipo de Cronograma</td>
                  <td className="p-4 sm:p-5 text-slate-400 flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500 shrink-0" />
                    <span>Plano Genérico (igual para todos)</span>
                  </td>
                  <td className="p-4 sm:p-5 bg-teal-500/5 text-white font-semibold">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-teal-400 shrink-0" />
                      <span>Plano 100% Personalizado</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-extrabold text-white">Formato de Acompanhamento</td>
                  <td className="p-4 sm:p-5 text-slate-400 flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500 shrink-0" />
                    <span>PDF Estático ou Planilha Fria</span>
                  </td>
                  <td className="p-4 sm:p-5 bg-teal-500/5 text-white font-semibold">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-teal-400 shrink-0" />
                      <span>IA Acompanha e dá suporte</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-extrabold text-white">Seleção do Conteúdo</td>
                  <td className="p-4 sm:p-5 text-slate-400 flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500 shrink-0" />
                    <span>Você escolhe o conteúdo</span>
                  </td>
                  <td className="p-4 sm:p-5 bg-teal-500/5 text-white font-semibold">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-teal-400 shrink-0" />
                      <span>IA escolhe por você de forma estratégica</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="p-4 sm:p-5 font-extrabold text-white">Se você Atrasar...</td>
                  <td className="p-4 sm:p-5 text-slate-400 flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500 shrink-0" />
                    <span>Sem adaptação (acumula matérias)</span>
                  </td>
                  <td className="p-4 sm:p-5 bg-teal-500/5 text-white font-semibold">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-teal-400 shrink-0" />
                      <span>Atualiza e recalcula diariamente</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PAIN POINT / EMOTIONAL APPEAL (O maior problema) */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 border-b border-slate-900 bg-slate-950/50">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 mb-6">
            <GraduationCap className="h-6 w-6" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            Ninguém quer mais conteúdo. <br className="hidden sm:inline" />
            Você quer <span className="bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent text-glow">passar no vestibular.</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            A internet está cheia de apostilas de 500 páginas e plataformas cheias de videoaulas que você nunca vai assistir. Isso só te gera ansiedade.
          </p>
          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-bold text-teal-300">
            Você quer aumentar a sua nota, saber exatamente o que estudar hoje e garantir a sua vaga em Medicina, Engenharia, Direito ou qualquer curso. E é isso que a gente entrega.
          </p>
        </div>
      </section>

      {/* FINAL CTA SECTION (CTA repetido / Quero estudar melhor) */}
      <section className="px-4 py-24 sm:px-6 lg:px-8 bg-slate-950 relative">
        <div className="absolute inset-0 bg-teal-500/5 blur-[120px] pointer-events-none" />
        
        <div className="mx-auto max-w-4xl text-center relative z-10">
          
          <div className="inline-flex items-center gap-1 text-amber-500 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
            ))}
          </div>

          <blockquote className="text-lg sm:text-2xl font-medium text-slate-200 italic max-w-3xl mx-auto leading-relaxed">
            "Eu sempre abandonava cronogramas em PDF na terceira semana. O Trilha ENEM reorganizou minhas matérias duas vezes durante semanas de provas da escola e consegui manter a consistência sem surtar. Fui aprovado!"
          </blockquote>
          <p className="text-xs font-black text-teal-400 uppercase tracking-widest mt-4">
            — Lucas M., Aprovado em Engenharia (USP)
          </p>

          <div className="mt-16 glass rounded-3xl p-8 sm:p-12 relative overflow-hidden max-w-3xl mx-auto border-slate-900 bg-slate-900/30">
            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-teal-500/10 blur-xl pointer-events-none" />
            
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-white sm:text-4xl leading-tight">
                Pronto para parar de perder tempo organizando e começar a ser aprovado?
              </h3>
              <p className="mt-4 text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
                Crie o cronograma ideal para a sua rotina agora mesmo. A prévia da 1ª semana é 100% gratuita.
              </p>
              
              <button
                onClick={onStartWizard}
                className="mt-8 w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 px-8 py-5 text-base font-black shadow-lg shadow-teal-500/20 transition-all transform hover:scale-105 cursor-pointer"
              >
                <Sparkles className="h-5 w-5" />
                <span>Quero estudar melhor</span>
                <ChevronRight className="h-5 w-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 px-4 py-10 text-center text-xs text-slate-500 relative z-10">
        <p>© 2026 Trilha ENEM — Auxiliar de Estudos Personalizado com IA. Todos os direitos reservados.</p>
        <p className="mt-2 text-slate-600">Baseado 100% na Matriz de Referência Oficial do ENEM.</p>
      </footer>

    </div>
  );
};
