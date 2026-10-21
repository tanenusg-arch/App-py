import React, { useState, useMemo } from 'react';
import { EfootballAccount, FilterState } from '../../types/account';
import { AccountCard } from '../AccountCard';
import { AccountFilters } from '../AccountFilters';
import {
  Plus,
  LayoutGrid,
  List,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

interface ShopPageProps {
  accounts: EfootballAccount[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onInspect: (account: EfootballAccount) => void;
  onQuickBuy: (account: EfootballAccount) => void;
  onOpenSellModal: () => void;
  comparedAccountIds: string[];
  onToggleCompare: (account: EfootballAccount) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  accounts,
  filters,
  onFilterChange,
  onInspect,
  onQuickBuy,
  onOpenSellModal,
  comparedAccountIds,
  onToggleCompare,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'compact'>('grid');

  // Filter and sort accounts dynamically based on search and sort option
  const filteredAccounts = useMemo(() => {
    let result = [...accounts];

    // Search filter
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter((acc) => {
        const titleMatch = acc.title.toLowerCase().includes(q);
        const descMatch = acc.description?.toLowerCase().includes(q);
        const formMatch = acc.formation?.toLowerCase().includes(q);
        const managerMatch = acc.manager?.name?.toLowerCase().includes(q);
        const starsMatch = acc.topStars?.some((s) => s.name.toLowerCase().includes(q));
        const xiMatch = acc.startingXI?.some((s) => s.name.toLowerCase().includes(q));
        return titleMatch || descMatch || formMatch || managerMatch || starsMatch || xiMatch;
      });
    }

    // Sort order
    if (filters.sortBy === 'price-asc') {
      result.sort((a, b) => (a.priceETB || 0) - (b.priceETB || 0));
    } else if (filters.sortBy === 'price-desc') {
      result.sort((a, b) => (b.priceETB || 0) - (a.priceETB || 0));
    } else if (filters.sortBy === 'strength-desc') {
      result.sort((a, b) => (b.collectiveStrength || 0) - (a.collectiveStrength || 0));
    } else if (filters.sortBy === 'coins-desc') {
      result.sort((a, b) => (b.coins || 0) - (a.coins || 0));
    }

    return result;
  }, [accounts, filters.search, filters.sortBy]);

  return (
    <div className="py-4 sm:py-8 max-w-7xl mx-auto px-3.5 sm:px-6 space-y-5 sm:space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
        <div>
          <div className="text-[11px] font-bold text-yellow-300 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Marketplace Catalog
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-amber-100 mt-0.5">
            eFootball Squads
          </h1>
          <p className="text-xs text-amber-200/70 mt-0.5">
            Browse verified tournament rosters with instant Konami ID email handover.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* View Mode Glass Toggle */}
          <div className="flex items-center p-1 bg-black border border-amber-400/20 rounded-xl">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              title="Grid View"
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-yellow-300 to-amber-400 text-black font-bold'
                  : 'text-amber-200/60 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('compact')}
              title="Compact List View"
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                viewMode === 'compact'
                  ? 'bg-gradient-to-r from-yellow-300 to-amber-400 text-black font-bold'
                  : 'text-amber-200/60 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={onOpenSellModal}
            className="glass-btn glass-btn-primary px-3.5 py-1.5 text-xs font-bold whitespace-nowrap text-black"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Sell Account</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <AccountFilters
        filters={filters}
        onChange={onFilterChange}
        totalResults={filteredAccounts.length}
      />

      {/* Grid or Compact List View */}
      {filteredAccounts.length === 0 ? (
        <div className="text-center py-12 sm:py-16 glass-panel rounded-2xl space-y-3 px-4 border border-amber-400/20">
          <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center mx-auto text-yellow-300">
            <ShieldCheck className="w-5 h-5 stroke-[2]" />
          </div>
          <h3 className="text-sm sm:text-base font-bold text-amber-100">No Squads Available</h3>
          <p className="text-xs text-amber-200/60 max-w-sm mx-auto">
            No accounts match your filter criteria right now.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredAccounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              onInspect={onInspect}
              onQuickBuy={onQuickBuy}
              isCompared={comparedAccountIds.includes(account.id)}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>
      ) : (
        /* Clean Compact List View */
        <div className="glass-panel rounded-2xl overflow-hidden divide-y divide-amber-400/15 border border-amber-400/20">
          {filteredAccounts.map((account) => {
            const priceETB = account.priceETB || 0;
            return (
              <div
                key={account.id}
                onClick={() => onInspect(account)}
                className="p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-white/[0.03] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
                  <div className="w-10 h-10 rounded-xl bg-black border border-amber-400/30 flex items-center justify-center font-black text-yellow-300 font-mono-num text-xs shrink-0">
                    {account.collectiveStrength}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs sm:text-sm font-bold text-amber-100 truncate">{account.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-amber-200/70 mt-0.5">
                      <span>{account.platform}</span>
                      <span>·</span>
                      <span>{account.divisionPeak}</span>
                      <span>·</span>
                      <span>{account.epicBoosterCount} Boosters</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-4 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-amber-400/10">
                  <span className="text-sm sm:text-base font-black text-yellow-300 font-mono-num">
                    {priceETB.toLocaleString()} ETB
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onInspect(account);
                    }}
                    className="glass-btn glass-btn-primary px-3 py-1.5 text-xs font-bold text-black"
                  >
                    View
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
