import { z } from "zod";

const emailSchema = z
	.string()
	.min(1, { message: "이메일을 입력해주세요!" })
	.email({ message: "유효한 이메일 주소를 입력해주세요!" });

const passwordSchema = z
	.string()
	.min(1, { message: "비밀번호를 입력해주세요!" })
	.min(8, { message: "비밀번호는 8자 이상이어야 합니다!" })
	.max(16, { message: "비밀번호는 16자 이하여야 합니다!" });

export const loginSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const signupSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
	confirmPassword: z
		.string()
		.min(1, { message: "비밀번호를 다시 입력해주세요!" }),
	nickname: z
		.string()
		.min(1, { message: "닉네임을 입력해주세요!" })
		.min(2, { message: "닉네임은 2자 이상이어야 합니다!" })
		.max(10, { message: "닉네임은 10자 이하여야 합니다!" }),
});

export const signupFormSchema = signupSchema.refine(
	(data) => data.password === data.confirmPassword,
	{
		message: "비밀번호가 일치하지 않습니다!",
		path: ["confirmPassword"],
	},
);

export type SignupFormValues = z.infer<typeof signupFormSchema>;
