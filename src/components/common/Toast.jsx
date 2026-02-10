import { useState, useCallback, useEffect, useRef, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import classnames from 'classnames';
import {
  HiCheckCircle,
  HiXCircle,
  HiInformationCircle,
  HiX,
} from 'react-icons/hi';
import { HiHeart } from 'react-icons/hi';

/**
 * Toast System — provides success / error / info / saved toasts.
 *
 * Usage:
 *   1. Wrap your app in <ToastProvider>
 *   2. const { toast } = useToastContext();
 *   3. toast.success('Account created!');
 *      toast.error('Something went wrong');
 *      toast.info('Check your email');
 *      toast.saved('Added to favorites');
 */

// ─── Context ─────────────────────────────────────────────────────────
const ToastContext = createContext(null);

export function useToastContext() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToastContext must be used within <ToastProvider>');
  }
  return ctx;
}

// ─── Config per type ─────────────────────────────────────────────────
const typeConfig = {
  success: {
    Icon: HiCheckCircle,
    bg: 'bg-green-50 border-green-200',
    iconColor: 'text-green-500',
    textColor: 'text-green-800',
  },
  error: {
    Icon: HiXCircle,
    bg: 'bg-red-50 border-red-200',
    iconColor: 'text-red-500',
    textColor: 'text-red-800',
  },
  info: {
    Icon: HiInformationCircle,
    bg: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-500',
    textColor: 'text-blue-800',
  },
  saved: {
    Icon: HiHeart,
    bg: 'bg-orange-50 border-orange-200',
    iconColor: 'text-favorite',
    textColor: 'text-orange-800',
  },
  removed: {
    Icon: HiHeart,
    bg: 'bg-gray-50 border-gray-200',
    iconColor: 'text-gray-400',
    textColor: 'text-gray-700',
  },
};

// ─── Single Toast Item ───────────────────────────────────────────────
function ToastItem({ id, message, type = 'info', onDismiss }) {
  const { Icon, bg, iconColor, textColor } = typeConfig[type] || typeConfig.info;

  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      className={classnames(
        'toast-enter pointer-events-auto',
        'flex items-center gap-2.5',
        'px-4 py-3 rounded-xl border',
        'text-sm font-medium',
        'shadow-[var(--shadow-toast)]',
        'max-w-sm w-full',
        bg,
        textColor
      )}
    >
      <Icon className={classnames('w-5 h-5 shrink-0', iconColor)} />
      <span className="flex-1">{message}</span>
      <button
        onClick={() => onDismiss(id)}
        className="shrink-0 p-0.5 rounded-full hover:bg-black/5 transition-colors"
        aria-label="Dismiss"
      >
        <HiX className="w-3.5 h-3.5 opacity-50" />
      </button>
    </div>
  );
}

// ─── Toast Container (Portal) ────────────────────────────────────────
function ToastContainer({ toasts, onDismiss }) {
  if (toasts.length === 0) return null;

  return createPortal(
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-2 pointer-events-none">
      {toasts.map((t) => (
        <ToastItem
          key={t.id}
          id={t.id}
          message={t.message}
          type={t.type}
          onDismiss={onDismiss}
        />
      ))}
    </div>,
    document.body
  );
}

// ─── Provider ────────────────────────────────────────────────────────
let toastIdCounter = 0;

export function ToastProvider({ children, duration = 3000 }) {
  const [toasts, setToasts] = useState([]);
  const timersRef = useRef({});

  const dismiss = useCallback((id) => {
    clearTimeout(timersRef.current[id]);
    delete timersRef.current[id];
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    (message, type = 'info') => {
      const id = ++toastIdCounter;
      setToasts((prev) => [...prev, { id, message, type }]);
      timersRef.current[id] = setTimeout(() => dismiss(id), duration);
      return id;
    },
    [duration, dismiss]
  );

  // Cleanup on unmount
  useEffect(() => {
    const timers = timersRef.current;
    return () => Object.values(timers).forEach(clearTimeout);
  }, []);

  const toast = {
    success: (msg) => addToast(msg, 'success'),
    error: (msg) => addToast(msg, 'error'),
    info: (msg) => addToast(msg, 'info'),
    saved: (msg) => addToast(msg, 'saved'),
    removed: (msg) => addToast(msg, 'removed'),
    dismiss,
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export default ToastProvider;
