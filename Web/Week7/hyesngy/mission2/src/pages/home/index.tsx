import Spinner from "@components/spinner";
import LpList from "./components/lp-list";
import ErrorFallback from "@components/error-fallback";
import { useEffect, useRef, useState } from "react";
import type { Lp, OrderType } from "@typedefs/lp";
import OrderButtons from "./components/order-buttons";
import { useInfiniteLpsQuery } from "@hooks/use-infinite-query";

const LpPage = () => {
	const [order, setOrder] = useState<OrderType>("desc");
	const loaderRef = useRef<HTMLDivElement>(null);

	const {
		data,
		isLoading,
		isError,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteLpsQuery({ order });

	const handleOrderChange = (newOrder: OrderType) => {
		setOrder(newOrder);
	};

	const lps: Lp[] = [];
	if (data?.pages) {
		for (const page of data.pages) {
			if (page.data?.data) {
				lps.push(...page.data.data);
			}
		}
	}

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

	if (isLoading) return <Spinner />;
	if (isError) return <ErrorFallback />;

	return (
		<div className="w-full flex flex-col gap-5 py-10 items-center justify-center">
			<OrderButtons currentOrder={order} onOrderChange={handleOrderChange} />
			<LpList lps={lps} isLoading={isLoading || isFetchingNextPage} />
			<div ref={loaderRef} className="w-full h-10 mt-4">
				{isFetchingNextPage && <Spinner />}
				{!hasNextPage && lps.length > 0 && (
					<p className="text-gray-400 text-center">
						더 이상 표시할 LP가 없습니다
					</p>
				)}
			</div>
		</div>
	);
};

export default LpPage;
