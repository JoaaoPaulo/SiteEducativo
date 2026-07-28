import React, { useState } from 'react';
import { UserProfile, PaymentMethod } from '../types';
import { ShieldCheck, QrCode, CreditCard, FileText, CheckCircle2, Lock, Sparkles, X, Copy, RefreshCw } from 'lucide-react';

interface SubscriptionModalProps {
  user: UserProfile;
  onSuccess: () => void;
  onClose: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  user,
  onSuccess,
  onClose
}) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [copiedPix, setCopiedPix] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'approved' | 'failed'>('idle');

  // Credit Card Form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState(user.name || '');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const pixKey = "00020126580014BR.GOV.BCB.PIX0136trilhaenem-assinatura-pro-2026520400005303986540529.905802BR5910TrilhaENEM6009SAO PAULO62070503***6304E0C1";

  const handleCopyPix = () => {
    navigator.clipboard?.writeText(pixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const handleSimulatePayment = (forcedStatus: 'approved' | 'failed' = 'approved') => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (forcedStatus === 'approved') {
        setPaymentStatus('approved');
        setTimeout(() => {
          onSuccess();
        }, 1200);
      } else {
        setPaymentStatus('failed');
      }
    }, 1500);
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
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-200 px-3 py-1 text-xs font-bold text-teal-800 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-teal-700" />
            <span>Assinatura Mensal • Plano Trilha ENEM Pro</span>
          </div>

          <h2 className="text-2xl font-black text-slate-900">R$ 29,90 <span className="text-xs font-medium text-slate-500">/ mês</span></h2>
          <p className="text-xs text-slate-600 mt-1">
            Acesso ilimitado ao cronograma adaptativo com replanejamento automático sem limites.
          </p>
        </div>


        {/* Payment Method Selector */}
        <div className="mt-6 grid grid-cols-3 gap-2">
          {[
            { id: 'pix', label: 'Pix', icon: QrCode, badge: 'Aprovação Instantânea' },
            { id: 'card', label: 'Cartão', icon: CreditCard, badge: 'Crédito' },
            { id: 'boleto', label: 'Boleto', icon: FileText, badge: '1 a 3 dias' },
          ].map(m => {
            const isSel = paymentMethod === m.id;
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                onClick={() => { setPaymentMethod(m.id as PaymentMethod); setPaymentStatus('idle'); }}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                  isSel
                    ? 'border-teal-700 bg-teal-50/80 text-teal-900 font-bold shadow-2xs'
                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                }`}
              >
                <Icon className="h-5 w-5 mb-1 text-teal-700" />
                <span className="text-xs">{m.label}</span>
                <span className="text-[9px] text-slate-500 mt-0.5">{m.badge}</span>
              </button>
            );
          })}
        </div>


        {/* Payment Form / Details */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
          
          {/* PIX */}
          {paymentMethod === 'pix' && (
            <div className="text-center space-y-4">
              <p className="text-xs text-slate-600">
                Copie a chave Pix abaixo para pagar R$ 29,90 no seu aplicativo de banco:
              </p>

              <div className="rounded-xl border border-slate-200 bg-white p-3 text-[11px] font-mono text-slate-700 break-all select-all">
                {pixKey}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleCopyPix}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all"
                >
                  <Copy className="h-3.5 w-3.5" />
                  <span>{copiedPix ? 'Copiado com Sucesso!' : 'Copiar Chave Pix'}</span>
                </button>

                <button
                  onClick={() => handleSimulatePayment('approved')}
                  disabled={isProcessing}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-teal-700 py-2.5 text-xs font-bold text-white hover:bg-teal-800 transition-all"
                >
                  {isProcessing ? (
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  )}
                  <span>{isProcessing ? 'Confirmando...' : 'Já Paguei no Pix'}</span>
                </button>
              </div>
            </div>
          )}


          {/* CREDIT CARD */}
          {paymentMethod === 'card' && (
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">Número do Cartão</label>
                <input
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-teal-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">Nome no Cartão</label>
                <input
                  type="text"
                  placeholder="Nome impresso no cartão"
                  value={cardName}
                  onChange={e => setCardName(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-teal-700 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">Validade (MM/AA)</label>
                  <input
                    type="text"
                    placeholder="12/28"
                    value={expiry}
                    onChange={e => setExpiry(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-teal-700 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-600 mb-1">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cvv}
                    onChange={e => setCvv(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-teal-700 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => handleSimulatePayment('approved')}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-teal-700 py-3 text-xs font-bold text-white hover:bg-teal-800 transition-all"
                >
                  {isProcessing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
                  <span>Assinar Pro por R$ 29,90/mês</span>
                </button>
              </div>
            </div>
          )}


          {/* BOLETO */}
          {paymentMethod === 'boleto' && (
            <div className="text-center space-y-3">
              <p className="text-xs text-slate-600">
                O boleto será gerado no nome de {user.name} ({user.email}). A liberação ocorre assim que o banco compensar o pagamento.
              </p>
              <button
                onClick={() => handleSimulatePayment('approved')}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-800 py-3 text-xs font-bold text-white hover:bg-slate-900 transition-all"
              >
                <FileText className="h-4 w-4 text-teal-400" />
                <span>Gerar Boleto & Ativar Acesso Teste</span>
              </button>
            </div>
          )}

        </div>


        {/* Payment Outcome Notification */}
        {paymentStatus === 'approved' && (
          <div className="mt-4 rounded-xl bg-teal-50 border border-teal-200 p-3 text-center text-xs text-teal-900 font-bold animate-pulse">
            Pagamento Confirmado! Redirecionando para seu Dashboard Pro...
          </div>
        )}

        {paymentStatus === 'failed' && (
          <div className="mt-4 rounded-xl bg-rose-50 border border-rose-200 p-3 text-center text-xs text-rose-800">
            Pagamento recusado. Tente novamente ou troque a forma de pagamento.
          </div>
        )}

        <div className="mt-5 text-center text-[10px] text-slate-500 flex items-center justify-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-teal-700 shrink-0" />
          <span>Processamento seguro com criptografia. Cancele quando quiser nas configurações.</span>
        </div>

      </div>
    </div>
  );
};

