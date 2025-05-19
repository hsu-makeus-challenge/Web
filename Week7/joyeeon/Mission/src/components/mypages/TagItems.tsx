import { RxCross2 } from "react-icons/rx";

interface TagItemsProps {
    tags: string[];
    onRemove: (index: number) => void;
}

const TagItems = ({tags, onRemove} : TagItemsProps) => {   
return(
    <div className="flex flex-wrap gap-2 mt-2 mb-4">
                    {tags.map((tag, idx) =>(
                        <div  key={idx} className="text-[12px] flex items-center border-green-500 px-2 py-1 rounded-full text-black">
                            <span className="flex flex-row items-center bg-green-200 px-2 py-1 rounded-full">
                                {tag}
                                <RxCross2 className='ml-2 cursor-pointer' onClick={() => onRemove(idx)}/>
                            </span>
                            
                        </div>
                        
                    ))}
                </div>
)
}

export default TagItems;