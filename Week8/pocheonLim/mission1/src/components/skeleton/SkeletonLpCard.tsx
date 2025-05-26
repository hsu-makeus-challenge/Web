const SkeletonLpCard = () => (
  <div
    className="
      bg-gray-300
      border border-gray-400
      rounded
      aspect-square
      w-full h-full
      animate-pulse
      shadow-inner
    "
    style={{
      minHeight: 0, 
      backgroundImage: 'linear-gradient(135deg, #bdbdbd 40%, #e0e0e0 100%)',
    }}
  />
);

export default SkeletonLpCard; 