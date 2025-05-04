import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("올바른 이메일 형식을 입력해 주세요!"),
  password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다!"),
});

export type LoginForm = z.infer<typeof loginSchema>;
