import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LpItemProps {
  title: string | undefined;
  id: number | undefined;
  thumbnail: string | undefined;
}

const LpItem = ({ id: lpId, title, thumbnail }: LpItemProps) => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);

  const gotoLpDetailPage = (lpId: number) => {
    if (!lpId) return;
    navigate(`/home/lp/${lpId}`);
  };

  return (
    <div
      className="relative aspect-square rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => gotoLpDetailPage(lpId!)}
    >
      <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
      {isHover && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4 transition-opacity duration-300">
          <h3 className="text-white font-bold break-words whitespace-normal">
            {title}
          </h3>
        </div>
      )}
    </div>
  );
};

export default LpItem;
