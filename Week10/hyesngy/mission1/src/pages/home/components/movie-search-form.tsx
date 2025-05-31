import React, { useState } from "react";

interface SearchFormData {
	query: string;
	includeAdult: boolean;
	language: string;
}

interface MovieSearchFormProps {
	onSearch: (searchData: SearchFormData) => void;
	isLoading?: boolean;
}

const MovieSearchForm = React.memo(
	({ onSearch, isLoading = false }: MovieSearchFormProps) => {
		const [formData, setFormData] = useState<SearchFormData>({
			query: "",
			includeAdult: false,
			language: "ko-KR",
		});

		const handleInputChange = React.useCallback(
			(field: keyof SearchFormData) => {
				return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
					const value =
						e.target.type === "checkbox"
							? (e.target as HTMLInputElement).checked
							: e.target.value;

					setFormData((prev) => ({
						...prev,
						[field]: value,
					}));
				};
			},
			[],
		);

		const handleSubmit = React.useCallback(
			(e: React.FormEvent) => {
				e.preventDefault();
				if (formData.query.trim()) {
					onSearch(formData);
				}
			},
			[formData, onSearch],
		);

		return (
			<form
				onSubmit={handleSubmit}
				className="w-4xl p-6 bg-white border rounded-2xl shadow flex flex-col items-center mb-8 gap-4"
			>
				<div className="flex flex-row w-full gap-4">
					<div className="flex flex-col flex-1 text-center text-black gap-2">
						<label htmlFor="movie-title">🎬 영화 제목</label>
						<input
							id="movie-title"
							type="text"
							placeholder="영화 제목을 입력하세요"
							value={formData.query}
							onChange={handleInputChange("query")}
							className="border border-gray-300 rounded p-2 w-full"
							disabled={isLoading}
						/>
					</div>

					<div className="flex flex-col flex-1 text-center text-black gap-2">
						{/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
						<label>⚙️ 옵션</label>
						<div className="flex flex-row gap-2 w-full border border-gray-300 rounded p-2">
							<input
								type="checkbox"
								id="adult-content"
								checked={formData.includeAdult}
								onChange={handleInputChange("includeAdult")}
								disabled={isLoading}
							/>
							<label htmlFor="adult-content">성인 콘텐츠 표시</label>
						</div>
					</div>
				</div>

				<div className="flex flex-col text-black text-center w-full gap-2">
					<label htmlFor="language">🌐 언어</label>
					<select
						id="language"
						value={formData.language}
						onChange={handleInputChange("language")}
						className="border border-gray-300 rounded p-2 w-full"
						disabled={isLoading}
					>
						<option value="ko-KR">한국어</option>
						<option value="en-US">영어</option>
						<option value="ja-JP">일본어</option>
					</select>
				</div>

				<button
					type="submit"
					disabled={!formData.query.trim() || isLoading}
					className="bg-red-600 text-white rounded p-2 mt-4 w-full hover:bg-red-700 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
				>
					{isLoading ? "검색 중..." : "🔍 검색하기"}
				</button>
			</form>
		);
	},
);

MovieSearchForm.displayName = "MovieSearchForm";

export default MovieSearchForm;
