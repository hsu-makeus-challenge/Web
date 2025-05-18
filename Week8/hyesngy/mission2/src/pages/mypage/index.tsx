import ErrorFallback from "@components/error-fallback";
import Spinner from "@components/spinner";
import { FaPen, FaUserCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { useUserInfo } from "@hooks/user/use-user-info";
import { useProfileImage } from "@hooks/user/use-profile-image";
import { useProfileForm } from "@hooks/user/use-profile-form";
import { useProfileUpdate } from "@hooks/user/use-profile-update";

const MyPage = () => {
	const { data, isLoading, isError } = useUserInfo();
	const userInfo = data?.data;

	const {
		fileInputRef,
		previewImage,
		selectedFile,
		handleProfileClick,
		handleFileChange,
		resetImage,
	} = useProfileImage();

	const {
		isEditing,
		setIsEditing,
		formData,
		handleInputChange,
		handleStartEdit,
		handleCancelEdit,
		getChangedData,
	} = useProfileForm(userInfo);

	const { updateUserMutation, isPending } = useProfileUpdate({
		onSuccess: () => {
			setIsEditing(false);
			resetImage();
		},
		selectedFile,
	});

	const handleSettingsClick = () => {
		if (isEditing) {
			const updatedData = getChangedData(userInfo);

			if (selectedFile) {
				updatedData.avatar = "pending-upload";
			}

			if (Object.keys(updatedData).length > 0 || selectedFile) {
				updateUserMutation.mutate(updatedData);
			} else {
				setIsEditing(false);
			}
		} else {
			handleStartEdit();
		}
	};

	if (isLoading) return <Spinner />;
	if (isError || !userInfo) return <ErrorFallback />;

	return (
		<div className="w-full h-full flex flex-col p-10">
			<div className="flex flex-row gap-5 justify-center items-center">
				{/* 프로필 이미지 영역 */}
				{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
				<div
					className={`${isEditing ? "cursor-pointer" : ""} relative`}
					onClick={() => handleProfileClick(isEditing)}
					title={isEditing ? "클릭하여 이미지 변경" : ""}
				>
					{previewImage ? (
						<img
							src={previewImage}
							alt="프로필 미리보기"
							className="w-24 h-24 rounded-full border object-cover"
						/>
					) : userInfo.avatar ? (
						<img
							src={userInfo.avatar}
							alt="프로필"
							className="w-24 h-24 rounded-full border object-cover"
						/>
					) : (
						<FaUserCircle size={96} />
					)}

					{isEditing && (
						<div className="group absolute inset-0 flex items-center justify-center rounded-full hover:bg-black/90 transition-all">
							<FaPen className="group-hover:block hidden" />
						</div>
					)}

					<input
						type="file"
						ref={fileInputRef}
						onChange={handleFileChange}
						accept="image/*"
						className="hidden"
					/>
				</div>

				{/* 프로필 정보 영역 */}
				<div className="flex flex-col gap-1 justify-center w-60">
					<div className="flex flex-row justify-between">
						{isEditing ? (
							<input
								type="text"
								name="name"
								value={formData.name}
								onChange={handleInputChange}
								className="text-2xl bg-transparent border border-gray-500 focus:outline-none focus:border-white w-40"
								required
								minLength={1}
							/>
						) : (
							<p className="text-2xl">{userInfo.name}</p>
						)}
						<button
							type="button"
							onClick={handleSettingsClick}
							disabled={isPending}
						>
							<IoMdSettings
								size={20}
								className={`cursor-pointer hover:text-gray-300 ${
									isPending ? "opacity-50" : ""
								}`}
							/>
						</button>
					</div>

					{isEditing ? (
						<input
							type="text"
							name="bio"
							value={formData.bio}
							onChange={handleInputChange}
							className="text-sm text-gray-300 bg-transparent border border-gray-500 focus:outline-none focus:border-white p-1 mt-1"
						/>
					) : (
						<p className="text-sm text-gray-300">
							{userInfo.bio ? userInfo.bio : "설명이 없습니다."}
						</p>
					)}

					<p className="text-sm text-gray-300">{userInfo.email}</p>

					{isEditing && (
						<div className="flex justify-end mt-2">
							<button
								type="button"
								onClick={handleCancelEdit}
								className="text-sm text-gray-400 mr-3 hover:text-white"
								disabled={isPending}
							>
								취소
							</button>
							<button
								type="button"
								onClick={handleSettingsClick}
								className="text-sm text-blue-400 hover:text-blue-300"
								disabled={isPending}
							>
								{isPending ? "저장 중..." : "저장"}
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default MyPage;
