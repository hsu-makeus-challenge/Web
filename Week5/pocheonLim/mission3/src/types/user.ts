// 사용자 정보
export interface User {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
}

// 사용자 정보 응답
export interface UserInfoResponse {
  status: boolean;
  message: string;
  statusCode: number;
  data: User;
} 