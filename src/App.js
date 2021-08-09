import { useState, useEffect } from 'react';
import ListComponent from './List/smart-list';
import FilterComponent from './List/filter-bar';
import './index.css';

export default function App() {
  return (
    <div className="Desktop1">
      <div className="Header">
        <img
          className="Logo"
          src="http://lofrev.net/wp-content/photos/2017/05/Spacex_logo.png"
        />
        <div className="Rectangle1" />
      </div>
      <div class="SubHeader">
        <FilterComponent />
      </div>
      <div className="Table">
        <ListComponent />
      </div>
    </div>
  );
}
