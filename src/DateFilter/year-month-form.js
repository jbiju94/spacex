import React from 'react';
import Select from 'react-select';
import { useState, useEffect } from "react";

export default function YearMonthForm({
  date,
  fromMonth,
  toMonth,
  localeUtils,
  onChange
}) {
  const styleForMonths = {
    control: base => ({
      ...base,
      border: 0,
      width: 120,
      // This line disable the blue border
      boxShadow: 'none'
    })
  };
  const styleForYears = {
    control: base => ({
      ...base,
      border: 0,
      width: 100,
      // This line disable the blue border
      boxShadow: 'none'
    })
  };

  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push({ label: i, value: i });
  }
  const months = localeUtils.getMonths().map((month, i) => {
    return { label: month, value: i };
  });

  const [month, setMonth] = useState(months[0].value);
  const [year, setYear] = useState(years[0].value);


  function handleMonthChange(e) {
    setMonth(e.value);
    onChange(new Date(year, e.value));
  };

  function handleYearChange(e) {
    setYear(e.value);
    onChange(new Date(e.value, month));
  };

  return (
    <form className="DayPicker-Caption">
      <div className="ui grid">
        <div className="ten wide column">
          <Select
            name="month"
            value={months[date.getMonth()]}
            onChange={handleMonthChange}
            options={months}
            styles={styleForMonths}
          />
        </div>
        <div className="six wide column">
          <Select
            name="year"
            value={{ label: date.getFullYear(), value: date.getFullYear() }}
            onChange={handleYearChange}
            options={years}
            styles={styleForYears}
          />
        </div>
      </div>
    </form>
  );
}
