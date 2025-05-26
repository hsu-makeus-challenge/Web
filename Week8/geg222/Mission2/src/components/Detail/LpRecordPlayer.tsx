


interface LpRecordPlayerProps {
  thumbnail: string;
  title: string;
}

const LpRecordPlayer = ({ thumbnail, title }: LpRecordPlayerProps) => {
  return (
    <div className="flex justify-center">
      <div className="w-[22rem] h-[22rem] rounded-full bg-[#121212] shadow-2xl flex items-center justify-center relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full rounded-full object-cover border-4 border-black shadow-inner"
          style={{ animation: "spin 10s linear infinite" }}
        />
        <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-[#282828] rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg border border-gray-700" />
      </div>
    </div>
  );
};

export default LpRecordPlayer;