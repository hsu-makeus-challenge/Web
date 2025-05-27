import { createContext, useContext, ReactNode } from 'react';
import useLocalStorage from '../hooks/auth/useLocalStorage';

interface SignupContextType {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  nickname: string;
  setNickname: (nickname: string) => void;
  step: number;
  setStep: (step: number) => void;
  clearSignupData: () => void; // 회원가입 완료 후 데이터 초기화
}

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export const SignupProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useLocalStorage('signup_email', '');
  const [password, setPassword] = useLocalStorage('signup_password', '');
  const [nickname, setNickname] = useLocalStorage('signup_nickname', '');
  const [step, setStep] = useLocalStorage('signup_step', 1);

  // 회원가입 완료 후 모든 데이터 초기화
  const clearSignupData = () => {
    localStorage.removeItem('signup_email');
    localStorage.removeItem('signup_password');
    localStorage.removeItem('signup_nickname');
    localStorage.removeItem('signup_step');
    setEmail('');
    setPassword('');
    setNickname('');
    setStep(1);
  };

  return (
    <SignupContext.Provider 
      value={{ 
        email, 
        setEmail, 
        password, 
        setPassword, 
        nickname, 
        setNickname, 
        step, 
        setStep,
        clearSignupData
      }}
    >
      {children}
    </SignupContext.Provider>
  );
};

export const useSignup = () => {
  const context = useContext(SignupContext);
  if (context === undefined) {
    throw new Error('useSignup must be used within a SignupProvider');
  }
  return context;
};