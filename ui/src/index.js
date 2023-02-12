import React from 'react';
import ReactDOM from 'react-dom/client';
import Results from './Results';
import Search from './Search';
import MyGrid from './MyGrid';
import { ListView } from "@progress/kendo-react-listview";
import { MLProvider } from './ML';
import products from './products.json';
import searchResults from './searchResults.json';

import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";

import '@progress/kendo-theme-default/dist/all.css';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

const MyItemRender = (props) => {
  let item = props.dataItem;
  return (
      <div className='k-listview-item' style={{ padding: 10, borderBottom: '1px solid lightgrey'}}>
          {item.uri}
      </div>
  );
}

root.render(
  <MLProvider
    scheme="http"
    host="localhost"
    port="4000"
  >
    <div style={{padding: '10px'}}>
      <Search label="Search!"/>
      <hr />
      <Results/> 

      <MyGrid />

      {/* <ListView
            data={searchResults.results}
            item={MyItemRender}
            style={{ width: "100%" }}
      /> */}

        {/* <Grid
            style={{
                height: "400px",
            }}
            data={searchResults.results}
            >
            <Column field="uri" title="URI" width="300px" />
            <Column field="score" title="Score" width="250px" /> */}
            {/* <GridColumn field="Category.CategoryName" title="CategoryName" />
            <GridColumn field="UnitPrice" title="Price" />
            <GridColumn field="UnitsInStock" title="In stock" /> */}
        {/* </Grid> */}
        </div>
  </MLProvider>
);