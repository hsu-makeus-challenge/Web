import { z } from "zod";

export const emailSchema = z.object({
  email: z.string().email("유효한 이메일 주소를 입력해주세요."),
});

export const passwordSchema = z.object({
  password: z
    .string()
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
});

export const nicknameSchema = z.object({
  nickname: z
    .string()
    .min(2, "닉네임은 최소 2자 이상이어야 합니다.")
    .max(20, "닉네임은 최대 20자까지 가능합니다.")
    .regex(/^[가-힣a-zA-Z0-9]+$/, "닉네임은 한글, 영문, 숫자만 사용 가능합니다."),
});

export type EmailForm = z.infer<typeof emailSchema>;
export type PasswordForm = z.infer<typeof passwordSchema>;
export type NicknameForm = z.infer<typeof nicknameSchema>; 