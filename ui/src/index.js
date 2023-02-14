import React from 'react';
import ReactDOM from 'react-dom/client';
import Results from './Results';
import Search from './Search';
import MyGrid from './MyGrid';
import MyListView from './MyListView';
import { ListView } from "@progress/kendo-react-listview";
import { MLProvider } from './ML';
import products from './products.json';
import searchResults from './searchResults.json';

import { Pager } from "@progress/kendo-react-data-tools";

import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);


// const initialType = "numeric";
// const initialPageState = {
//   skip: 0,
//   take: 5,
//   buttonCount: 5,
//   type: initialType,
//   info: true,
//   pageSizes: true,
//   previousNext: true,
//   responsive: true,
// };
// const [pageState, setPageState] = React.useState(initialPageState);
// let { skip, take, ...rest } = pageState;
// const handlePageChange = (event) => {
//   const { skip, take } = event;
//   setPageState({
//     ...pageState,
//     skip: skip,
//     take: take,
//   });
//   console.log(`Page Change: skip ${skip}, take ${take}`);
// };

root.render(
  <React.Fragment>
    <MLProvider
      scheme="http"
      host="localhost"
      port="4000"
    >
      <div style={{padding: '10px'}}>
        <Search label="Search!"/>
        <hr />
        {/* <Results/>  */}

        <MyListView 
          data={searchResults.results}
        />

        {/* <Pager
          skip={skip}
          take={take}
          total={total}
          buttonCount={pageState.buttonCount}
          info={pageState.info}
          type={pageState.type}
          pageSizes={pageState.pageSizes ? pageSizes : undefined}
          previousNext={pageState.previousNext}
          onPageChange={handlePageChange}
        /> */}
        {/* TODO Paging using Pager Kendo component */}
        {/* https://www.telerik.com/kendo-react-ui/components/datatools/pager/ */}


        {/* <MyGrid /> */}

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
    <style>
      {`.k-listview-footer {
            border-top-width: 0 !important;
        }`}
    </style>
  </React.Fragment>
);