// src/api/auth.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export interface SignupRequest {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const signupApi = async (data: SignupRequest) => {
  return api.post("/v1/auth/signup", data);
};

export const loginApi = async (data: LoginRequest) => {
  return api.post("/v1/auth/signin", data);
};
