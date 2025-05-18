import { useState, useCallback, useEffect, useRef } from 'react';
import Error from '../components/error';
import LoadingSpinner from '../components/loading';
import useInfiniteScrollObserver from '../hooks/observer/useInfiniteScrollObserver';
import useGetInfiniteScroll from '../hooks/queries/infiniteScroll/useGetInfiniteScroll';
import { LpGrid } from '../components/lp/lpGrid';
import { OrderButtons } from '../components/lp/orderBtn';
import { useDebounce } from '../hooks/useDebounce';
import useGetTagInfiniteScroll from '../hooks/queries/infiniteScroll/useGetTagInfinityScroll';
import SearchForm from '../components/search/searchForm';
import TagBtn from '../components/search/tagBtn';

type SearchType = 'title' | 'tag';

const Search = () => {
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('desc');
  const [searchType, setSearchType] = useState<SearchType>('title');
  const debouncedSearch = useDebounce(search, 500);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    data: lpData,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    error,
    refetch,
  } = useGetInfiniteScroll({
    order: order,
    limit: 50,
    search: searchType === 'title' ? debouncedSearch : '',
  });

  const {
    data: tagData,
    fetchNextPage: tagFetchNextPage,
    hasNextPage: tagHasNextPage,
    isFetching: tagIsFetching,
    isLoading: tagIsLoading,
    error: tagError,
    refetch: tagRefetch,
  } = useGetTagInfiniteScroll({
    tagName: searchType === 'tag' ? debouncedSearch : '',
    order: order,
    limit: 50,
    search: '',
  });

  const allLpData = lpData?.pages.flatMap((page) => page.data) ?? [];
  const allTagData = tagData?.pages.flatMap((page) => page.data) ?? [];

  const observerRef = useInfiniteScrollObserver(
    searchType === 'title' ? hasNextPage : tagHasNextPage,
    searchType === 'title' ? isFetching : tagIsFetching,
    searchType === 'title' ? fetchNextPage : tagFetchNextPage
  );

  const handleClick = () => {
    if (searchType === 'title') {
      setSearchType('tag');
      setSearch('');
    } else {
      setSearchType('title');
      setSearch('');
    }
  };

  useEffect(() => {
    const currentInput = inputRef.current;
    if (currentInput) {
      const { selectionStart, selectionEnd } = currentInput;
      if (searchType === 'title') {
        refetch().then(() => {
          currentInput.focus();
          currentInput.setSelectionRange(selectionStart, selectionEnd);
        });
      } else {
        tagRefetch().then(() => {
          currentInput.focus();
          currentInput.setSelectionRange(selectionStart, selectionEnd);
        });
      }
    } else {
      if (searchType === 'title') {
        refetch();
      } else {
        tagRefetch();
      }
    }
  }, [debouncedSearch, refetch, tagRefetch, searchType]);

  if (searchType === 'title' ? isLoading : tagIsLoading)
    return <LoadingSpinner />;
  if (searchType === 'title' ? error : tagError) return <Error />;

  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-1/2 flex flex-col gap-4 py-4 sticky top-0 bg-white z-10">
        <div className="flex gap-2">
          <SearchForm
            inputRef={inputRef}
            searchType={searchType}
            search={search}
            setSearch={setSearch}
          />
        </div>
        <div className="flex gap-2">
          <TagBtn searchType={searchType} handleClick={handleClick} />
        </div>
      </div>
      <OrderButtons
        order={order}
        onAscClick={() => setOrder('asc')}
        onDescClick={() => setOrder('desc')}
      />
      <LpGrid
        lpData={searchType === 'title' ? allLpData : allTagData}
        isFetching={searchType === 'title' ? isFetching : tagIsFetching}
        isLoading={searchType === 'title' ? isLoading : tagIsLoading}
      />
      <div ref={observerRef} className="h-10" />
    </div>
  );
};

export default Search;
