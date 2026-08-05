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
        
        {/* Conditional Logo based on Brandbook */}
        {user ? (
          // Product Lockup: STDY por ADAPTO
          <div 
            onClick={() => setActiveTab(user.isSubscribed ? 'dashboard' : 'preview')}
            className="flex cursor-pointer items-center gap-2.5 group select-none"
          >
            <div className="flex h-10 w-10 overflow-hidden items-center justify-center rounded-[10px] bg-white border border-line group-hover:bg-slate-50 transition-all duration-300">
              <svg className="h-6 w-6 text-[#2563EB]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 58 L50 75 V85 L15 68 Z" fill="#1D4ED8" />
                <path d="M50 75 L85 58 V68 L50 85 Z" fill="#60A5FA" />
                <path d="M15 58 L50 75 L85 58 L50 41 Z" fill="#2563EB" />
                <path d="M50 55 L78 27 M78 27 H62 M78 27 V43" stroke="#2563EB" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-[0.14em] text-ink font-display uppercase">
                  stdy
                </span>
                <span className="rounded-full bg-blue-50 border border-blue-200 px-1.5 py-0.5 text-[8px] font-black text-blue-700 uppercase tracking-widest">
                  PRO
                </span>
              </div>
              <span className="text-[7.5px] font-semibold text-muted tracking-[0.16em] uppercase mt-0.5">
                por adapto
              </span>
            </div>
          </div>
        ) : (
          // Website Lockup: ADAPTO
          <div 
            onClick={() => setActiveTab('landing')}
            className="flex cursor-pointer items-center gap-2.5 group select-none"
          >
            <div className="flex h-10 w-10 overflow-hidden items-center justify-center rounded-[10px] bg-white border border-line group-hover:bg-slate-50 transition-all duration-300">
              <svg className="h-6 w-6 text-[#2563EB]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 58 L50 75 V85 L15 68 Z" fill="#1D4ED8" />
                <path d="M50 75 L85 58 V68 L50 85 Z" fill="#60A5FA" />
                <path d="M15 58 L50 75 L85 58 L50 41 Z" fill="#2563EB" />
                <path d="M50 55 L78 27 M78 27 H62 M78 27 V43" stroke="#2563EB" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-extrabold text-xl tracking-tight text-ink font-display uppercase">
                adapto
              </span>
              <span className="text-[9px] font-bold text-muted mt-0.5 hidden sm:block">
                O plano evolui com você.
              </span>
            </div>
          </div>
        )}

        {/* Website Navigation Menu (Page 65) */}
        {!user && (
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-muted tracking-wider uppercase">
            <a href="#como-funciona" className="hover:text-ink transition-colors cursor-pointer">Como funciona</a>
            <a href="#produto" className="hover:text-ink transition-colors cursor-pointer">STDY</a>
            <a href="#faq" className="hover:text-ink transition-colors cursor-pointer">Dúvidas</a>
          </nav>
        )}
 
        {/* Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick email preview tool */}
          <button
            onClick={onOpenEmailPreview}
            title="Ver lembretes e relatórios por email"
            className="flex items-center gap-1.5 rounded-[10px] border border-line bg-white px-2.5 py-1.5 text-xs font-semibold text-muted hover:bg-slate-50 hover:text-ink transition-all cursor-pointer"
          >
            <Mail className="h-3.5 w-3.5 text-blue-600" />
            <span className="hidden md:inline">Notificações</span>
          </button>
 
          {user ? (
            <div className="flex items-center gap-2">
              {/* Plan Badge */}
              {user.isSubscribed ? (
                <span className="flex items-center gap-1 rounded-[10px] bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 text-xs font-semibold text-emerald-800 shadow-2xs">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="hidden sm:inline">Assinante Pro</span>
                </span>
              ) : (
                <button
                  onClick={() => setActiveTab('checkout')}
                  className="flex items-center gap-1 rounded-[10px] bg-amber-50 border border-amber-200 px-2.5 py-1.5 text-xs font-semibold text-amber-800 hover:bg-amber-100 transition-all cursor-pointer"
                >
                  <Lock className="h-3.5 w-3.5 text-amber-600" />
                  <span>Ativar Pro</span>
                </button>
              )}
 
              {/* View Dashboard or Preview */}
              <button
                onClick={() => setActiveTab(user.isSubscribed ? 'dashboard' : 'preview')}
                className={`rounded-[10px] px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'dashboard' || activeTab === 'preview'
                    ? 'bg-blue-600 text-white shadow-xs hover:bg-blue-700'
                    : 'bg-slate-100 text-muted hover:bg-slate-200 hover:text-ink'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Meu Plano</span>
                </span>
              </button>
 
              {/* View ENEM Topics */}
              <button
                onClick={() => setActiveTab('enem-topics')}
                className={`rounded-[10px] px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
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
                className="flex h-8 w-8 items-center justify-center rounded-[10px] border border-line bg-white text-muted hover:bg-slate-50 hover:text-ink transition-all cursor-pointer"
                title="Meu Perfil & Configurações"
              >
                <User className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenMagicLink}
                className="rounded-[10px] px-3 py-1.5 text-xs font-semibold text-muted hover:text-ink transition-all cursor-pointer"
              >
                Entrar
              </button>
              <button
                onClick={() => setActiveTab('wizard')}
                className="flex items-center gap-1.5 h-10 px-5 rounded-[10px] bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-98 text-xs font-semibold text-white shadow-xs transition-all duration-120 cursor-pointer"
              >
                <span>Criar meu plano</span>
              </button>
            </div>
          )}
        </div>
 
      </div>
    </header>
  );
};

