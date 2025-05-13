import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { useSidebar } from '../context/SidebarContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLP } from '../api/lp';
import FloatingButton from '../components/FloatingButton';
import AddLPModal from '../components/AddLPModal';

const HomeLayout = () => {
  const { isOpen } = useSidebar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const createLPMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await createLP({
        title: formData.get('title') as string,
        content: formData.get('content') as string,
        thumbnail: formData.get('thumbnail') as File,
        tags: formData.getAll('tags') as string[],
        published: true
      });
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lps'] });
      setIsModalOpen(false);
    },
    onError: (error) => {
      console.error('LP 생성 중 오류 발생:', error);
      alert('LP 생성에 실패했습니다. 다시 시도해주세요.');
    }
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitLP = async (formData: FormData) => {
    createLPMutation.mutate(formData);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      
      <div className="flex flex-1" style={{ paddingTop: '60px' }}>
        <Sidebar />

        <div 
          className={`flex-1 p-6 transition-all duration-300 ${isOpen ? 'ml-56' : 'ml-0'}`}
        >
          <Outlet />
        </div>
      </div>
      
      <Footer />
      <FloatingButton onClick={handleOpenModal} />
      <AddLPModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitLP}
      />
    </div>
  );
};

export default HomeLayout;
