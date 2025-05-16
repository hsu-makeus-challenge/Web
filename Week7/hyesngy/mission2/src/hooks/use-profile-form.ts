import { useState, useEffect } from "react";
import type { UpdateUserRequest } from "@typedefs/user";
import type { User } from "@typedefs/user";

export const useProfileForm = (userInfo?: User) => {
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState<UpdateUserRequest>({
		name: "",
		bio: "",
	});

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
		if (userInfo) {
			setFormData({
				name: userInfo.name,
				bio: userInfo.bio || "",
			});
		}
	};

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
