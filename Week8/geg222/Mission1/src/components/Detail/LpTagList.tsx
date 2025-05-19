

interface Tag {
  id: number;
  name: string;
}

interface LpTagListProps {
  tags: Tag[];
}

const LpTagList = ({ tags }: LpTagListProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {tags?.map((tag) => (
        <span
          key={tag.id}
          className="bg-[#282828] border border-gray-600 text-gray-300 text-[11px] px-3 py-0.5 rounded-full tracking-wide"
        >
          #{tag.name}
        </span>
      ))}
    </div>
  );
};

export default LpTagList;