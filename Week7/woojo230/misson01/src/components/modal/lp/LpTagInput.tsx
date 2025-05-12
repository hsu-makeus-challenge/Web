interface LpTagInputProps {
  tagInput: string;
  tags: string[];
  onTagInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTagInputKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onAddTag: () => void;
}

const LpTagInput = ({
  tagInput,
  tags,
  onTagInputChange,
  onTagInputKeyDown,
  onAddTag,
}: LpTagInputProps) => {
  return (
    <>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="LP Tag"
          value={tagInput}
          onChange={onTagInputChange}
          onKeyDown={onTagInputKeyDown}
          className="flex-1 px-3 py-2 bg-[#23242a] border border-[#44454b] rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all duration-200"
        />
        <button
          type="button"
          onClick={onAddTag}
          className="px-4 py-2 bg-[#44454b] text-gray-200 rounded-md hover:bg-[#5a5b60] transition-colors duration-200 text-sm font-medium cursor-pointer"
        >
          Add
        </button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-lime-700 text-white px-2 py-1 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default LpTagInput;
