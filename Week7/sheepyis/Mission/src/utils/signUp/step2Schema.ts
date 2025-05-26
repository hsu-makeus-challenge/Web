import { z } from "zod";

export const step2Schema = z
  .object({
    password: z
      .string()
      .min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
    passwordCheck: z
      .string()
      .min(8, "비밀번호 확인도 최소 8자 이상이어야 합니다."),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

export type Step2Schema = z.infer<typeof step2Schema>;
