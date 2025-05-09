export const validationRules = {
    email: {
        required: true,
        pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "",
        },
    },
    password: {
        required: true,
        minLength: {
            value: 8,
            message: "비밀번호는 최소 8자 이상이어야 해요.",
        },
    },
    passwordCheck: {
        required: true,
        validate: (value: string, getPassword: () => string) => {
            return value === getPassword() || "비밀번호가 일치하지 않습니다.";
        },
    },
    name: {
        required: true,
    }
};
