import React from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { BRAND } from '../constants/branding';

interface HeroProps {
  onExplore: (searchQuery?: string) => void;
  onValuate: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onValuate }) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-8 sm:pt-12 sm:pb-12 border-b border-amber-400/20 bg-grid-subtle">
      {/* Light Gold Ambient Radial Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[260px] bg-yellow-400/[0.07] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-4 sm:space-y-6">
        {/* Minimalist Trust Kicker */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>Verified eFootball Marketplace</span>
          <span className="text-amber-600">·</span>
          <span className="text-amber-200/70">Telebirr &amp; CBE Escrow</span>
        </div>

        {/* Clean Luxury Headline & Subtitle */}
        <div className="space-y-2 max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-amber-100 tracking-tight leading-tight [text-wrap:balance]">
            Tournament Squads.{' '}
            <span className="bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
              Verified Handover.
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-amber-200/70 leading-relaxed [text-wrap:balance]">
            Acquire Division 1 competitive rosters with maxed Epic Boosters and safe Konami ID transfer.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 pt-1">
          <button
            type="button"
            onClick={() => onExplore()}
            className="glass-btn glass-btn-primary px-6 py-2.5 text-xs sm:text-sm font-bold group text-black"
          >
            <span>Explore Marketplace</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={onValuate}
            className="glass-btn glass-btn-secondary px-5 py-2.5 text-xs sm:text-sm font-semibold"
          >
            <span>Sell Account</span>
          </button>
        </div>

        {/* Clean Minimalist Trust Strip */}
        <div className="flex items-center justify-center gap-4 pt-2 text-[11px] text-amber-200/60 font-medium">
          <div className="flex items-center gap-1.5">
            <img
              src={BRAND.telebirrSvgUrl}
              alt="Telebirr"
              referrerPolicy="no-referrer"
              className="w-3.5 h-3.5 rounded object-contain"
            />
            <img
              src={BRAND.cbeSvgUrl}
              alt="CBE"
              referrerPolicy="no-referrer"
              className="w-3.5 h-3.5 rounded object-contain"
            />
            <span>Telebirr &amp; CBE</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-yellow-300" />
            <span>Anti-Rollback Escrow</span>
          </div>
        </div>
      </div>
    </section>
  );
};
