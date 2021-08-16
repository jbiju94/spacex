import React from "react";
import { useState, useEffect } from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import YearMonthForm from "./year-month-form";
import { Modal, Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom"
import {useLocation } from "react-router-dom";

const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear, 0);
const toMonth = new Date(currentYear + 10, 11);

export default function DatePickerComponent() {
  

  const params = useQuery();
  const history = useHistory();
  
  console.log(params.get('dateFrom'));
  const initialDateFrom = params.get('dateFrom') ? params.get('dateFrom') : ""
  const initialDateTo = params.get('dateTo') ? params.get('dateTo') : ""
  
  const [dateFrom, setDateFrom] = useState(initialDateFrom);
  const [dateTo, setDateTo] = useState(initialDateTo);
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
    if (range.from) setDateFrom(Date.parse(range.from));
    if (range.to) setDateTo(Date.parse(range.to));
  }

  function handleYearMonthChange(month) {
    setState({ month });
  }

 
  const { from, to } = state;
  const modifiers = { start: from, end: to };


  useEffect(() => {
    const params = new URLSearchParams();
    if (dateFrom) {
      params.append('dateFrom', dateFrom);
    } else params.delete('dateFrom');
      
    if (dateTo) {
      params.append('dateTo', dateTo);
    } else params.delete('dateTo');
    
    history.push({search: params.toString()})
  }, [dateFrom,dateTo,history]);

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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
