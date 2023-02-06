import React, { useContext } from 'react';
import MLContext from './ML';

const Results = (props) => {
    const mlContext = useContext(MLContext);

    let result = [];
    const getResults  = () => {
        if (props.getResults) {
          // do something custom
        } else {
          if (mlContext.results?.length) {
            mlContext.results.forEach((res, i) => {
              result.push(<div key={i}>{res.uri}</div>);
            });
          }
          return result;
        }
    };

    return (<div>{getResults()}</div>);

};

export default Results;