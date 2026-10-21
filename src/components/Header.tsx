import React, { useState } from 'react';
import {
  ShieldAlert,
  Plus,
  Menu,
  X,
  Home,
  ShoppingBag,
  FileCheck,
  User,
  Sparkles,
} from 'lucide-react';
import { TelegramUser } from '../types/account';
import { BRAND } from '../constants/branding';
import { isStealthAdmin } from '../lib/telegram';

export type NavTab = 'home' | 'shop' | 'orders' | 'profile' | 'admin';

interface HeaderProps {
  currentUser: TelegramUser;
  activePage: NavTab;
  onOpenSellModal: () => void;
  onNavigatePage: (page: NavTab) => void;
  ordersCount: number;
  adminBadgeCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  activePage,
  onOpenSellModal,
  onNavigatePage,
  ordersCount,
  adminBadgeCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: NavTab) => {
    onNavigatePage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="shrink-0 z-30 bg-black border-b border-amber-400/25 shadow-xl shadow-black/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4 lg:gap-6 px-3.5 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        {/* Zone 1: Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 group cursor-pointer shrink-0 bg-transparent border-0 p-0 text-left"
        >
          <div className="relative">
            <img
              src={BRAND.logoUrl}
              alt={BRAND.name}
              referrerPolicy="no-referrer"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover ring-1 ring-amber-400/50 group-hover:scale-105 transition-all duration-200 shadow-md shadow-amber-500/20"
            />
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-amber-400/30 to-yellow-300/30 blur opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black tracking-wider text-amber-100 text-sm sm:text-base whitespace-nowrap leading-tight">
              BICHO <span className="bg-gradient-to-r from-yellow-200 via-amber-300 to-yellow-400 bg-clip-text text-transparent">ACCOUNTS</span>
            </span>
            <span className="text-[9px] text-amber-300/80 font-bold uppercase tracking-widest hidden sm:block">
              eFootball Marketplace
            </span>
          </div>
        </button>

        {/* Zone 2: Desktop Navigation Links (Buttons) */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 bg-black border border-amber-400/25 rounded-2xl">
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'shop', label: 'Marketplace', icon: ShoppingBag },
            { id: 'orders', label: 'Orders', icon: FileCheck, badge: ordersCount },
            { id: 'profile', label: 'Profile', icon: User },
          ].map((tab) => {
            const isActive = activePage === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleNavClick(tab.id as NavTab)}
                className={`glass-btn px-3.5 py-1.5 text-xs transition-all whitespace-nowrap ${
                  isActive
                    ? 'glass-btn-primary font-extrabold text-black'
                    : 'glass-btn-secondary text-amber-200/90 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span
                    className={`text-[10px] font-mono-num font-extrabold px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-black text-amber-300 shadow-sm border border-amber-400/40' : 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}

          {currentUser.isAdmin && (
            <button
              type="button"
              onClick={() => handleNavClick('admin')}
              className={`glass-btn px-3.5 py-1.5 text-xs transition-all whitespace-nowrap ${
                activePage === 'admin'
                  ? 'glass-btn-primary font-extrabold text-black'
                  : 'glass-btn-secondary border-amber-400/30 text-amber-300 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Desk</span>
              {adminBadgeCount > 0 && (
                <span className="bg-gradient-to-r from-yellow-300 to-amber-400 text-black text-[10px] px-1.5 py-0.2 rounded-full font-mono-num font-bold shadow-sm">
                  {adminBadgeCount}
                </span>
              )}
            </button>
          )}
        </nav>

        {/* Zone 3: Profile & Actions (Glass Buttons) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* User Profile Glass Pill Button */}
          <button
            type="button"
            onClick={() => handleNavClick('profile')}
            className="glass-btn glass-btn-secondary px-2.5 sm:px-3 py-1.5 text-xs group"
          >
            {currentUser.photoUrl ? (
              <img
                src={currentUser.photoUrl}
                alt={currentUser.firstName}
                referrerPolicy="no-referrer"
                className="w-5 h-5 rounded-full object-cover ring-1 ring-amber-400/50"
              />
            ) : (
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 text-black flex items-center justify-center text-[10px] font-black">
                {currentUser.firstName.slice(0, 1).toUpperCase()}
              </div>
            )}
            <span className="font-semibold text-amber-200/90 hidden sm:inline max-w-[100px] truncate group-hover:text-amber-100">
              {currentUser.username ? `@${currentUser.username}` : currentUser.firstName}
            </span>
          </button>

          {/* Sell Account Glass Button */}
          <button
            type="button"
            onClick={onOpenSellModal}
            className="glass-btn glass-btn-primary px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs font-bold whitespace-nowrap shrink-0 text-black"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Sell Account</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="glass-btn glass-btn-secondary p-2 md:hidden"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-amber-300" /> : <Menu className="w-4 h-4 text-amber-200" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-amber-400/20 bg-black px-4 py-3 space-y-2 animate-in slide-in-from-top duration-200 shadow-2xl">
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'shop', label: 'Marketplace Catalog', icon: ShoppingBag },
            { id: 'orders', label: 'Orders Vault', icon: FileCheck, badge: ordersCount },
            { id: 'profile', label: 'Player Profile', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activePage === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleNavClick(tab.id as NavTab)}
                className={`w-full glass-btn justify-between px-4 py-2.5 text-xs font-semibold ${
                  isActive ? 'glass-btn-primary font-bold text-black' : 'glass-btn-secondary'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-amber-300" />
                  <span>{tab.label}</span>
                </div>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="text-[10px] font-mono-num font-bold px-2 py-0.5 rounded-full bg-amber-400 text-black">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}

          {currentUser.isAdmin && (
            <button
              type="button"
              onClick={() => handleNavClick('admin')}
              className={`w-full glass-btn justify-between px-4 py-2.5 text-xs font-bold ${
                activePage === 'admin' ? 'glass-btn-primary font-extrabold text-black' : 'glass-btn-secondary border-amber-400/40 text-amber-300'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Admin Desk</span>
              </div>
              {adminBadgeCount > 0 && (
                <span className="text-[10px] font-mono-num font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-300 to-amber-400 text-black">
                  {adminBadgeCount}
                </span>
              )}
            </button>
          )}
        </div>
      )}
    </header>
  );
};
