type Props = {
  onClick: () => void;
};

const LpAddButton = ({ onClick }: Props) => {
  return (
    <button
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#FF4E6B] cursor-pointer text-white text-3xl shadow-lg hover:bg-[#FF0436] transition"
      onClick={onClick}
    >
      +
    </button>
  );
};

export default LpAddButton;