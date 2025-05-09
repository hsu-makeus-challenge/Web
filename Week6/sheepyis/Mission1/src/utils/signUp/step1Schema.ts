import { z } from "zod";

export const step1Schema = z.object({
  email: z
    .string()
    .nonempty("이메일을 입력해주세요.")
    .email("올바른 이메일 형식입니다."),
});

export type Step1Schema = z.infer<typeof step1Schema>;
