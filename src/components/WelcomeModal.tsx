import React from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      shouldCloseOnOverlayClick
    >
      <div className="bg-white p-5 rounded-lg max-w-md">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-4">Welcome to Our Board Service!</h2>
        <p className="text-gray-700 mb-4">
          We're excited to have you onboard. Explore and collaborate with ease.
        </p>
        <div className="flex justify-center">
          <button
            onClick={undefined}
            className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Create a Task
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WelcomeModal;
