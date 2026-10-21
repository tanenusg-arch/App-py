import React from 'react';
import { EfootballAccount } from '../types/account';
import { Clock, ShieldCheck, ArrowRight, Lock } from 'lucide-react';

interface AccountCardProps {
  account: EfootballAccount;
  currentUserId?: string | number;
  onInspect: (account: EfootballAccount) => void;
  onQuickBuy: (account: EfootballAccount) => void;
  isCompared?: boolean;
  onToggleCompare?: (account: EfootballAccount) => void;
}

export const AccountCard: React.FC<AccountCardProps> = ({
  account,
  currentUserId,
  onInspect,
  onQuickBuy,
}) => {
  const isLocked = Boolean(account.lockedUntil && account.lockedUntil > Date.now());
  const isLockedByMe = isLocked && account.lockedBy && String(account.lockedBy.id) === String(currentUserId);
  const isPaymentReview = account.status === 'payment_review';
  const isSold = account.status === 'sold';

  const remainingMinutes = isLocked
    ? Math.max(1, Math.ceil(((account.lockedUntil || 0) - Date.now()) / (60 * 1000)))
    : 0;

  const priceETB = account.priceETB || 0;

  return (
    <div
      onClick={() => onInspect(account)}
      className="group relative glass-panel rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 border border-amber-400/20 hover:border-yellow-400/50 cursor-pointer shadow-lg hover:shadow-yellow-500/10"
    >
      {/* Top Image Showcase */}
      <div className="relative h-44 sm:h-48 bg-black overflow-hidden">
        {account.coverImage ? (
          <img
            src={account.coverImage}
            alt={account.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-85 group-hover:scale-105 group-hover:opacity-100 transition-all duration-300"
          />
        ) : (
          <div className="w-full h-full bg-black flex items-center justify-center text-amber-400/30">
            <ShieldCheck className="w-10 h-10" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Minimal Corner Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="text-[11px] font-bold text-amber-200/90 bg-black px-2.5 py-0.5 rounded-lg border border-amber-400/25">
            {account.platform}
          </span>

          {isPaymentReview ? (
            <span className="text-[10px] font-bold text-black bg-gradient-to-r from-yellow-300 to-amber-400 px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-sm">
              <Clock className="w-3 h-3 animate-pulse" />
              <span>Reviewing</span>
            </span>
          ) : isLocked ? (
            <span className="text-[10px] font-bold text-yellow-200 bg-black border border-yellow-300/50 px-2 py-0.5 rounded-lg flex items-center gap-1">
              <Clock className="w-3 h-3 text-yellow-300" />
              <span>{isLockedByMe ? `Reserved (${remainingMinutes}m)` : `Locked`}</span>
            </span>
          ) : (
            <span className="text-[11px] font-mono-num font-black text-yellow-300 bg-black px-2 py-0.5 rounded-lg border border-yellow-400/30">
              {account.collectiveStrength} PTS
            </span>
          )}
        </div>
      </div>

      {/* Clean Uncluttered Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          <h3 className="text-sm sm:text-base font-bold text-amber-100 group-hover:text-yellow-300 transition-colors line-clamp-1">
            {account.title}
          </h3>

          {/* Simple, unboxed metadata */}
          <div className="flex items-center gap-2 text-xs text-amber-200/70 font-medium">
            <span>{account.divisionPeak}</span>
            <span className="text-amber-700">·</span>
            <span>{account.epicBoosterCount} Boosters</span>
            <span className="text-amber-700">·</span>
            <span>{account.formation}</span>
          </div>
        </div>

        {/* Bottom Price & Single Clean Action */}
        <div className="pt-2.5 border-t border-amber-400/15 flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-base sm:text-lg font-black text-yellow-300 font-mono-num">
              {priceETB.toLocaleString()}
            </span>
            <span className="text-[11px] font-bold text-amber-200/70">ETB</span>
          </div>

          {isSold ? (
            <span className="text-xs font-semibold text-amber-500/50">Sold</span>
          ) : isPaymentReview ? (
            <span className="text-xs font-semibold text-yellow-300 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5" /> In Review
            </span>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onInspect(account);
              }}
              className="glass-btn glass-btn-primary px-3 py-1.5 text-xs font-bold text-black flex items-center gap-1 group/btn"
            >
              <span>View Squad</span>
              <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
