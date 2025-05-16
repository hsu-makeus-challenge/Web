import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLp } from "@apis/lp/lp";
import { uploadImage } from "@apis/upload/upload";
import { FaTimes, FaImage } from "react-icons/fa";
import type { Lp } from "@typedefs/lp";

interface LpEditModalProps {
	lp: Lp;
	onClose: () => void;
}

const LpEditModal = ({ lp, onClose }: LpEditModalProps) => {
	const queryClient = useQueryClient();
	const [title, setTitle] = useState(lp.title);
	const [content, setContent] = useState(lp.content);
	const [thumbnail, setThumbnail] = useState(lp.thumbnail);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [tags] = useState<string[]>(lp.tags.map((tag) => tag.name));

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (file.size > 5 * 1024 * 1024) {
			alert("파일 크기는 5MB 이하로 선택해주세요.");
			return;
		}

		setSelectedFile(file);

		const reader = new FileReader();
		reader.onload = () => {
			setThumbnail(reader.result as string);
		};
		reader.readAsDataURL(file);
	};

	const updateLpMutation = useMutation({
		mutationFn: async () => {
			let thumbnailUrl = thumbnail;
			if (selectedFile) {
				try {
					thumbnailUrl = await uploadImage(selectedFile);
				} catch (error) {
					console.error("썸네일 업로드 실패:", error);
					throw new Error("썸네일 업로드에 실패했습니다.");
				}
			}

			const updateData = {
				title,
				content,
				thumbnail: thumbnailUrl,
				tags,
				published: true,
			};

			return updateLp(lp.id, updateData);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["lp", lp.id.toString()] });
			alert("LP가 성공적으로 수정되었습니다.");
			onClose();
		},
		onError: (error) => {
			console.error("LP 수정 중 오류 발생:", error);
			alert("LP 수정 중 오류가 발생했습니다.");
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!title.trim()) {
			alert("제목을 입력해주세요.");
			return;
		}

		if (!content.trim()) {
			alert("내용을 입력해주세요.");
			return;
		}

		updateLpMutation.mutate();
	};

	const handleModalClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div
			className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
			onClick={onClose}
		>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div
				className="bg-zinc-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6"
				onClick={handleModalClick}
			>
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-xl font-bold">LP 수정</h2>
					<button
						type="button"
						className="text-gray-400 hover:text-white"
						onClick={onClose}
						aria-label="닫기"
					>
						<FaTimes size={20} />
					</button>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					{/* 제목 입력 */}
					<div>
						<label htmlFor="title" className="block mb-1">
							제목
						</label>
						<input
							type="text"
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="w-full p-2 bg-zinc-700 border border-zinc-600 rounded"
							required
						/>
					</div>

					{/* 내용 입력 */}
					<div>
						<label htmlFor="content" className="block mb-1">
							내용
						</label>
						<textarea
							id="content"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							className="w-full p-2 bg-zinc-700 border border-zinc-600 rounded h-40"
							required
						/>
					</div>

					{/* 썸네일 */}
					<div>
						{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
						<label className="block mb-1">썸네일</label>
						<div className="flex items-center space-x-4">
							<div className="w-32 h-32 bg-zinc-700 border border-dashed border-zinc-600 rounded flex items-center justify-center overflow-hidden">
								{thumbnail ? (
									<img
										src={thumbnail}
										alt="썸네일 미리보기"
										className="w-full h-full object-cover"
									/>
								) : (
									<FaImage size={32} className="text-zinc-500" />
								)}
							</div>

							<div>
								<input
									type="file"
									ref={fileInputRef}
									onChange={handleFileChange}
									accept="image/*"
									className="hidden"
								/>
								<button
									type="button"
									onClick={() => fileInputRef.current?.click()}
									className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded"
								>
									이미지 선택
								</button>
							</div>
						</div>
					</div>

					{/* 저장 버튼 */}
					<div className="flex justify-end pt-4">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 mr-2 bg-zinc-600 hover:bg-zinc-500 rounded"
							disabled={updateLpMutation.isPending}
						>
							취소
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
							disabled={updateLpMutation.isPending}
						>
							{updateLpMutation.isPending ? "저장 중..." : "저장"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LpEditModal;
