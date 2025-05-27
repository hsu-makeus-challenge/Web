import { deleteUser } from "../apis/auth";

interface QuitModalProps {
  onClose: () => void;
}

const QuitModal = ({ onClose }: QuitModalProps) => {
  const handleQuit = async () => {
    try {
      await deleteUser();
      alert("탈퇴가 완료되었습니다.");
      window.location.href = "/";
    } catch (error) {
      alert("탈퇴에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="bg-[#1C1C1E] p-6 rounded-lg text-center text-white">
        <p className="mb-4">정말 탈퇴하시겠습니까?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleQuit}
            className="px-4 py-2 bg-gray-300 rounded text-black cursor-pointer"
          >
            예
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#FF4E6B] rounded text-white cursor-pointer"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuitModal;
