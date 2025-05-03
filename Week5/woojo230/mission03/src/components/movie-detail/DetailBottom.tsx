import { CastDataType } from '../../type/type';
import CastList from './castList';

interface DetailBottomProps {
  data: CastDataType[] | undefined;
}

const DetailBottom = ({ data }: DetailBottomProps) => {
  return (
    <>
      <h2 className="text-3xl font-bold mb-8 text-gray-800 mt-4 ">감독/출연</h2>
      <CastList data={data} />
    </>
  );
};

export default DetailBottom;
