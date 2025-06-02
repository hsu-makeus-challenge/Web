export type UserSigninInformation = {
  email: string;
  password: string;
};

function validateUser(values: UserSigninInformation) {
  const errors = {
    email: '',
    password: '',
  };

  if (
    !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
      values.email
    )
  ) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }

  if (!/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/i.test(values.password)) {
    errors.password = '올바른 비밀번호 형식이 아닙니다.';
  }

  return errors;
}

export function validateSignin(values: UserSigninInformation) {
  return validateUser(values);
}

export function validateEmailOnly(
  values: Pick<UserSigninInformation, 'email'>
) {
  const errors = {
    email: '',
  };

  if (
    !/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i.test(
      values.email
    )
  ) {
    errors.email = '올바른 이메일 형식이 아닙니다.';
  }

  return errors;
}

export function validatePasswordOnly(
  values: Pick<UserSigninInformation, 'password'>
) {
  const errors = {
    password: '',
  };

  if (!/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/i.test(values.password)) {
    errors.password = '올바른 비밀번호 형식이 아닙니다.';
  }

  return errors;
}
