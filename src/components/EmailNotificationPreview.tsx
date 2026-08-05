import React, { useState } from 'react';
import { UserProfile, StudyTrail } from '../types';
import { Mail, Bell, CheckCircle2, Calendar, Sparkles, X, Clock, ArrowRight } from 'lucide-react';

interface EmailNotificationPreviewProps {
  user: UserProfile | null;
  trail: StudyTrail | null;
  onClose: () => void;
}

export const EmailNotificationPreview: React.FC<EmailNotificationPreviewProps> = ({
  user,
  trail,
  onClose
}) => {
  const [activeTemplate, setActiveTemplate] = useState<'daily' | 'weekly'>('daily');
  const [reminderTime, setReminderTime] = useState('20:00');
  const [dailyReminderEnabled, setDailyReminderEnabled] = useState(true);
  const [weeklyReportEnabled, setWeeklyReportEnabled] = useState(true);

  const name = user?.name || 'Estudante';
  const email = user?.email || 'aluno@exemplo.com';

  const completedCount = trail?.items.filter(i => i.status === 'CONCLUIDO').length || 3;
  const totalCount = trail?.items.length || 12;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl text-slate-800">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 border border-teal-200 text-teal-700">
            <Mail className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Central de Notificações & E-mails</h2>
            <p className="text-xs text-slate-500">Configure e veja a prévia dos lembretes automáticos de estudo</p>
          </div>
        </div>


        {/* Notification Settings Bar */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 mb-6 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Configuração de Lembretes Automáticos</h3>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="daily"
                checked={dailyReminderEnabled}
                onChange={e => setDailyReminderEnabled(e.target.checked)}
                className="rounded accent-teal-700 h-4 w-4"
              />
              <label htmlFor="daily" className="font-medium text-slate-800">
                Lembrete Diário por E-mail (quando faltar check-in)
              </label>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 text-[11px]">Horário:</span>
              <input
                type="time"
                value={reminderTime}
                onChange={e => setReminderTime(e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs text-teal-800 font-mono font-bold"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="weekly"
                checked={weeklyReportEnabled}
                onChange={e => setWeeklyReportEnabled(e.target.checked)}
                className="rounded accent-teal-700 h-4 w-4"
              />
              <label htmlFor="weekly" className="font-medium text-slate-800">
                Resumo Semanal de Desempenho (todo domingo)
              </label>
            </div>
            <span className="text-[10px] text-teal-800 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">Ativo</span>
          </div>
        </div>


        {/* Template Switcher */}
        <div className="flex border-b border-slate-200 mb-4">
          <button
            onClick={() => setActiveTemplate('daily')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 ${
              activeTemplate === 'daily'
                ? 'border-teal-700 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Prévia: Lembrete Diário
          </button>
          <button
            onClick={() => setActiveTemplate('weekly')}
            className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 ${
              activeTemplate === 'weekly'
                ? 'border-teal-700 text-teal-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Prévia: Resumo Semanal
          </button>
        </div>


        {/* Simulated Email Envelope Box */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 font-sans space-y-4">
          
          {/* Email Meta */}
          <div className="border-b border-slate-200 pb-3 text-xs space-y-1">
            <p className="text-slate-600"><strong className="text-slate-800">De:</strong> AdaptoSTDY &lt;notificacoes@adaptostdy.com.br&gt;</p>
            <p className="text-slate-600"><strong className="text-slate-800">Para:</strong> {name} &lt;{email}&gt;</p>
            <p className="text-blue-900 font-bold pt-1">
              {activeTemplate === 'daily' 
                ? `Assunto: ${name}, seu tópico de Matemática de hoje te espera! (Check-in AdaptoSTDY)`
                : `Assunto: Seu Resumo Semanal de Estudos AdaptoSTDY — Veja seu progresso!`}
            </p>
          </div>

          {/* Email Body Content */}
          {activeTemplate === 'daily' ? (
            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <p>Olá, <strong>{name}</strong>!</p>
              <p>
                Notamos que você ainda não fez o check-in dos seus estudos hoje na plataforma.
              </p>
              
              <div className="rounded-xl border border-teal-200 bg-white p-3.5 space-y-1">
                <p className="font-bold text-slate-900 text-sm">Tópico Agendado de Hoje:</p>
                <p className="text-teal-800 font-bold">Matemática Básica: Razão, Proporção e Regra de Três</p>
                <p className="text-slate-500 text-[11px]">Duração estimada: 50 minutos • Alta Incidência no ENEM</p>
              </div>

              <p>
                Lembre-se: se você não conseguir estudar hoje, não se preocupe! Ao sinalizar no sistema, o cronograma redistribuirá esse tópico nos seus próximos dias livres para manter a regularidade.
              </p>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="rounded-xl bg-teal-700 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-teal-800"
                >
                  Fazer Check-in Agora no App
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <p>Parabéns pelo esforço desta semana, <strong>{name}</strong>!</p>
              <p>Aqui está o seu relatório semanal de acompanhamento para o ENEM:</p>

              <div className="grid grid-cols-2 gap-2 text-center my-3">
                <div className="rounded-xl border border-slate-200 bg-white p-3">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Tópicos Concluídos</span>
                  <p className="text-lg font-black text-teal-800">{completedCount} / {totalCount}</p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Aproveitamento</span>
                  <p className="text-lg font-black text-teal-800">{Math.round((completedCount/totalCount)*100)}%</p>
                </div>
              </div>

              <p className="text-slate-500 italic">
                "A consistência é a maior aliada da sua nota 1000. Continue no ritmo para a próxima semana!"
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

