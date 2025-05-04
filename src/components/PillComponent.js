import { colors } from "@/utils/colors";

const PillComponent = ({ item, isTag }) => {
  return (
    <>
      {isTag ? (
        <div
          className={`px-2 py-0.5 rounded-lg text-white font-semibold max-w-fit xl:max-w-20 2xl:max-w-40 truncate whitespace-nowrap`}
          style={{
            backgroundColor: colors[item?.color],
          }}
        >
          <p className="">{item?.label}</p>
        </div>
      ) : (
        <div className="flex items-center gap-x-1" title={item?.label}>
          <div
            className={`w-5 h-5 rounded-md`}
            style={{
              backgroundColor: colors[item?.color],
            }}
          ></div>
          <p className="text-textSecondary font-semibold max-w-full xl:max-w-20 2xl:max-w-40 truncate whitespace-nowrap">
            {item.label}
          </p>
        </div>
      )}
    </>
  );
};

export default PillComponent;
