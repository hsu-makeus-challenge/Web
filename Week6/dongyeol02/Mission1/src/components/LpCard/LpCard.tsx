import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Lp } from "../../types/lp";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/lp/${lp.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative overflow-hidden rounded-lg shadow-md transform transition duration-300 hover:scale-105"
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-full h-48 object-cover"
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center text-white p-4 text-center transition duration-300 opacity-0 group-hover:opacity-100">
        <div>
          <h3 className="text-xs font-bold mb-2">{lp.title}</h3>
          <p className="text-xs">
            업로드 날짜: {new Date(lp.createdAt).toLocaleDateString()}
          </p>
          <p className="text-xs">❤️: {lp.likes.length}</p>
        </div>
      </div>
    </div>
  );
};

export default LpCard;
