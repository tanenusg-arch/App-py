import React, { useEffect } from 'react';
import { EfootballAccount } from '../types/account';
import { setupTelegramBackButton } from '../lib/telegram';
import { X, Sparkles, ShoppingCart } from 'lucide-react';

interface AccountComparisonModalProps {
  accounts: EfootballAccount[];
  isOpen: boolean;
  onClose: () => void;
  onSelectBuy: (account: EfootballAccount) => void;
}

export const AccountComparisonModal: React.FC<AccountComparisonModalProps> = ({
  accounts,
  isOpen,
  onClose,
  onSelectBuy,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    const cleanup = setupTelegramBackButton(onClose);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cleanup();
    };
  }, [isOpen, onClose]);

  if (!isOpen || accounts.length < 2) return null;

  const [accA, accB] = accounts;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-black border border-amber-400/30 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-amber-400/20 bg-black/95 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <h3 className="font-bold text-amber-100 text-base">Side-by-Side Squad Comparison</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="glass-btn glass-btn-secondary p-1.5 rounded-full"
          >
            <X className="w-4 h-4 text-amber-200" />
          </button>
        </div>

        {/* Comparison Matrix */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 bg-black">
          {/* Account Title Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[accA, accB].map((acc, index) => (
              <div key={acc.id} className="p-4 bg-black rounded-2xl border border-amber-400/25 space-y-2">
                <span className="text-[10px] uppercase font-bold text-amber-200/60 tracking-wider">
                  Option {index === 0 ? 'A' : 'B'} · {acc.platform}
                </span>
                <h4 className="text-sm font-bold text-amber-100 line-clamp-2">{acc.title}</h4>
                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-xl font-black text-yellow-300 font-mono-num">
                    {(acc.priceETB || (acc.price ? acc.price * 145 : 15000)).toLocaleString()} ETB
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSelectBuy(acc);
                    }}
                    className="glass-btn glass-btn-primary px-3 py-1.5 text-xs font-bold text-black"
                  >
                    <ShoppingCart className="w-3.5 h-3.5 text-black" />
                    <span>Select</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Metric Comparison Table */}
          <div className="bg-black rounded-2xl border border-amber-400/25 overflow-hidden divide-y divide-amber-400/15 text-xs">
            {/* Team Strength */}
            <div className="grid grid-cols-3 p-3 items-center text-center">
              <span className={`font-mono-num font-bold text-sm ${accA.collectiveStrength >= accB.collectiveStrength ? 'text-yellow-300 font-black' : 'text-amber-200/60'}`}>
                {accA.collectiveStrength} PTS
              </span>
              <span className="text-amber-200/70 font-semibold text-[11px] uppercase">Team Strength</span>
              <span className={`font-mono-num font-bold text-sm ${accB.collectiveStrength >= accA.collectiveStrength ? 'text-yellow-300 font-black' : 'text-amber-200/60'}`}>
                {accB.collectiveStrength} PTS
              </span>
            </div>

            {/* Division Peak */}
            <div className="grid grid-cols-3 p-3 items-center text-center">
              <span className="text-amber-100 font-medium truncate">{accA.divisionPeak}</span>
              <span className="text-amber-200/70 font-semibold text-[11px] uppercase">Peak Division</span>
              <span className="text-amber-100 font-medium truncate">{accB.divisionPeak}</span>
            </div>

            {/* Coins Balance */}
            <div className="grid grid-cols-3 p-3 items-center text-center">
              <span className="font-mono-num font-bold text-yellow-300">{accA.coins.toLocaleString()}</span>
              <span className="text-amber-200/70 font-semibold text-[11px] uppercase">Coins Balance</span>
              <span className="font-mono-num font-bold text-yellow-300">{accB.coins.toLocaleString()}</span>
            </div>

            {/* GP Balance */}
            <div className="grid grid-cols-3 p-3 items-center text-center">
              <span className="font-mono-num text-amber-200">{(accA.gp / 1000000).toFixed(1)}M GP</span>
              <span className="text-amber-200/70 font-semibold text-[11px] uppercase">GP Balance</span>
              <span className="font-mono-num text-amber-200">{(accB.gp / 1000000).toFixed(1)}M GP</span>
            </div>

            {/* Epic Boosters */}
            <div className="grid grid-cols-3 p-3 items-center text-center">
              <span className="font-mono-num font-bold text-yellow-200">{accA.epicBoosterCount} Epics</span>
              <span className="text-amber-200/70 font-semibold text-[11px] uppercase">Epic Boosters</span>
              <span className="font-mono-num font-bold text-yellow-200">{accB.epicBoosterCount} Epics</span>
            </div>

            {/* Formation */}
            <div className="grid grid-cols-3 p-3 items-center text-center">
              <span className="font-bold text-amber-100">{accA.formation}</span>
              <span className="text-amber-200/70 font-semibold text-[11px] uppercase">Default Formation</span>
              <span className="font-bold text-amber-100">{accB.formation}</span>
            </div>

            {/* Konami ID Status */}
            <div className="grid grid-cols-3 p-3 items-center text-center">
              <span className="text-yellow-300 font-medium">{accA.konamiIdStatus}</span>
              <span className="text-amber-200/70 font-semibold text-[11px] uppercase">Transfer Type</span>
              <span className="text-yellow-300 font-medium">{accB.konamiIdStatus}</span>
            </div>

            {/* Manager */}
            <div className="grid grid-cols-3 p-3 items-center text-center">
              <span className="text-amber-200 truncate">{accA.manager.name} ({accA.manager.proficiency})</span>
              <span className="text-amber-200/70 font-semibold text-[11px] uppercase">Manager</span>
              <span className="text-amber-200 truncate">{accB.manager.name} ({accB.manager.proficiency})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
