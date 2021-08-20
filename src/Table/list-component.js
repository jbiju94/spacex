import React from "react";
import "react-smart-data-table/dist/react-smart-data-table.css";
import SmartDataTable from "react-smart-data-table";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";

function ListComponent() {
  const emptyTableD = <div>There is no data available at the time.</div>;
  const base_url = "https://api.spacexdata.com/v3/launches";
  var objectMapper = require('object-mapper');

  const [modelVisible, setModelVisible] = useState(false);
  const [modeldata, setModelData] = useState();
  const headers = {
    columnKey: {
      text: "-",
      invisible: true,
      sortable: false,
      filterable: false,
    },
    _id: {
      text: "No",
      invisible: false,
      sortable: false,
      filterable: true,
    },
    launch_date_utc: {
      text: "Launched (UTC)",
      invisible: false,
      sortable: false,
      filterable: true,
      transform: (value, index, row) => {
        return funDate(value);
      },
    },
    location: {
      text: "Location",
      invisible: false,
      sortable: false,
      filterable: false,
    },
    mission: {
      text: "Mission",
      invisible: false,
      sortable: false,
      filterable: false,
    },
    orbit: {
      text: "Orbit",
      invisible: false,
      sortable: false,
      filterable: false,
    },
    launchState: {
      text: "Launched Status",
      invisible: false,
      sortable: false,
      filterable: true,
    },
    rocket: {
      text: "Rocket",
      invisible: false,
      sortable: false,
      filterable: false,
    },
  };

  const dataResolver = (response) => {
    const map = {
      "flight_number": "_id",
      "launch_date_utc": "launch_date_utc",
      "launch_site.site_name": "location",
      "mission_name": "mission",
      "rocket.second_stage.payloads[0].orbit" : "orbit",
      "launchState":"launchState",
      "rocket.rocket_name":"rocket"
    };

    /* const dateFrom = useQuery().filters.get("dateFrom");
    const dateTo = useQuery().filters.get("dateTo");

    let filteredResponse = [];
    if ((dateFrom != undefined) && (dateTo != undefined) && (dateFrom != "") && (dateTo != "")){
      filteredResponse = response.filter((response) => {
        const currentDate = Date.parse(response.launch_date_utc);
        const from = Date.parse(dateFrom);
        const to = Date.parse(dateTo);

        if (from === to) currentDate === from
        else return isBetween(currentDate, from, to)
      })
    } else filteredResponse = response
 */


    const op = response.map(src=> {
      src.launchState = src.launch_success ? "SUCCESS" : src.upcoming ? "UPCOMING" : "FAILED";
      return objectMapper(src, map);
    })
    
    return op;
  };

  const onRowClick = (event, { rowData, rowIndex, tableData }) => {
    // The following results should be identical
    console.log(rowData, tableData[rowIndex]);
    setModelData(rowData);
    setModelVisible(true);
  };

  const onModelClose = (event, data) => {
    console.log(event);
    setModelVisible(false);
  };

  
  const statusFilter = useQuery().get("status");
  
  return (
    <div>
      <SmartDataTable
        data={base_url}
        dataKey="_id"
        dataKeyResolver={dataResolver}
        name="space-x"
        className="ui compact selectable table"
        sortable
        filterValue={statusFilter}
        emptyTable={emptyTableD}
        showOnRowClick={true}
        perPage={20}
        onRowClick={onRowClick}
        headers={headers}
      />
      <Modal
        open={modelVisible}
        size="small"
        closeIcon={true}
        onClose={onModelClose}
      >
        <Header icon>
          <Icon name="archive" />
          Archive Old Messages
        </Header>
        <Modal.Content>
          <table class="ui table">
            <tbody>
              <tr>
                <td>John</td>
                <td>{modeldata? modeldata._id: " "}
                </td>
              </tr>
              <tr>
                <td>Jamie</td>
                <td>Approved</td>
              </tr>
              <tr>
                <td>Jill</td>
                <td>Denied</td>
              </tr>
            </tbody>
          </table>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color="red" inverted>
            <Icon name="remove" /> No
          </Button>
          <Button color="green" inverted>
            <Icon name="checkmark" /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default ListComponent;

function funDate(date) {
  var theDate = new Date(date);
  return theDate.toLocaleString(); //TODO: Formating Pending
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const isBetween = (date, min, max) => (date.getTime() >= min.getTime() && date.getTime() <= max.getTime());
    
