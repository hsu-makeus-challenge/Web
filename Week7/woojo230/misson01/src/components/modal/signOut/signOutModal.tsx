import useSignOutStore from '../../../stores/signOut';

const SignOutModal = () => {
  const { toggleSignOutModal } = useSignOutStore();

  const handleSignOut = async () => {};

  const handleCancel = () => {
    toggleSignOutModal();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-lime-600 rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-white mb-4 text-center">
          진짜 갈거야..?
        </h2>

        <div className="flex justify-center gap-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors cursor-pointer"
          >
            취소
          </button>
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-lime-700 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 cursor-pointer"
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignOutModal;
