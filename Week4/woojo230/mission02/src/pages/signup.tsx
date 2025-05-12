// pages/SignUp.tsx
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import EmailStep from '../components/signup/EmailStep';
import PasswordStep from '../components/signup/PasswordStep';

const SignUp = () => {
  const [step, setStep] = useState<'email' | 'password'>('email');
  const [email, setEmail] = useState('');

  const handleNext = (email: string) => {
    setEmail(email);
    setStep('password');
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
              <EmailStep onNext={handleNext} />
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
              <PasswordStep email={email} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SignUp;
