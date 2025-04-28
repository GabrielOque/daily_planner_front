import { colors } from "@/utils/colors";

const ItemsSidebar = ({
  label,
  icon,
  isList = false,
  isTag = false,
  color,
  onClick,
  isSelected = false,
}) => {
  return (
    <div
      className={`whitespace-nowrap font-regular truncate items-center flex cursor-pointer rounded-lg my-0.5 px-2 ${
        isTag
          ? "hover:saturate-50 py-0.5"
          : "hover:bg-border hover:font-bold py-1.5"
      } ${isSelected && "bg-border font-bold"} ${isList ? "gap-3" : "gap-1"}`}
      style={{
        backgroundColor: isTag && colors[color],
      }}
      onClick={onClick}
    >
      {isList ? (
        <>
          {isSelected ? (
            <i
              className="fas fa-folder-open text-xl rounded-sm"
              style={{ color: colors[color] }}
            />
          ) : (
            <i
              className={`fas fa-folder text-xl rounded-sm`}
              style={{ color: colors[color] }}
            />
          )}
        </>
      ) : (
        <i className={`fas ${icon} text-muted text-md font-regular pr-1`} />
      )}
      <p className="text-textContrast text-md truncate">{label}</p>
    </div>
  );
};

export default ItemsSidebar;
