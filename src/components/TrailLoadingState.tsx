import React, { useEffect, useState } from 'react';
import { Sparkles, GraduationCap, CheckCircle2 } from 'lucide-react';

interface TrailLoadingStateProps {
  onFinished: () => void;
}

const LOADING_STEPS = [
  'Acessando Matriz de Referência Oficial do ENEM...',
  'Filtrando assuntos por pesos e incidência histórica...',
  'Ajustando cargas horárias à sua disponibilidade semanal...',
  'Priorizando tópicos de acordo com seu diagnóstico...',
  'Organizando recursos de estudo (vídeos, resumos e exercícios)...',
  'Finalizando sua trilha adaptativa!'
];

export const TrailLoadingState: React.FC<TrailLoadingStateProps> = ({ onFinished }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex(prev => {
        if (prev < LOADING_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onFinished();
          }, 600);
          return prev;
        }
      });
    }, 500);

    return () => clearInterval(interval);
  }, [onFinished]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        
        {/* Animated Icon */}
        <div className="relative inline-block">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600 text-white font-bold shadow-md mx-auto">
            <GraduationCap className="h-10 w-10 animate-pulse stroke-[2]" />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-black text-slate-900">Construindo seu AdaptoSTDY</h2>
          <p className="text-xs text-slate-500 mt-1">Organização personalizada em andamento...</p>
        </div>

        {/* Steps checklist */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 text-left space-y-3 shadow-xs">
          {LOADING_STEPS.map((stepText, idx) => {
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div key={idx} className="flex items-center gap-3 text-xs">
                {isDone ? (
                  <CheckCircle2 className="h-4 w-4 text-teal-700 shrink-0" />
                ) : isCurrent ? (
                  <Sparkles className="h-4 w-4 text-amber-500 shrink-0 animate-spin" />
                ) : (
                  <div className="h-4 w-4 rounded-full border border-slate-300 shrink-0" />
                )}

                <span className={isDone ? 'text-slate-500 font-medium line-through opacity-70' : isCurrent ? 'text-teal-900 font-bold' : 'text-slate-400'}>
                  {stepText}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

