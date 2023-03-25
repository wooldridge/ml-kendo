import React from 'react';
import ReactDOM from 'react-dom/client';
import MyListView from './MyListView';
import MyMap from './MyMap';
import { MLProvider } from './ML';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(
  <>
    <MLProvider
      scheme="http"
      host="localhost"
      port="4000"
    >
      <div>
        <MyMap />
      </div>
    </MLProvider>
    <style>
      {`.k-listview-footer {
            border-top-width: 0 !important;
        }`}
    </style>
  </>
);