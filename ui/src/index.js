import React from 'react';
import ReactDOM from 'react-dom/client';
import Results from './Results';
import Search from './Search';
import { MLProvider } from './ML';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

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
    </div>
  </MLProvider>
);