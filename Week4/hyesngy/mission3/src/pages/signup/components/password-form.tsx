import type {
	UseFormRegister,
	FieldErrors,
	UseFormWatch,
} from "react-hook-form";
import type { SignupFormValues } from "@utils/validate";
import { IoEye, IoEyeOff } from "react-icons/io5";
import type { Dispatch, SetStateAction } from "react";
import { IoIosMail } from "react-icons/io";
import ErrorMsg from "@components/form/error-msg";
import FormButton from "@components/form/form-btn";

interface PasswordFormProps {
	register: UseFormRegister<SignupFormValues>;
	errors: FieldErrors<SignupFormValues>;
	getValues: (fieldName?: string | string[]) => unknown;
	watch: UseFormWatch<SignupFormValues>;
	handleNextStep: () => Promise<void>;
	showPassword: boolean;
	showConfirmPassword: boolean;
	setShowPassword: Dispatch<SetStateAction<boolean>>;
	setShowConfirmPassword: Dispatch<SetStateAction<boolean>>;
}

const PasswordForm = ({
	register,
	errors,
	getValues,
	watch,
	handleNextStep,
	showPassword,
	showConfirmPassword,
	setShowPassword,
	setShowConfirmPassword,
}: PasswordFormProps) => {
	const password = watch("password") as string;
	const confirmPassword = watch("confirmPassword") as string;
	const passwordMismatch =
		!!password && !!confirmPassword && password !== confirmPassword;

	const isDisabled: boolean =
		!password ||
		!confirmPassword ||
		!!errors.password ||
		!!errors.confirmPassword ||
		passwordMismatch;

	return (
		<>
			<div className="w-full mb-4 flex flex-row gap-2 items-center">
				<IoIosMail size={20} />
				<p className="text-sm mb-1"> {String(getValues("email"))}</p>
			</div>

			<div className="w-full relative">
				<input
					{...register("password")}
					type={showPassword ? "text" : "password"}
					placeholder="비밀번호를 입력해주세요"
					className="border-2 border-gray-300 rounded-md p-2 w-full"
					autoComplete="new-password"
				/>
				<button
					type="button"
					className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
					onClick={() => setShowPassword(!showPassword)}
				>
					{showPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
				</button>
			</div>
			<ErrorMsg message={errors.password?.message || ""} />

			<div className="w-full relative">
				<input
					{...register("confirmPassword")}
					type={showConfirmPassword ? "text" : "password"}
					placeholder="비밀번호를 다시 입력해주세요"
					className="border-2 border-gray-300 rounded-md p-2 w-full"
					autoComplete="new-password"
				/>
				<button
					type="button"
					className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
					onClick={() => setShowConfirmPassword(!showConfirmPassword)}
				>
					{showConfirmPassword ? <IoEyeOff size={20} /> : <IoEye size={20} />}
				</button>
			</div>
			<ErrorMsg
				message={
					errors.confirmPassword?.message ||
					(passwordMismatch ? "비밀번호가 일치하지 않습니다!" : "")
				}
			/>

			<FormButton type="button" onClick={handleNextStep} disabled={isDisabled}>
				다음
			</FormButton>
		</>
	);
};

export default PasswordForm;
