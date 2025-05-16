import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { SignupFormValues } from "@utils/validate";
import ErrorMsg from "@components/form/error-msg";
import FormButton from "@components/form/form-btn";

interface EmailFormProps {
	register: UseFormRegister<SignupFormValues>;
	errors: FieldErrors<SignupFormValues>;
	getValues: (fieldName?: string | string[]) => unknown;
	handleNextStep: () => Promise<void>;
}

const EmailForm = ({
	register,
	errors,
	getValues,
	handleNextStep,
}: EmailFormProps) => {
	return (
		<>
			<input
				{...register("email")}
				type="email"
				placeholder="이메일을 입력해주세요"
				className="border-2 border-gray-300 rounded-md p-2"
			/>
			<ErrorMsg message={errors.email?.message || ""} />

			<FormButton
				type="button"
				onClick={handleNextStep}
				disabled={!getValues("email") || !!errors.email}
			>
				다음
			</FormButton>
		</>
	);
};

export default EmailForm;
