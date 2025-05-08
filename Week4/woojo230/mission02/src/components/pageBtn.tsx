import React, { useState } from 'react';

interface PageBtnProps {
  page: number;
  pageNext: () => void;
  pagePrev: () => void;
}

const PageBtn = ({ page, pageNext, pagePrev }: PageBtnProps) => {
  return (
    <div className="flex justify-center items-center space-x-4 align-middle">
      <button
        onClick={pagePrev}
        className="bg-lime-500 text-white shadow-md px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
        disabled={page === 1}
      >
        ←
      </button>
      <p className="text-lg">{page} 페이지</p>
      <button
        onClick={pageNext}
        className="bg-lime-500 text-white shadow-md px-4 py-2 rounded cursor-pointer"
      >
        →
      </button>
    </div>
  );
};

export default PageBtn;
