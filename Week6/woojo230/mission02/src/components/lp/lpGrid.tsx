import type { LpDataType } from '../../type/type';
import SkeletonLpItem from '../skeleton/skeletonLpItem';
import LpItem from './lpItem';

interface LpGridProps {
  lpData: LpDataType[] | undefined;
  isFetching: boolean;
  isLoading: boolean;
}

export const LpGrid = ({ lpData, isFetching, isLoading }: LpGridProps) => {
  const skeletonCount = 12;
  const skeletonItems = Array.from({ length: skeletonCount }, (_, i) => i);

  return (
    <div className="p-10 grid gap-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {lpData?.map((lp) => (
        <LpItem
          key={lp.id}
          id={lp.id}
          createdAt={lp.createdAt}
          title={lp.title}
          thumbnail={lp.thumbnail}
          likes={lp.likes}
        />
      ))}

      {isFetching &&
        !isLoading &&
        skeletonItems.map((item) => (
          <SkeletonLpItem key={`skeleton-${item}`} />
        ))}
    </div>
  );
};
