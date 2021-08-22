import React from "react";
import { useState, useEffect } from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import YearMonthForm from "./year-month-form";
import DateShortcut from "./date-shortcuts";
import { Modal, Button, Icon, Grid } from "semantic-ui-react";
import useQueryParam from "../queryHandler";

const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear, 1);
const toMonth = new Date(currentYear + 10, 11);

export default function DatePickerComponent() {
  const [dateFrom, setDateFrom] = useQueryParam("dateFrom", "");
  const [dateTo, setDateTo] = useQueryParam("dateTo", "");

  const [month, setMonth] = useState(fromMonth);
  const [range, setRange] = useState(getInitialState());
  const [open, setOpen] = useState(false);

  function getInitialState() {
    return {
      from: undefined,
      to: undefined,
    };
  }

  function handleDayClick(day) {
    const dateRange = DateUtils.addDayToRange(day, range);
    setRange(dateRange);
  }

  function setFilters() {
    if (range.from) setDateFrom(Date.parse(range.from).toString());
    if (range.to) setDateTo(Date.parse(range.to).toString());
    else setDateTo(Date.parse(range.from).toString());
  }

  function handleResetClick() {
    setRange(getInitialState());
  }

  function handleYearMonthChange(date) {
    setMonth(date);
  }

  function handleDateRangePresetChange(from, to) {
    setDateFrom(Date.parse(from).toString());
    setDateTo(Date.parse(to).toString());
    setOpen(false)
  }

  const { from, to } = range;
  const modifiers = { start: from, end: to };

  return (
    <div>
      <Modal
        closeIcon
        size="small"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={<Button>Date Filter</Button>}
      >
        <Modal.Content>
          <Grid>
            <Grid.Column width={3}>
              <DateShortcut onDateRangeChange={handleDateRangePresetChange} />
            </Grid.Column>
            <Grid.Column width={12}>
              <div className="YearNavigation">
                <DayPicker
                  fromMonth={fromMonth}
                  toMonth={toMonth}
                  month={month}
                  selectedDays={[from, { from, to }]}
                  //modifiers={modifiers}
                  onDayClick={handleDayClick}
                  numberOfMonths={2}
                  captionElement={({ date, localeUtils }) => (
                    <YearMonthForm
                      date={date}
                      localeUtils={localeUtils}
                      onChange={handleYearMonthChange}
                    />
                  )}
                />
              </div>
            </Grid.Column>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="red"
            onClick={() => {
              handleResetClick();
              setFilters();
            }}
          >
            <Icon name="remove" /> Remove
          </Button>
          <Button
            color="green"
            onClick={() => {
              setFilters();
              setOpen(false);
            }}
          >
            <Icon name="checkmark" /> Add
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
