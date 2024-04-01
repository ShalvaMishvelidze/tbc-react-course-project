export function Search({ handleSearch, search }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form className="search" onSubmit={handleSubmit}>
      <input
        placeholder="Enter what you're looking for :)"
        type="search"
        value={search}
        onChange={handleSearch}
      />
    </form>
  );
}
