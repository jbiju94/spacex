import 'react-smart-data-table/dist/react-smart-data-table.css';
import { useState, useEffect } from 'react';
import Select from "react-select";
import { useHistory } from "react-router-dom"
import {useLocation } from "react-router-dom";

function StatusFilterComponent() {
  const options = [
    { value: "", label: "Spring" },
    { value: "Failed", label: "Failed Launches" },
    { value: "Success", label: "Sucessful Launches" },
    { value: "Upcoming", label: "Upcoming Launches" }
  ];

  const params = useQuery()
  const [query, setQuery] = useState(params.get('status'));
  const history = useHistory();

  

  function handleChange(selectedOption) {
    setQuery(selectedOption.value);
  };

  const queryParams = useQuery();
  const initialValue = getInitalValue(queryParams, options);

  
  useEffect(() => {
    const params = new URLSearchParams();

    if (query) {
      params.append('status', query);
    } else {
      params.delete('status');
    }
    history.push({search: params.toString()})
  }, [query, history]);

  

  return (
    <Select
      value={initialValue}
      onChange={handleChange}
      options={options}
    />
  );
}

export default StatusFilterComponent;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function getInitalValue(params, options){
  const query = params.get('status')
  let ret = ""
  if (query && query!= "") {
    const filtered =  options.filter(item=>item.value === query);
    if (filtered.size == 1){
      ret = filtered[0]
    }
  }
  
  
  return ret;
}
