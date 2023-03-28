import "./SearchBar.css";

function SearchBar({ searchTerm, setSearchTerm }) {
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="search__bar">
      <input
        type="text"
        placeholder="Start typing to search an event"
        value={searchTerm}
        onChange={handleChange}
        className="search__input"
      />
    </div>
  );
}

export default SearchBar;
