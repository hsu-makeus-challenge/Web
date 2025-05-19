import ItemTag from "./item-tag";

type ListTagProps = {
    tags: string[];
    onRemove: (tag: string) => void;
};

const ListTag = ({ tags, onRemove }: ListTagProps) => {
    return (
        <div className="w-full flex flex-wrap gap-[0.5vw]">
            {tags.map((tag) => (
                <ItemTag key={tag} tag={tag} onRemove={onRemove} />
            ))}
        </div>
    )
}

export default ListTag;