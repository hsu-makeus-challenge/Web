interface CastItemProps {
  name: string | undefined;
  profile_path: string | undefined;
  original_name: string | undefined;
}

const CastItem = ({ name, profile_path, original_name }: CastItemProps) => {
  const imageUrl = profile_path
    ? `https://image.tmdb.org/t/p/w500${profile_path}`
    : '';

  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-32 h-32 overflow-hidden rounded-full border-4 mb-4 ${
          profile_path ? 'border-gray-300' : 'bg-black'
        }`}
      >
        {profile_path ? (
          <img
            src={imageUrl}
            alt={name}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex justify-center items-center text-white text-2xl">
            ⚠️
          </div>
        )}
      </div>
      <p className="text-xl font-semibold text-center">{name || '정보 없음'}</p>
      <p className="text-sm text-center text-gray-500">
        {original_name || '정보 없음'}
      </p>
    </div>
  );
};

export default CastItem;
