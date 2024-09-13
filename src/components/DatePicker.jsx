import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";

function Datepicker({ cambioFecha }) {
  const getInitialDate = (currentDate) => {
    const dayOfWeek = currentDate.getDay();
    const daysToAdd = dayOfWeek >= 5 ? 8 - dayOfWeek : 1 - dayOfWeek;
    const initialDate = new Date(currentDate);
    initialDate.setDate(currentDate.getDate() + daysToAdd);
    return initialDate;
  };

  const today = new Date();
  const initialDate = today
  const [selectedDate, setSelectedDate] = useState(initialDate);

  useEffect(() => {
    if (selectedDate) {
      cambioFecha(selectedDate);
    }
  }, [selectedDate, cambioFecha]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="text-center">
      <DatePicker
        selected={selectedDate}
        onChange={(date) => handleDateChange(date)}
        className="form-control"
        locale={es}
        dateFormat="dd/MM/yyyy"
        minDate={today}
      />
    </div>
  );
}

export default Datepicker;
