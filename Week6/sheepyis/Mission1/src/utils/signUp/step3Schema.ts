import { z } from "zod";

export const step3Schema = z.object({
  name: z.string().nonempty("닉네임을 입력해주세요."),
});

export type Step3Schema = z.infer<typeof step3Schema>;
