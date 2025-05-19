import Modal from "react-modal";
import { customModalStyles } from "../../styles/CustomModal";
Modal.setAppElement("#root");
import { forwardRef, useImperativeHandle, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { useWithdraw } from "../../hooks/Auths/useAuths";

interface WidthdrawModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    modalRef: React.RefObject<HTMLDivElement | null>;
}


const WidthDraw = ({isOpen, onRequestClose, modalRef} : WidthdrawModalProps) => {
    const innerRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(modalRef, () => innerRef.current as HTMLDivElement, []);
    const {mutate: logoutmutate} = useWithdraw();

    return(
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="회원탈퇴"
            style={customModalStyles}>
                <button>
                <RxCross2 onClick={onRequestClose} className='absolute top-5 right-5 cursor-pointer' />
            </button>
                <main ref={innerRef} onClick={(e) => e.stopPropagation()}
                    className="flex flex-col items-center justify-center"
                    >
                    <div className="text-lg font-bold ">정말 탈퇴하시겠습니까?</div>
                    
                    <div className="flex flex-row justify-between gap-5 mt-10 w-full">
                        <button className="btn bg-red-200 w-fill"
                        onClick={() => logoutmutate}
                        >예</button>
                        <button className="btn bg-slate-200 w-[200px]"
                        onClick={onRequestClose}
                        >아니오</button>
                    </div>
                </main>
            
        </Modal>
    )
}

export default WidthDraw;