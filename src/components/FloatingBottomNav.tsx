import React from 'react';
import { Home, ShoppingBag, ShieldCheck, User, ShieldAlert } from 'lucide-react';
import { NavTab } from './Header';

interface FloatingBottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  ordersCount: number;
  isAdmin?: boolean;
  adminBadgeCount?: number;
}

export const FloatingBottomNav: React.FC<FloatingBottomNavProps> = ({
  activeTab,
  onTabChange,
  ordersCount,
  isAdmin = false,
  adminBadgeCount = 0,
}) => {
  const tabs = [
    { id: 'home' as NavTab, label: 'Home', icon: Home },
    { id: 'shop' as NavTab, label: 'Market', icon: ShoppingBag },
    { id: 'orders' as NavTab, label: 'Orders', icon: ShieldCheck, badge: ordersCount },
    { id: 'profile' as NavTab, label: 'Profile', icon: User },
  ];

  if (isAdmin) {
    tabs.push({
      id: 'admin' as NavTab,
      label: 'Admin',
      icon: ShieldAlert,
      badge: adminBadgeCount,
    });
  }

  const triggerHaptic = () => {
    try {
      if (typeof window !== 'undefined' && window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.selectionChanged();
      }
    } catch {
      // Ignore
    }
  };

  const handleSelectTab = (tabId: NavTab) => {
    triggerHaptic();
    onTabChange(tabId);
  };

  return (
    <nav
      aria-label="Mobile Telegram Mini App Navigation Bar"
      className="shrink-0 z-40 w-full bg-black border-t border-amber-400/25 shadow-[0_-10px_35px_rgba(0,0,0,0.95)] pb-[max(env(safe-area-inset-bottom,0px),8px)] pt-1.5 transition-all select-none"
    >
      <div
        className={`grid ${
          isAdmin ? 'grid-cols-5' : 'grid-cols-4'
        } max-w-lg mx-auto items-center px-1.5 sm:px-3 gap-1`}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          const activeStyles = 'text-yellow-200 bg-amber-400/15 border-amber-300/40 shadow-[0_0_15px_rgba(246,224,94,0.3)]';
          const iconColor = 'text-yellow-200 drop-shadow-[0_0_8px_rgba(246,224,94,0.6)]';
          const dotColor = 'bg-yellow-300 shadow-[0_0_6px_#fde047]';

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleSelectTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 sm:py-1.5 px-1 rounded-2xl transition-all duration-200 min-h-[50px] cursor-pointer group border active:scale-95 ${
                isActive
                  ? `${activeStyles} font-bold`
                  : 'text-amber-200/50 border-transparent hover:text-amber-200 hover:bg-white/[0.04]'
              }`}
            >
              {/* Icon Container with Badge */}
              <div className="relative flex items-center justify-center">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110' : 'group-hover:scale-105'
                  } ${isActive ? iconColor : 'text-amber-300/60'}`}
                />

                {tab.badge !== undefined && tab.badge > 0 && (
                  <span
                    className="absolute -top-1.5 -right-3 text-[9px] font-mono-num font-black min-w-[17px] h-[17px] px-1 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-r from-yellow-300 to-amber-400 text-black ring-1 ring-yellow-200/60"
                  >
                    {tab.badge > 99 ? '99+' : tab.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[10px] tracking-tight mt-1 truncate max-w-full ${
                  isActive ? 'font-extrabold text-yellow-200' : 'font-medium text-amber-200/60'
                }`}
              >
                {tab.label}
              </span>

              {/* Active Indicator dot */}
              {isActive && (
                <span className={`w-1 h-1 rounded-full mt-0.5 ${dotColor}`} />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
