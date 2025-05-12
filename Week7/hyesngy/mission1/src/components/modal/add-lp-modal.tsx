import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLp } from "@apis/lp/lp";
import type { CreateLpRequest } from "@typedefs/lp";
import LpForm from "@components/form/lp-form";
import LpImageUploader from "@components/form/lp-image-uploader";

interface AddLpModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const AddLpModal = ({ isOpen, onClose }: AddLpModalProps) => {
	const queryClient = useQueryClient();
	const [formState, setFormState] = useState<CreateLpRequest>({
		title: "",
		content: "",
		thumbnail: "",
		tags: [],
		published: true,
	});
	const [isUploading, setIsUploading] = useState(false);
	const [previewImage, setPreviewImage] = useState<string | null>(null);

	useEffect(() => {
		if (isOpen) {
			setFormState({
				title: "",
				content: "",
				thumbnail: "",
				tags: [],
				published: true,
			});
			setPreviewImage(null);
		}
	}, [isOpen]);

	const createLpMutation = useMutation({
		mutationFn: createLp,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["lps"] });
			alert("LP가 성공적으로 등록되었습니다.");
			onClose();
		},
		onError: (error) => {
			console.error("LP 등록 실패:", error);
			alert("LP 등록에 실패했습니다.");
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		createLpMutation.mutate(formState);
	};

	const handleImageUpload = (imageUrl: string, preview: string | null) => {
		setFormState((prev) => ({
			...prev,
			thumbnail: imageUrl,
		}));
		setPreviewImage(preview);
	};

	const handleUploadingState = (uploading: boolean) => {
		setIsUploading(uploading);
	};

	const handleFormChange = (updatedForm: Partial<CreateLpRequest>) => {
		setFormState((prev) => ({
			...prev,
			...updatedForm,
		}));
	};

	const isSubmitDisabled =
		!formState.title.trim() ||
		!formState.content.trim() ||
		!formState.thumbnail ||
		isUploading;

	if (!isOpen) return null;

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div
			className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50"
			onClick={onClose}
		>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div
				className="bg-zinc-800 rounded-lg px-6 w-full max-w-md relative py-12 items-center justify-center flex flex-col gap-5"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					type="button"
					className="absolute right-4 top-4 text-gray-400 hover:text-white"
					onClick={onClose}
				>
					<IoMdClose size={24} />
				</button>

				<LpImageUploader
					previewImage={previewImage}
					isUploading={isUploading}
					onImageUpload={handleImageUpload}
					onUploadingChange={handleUploadingState}
				/>

				<LpForm formState={formState} onFormChange={handleFormChange} />

				<button
					type="button"
					onClick={handleSubmit}
					disabled={isSubmitDisabled}
					className={`w-full h-10 rounded hover:opacity-80 transition-colors mt-4 ${
						isSubmitDisabled ? "bg-gray-600 cursor-not-allowed" : "bg-red-800"
					}`}
				>
					{createLpMutation.isPending ? "추가 중..." : "Add LP"}
				</button>
			</div>
		</div>
	);
};

export default AddLpModal;
