import { useRef, useState, useEffect } from "react";
import { useDebounce } from "@hooks/common/use-debounce";
import { useInfiniteSearchQuery } from "@hooks/lp/use-infinite-search-query";
import type { Lp, OrderType } from "@typedefs/lp";
import LpList from "@pages/home/components/lp-list";
import Spinner from "@components/spinner";
import ErrorFallback from "@components/error-fallback";
import OrderButtons from "@pages/home/components/order-buttons";
import { FaSearch } from "react-icons/fa";

const SearchPage = () => {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [order, setOrder] = useState<OrderType>("desc");
	const loaderRef = useRef<HTMLDivElement>(null);

	const debouncedSearchTerm = useDebounce(searchTerm, 300);

	const {
		data,
		isLoading,
		isError,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteSearchQuery({
		order,
		search: debouncedSearchTerm,
		limit: 20,
	});

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [debouncedSearchTerm]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;
				if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
					fetchNextPage();
				}
			},
			{ threshold: 0.1 },
		);

		const currentLoaderRef = loaderRef.current;
		if (currentLoaderRef) {
			observer.observe(currentLoaderRef);
		}

		return () => {
			if (currentLoaderRef) {
				observer.unobserve(currentLoaderRef);
			}
		};
	}, [fetchNextPage, hasNextPage, isFetchingNextPage]);

	const handleOrderChange = (newOrder: OrderType) => {
		setOrder(newOrder);
	};

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const lps: Lp[] = [];
	if (data?.pages) {
		for (const page of data.pages) {
			if (page.data?.data) {
				lps.push(...page.data.data);
			}
		}
	}

	return (
		<div className="w-full flex flex-col gap-5 py-10 items-center justify-center">
			<div className="w-full max-w-3xl mb-6">
				<div className="relative">
					<input
						type="text"
						value={searchTerm}
						onChange={handleSearchChange}
						placeholder="LP 검색..."
						className="w-full px-4 py-3 pr-10 rounded-md bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:border-blue-500"
					/>
					<FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500" />
				</div>

				{searchTerm && searchTerm !== debouncedSearchTerm && <Spinner />}
			</div>

			<div className="w-full flex justify-end mb-4">
				<OrderButtons currentOrder={order} onOrderChange={handleOrderChange} />
			</div>

			{isLoading && !isFetchingNextPage ? (
				<Spinner />
			) : isError ? (
				<ErrorFallback />
			) : lps.length === 0 && debouncedSearchTerm ? (
				<div className="text-center text-gray-400 my-10">
					"{debouncedSearchTerm}" 검색 결과가 없습니다.
				</div>
			) : debouncedSearchTerm ? (
				<>
					<LpList lps={lps} isLoading={isFetchingNextPage} />
					<div ref={loaderRef} className="w-full h-10 mt-4">
						{isFetchingNextPage && <Spinner />}
						{!hasNextPage && lps.length > 0 && (
							<p className="text-gray-400 text-center">
								더 이상 표시할 LP가 없습니다
							</p>
						)}
					</div>
				</>
			) : (
				<div className="text-center text-gray-400 my-10">
					검색어를 입력해주세요.
				</div>
			)}
		</div>
	);
};

export default SearchPage;
