import { useAuthDeleteMutation } from "../../hooks/auth/useAuthDeleteMutation";

type DeleteModalProps = {
    onClose: () => void;
};

const DeleteModal = ({ onClose }: DeleteModalProps) => {

    const deleteMutation = useAuthDeleteMutation(
        () => {
            alert("탈퇴되었습니다.");
            onClose();
            window.location.reload();
        }
    );

    return (
        <div className="fixed inset-0 bg-black/85 flex z-10 justify-center items-center left-0 md:left-[20vw] top-[3vw]">
            <div className="bg-gray-800 w-[50%] p-[2vw] flex flex-col items-center">
                <div className="w-full flex justify-end">
                    <button className="text-[2vw] cursor-pointer" onClick={onClose}>x</button>
                </div>

                <p className="text-[2vw] font-bold">정말 탈퇴하시겠습니까?</p>

                <div className="flex justify-center gap-[1vw] mt-[5vw] mb-[2vw]">
                    <button
                        className="bg-red-500 px-[2vw] py-[1vw] rounded text-[1.2vw] cursor-pointer"
                        onClick={() => deleteMutation.mutate()}
                        disabled={deleteMutation.isPending}
                    >
                        {deleteMutation.isPending ? "처리 중..." : "예"}
                    </button>
                    <button
                        className="bg-gray-500 px-[2vw] py-[1vw] rounded text-[1.2vw] cursor-pointer"
                        onClick={onClose}
                        disabled={deleteMutation.isPending}
                    >
                        아니오
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
