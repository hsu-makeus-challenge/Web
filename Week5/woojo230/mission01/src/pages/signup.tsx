import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import EmailStep from '../components/signup/EmailStep';
import PasswordStep from '../components/signup/PasswordStep';
import { emailSchema, signUpSchema } from '../schemas/signupSchema';
import ProfileStep from '../components/signup/ProfileStep';
import type { ProfileSteps } from '../type/type';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../apis/auth/signup';

const SignUp = () => {
  const [step, setStep] = useState<ProfileSteps>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 이메일->패스워드
  const handleEtoP = (email: string) => {
    setEmail(email);
    setStep('password');
  };

  // 패스워드->프로필
  const handlePtoP = (password: string) => {
    setPassword(password);
    setStep('profile');
  };

  const handleSignUpComplete = async (
    nickname: string,
    profileImage: File | null
  ) => {
    try {
      const data = await signUpUser({
        email,
        password,
        nickname,
        profileImage,
      });

      console.log('회원가입 성공:', data);
      navigate('/home');
    } catch (error: any) {
      console.error('회원가입 실패:', error.response?.data || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white p-8 md:p-10 rounded-2xl w-[350px] md:w-[400px] border-2 border-lime-700">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 relative">
          회원가입
        </h2>

        <AnimatePresence mode="wait">
          {step === 'email' && (
            <motion.div
              key="email"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.3 }}
            >
              <EmailStep onNext={handleEtoP} validationSchema={emailSchema} />
            </motion.div>
          )}

          {step === 'password' && (
            <motion.div
              key="password"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <PasswordStep
                onNext={handlePtoP}
                email={email}
                validationSchema={signUpSchema}
              />
            </motion.div>
          )}

          {step === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <ProfileStep onComplete={handleSignUpComplete} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SignUp;
