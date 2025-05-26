interface SearchFormProps {
  inputRef: React.RefObject<HTMLInputElement>;
  searchType: string;
  search: string;
  setSearch: (value: string) => void;
}

const SearchForm = ({
  inputRef,
  searchType,
  search,
  setSearch,
}: SearchFormProps) => {
  return (
    <input
      ref={inputRef}
      placeholder={`${searchType === 'title' ? '제목' : '태그'}으로 검색`}
      className="w-full p-2 border-2 border-lime-700 bg-lime-200 rounded-md focus:outline-none focus:border-lime-900"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};
export default SearchForm;
