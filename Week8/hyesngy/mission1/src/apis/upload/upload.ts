import { axiosInstance } from "@apis/config/instance";

interface UploadImageResponse {
	status: boolean;
	message: string;
	statusCode: number;
	data: {
		imageUrl: string;
	};
}

export const uploadImage = async (file: File): Promise<string> => {
	try {
		const formData = new FormData();
		formData.append("file", file);

		const response = await axiosInstance.post<UploadImageResponse>(
			"uploads",
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			},
		);

		return response.data.data.imageUrl;
	} catch (error) {
		console.log("🚀 ~ uploadImage ~ error:", error);
		throw error;
	}
};
