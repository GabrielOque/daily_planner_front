const CustomSelector = ({ options, value, onChange }) => {
  return (
    <select
      value={value?.id}
      onChange={(e) => {
        const selected = options.find((opt) => opt.id === e.target.value);
        onChange(selected);
      }}
      className="w-48 bg-white border border-gray-300 px-2 py-1 rounded-xl focus-within:outline-none focus-within:ring-2 focus-within:none focus-within:border-transparent"
    >
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default CustomSelector;
