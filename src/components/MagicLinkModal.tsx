import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Mail, Sparkles, X, CheckCircle2, ArrowRight } from 'lucide-react';

interface MagicLinkModalProps {
  onLogin: (email: string) => void;
  onClose: () => void;
}

export const MagicLinkModal: React.FC<MagicLinkModalProps> = ({ onLogin, onClose }) => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSent(true);
      setTimeout(() => {
        onLogin(email);
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="relative w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl text-slate-800">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 border border-teal-200 text-teal-800 mb-3">
            <Mail className="h-6 w-6" />
          </div>

          <h2 className="text-xl font-black text-slate-900">Entrar sem Senha</h2>
          <p className="text-xs text-slate-500 mt-1">
            Digite seu e-mail cadastrado. Enviaremos um link de acesso direto para sua conta.
          </p>
        </div>

        {sent ? (
          <div className="mt-6 rounded-2xl bg-teal-50 border border-teal-200 p-4 text-center space-y-2">
            <CheckCircle2 className="h-8 w-8 text-teal-800 mx-auto" />
            <p className="text-xs font-bold text-teal-900">Link de Acesso Enviado!</p>
            <p className="text-[11px] text-slate-600">
              Verifique a caixa de entrada de <strong>{email}</strong>. Entrando no app em instantes...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">Seu E-mail</label>
              <input
                type="email"
                required
                placeholder="Ex: estudante@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-900 focus:border-teal-700 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-teal-700 py-3 text-xs font-bold text-white hover:bg-teal-800 transition-all shadow-xs"
            >
              <span>Enviar Link de Acesso por E-mail</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};

