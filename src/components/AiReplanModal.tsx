import React, { useState, useEffect } from 'react';
import { UserProfile, StudyTrail, TrailItem } from '../types';
import { Sparkles, RefreshCw, CheckCircle2, Heart, X, Lightbulb } from 'lucide-react';
import { replanTrailItems, formatLocalDate } from '../utils/trailGenerator';

interface AiReplanModalProps {
  user: UserProfile;
  trail: StudyTrail;
  missedItem?: TrailItem;
  onApplyReplan: (updatedTrail: StudyTrail) => void;
  onClose: () => void;
}

export const AiReplanModal: React.FC<AiReplanModalProps> = ({
  user,
  trail,
  missedItem,
  onApplyReplan,
  onClose
}) => {
  const [loading, setLoading] = useState(true);
  const [aiMessage, setAiMessage] = useState('');
  const [aiTip, setAiTip] = useState('');

  // Calculate stats for prompt
  const missedCount = trail.items.filter(i => i.status === 'ATRASADO').length || (missedItem ? 1 : 0);
  const missedSubjects = Array.from(new Set(
    trail.items.filter(i => i.status === 'ATRASADO').map(i => i.topic.area)
  ));
  if (missedItem && !missedSubjects.includes(missedItem.topic.area)) {
    missedSubjects.push(missedItem.topic.area);
  }

  const examDateObj = new Date(user.examDate || '2026-11-08');
  const daysUntilExam = Math.max(10, Math.ceil((examDateObj.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

  useEffect(() => {
    let isMounted = true;

    async function fetchAiReplan() {
      try {
        setLoading(true);
        const res = await fetch('/api/ai/replan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userName: user.name,
            missedCount,
            missedSubjects,
            daysUntilExam,
            hoursPerWeek: user.hoursPerWeek,
            difficultAreas: Object.entries(user.difficulties)
              .filter(([_, level]) => level === 'Preciso de Muita Ajuda')
              .map(([area]) => area)
          })
        });

        const data = await res.json();
        if (isMounted) {
          setAiMessage(data.message || 'Sua grade foi reorganizada para que você continue estudando os conteúdos essenciais do ENEM sem sobrecarga!');
          setAiTip(data.tip || 'Foque em resolver pelo menos 5 questões da prova anterior após a leitura do resumo.');
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to contact replan route:', err);
        if (isMounted) {
          setAiMessage(`Sem preocupações, ${user.name}! Remanejamos as matérias acumuladas para os seus dias com mais disponibilidade sem perder o foco nas matérias de maior peso no ENEM.`);
          setAiTip('Aproveite para revisar os pontos principais em sessões curtas de estudo.');
          setLoading(false);
        }
      }
    }

    fetchAiReplan();

    return () => { isMounted = false; };
  }, []);

  const handleConfirm = () => {
    const startingFromDate = missedItem?.date || formatLocalDate(new Date());
    const updatedItems = replanTrailItems(trail.items, user, startingFromDate);

    const completedCount = updatedItems.filter(i => i.status === 'CONCLUIDO').length;
    const missedCount = updatedItems.filter(i => i.status === 'ATRASADO').length;

    const newTrail: StudyTrail = {
      ...trail,
      items: updatedItems,
      completedCount,
      missedCount
    };

    onApplyReplan(newTrail);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl text-slate-800">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-700 text-white font-bold shadow-xs">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base text-slate-900">Mentor de Estudos</span>
              <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold text-teal-800 border border-teal-200">
                Acompanhamento Ativo
              </span>
            </div>
            <p className="text-xs text-slate-500">Replanejamento acolhedor sem acúmulo de matérias</p>
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center space-y-4">
            <RefreshCw className="h-8 w-8 text-teal-700 animate-spin mx-auto" />
            <p className="text-sm font-bold text-slate-900">Reanalisando sua rotina e redistribuindo tópicos...</p>
            <p className="text-xs text-slate-500">Mantendo prioridade absoluta nas matérias de alta incidência no ENEM.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Encouraging Message Card */}
            <div className="rounded-2xl border border-teal-200 bg-teal-50/50 p-4 space-y-2">
              <div className="flex items-center gap-2 text-teal-800 font-bold text-xs uppercase tracking-wider">
                <Heart className="h-4 w-4 text-teal-700 shrink-0" />
                <span>Mensagem do seu Mentor</span>
              </div>
              <p className="text-sm text-slate-800 leading-relaxed font-medium">
                "{aiMessage}"
              </p>
            </div>

            {/* Action Tip Card */}
            {aiTip && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex items-start gap-3 text-xs text-slate-700">
                <Lightbulb className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block mb-0.5">Orientação Prática para o ENEM:</span>
                  <span>{aiTip}</span>
                </div>
              </div>
            )}

            {/* Before vs After Redistribution summary */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2 text-xs">
              <span className="font-bold text-slate-600 uppercase tracking-wider block">O que mudou na sua trilha:</span>
              <div className="flex items-center justify-between text-slate-700 border-t border-slate-200 pt-2">
                <span>Pendências atrasadas zeradas:</span>
                <span className="font-bold text-teal-800">-{missedCount} item(ns)</span>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span>Novas datas nos dias de estudo:</span>
                <span className="font-bold text-teal-800">Redistribuído com sucesso</span>
              </div>
            </div>

            {/* Confirm CTA */}
            <button
              onClick={handleConfirm}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-teal-700 hover:bg-teal-800 py-3.5 text-sm font-bold text-white shadow-xs transition-all"
            >
              <CheckCircle2 className="h-4 w-4 stroke-[2.5]" />
              <span>Aplicar Novo Cronograma Reorganizado</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

