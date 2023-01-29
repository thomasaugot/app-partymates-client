import "../components/SearchBar.css";

function SearchBar() {
  return (
    <div class="wrap">
      <div class="search">
        <input
          type="text"
          class="searchTerm"
          placeholder="Search an event"
        />
        <button type="submit" class="searchButton">
          <i class="fa fa-search">Go</i>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
