import React, { useState } from 'react';
import { PlayerCard } from '../types/account';
import { Sparkles, User } from 'lucide-react';

interface SquadPitchPreviewProps {
  startingXI: PlayerCard[];
  bench?: PlayerCard[];
  formation: string;
  manager?: {
    name: string;
    style: string;
    proficiency: number;
    booster?: string;
  };
  collectiveStrength: number;
}

export const SquadPitchPreview: React.FC<SquadPitchPreviewProps> = ({
  startingXI,
  bench,
  formation,
  manager,
  collectiveStrength,
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerCard | null>(null);

  // Black and light gold card styling helper
  const getCardStyle = (cardType: PlayerCard['cardType']) => {
    switch (cardType) {
      case 'Big Time':
        return {
          bg: 'bg-gradient-to-b from-yellow-300/90 via-amber-700 to-black',
          border: 'border-yellow-200 ring-1 ring-yellow-300/60',
          ratingBg: 'bg-yellow-300 text-black',
          glow: 'shadow-[0_0_12px_rgba(254,240,138,0.5)]',
        };
      case 'Epic Booster':
        return {
          bg: 'bg-gradient-to-b from-amber-400/90 via-amber-800 to-black',
          border: 'border-amber-300/80 ring-1 ring-amber-400/40',
          ratingBg: 'bg-amber-400 text-black',
          glow: 'shadow-[0_0_12px_rgba(251,191,36,0.4)]',
        };
      case 'Showtime':
        return {
          bg: 'bg-gradient-to-b from-yellow-200/90 via-amber-900 to-black',
          border: 'border-yellow-300/70 ring-1 ring-yellow-400/40',
          ratingBg: 'bg-yellow-200 text-black',
          glow: 'shadow-[0_0_12px_rgba(246,224,94,0.4)]',
        };
      default:
        return {
          bg: 'bg-gradient-to-b from-amber-500/80 via-neutral-900 to-black',
          border: 'border-amber-400/60 ring-1 ring-amber-400/30',
          ratingBg: 'bg-amber-400 text-black',
          glow: 'shadow-[0_0_10px_rgba(212,175,55,0.3)]',
        };
    }
  };

  return (
    <div className="space-y-4">
      {/* Squad Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 glass-panel p-3.5 rounded-2xl border border-amber-400/20">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-amber-200/60">Tactical Formation</span>
            <span className="text-sm font-bold text-amber-100 tracking-wide">{formation}</span>
          </div>
          <span className="text-amber-800">|</span>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-amber-200/60">Team Strength</span>
            <span className="text-sm font-black text-yellow-300 font-mono-num">{collectiveStrength} PTS</span>
          </div>
        </div>

        {manager && (
          <div className="flex items-center gap-2 text-xs bg-black/70 px-3 py-1.5 rounded-xl border border-amber-400/20">
            <User className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="text-amber-100 font-semibold">{manager.name}</span>
            <span className="text-amber-700">·</span>
            <span className="text-yellow-300 font-medium">{manager.style} ({manager.proficiency})</span>
          </div>
        )}
      </div>

      {/* Modern Black & Light Gold Pitch View */}
      <div className="relative w-full aspect-[4/5] sm:aspect-[4/4.8] max-h-[520px] rounded-3xl overflow-hidden border border-amber-400/30 shadow-2xl bg-black">
        {/* Striped mowing pattern in subtle gold */}
        <div className="absolute inset-0 grid grid-rows-6 opacity-30 pointer-events-none">
          <div className="bg-yellow-400/[0.04]" />
          <div className="bg-black" />
          <div className="bg-yellow-400/[0.04]" />
          <div className="bg-black" />
          <div className="bg-yellow-400/[0.04]" />
          <div className="bg-black" />
        </div>

        {/* Pitch boundary lines in light gold */}
        <div className="absolute inset-3 border border-yellow-400/30 rounded-xl pointer-events-none">
          {/* Halfway line */}
          <div className="absolute top-1/2 left-0 right-0 border-t border-yellow-400/30" />
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 border border-yellow-400/30 rounded-full" />
          {/* Center spot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-yellow-300/70 rounded-full" />

          {/* Top Penalty Box */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 border-b border-x border-yellow-400/30 rounded-b-md">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-8 border-b border-x border-yellow-400/20" />
          </div>

          {/* Bottom Penalty Box */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-20 border-t border-x border-yellow-400/30 rounded-t-md">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-8 border-t border-x border-yellow-400/20" />
          </div>
        </div>

        {/* Starting XI Player Pins */}
        <div className="absolute inset-0 p-4">
          {startingXI.map((player) => {
            const style = getCardStyle(player.cardType);
            const isSelected = selectedPlayer?.id === player.id;

            return (
              <button
                key={player.id}
                type="button"
                onClick={() => setSelectedPlayer(isSelected ? null : player)}
                style={{
                  left: `${player.x ?? 50}%`,
                  top: `${player.y ?? 50}%`,
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer transition-all duration-200 z-10 ${
                  isSelected ? 'scale-115 z-30' : 'hover:scale-110 hover:z-20'
                }`}
              >
                {/* Modern Tactical Card Badge */}
                <div
                  className={`w-11 h-13 sm:w-13 sm:h-16 rounded-lg p-0.5 border ${style.border} ${style.bg} ${style.glow} flex flex-col justify-between items-center transition-shadow`}
                >
                  {/* Position & Rating Header */}
                  <div className="w-full flex items-center justify-between px-1 pt-0.5">
                    <span className="text-[9px] sm:text-[10px] font-black text-amber-100">
                      {player.position}
                    </span>
                    <span
                      className={`text-[9px] sm:text-[10px] font-black px-1 rounded-sm font-mono-num ${style.ratingBg}`}
                    >
                      {player.rating}
                    </span>
                  </div>

                  {/* Player Silhouette / Mini Emblem */}
                  <div className="relative w-full flex-1 flex items-center justify-center my-0.5">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black/40 flex items-center justify-center text-amber-200">
                      <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </div>

                  {/* Card Type indicator */}
                  <div className="w-full text-center pb-0.5">
                    <span className="text-[7px] sm:text-[8px] font-semibold tracking-tighter text-amber-200/90 block truncate px-0.5">
                      {player.cardType === 'Epic Booster' ? 'EPIC' : player.cardType.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Player Name Tag */}
                <div className="mt-1 px-1.5 py-0.5 bg-black/90 border border-amber-400/25 rounded text-[10px] sm:text-xs font-semibold text-amber-100 whitespace-nowrap shadow-md max-w-[90px] truncate text-center">
                  {player.name}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Player Floating Inspector */}
        {selectedPlayer && (
          <div className="absolute bottom-3 left-3 right-3 p-3.5 glass-panel rounded-2xl shadow-2xl flex items-center justify-between gap-3 z-40 animate-in fade-in slide-in-from-bottom-2 duration-150 border border-amber-400/30">
            <div className="flex items-center gap-3">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-lg font-mono-num shadow-md ${
                  getCardStyle(selectedPlayer.cardType).ratingBg
                }`}
              >
                {selectedPlayer.rating}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-amber-100">{selectedPlayer.name}</h4>
                  <span className="text-xs text-amber-300/70 font-semibold">({selectedPlayer.position})</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-amber-300/80 mt-0.5 font-medium">
                  <span className="text-yellow-300 font-bold">{selectedPlayer.cardType}</span>
                  {selectedPlayer.club && (
                    <>
                      <span>·</span>
                      <span>{selectedPlayer.club}</span>
                    </>
                  )}
                  {selectedPlayer.boosterSkill && (
                    <>
                      <span>·</span>
                      <span className="text-yellow-200 flex items-center gap-1 font-semibold">
                        <Sparkles className="w-3 h-3 inline text-yellow-300" /> {selectedPlayer.boosterSkill}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedPlayer(null)}
              className="px-3 py-1.5 text-xs text-amber-200/80 hover:text-white bg-black border border-amber-400/30 rounded-xl transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>

      {/* Bench Substitutes Section */}
      {bench && bench.length > 0 && (
        <div className="glass-panel rounded-2xl p-3.5 space-y-2 border border-amber-400/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-200/70">Substitutes &amp; Reserves ({bench.length})</span>
            <span className="text-[11px] text-amber-300/50">Bench options</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
            {bench.map((sub) => {
              const style = getCardStyle(sub.cardType);
              return (
                <div
                  key={sub.id}
                  className="flex items-center gap-2 bg-black/80 border border-amber-400/20 px-3 py-1.5 rounded-xl shrink-0 transition-colors"
                >
                  <span className="text-[10px] font-bold text-amber-300/70">{sub.position}</span>
                  <span className={`text-[11px] font-bold px-1.5 py-0.2 rounded font-mono-num ${style.ratingBg}`}>
                    {sub.rating}
                  </span>
                  <span className="text-xs font-medium text-amber-100 whitespace-nowrap">{sub.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
