import { createContext, useState } from "react";
import axios from "axios";

const MLContext = createContext({
  results: "",
  getSearch: (query) => {}
});

export function MLProvider(props) {

  const [results, setResults] = useState("");

  const getSearch = async (query) => {
    const endpoint = props.scheme + "://" + props.host + ":" + props.port + '/v1/search?q=/' + query + '&format=json';
    try {
      const response = await axios.get(endpoint);
      if (response && response.status === 200) {
        setResults(response.data.results);
      }
    } catch (error) {
      console.error("Error: getSearch", error);
    }
  }

  const context = {
    results: results,
    getSearch: props.getSearch || getSearch 
  };

  return <MLContext.Provider value={context}>
    {props.children}
  </MLContext.Provider>
}

export default MLContext;
