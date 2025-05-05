const Button = ({
  paddingX,
  paddingY,
  background,
  border = "border-0",
  fontSize,
  onClick,
  loading = false,
  children,
  disabled = false,
  textColor = "text-textContrast",
}) => {
  return (
    <button
      className={`rounded-lg ${textColor} font-semibold w-full ${border} ${paddingX} ${paddingY} ${background} ${fontSize} ${
        loading || disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"
      }`}
      onClick={() => {
        if (!loading && !disabled) {
          onClick();
        }
      }}
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
