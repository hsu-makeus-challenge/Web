import { FaFilm } from "react-icons/fa";
import { GrSettingsOption } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa";
import { useState } from "react";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    onSearch: (
        keyword: string,
        options: { language: string; includeAdult: boolean }) => void;
}

const SearchComp = ({ value, onChange, onSearch }: SearchInputProps) => {
    const [language, setLanguage] = useState("ko-KR");
    const [includeAdult, setIncludeAdult] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(value, { language, includeAdult });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="box-border w-[80%] m-[20px] flex flex-col bg-white shadow-md rounded-lg p-4">
            <div className="flex flex-col justify-between gap-4">

                <div className="flex flex-row items-center justify-between gap-10">
                    <div className="flex-1">
                        <label className="flex items-center gap-2 text-sm font-semibold mb-1">
                            <FaFilm />
                            영화 제목
                        </label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="제목을 입력하세요"
                            value={value}
                            onChange={(e) => onChange(e.target.value)}
                        />
                    </div>

                    <div className="flex-1">
                        <label className="flex items-center gap-2 text-sm font-semibold mb-1">
                            <GrSettingsOption />
                            옵션
                        </label>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="adult"
                                checked={includeAdult}
                                onChange={(e) => setIncludeAdult(e.target.checked)}
                            />
                            <label htmlFor="adult" className="text-sm">
                                성인 콘텐츠 표시
                            </label>
                        </div>
                    </div>
                </div>



                <div>
                    <label className="flex items-center gap-2 text-sm font-semibold mb-1">
                        <FaGlobe />
                        언어
                    </label>
                    <select
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >

                        <option value="ko">한국어</option>
                        <option value="en">영어</option>
                        <option value="ja">일본어</option>
                    </select>
                </div>

                {/* 검색 버튼 */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 shadow-md flex items-center justify-center gap-2">
                    <FaSearch />
                    검색하기
                </button>
            </div>
        </form>

    )
}

export default SearchComp