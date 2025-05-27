import PaginationButton from "./paginationButton";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    return (
        <div className="flex justify-center items-center gap-[1.5vw]">
            <PaginationButton
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                {'<'}
            </PaginationButton>

            <p className="text-[1vw] font-medium">{currentPage} 페이지</p>

            <PaginationButton
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                {'>'}
            </PaginationButton>
        </div>
    );
};

export default Pagination;
