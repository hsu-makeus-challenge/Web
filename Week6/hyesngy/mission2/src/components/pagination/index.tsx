import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

interface PaginationProps {
	page: number;
	setPage: (page: number | ((prev: number) => number)) => void;
}

const Pagination = ({ page, setPage }: PaginationProps) => {
	const handlePrevPage = () => {
		setPage((prev: number) => prev - 1);
	};

	const handleNextPage = () => {
		setPage((prev: number) => prev + 1);
	};

	return (
		<div className="flex gap-3 my-4">
			<button
				type="button"
				onClick={handlePrevPage}
				disabled={page === 1}
				className={page === 1 ? "hidden" : "block cursor-pointer"}
			>
				<SlArrowLeft />
			</button>
			<span>{page} 페이지</span>
			<button type="button" onClick={handleNextPage} className="cursor-pointer">
				<SlArrowRight />
			</button>
		</div>
	);
};

export default Pagination;
