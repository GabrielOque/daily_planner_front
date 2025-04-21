import React from "react";

const DataNotFound = ({ text, paddingY }) => {
  return (
    <div
      className={`text-textSecondary  flex flex-col items-center justify-center ${paddingY}`}
    >
      <i className="fas fa-exclamation-triangle text-2xl" />
      <span className="text-md">{text}</span>
    </div>
  );
};

export default DataNotFound;
