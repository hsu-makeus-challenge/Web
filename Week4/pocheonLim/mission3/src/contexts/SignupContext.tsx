import { createContext, useContext, ReactNode } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

interface SignupContextType {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  nickname: string;
  setNickname: (nickname: string) => void;
  step: number;
  setStep: (step: number) => void;
}

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export const SignupProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useLocalStorage('signup_email', '');
  const [password, setPassword] = useLocalStorage('signup_password', '');
  const [nickname, setNickname] = useLocalStorage('signup_nickname', '');
  const [step, setStep] = useLocalStorage('signup_step', 1);
  

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
        setStep 
      }}
    >
      {children}
    </SignupContext.Provider>
  );
};

export const useSignup = () => {
  const context = useContext(SignupContext);
  if (context === undefined) {
    throw new Error('에러다...');
  }
  return context;
};