interface FormButtonProps {
	type?: "button" | "submit" | "reset";
	onClick?: () => void;
	disabled: boolean;
	children: React.ReactNode;
}

const FormButton = ({
	type = "button",
	onClick,
	disabled,
	children,
}: FormButtonProps) => {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`rounded-md p-2 transition-colors ${
				!disabled
					? "bg-red-400 text-white hover:bg-red-500 cursor-pointer"
					: "bg-gray-400 text-gray-200 cursor-not-allowed"
			}`}
		>
			{children}
		</button>
	);
};

export default FormButton;
