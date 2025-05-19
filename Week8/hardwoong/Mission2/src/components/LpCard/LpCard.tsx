import { LpCardProps } from "../../types/lpCard.ts";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.tsx";

const LpCard = ({ id, title, thumbnail, createdAt, likes }: LpCardProps) => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const handleClick = () => {
    if (!accessToken) {
      const confirmLogin = window.confirm("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
      if (confirmLogin) {
        navigate("/login");
      }
    } else {
      navigate(`/lp/${id}`);
    }
  };

  return (
    <div
      key={id}
      onClick={handleClick}
      className="relative rounded overflow-hidden transform transition duration-300 hover:scale-105 hover:z-50 hover:shadow-2xl cursor-pointer aspect-square w-full"
    >
      <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
        <h3 className="text-sm text-left">{title}</h3>
        <div className="flex justify-between text-sm">
          <p>{dayjs(createdAt).format("YY.MM.DD")}</p>
          <p>👍 {Array.isArray(likes) ? likes.length : 0}</p>
        </div>
      </div>
    </div>
  );
};

export default LpCard;