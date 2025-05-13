import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import { useSidebar } from '../context/SidebarContext';
import FloatingButton from '../components/FloatingButton';
import AddLPModal from '../components/AddLPModal';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { PaginationDto } from "../types/common";
import { axiosInstance } from "../api/axios";
import axios from "axios";
import { 
  LP, 
  LPListResponse, 
  CommentResponse,
  Comment,
  CursorBaseResponse
} from "../types/lp";
import { RequestRefreshDto, ResponseRefreshDto } from "../types/auth";

export const getLPList = async (params: {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: 'asc' | 'desc';
}): Promise<LPListResponse> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params,
  });
  return data;
};

export interface LPDetailResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: LP;
}

export const getLPDetail = async (id: string): Promise<LPDetailResponse> => {
  const { data } = await axiosInstance.get(`v1/lps/${id}`);
  return data;
};

export type CommentParams = { 
  cursor?: number; 
  limit?: number; 
  order?: 'asc' | 'desc' 
};

export const getComments = async (lpId: string | number, params: CommentParams): Promise<CommentResponse> => {
  try {
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const url = `${baseURL}/v1/lps/${lpId}/comments`;
    const { data } = await axios.get(url, {
      params,
      withCredentials: true
    });
    return data;
  } catch (error) {
    console.error("[댓글 API] 오류 발생:", error);
    return {
      status: true,
      statusCode: 200,
      message: "더미 데이터입니다.",
      data: {
        data: [],
        nextCursor: undefined,
        hasNext: false
      }
    };
  }
};

export interface CreateCommentResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: Comment;
}

export const createComment = async (lpId: string | number, content: string): Promise<CreateCommentResponse> => {
  const { data } = await axiosInstance.post(`v1/lps/${lpId}/comments`, { content });
  return data;
};

export const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) return false;

    const response = await axiosInstance.post<ResponseRefreshDto>(
      "auth/refresh",
      { refreshToken } as RequestRefreshDto
    );

    const { accessToken, refreshToken: newRefreshToken } = response.data.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    return true;
  } catch (error) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = "/login";
    return false;
  }
};

export interface CreateLPResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: LP;
}

export const createLP = async (
  payload: {
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
    published: boolean;
  },
  accessToken?: string
): Promise<CreateLPResponse> => {
  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
  const url = `${baseURL}/v1/lps`;

  const token = accessToken || localStorage.getItem('accessToken');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await axios.post(url, payload, {
    headers,
    withCredentials: true
  });
  return response.data;
};

const HomeLayout = () => {
  const { isOpen } = useSidebar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { isLoggedIn, accessToken, syncTokensFromStorage } = useAuth();

  useEffect(() => {
    const isAuthenticated = syncTokensFromStorage();
    console.log("[HomeLayout] 인증 상태:", isAuthenticated ? "인증됨" : "인증 안됨");
  }, [syncTokensFromStorage]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => setIsModalOpen(false);
  
  const handleSubmitLP = async (formData: FormData) => {
    try {
      const isAuthenticated = syncTokensFromStorage();
      if (!isAuthenticated) {
        const continueWithLogin = window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?");
        if (continueWithLogin) {
          window.location.href = '/login';
        }
        return;
      }

      const payload = {
        title: formData.get('title') as string,
        content: formData.get('content') as string,
        thumbnail: formData.get('thumbnail') as string,
        tags: (formData.get('tags') as string)?.split(',').map(tag => tag.trim()) || [],
        published: true
      };
      
      console.log("[HomeLayout] LP 생성 요청 데이터:", payload);
      
      const result = await createLP(payload, accessToken ?? undefined);
      console.log("LP 생성 결과:", result);

      queryClient.invalidateQueries({ queryKey: ['lps'] });
      alert('LP가 성공적으로 등록되었습니다.');
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("LP 생성 오류:", error);
      
      if (error.response && error.response.status === 401) {
        const continueWithLogin = window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?");
        if (continueWithLogin) {
          window.location.href = '/login';
        }
      } else {
        alert("LP 생성에 실패했습니다. 다시 시도해주세요.");
      }
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
