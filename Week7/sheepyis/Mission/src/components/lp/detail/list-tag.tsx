import ItemTag from "./item-tag";

type Tag = {
  id: number;
  name: string;
};

type Props = {
    data: Tag[];
};

const ListTag = ({ data }: Props) => {
    return (
        <div className="flex gap-[1vw] items-center">
            {data.map((tag) => (
                <ItemTag 
                    key={tag.id}
                    item={tag}
                />
            ))}
        </div>
    );
};

export default ListTag;
