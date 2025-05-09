import React from "react";

interface PaginationButtonProps {
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const PaginationButton = ({ disabled, onClick, children }: PaginationButtonProps) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-[1vw] py-[0.5vw] flex items-center justify-center rounded-[0.2vw] font-bold text-[1vw] ${
                disabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-purple-300 text-white hover:bg-green-200"
            }`}
        >
            {children}
        </button>
    );
};

export default PaginationButton;
