import { useState } from "react";
import "../components/SearchBar.css";

function SearchBar(props) {
  const [searchValue, setsearchValue] = useState("");
  const { allEvents } = props;

  // console.log(props)

  const searchResult = allEvents?.filter((eventObj) => {
    let result = eventObj.name
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    return result;
  });

  const clearSearchInput = () => {
    setsearchValue("");
  };

  return (
    
    <div class="wrap">
      <div class="search">
        <input type="text" class="searchTerme" placeholder="Search an event" />
        <button
          type="submit"
          class="searchButton"
          onClick={() => {
            searchResult();
            clearSearchInput();
          }}
        >
          <i class="fa fa-search" style={{color:'black', fontStyle: 'normal'}}>Go</i>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
