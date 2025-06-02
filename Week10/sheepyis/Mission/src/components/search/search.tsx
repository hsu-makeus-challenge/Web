import React, { useState } from "react";
import type { MovieSearchParams } from "../../types/movie";

interface SearchProps {
    onSearch: (params: MovieSearchParams) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const [includeAdult, setIncludeAdult] = useState(false);
    const [language, setLanguage] = useState("ko");

    const handleSubmit = () => {
        if (!query.trim()) {
            alert("검색어를 입력하세요.");
            return;
        }

        onSearch({ query, include_adult: includeAdult, language });
    };

    return (
        <div className="w-[80%] p-[2vw] border-black border-[0.1vw] rounded-md flex flex-col gap-[2vw] m-[2vw]">
            <div className="grid grid-cols-2 gap-[1vw]">
                <div className="flex flex-col items-center gap-[1vw] w-full">
                    <p className="text-[1vw] font-bold">영화 제목</p>
                    <input className="w-full h-[2.5vw] border-[0.1vw] border-black text-[1vw] px-[1vw]" placeholder="영화 제목을 입력하세요." value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
                <div className="flex flex-col items-center w-full gap-[1vw]">
                    <p className="text-[1vw] font-bold">옵션</p>
                    <label className="w-full h-[2.5vw] border-[0.1vw] border-black text-[1vw] px-[1vw] flex items-center gap-[0.5vw]">
                        <input type="checkbox" className="w-[1vw] h-[1vw] cursor-pointer" checked={includeAdult} onChange={(e) => setIncludeAdult(e.target.checked)} />
                        성인 콘텐츠 표시
                    </label>
                </div>
            </div>

            <div className="flex flex-col items-center gap-[1vw] w-full">
                <p className="text-[1vw] font-bold">언어</p>
                <select className="w-full h-[2.5vw] border-[0.1vw] border-black text-[1vw] px-[1vw]" value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="ko">한국어</option>
                    <option value="en-US">영어</option>
                    <option value="ja">일본어</option>
                </select>
            </div>

            <button className="w-full h-[3vw] bg-blue-600 text-white text-[1vw] font-bold rounded-md cursor-pointer" onClick={handleSubmit}>검색하기</button>
        </div>
    );
};

export default React.memo(Search);
