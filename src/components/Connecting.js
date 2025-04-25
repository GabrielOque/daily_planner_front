const Connecting = ({ title }) => {
  return (
    <div className="flex w-full items-center justify-center h-full animate-pulse">
      <div className="flex items-center justify-center w-10 h-10 border-4 border-gray-300 rounded-full animate-spin border-t-blue-500"></div>
      <div className="loader"></div>
      <p className="text-gray-500 pl-3">{title}</p>
    </div>
  );
};

export default Connecting;
