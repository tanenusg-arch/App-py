import React, { useState } from 'react';
import { PurchasedOrder } from '../types/account';
import { X, Download, Copy, Check, Lock, Clock } from 'lucide-react';

interface OrdersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orders: PurchasedOrder[];
}

export const OrdersDrawer: React.FC<OrdersDrawerProps> = ({
  isOpen,
  onClose,
  orders,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownload = (order: PurchasedOrder) => {
    if (!order.credentials) return;

    const content = `=========================================
EFOOTBALL ACCOUNT TRANSFER CERTIFICATE
=========================================
Order ID: ${order.orderId}
Account: ${order.accountTitle}
Platform: ${order.platform}
Team Strength: ${order.collectiveStrength} PTS
Total: ${(order.priceETB || 0).toLocaleString()} ETB
Buyer: ${order.buyerEmail || order.buyerTelegram?.username || 'Telegram Buyer'}
Date: ${order.timestamp}

--- CREDENTIALS ---
KONAMI ID: ${order.credentials.konamiId}
TEMP PASSWORD: ${order.credentials.tempPass}
TRANSFER PIN: ${order.credentials.transferCode}

=========================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${order.orderId}-eFootball-Vault.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/95">
      <div className="w-full max-w-md bg-black border-l border-amber-400/25 h-full flex flex-col shadow-2xl">
        <div className="p-4 sm:p-5 border-b border-amber-400/20 flex items-center justify-between bg-black/95">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-yellow-300" />
            <h3 className="font-bold text-amber-100 text-base">Your Unlocked Vaults ({orders.length})</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close orders drawer"
            className="p-1.5 text-amber-200/70 hover:text-white bg-black border border-amber-400/20 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 flex-1 bg-black">
          {orders.length === 0 ? (
            <div className="text-center py-12 text-amber-200/60 text-xs">
              No purchased accounts found yet. Browse the marketplace and acquire your first squad!
            </div>
          ) : (
            orders.map((order) => {
              const isPending = order.status === 'pending_verification';

              return (
                <div
                  key={order.orderId}
                  className="bg-black border border-amber-400/25 rounded-2xl p-4 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-amber-400/15">
                    <span className="text-xs font-mono-num font-bold text-yellow-300">{order.orderId}</span>
                    <span className="text-[11px] text-amber-200/60">{order.timestamp}</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-amber-100 line-clamp-1">{order.accountTitle}</h4>
                    <div className="flex items-center gap-2 text-xs text-amber-200/70 mt-1">
                      <span>{order.platform}</span>
                      <span>·</span>
                      <span className="text-yellow-300 font-bold font-mono-num">{order.collectiveStrength} PTS</span>
                      <span>·</span>
                      <span className="text-yellow-300 font-medium">Verified Handover</span>
                    </div>
                  </div>

                  {isPending || !order.credentials ? (
                    <div className="p-3 bg-black border border-amber-400/30 rounded-xl text-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-yellow-300 font-semibold">
                        <Clock className="w-3.5 h-3.5 animate-pulse" />
                        <span>Payment Under Review</span>
                      </div>
                      <p className="text-[11px] text-amber-200/70">
                        Admin is verifying your screenshot. Credentials will unlock here shortly.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="p-2.5 bg-black/80 rounded-xl space-y-2 border border-amber-400/20 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-amber-200/70">Konami ID:</span>
                          <div className="flex items-center gap-1.5 font-mono-num text-amber-100">
                            <span className="truncate max-w-[170px]">{order.credentials.konamiId}</span>
                            <button
                              type="button"
                              onClick={() => handleCopy(order.credentials?.konamiId || '', `${order.orderId}-email`)}
                              className="text-amber-300 hover:text-white cursor-pointer"
                            >
                              {copiedKey === `${order.orderId}-email` ? (
                                <Check className="w-3 h-3 text-yellow-300" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-amber-200/70">Temp Password:</span>
                          <div className="flex items-center gap-1.5 font-mono-num text-yellow-300 font-bold">
                            <span>{order.credentials.tempPass}</span>
                            <button
                              type="button"
                              onClick={() => handleCopy(order.credentials?.tempPass || '', `${order.orderId}-pass`)}
                              className="text-amber-300 hover:text-white cursor-pointer"
                            >
                              {copiedKey === `${order.orderId}-pass` ? (
                                <Check className="w-3 h-3 text-yellow-300" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-[11px] text-amber-200/70">Verification PIN:</span>
                          <span className="font-mono-num text-amber-100 font-bold">{order.credentials.transferCode}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDownload(order)}
                        className="w-full py-2 bg-gradient-to-r from-yellow-300 to-amber-400 hover:from-yellow-200 text-black font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-black" />
                        <span>Download Certificate (.txt)</span>
                      </button>
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
