import React from 'react';
import Modal from 'react-modal';
import { BoardStatus, Task } from '@/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
  task: Task;
}

const CreateBoardModal: React.FC<AddTaskModalProps> = ({ task, isOpen, onClose, handleSubmit, handleChange }) => {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      className="flex justify-center items-center h-screen"
      shouldCloseOnOverlayClick
    >
      <div className="w-2/6 max-h-200 overflow-y-auto py-12 px-6 bg-white rounded-2xl shadow-xl z-20">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 text-sm text-gray-700 rounded-lg border border-gray-400 mr-4"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <h1 className="text-3xl font-bold text-center mb-4">Add Task</h1>
          <label className="font-bold">Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-purple-500 mb-4"
          />
          <label className="font-bold">Content</label>
          <textarea
            name="content"
            value={task.content}
            onChange={handleChange}
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-purple-500 h-32 mb-4"
          />
          <label className="font-bold">Status</label>
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="block text-sm py-3 px-4 rounded-lg w-full border outline-purple-500 mb-4"
          >
            <option value={BoardStatus.TODO}>To Do</option>
            <option value={BoardStatus.IN_PROGRESS}>In Progress</option>
            <option value={BoardStatus.COMPLETED}>Completed</option>
            <option value={BoardStatus.REVIEW}>Review</option>
            <option value={BoardStatus.BLOCKED}>Blocked</option>
          </select>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!(task.title && task.content)}
              className={`w-full py-2 text-xl text-white rounded-lg transition-all 
              ${!(task.title && task.content) ? 'bg-gray-400' : 'bg-purple-400 hover:bg-purple-500'}`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CreateBoardModal;
