import * as React from "react";
import * as ReactDOM from "react-dom";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import DataLoader from "./DataLoader";

const MyGrid = () => {
  const [products, setProducts] = React.useState({
    data: [],
    total: 0,
  });
  const [dataState, setDataState] = React.useState({
    take: 10,
    skip: 0,
  });
  const dataStateChange = (e) => {
    console.log("dataStateChange", e.dataState);
    setDataState(e.dataState);
  };
  const dataReceived = (products) => {
    console.log("dataReceived", products);
    setProducts(products);
  };
  return (
    <div>
      <Grid
        filterable={true}
        sortable={true}
        pageable={true}
        {...dataState}
        data={products}
        onDataStateChange={dataStateChange}
      >
        <Column field="uri" title="URI" />
        <Column field="score" filter="numeric" title="Score" />
        {/* <Column field="ProductID" filter="numeric" title="Id" />
        <Column field="ProductName" title="Name" />
        <Column
          field="UnitPrice"
          filter="numeric"
          format="{0:c}"
          title="Price"
        />
        <Column field="UnitsInStock" filter="numeric" title="In stock" /> */}
      </Grid>

      <DataLoader dataState={dataState} onDataReceived={dataReceived} />
    </div>
  );
};

export default MyGrid;