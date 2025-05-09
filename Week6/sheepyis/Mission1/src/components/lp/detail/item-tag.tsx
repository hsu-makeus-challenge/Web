type Props = {
    item: {
      id: number;
      name: string;
    };
  };
  
  const ItemTag = ({ item }: Props) => {
    return (
      <div className="px-[0.8vw] py-[0.3vw] border-pink-500 border-[0.2vw] rounded-full text-[1vw]">
        <p className="text-pink-500 text-[1vw]">#{item.name}</p>
      </div>
    );
  };
  
  export default ItemTag;
  