import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다!"),
});

export const passwordSchema = z
  .object({
    password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다!"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다!",
    path: ["confirmPassword"],
  });

export const nicknameSchema = z.object({
  nickname: z.string().min(1, "닉네임을 입력해주세요!"),
});

export type EmailForm = z.infer<typeof emailSchema>;
export type PasswordForm = z.infer<typeof passwordSchema>;
export type NicknameForm = z.infer<typeof nicknameSchema>;
