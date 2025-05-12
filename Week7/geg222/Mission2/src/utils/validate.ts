export type UserSigninInformation = {
    email: string;
    password: string;
};

function validateUser(values: UserSigninInformation) {
    const errors = {
        email: "",
        password: ""
    };

    if (!values.email) {
        errors.email = "이메일을 입력해주세요.";
    } else if (!/^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/.test(values.email)) {
        errors.email = "잘못된 이메일 주소입니다. example@email.com 형식으로 입력되었는지 확인하세요.";
    }

    
    if (!values.password) {
        errors.password = "비밀번호를 입력해주세요.";
    } else if (!(values.password.length >= 8 && values.password.length <= 20)) {
        errors.password = "비밀번호는 8자 이상 20자 이하로 입력해주세요.";
    }

    return errors;
}


function validateSignin(values: UserSigninInformation) {
    return validateUser(values);
}

export { validateSignin };