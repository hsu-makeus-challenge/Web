import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import type { CreateLpRequest } from "@typedefs/lp";

interface LpFormProps {
	formState: CreateLpRequest;
	onFormChange: (updatedForm: Partial<CreateLpRequest>) => void;
}

const LpForm = ({ formState, onFormChange }: LpFormProps) => {
	const [currentTag, setCurrentTag] = useState("");

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		onFormChange({ [name]: value });
	};

	const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentTag(e.target.value);
	};

	const handleAddTag = () => {
		if (currentTag.trim() && !formState.tags.includes(currentTag.trim())) {
			onFormChange({
				tags: [...formState.tags, currentTag.trim()],
			});
			setCurrentTag("");
		}
	};

	const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleAddTag();
		}
	};

	const handleRemoveTag = (tagToRemove: string) => {
		onFormChange({
			tags: formState.tags.filter((tag) => tag !== tagToRemove),
		});
	};

	return (
		<div className="flex flex-col w-full gap-4">
			<input
				type="text"
				name="title"
				value={formState.title}
				onChange={handleInputChange}
				className="w-full h-10 rounded bg-neutral-800 text-white border border-gray-500 focus:outline-none focus:border-white p-2"
				placeholder="LP Name"
			/>

			<input
				type="text"
				name="content"
				value={formState.content}
				onChange={handleInputChange}
				className="w-full h-10 rounded bg-neutral-800 text-white border border-gray-500 focus:outline-none focus:border-white p-2"
				placeholder="LP Content"
			/>

			<div className="flex flex-row gap-2 items-center">
				<input
					type="text"
					value={currentTag}
					onChange={handleTagChange}
					onKeyDown={handleTagKeyDown}
					className="flex-4 flex h-10 rounded bg-neutral-800 text-white border border-gray-500 focus:outline-none focus:border-white p-2"
					placeholder="LP Tag"
				/>
				<button
					type="button"
					onClick={handleAddTag}
					className="flex-1 flex h-10 bg-red-800 rounded hover:opacity-80 transition-colors w-full justify-center items-center"
				>
					Add
				</button>
			</div>

			{formState.tags.length > 0 && (
				<div className="flex flex-wrap gap-2 mt-2">
					{formState.tags.map((tag, index) => (
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={index}
							className="flex items-center border rounded-full px-3 py-1"
						>
							<span className="text-sm mr-2">{tag}</span>
							<button
								type="button"
								onClick={() => handleRemoveTag(tag)}
								className="text-gray-400 hover:text-white"
							>
								<FaTimes size={12} />
							</button>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default LpForm;
