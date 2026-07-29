import React from 'react';
import { UserProfile } from '../types';
import { GraduationCap, Sparkles, User, Lock, Calendar, Mail, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  user: UserProfile | null;
  activeTab: 'landing' | 'wizard' | 'preview' | 'dashboard' | 'checkout';
  setActiveTab: (tab: 'landing' | 'wizard' | 'preview' | 'dashboard' | 'checkout') => void;
  onOpenProfile: () => void;
  onOpenEmailPreview: () => void;
  onOpenMagicLink: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeTab,
  setActiveTab,
  onOpenProfile,
  onOpenEmailPreview,
  onOpenMagicLink
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md text-slate-800 shadow-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        
        {/* Logo */}
        <div 
          onClick={() => setActiveTab(user?.isSubscribed ? 'dashboard' : 'landing')}
          className="flex cursor-pointer items-center gap-2.5 group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-teal-400 font-extrabold shadow-sm border border-slate-800 group-hover:bg-slate-900 transition-all duration-300">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight text-slate-900">
                trilha<span className="text-teal-700">enem</span>
              </span>
              <span className="rounded-full bg-slate-50 px-2 py-0.5 text-[9px] font-extrabold text-slate-700 border border-slate-200 uppercase tracking-wider">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-bold hidden sm:block">
              Cronograma Inteligente & Adaptativo
            </p>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick email preview tool */}
          <button
            onClick={onOpenEmailPreview}
            title="Ver lembretes e relatórios por email"
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all"
          >
            <Mail className="h-3.5 w-3.5 text-teal-700" />
            <span className="hidden md:inline">Notificações</span>
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              {/* Plan Badge */}
              {user.isSubscribed ? (
                <span className="flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-xs font-semibold text-emerald-800 shadow-2xs">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
                  <span className="hidden sm:inline">Assinante Pro</span>
                </span>
              ) : (
                <button
                  onClick={() => setActiveTab('checkout')}
                  className="flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-xs font-semibold text-amber-800 hover:bg-amber-100 transition-all"
                >
                  <Lock className="h-3.5 w-3.5 text-amber-700" />
                  <span>Ativar Pro</span>
                </button>
              )}

              {/* View Dashboard or Preview */}
              <button
                onClick={() => setActiveTab(user.isSubscribed ? 'dashboard' : 'preview')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === 'dashboard' || activeTab === 'preview'
                    ? 'bg-teal-700 text-white shadow-xs hover:bg-teal-800'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Minha Trilha</span>
                </span>
              </button>

              {/* Profile Button */}
              <button
                onClick={onOpenProfile}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all"
                title="Meu Perfil & Configurações"
              >
                <User className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenMagicLink}
                className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-all"
              >
                Entrar
              </button>
              <button
                onClick={() => setActiveTab('wizard')}
                className="flex items-center gap-1.5 rounded-lg bg-teal-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-teal-800 transition-all"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Criar Trilha Grátis</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

