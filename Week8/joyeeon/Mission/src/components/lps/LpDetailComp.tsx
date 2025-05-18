import type { LpDetail, LpUpdateDetail } from "../../types/lpdetails";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import LpCommentList from "./LPCommentList";
import "../../styles/LPDetailComp.css";
import { useCreateLpComment } from "../../hooks/UseControlLpComment";
import { useState, useRef } from "react";
import { useUpdateLpDetail } from "../../hooks/UseLpDetailUpdate";
import { useDeleteLp } from "../../hooks/UseLpDelete";
import { useUploadImage } from "../../hooks/UseUploadImage";
import LikesButton from "./LikesButton";

interface DetailItemProps {
    detail: LpDetail;
}

const LpDetailComp = ({ detail }: DetailItemProps) => {
    const { mutate: createcomment } = useCreateLpComment();
    const { mutate: updatecomment } = useUpdateLpDetail();
    const { mutate: deletecomponent } = useDeleteLp();

    const [comment, setComment] = useState<string>("");

    const [isEdit, setIsEdit] = useState(false);

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const { mutate: uploadImage } = useUploadImage();

    const storedId = localStorage.getItem("ID");
    const currentUserId = storedId ? Number(storedId) : 0;

    const [editData, setEditData] = useState<LpUpdateDetail>({
        title: detail.title,
        content: detail.content,
        thumbnail: detail.thumbnail,
        tags: detail.tags ?? [],            // 빈 배열 fallback
        published: detail.published ?? false // false fallback
    });

    const handleEditChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setEditData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditSubmit = () => {
        const sanitizedData = {
            ...editData,
            tags: editData.tags?.map((tag: any) => typeof tag === "string" ? tag : tag.name),
        };

        console.log("전송할 sanitizedData:", sanitizedData);
        setPreviewImage(null);
        updatecomment({ lpId: detail.id, lpData: sanitizedData });
        setIsEdit(false);
    };

    const handleDelete = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            deletecomponent(detail.id);
        }
    }


    //수정 관리
    // const handlecomment = () => {
    //     createcomment({
    //         content: comment,
    //         lpid: detail.id,
    //     });
    // }
    const handlecomment = (e: React.FormEvent) => {
        e.preventDefault();
        createcomment({
            content: comment,
            lpid: detail.id,
        });
        setComment("");
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        uploadImage(file, {
            onSuccess: (res) => {
                const imageUrl = res.data.imageUrl;
                setEditData((prev) => ({ ...prev, thumbnail: imageUrl })); // 프로필 사진 URL 업데이트
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
        <main className="bg-emerald-100 w-[90%] my-20 mx-20 min-h-[90%] px-5 py-5 rounded-md">

            <article className="flex justify-between h-full items-center">
                <div className="flex gap-5">
                    <img className="w-[30px] h-[30px] rounded-2xl" src={detail.author?.avatar} alt="프로필" />
                    {detail.author?.name || "이름"}
                </div>
                <article className=" flex text-[10px] h-full justify-end items-center gap-4">
                    <button
                        onClick={() => setIsEdit(true)}
                        className="flex items-center gap-2 px-2 py-1 bg-blue-200 rounded-lg hover:bg-blue-100 transition">
                        <FaEdit />
                        수정
                    </button>
                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 px-2 py-1 bg-red-200 rounded-lg hover:bg-red-100 transition">
                        <MdDelete />
                        삭제
                    </button>
                    {isEdit && (
                        <button
                            onClick={handleEditSubmit}
                            className="ml-2 px-2 py-1 bg-green-300 rounded hover:bg-green-200 transition"
                        >
                            수정 완료
                        </button>
                    )}
                </article>

            </article>
            <span>{detail.createdAt.slice(5, 10)}</span>
            <article className="flex w-full justify-center my-5">
                {isEdit ? (
                    <div className="relative w-[300px] h-[300px] bg-slate-300 hover:bg-slate-200 cursor-pointer"

                        onClick={handleImageClick}>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            style={{ display: "none" }}
                        />

                        {previewImage ? (
                            <img
                                src={previewImage}
                                alt="미리보기"
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <div className="flex w-full h-full items-center justify-center text-gray-500">
                                클릭하여 이미지 선택
                            </div>
                        )}

                    </div>
                ) : (
                    <div className="relative w-[300px] h-[300px] rounded-full overflow-hidden shadow-2xl justify-center">
                        <img
                            src={detail.thumbnail}
                            alt="콘텐츠썸네일"
                            className="object-cover w-full h-full rounded-full spin-slow"
                            style={{ animation: 'spin 8s linear infinite' }}
                        />
                        <div className="absolute top-1/2 left-1/2 w-[60px] h-[60px] bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10" />
                    </div>
                )}

            </article>

            <article>
                <div className="mt-5 font-bold">
                    {isEdit ? (
                        <input
                            type="text"
                            name="title"
                            value={editData.title}
                            onChange={handleEditChange}
                            className="input w-full"
                        />
                    ) : (
                        detail.title
                    )}
                </div>
                <div className=" my-10">
                    {isEdit ? (
                        <textarea
                            name="content"
                            value={editData.content}
                            onChange={handleEditChange}
                            className="textarea w-full h-[120px]"
                        />
                    ) : (
                        detail.content
                    )}
                </div>
            </article>

            <form className="flex flex-row gap-3" onSubmit={handlecomment}>
                <input type="text"
                    placeholder="댓글을 입력하세요"
                    className="input"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    type="submit"
                    className="lpsubmit min-w-[60px]">
                    작성
                </button>
            </form>


            <LikesButton
                count={detail.likes?.length ?? 0}
                lpId={detail.id}
                currentUserId={currentUserId} // 현재 로그인한 사용자 ID
                likedUserIds={detail.likes?.map((like) => like.userId) ?? []}
            />

            <LpCommentList lpId={detail.id} />
        </main>
    )
}

export default LpDetailComp;