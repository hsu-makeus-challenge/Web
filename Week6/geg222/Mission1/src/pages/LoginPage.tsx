import React, {useState, useEffect} from 'react';
import {UserSigninInformation, validateSignin} from '../utils/validate';
import useForm from '../hooks/useForm';
import {useAuth} from '../context/AuthContext';
import {useNavigate} from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
    const {login, accessToken} = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (accessToken) {
            navigate("/");
        }
    }, [accessToken, navigate]);

    const {values, errors, touched, getInputProps} = useForm<UserSigninInformation>({
        initialValues: {
            email: "",
            password: "",
        },
        validate: validateSignin,
    });

    const handleSubmit = async () => {
        await login(values);
    };

    const isDisabled = Object.values(errors || {}).some((error) => error.length > 0) ||
        Object.values(values).some((value) => value === "");

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                const activeElement = document.activeElement;
                const isInputFocused = activeElement &&
                    (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA');

                if (!isInputFocused && !isDisabled) {
                    handleSubmit();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleSubmit, isDisabled]);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            <LoginForm
                getInputProps={getInputProps}
                errors={errors}
                touched={touched}
                isDisabled={isDisabled}
                onSubmit={handleSubmit}
                showPassword={showPassword}
            />
        </div>
    );
}

export default LoginPage;