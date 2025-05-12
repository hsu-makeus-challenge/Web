import { useState, useEffect } from "react";
import { uploadImage } from "@apis/upload/upload";

export const useImageUpload = (initialPreview?: string | null) => {
	const [isUploading, setIsUploading] = useState(false);
	const [previewImage, setPreviewImage] = useState<string | null>(
		initialPreview || null,
	);
	const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

	useEffect(() => {
		setPreviewImage(initialPreview || null);
	}, [initialPreview]);

	const createPreview = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => {
				if (typeof reader.result === "string") {
					resolve(reader.result);
				} else {
					reject(new Error("Failed to create preview"));
				}
			};
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	};

	const uploadImageToServer = async (file: File): Promise<string> => {
		try {
			setIsUploading(true);
			return await uploadImage(file);
		} finally {
			setIsUploading(false);
		}
	};

	const handleFileUpload = async (file: File): Promise<string> => {
		if (!file) throw new Error("No file provided");

		try {
			setIsUploading(true);

			const preview = await createPreview(file);
			setPreviewImage(preview);

			const imageUrl = await uploadImageToServer(file);
			setUploadedImageUrl(imageUrl);

			return imageUrl;
		} catch (error) {
			console.error("이미지 처리 실패:", error);
			throw error;
		} finally {
			setIsUploading(false);
		}
	};

	const reset = () => {
		setPreviewImage(initialPreview || null);
		setUploadedImageUrl(null);
		setIsUploading(false);
	};

	return {
		isUploading,
		previewImage,
		uploadedImageUrl,
		handleFileUpload,
		createPreview,
		uploadImageToServer,
		reset,
	};
};
