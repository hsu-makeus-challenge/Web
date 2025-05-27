import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadImage } from "@apis/upload/upload";
import { updateUserInfo } from "@apis/user/user";
import type { UpdateUserRequest, User } from "@typedefs/user";
import { useState, useEffect } from "react";

interface UseProfileUpdateProps {
	onSuccess: () => void;
	selectedFile: File | null;
}

export const useProfileUpdate = ({
	onSuccess,
	selectedFile,
}: UseProfileUpdateProps) => {
	const queryClient = useQueryClient();

	const updateUserMutation = useMutation({
		mutationFn: async (userData: UpdateUserRequest) => {
			// 닉네임 유효성 검사
			if (userData.name !== undefined && !userData.name.trim()) {
				throw new Error("닉네임은 공백일 수 없습니다.");
			}

			// 이미지 업로드 처리
			if (selectedFile) {
				try {
					const imageUrl = await uploadImage(selectedFile);
					userData.avatar = imageUrl;
				} catch (error) {
					console.error("파일 업로드 실패:", error);
					throw new Error("프로필 이미지 업로드에 실패했습니다.");
				}
			}

			return updateUserInfo(userData);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["userInfo"] });
			onSuccess();
		},
		onError: (error: Error) => {
			console.error("프로필 업데이트 실패:", error);
			alert(error.message || "프로필 업데이트에 실패했습니다.");
		},
	});

	return {
		updateUserMutation,
		isPending: updateUserMutation.isPending,
	};
};

export const useProfileForm = (userInfo?: User) => {
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState<UpdateUserRequest>({
		name: "",
		bio: "",
	});

	// 사용자 데이터가 로드되면 폼 데이터 초기화
	useEffect(() => {
		if (userInfo) {
			setFormData({
				name: userInfo.name,
				bio: userInfo.bio || "",
			});
		}
	}, [userInfo]);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleStartEdit = () => {
		setIsEditing(true);
	};

	const handleCancelEdit = () => {
		setIsEditing(false);
		// 폼 데이터 초기화
		if (userInfo) {
			setFormData({
				name: userInfo.name,
				bio: userInfo.bio || "",
			});
		}
	};

	// 변경된 데이터만 포함된 객체 생성
	const getChangedData = (currentUserInfo?: User): UpdateUserRequest => {
		if (!currentUserInfo) return formData;

		const updatedData: UpdateUserRequest = {};

		if (formData.name !== currentUserInfo.name)
			updatedData.name = formData.name;

		if (formData.bio !== currentUserInfo.bio) updatedData.bio = formData.bio;

		return updatedData;
	};

	return {
		isEditing,
		setIsEditing,
		formData,
		handleInputChange,
		handleStartEdit,
		handleCancelEdit,
		getChangedData,
	};
};
