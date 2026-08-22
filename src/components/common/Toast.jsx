import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let icon = <Info className="w-4 h-4 text-neutral-600 flex-shrink-0" />;
        let borderClass = 'border-luxury-border';
        let bgClass = 'bg-white text-luxury-black';

        if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />;
          borderClass = 'border-emerald-200';
          bgClass = 'bg-white text-luxury-black';
        } else if (toast.type === 'error') {
          icon = <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />;
          borderClass = 'border-red-200';
          bgClass = 'bg-white text-luxury-black';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xs shadow-xl border ${borderClass} ${bgClass} animate-slide-in-up transition-all`}
          >
            <div className="flex items-center gap-2.5 min-w-0 pr-2">
              {icon}
              <span className="text-xs font-medium leading-tight">
                {toast.message}
              </span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 text-neutral-400 hover:text-luxury-black transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
