// WithdrawConfirmModal.tsx
interface WithdrawConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const WithdrawConfirmModal = ({
  onConfirm,
  onCancel,
}: WithdrawConfirmModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <p className="mb-4 text-lg">정말 탈퇴하시겠습니까?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            예
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawConfirmModal;
