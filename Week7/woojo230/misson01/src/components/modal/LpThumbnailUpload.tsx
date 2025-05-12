interface LpThumbnailUploadProps {
  thumbnailPreview: string;
  onThumbnailButtonClick: () => void;
  onThumbnailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const LpThumbnailUpload = ({
  thumbnailPreview,
  onThumbnailButtonClick,
  onThumbnailChange,
  fileInputRef,
}: LpThumbnailUploadProps) => {
  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={onThumbnailButtonClick}
        className="px-4 py-2 bg-[#44454b] text-gray-200 rounded-md hover:bg-[#5a5b60] transition-colors duration-200 text-sm font-medium cursor-pointer w-full"
      >
        썸네일 업로드
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={onThumbnailChange}
      />
      {thumbnailPreview && (
        <img
          src={thumbnailPreview}
          alt="썸네일 미리보기"
          className="w-full h-32 object-cover rounded-md border border-[#44454b] mt-2"
        />
      )}
    </div>
  );
};

export default LpThumbnailUpload;
