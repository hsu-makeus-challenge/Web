import { useForm } from "react-hook-form";
import type { Login } from "../types/login";
import { validationRules } from "../utils/login/validationRules";

export const useLoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<Login>({
        mode: "onChange",
    });

    return {
        register,
        handleSubmit,
        errors,
        isValid,
        validationRules,
    };
};
