import { ToastType } from '@/hooks/useToast';
import { ToastMessage } from '@/types';
import React, { useEffect, useState } from 'react';

interface ToastProps {
  toasts: ToastMessage[];
}

const Toast: React.FC<ToastProps> = ({ toasts }) => {
  const [visibleToast, setVisibleToast] = useState<ToastMessage | null>(null);

  useEffect(() => {
    if (toasts.length > 0) {
      setVisibleToast(toasts[toasts.length - 1]);

      const timeoutId = setTimeout(() => {
        setVisibleToast(null);
      }, 2000);

      return () => clearTimeout(timeoutId);
    }
  }, [toasts]);

  const getToastColor = (type: ToastType) => {
    switch (type) {
      case ToastType.Success:
        return 'bg-green-100 text-green-700';
      case ToastType.Error:
        return 'bg-red-100 text-red-700';
      case ToastType.Info:
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="w-full fixed bottom-0 right-0 m-auto p-4 text-center">
      {visibleToast && (
        <div
          key={visibleToast.id}
          className={`rounded-md shadow-lg p-4 ${getToastColor(visibleToast.type)} text-black font-bold`}
          style={{ maxWidth: '400px', margin: '0 auto' }}
        >
          {visibleToast.message}
        </div>
      )}
    </div>
  );
};

export default Toast;
