import {z} from 'zod'
import { useForm, SubmitHandler }  from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { data, useNavigate } from 'react-router-dom';
import { postSignup as apiPostSignup } from '../apis/auth';

const schema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
  password: z.string()
    .min(8, { message: "비밀번호는 8자 이상이여야 합니다. " })
    .max(20, { message: "비밀번호는 20자 이하이여야 합니다." }),
  passwordCheck: z.string()
    .min(8, { message: "비밀번호는 8자 이상이여야 합니다. " })
    .max(20, { message: "비밀번호는 20자 이하이여야 합니다." }),
  name: z.string().min(1, { message: "이름을 입력해주세요." }),
}).refine((data) => data.password === data.passwordCheck, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordCheck"],
});


type FormFileds = z.infer<typeof schema>;

export const SignupPage = () => {
  const navigate = useNavigate();
  const {register , handleSubmit, formState: {errors, isSubmitting}} = useForm<FormFileds>({
    defaultValues: {
      name:"",
      email:"",
      password:"",
      passwordCheck:"",
    },
    resolver: zodResolver(schema),
  });

  const isDisabled = Object.keys(errors).length > 0 || isSubmitting;

  const onSubmit: SubmitHandler<FormFileds> = async(data: FormFileds) => {
    const {passwordCheck, ...rest} = data;

    const response = await apiPostSignup(rest);
    console.log(response); 

    navigate('/login');

  }

  return (
    <div className="flex items-start justify-center w-full h-full pt-30">
      <div className="bg-black bg-opacity-80 p-10 rounded-md shadow-md w-full max-w-md flex flex-col gap-4 text-white">
        <button className="w-full py-2 border border-white rounded text-white hover:bg-white hover:text-black transition duration-200 px-4 flex items-center justify-center gap-2">
          <img
            src="/src/images/google.png"
            alt="Google logo"
            className="w-5 h-5 justify-start"
          />
          <span className="font-medium">구글 로그인</span>
        </button>

        <div className="flex items-center gap-4 my-4">
          <div className="flex-grow h-px bg-gray-600" />
          <span className="text-gray-400 text-sm">또는</span>
          <div className="flex-grow h-px bg-gray-600" />
        </div>

        <input 
          {...register("email")}
          name='email'
          className={`bg-[#333] w-full p-3 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-red-600 border ${
            errors?.email ? 'border-red-500' : 'border-[#555]'}`}
          type={"email"}
          placeholder={"이메일"}
        />
        {errors?.email && (<div className="text-red-500 text-sm">{errors.email.message}</div>)}
 
        <input 
          {...register('password')}
          name='password'
          className={`bg-[#333] w-full p-3 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-red-600 ${
            errors?.password? 'border-red-500' : 'border-[#555]'
          }`}
          type="password"
          placeholder="비밀번호"
        />
        {errors?.password && (<div className="text-red-500 text-sm">{errors.password.message}</div>)}

        <input 
          {...register('passwordCheck')}
          name='passwordCheck'
          className={`bg-[#333] w-full p-3 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-red-600 ${
            errors?.passwordCheck ? 'border-red-500' : 'border-[#555]'
          }`}
          type="password"
          placeholder="비밀번호 확인"
        />
        {errors?.passwordCheck && (<div className="text-red-500 text-sm">{errors.passwordCheck.message}</div>)}

        <input 
          {...register("name")}
          name='name'
          className={`bg-[#333] w-full p-3 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-red-600 ${
            errors?.name ? 'border-red-500' : 'border-[#555]'
          }`}
          type="text"
          placeholder="이름"
        />
        {errors?.name && (<div className="text-red-500 text-sm">{errors.name.message}</div>)}

        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className={`w-full p-3 rounded font-semibold text-white transition-colors duration-200 ${
            isDisabled ? 'bg-[#3e1313] text-white cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
          }`}
        >
          회원가입
        </button>
      </div>
    </div>
);
}