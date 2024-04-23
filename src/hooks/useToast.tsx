import { ToastMessage, ToastType } from '@/types';
import { useState } from 'react';

const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: ToastType) => {
    const toastId = Date.now();
    const newToast: ToastMessage = { id: toastId, message, type };
    setToasts((prevToasts) => [...prevToasts, newToast]);

    setTimeout(() => {
      removeToast(toastId);
    }, 3000);
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return { toasts, addToast };
};

export { useToast, ToastType };
