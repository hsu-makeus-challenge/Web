import { useRef } from "react";
import LpImg from "@assets/lp-img.webp";
import Spinner from "@components/spinner";
import { useImageUpload } from "@hooks/common/use-image-upload";

interface LpImageUploaderProps {
	onImageUpload: (imageUrl: string, preview: string | null) => void;
	initialPreview?: string | null;
	previewImage?: string | null;
	isUploading?: boolean;
	onUploadingChange?: (uploading: boolean) => void;
}

const LpImageUploader = ({
	onImageUpload,
	initialPreview = null,
}: LpImageUploaderProps) => {
	const { isUploading, previewImage, handleFileUpload } =
		useImageUpload(initialPreview);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleImageClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		try {
			const imageUrl = await handleFileUpload(file);

			if (previewImage) {
				onImageUpload(imageUrl, previewImage);
			}
		} catch (error) {
			console.error("이미지 처리 실패:", error);
			alert("이미지 업로드에 실패했습니다.");
		}
	};

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div
			className="relative cursor-pointer hover:opacity-80"
			onClick={handleImageClick}
		>
			{previewImage ? (
				<div className="flex justify-center items-center">
					<img
						src={previewImage}
						alt="LP preview"
						className="z-10 w-48 h-48 object-cover absolute -left-22"
					/>
					<img src={LpImg} alt="LP" className="w-56" />
				</div>
			) : (
				<img src={LpImg} alt="LP" className="w-56 shadow-sm" />
			)}

			{isUploading && <Spinner />}

			<input
				type="file"
				ref={fileInputRef}
				onChange={handleFileChange}
				accept="image/*"
				className="hidden"
			/>
		</div>
	);
};

export default LpImageUploader;
