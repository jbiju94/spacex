import React from "react";
import "react-smart-data-table/dist/react-smart-data-table.css";
import SmartDataTable from "react-smart-data-table";
import { Button, Header, Icon, Modal } from "semantic-ui-react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, useLocation } from "react-router-dom";

function ListComponent() {
  const emptyTableD = <div>There is no data available at the time.</div>;
  const base_url = "https://api.spacexdata.com/v3/launches";

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
    let filteredResp = [];
    for (var i = 0; i < response.length; i++) {
      filteredResp.push({
        _id: response[i].flight_number,
        launch_date_utc: response[i].launch_date_utc,
        location: response[i].launch_site.site_name,
        mission: response[i].mission_name,
        orbit: response[i].rocket.second_stage.payloads[0].orbit, //TODO: Error Handle
        launchState: response[i].launch_success
          ? "SUCCESS"
          : response[i].upcoming
          ? "UPCOMING"
          : "FAILED",
        rocket: response[i].rocket.rocket_name,
      });
    }
    //console.log(filteredResp);
    return filteredResp;
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

  //TODO: Lazy loading
  let filters = useQuery();
  let statusFilter = filters.get("status");

  let api = base_url;

  return (
    <div>
      <SmartDataTable
        data={api}
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
                <td>{modeldata? modeldata._id: ""}</td>
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
  /*
    var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  dayName = d.get;

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
  */
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
