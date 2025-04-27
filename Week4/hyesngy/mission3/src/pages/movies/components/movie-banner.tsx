import ErrorFallback from "@components/error-fallback";
import Spinner from "@components/spinner";
import { useFetch } from "@hooks/use-fetch";
import type { Movie, VideoResponse } from "@typedefs/movie";
import { useRef, useState } from "react";

const MovieBanner = ({ movie }: { movie: Movie }) => {
	const {
		id,
		backdrop_path,
		title,
		vote_average,
		vote_count,
		release_date,
		runtime,
		overview,
	} = movie;

	const [isOpen, setIsOpen] = useState(false);
	const [showTrailer, setShowTrailer] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);

	const { data, isLoading, isError } = useFetch<VideoResponse>(
		showTrailer ? `/movie/${id}/videos?language=ko-KR` : undefined,
	);

	const trailer = data?.results?.find(
		(video) => video.type === "Trailer" && video.site === "YouTube",
	);

	const handleOpenTrailer = () => {
		setIsOpen(true);
		setShowTrailer(true);
	};

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			setIsOpen(false);
		}
	};

	return (
		<div className="relative w-full">
			<img
				src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
				alt={title}
				className="w-full h-[30rem] object-cover"
			/>
			<div className="absolute inset-0 flex flex-col px-10 py-30 gap-2 bg-black/50">
				<h1 className="text-3xl font-bold mb-5">{title}</h1>
				<p>
					평점 {vote_average}
					{Array.from({ length: Math.floor(vote_average) }, (_, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<span key={i}>⭐</span>
					))}
					({vote_count}건)
				</p>
				<p>{release_date}</p>
				<p>{runtime} 분</p>
				<p className="max-lg:hidden">{overview}</p>
				<button
					type="button"
					onClick={handleOpenTrailer}
					className="w-fit bg-red-500 text-white px-4 py-2 rounded mt-4 cursor-pointer hover:bg-red-700 transition duration-200"
				>
					예고편보기
				</button>
			</div>

			{isOpen && (
				// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
				<div
					className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
					onClick={handleBackdropClick}
				>
					<div ref={modalRef} className="relative rounded-lg max-w-3xl w-full">
						<div className="w-full h-[500px] flex items-center justify-center">
							{isLoading && <Spinner />}
							{isError && (
								<div className="scale-75 transform-origin-center">
									<ErrorFallback />
								</div>
							)}
							{!isLoading && !isError && trailer && (
								<iframe
									className="w-full h-full"
									src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
									title="YouTube video player"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								/>
							)}
							{!isLoading && !isError && !trailer && (
								<p className="text-center text-lg text-white">
									예고편이 없습니다.
								</p>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default MovieBanner;
