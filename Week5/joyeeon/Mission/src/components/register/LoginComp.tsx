import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import AuthHeader from "./AuthHeader";
import EmailComp from "./EmailComp";
import AbledButton from "./AbledButton";
import PassComp from "./PassComp";
import useLocalStorage from "../../hooks/useLocalStorage";

import { useAuth } from "../../context/AuthContext";
import { loginApi } from "../../apis/auth";

const loginSchema = z.object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z.string().min(1, { message: "비밀번호를 입력해주세요." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginComp = () => {
    const navigate = useNavigate();
    //const [token, setToken] = useLocalStorage<string | null>("token", null);
    const {login} = useAuth();

    const methods = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = methods;

    const onSubmit = async (data: LoginFormValues) => {
        try {
            console.log("로그인 요청 시작");
            const response = await loginApi(data.email, data.password);

            console.log("로그인 성공", response.data);
            const accessToken = response.data.accessToken;
            const refreshToken = response.data.refreshToken;

            login(accessToken, refreshToken); 
            navigate("/");
        } catch(error) {
            console.error("로그인 실패", error);
        }
    };

    const isDisabled =
        !!errors.email ||
        !!errors.password ||
        watch("email") === "" ||
        watch("password") === "";

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-50 flex flex-col items-center">

                <AuthHeader path="로그인" step={1} />

                <EmailComp
                    register={register}
                    error={errors.email?.message}
                />


                <PassComp
                    register={register}
                    name="password"
                    error={errors.password?.message}
                />

                <AbledButton
                    label="로그인"
                    type="submit"
                    disabled={isDisabled}
                />
            </form>
        </FormProvider>

    )
}

export default LoginComp;