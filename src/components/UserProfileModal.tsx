import React, { useState } from 'react';
import { UserProfile, StudyTrail } from '../types';
import { User, Calendar, Clock, ShieldCheck, RefreshCw, X, LogOut, CheckCircle2 } from 'lucide-react';

interface UserProfileModalProps {
  user: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onRecalculateTrail: () => void;
  onCancelSubscription: () => void;
  onClose: () => void;
  onLogout: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  user,
  onUpdateProfile,
  onRecalculateTrail,
  onCancelSubscription,
  onClose,
  onLogout
}) => {
  const [name, setName] = useState(user.name);
  const [examDate, setExamDate] = useState(user.examDate || '2026-11-08');
  const [hoursPerWeek, setHoursPerWeek] = useState(user.hoursPerWeek || 15);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: UserProfile = {
      ...user,
      name,
      examDate,
      hoursPerWeek
    };
    onUpdateProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl text-slate-800">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 font-bold">
            <User className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Meu Perfil & Plano</h2>
            <p className="text-xs text-slate-500">{user.email}</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Seu Nome</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 focus:border-teal-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Data da Prova do ENEM</label>
            <input
              type="date"
              value={examDate}
              onChange={e => setExamDate(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2.5 text-xs text-slate-900 focus:border-teal-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Conteúdos Dominados / Revisão</label>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-700 font-medium flex items-center justify-between">
              <span>Tópicos marcados para modo revisão:</span>
              <span className="font-bold text-teal-800">{user.studiedTopicIds?.length || 0} tópicos</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="submit"
              className="rounded-xl bg-teal-700 px-4 py-2 font-bold text-white hover:bg-teal-800 transition-all"
            >
              Salvar Alterações
            </button>

            {savedSuccess && (
              <span className="text-teal-800 font-bold flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" /> Salvo!
              </span>
            )}
          </div>
        </form>


        {/* Recalculate Trail Action */}
        <div className="mt-6 border-t border-slate-200 pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-900">Recalcular Trilha Inteira</p>
              <p className="text-[11px] text-slate-500">Dispara um recálculo da trilha com base nos novos dados.</p>
            </div>
            <button
              onClick={() => {
                onRecalculateTrail();
                onClose();
              }}
              className="flex items-center gap-1.5 rounded-xl border border-teal-200 bg-teal-50 px-3 py-1.5 text-xs font-bold text-teal-800 hover:bg-teal-100"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Recalcular</span>
            </button>
          </div>
        </div>


        {/* Subscription Management */}
        <div className="mt-6 border-t border-slate-200 pt-4">
          <h3 className="text-xs font-bold text-slate-700 uppercase mb-2">Status da Assinatura</h3>
          
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 flex items-center justify-between text-xs">
            <div>
              <p className="font-bold text-slate-900">
                {user.isSubscribed ? 'Plano Pro Ativo (R$ 29,90/mês)' : 'Plano Gratuito (Prévia)'}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {user.isSubscribed ? 'Renovação mensal automática • Cancele quando quiser' : 'Acesso à Semana 1'}
              </p>
            </div>

            {user.isSubscribed && (
              <button
                onClick={() => {
                  onCancelSubscription();
                  alert('Sua assinatura foi cancelada com sucesso. Você ainda tem acesso até o fim do ciclo vigente.');
                }}
                className="text-[11px] font-bold text-rose-600 hover:underline"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>

        {/* Logout */}
        <div className="mt-6 border-t border-slate-200 pt-4 text-center">
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-600 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sair da Conta</span>
          </button>
        </div>

      </div>
    </div>
  );
};

