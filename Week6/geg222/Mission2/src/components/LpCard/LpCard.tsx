import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { formatDistanceToNow } from "date-fns";

type LpCardProps = {
  lp: {
    id: string;
    title: string;
    thumbnail: string;
    createdAt: string;
    likeCount?: number;
    content: string;
    tags: { id: number; name: string }[];
  };
};

const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const handleClick = () => {
    if (!accessToken) {
      const confirmed = window.confirm(
        "로그인이 필요한 서비스입니다. 로그인하시겠습니까?"
      );
      if (confirmed) {
        navigate("/login");
      }
    } else {
      navigate(`/lp/${lp.id}`);
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="cursor-pointer relative rounded overflow-hidden transform transition-transform duration-300 hover:scale-110"
      >
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="w-full h-auto rounded"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm text-white opacity-0 hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4">
          <div className="flex justify-between items-end w-full">
            <div>
              <p className="font-bold text-base leading-tight">{lp.title}</p>
              <p className="text-xs mt-1">
                {lp.createdAt
                  ? formatDistanceToNow(new Date(lp.createdAt), {
                      addSuffix: true,
                    })
                  : ""}
              </p>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <span>♥</span>
              <span>{lp.likeCount ?? 0}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LpCard;
