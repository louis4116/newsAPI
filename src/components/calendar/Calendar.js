import React, { useState,useEffect,useCallback } from 'react';

import DatePicker from "react-datepicker";
import classes from "./calendar.module.css"
import "react-datepicker/dist/react-datepicker.css";

const Calendar =(props) => {
    const {date,setDate}=props; 
   
  return (
    <div className={classes.calendar}>
    <DatePicker selected={date} inline  onChange={(date) => setDate(date)}  />
    </div>
  );
}

export default Calendar