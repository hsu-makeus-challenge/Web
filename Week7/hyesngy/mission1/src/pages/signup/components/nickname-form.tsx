import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { SignupFormValues } from "@utils/validate";
import { IoPerson } from "react-icons/io5";
import ErrorMsg from "@components/form/error-msg";
import FormButton from "@components/form/form-btn";

interface NicknameFormProps {
	register: UseFormRegister<SignupFormValues>;
	errors: FieldErrors<SignupFormValues>;
	getValues: (fieldName?: string | string[]) => unknown;
}

const NicknameForm = ({ register, errors, getValues }: NicknameFormProps) => {
	const isDisabled = !getValues("nickname") || !!errors.nickname;

	return (
		<>
			<div className="w-30 h-30 self-center mb-4 bg-gray-400 rounded-full flex items-center justify-center">
				<IoPerson size={70} />
			</div>
			<input
				{...register("nickname")}
				type="text"
				placeholder="닉네임을 입력해주세요"
				className="border-2 border-gray-300 rounded-md p-2"
			/>
			<ErrorMsg message={errors.nickname?.message || ""} />

			<FormButton type="submit" disabled={isDisabled}>
				회원가입 완료
			</FormButton>
		</>
	);
};

export default NicknameForm;
