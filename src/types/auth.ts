export interface RequestSignupDto {
  email: string;
  password: string;
  name: string;
}

export interface ResponseSignupDto {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    id: number;
    email: string;
    name: string;
  };
}

export interface RequestSigninDto {
  email: string;
  password: string;
}

export interface ResponseSigninDto {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface ResponseMyinfoDto {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    id: number;
    email: string;
    name: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface RequestLogoutDto {
  refreshToken: string;
}

export interface ResponseLogoutDto {
  status: boolean;
  statusCode: number;
  message: string;
}

export interface RequestRefreshDto {
  refreshToken: string;
}

export interface ResponseRefreshDto {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
} 