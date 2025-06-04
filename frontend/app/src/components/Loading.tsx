const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full absolute top-0 left-0 bg-gray-500/10">
          <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default Loading;