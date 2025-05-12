// @ts-ignore
import {SubmitHandler, useFormContext} from "react-hook-form";
import GoogleLoginButton from "./GoogleLoginButton";

interface SignupFormProps {
    step: number;
    setStep: (step: number) => void;
    showPassword: boolean;
    setShowPassword: (show: boolean) => void;
    showPasswordCheck: boolean;
    setShowPasswordCheck: (show: boolean) => void;
    previewUrl: string | null;
    setPreviewUrl: (url: string | null) => void;
    handleNextStep: () => void;
    onSubmit: SubmitHandler<any>;
}

const handleGoogleLogin = () => {
    window.location.href = import.meta.env.VITE_SERVER_API_URL + "/v1/auth/google/login";
};

const SignupForm = ({
                        step,
                        setStep,
                        showPassword,
                        setShowPassword,
                        showPasswordCheck,
                        setShowPasswordCheck,
                        previewUrl,
                        setPreviewUrl,
                        handleNextStep,
                        onSubmit,
                    }: SignupFormProps) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
    } = useFormContext();

    const email = watch("email");
    const password = watch("password");
    const passwordCheck = watch("passwordCheck");
    const name = watch("name");
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 py-12">
            <div className="w-full max-w-sm px-6 py-10 bg-black text-white flex flex-col gap-6">
                <div className="flex justify-center mb-6">
                    <img src="/images/spotify_icon.png" alt="Logo" className="w-10 h-10"/>
                </div>
                {(step === 2 || step === 3) && (
                    <button
                        type="button"
                        onClick={() => setStep(step > 1 ? step - 1 : 1)}
                        className="flex items-center gap-2 text-white text-sm font-medium hover:underline focus:outline-none mb-4 cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                        </svg>
                    </button>
                )}

                {step >= 2 && (
                    <div className="w-full h-1 bg-gray-600 rounded-full overflow-hidden mb-6">
                        <div
                            className="h-full bg-green-500 transition-all duration-300"
                            style={{
                                width: `${(step / 3) * 100}%`,
                            }}
                        ></div>
                    </div>
                )}

                {step === 1 && (
                    <div className="flex flex-col items-center text-center gap-5">
                        <h4 className="text-5xl font-extrabold leading-snug text-center md:text-5xl whitespace-pre-line mb-8">
                            가입하고{"\n"}원하는 콘텐츠를{"\n"}감상하세요
                        </h4>
                    </div>
                )}

                {step === 1 && (
                    <>
                        <div className="text-sm font-semibold text-gray-300 tracking-wide mb-0">이메일 주소</div>
                        <input
                            {...register("email")}
                            className={`bg-[#111] w-full p-3 text-white placeholder-gray-400 border rounded ${
                                errors?.email ? "border-red-500" : "border-gray-500"
                            }`}
                            type="email"
                            placeholder="name@domain.com"
                        />
                        {errors?.email && (
                            <div
                                className="flex items-start gap-2 mt-0 text-sm text-red-400 leading-snug whitespace-pre-line break-words">
                                <span>❗</span>
                                <span>{errors.email.message}</span>
                            </div>
                        )}
                        <button
                            type="button"
                            onClick={handleNextStep}
                            className={`w-full p-3 rounded-full font-semibold text-black bg-green-500 hover:bg-green-600 transition ${
                                !(email && !errors.email) && "opacity-50 cursor-not-allowed"
                            }`}
                        >
                            다음
                        </button>

                        <div className="relative flex items-center justify-center my-4">
                            <div className="flex-grow h-px bg-gray-600"/>
                            <span className="text-gray-400 px-4 text-sm">또는</span>
                            <div className="flex-grow h-px bg-gray-600"/>
                        </div>

                        <GoogleLoginButton onClick={handleGoogleLogin}>
                            Google로 가입하기
                        </GoogleLoginButton>

                        <div className="text-center text-sm text-gray-400 mt-4">
                            이미 계정이 있나요? <a href="/login" className="underline">여기에서 로그인하세요</a>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <div className="text-xs text-gray-400 font-medium mb-1">2/3단계</div>
                        <div className="text-xl font-bold text-white mb-6">비밀번호를 만드세요.</div>
                        <div className="text-sm font-semibold text-white mb-1">비밀번호</div>

                        <div className="relative w-full">
                            <input
                                {...register("password")}
                                className={`bg-[#111] w-full p-3 pr-10 text-white placeholder-gray-400 border rounded ${
                                    errors?.password ? "border-red-500" : "border-[#555]"
                                }`}
                                type={showPassword ? "text" : "password"}
                                placeholder="비밀번호"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"
                                     className="w-5 h-5">
                                    <path
                                        d="M22.207 2.824a1 1 0 1 0-1.414-1.414L17.15 5.053C15.621 4.363 13.92 4 12 4 8.671 4 5.996 5.091 3.742 7.089c-.896.794-2.3 2.353-3.381 4.453L.125 12l.236.458c1.082 2.1 2.485 3.659 3.381 4.453.278.246.562.479.853.697L1.793 20.41a1 1 0 1 0 1.414 1.414l3.126-3.126.003.002 1.503-1.503-.004-.001 1.73-1.73.004.001 1.567-1.567h-.004l4.68-4.681.001.004 1.595-1.595-.002-.003.11-.109.002.002 1.444-1.444-.003-.002 3.248-3.248zM14.884 7.32l-5.57 5.57A4.035 4.035 0 0 1 8.113 10c0-2.23 1.761-4 3.886-4 1.137 0 2.17.506 2.884 1.319zM7.9 14.304l-1.873 1.873a11.319 11.319 0 0 1-.957-.763C4.396 14.818 3.3 13.621 2.387 12c.913-1.62 2.01-2.818 2.683-3.414.519-.46 1.061-.863 1.634-1.204A6.073 6.073 0 0 0 6.113 10c0 1.681.682 3.21 1.786 4.304zm11.568-5.2 1.415-1.415a16.503 16.503 0 0 1 2.756 3.853l.236.458-.236.458c-1.082 2.1-2.485 3.659-3.381 4.453C18.004 18.908 15.328 20 12 20a13.22 13.22 0 0 1-3.08-.348l1.726-1.726c.435.05.886.074 1.354.074 2.833 0 5.037-.907 6.931-2.586.674-.596 1.77-1.793 2.683-3.414a14.515 14.515 0 0 0-2.146-2.896z"></path>
                                </svg>
                            </button>
                            {errors?.password && (

                                <div className="text-red-500 text-sm">{errors.password.message}</div>
                            )}
                        </div>

                        <div className="mt-4">
                            <p className="text-sm font-semibold text-white mb-2">비밀번호에는 다음 문자가 반드시 포함되어야 합니다.</p>
                            <ul className="text-sm text-white space-y-2">
                                <li className="flex items-center gap-2">
                                    {/[a-zA-Z]/.test(password) ? (
                                        <svg aria-hidden="true" className="w-5 h-5 fill-green-400" viewBox="0 0 20 20">
                                            <path
                                                d="M7.629 15.29a1 1 0 0 1-1.415 0l-3.504-3.504a1 1 0 1 1 1.415-1.415l2.797 2.797 6.938-6.938a1 1 0 1 1 1.415 1.415l-7.646 7.645z"/>
                                        </svg>
                                    ) : (
                                        <svg aria-hidden="true" className="w-5 h-5 fill-white" viewBox="0 0 20 20">
                                            <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2" fill="none"/>
                                        </svg>
                                    )}
                                    문자 1개
                                </li>
                                <li className="flex items-center gap-2">
                                    {/[\d\W]/.test(password) ? (
                                        <svg aria-hidden="true" className="w-5 h-5 fill-green-400" viewBox="0 0 20 20">
                                            <path
                                                d="M7.629 15.29a1 1 0 0 1-1.415 0l-3.504-3.504a1 1 0 1 1 1.415-1.415l2.797 2.797 6.938-6.938a1 1 0 1 1 1.415 1.415l-7.646 7.645z"/>
                                        </svg>
                                    ) : (
                                        <svg aria-hidden="true" className="w-5 h-5 fill-white" viewBox="0 0 20 20">
                                            <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2" fill="none"/>
                                        </svg>
                                    )}
                                    숫자 또는 특수 문자 1개(예: # ? ! &)
                                </li>
                                <li className="flex items-center gap-2">
                                    {password?.length >= 10 ? (
                                        <svg aria-hidden="true" className="w-5 h-5 fill-green-400" viewBox="0 0 20 20">
                                            <path
                                                d="M7.629 15.29a1 1 0 0 1-1.415 0l-3.504-3.504a1 1 0 1 1 1.415-1.415l2.797 2.797 6.938-6.938a1 1 0 1 1 1.415 1.415l-7.646 7.645z"/>
                                        </svg>
                                    ) : (
                                        <svg aria-hidden="true" className="w-5 h-5 fill-white" viewBox="0 0 20 20">
                                            <circle cx="10" cy="10" r="8" stroke="white" strokeWidth="2" fill="none"/>
                                        </svg>
                                    )}
                                    10자 이상
                                </li>
                            </ul>
                        </div>

                        <div className="relative w-full">
                            <input
                                {...register("passwordCheck")}
                                className={`bg-[#111] w-full p-3 pr-10 text-white placeholder-gray-400 border rounded ${
                                    errors?.passwordCheck ? "border-red-500" : "border-[#555]"
                                }`}
                                type={showPasswordCheck ? "text" : "password"}
                                placeholder="비밀번호 확인"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPasswordCheck(!showPasswordCheck)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"
                                     className="w-5 h-5">
                                    <path
                                        d="M22.207 2.824a1 1 0 1 0-1.414-1.414L17.15 5.053C15.621 4.363 13.92 4 12 4 8.671 4 5.996 5.091 3.742 7.089c-.896.794-2.3 2.353-3.381 4.453L.125 12l.236.458c1.082 2.1 2.485 3.659 3.381 4.453.278.246.562.479.853.697L1.793 20.41a1 1 0 1 0 1.414 1.414l3.126-3.126.003.002 1.503-1.503-.004-.001 1.73-1.73.004.001 1.567-1.567h-.004l4.68-4.681.001.004 1.595-1.595-.002-.003.11-.109.002.002 1.444-1.444-.003-.002 3.248-3.248zM14.884 7.32l-5.57 5.57A4.035 4.035 0 0 1 8.113 10c0-2.23 1.761-4 3.886-4 1.137 0 2.17.506 2.884 1.319zM7.9 14.304l-1.873 1.873a11.319 11.319 0 0 1-.957-.763C4.396 14.818 3.3 13.621 2.387 12c.913-1.62 2.01-2.818 2.683-3.414.519-.46 1.061-.863 1.634-1.204A6.073 6.073 0 0 0 6.113 10c0 1.681.682 3.21 1.786 4.304zm11.568-5.2 1.415-1.415a16.503 16.503 0 0 1 2.756 3.853l.236.458-.236.458c-1.082 2.1-2.485 3.659-3.381 4.453C18.004 18.908 15.328 20 12 20a13.22 13.22 0 0 1-3.08-.348l1.726-1.726c.435.05.886.074 1.354.074 2.833 0 5.037-.907 6.931-2.586.674-.596 1.77-1.793 2.683-3.414a14.515 14.515 0 0 0-2.146-2.896z"></path>
                                    d
                                </svg>
                            </button>
                            {errors?.passwordCheck && (
                                <div className="text-red-500 text-sm">{errors.passwordCheck.message}</div>
                            )}
                            {!errors?.passwordCheck && password !== passwordCheck && (
                                <div className="text-red-500 text-sm">비밀번호가 일치하지 않습니다.</div>
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={handleNextStep}
                            className={`w-full p-3 rounded-full font-semibold text-black bg-green-500 hover:bg-green-600 transition ${
                                !(password && passwordCheck && !errors.password && !errors.passwordCheck && password === passwordCheck) && "opacity-50 cursor-not-allowed"
                            }`}
                        >
                            다음
                        </button>
                    </>
                )}

                {step === 3 && (
                    <>
                        <div className="text-xs text-gray-400 font-medium mb-1">3/3단계</div>
                        <div className="text-xl font-bold text-white mb-6">자신을 소개해주세요.</div>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                            <div className="text-sm text-gray-400 mb-6">{email}</div>

                            <div className="flex flex-col items-center gap-4 mb-6">
                                <label htmlFor="profileImage" className="cursor-pointer">
                                    <div
                                        className="w-36 h-36 rounded-full overflow-hidden border-2 border-gray-300 hover:border-green-500 transition-colors duration-200 relative">
                                        <img
                                            src={previewUrl || "https://www.gravatar.com/avatar/?d=mp"}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                        <div
                                            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                                            <span className="text-white text-sm">이미지 변경</span>
                                        </div>
                                    </div>
                                </label>
                                <input
                                    type="file"
                                    id="profileImage"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () =>
                                                setPreviewUrl(reader.result as string);
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                            </div>

                            <div className="text-sm font-semibold text-gray-300 tracking-wide mb-1">이름</div>
                            <input
                                {...register("name")}
                                className={`bg-[#111] w-full p-3 text-white placeholder-gray-400 border rounded ${
                                    errors?.name ? "border-red-500" : "border-[#555]"
                                }`}
                                type="text"
                                placeholder="이름을 입력하세요"
                            />
                            {errors?.name && (
                                <div
                                    className="flex items-start gap-2 text-sm text-red-400 leading-snug whitespace-pre-line break-words">
                                    <span>❗</span>
                                    <span>{errors.name.message}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                className={`w-full p-3 rounded-full font-semibold text-black bg-green-500 hover:bg-green-600 transition mt-4 ${
                                    !name && "opacity-50 cursor-not-allowed"
                                }`}
                            >
                                가입 완료하기
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default SignupForm;