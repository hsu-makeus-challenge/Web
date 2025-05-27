import { useMypageStore } from "../../stores/MypageStore";
import UserDefaultIMG from "../../assets/user.png"
import { IoMdSettings } from "react-icons/io";
import { useState, useRef } from "react";
import { useUpdateMyinfo } from "../../hooks/mypages/UseUpdateMyinfo";
import { useUploadImage } from '../../hooks/UseUploadImage';


const MydataComp = () => {
    const userInfo = useMypageStore((state) => state.userInfo);
    const [isEdit, setEdit] = useState(false);

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { mutate: uploadImage } = useUploadImage();

    const [formData, setFormData] = useState({
        name: userInfo?.data?.name || "",
        bio: userInfo?.data?.bio || "",
        avatar: userInfo?.data?.avatar || "",
    });

    const { mutate: updateMyInfo } = useUpdateMyinfo();
    const setUserInfo = useMypageStore((state) => state.setUserInfo);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (!formData.name) {
            alert("이름을 입력해주세요!");
            return;
        }
        updateMyInfo(formData, {
            onSuccess: (res) => {
                setUserInfo(res.data); // 스토어 갱신
                setEdit(false);
            },
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        uploadImage(file, {
            onSuccess: (res) => {
                const imageUrl = res.data.imageUrl;
                setFormData((prev) => ({ ...prev, avatar: imageUrl })); // 프로필 사진 URL 업데이트
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
        <main className="relative flex flex-row bg-green-100 rounded-md min-h-[200px] px-10 py-5 w-full gap-10 items-center justify-between">
            <img
                className="rounded-full w-[100px] h-[100px]"
                src={previewImage || userInfo?.data.avatar || UserDefaultIMG}
                alt="프로필"
            />

            <button className="absolute right-5 top-5"
                onClick={() => setEdit(true)}>
                <IoMdSettings className="text-2xl text-gray-500 hover:text-gray-700 cursor-pointer" />
            </button>


            <div>
                {isEdit ? (
                    <div className="flex flex-col gap-2 w-full pr-2">
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input"
                            placeholder="이름"
                        />
                        <input
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            className="input"
                            placeholder="소개"
                        />
                        {/* <input
                            name="avatar"
                            value={formData.avatar}
                            onChange={handleChange}
                            className="input"
                            placeholder="사진 URL"
                        /> */}
                        <div>
                            {userInfo?.data.email || "이메일 없음"}
                        </div>
                        <div className="flex gap-2">
                            <button
                                className="cursor-pointer bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                                onClick={handleImageClick}
                            >프로필수정</button>
                            <button onClick={handleSave} className="cursor-poiner bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
                                저장
                            </button>
                        </div>

                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            style={{ display: "none" }}
                        />


                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        <div>
                            {userInfo?.data.name || "이름 없음"}
                        </div>
                        <div>
                            {userInfo?.data.bio || "한마디 없음"}
                        </div>
                        <div>
                            {userInfo?.data.email || "이메일 없음"}
                        </div>
                    </div>
                )}

            </div>
        </main>
    )
}

export default MydataComp;