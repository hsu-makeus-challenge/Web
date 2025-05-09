export const errorMessages: Record<"email" | "password" | "passwordCheck" | "name", Record<string, string>> = {
    email: {
      required: "올바른 이메일 형식을 입력해주세요.",
      pattern: "올바른 이메일 형식을 입력해주세요.",
    },
    password: {
      required: "비밀번호는 8자 이상이어야 합니다.",
      minLength: "비밀번호는 8자 이상이어야 합니다.",
    },
    passwordCheck: {
      required: "비밀번호를 다시 한 번 입력해주세요.",
      validate: "비밀번호가 일치하지 않습니다.",
    },
    name: {
      required: "닉네임을 입력해주세요.",
    }
  };
  