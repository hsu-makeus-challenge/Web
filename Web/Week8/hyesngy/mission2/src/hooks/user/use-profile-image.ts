import { useState, useRef } from "react";

export const useProfileImage = (initialAvatar?: string | null) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [previewImage, setPreviewImage] = useState<string | null>(
		initialAvatar || null,
	);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const handleProfileClick = (isEditing: boolean) => {
		if (isEditing && fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setSelectedFile(file);

			const reader = new FileReader();
			reader.onloadend = () => {
				setPreviewImage(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const resetImage = () => {
		setSelectedFile(null);
		setPreviewImage(null);
	};

	return {
		fileInputRef,
		previewImage,
		selectedFile,
		handleProfileClick,
		handleFileChange,
		resetImage,
	};
};
