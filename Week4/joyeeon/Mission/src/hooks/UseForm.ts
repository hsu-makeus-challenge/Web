import { ChangeEvent, useState , useEffect} from "react";

interface UseFormProps<T> {
    initialValue : T; //이메일. 패스워드 등 
    validate:(values:T) => Record<keyof T, string>;
    deps?: any[];
}

function useForm<T  extends Record<string, any>>({initialValue, validate, deps = []} : UseFormProps<T>) {
    const [values , setValues] = useState(initialValue);
    const [touched, setTouched] = useState<Record<string, boolean>>();
    const [errors, setErrors] = useState<Record<string, string>>();

    const handleChange = (name: keyof T, text:string) =>{
        setValues({
            ...values,
            [name]:text,
        });
    };

    const handleBlur = (name:keyof T) =>{
        setTouched({
            ...touched,
            [name]: true,
        });
    };

    const getInputProps = (name: keyof T) =>{
        const value = values[name];

        const onChange = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
            handleChange(name, e.target.value);

        const onBlur = () => handleBlur(name);

        return {value, onChange, onBlur}
    };

    useEffect( () =>{
        const newErrors = validate(values);
        setErrors(newErrors);
    }, [validate, values, ...(deps || [])]);

    return {values, errors, touched, getInputProps} ;

}

export default useForm;