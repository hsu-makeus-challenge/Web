import { useState } from "react";
import type { Comment } from "@typedefs/comment";

export const useCommentEdit = (comment: Comment) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editContent, setEditContent] = useState(comment.content);

	const startEditing = () => {
		setIsEditing(true);
		setEditContent(comment.content);
	};

	const cancelEditing = () => {
		setIsEditing(false);
		setEditContent(comment.content);
	};

	const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setEditContent(e.target.value);
	};

	const validateContent = (): boolean => {
		if (editContent.trim() === "") {
			alert("댓글 내용을 입력해주세요.");
			return false;
		}

		if (editContent === comment.content) {
			setIsEditing(false);
			return false;
		}

		return true;
	};

	return {
		isEditing,
		editContent,
		startEditing,
		cancelEditing,
		handleContentChange,
		validateContent,
		setIsEditing,
	};
};
