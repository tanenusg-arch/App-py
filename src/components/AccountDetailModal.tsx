import React, { useState, useEffect } from 'react';
import { EfootballAccount } from '../types/account';
import { SquadPitchPreview } from './SquadPitchPreview';
import { setupTelegramBackButton } from '../lib/telegram';
import {
  X,
  ShieldCheck,
  Coins,
  ShoppingCart,
  Star,
  Image as ImageIcon,
  Maximize2,
  ShieldAlert,
  Award,
  Zap,
  ArrowLeft,
} from 'lucide-react';

interface AccountDetailModalProps {
  account: EfootballAccount | null;
  onClose: () => void;
  onBuyNow: (account: EfootballAccount) => void;
}

export const AccountDetailModal: React.FC<AccountDetailModalProps> = ({
  account,
  onClose,
  onBuyNow,
}) => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'pitch' | 'inventory' | 'transfer'>('gallery');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Sync native Telegram Mini App BackButton and keyboard Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isExpanded) {
          setIsExpanded(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Register Telegram native BackButton
    const cleanupTelegramBack = setupTelegramBackButton(() => {
      if (isExpanded) {
        setIsExpanded(false);
      } else {
        onClose();
      }
    });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cleanupTelegramBack();
    };
  }, [isExpanded, onClose]);

  if (!account) return null;

  const priceETB = account.priceETB || 15000;

  // Combine coverImage and images array into a clean gallery list
  const galleryImages: string[] = [];
  if (account.coverImage) galleryImages.push(account.coverImage);
  if (account.images && account.images.length > 0) {
    account.images.forEach((img) => {
      if (!galleryImages.includes(img)) galleryImages.push(img);
    });
  }
  if (galleryImages.length === 0) {
    galleryImages.push('/src/assets/images/efootball_stadium_showcase_1792504262203.jpg');
  }

  const activeImage = selectedImage || galleryImages[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-black border border-amber-400/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-auto">
        {/* Modal Top Header Bar with Explicit Back Button */}
        <div className="p-3.5 sm:p-5 border-b border-amber-400/20 bg-black flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={onClose}
              aria-label="Back to catalog"
              className="glass-btn glass-btn-secondary px-3 py-1.5 text-xs font-bold flex items-center gap-1.5 shrink-0"
            >
              <ArrowLeft className="w-4 h-4 text-yellow-300" />
              <span>Back</span>
            </button>

            <div className="space-y-0.5 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-amber-200/70 truncate">
                <span className="text-yellow-300 font-bold font-mono-num flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-yellow-400" />
                  <span>{account.collectiveStrength} PTS</span>
                </span>
                <span aria-hidden="true" className="text-amber-700">·</span>
                <span className="text-amber-100 font-medium">{account.divisionPeak}</span>
                <span aria-hidden="true" className="text-amber-700 hidden sm:inline">·</span>
                <span className="text-yellow-300 font-semibold hidden sm:flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-yellow-400" /> {account.konamiIdStatus}
                </span>
              </div>

              <h2 className="text-sm sm:text-lg font-black text-amber-100 leading-tight truncate">
                {account.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="glass-btn glass-btn-secondary p-1.5 sm:p-2 rounded-full shrink-0"
          >
            <X className="w-4 h-4 text-amber-200" />
          </button>
        </div>

        {/* Tab Navigation Controls (Glass Tab Buttons) */}
        <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2.5 border-b border-amber-400/20 bg-black/80 overflow-x-auto scrollbar-none shrink-0">
          {[
            { id: 'gallery', label: 'Screenshots & Proof', icon: <ImageIcon className="w-3.5 h-3.5" /> },
            { id: 'pitch', label: 'Tactical Pitch & Lineup', icon: <Zap className="w-3.5 h-3.5" /> },
            { id: 'inventory', label: 'Inventory & Coins', icon: <Coins className="w-3.5 h-3.5" /> },
            { id: 'transfer', label: 'Transfer Guarantee', icon: <ShieldAlert className="w-3.5 h-3.5" /> },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`glass-btn px-3 py-1.5 text-xs whitespace-nowrap transition-all ${
                  isActive ? 'glass-btn-primary font-bold text-black' : 'glass-btn-secondary text-amber-200/70 hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 overscroll-contain bg-black">
          {/* TAB 1: Gallery & Screenshots */}
          {activeTab === 'gallery' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="relative rounded-2xl overflow-hidden border border-amber-400/20 bg-black aspect-video max-h-80 flex items-center justify-center group">
                <img
                  src={activeImage}
                  alt={account.title}
                  className="w-full h-full object-contain"
                />
                <button
                  type="button"
                  onClick={() => setIsExpanded(true)}
                  className="glass-btn glass-btn-secondary absolute bottom-3 right-3 px-3 py-1.5 text-xs opacity-90 hover:opacity-100"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Full Screen</span>
                </button>
              </div>

              {galleryImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-20 h-14 rounded-xl overflow-hidden border shrink-0 transition-all cursor-pointer ${
                        activeImage === img ? 'border-yellow-400 ring-2 ring-yellow-400/40' : 'border-amber-400/20 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Tactical Pitch & Lineup */}
          {activeTab === 'pitch' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <SquadPitchPreview
                formation={account.formation}
                manager={account.manager}
                startingXI={account.startingXI}
                bench={account.bench}
                collectiveStrength={account.collectiveStrength}
              />
            </div>
          )}

          {/* TAB 3: Inventory & Resources */}
          {activeTab === 'inventory' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-in fade-in duration-150">
              <div className="glass-panel p-4 rounded-2xl text-center space-y-1 border border-amber-400/25">
                <Coins className="w-5 h-5 text-yellow-300 mx-auto" />
                <div className="text-xl font-black text-yellow-300 font-mono-num">{account.coins.toLocaleString()}</div>
                <div className="text-[11px] text-amber-200/70">eFootball Coins</div>
              </div>

              <div className="glass-panel p-4 rounded-2xl text-center space-y-1 border border-amber-400/25">
                <Award className="w-5 h-5 text-yellow-300 mx-auto" />
                <div className="text-xl font-black text-yellow-200 font-mono-num">{(account.gp / 1000000).toFixed(1)}M</div>
                <div className="text-[11px] text-amber-200/70">GP Balance</div>
              </div>

              <div className="glass-panel p-4 rounded-2xl text-center space-y-1 border border-amber-400/25">
                <Star className="w-5 h-5 text-yellow-400 mx-auto" />
                <div className="text-xl font-black text-amber-300 font-mono-num">{account.epicBoosterCount}</div>
                <div className="text-[11px] text-amber-200/70">Epic Boosters</div>
              </div>

              <div className="glass-panel p-4 rounded-2xl text-center space-y-1 border border-amber-400/25">
                <ShieldCheck className="w-5 h-5 text-yellow-300 mx-auto" />
                <div className="text-xl font-black text-yellow-300 font-mono-num">{account.divisionPeak}</div>
                <div className="text-[11px] text-amber-200/70">Peak Division</div>
              </div>
            </div>
          )}

          {/* TAB 4: Konami ID & Escrow Guarantee */}
          {activeTab === 'transfer' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 sm:p-5 bg-black border border-amber-400/20 rounded-2xl space-y-2.5">
                <div className="flex items-center gap-2 text-yellow-300 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-yellow-400" />
                  <span>Escrow Verification &amp; Handover Assurance</span>
                </div>
                <p className="text-xs text-amber-100 leading-relaxed">
                  All accounts are verified by store admin (@el_bicho14). Credentials are released directly into your secure Order Vault upon Telebirr / CBE payment screenshot approval.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom CTA Footer Bar */}
        <div className="p-4 sm:p-5 border-t border-amber-400/20 bg-black flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-baseline gap-2">
            <span className="text-[11px] sm:text-xs text-amber-200/70 uppercase font-bold">Total Price:</span>
            <span className="text-xl sm:text-2xl font-black text-yellow-300 font-mono-num">
              {priceETB.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-amber-200">ETB</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="glass-btn glass-btn-secondary px-4 py-2.5 text-xs font-semibold w-full sm:w-auto"
            >
              Close
            </button>

            <button
              type="button"
              onClick={() => onBuyNow(account)}
              className="glass-btn glass-btn-primary px-6 py-2.5 text-xs font-bold w-full sm:w-auto shadow-lg text-black"
            >
              <ShoppingCart className="w-4 h-4 text-black" />
              <span>Reserve &amp; Buy Now (15m Lock)</span>
            </button>
          </div>
        </div>
      </div>

      {/* High Resolution Full Screen Zoom Overlay */}
      {isExpanded && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen screenshot preview"
          onClick={() => setIsExpanded(false)}
          className="fixed inset-0 z-[150] flex flex-col justify-between bg-black p-3 sm:p-6 overflow-hidden select-none animate-in fade-in duration-150"
        >
          {/* Top Back Navigation Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl mx-auto flex items-center justify-between gap-3 shrink-0 py-1"
          >
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="glass-btn glass-btn-primary px-4 py-2 text-xs font-bold flex items-center gap-2 shadow-2xl text-black"
            >
              <ArrowLeft className="w-4 h-4 text-black" />
              <span>Back to Account</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false);
                  onClose();
                }}
                className="glass-btn glass-btn-secondary px-3.5 py-2 text-xs font-semibold flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-yellow-300" />
                <span className="hidden sm:inline">Back to</span> Marketplace
              </button>

              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                aria-label="Close fullscreen"
                className="glass-btn glass-btn-secondary p-2 rounded-full"
              >
                <X className="w-4 h-4 text-amber-200" />
              </button>
            </div>
          </div>

          {/* Full Screen Image */}
          <div className="flex-1 w-full max-w-5xl mx-auto flex items-center justify-center p-2 sm:p-4 overflow-hidden cursor-zoom-out">
            <img
              src={activeImage}
              alt="Full resolution squad preview"
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[75vh] sm:max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-amber-400/20"
            />
          </div>

          {/* Bottom Clear Return Bar */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl mx-auto flex items-center justify-center shrink-0 pt-2 pb-1"
          >
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="glass-btn glass-btn-secondary px-6 py-2.5 text-xs font-bold flex items-center gap-2 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-yellow-300" />
              <span>Close Fullscreen &amp; Return to Account</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
