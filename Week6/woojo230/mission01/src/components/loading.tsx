const LoadingSpinner = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="w-12 h-12 border-4 border-t-transparent border-lime-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
