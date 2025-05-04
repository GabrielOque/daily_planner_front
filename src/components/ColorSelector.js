import React from "react";
import { colors } from "@/utils/colors";

const ColorSelector = ({ colorSelected, onClick }) => {
  return (
    <div>
      <div className="flex mt-2 gap-x-2 justify-start items-center">
        {Object.entries(colors).map(([key, value]) => (
          <div
            key={key}
            className={`rounded-full cursor-pointer hover:border-gray-500 ${
              colorSelected === key ? "w-7 h-7" : "w-6 h-6 "
            }`}
            style={{ backgroundColor: value }}
            onClick={() => onClick(key)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
