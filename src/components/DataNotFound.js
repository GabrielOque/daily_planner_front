import React from "react";

const DataNotFound = ({ text, paddingY }) => {
  return (
    <div
      className={`text-textSecondary  flex flex-col items-center justify-center opacity-40 italic ${paddingY}`}
    >
      <i className="fas fa-exclamation-triangle text-2xl" />
      <span className="text-md">{text}</span>
    </div>
  );
};

export default DataNotFound;
