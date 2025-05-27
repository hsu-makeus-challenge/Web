import { useEffect, useState } from "react";
import useDebounce from "../../hooks/state/useDebounce";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    onSearch: (keyword: string) => void;
}

const SearchInput = ({ value, onChange, onSearch }: SearchInputProps) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(value); // 상위로 전달
        //console.log(inputValue);
    };

    return (
        <form onSubmit={handleSubmit}
            className="w-full flex justify-center items-center gap-2 mt-30 mb-10">
            <input type="text"
                className="input w-90 border-2 border-gray-300 rounded-lg px-3 py-2 w-full"
                placeholder="검색할 내용을 입력하세요."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <button type="submit"
                className="bg-white w-[200px] text-black rounded-lg px-3 py-2 hover:bg-cyan-100 transition duration-300"
            >검색</button>
        </form>


    )
}

export default SearchInput;