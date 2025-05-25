const LpVinylSvg = ({
  onClick,
  thumbnailPreview,
}: {
  onClick?: () => void;
  thumbnailPreview?: string;
}) => {
  return (
    <div className="relative group">
      <svg
        width="160"
        height="160"
        viewBox="0 0 160 160"
        className="mb-6 mt-2 select-none cursor-pointer transition-transform duration-300 group-hover:scale-105"
        onClick={onClick}
        aria-label="클릭하여 앨범 커버 이미지 업로드"
      >
        <defs>
          <clipPath id="lpCircle">
            <circle cx="80" cy="80" r="65" />
          </clipPath>
        </defs>

        {thumbnailPreview ? (
          <>
            <image
              href={thumbnailPreview}
              width="130"
              height="130"
              x="15"
              y="15"
              clipPath="url(#lpCircle)"
            />
            <circle
              cx="80"
              cy="80"
              r="65"
              fill="none"
              stroke="#1a1a1a"
              strokeWidth="2"
            />
            <circle cx="80" cy="80" r="10" fill="#333333" />
            <circle cx="80" cy="80" r="5" fill="#1a1a1a" />
          </>
        ) : (
          <>
            <circle cx="80" cy="80" r="65" fill="#1a1a1a" />
            <circle cx="80" cy="80" r="60" fill="#333333" />
            <circle cx="80" cy="80" r="55" fill="#1a1a1a" />
            <circle cx="80" cy="80" r="50" fill="#333333" />
            <circle cx="80" cy="80" r="45" fill="#1a1a1a" />
            <circle cx="80" cy="80" r="10" fill="#333333" />
            <circle cx="80" cy="80" r="5" fill="#1a1a1a" />
          </>
        )}
      </svg>
      <div className="absolute top-[45%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-xs bg-black/70 px-2 py-1 rounded pointer-events-none">
        {thumbnailPreview ? '변경' : '업로드'}
      </div>
    </div>
  );
};

export default LpVinylSvg;
