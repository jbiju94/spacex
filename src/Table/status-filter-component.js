import 'react-smart-data-table/dist/react-smart-data-table.css';
import Select from "react-select";
import useQueryParam from "../queryHandler"

function StatusFilterComponent() {
  const options = [
    { value: "", label: "Spring" },
    { value: "Failed", label: "Failed Launches" },
    { value: "Success", label: "Sucessful Launches" },
    { value: "Upcoming", label: "Upcoming Launches" }
  ];

  const [status, setStatus] = useQueryParam("status", "");

  function handleChange(selectedOption) {
    setStatus(selectedOption.value)
  };

  const initialValue = getInitalValue(status, options);

  return (
    <Select
      value={initialValue}
      onChange={handleChange}
      options={options}
    />
  );
}

export default StatusFilterComponent;


function getInitalValue(status, options){
  let ret = ""
  if (status && status!= "") {
    const filtered =  options.filter(item=>item.value === status);
    if (filtered.size == 1){
      ret = filtered[0]
    }
  }
  
  return ret;
}
