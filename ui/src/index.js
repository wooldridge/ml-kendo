import React from 'react';
import ReactDOM from 'react-dom/client';
import Results from './Results';
import Search from './Search';
import MyGrid from './MyGrid';
import MyListView from './MyListView';
import MyMap from './MyMap';
import { ListView } from "@progress/kendo-react-listview";
import { MLProvider } from './ML';
import searchResults from './searchResults.json';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import { Pager } from "@progress/kendo-react-data-tools";

import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(
  <React.Fragment>
    <MLProvider
      scheme="http"
      host="localhost"
      port="4000"
    >
      <div style={{padding: '10px'}}>
        <Tabs
          defaultActiveKey="mapView"
          id="fill-tab-example"
          className="mb-3"
          fill
        >
          <Tab eventKey="listView" title="ListView">
            <Search label="Search!"/>
            {/* <Results/>  */}
            <MyListView 
              data={searchResults.results}
            />
          </Tab>
          <Tab eventKey="mapView" title="Map">
            <div>
              <MyMap />
            </div>
          </Tab>
        </Tabs>
      </div>
    </MLProvider>
    <style>
      {`.k-listview-footer {
            border-top-width: 0 !important;
        }`}
    </style>
  </React.Fragment>
);