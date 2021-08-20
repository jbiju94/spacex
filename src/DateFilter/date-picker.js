import React from "react";
import { useState, useEffect } from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import YearMonthForm from "./year-month-form";
import { Modal, Button } from "semantic-ui-react";
import useQueryParam from "../queryHandler"

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const fromMonth = new Date(currentYear, currentMonth);
const toMonth = new Date(currentYear + 10, 11);

export default function DatePickerComponent() {
  
  const [dateFrom, setDateFrom] = useQueryParam("dateFrom", "");
  const [dateTo, setDateTo] = useQueryParam("dateTo", "");

  const [state, setState] = useState(getInitialState());
  const [open, setOpen] = useState(false)

  function getInitialState() {
    return {
      from: undefined,
      to: undefined,
      month: fromMonth,
    };
  }

  function handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, state);
    setState(range);
    if (range.from) setDateFrom(Date.parse(range.from).toString());
    if (range.to) setDateTo(Date.parse(range.to).toString());
    else setDateTo(Date.parse(range.from).toString());
  }

  function handleYearMonthChange(month) {
    setState({ month });
  }

  const { from, to } = state;
  const modifiers = { start: from, end: to };

  return (
    <div>
      <Modal open={open} 
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={<Button>Date Filter</Button>}
      >
        <Modal.Content>
          <div className="YearNavigation">
            <DayPicker
              month={state.month}
              fromMonth={fromMonth}
              toMonth={toMonth}
              selectedDays={[from, { from, to }]}
              modifiers={modifiers}
              onDayClick={handleDayClick}
              numberOfMonths={2}
              captionElement={({ date, localeUtils }) => (
                <YearMonthForm
                  date={date}
                  fromMonth={fromMonth}
                  toMonth={toMonth}
                  localeUtils={localeUtils}
                  onChange={handleYearMonthChange}
                />
              )}
            />
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
}

