interface ArrowButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
  label: string;
  disabled?: boolean;
}

export default function ArrowButton({ direction, onClick, label, disabled = false }: ArrowButtonProps) {
  const isPrev = direction === 'prev';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative border border-white min-w-[80px] h-10 px-2 py-1 font-bold text-white transition-all duration-300 rounded-md 
        outline-none overflow-hidden border-none hover:cursor-pointer
        ${disabled
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : ` group ${isPrev ? 'hover:pl-6 hover:pr-2' : 'hover:pr-6 hover:pl-2'}`}
      `}
    >
      <span className="relative z-10">{label}</span>
      {!disabled && (
        <span
          className={`absolute top-0 h-full flex items-center text-[20px] transition-all duration-300
            ${isPrev ? 'left-[-20px] group-hover:left-[10px]' : 'right-[-20px] group-hover:right-[10px]'}
            opacity-0 group-hover:opacity-100`}
        >
          {isPrev ? '«' : '»'}
        </span>
      )}
    </button>
  );
}