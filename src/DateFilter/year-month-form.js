import React from 'react';
import Select from 'react-select';

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

  return (
    <div className="DayPicker-Caption">
      <div className="ui grid">
        <div className="ten wide column">
          <Select
            name="month"
            value={months[date.getMonth()]}
            onChange={onChange}
            options={months}
            styles={styleForMonths}
          />
        </div>
        <div className="six wide column">
          <Select
            name="year"
            value={{ label: date.getFullYear(), value: date.getFullYear() }}
            onChange={onChange}
            options={years}
            styles={styleForYears}
          />
        </div>
      </div>
    </div>
  );
}
