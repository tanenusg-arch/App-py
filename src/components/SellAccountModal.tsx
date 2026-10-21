import React, { useState, useEffect } from 'react';
import { Platform, PendingAccountSubmission, TelegramUser } from '../types/account';
import { setupTelegramBackButton } from '../lib/telegram';
import {
  X,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface SellAccountModalProps {
  currentUser: TelegramUser;
  onClose: () => void;
  onSubmitForApproval: (submission: PendingAccountSubmission) => void;
}

export const SellAccountModal: React.FC<SellAccountModalProps> = ({
  currentUser,
  onClose,
  onSubmitForApproval,
}) => {
  const [title, setTitle] = useState('');
  const [platform, setPlatform] = useState<Platform>('Mobile');
  const [collectiveStrength, setCollectiveStrength] = useState<number>(3120);
  const [divisionPeak, setDivisionPeak] = useState('Division 1');
  const [priceETB, setPriceETB] = useState<number>(12000);
  const [coins, setCoins] = useState<number>(1000);
  const [gp, setGp] = useState<number>(3000000);
  const [epicBoosterCount, setEpicBoosterCount] = useState<number>(8);
  const [konamiIdStatus, setKonamiIdStatus] = useState<
    'Unlinked / Clean' | 'Email Changeable' | 'Full Access Handover'
  >('Email Changeable');
  const [formation, setFormation] = useState('4-2-1-3');
  const [keyPlayers, setKeyPlayers] = useState('');
  const [description, setDescription] = useState('');
  const [sellerContact, setSellerContact] = useState('');
  const [proofPreview, setProofPreview] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync Telegram native BackButton and Escape key
  useEffect(() => {
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
  }, [onClose]);

  const handleProofChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProofPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!title.trim() || !priceETB) {
      setErrorMsg('Please enter squad title and your asking price in ETB.');
      return;
    }

    if (!proofPreview) {
      setErrorMsg('A clear squad screenshot / proof image is required for admin inspection.');
      return;
    }

    const newSubmission: PendingAccountSubmission = {
      id: `EFB-SUB-${Date.now()}`,
      title: title.trim(),
      platform,
      collectiveStrength,
      divisionPeak,
      priceETB,
      coins,
      gp,
      epicBoosterCount,
      konamiIdStatus,
      formation,
      description: description.trim(),
      keyPlayers: keyPlayers.trim(),
      proofImage: proofPreview,
      sellerTelegram: {
        id: currentUser.id,
        username: currentUser.username,
        firstName: currentUser.firstName,
      },
      sellerContact: sellerContact.trim() || 'Via Telegram',
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };

    onSubmitForApproval(newSubmission);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/95 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-black border border-amber-400/30 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-black/95 border-b border-amber-400/20 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-amber-400/15 border border-amber-400/30 text-yellow-300 flex items-center justify-center shrink-0">
              <FileCheck className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <div className="text-[10px] sm:text-xs font-bold text-yellow-300 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Submit Account to Admins for Sale
              </div>
              <h2 className="text-xs sm:text-sm font-bold text-amber-100 mt-0.5">
                Admin Escrow &amp; Marketplace Listing Request
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="glass-btn glass-btn-secondary p-1.5 rounded-full"
          >
            <X className="w-4 h-4 text-amber-200" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 overscroll-contain bg-black">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-3xl bg-amber-400/20 border border-amber-400/30 text-yellow-300 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/10">
                <CheckCircle2 className="w-8 h-8 text-yellow-300" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-amber-100">Submission Sent for Review</h3>
              <p className="text-xs sm:text-sm text-amber-200/70 max-w-md mx-auto leading-relaxed">
                Your squad has been submitted to store admins. Once verified, it will appear in the active marketplace catalog.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="glass-btn glass-btn-primary px-6 py-2.5 text-xs font-bold text-black"
              >
                Close &amp; Check Profile
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-amber-200 font-semibold block mb-1">
                    Squad Title <span className="text-yellow-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., 3190 Div 1 Squad w/ Big Time Messi &amp; Vieira"
                    className="w-full bg-black/60 border border-amber-400/25 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-amber-100 placeholder:text-amber-200/40 focus:border-yellow-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div>
                    <label className="text-xs text-amber-200 font-semibold block mb-1">
                      Asking Price (ETB) <span className="text-yellow-400">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={priceETB}
                      onChange={(e) => setPriceETB(Number(e.target.value))}
                      className="w-full bg-black/60 border border-amber-400/25 rounded-xl px-3 py-2 text-xs text-yellow-300 font-mono-num font-bold focus:border-yellow-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-amber-200 font-semibold block mb-1">Team Strength (PTS)</label>
                    <input
                      type="number"
                      value={collectiveStrength}
                      onChange={(e) => setCollectiveStrength(Number(e.target.value))}
                      className="w-full bg-black/60 border border-amber-400/25 rounded-xl px-3 py-2 text-xs text-amber-100 font-mono-num focus:border-yellow-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-amber-200 font-semibold block mb-1">Your Phone / Contact</label>
                    <input
                      type="text"
                      value={sellerContact}
                      onChange={(e) => setSellerContact(e.target.value)}
                      placeholder="0911..."
                      className="w-full bg-black/60 border border-amber-400/25 rounded-xl px-3 py-2 text-xs text-amber-100 placeholder:text-amber-200/40 focus:border-yellow-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-amber-200 font-semibold block mb-1">Key Boosters &amp; Legends</label>
                  <input
                    type="text"
                    value={keyPlayers}
                    onChange={(e) => setKeyPlayers(e.target.value)}
                    placeholder="e.g., Big Time Messi, Booster Rummenigge, Epic Vieira, Cech"
                    className="w-full bg-black/60 border border-amber-400/25 rounded-xl px-3.5 py-2 text-xs text-amber-100 placeholder:text-amber-200/40 focus:border-yellow-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-amber-200 font-semibold block mb-1.5 flex items-center justify-between">
                    <span>Upload Squad Screenshot <span className="text-yellow-400">*</span></span>
                    <span className="text-[10px] text-yellow-300">eFootball Roster or Team Sheet</span>
                  </label>
                  <label className="p-4 border-2 border-dashed border-amber-400/25 hover:border-yellow-400/50 rounded-2xl bg-black/40 flex flex-col items-center justify-center cursor-pointer transition-colors active:bg-amber-400/5">
                    <Upload className="w-5 h-5 text-yellow-400 mb-1" />
                    <span className="text-xs font-semibold text-amber-100">
                      {proofPreview ? 'Change Screenshot' : 'Click to Upload Squad Screenshot'}
                    </span>
                    <span className="text-[10px] text-amber-200/60 mt-0.5">Clear image showing team strength and lineup</span>
                    <input type="file" accept="image/*" onChange={handleProofChange} className="hidden" />
                  </label>

                  {proofPreview && (
                    <div className="mt-2.5 relative rounded-2xl overflow-hidden border border-amber-400/30 max-h-44 bg-black flex items-center justify-center">
                      <img src={proofPreview} alt="Proof preview" className="w-full h-full object-contain max-h-44" />
                    </div>
                  )}
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-amber-400/10 border border-amber-400/30 rounded-xl text-yellow-300 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="glass-btn glass-btn-secondary px-4 py-2 text-xs font-semibold"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="glass-btn glass-btn-primary px-5 py-2.5 text-xs font-bold shadow-lg text-black"
                >
                  <CheckCircle2 className="w-4 h-4 text-black" />
                  <span>Submit for Review</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
