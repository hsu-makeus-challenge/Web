import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { useSidebar } from '../context/SidebarContext';
import FloatingButton from '../components/FloatingButton';
import AddLPModal from '../components/AddLPModal';
import { useQueryClient } from '@tanstack/react-query';
import { createLP } from '../api/lp';

const HomeLayout = () => {
  const { isOpen } = useSidebar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => setIsModalOpen(false);
  
  const handleSubmitLP = async (formData: FormData) => {
    try {
      const payload = {
        title: formData.get('title') as string,
        content: formData.get('content') as string,
        thumbnail: formData.get('thumbnail') as string,
        tags: (formData.get('tags') as string)?.split(',').map(tag => tag.trim()) || [],
        published: true
      };
      
      console.log("[HomeLayout] LP 생성 요청 데이터:", payload);
      
      const result = await createLP(payload);
      console.log("LP 생성 결과:", result);

      queryClient.invalidateQueries({ queryKey: ['lps'] });
      alert('LP가 성공적으로 등록되었습니다.');
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("LP 생성 오류:", error);
      alert("LP 생성에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-black text-white">
      <Navbar />

      <div className="flex flex-1" style={{ paddingTop: '60px' }}>
        <Sidebar />
        <div 
          className={`flex-1 p-6 transition-all duration-300 ${isOpen ? 'ml-40' : 'ml-0'}`}
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