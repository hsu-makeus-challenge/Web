import ErrorFallback from "@components/error-fallback";
import Spinner from "@components/spinner";
import { useGetLpDetail } from "@hooks/use-lp-datail";
import { useParams } from "react-router-dom";
import LpHeader from "./components/lp-header";
import LpCover from "./components/lp-cover";
import LpContents from "./components/lp-contents";
import CommentSection from "./components/comment-section";

const LpDeatilPage = () => {
	const { lpId } = useParams<{ lpId: string }>();
	const { lp, isLoading, isError } = useGetLpDetail(lpId);

	if (isLoading) return <Spinner />;
	if (isError || !lp) return <ErrorFallback />;

	return (
		<div className="w-full h-full flex items-center justify-center">
			<div className="w-3xl bg-zinc-700 py-10 px-20 gap-10 m-5 rounded-3xl flex flex-col justify-center items-center">
				<LpHeader
					title={lp.title}
					authorName={lp.author?.name}
					authorAvatar={lp.author?.avatar}
					createdAt={lp.createdAt}
				/>
				<LpCover thumbnail={lp.thumbnail} title={lp.title} />
				<LpContents content={lp.content} likes={lp.likes} tags={lp.tags} />

				<CommentSection lpId={lp.id} />

			</div>
		</div>
	);
};

export default LpDeatilPage;
