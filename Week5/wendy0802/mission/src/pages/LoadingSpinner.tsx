const LoadingSpinner = (): JSX.Element => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <div
          className="w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"
          role="status"
        ></div>
        <p className="mt-4 text-xl text-blue-300 font-bold">🔵🔵🔵</p>
      </div>
    </div> 
  );
};

export default LoadingSpinner;
