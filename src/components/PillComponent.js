import { colors } from "@/utils/colors";

const PillComponent = ({ item }) => {
  return (
    <div className="flex items-center gap-x-1" title={item.name}>
      <div
        className={`w-4 h-4 rounded-md`}
        style={{
          backgroundColor: colors[item.color],
        }}
      ></div>
      <p className="text-textSecondary font-semibold max-w-full xl:max-w-20 2xl:max-w-40 truncate whitespace-nowrap">
        {item.name}
      </p>
    </div>
  );
};

export default PillComponent;
