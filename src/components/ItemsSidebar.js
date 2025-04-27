const ItemsSidebar = ({ text, icon, list, color, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      console.log(`Se presionó: ${text}`);
    }
  };

  return (
    <div
      className={
        color
          ? "flex items-center whitespace-nowrap font-regular cursor-pointer rounded-lg p-1 gap-1 hover:saturate-50"
          : "flex items-center gap-3 whitespace-nowrap font-regular cursor-pointer hover:bg-border hover:font-bold rounded-lg p-3"
      }
      style={{ backgroundColor: color }}
      onClick={handleClick}
    >
      {list ? (
        <div
          className="w-6 h-6 rounded-sm"
          style={{ backgroundColor: list }}
        ></div>
      ) : (
        <i className={`fas ${icon} text-muted text-xl font-regular`} />
      )}
      <p className="text-textContrast text-xl">{text}</p>
    </div>
  );
};

export default ItemsSidebar;
