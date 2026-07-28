import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, RefreshCw, AlertCircle, Zap, Star, ChevronRight, Video, FileText, Edit3 } from 'lucide-react';

interface LandingPageProps {
  onStartWizard: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartWizard }) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col selection:bg-teal-100 selection:text-teal-900">
      
      {/* HERO SECTION (Above the Fold) */}
      <section className="relative overflow-hidden px-4 pt-12 pb-16 sm:px-6 sm:pt-20 sm:pb-24 lg:px-8 border-b border-slate-200 bg-gradient-to-b from-teal-50/50 via-slate-50 to-white">
        
        <div className="mx-auto max-w-4xl text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1.5 text-xs font-semibold text-teal-800 shadow-xs mb-6">
            <Sparkles className="h-4 w-4 text-teal-700" />
            <span>A Primeira Trilha do ENEM com Replanejamento Automático</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl text-slate-900 leading-tight">
            Sua trilha de estudos do ENEM que se <span className="text-teal-700 underline decoration-teal-300 underline-offset-4">adapta ativamente</span> quando você atrasa.
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Gere em menos de 3 minutos um cronograma sob medida baseado na data da sua prova e no seu tempo disponível. Se você não conseguir estudar em algum dia, o sistema reorganiza sua semana de forma realista.
          </p>

          {/* Primary CTA (Above the fold) */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartWizard}
              className="w-full sm:w-auto flex items-center justify-center gap-3 rounded-2xl bg-teal-700 hover:bg-teal-800 px-8 py-4 text-base font-bold text-white shadow-md shadow-teal-700/20 transform hover:-translate-y-0.5 transition-all"
            >
              <Sparkles className="h-5 w-5" />
              <span>Monte minha trilha grátis</span>
              <ArrowRight className="h-5 w-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Micro Trust Signals */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-teal-700" />
              100% da Matriz Oficial ENEM
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-teal-700" />
              Sem cartão de crédito para testar
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-teal-700" />
              Prévia instantânea da 1ª semana
            </span>
          </div>

          {/* App Teaser Mockup */}
          <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-md text-left max-w-3xl mx-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-rose-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-2 text-xs font-mono text-slate-500 font-semibold">Minha Trilha Personalizada • ENEM 2026</span>
              </div>
              <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold text-teal-800 border border-teal-200">
                Semana 1 Liberada
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3.5">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-teal-800 uppercase tracking-wider text-[10px]">Segunda-feira</span>
                  <span className="rounded bg-teal-100 text-teal-800 text-[10px] px-2 py-0.5 font-bold">Alta Incidência</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Razão, Proporção e Regra de Três</h4>
                <p className="text-xs text-slate-500 mt-1">Matemática Básica • 60 min</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="rounded bg-white border border-slate-200 px-2 py-0.5 text-[10px] text-slate-700 font-medium flex items-center gap-1">
                    <Video className="h-3 w-3 text-teal-700" /> Videoaula
                  </span>
                  <span className="rounded bg-white border border-slate-200 px-2 py-0.5 text-[10px] text-slate-700 font-medium flex items-center gap-1">
                    <Edit3 className="h-3 w-3 text-teal-700" /> 10 Exercícios
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3.5">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-teal-800 uppercase tracking-wider text-[10px]">Terça-feira</span>
                  <span className="rounded bg-teal-100 text-teal-800 text-[10px] px-2 py-0.5 font-bold">Alta Incidência</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Cadeias Alimentares e Ecologia</h4>
                <p className="text-xs text-slate-500 mt-1">Biologia • 50 min</p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="rounded bg-white border border-slate-200 px-2 py-0.5 text-[10px] text-slate-700 font-medium flex items-center gap-1">
                    <FileText className="h-3 w-3 text-teal-700" /> Resumo
                  </span>
                  <span className="rounded bg-white border border-slate-200 px-2 py-0.5 text-[10px] text-slate-700 font-medium flex items-center gap-1">
                    <Edit3 className="h-3 w-3 text-teal-700" /> Questões ENEM
                  </span>
                </div>
              </div>
            </div>

            {/* Re-plan notification callout */}
            <div className="mt-4 rounded-xl border border-teal-200 bg-teal-50/90 p-3.5 flex items-start gap-3">
              <RefreshCw className="h-5 w-5 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-teal-900">Acompanhamento Ativo & Replanejamento Automático</p>
                <p className="text-xs text-teal-800 mt-0.5 leading-relaxed">
                  "Não conseguiu estudar na Quarta-feira? Sem acúmulo de ansiedade: redistribuímos os tópicos de Ecologia no seu fim de semana mantendo as matérias de maior peso prioritárias."
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* SECTION 1: O PROBLEMA vs A SOLUÇÃO */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal-700">Por que o método tradicional falha</h2>
            <p className="text-2xl font-black text-slate-900 sm:text-4xl mt-2">
              Cronogramas estáticos foram feitos para serem abandonados.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* The Old Way */}
            <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-6 relative">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-sm mb-4">
                <AlertCircle className="h-5 w-5 text-rose-600" />
                <span>Planilhas & Aplicativos Comuns</span>
              </div>
              <ul className="space-y-3.5 text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span><strong>Cronograma engessado:</strong> Faltou um dia e o conteúdo acumula até virar uma bola de neve incontrolável.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span><strong>Culpa e ansiedade:</strong> O app te cobra por não cumprir metas irrealistas para sua rotina.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold">✕</span>
                  <span><strong>Desperdício de tempo:</strong> Você estuda tópicos raramente cobrados enquanto ignora matérias com peso alto.</span>
                </li>
              </ul>
            </div>

            {/* The Trilha ENEM Way */}
            <div className="rounded-2xl border border-teal-200 bg-teal-50/60 p-6 relative shadow-xs">
              <div className="flex items-center gap-2 text-teal-900 font-bold text-sm mb-4">
                <Zap className="h-5 w-5 text-teal-700 fill-teal-700" />
                <span>Nosso Auxiliar de Estudos Ativo</span>
              </div>
              <ul className="space-y-3.5 text-sm text-slate-800">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-teal-700 shrink-0 mt-0.5" />
                  <span><strong>Replanejamento automático:</strong> O sistema detecta atrasos e redistribui matérias pendentes instantaneamente.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-teal-700 shrink-0 mt-0.5" />
                  <span><strong>Acompanhamento motivador:</strong> Tom acolhedor e focado em manter você no ritmo certo até o dia da prova.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-teal-700 shrink-0 mt-0.5" />
                  <span><strong>Matriz de Referência Oficial:</strong> Prioridade inteligente ajustada à sua disponibilidade de horas por semana.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* SECTION 2: COMO FUNCIONA EM 3 PASSOS */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-teal-700">Simplicidade Extrema</h2>
            <p className="text-2xl font-black text-slate-900 sm:text-4xl mt-2">
              Do diagnóstico ao primeiro dia de estudos em 3 minutos
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 relative shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-800 font-bold text-lg mb-4">
                1
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Informe sua rotina</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Responda perguntas rápidas sobre a data do seu ENEM, horas semanais disponíveis e diagnóstico do seu nível por área.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 relative shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-800 font-bold text-lg mb-4">
                2
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Veja a prévia grátis</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                O sistema constrói sua trilha completa e mostra a primeira semana inteiramente aberta para você validar antes de assinar.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 relative shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-800 font-bold text-lg mb-4">
                3
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Acompanhamento Ativo</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Faça check-in diário com 1 clique. Se ocorrer algum imprevisto e você atrasar, receba o cronograma corrigido e reorganizado.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* SECTION 3: PROVA SOCIAL & CTA FINAL */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-4xl text-center">
          
          <div className="inline-flex items-center gap-1 text-amber-500 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
            ))}
          </div>

          <blockquote className="text-lg sm:text-xl font-medium text-slate-700 italic max-w-2xl mx-auto leading-relaxed">
            "Eu sempre abandonava planilhas na terceira semana. O Trilha ENEM reorganizou minhas matérias duas vezes em períodos de prova na escola e consegui manter a consistência sem pirar!"
          </blockquote>
          <p className="text-xs font-bold text-teal-700 uppercase tracking-widest mt-3">
            — Lucas M., Estudante ENEM 2025 • Aprovado em Engenharia
          </p>

          <div className="mt-12 rounded-3xl border border-teal-200 bg-gradient-to-br from-teal-50 via-slate-50 to-white p-8 sm:p-12 shadow-md relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-black text-slate-900 sm:text-4xl">
                Pronto para parar de perder tempo organizando e começar a aprender?
              </h3>
              <p className="mt-4 text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
                Monte sua trilha personalizada agora. A prévia da 1ª semana é 100% gratuita.
              </p>
              
              <button
                onClick={onStartWizard}
                className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-teal-700 hover:bg-teal-800 px-8 py-4 text-base font-bold text-white shadow-md shadow-teal-700/20 transition-all transform hover:scale-105"
              >
                <Sparkles className="h-5 w-5" />
                <span>Começar minha trilha agora</span>
                <ChevronRight className="h-5 w-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 px-4 py-8 text-center text-xs text-slate-500">
        <p>© 2026 Trilha ENEM — Auxiliar de Estudos Personalizado. Todos os direitos reservados.</p>
        <p className="mt-1">Baseado na Matriz de Referência Oficial do ENEM.</p>
      </footer>

    </div>
  );
};

