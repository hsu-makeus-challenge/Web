interface TagBtnProps {
  searchType: string;
  handleClick: () => void;
}

const TagBtn = ({ searchType, handleClick }: TagBtnProps) => {
  return (
    <>
      <button
        className={`flex-1 p-2 rounded-md transition-colors ${
          searchType === 'title'
            ? 'bg-lime-700 text-white'
            : 'bg-lime-100 text-lime-700 hover:bg-lime-200'
        }`}
        onClick={handleClick}
      >
        제목 검색
      </button>
      <button
        className={`flex-1 p-2 rounded-md transition-colors ${
          searchType === 'tag'
            ? 'bg-lime-700 text-white'
            : 'bg-lime-100 text-lime-700 hover:bg-lime-200'
        }`}
        onClick={handleClick}
      >
        태그 검색
      </button>
    </>
  );
};
export default TagBtn;
