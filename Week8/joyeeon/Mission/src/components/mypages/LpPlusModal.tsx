import { customModalStyles } from '../../styles/CustomModal';
import Modal from 'react-modal';
import { RxCross2 } from "react-icons/rx";
import { useState } from 'react'
import LPImageUpload from './LPImageUpload';
import TagItems from './TagItems';
import { useCreateLp } from '../../hooks/UseCreateLp';
Modal.setAppElement('#root');

interface LpPlusModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

const LpPlusModal = ({ isOpen, onRequestClose }: LpPlusModalProps) => {
    const [lpName, setLpName] = useState('');
    const [lpContent, setLpContent] = useState('');
    const [lpTag, setLpTag] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
    const { mutate: createLp } = useCreateLp();

    const handleSubmit = () => {
        createLp({
            title: lpName,
            content: lpContent,
            thumbnail:thumbnailUrl,
            tags,
            published:true,
        });
        onRequestClose();
    };

    const handleTagAdd = () => {
        // 여기에 태그 추가 로직 넣기
        console.log("추가되는 태그", lpTag);
        if (lpTag.trim() === '') return;
        setTags([...tags, lpTag.trim()]);
        setLpTag('');
    }

    const removeTag = (tagIdx: number) => {
        setTags(tags.filter((_, idx) => idx !== tagIdx));
    };



    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="프로필 수정"
            style={customModalStyles}
            className={"flex flex-col min-width-full min-h-[300px]"}
        >
            <button>
                <RxCross2 onClick={onRequestClose} className='absolute top-5 right-5 cursor-pointer' />
            </button>

            <LPImageUpload onImageUploadSuccess={setThumbnailUrl} />



            <form className='flex flex-col w-80'>
                <input
                    type="text"
                    placeholder="LP Name"
                    value={lpName}
                    onChange={(e) => setLpName(e.target.value)}
                    className="lpinput"
                />
                <input
                    type="text"
                    placeholder="LP Content"
                    value={lpContent}
                    onChange={(e) => setLpContent(e.target.value)}
                    className="lpinput"
                />
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="LP Tag"
                        value={lpTag}
                        onChange={(e) => setLpTag(e.target.value)}
                        className="lpinput flex-1"
                    />
                    <button
                        type="button"
                        className="lpsubmit"
                        onClick={handleTagAdd}
                    >
                        Add
                    </button>
                </div>
                <TagItems tags={tags} onRemove={removeTag} />


                <button
                    type="button"
                    onClick={handleSubmit}
                    className="lpsubmit min-w-[120px]"
                >
                    Add LP
                </button>
            </form>
        </Modal>
    );
}

export default LpPlusModal;