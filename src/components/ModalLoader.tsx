import React from 'react';

interface ModalLoaderProps {
  isVisible: boolean;
}

const ModalLoader: React.FC<ModalLoaderProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80">
      <div className="flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mb-4"></div>
        <p className="text-lg font-semibold text-white">Loading...</p>
      </div>
    </div>
  );
};

export default ModalLoader;
