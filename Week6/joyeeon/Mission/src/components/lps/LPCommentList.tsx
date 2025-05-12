import { useLpComments } from "../../hooks/UseLpCommentFetch";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import CommentItem from "./CommentItem";
import SkeletonComp from "../state/Skeleton";

interface LpCommentListProps {
    lpId: number;
}

const LpCommentList = ({ lpId }: LpCommentListProps) => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
    } = useLpComments({ lpId });

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (isLoading) return <div>로딩 중...</div>;
    if (error) return <div>에러 발생: {String(error)}</div>;

    const comments = data?.pages.flatMap((page) => page.items) ?? [];

    return (
        <>
            <ul className="flex flex-col gap-4">
                {comments.map((comment) => (
                    <CommentItem key={comment.id} comment={comment} />
                ))}

                {isFetchingNextPage &&
                    Array.from({ length: 3 }).map((_, index) => (
                        <li key={`skeleton-${index}`} className="p-2 rounded-md bg-gray-300">
                            <SkeletonComp viewBox="0 0 400 60" height={60}>
                                <rect x="0" y="0" rx="4" ry="4" width="120" height="12" />
                                <rect x="0" y="20" rx="4" ry="4" width="300" height="10" />
                                <rect x="0" y="40" rx="4" ry="4" width="250" height="10" />
                            </SkeletonComp>
                        </li>
                    ))}
            </ul>


            <div ref={ref} className="h-6" />
        </>
    );
};

export default LpCommentList;