const LpLikeDisplay = ({ likes }: { likes: any[] }) => (
  <div className="flex justify-center">
    <div className="flex items-center bg-[#282828] text-pink-400 text-[11px] px-2 py-0.5 rounded-full gap-1 tracking-wide">
      <span>❤️</span>
      <span>{likes?.length || 0}</span>
    </div>
  </div>
);

export default LpLikeDisplay;
