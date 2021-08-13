import 'react-smart-data-table/dist/react-smart-data-table.css';
import { useState, useEffect } from 'react';
import Select from "react-select";
import { useHistory } from "react-router-dom"
import {useLocation } from "react-router-dom";

function FilterComponent() {
  const [query, setQuery] = useState("");
  const history = useHistory();

  const options = [
    { value: "", label: "Spring" },
    { value: "Failed", label: "Failed Launches" },
    { value: "Success", label: "Sucessful Launches" },
    { value: "Upcoming", label: "Upcoming Launches" }
  ];

  function handleChange(selectedOption) {
    setQuery(selectedOption.value);
  };

  const queryParams = useQuery();
  const initialValue = getInitalValue(queryParams, options);
  console.log(initialValue);
  
  useEffect(() => {
    const params = new URLSearchParams();
    console.log(params.keys())
    if (query) {
      params.append('status', query);
    } else {
      params.delete('status');
    }
    //history.push({search: params.toString()})
  }, [query, history]);


  return (
    <Select
      value={initialValue}
      onChange={handleChange}
      options={options}
    />
  );
}

export default FilterComponent;

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
  
  console.log(ret);
  return ret;
}
