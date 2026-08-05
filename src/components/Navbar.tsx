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
    <header className="sticky top-0 z-40 w-full border-b border-line bg-surface/85 backdrop-blur-md text-ink shadow-xs">
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
          <div className="flex h-10 w-10 overflow-hidden items-center justify-center rounded-xl bg-white shadow-xs border border-line group-hover:bg-slate-50 transition-all duration-300">
            <img src="/logo.png" alt="Trilha ENEM Logo" className="h-full w-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-ink font-display">
                trilha<span className="text-blue-600">enem</span>
              </span>
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[9px] font-extrabold text-blue-700 border border-blue-200 uppercase tracking-wider">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-muted font-bold hidden sm:block">
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
            className="flex items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 py-1.5 text-xs font-medium text-muted hover:bg-slate-50 hover:text-ink transition-all"
          >
            <Mail className="h-3.5 w-3.5 text-blue-600" />
            <span className="hidden md:inline">Notificações</span>
          </button>
 
          {user ? (
            <div className="flex items-center gap-2">
              {/* Plan Badge */}
              {user.isSubscribed ? (
                <span className="flex items-center gap-1 rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-1 text-xs font-semibold text-emerald-800 shadow-2xs">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="hidden sm:inline">Assinante Pro</span>
                </span>
              ) : (
                <button
                  onClick={() => setActiveTab('checkout')}
                  className="flex items-center gap-1 rounded-full bg-amber-100 border border-amber-300 px-2.5 py-1 text-xs font-semibold text-amber-800 hover:bg-amber-200 transition-all"
                >
                  <Lock className="h-3.5 w-3.5 text-amber-600" />
                  <span>Ativar Pro</span>
                </button>
              )}
 
              {/* View Dashboard or Preview */}
              <button
                onClick={() => setActiveTab(user.isSubscribed ? 'dashboard' : 'preview')}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  activeTab === 'dashboard' || activeTab === 'preview'
                    ? 'bg-blue-600 text-white shadow-xs hover:bg-blue-700'
                    : 'bg-slate-100 text-muted hover:bg-slate-200 hover:text-ink'
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
                    ? 'bg-blue-600 text-white shadow-xs hover:bg-blue-700'
                    : 'bg-slate-100 text-muted hover:bg-slate-200 hover:text-ink'
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
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-white text-muted hover:bg-slate-50 hover:text-ink transition-all"
                title="Meu Perfil & Configurações"
              >
                <User className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenMagicLink}
                className="rounded-lg px-3 py-1.5 text-xs font-semibold text-muted hover:text-ink transition-all"
              >
                Entrar
              </button>
              <button
                onClick={() => setActiveTab('wizard')}
                className="flex items-center gap-1.5 rounded-xl bg-grad-institucional px-4 py-2 text-xs font-black text-white shadow-md shadow-blue-600/25 transform hover:-translate-y-0.5 transition-all duration-300 border border-white/20 cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5 text-white" />
                <span>Criar Trilha Grátis</span>
              </button>
            </div>
          )}
        </div>
 
      </div>
    </header>
  );
};

