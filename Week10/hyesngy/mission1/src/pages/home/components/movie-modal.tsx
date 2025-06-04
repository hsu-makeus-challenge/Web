import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useGetMovieDetail } from "@hooks/use-movie-hooks";
import Spinner from "@components/spinner";
import ErrorFallback from "@components/error-fallback";
import MovieBanner from "@pages/movies/components/movie-banner";
import { IoClose } from "react-icons/io5";

interface MovieModalProps {
	movieId: number;
	isOpen: boolean;
	onClose: () => void;
}

const MovieModal = React.memo(
	({ movieId, isOpen, onClose }: MovieModalProps) => {
		const modalRef = useRef<HTMLDivElement>(null);

		const url = `/movie/${movieId}?append_to_response=credits&language=ko-KR`;
		const { movie, isLoading, isError } = useGetMovieDetail(
			isOpen ? url : undefined,
		);

		const handleBackdropClick = React.useCallback(
			(e: React.MouseEvent) => {
				if (e.target === e.currentTarget) {
					onClose();
				}
			},
			[onClose],
		);

		const handleKeyDown = React.useCallback(
			(e: KeyboardEvent) => {
				if (e.key === "Escape") {
					onClose();
				}
			},
			[onClose],
		);

		useEffect(() => {
			if (isOpen) {
				document.addEventListener("keydown", handleKeyDown);
				document.body.style.overflow = "hidden";
			}

			return () => {
				document.removeEventListener("keydown", handleKeyDown);
				document.body.style.overflow = "unset";
			};
		}, [isOpen, handleKeyDown]);

		if (!isOpen) return null;

		const modalContent = (
			// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
			<div
				className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
				onClick={handleBackdropClick}
			>
				{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
				<div
					ref={modalRef}
					className="relative bg-neutral-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
					onClick={(e) => e.stopPropagation()}
				>
					<button
						type="button"
						onClick={onClose}
						className="absolute top-4 right-4 z-10 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
					>
						<IoClose size={24} className="text-white" />
					</button>

					{isLoading && (
						<div className="flex items-center justify-center h-96">
							<Spinner />
						</div>
					)}

					{isError && (
						<div className="flex items-center justify-center h-96">
							<ErrorFallback />
						</div>
					)}

					{movie && !isLoading && !isError && (
						<div className="text-white">
							<MovieBanner movie={movie} />
						</div>
					)}
				</div>
			</div>
		);

		return createPortal(modalContent, document.body);
	},
);

MovieModal.displayName = "MovieModal";

export default MovieModal;
