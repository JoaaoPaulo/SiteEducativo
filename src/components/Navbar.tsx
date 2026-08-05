import React from 'react';
import { UserProfile } from '../types';
import { GraduationCap, Sparkles, User, Lock, Calendar, Mail, ShieldCheck, BookOpen } from 'lucide-react';

interface NavbarProps {
  user: UserProfile | null;
  activeTab: 'landing' | 'wizard' | 'preview' | 'dashboard' | 'checkout' | 'enem-topics';
  setActiveTab: (tab: 'landing' | 'wizard' | 'preview' | 'dashboard' | 'checkout' | 'enem-topics') => void;
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
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md text-slate-100 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        
        {/* Logo */}
        <div 
          onClick={() => {
            if (user) {
              setActiveTab(user.isSubscribed ? 'dashboard' : 'preview');
            } else {
              setActiveTab('landing');
            }
          }}
          className="flex cursor-pointer items-center gap-2.5 group"
        >
          <div className="flex h-10 w-10 overflow-hidden items-center justify-center rounded-xl bg-slate-900 shadow-sm border border-slate-800 group-hover:bg-slate-800 transition-all duration-300">
            <img src="/logo.png" alt="Trilha ENEM Logo" className="h-full w-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl tracking-tight text-slate-100">
                trilha<span className="text-teal-500">enem</span>
              </span>
              <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[9px] font-extrabold text-slate-300 border border-slate-800 uppercase tracking-wider">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-bold hidden sm:block">
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
            className="flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/50 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-slate-100 transition-all"
          >
            <Mail className="h-3.5 w-3.5 text-teal-500" />
            <span className="hidden md:inline">Notificações</span>
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              {/* Plan Badge */}
              {user.isSubscribed ? (
                <span className="flex items-center gap-1 rounded-full bg-emerald-950/50 border border-emerald-800/80 px-2.5 py-1 text-xs font-semibold text-emerald-400 shadow-2xs">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="hidden sm:inline">Assinante Pro</span>
                </span>
              ) : (
                <button
                  onClick={() => setActiveTab('checkout')}
                  className="flex items-center gap-1 rounded-full bg-amber-950/50 border border-amber-800/80 px-2.5 py-1 text-xs font-semibold text-amber-400 hover:bg-amber-900/50 transition-all"
                >
                  <Lock className="h-3.5 w-3.5 text-amber-400" />
                  <span>Ativar Pro</span>
                </button>
              )}

              {/* View Dashboard or Preview */}
              <button
                onClick={() => setActiveTab(user.isSubscribed ? 'dashboard' : 'preview')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === 'dashboard' || activeTab === 'preview'
                    ? 'bg-teal-600 text-white shadow-xs hover:bg-teal-500'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Minha Trilha</span>
                </span>
              </button>

              {/* View ENEM Topics */}
              <button
                onClick={() => setActiveTab('enem-topics')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === 'enem-topics'
                    ? 'bg-teal-600 text-white shadow-xs hover:bg-teal-500'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Conteúdos ENEM</span>
                </span>
              </button>

              {/* Profile Button */}
              <button
                onClick={onOpenProfile}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/50 text-slate-300 hover:bg-slate-800 hover:text-slate-100 transition-all"
                title="Meu Perfil & Configurações"
              >
                <User className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenMagicLink}
                className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-slate-100 transition-all"
              >
                Entrar
              </button>
              <button
                onClick={() => setActiveTab('wizard')}
                className="flex items-center gap-1.5 rounded-lg bg-teal-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-teal-500 transition-all"
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

