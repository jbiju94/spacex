import React from "react";
import { Grid, Button, Icon, Menu } from "semantic-ui-react";
import { useState, useEffect } from "react";

export default function DateShortcut({ onDateRangeChange }) {
  const [state, setState] = useState({ activeItem: "none" });

  function handleItemClick(e, { name }) {
    setState({ activeItem: name });
    const date = new Date();
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    let fromDate = undefined
    switch (name) {
      case "pastWeek":
        break;
      case "pastMonth":
        fromDate = new Date(currentYear, currentMonth - 1);
        break;
      case "pastThreeMonths":
        fromDate = new Date(currentYear, currentMonth - 3);
        break;
      case "pastSixMonths":
        fromDate = new Date(currentYear, currentMonth - 6);
        break;
      case "pastYear":
        fromDate = new Date(currentYear - 1, currentMonth);
        break;
      case "pastTwoYears":
        fromDate = new Date(currentYear - 2, currentMonth);
        break;
      default:
        fromDate = new Date(currentYear - 1, currentMonth);
    }
    onDateRangeChange(fromDate, date);
  }

  return (
    <Menu text vertical>
      <Menu.Item
        name="pastWeek"
        active={state.activeItem === "pastWeek"}
        onClick={handleItemClick}
      >
        Past Week
      </Menu.Item>
      <Menu.Item
        name="pastMonth"
        active={state.activeItem === "pastMonth"}
        onClick={handleItemClick}
      >
        Past Month
      </Menu.Item>
      <Menu.Item
        name="pastSixMonths"
        active={state.activeItem === "pastSixMonths"}
        onClick={handleItemClick}
      >
        Past 6 Months
      </Menu.Item>
      <Menu.Item
        name="pastYear"
        active={state.activeItem === "pastYear"}
        onClick={handleItemClick}
      >
        Past Year
      </Menu.Item>
      <Menu.Item
        name="pastTwoYears"
        active={state.activeItem === "pastTwoYears"}
        onClick={handleItemClick}
      >
        Past 2 Years
      </Menu.Item>
    </Menu>
  );
}
