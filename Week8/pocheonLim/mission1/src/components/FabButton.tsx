import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MdAdd } from 'react-icons/md';
import LpCreateModal from './LpCreateModal';

const FabButton = () => {
  const { isLoggedIn } = useAuth();
  const [open, setOpen] = useState(false);

  if (!isLoggedIn) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed z-50 right-8 bottom-8 w-16 h-16 rounded-full bg-pink-500 hover:bg-pink-600 text-white text-4xl flex items-center justify-center shadow-lg transition-colors duration-200 leading-none"
        aria-label="플로팅 버튼"
      >
        <MdAdd size={40} />
      </button>
      <LpCreateModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default FabButton; 