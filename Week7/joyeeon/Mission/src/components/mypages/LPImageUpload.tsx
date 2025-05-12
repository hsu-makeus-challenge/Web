import { useState } from 'react'
import { useRef } from 'react';
import Lps from '../../assets/lps.png';
import { useUploadImage } from '../../hooks/UseUploadImage';

interface LPImageUploadProps {
    onImageUploadSuccess: (url: string) => void;
}

const LPImageUpload = ({ onImageUploadSuccess }: LPImageUploadProps) => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { mutate: uploadImage } = useUploadImage();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        uploadImage(file, {
            onSuccess: (res) => {
                const imageUrl = res.data.imageUrl;
                onImageUploadSuccess(imageUrl); // LP 생성할 때 써야 하는 URL 저장
            },
        });

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };
    return (
        <>
            <article className='relative w-fit'>
                <article>
                    {previewImage && (
                        <img
                            src={previewImage}
                            alt="Preview"
                            width={"120px"}
                            className='
                            absolute top-[40px] left-[-20px] w-[120px] h-[120px] shadow-md'

                        />
                    )}
                </article>
                <button>
                    <img src={Lps} alt="Lp 이미지"
                        width={"120px"}
                        height={"120px"}
                        className={`my-10 cursor-pointer ${previewImage ? "ml-[60px]" : "pl-0"}`}
                        onClick={handleImageClick} />
                </button>
            </article>


            {/* 숨겨진 파일 입력 */}
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageChange}
            />

        </>
    );
}

export default LPImageUpload;