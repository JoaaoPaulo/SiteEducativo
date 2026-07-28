import React, { useState, useEffect } from 'react';
import { UserProfile, StudyTrail, TrailItem, CheckInStatus } from './types';
import { generateTrailForUser } from './utils/trailGenerator';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { WizardForm } from './components/WizardForm';
import { TrailLoadingState } from './components/TrailLoadingState';
import { TrailPreview } from './components/TrailPreview';
import { Dashboard } from './components/Dashboard';
import { SubscriptionModal } from './components/SubscriptionModal';
import { AiReplanModal } from './components/AiReplanModal';
import { EmailNotificationPreview } from './components/EmailNotificationPreview';
import { UserProfileModal } from './components/UserProfileModal';
import { MagicLinkModal } from './components/MagicLinkModal';

const USER_STORAGE_KEY = 'trilha_enem_user_v1';
const TRAIL_STORAGE_KEY = 'trilha_enem_trail_v1';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [trail, setTrail] = useState<StudyTrail | null>(() => {
    try {
      const saved = localStorage.getItem(TRAIL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState<'landing' | 'wizard' | 'loading' | 'preview' | 'dashboard' | 'checkout'>(() => {
    if (user && trail) {
      return user.isSubscribed ? 'dashboard' : 'preview';
    }
    return 'landing';
  });

  // Modal states
  const [showAiReplan, setShowAiReplan] = useState(false);
  const [missedItemForAi, setMissedItemForAi] = useState<TrailItem | undefined>(undefined);
  const [showEmailPreview, setShowEmailPreview] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMagicLinkModal, setShowMagicLinkModal] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  useEffect(() => {
    if (trail) {
      localStorage.setItem(TRAIL_STORAGE_KEY, JSON.stringify(trail));
    } else {
      localStorage.removeItem(TRAIL_STORAGE_KEY);
    }
  }, [trail]);

  // Handle Wizard Submission (RF-06)
  const handleWizardSubmit = (profile: UserProfile) => {
    setUser(profile);
    setActiveTab('loading');
  };

  // Called when TrailLoadingState finishes
  const handleLoadingFinish = () => {
    if (user) {
      const newTrail = generateTrailForUser(user);
      setTrail(newTrail);
      setActiveTab(user.isSubscribed ? 'dashboard' : 'preview');
    }
  };

  // Handle Check-in update (RF-20)
  const handleCheckIn = (itemId: string, status: CheckInStatus) => {
    if (!trail) return;

    const updatedItems = trail.items.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          status,
          completedAt: status === 'CONCLUIDO' ? new Date().toISOString() : undefined
        };
      }
      return item;
    });

    const completedCount = updatedItems.filter(i => i.status === 'CONCLUIDO').length;
    const missedCount = updatedItems.filter(i => i.status === 'ATRASADO').length;

    const updatedTrail: StudyTrail = {
      ...trail,
      items: updatedItems,
      completedCount,
      missedCount
    };

    setTrail(updatedTrail);
  };

  // Trigger AI Re-plan flow (RF-21)
  const handleTriggerAiReplan = (missedItem?: TrailItem) => {
    setMissedItemForAi(missedItem);
    setShowAiReplan(true);
  };

  // Apply AI rebalanced trail
  const handleApplyReplanTrail = (rebalancedTrail: StudyTrail) => {
    setTrail(rebalancedTrail);
  };

  // Handle Subscription Success (RF-16)
  const handleSubscriptionSuccess = () => {
    if (user) {
      const updatedUser: UserProfile = {
        ...user,
        isSubscribed: true,
        subscriptionDate: new Date().toISOString()
      };
      setUser(updatedUser);
      setActiveTab('dashboard');
    }
  };

  // Recalculate trail from user profile edits (RF-27)
  const handleRecalculateTrail = () => {
    if (user) {
      const newTrail = generateTrailForUser(user);
      setTrail(newTrail);
    }
  };

  // Cancel subscription (RF-17)
  const handleCancelSubscription = () => {
    if (user) {
      setUser({
        ...user,
        isSubscribed: false
      });
      setActiveTab('preview');
    }
  };

  // Passwordless magic link login (RF-26)
  const handleMagicLinkLogin = (email: string) => {
    setShowMagicLinkModal(false);
    if (!user) {
      const mockUser: UserProfile = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0],
        email,
        examDate: '2026-11-08',
        hoursPerWeek: 15,
        availableDays: ['seg', 'ter', 'qua', 'qui', 'sex'],
        difficulties: {
          'Linguagens e Códigos': 'Médio',
          'Matemática': 'Preciso de Muita Ajuda',
          'Ciências da Natureza': 'Preciso de Muita Ajuda',
          'Ciências Humanas': 'Domino Bem',
          'Redação Nota 1000': 'Médio'
        },
        studiedTopicIds: [],
        isSubscribed: true,
        createdAt: new Date().toISOString()
      };
      setUser(mockUser);
      const newTrail = generateTrailForUser(mockUser);
      setTrail(newTrail);
      setActiveTab('dashboard');
    }
  };

  // Logout
  const handleLogout = () => {
    setUser(null);
    setTrail(null);
    setShowProfileModal(false);
    setActiveTab('landing');
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Navbar */}
      <Navbar
        user={user}
        activeTab={activeTab === 'loading' ? 'wizard' : activeTab}
        setActiveTab={setActiveTab}
        onOpenProfile={() => setShowProfileModal(true)}
        onOpenEmailPreview={() => setShowEmailPreview(true)}
        onOpenMagicLink={() => setShowMagicLinkModal(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingPage onStartWizard={() => setActiveTab('wizard')} />
        )}

        {activeTab === 'wizard' && (
          <WizardForm
            onSubmit={handleWizardSubmit}
            onCancel={() => setActiveTab(user ? (user.isSubscribed ? 'dashboard' : 'preview') : 'landing')}
          />
        )}

        {activeTab === 'loading' && (
          <TrailLoadingState onFinished={handleLoadingFinish} />
        )}

        {activeTab === 'preview' && user && trail && (
          <TrailPreview
            user={user}
            trail={trail}
            onSubscribe={() => setActiveTab('checkout')}
            onCheckIn={handleCheckIn}
          />
        )}

        {activeTab === 'dashboard' && user && trail && (
          <Dashboard
            user={user}
            trail={trail}
            onCheckIn={handleCheckIn}
            onTriggerAiReplan={handleTriggerAiReplan}
          />
        )}

        {activeTab === 'checkout' && user && (
          <div className="min-h-[85vh] flex items-center justify-center p-4">
            <SubscriptionModal
              user={user}
              onSuccess={handleSubscriptionSuccess}
              onClose={() => setActiveTab(user.isSubscribed ? 'dashboard' : 'preview')}
            />
          </div>
        )}
      </main>

      {/* Modals & Drawers */}
      {showAiReplan && user && trail && (
        <AiReplanModal
          user={user}
          trail={trail}
          missedItem={missedItemForAi}
          onApplyReplan={handleApplyReplanTrail}
          onClose={() => setShowAiReplan(false)}
        />
      )}

      {showEmailPreview && (
        <EmailNotificationPreview
          user={user}
          trail={trail}
          onClose={() => setShowEmailPreview(false)}
        />
      )}

      {showProfileModal && user && (
        <UserProfileModal
          user={user}
          onUpdateProfile={updated => setUser(updated)}
          onRecalculateTrail={handleRecalculateTrail}
          onCancelSubscription={handleCancelSubscription}
          onClose={() => setShowProfileModal(false)}
          onLogout={handleLogout}
        />
      )}

      {showMagicLinkModal && (
        <MagicLinkModal
          onLogin={handleMagicLinkLogin}
          onClose={() => setShowMagicLinkModal(false)}
        />
      )}

    </div>
  );
}
