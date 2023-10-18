import { useState } from "react";
import { GetProductReturnType, ProductListItem } from "./container/ProductListItem";

export function SearchBar() {
  // Define state variables using the useState hook.
  const [search, setSearch] = useState(''); // User input for search.
  const [query, setQuery] = useState(''); // The search query.
  const [searchResults, setSearchResults] = useState<GetProductReturnType[]>([]); // Results of the search.

  // Function to update the 'search' state when the input value changes.
  function getInputValue(event: any) {
    setSearch(event.target.value);
  }

  function clickButton() {
    // Fetch data from the server using the provided search term.
    fetch(`http://localhost:3000/products?q=${search}`)
      .then((response) => response.json())
      .then((data: GetProductReturnType[]) => {
        // Update the search results and query state.
        setSearchResults(data);
        setQuery(search);
      });
  }

  return (
    <div>
      {/* Input field for entering search keywords. */}
      <input name="search" placeholder="Search..." className="input" value={search} onChange={getInputValue} />
      {/* Button to trigger the search. */}
      <button className="button" onClick={clickButton}>Search</button>

      {/* Display search results if there's a query. */}
      {query && (
        <>
          <h1>Search results for "{query}" :</h1>
          <ul className="list-group">
            {/* Map over search results to display ProductListItem components. */}
            {searchResults.length ?
              searchResults.map((search) => <ProductListItem key={search.id} id={search.id} />)
              : "No results found"}
          </ul>
        </>
      )}
    </div>
  );
}
