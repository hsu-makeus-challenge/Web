import { LpDataType } from '../../type/type';
import LpItem from './lpItem';

interface LpDataProps {
  lpData: LpDataType[];
}

function LpList({ lpData }: LpDataProps) {
  return (
    <div className="p-10 grid gap-1 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {lpData.map((lp) => (
        <LpItem
          key={lp.id}
          id={lp.id}
          title={lp.title}
          thumbnail={lp.thumbnail}
        />
      ))}
    </div>
  );
}

export default LpList;
