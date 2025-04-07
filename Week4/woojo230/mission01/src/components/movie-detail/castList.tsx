import { CastDataType } from '../../type/type';
import CastItem from './castItem';

interface DetailListProps {
  data: CastDataType[] | undefined;
}

const CastList = ({ data: castData }: DetailListProps) => {
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
      {castData?.map((cast) => (
        <CastItem
          key={cast.id}
          name={cast.name}
          profile_path={cast.profile_path}
          original_name={cast.original_name}
        />
      ))}
    </div>
  );
};

export default CastList;
