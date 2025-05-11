import { useState } from 'react';
import useLpModalStore from '../stores/LpModal';

const LpAddBtn = () => {
  const { toggleLpModal } = useLpModalStore();
  return (
    <>
      <button
        className="fixed bottom-4 right-4 bg-lime-700 hover:bg-lime-800 text-white p-4 rounded-full shadow-lg transition-colors duration-200 cursor-pointer"
        onClick={toggleLpModal}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </>
  );
};

export default LpAddBtn;
