import 'react-smart-data-table/dist/react-smart-data-table.css';
import { useState, useEffect } from 'react';

function FilterComponent() {
  const [query, setQuery] = useState('');

  function onChange(e) {
    setQuery(e.target.value);
  }

  useEffect(() => {
    const params = new URLSearchParams();
    console.log(query);
    if (query) {
      params.append('status', query);
    } else {
      params.delete('name');
    }
  }, [query]);

  return (
    <select name="cars" id="cars" onChange={onChange}>
      <option value="volvo">All launches</option>
      <option value="saab">Upcoming</option>
      <option value="mercedes">Sucessful</option>
      <option value="audi">Failed</option>
    </select>
  );
}

export default FilterComponent;
