interface LpFormInputsProps {
  title: string;
  content: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LpFormInputs = ({
  title,
  content,
  onTitleChange,
  onContentChange,
}: LpFormInputsProps) => {
  return (
    <>
      <input
        type="text"
        placeholder="LP Name"
        value={title}
        onChange={onTitleChange}
        className="w-full px-3 py-2 bg-[#23242a] border border-[#44454b] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all duration-200"
      />
      <input
        type="text"
        placeholder="LP Content"
        value={content}
        onChange={onContentChange}
        className="w-full px-3 py-2 bg-[#23242a] border border-[#44454b] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all duration-200"
      />
    </>
  );
};

export default LpFormInputs;
