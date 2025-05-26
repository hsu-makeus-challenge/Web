import { ChangeEvent, useEffect, useState } from "react";

interface useFormProps<T> {
  initialValue: T; // {email: '', password:''}
  //값이 올바른지 검증하는 함수
  validate: (values: T) => Record<keyof T, string>;
}

function useForm<T>({ initialValue, validate }: useFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  //사용자가 입력값을 바꿀 때 실행되는 함수다.
  const handleChange = (name: keyof T, text: string) => {
    setValues({
      ...values, //기본 값 유지
      [name]: text,
    });
  };

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  //email input, password input 속성 가져오기
  const getInputProps = (name: keyof T) => {
    const value = values[name];
    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      handleChange(name, e.target.value);

    const onBlur = () => handleBlur(name);

    return { value, onChange, onBlur };
  };

  //value가 바뀔때 마다 에러 검증 로직이 발생해야함
  // {email : "이베일 형식이 아닙니다!"}

  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors); // 오류메시지 없데이트
  }, [validate, values]);

  return { values, errors, touched, getInputProps };
}

export default useForm;
