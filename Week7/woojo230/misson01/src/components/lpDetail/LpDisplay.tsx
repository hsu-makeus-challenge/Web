import { HeartIcon } from './icons';
import { LpTitle, LpRecord, LpTags } from './LpComponents';
import type { LpDetailDataType } from '../../type/type';
import useLikesUpdate from '../../hooks/queries/likes/useLikesUpdate';

interface LpDisplayProps {
  lpDetailData: LpDetailDataType;
  onDelete: () => void;
}

const LpDisplay = ({ lpDetailData, onDelete }: LpDisplayProps) => {
  const { postLpLike, deleteLpLike } = useLikesUpdate();

  const handleLike = () => {
    postLpLike({ lpId: lpDetailData.id });
  };

  const handleDislike = () => {
    deleteLpLike({ lpId: lpDetailData.id });
  };

  return (
    <>
      <LpTitle title={lpDetailData?.title} handleDelete={onDelete} />
      <LpRecord
        thumbnail={lpDetailData?.thumbnail}
        title={lpDetailData?.title}
      />
      <div className="text-white text-sm mb-4 bg-gray-800/50 p-4 rounded-lg">
        <p className="break-words whitespace-pre-wrap">
          {lpDetailData?.content}
        </p>
      </div>
      <LpTags tags={lpDetailData?.tags} />
      <div className="flex justify-center">
        <button
          className="flex items-center gap-1 text-lime-500 cursor-pointer"
          onClick={
            lpDetailData?.likes?.some(
              (like) => like.userId === Number(localStorage.getItem('userId'))
            )
              ? handleDislike
              : handleLike
          }
        >
          <HeartIcon />
          <span>{lpDetailData?.likes?.length || 0}</span>
        </button>
      </div>
    </>
  );
};

export default LpDisplay;
