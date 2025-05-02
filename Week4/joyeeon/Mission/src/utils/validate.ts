export type UserSigninInformation = {
    email: string;
    password: string;
    passcheck: string;
};

export function validateEmail(email: string): string {
    const regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!regex.test(email)) {
        return "올바른 이메일 형식이 아닙니다!";
    }
    return "";
}

export function validatePassword(password: string): string {
    if (password.length < 8 || password.length >= 20) {
        return "비밀번호는 8~20 사이로 입력해주세요.";
    }
    return "";
}

export function validatePassCheck(passcheck: string, password: string): string {
    if (password != passcheck) {
        return "비밀번호가 일치하지 않습니다.";
    }
    return "";
}


export function validateSignin(values: UserSigninInformation): Record<keyof UserSigninInformation, string> {
    return {
        email: validateEmail(values.email),
        password: validatePassword(values.password),
        passcheck: "",
    };
}

// 회원가입 Step1 (이메일만)
export function validateSignupEmail(values: Pick<UserSigninInformation, "email">): { email: string } {
    return {
        email: validateEmail(values.email),
    };
}

// 회원가입 Step2 (비밀번호만)
export function validateSignupPassword(values: Pick<UserSigninInformation, "password">): { password: string } {
    return {
        password: validatePassword(values.password),
    };
}

//step3 (비밀번호 확인)
export function validateSignupPassCheck(values: { password: string; passcheck: string }): { passcheck: string } {
    return {
        passcheck: validatePassCheck(values.passcheck, values.password),
    };
}