import React, { useState } from 'react';
import { Shield, KeyRound, Smartphone, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export const TransferGuideSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const steps = [
    {
      num: '01',
      title: 'Reserve & Transfer',
      desc: 'Lock your chosen squad for 15 minutes and pay safely using Telebirr or CBE.',
      icon: <Smartphone className="w-4 h-4 text-yellow-300" />,
    },
    {
      num: '02',
      title: 'Credential Unlock',
      desc: 'Konami ID logins and in-game transfer PINs appear automatically in your order vault.',
      icon: <KeyRound className="w-4 h-4 text-yellow-300" />,
    },
    {
      num: '03',
      title: 'Re-bind to Your Email',
      desc: 'Change the registered email on my.konami.net. Backed by 100% Anti-Rollback guarantee.',
      icon: <Shield className="w-4 h-4 text-yellow-300" />,
    },
  ];

  const faqs = [
    {
      q: 'Can the previous owner recover or rollback the account?',
      a: 'No. When you update the primary email on my.konami.net and activate 2FA, all previous access is revoked. Every sale is backed by our Anti-Rollback guarantee.',
    },
    {
      q: 'Does the account work across phones, tablets, and PC?',
      a: 'Yes, Konami ID allows seamless cross-platform sync across Android, iOS, and PC (Steam).',
    },
  ];

  return (
    <section id="transfer-guide" className="py-8 sm:py-10 border-b border-amber-400/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Simple Section Header */}
        <div className="text-center space-y-1">
          <div className="text-[11px] font-bold text-yellow-300 uppercase tracking-widest flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> 3-Step Escrow Handover
          </div>
          <h2 className="text-lg sm:text-2xl font-bold text-amber-100">
            How Safe Transfer Works
          </h2>
        </div>

        {/* 3 Clean Minimal Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="glass-panel p-4 rounded-xl space-y-2 border border-amber-400/20"
            >
              <div className="flex items-center justify-between">
                <div className="p-1.5 bg-black rounded-lg border border-amber-400/25">
                  {step.icon}
                </div>
                <span className="text-sm font-black text-amber-500/50 font-mono-num">{step.num}</span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-amber-100">{step.title}</h3>
              <p className="text-xs text-amber-200/70 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Minimal FAQ Accordion */}
        <div className="max-w-2xl mx-auto space-y-2 pt-2">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={faq.q}
                className="glass-panel rounded-xl overflow-hidden border border-amber-400/20"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-3 text-left flex items-center justify-between gap-3 text-xs font-semibold text-amber-100 hover:text-white transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-amber-400/70 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-3 pb-3 text-xs text-amber-200/70 leading-relaxed border-t border-amber-400/15 pt-2">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
