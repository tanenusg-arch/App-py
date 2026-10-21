import React from 'react';
import { Star, Sparkles } from 'lucide-react';

interface VerifiedReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  country: string;
  platform: string;
}

const VERIFIED_REVIEWS: VerifiedReview[] = [
  {
    id: 'rev-1',
    author: 'Dawit T.',
    rating: 5,
    date: '2h ago',
    comment: 'Instant Telebirr transfer. Credentials revealed in 2 minutes, email successfully re-linked to mine.',
    country: 'Addis Ababa',
    platform: 'Mobile',
  },
  {
    id: 'rev-2',
    author: 'Yonas M.',
    rating: 5,
    date: 'Yesterday',
    comment: 'Super smooth escrow with admin @el_bicho14. Sent CBE screenshot and account credentials were in my vault immediately.',
    country: 'Nazret',
    platform: 'Steam',
  },
];

export const CustomerReviews: React.FC = () => {
  return (
    <section id="reviews" className="py-8 sm:py-10 border-b border-amber-400/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-yellow-300 uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Buyer Feedback
            </div>
            <h2 className="text-base sm:text-lg font-bold text-amber-100">
              Community Reviews
            </h2>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-amber-200/80 font-medium">
            <div className="flex text-yellow-300">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-yellow-300 text-yellow-300" />
              ))}
            </div>
            <span className="font-bold text-amber-100 font-mono-num">4.96/5</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {VERIFIED_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="glass-panel p-4 rounded-xl space-y-2 border border-amber-400/20"
            >
              <p className="text-xs text-amber-100/90 leading-relaxed italic">
                "{review.comment}"
              </p>
              <div className="flex items-center justify-between text-[11px] text-amber-200/60 pt-1 border-t border-amber-400/10">
                <span className="font-semibold text-amber-200">{review.author} ({review.country})</span>
                <span>{review.platform} · {review.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
