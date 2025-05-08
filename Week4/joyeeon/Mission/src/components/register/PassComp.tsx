import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import { FormValues } from "./SignupComp";

interface PassCompProps<T extends FieldValues> {
    register: UseFormRegister<T>;
    name: Path<T>;
    error?: string;
    placeholder?: string;
}

const PassComp = <T extends Record<string, any>>({ 
    register, name, error, placeholder }: PassCompProps<T>) => {
    // 비밀번호 상태
    const [passwordType, setPasswordType] = useState('password');
    const [passwordIcon, setPasswordIcon] = useState(<FaRegEyeSlash size={15} />);

    const handleTogglePassword = () => {
        if (passwordType === 'password') {
            setPasswordType('text');
            setPasswordIcon(<FaRegEye size={15} />);
        } else {
            setPasswordType('password');
            setPasswordIcon(<FaRegEyeSlash size={15} />);
        }
    };

    return (
        <>
            <div className="inputpass mt-5">
                <input className="border-none bg-transparent focus:outline-none autofill:bg-transparent "
                    type={passwordType}
                    {...register(name)}
                    name={name}
                    placeholder={placeholder || "비밀번호를 입력해주세요!"} />
                <button onClick={handleTogglePassword}>
                    {passwordIcon}
                </button>
            </div>
            {error && <div className="errorMSG">{error}</div>}
        </>
    )
}

export default PassComp;