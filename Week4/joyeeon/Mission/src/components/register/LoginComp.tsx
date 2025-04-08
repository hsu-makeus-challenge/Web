import Google from "./Google";
import { SlArrowLeft } from "react-icons/sl";
import { UserSigninInformation, validateSignin } from "../../utils/validate";
import useForm from "../../hooks/UseForm";

const LoginComp = () => {

    const {values, errors, touched, getInputProps} = useForm<UserSigninInformation>({
        initialValue: {
            email: "",
            password:"",
        },
        validate: validateSignin,
    });

    const handleSubmit = () =>{
        console.log(values);
    };

    const isDisabled =
        Object.values (errors || {}).some((error) => error.length > 0) ||
        Object.values(values).some((value) =>value === ""); 
    return (
        <div className="w-50 flex flex-col items-center">
            <button className="flex items-center justify-start w-full h-10 gap-15 font-bold">
                <SlArrowLeft className="cursor-pointer"   style={{ fontWeight: 700 }} onClick={() => window.history.back()} />
                로그인
            </button>
            
            <Google />

            <div className="flex items-center w-full h-15">
                <div className="customHr w-full"></div>
                <span className="m-10">OR</span>
                <div className="customHr w-full"></div>
            </div>
            

            <input type="email" className="input"
                {...getInputProps("email")}
                name="email"
                placeholder="이메일을 입력해 주세요!"
            />
            {errors?.email && touched?.email && (
                <div className="errorMSG">{errors.email}</div>
            )}

            <input type="password" className="input mt-5" 
                {...getInputProps("password")}
                name="password"
                placeholder="비밀번호를 입력해주세요!" />
            {errors?.password && touched?.password &&(
                <div className="errorMSG">{errors.password}</div>
            )}
            <button className={`btn mt-5 ${isDisabled ? 'bg-gray-500 text-white cursor-not-allowed' : 'bg-sky-300 cursor-pointer'}`}
                disabled={isDisabled}
            >로그인 </button>
        </div>

    )
}

export default LoginComp;