const SkeletonComment = () => {
    return (
      <div className="flex gap-[1vw] items-start bg-gray-800 p-[1vw] rounded animate-pulse">
        <div className="w-[4vw] h-[4vw] bg-gray-600 rounded-full" />
  
        <div className="flex flex-col gap-[0.5vw] w-full">
          <div className="w-[30%] h-[1.2vw] bg-gray-600 rounded" />
          <div className="w-full h-[1vw] bg-gray-600 rounded" />
        </div>
      </div>
    );
  };
  
  export default SkeletonComment;
  