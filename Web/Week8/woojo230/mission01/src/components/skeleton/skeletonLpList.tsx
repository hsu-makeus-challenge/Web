import SkeletonLpItem from './skeletonLpItem';

interface SkeletonLpListProps {
  itemCount?: number;
}

const SkeletonLpList = ({ itemCount = 12 }: SkeletonLpListProps) => {
  const skeletonItems = Array.from({ length: itemCount }, (_, i) => i);

  return (
    <>
      {skeletonItems.map((item) => (
        <SkeletonLpItem key={`skeleton-${item}`} />
      ))}
    </>
  );
};

export default SkeletonLpList;
