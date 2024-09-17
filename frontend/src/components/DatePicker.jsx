import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from "date-fns/locale";

function Datepicker({ cambioFecha }) {
  //variables para seteo inicial y selección
  const today = new Date();
  const initialDate = today
  const [selectedDate, setSelectedDate] = useState(initialDate);

  //useEffect para setear las fechas al inicio o al cambiar la variable de estado
  useEffect(() => {
    if (selectedDate) {
      cambioFecha(selectedDate);
    }
  }, [selectedDate, cambioFecha]);

  //Funcion de cambio de variable de estado
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  //EStructura del componente de react
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

//export del componente selector de fechas
export default Datepicker;
