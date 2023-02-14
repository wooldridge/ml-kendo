import React, { useState, useContext } from 'react';
import MLContext from './ML';

const Search = (props) => {
    const mlContext = useContext(MLContext);

    const [query, setQuery] = useState("");

    const handleQuery = () => {
      mlContext.handleQuery(query);
    }

    const handleEnter = (e) => {
        if (e.keyCode === 13) {
          mlContext.handleQuery(query);
        }
    };

    return (
        <div>
            <input 
                value={query} 
                className="form-control"
                style={{width: "300px", display: "inline-block"}}
                onChange={e => setQuery(e.target.value)} 
                onKeyDown={(e) => handleEnter(e) } 
            />
            <button 
              onClick={handleQuery} 
              className="btn btn-primary"
              style={{top: "-2px", left: "4px", height: "38px", position: "relative"}}
            >{props.label || "Search"}</button>
        </div>
    )
}

export default Search;