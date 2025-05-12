import axios from "axios";
import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import AuthHeader from "./AuthHeader"
import EmailComp from "./EmailComp"
import AbledButton from "./AbledButton";
import PassComp from "./PassComp";



const signupSchema = z
    .object({
        email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
        password: z
            .string()
            .min(8, { message: "비밀번호는 8자 이상이어야 합니다" })
            .max(20, { message: "비밀번호는 20자 이하여야 합니다." }),
        passcheck: z.string(),
        name: z.string().min(1, { message: "이름을 입력해주세요." }),
        bio:z.string().optional().or(z.literal("")),
        avatar: z.string().url({ message: "올바른 URL 형식이 아닙니다." }).optional().or(z.literal("")),
    })
    .refine((data) => data.password === data.passcheck, {
        message: "비밀번호가 일치하지 않습니다.",
        path: ["passcheck"],
    });

export type FormValues = z.infer<typeof signupSchema>;

const SignupComp = () => {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const navigate = useNavigate();


    const methods = useForm<FormValues>({
        resolver: zodResolver(signupSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
            passcheck: "",
            name: "",
            bio:"",
            avatar: "",
        },
    });

    const {
        register,
        handleSubmit,
        watch,
        trigger,
        formState: { errors },
    } = methods;

    const step1Invalid = !!errors.email || watch("email") === "";
    const step2Invalid =
        !!errors.password ||
        !!errors.passcheck ||
        watch("password") === "" ||
        watch("passcheck") === "";
    const step3Invalid = !!errors.name || watch("name") === "";

    const nextStep = async () => {
        const stepFields = {
            1: ["email"],
            2: ["password", "passcheck"],
            3: ["name"],
        }[step] as (keyof FormValues)[];

        const valid = await trigger(stepFields);
        if (valid) setStep((prev) => (prev < 3 ? (prev + 1) as 2 | 3 : prev));
    };

    const baseserverurl = import.meta.env.BASE_URL;

    const onSubmit = async (data: FormValues) => {
        try {
            console.log("🔥 API 요청 전송 시작");
            const response = await axios.post(`http://localhost:8000/v1/auth/signup`, {
                email: data.email,
                password: data.password,
                name: data.name,
                bio: data.bio,
                avatar: data.avatar,
            });

            console.log("회원가입 성공:", response.data);
            navigate("/login");
        }catch(error) {
            console.error("회원가입 실패:", error);
        }
        
        
    };

    useEffect(() => {
        // password가 바뀌면 passcheck도 다시 검사
        if (step === 2 && watch("passcheck")) {
            trigger("passcheck");
        }
    }, [watch("password")]);


    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-50 flex flex-col items-center">
                <AuthHeader path="회원가입" step={step}/>

                {step === 1 && (
                    <>
                        <EmailComp
                            register={register}
                            error={errors.email?.message}
                        />

                        <AbledButton
                            label="다음"
                            disabled={step1Invalid}
                            onClick={nextStep}
                        />
                    </>
                )}

                {step === 2 && (
                    <>
                        <div>{watch("email")}</div>
                        <PassComp
                            register={register}
                            name="password"
                            error={errors.password?.message}
                        />

                        <PassComp
                            register={register}
                            name="passcheck"
                            error={errors.passcheck?.message}
                            placeholder="비밀번호를 다시 입력해주세요"
                        />

                        <AbledButton
                            label="다음"
                            type="button"
                            onClick={nextStep}
                        />
                    </>
                )}

                {
                    step === 3 && (
                        <>
                            <img  src="test" alt="프로필 이미지"
                                className="w-[100px] h-[100px] mb-20 rounded-full bg-white object-cover border border-gray-300"
                            />


                            <input
                                type="text"
                                {...register("name")}
                                placeholder="닉네임을 입력해주세요"
                                className="input border border-gray-300 rounded px-3 py-2 w-60"
                            />
                            {errors.name && <div className="errorMSG">{errors.name.message}</div>}

                            {console.log("버튼 disabled 상태?", step3Invalid)}
                            <AbledButton
                                label="회원가입 완료"
                                type="submit"
                                disabled={step3Invalid}
                            />
                        </>
                    )
                }
            </form>
        </FormProvider>
    )
}

export default SignupComp;