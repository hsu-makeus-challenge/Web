export interface RequestSignupDto {
  name: string;
  email: string;
  password: string;
  bio: string;
  avatar: string;
}

export interface ResponseSignupDto {
  data: {
    id: number;
    name: string;
    email: string;
    bio: string;
    avatar: string;
  };
}

export interface RequestSigninDto {
  email: string;
  password: string;
}

export interface ResponseSigninDto {

  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface ResponseMyinfoDto {
  data: {
    id: number;
    name: string;
    email: string;
    bio: string;
    avatar: string;
  };
}

export interface RequestLogoutDto {
  refreshToken: string;
}

export interface ResponseLogoutDto {
  data: {
    message: string;
  };
}

export interface RequestRefreshDto {
  refreshToken: string;
}

export interface ResponseRefreshDto {
  data: {
    accessToken: string;
    refreshToken: string;
  };
} 