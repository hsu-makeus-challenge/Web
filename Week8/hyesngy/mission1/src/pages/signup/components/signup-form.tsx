import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupFormSchema, type SignupFormValues } from "@utils/validate";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "@apis/auth/auth";
import EmailForm from "./email-form";
import PasswordForm from "./password-form";
import NicknameForm from "./nickname-form";

const SignupForm = () => {
	const [step, setStep] = useState(1);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		watch,
		trigger,
	} = useForm<SignupFormValues>({
		resolver: zodResolver(signupFormSchema),
		mode: "onChange",
	});

	const onSubmit = async (data: SignupFormValues) => {
		try {
			const signupData = {
				name: data.nickname,
				email: data.email,
				password: data.password,
				bio: "",
				avatar: "",
			};
			const response = await signUp(signupData);
			console.log("🚀 ~ onSubmit ~ response:", response);
			navigate("/login");
		} catch (error) {
			console.log("🚀 ~ onSubmit ~ error:", error);
		}
	};

	const handleNextStep = async () => {
		if (step === 1) {
			const isEmailValid = await trigger("email");
			if (isEmailValid) setStep(2);
		} else if (step === 2) {
			const isValid = await trigger(["password", "confirmPassword"]);
			if (isValid) setStep(3);
		}
	};

	return (
		<form
			className="flex flex-col gap-4 w-full"
			onSubmit={handleSubmit(onSubmit)}
		>
			{step === 1 ? (
				<EmailForm
					register={register}
					errors={errors}
					getValues={getValues}
					handleNextStep={handleNextStep}
				/>
			) : step === 2 ? (
				<PasswordForm
					register={register}
					errors={errors}
					getValues={getValues}
					watch={watch}
					handleNextStep={handleNextStep}
					showPassword={showPassword}
					showConfirmPassword={showConfirmPassword}
					setShowPassword={setShowPassword}
					setShowConfirmPassword={setShowConfirmPassword}
				/>
			) : (
				<NicknameForm
					register={register}
					errors={errors}
					getValues={getValues}
				/>
			)}
		</form>
	);
};

export default SignupForm;
