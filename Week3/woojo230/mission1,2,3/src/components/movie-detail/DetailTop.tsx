import { MovieDetailDataType } from '../../type/type';

interface DetailTopProps {
  data: MovieDetailDataType | undefined;
}

const DetailTop = ({ data }: DetailTopProps) => {
  const imageUrl = `https://image.tmdb.org/t/p/w780${data?.backdrop_path}`;

  const getDefaultValue = (
    value: string | number | undefined,
    defaultValue: string = '정보 없음'
  ) => {
    return value ? value : defaultValue;
  };

  return (
    <div className="relative rounded-xl overflow-hidden">
      <div className="relative">
        <img
          src={imageUrl}
          alt={data?.title}
          className="object-cover w-full h-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent text-white p-6 flex flex-col justify-start space-y-4">
          <h2 className="text-3xl font-semibold">
            {getDefaultValue(data?.title)}
          </h2>
          <p className="text-lg font-medium">
            {getDefaultValue(data?.vote_average)} ★
          </p>
          <p className="text-sm">{getDefaultValue(data?.release_date)}</p>
          <p className="text-sm">{getDefaultValue(data?.runtime)} 분</p>
          <p className="text-sm w-1/5 line-clamp-11">
            {getDefaultValue(data?.overview)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailTop;
