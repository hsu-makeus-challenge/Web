const ErrorMsg = ({ message }: { message: string }) => {
	if (!message) return null;

	return <span className="text-red-500 text-xs">{message}</span>;
};

export default ErrorMsg;
