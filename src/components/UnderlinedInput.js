import { useState } from "react";

const UnderlinedInput = ({
  loading,
  onChange,
  value,
  placeholder,
  height = "md:h-12 h-10",
  password = false,
  type = "text",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={password ? (showPassword ? "text" : "password") : type}
        value={value}
        onChange={onChange}
        disabled={loading}
        placeholder={placeholder}
        className={`w-full border-b-2  text-md md:text-textPrimarylg focus:outline-none focus:ring-0 ${height}`}
        {...props}
      />
      {password && (
        <>
          {showPassword ? (
            <i
              className="far fa-eye text-textSecondary absolute text-xl md:text-2xl top-3 right-3 cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <i
              className="far fa-eye-slash text-textSecondary absolute text-xl md:text-2xl top-3 right-3 cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default UnderlinedInput;
