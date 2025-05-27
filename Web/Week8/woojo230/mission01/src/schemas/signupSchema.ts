import { z } from 'zod';

export const emailSchema = z.object({
  email: z.string().email('유효한 이메일 주소를 입력해주세요.'),
});

export const passwordSchema = z.object({
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
    .regex(/[a-z]/, '소문자를 최소 하나 포함해야 합니다.')
    .regex(/[0-9]/, '숫자를 최소 하나 포함해야 합니다.'),
  confirmPassword: z.string(),
});

export const signUpSchema = passwordSchema.superRefine(
  ({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '비밀번호가 일치하지 않습니다.',
        path: ['confirmPassword'],
      });
    }
  }
);

export const profileSchema = z.object({
  nickname: z
    .string()
    .min(2, '닉네임은 최소 2자 이상이어야 합니다.')
    .max(20, '닉네임은 최대 20자까지 가능합니다.')
    .regex(
      /^[A-Za-z0-9가-힣_]+$/,
      '닉네임은 한글, 영문, 숫자, 언더바(_)만 사용할 수 있습니다.'
    ),
});

export type EmailFormData = z.infer<typeof emailSchema>;
export type PasswordFormData = z.infer<typeof passwordSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
