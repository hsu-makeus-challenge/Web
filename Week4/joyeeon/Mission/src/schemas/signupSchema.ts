import { z } from "zod";


const schema = z.object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
        .string()
        .min(8, {
            message: "비밀번호는 8자 이상이어야 합니다",
        })
        .max(20, {
            message: "비밀번호는 20자 이하여야 합니다. "
        }),
    passcheck: z.string(),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
}).refine(
    data => data.password === data.passcheck, {
        message: "비밀번호가 일치하지 않습니다.",
        path: ["passcheck"], // 이 에러를 어디에 표시할지 지정
    });

export type SignupFormValues = z.infer<typeof schema>;