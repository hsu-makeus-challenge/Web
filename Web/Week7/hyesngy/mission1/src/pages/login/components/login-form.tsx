import ErrorMsg from "@components/form/error-msg";
import { useLoginForm } from "@hooks/use-form";
import type { LoginFormValues } from "@utils/validate";

interface LoginFormProps {
	onSubmit: (data: LoginFormValues) => Promise<void>;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
	const { register, handleSubmit, errors, isValid, isDirty } = useLoginForm();

	return (
		<form
			className="flex flex-col gap-4 w-full"
			onSubmit={handleSubmit(onSubmit)}
		>
			<input
				{...register("email")}
				type="email"
				placeholder="이메일을 입력해주세요"
				className="border-2 border-gray-300 rounded-md p-2"
				autoComplete="email"
			/>
			<ErrorMsg message={errors.email?.message || ""} />

			<input
				{...register("password")}
				type="password"
				placeholder="비밀번호를 입력해주세요"
				className="border-2 border-gray-300 rounded-md p-2"
				autoComplete="current-password"
			/>
			<ErrorMsg message={errors.password?.message || ""} />

			<button
				type="submit"
				disabled={!isValid || !isDirty}
				className={`rounded-md p-2 transition-colors ${
					isValid && isDirty
						? "bg-red-400 text-white hover:bg-red-500 cursor-pointer"
						: "bg-gray-400 text-gray-200 cursor-not-allowed"
				}`}
			>
				로그인
			</button>
		</form>
	);
};

export default LoginForm;
