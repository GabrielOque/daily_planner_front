import { useState } from "react";

const CustomInput = ({
  loading,
  onChange,
  value,
  placeholder,
  height = "h-12",
  password = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={password ? (showPassword ? "text" : "password") : "text"}
        value={value}
        onChange={onChange}
        disabled={loading}
        placeholder={placeholder}
        className={`w-full border-2 border-neutralLighter rounded-xl px-3 text-md md:text-lg focus:outline-none focus:ring-0 ${height}`}
      />
      {password && (
        <>
          {showPassword ? (
            <i
              className="far fa-eye-slash text-textSecondary absolute text-xl md:text-2xl top-3 right-3 cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <i
              className="far fa-eye text-textSecondary absolute text-xl md:text-2xl top-3 right-3 cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CustomInput;
