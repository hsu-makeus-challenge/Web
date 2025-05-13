import Spinner from "@components/spinner";
import LpList from "./components/lp-list";
import ErrorFallback from "@components/error-fallback";
import { useState } from "react";
import type { OrderType } from "@typedefs/lp";
import { useLpsQuery } from "@hooks/use-query";
import OrderButtons from "./components/order-buttons";

const LpPage = () => {
	const [order, setOrder] = useState<OrderType>("desc");
	const { data, isLoading, isError } = useLpsQuery({ order });

	const handleOrderChange = (newOrder: OrderType) => {
		setOrder(newOrder);
	};

	const lps = data?.data?.data || [];
	if (isLoading) return <Spinner />;
	if (isError) return <ErrorFallback />;

	return (
		<div className="w-full h-full flex flex-col gap-5 py-10 items-center justify-center">
			<OrderButtons currentOrder={order} onOrderChange={handleOrderChange} />
			<LpList lps={lps} />
		</div>
	);
};

export default LpPage;
