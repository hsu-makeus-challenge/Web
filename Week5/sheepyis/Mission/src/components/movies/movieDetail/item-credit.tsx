import { CastMember } from "../../../types/credit";

interface ItemProps {
  data: CastMember;
}

const ItemCredit = ({ data }: ItemProps) => {
  const hasProfile = !!data.profile_path;
  const imageUrl = `https://image.tmdb.org/t/p/w500/${data.profile_path}`;

  return (
    <div className="flex flex-col items-center">
      {hasProfile ? (
        <img src={imageUrl} alt={data.name}
          className="w-[6vw] h-[6vw] object-cover rounded-full border-[0.1vw] border-white"
        />
      ) : (
        <div className="w-[6vw] h-[6vw] rounded-full bg-black border-[0.1vw] border-white"/>
      )}

      <p className="text-[1vw] mt-[1vw] text-center line-clamp-1">{data.name}</p>
      <p className="text-[0.5vw] text-center text-gray-100 line-clamp-1">{data.character}</p>
    </div>
  );
};

export default ItemCredit;
