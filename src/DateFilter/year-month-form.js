import React from "react";
import Select from "react-select";

export default function YearMonthForm({
  date,
  localeUtils,
  onChange,
}) {
  const styleForMonths = {
    control: (base) => ({
      ...base,
      border: 0,
      width: 120,
      // This line disable the blue border
      boxShadow: "none",
    }),
  };
  const styleForYears = {
    control: (base) => ({
      ...base,
      border: 0,
      width: 100,
      // This line disable the blue border
      boxShadow: "none",
    }),
  };

  const years = [];
  for (let i = 2000; i <= 3000; i += 1) {
    years.push({ label: i, value: i });
  }
  const months = localeUtils.getMonths().map((month, i) => {
    return { label: month, value: i };
  });

  function handleMonthChange(e) {
    onChange(new Date(date.getFullYear(),e.value));
  }

  function handleYearChange(e) {
    onChange(new Date(e.value,date.getMonth()));
  }

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
            value={getValue(date.getFullYear(), years)}
            onChange={handleYearChange}
            options={years}
            styles={styleForYears}
          />
        </div>
      </div>
    </form>
  );
}

function getValue(key, list) {
  const filtered = list.filter((item) => item.value === key);
  return filtered[0];
}
