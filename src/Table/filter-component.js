import 'react-smart-data-table/dist/react-smart-data-table.css';
import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'
import { useHistory } from "react-router-dom"

function FilterComponent() {
  const [query, setQuery] = useState("");
  const history = useHistory();

  function onChange(e) {
    setQuery(e.target.value);
  }

  useEffect(() => {
    const params = new URLSearchParams();
    console.log(query);
    if (query) {
      params.append('status', query);
    } else {
      params.delete('status');
    }
    history.push({search: params.toString()})
  }, [query, history]);


  return (
    <select name="status" onChange={onChange}>
      <option value="">All launches</option>
      <option value="FAILED">Failed</option>
      <option value="SUCCESS">Sucess</option>
      <option value="UPCOMING">Upcoming</option>
    </select>
  );
}

export default FilterComponent;
