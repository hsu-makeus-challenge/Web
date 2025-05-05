import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { LpDetailFetch } from '../apis/lp/lpDetailFetch';
import LoadingSpinner from '../components/loading';
import Error from '../components/error';
import type { LpDetailDataType } from '../type/type';
import { HeartIcon } from '../utils/lp/icons';
import { LpHeader, LpRecord, LpTags, LpTitle } from '../utils/lp/LpComponents';

const LpDetailPage = () => {
  const { Lpid } = useParams<{ Lpid: string }>();
  const lpId: number = Number(Lpid);

  const {
    data: lpDetailData,
    isLoading,
    isFetching,
    error,
  } = useQuery<LpDetailDataType>({
    queryKey: ['lpDetail', lpId],
    queryFn: () => LpDetailFetch(lpId),
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <Error />;
  if (isFetching) return <LoadingSpinner />;

  return (
    <div className="flex justify-center items-center bg-lime-700 p-6 rounded-2xl max-w-md mx-auto my-8">
      <div className="max-w-md w-full">
        {/* header */}
        <LpHeader
          avatar={lpDetailData?.author.avatar}
          name={lpDetailData?.author.name}
          createdAt={lpDetailData?.createdAt}
        />

        {/* title */}
        <LpTitle title={lpDetailData?.title} />

        {/* lp disk */}
        <LpRecord
          thumbnail={lpDetailData?.thumbnail}
          title={lpDetailData?.title}
        />

        {/* desc */}
        <div className="text-white text-sm mb-4">
          <p>{lpDetailData?.content}</p>
        </div>

        {/* tag */}
        <LpTags tags={lpDetailData?.tags} />

        {/* like */}
        <div className="flex justify-center">
          <button className="flex items-center gap-1 text-lime-500">
            <HeartIcon />
            <span>{lpDetailData?.likes?.length || 0}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage;
