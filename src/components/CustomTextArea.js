const CustomTextArea = ({ loading, onChange, value, ...props }) => {
  return (
    <div className="relative">
      <textarea
        rows={2}
        maxLength={500}
        cols={50}
        value={value}
        onChange={onChange}
        disabled={loading}
        placeholder="Escribe aquí..."
        className={`w-full border rounded-lg  text-md md:text-textPrimarylg focus:outline-none focus:ring-0 p-2 resize-none`}
        {...props}
      />
    </div>
  );
};

export default CustomTextArea;
