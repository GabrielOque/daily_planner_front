import React from "react";

const Button = ({
  paddingX,
  paddingY,
  background,
  fontSize,
  onClick,
  loading = false,
  children,
}) => {
  return (
    <button
      className={`rounded-lg font-semibold w-full ${paddingX} ${paddingY} ${background} ${fontSize} ${
        loading ? "cursor-not-allowed opacity-40" : "cursor-pointer"
      }`}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <i className="fas fa-spinner fa-spin ml-2 text-xl text-neutral" />
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

export default Button;
