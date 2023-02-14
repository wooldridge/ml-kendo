import { createContext, useState, useEffect } from "react";
import axios from "axios";

const MLContext = createContext({
  results: [],
  query: undefined,
  start: 1,
  pageLength: 10,
  total: 0,
  loading: false,
  handlePaging: () => {},
  handleQuery: () => {},
});

export function MLProvider(props) {

  const [results, setResults] = useState([]);
  const [query, setQuery] = useState(undefined);
  const [start, setStart] = useState(1);
  const [pageLength, setPageLength] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleSearch();
  }, [query, start]);

  const handleSearch = async () => {
    if (query === undefined) return;
    const endpoint = props.scheme + "://" + props.host + ":" + props.port + '/v1/search' + 
      '?q=/' + query + '&format=json&start=' + start + '&pageLength=' + pageLength + '&options=search-options';
    setLoading(true);
    try {
      const response = await axios.get(endpoint);
      if (response && response.status === 200) {
        console.log("response.data.results", response.data.results);
        setResults(response.data.results);
        setTotal(response.data.total);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error: handleSearch", error);
    }
  }

  const handleQuery = async (query) => {
    setQuery(query);
    setStart(1);
  }

  const handlePaging = async (event) => {
    console.log("handlePaging", event);
    setStart(event.skip + 1);
  }

  const context = {
    results: results,
    query: query,
    start: start,
    pageLength: pageLength,
    total: total,
    loading: loading,
    handlePaging: handlePaging,
    handleQuery: handleQuery, 
  };

  return <MLContext.Provider value={context}>
    {props.children}
  </MLContext.Provider>
}

export default MLContext;
