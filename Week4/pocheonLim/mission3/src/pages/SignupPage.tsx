import { Link } from 'react-router-dom';
import { SignupProvider } from '../contexts/SignupContext';
import { useSignup } from '../contexts/SignupContext';
import EmailStep from '../components/EmailStep';
import PasswordStep from '../components/PasswordStep';
import NicknameStep from '../components/NicknameStep';
import CompletionStep from '../components/CompletionStep';

const SignupContent = () => {
  const { step, setStep } = useSignup();

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <EmailStep />;
      case 2:
        return <PasswordStep />;
      case 3:
        return <NicknameStep />;
      case 4:
        return <CompletionStep />;
      default:
        return <EmailStep />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="relative flex justify-center mb-8">
          {step === 1 ? (
            <Link to="/" className="absolute left-0 text-gray-400 hover:text-white text-2xl">
              {'<'}
            </Link>
          ) : (
            <button
              onClick={handleBack}
              className="absolute left-0 text-gray-400 hover:text-white text-2xl"
            >
              {'<'}
            </button>
          )}
          <h1 className="text-2xl font-semibold">회원가입</h1>
        </div>

        {step === 1 && (
          <>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-700 rounded-lg hover:bg-gray-900 transition-colors">
              <img src="/google-icon.png" alt="Google" className="w-6 h-6" />
              <span>구글 로그인</span>
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-400">OR</span>
              </div>
            </div>
          </>
        )}

        {renderStep()}
      </div>
    </div>
  );
};

const SignupPage = () => {
  return (
    <SignupProvider>
      <SignupContent />
    </SignupProvider>
  );
};

export default SignupPage; 