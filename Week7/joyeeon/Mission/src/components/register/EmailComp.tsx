import { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface EmailCompProps<T extends FieldValues> {
    register: UseFormRegister<T>;
    error?: string;
}

const EmailComp = <T extends FieldValues>({
    register,
    error,
}: EmailCompProps<T>) => {
    return (
        <>
            <input
                type="email"
                className="input"
                {...register("email" as Path<T>)}  // 핵심: Path<T>로 타입 보장
                placeholder="이메일을 입력해 주세요!"
            />
            {error && <div className="errorMSG">{error}</div>}
        </>
    );
};

export default EmailComp;
