const CreateItemComponent = ({ onClick, loading = false, children }) => {
  return (
    <button
      className="w-full border border-sideBar rounded-lg text-start px-4 py-2 text-textSecondary"
      onClick={onClick}
    >
      {loading ? (
        <i className="fas fa-spinner fa-spin ml-2 text-xl text-neutral" />
      ) : (
        <>
          <i className="fas fa-plus pr-4" />
          {children}
        </>
      )}
    </button>
  );
};

export default CreateItemComponent;
