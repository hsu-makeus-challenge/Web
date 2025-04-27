interface PersonCardProps {
  name: string;
  profile_path: string | null;
}

const PersonCard = (person: PersonCardProps) => {
  return (
    <div className="flex flex-col items-center">
      {person.profile_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
          alt="no Image"
          className="w-24 h-24 rounded-full border-1 border-white"
        />
      ) : (
        <div className="w-24 h-24 rounded-full border-white border-1"></div>
      )}
      <div className="pt-3">{person.name}</div>
    </div>
  );
};

export default PersonCard;
