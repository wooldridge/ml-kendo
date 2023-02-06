import React, { useState, useContext } from 'react';
import MLContext from './ML';

const Search = (props) => {
    const mlContext = useContext(MLContext);

    const [query, setQuery] = useState("");

    const handleSearch = () => {
      if (props.handleSearch) {
        // do something custom
      } else {
        mlContext.getSearch(query);
      }
    }

    const handleEnter = (e) => {
        if (e.keyCode === 13) {
            props.handleSearch(query);
        }
    };

    return (
        <div>
            <input 
                value={query} 
                onChange={e => setQuery(e.target.value)} 
                onKeyDown={(e) => handleEnter(e) } 
            />
            <button onClick={handleSearch}>{props.label || "Search"}</button>
        </div>
    )
}

export default Search;